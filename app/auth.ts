import { createCookie } from "@remix-run/node";

export const authCookie = createCookie("auth", {
  httpOnly: true,
  path: "/",
  maxAge: 60 * 60 * 24 * 30, // 30 days
});

export const createUser = (username: string, password: string) => {
  return { id: 1 };
};
