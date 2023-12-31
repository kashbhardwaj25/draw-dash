import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { createCanvas } from "./canvases._index/queries";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const canvasName = String(formData.get("canvasName"));

  await createCanvas(canvasName);

  return redirect("/canvases");
};
