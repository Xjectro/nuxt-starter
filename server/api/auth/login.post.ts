import * as z from "zod";
import { Auth, generateJWT } from "#imports";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "").max(20, ""),
});

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  if (!schema.safeParse({ email, password }).success) {
    throw createError({
      statusCode: 404,
      statusMessage: "Did not enter required parameters",
    });
  }

  const auth = await Auth.findOne({ email }).populate("user");

  if (!auth) {
    throw createError({ statusCode: 404, statusMessage: "User not found" });
  }

  if (!(await auth.comparePassword(password))) {
    throw createError({
      statusCode: 401,
      statusMessage: "Password does not match",
    });
  }

  if (auth.tfa) {
    // Pass
  } else {
    const access_token = generateJWT({ id: auth.user._id }, 30 * 24 * 60 * 60);
    setCookie(
      event,
      "auth",
      JSON.stringify({ access_token, refresh_token: auth.refresh_token }),
    );
  }
});
