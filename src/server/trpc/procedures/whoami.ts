import { baseProcedure } from "~/server/trpc/main";

export const whoami = baseProcedure.query(async ({ ctx }) => {
  if (!ctx.user) return { authenticated: false };
  return {
    authenticated: true,
    user: ctx.user,
  };
});

