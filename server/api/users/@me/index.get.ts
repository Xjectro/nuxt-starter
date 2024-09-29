import authenticate from "~~/server/middlewares/authenticate";

export default defineEventHandler(async (event) => {
  await authenticate(event);

  return {
    ...event.context.user,
  };
});
