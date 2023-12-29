import { db } from "~/utils/db.server";

export const isUsernameTaken = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });

  return Boolean(user);
};
