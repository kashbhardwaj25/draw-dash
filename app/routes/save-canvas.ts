import { updateCanvas } from "./canvases.$canvasId/queries";

import { ActionFunctionArgs, json } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const finalCanvasSnapshot = String(formData.get("finalCanvasSnapshot"));
  const canvasId = String(formData.get("canvasId"));

  if (canvasId) {
    await updateCanvas(canvasId, finalCanvasSnapshot);
  }

  return json({ message: "success" });
};
