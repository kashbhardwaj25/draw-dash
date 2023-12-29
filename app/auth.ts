import bcrypt from "bcryptjs";
import { createCookie } from "@remix-run/node";

import { db } from "~/utils/db.server";

export const authCookie = createCookie("auth", {
  httpOnly: true,
  path: "/",
  maxAge: 60 * 60 * 24 * 30, // 30 days
});

export const createUser = async (username: string, password: string) => {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: { passwordHash, username },
  });

  return { id: user.id, username };
};
