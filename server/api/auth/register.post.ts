import * as z from "zod";
import { createUser } from "~~/server/services/db.services";

const schema = z.object({
  username: z.string().min(3).max(20).regex(/^\S*$/),
  firstName: z.string().min(2).max(20),
  lastName: z.string().min(2).max(20),
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!schema.safeParse(body).success) {
    throw createError({
      statusCode: 404,
      statusMessage: "Did not enter required parameters",
    });
  }

  await createUser(body);

  return true;
});
