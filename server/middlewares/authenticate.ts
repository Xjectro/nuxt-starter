import { User } from "#imports";
import { verifyJWT } from "../utils/modules/jwt";

export default defineEventHandler(async (event) => {
  const token = getHeaders(event)
    ?.["authorization"]?.replace("Bearer", "")
    .trim();

  if (!token) {
    throw createError({
      statusCode: 404,
      statusMessage: "Token is required for authentication",
    });
  }

  const decoded = verifyJWT(token);

  if (typeof decoded === 'string' || !decoded.id) {
    throw createError({
      statusCode: 401,
      statusMessage: "Token does not match credentials",
    });
  }

  const user = await User.findById(decoded.id).populate("auth");

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Token does not match credentials 2",
    });
  }

  event.context.user = user.toObject({ virtuals: true });
});
