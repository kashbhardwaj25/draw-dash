import bcrypt from "bcryptjs";
import { createCookie } from "@remix-run/node";

import { db } from "~/utils/db.server";

export const authCookie = createCookie("auth", {
  httpOnly: true,
  path: "/",
  maxAge: 60 * 60 * 24 * 30, // 30days
});

export const createUser = async (username: string, password: string) => {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: { passwordHash, username, createdAt: new Date() },
  });

  return { id: user.id, username };
};

export const findUser = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
  });

  return user;
};

export const getUserIdFromCookie = async (request: Request) => {
  const cookieString = request.headers.get("Cookie");
  const userId = await authCookie.parse(cookieString);

  return userId;
};
