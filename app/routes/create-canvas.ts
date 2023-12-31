import { getUserIdFromCookie } from "~/auth";
import { createCanvas } from "./canvases._index/queries";
import { ActionFunctionArgs, redirect } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const canvasName = String(formData.get("canvasName"));

  const userId = await getUserIdFromCookie(request);

  await createCanvas(canvasName, userId);

  return redirect("/canvases");
};
