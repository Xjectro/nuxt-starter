import { User, type UserType } from "../models/user.model";
import { Tfa, type TfaType } from "../models/tfa.model";
import { Auth, type AuthType } from "../models/auth.model";
import { Connection, type ConnectionType } from "../models/connection.model";

import { createAvatarURL } from "../utils/helpers";
import { v4 as uuidV4 } from "uuid";

import { generateCode } from "../utils/modules/crypto";
import { generateJWT } from "../utils/modules/jwt";

export const updateStates = (params: Record<string, unknown>) => {
  return Object.entries(params).reduce(
    (obj, [key, value]) => {
      obj[key] = value;
      return obj;
    },
    {} as Record<string, unknown>,
  );
};

export async function createUser(
  data: Partial<
    Pick<UserType, "firstName" | "lastName" | "username"> &
      Pick<AuthType, "email" | "password">
  >,
) {
  const checkEmail = await Auth.checkEmail(data.email!);

  if (checkEmail) {
    throw createError({
      statusCode: 409,
      statusMessage: `An account belonging to ${data.email} email was found`,
    });
  }

  const id = uuidV4();
  const avatarURL = createAvatarURL([
    data.firstName,
    data.lastName,
  ] as string[]);

  const user = new User({
    user_id: id,
    username: data.username,
    firstName: data.firstName,
    lastName: data.lastName,
    avatarURL,
  });

  const refresh_token = generateJWT({ id: user._id }, 315360000);

  await user.save();

  const auth = new Auth({
    user: user._id,
    email: data.email,
    password: data.password,
    refresh_token,
  });

  await auth.save();

  user.auth = auth._id;

  await user.save();

  return user._id;
}

export async function saveConnection({ ...state }: ConnectionType) {
  return await Connection.updateOne(
    { user: state.user, type: state.type },
    { $set: state },
    { upsert: true },
  );
}

export async function checkTfa({
  usage_code,
}: {
  usage_code: TfaType["usage_code"];
}) {
  const tfa = await Tfa.findOne({ usage_code }).populate("user");

  if (!tfa?.user) {
    throw createError({
      statusCode: 401,
      statusMessage: "No user found matching usage code",
    });
  }

  if (tfa.expiration <= new Date()) {
    throw createError({
      statusCode: 401,
      statusMessage: "Usage code has expired",
    });
  }

  return tfa;
}

export async function createTfa({
  user,
  format,
  interaction,
}: {
  user: TfaType["user"];
  format: "jwt";
  interaction: TfaType["interaction"];
}) {
  let usage_code = "";
  const expiration = new Date(Date.now() + 180 * 1000);

  switch (format) {
    case "jwt":
      usage_code = generateJWT({ user, interaction }, 180);
      break;
    case undefined:
      usage_code = generateCode({ length: 5 });
      break;
  }

  const tfa = await Tfa.create({
    user,
    interaction,
    usage_code,
    expiration,
  });

  return { usage_code, expiration, tfa };
}
