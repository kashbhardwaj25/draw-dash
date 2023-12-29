import { redirect } from "@remix-run/node";
import { authCookie } from "~/auth";

export const action = async () => {
  return redirect("/", {
    headers: {
      "Set-Cookie": await authCookie.serialize("", {
        maxAge: 0,
      }),
    },
  });
};
