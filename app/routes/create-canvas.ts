import { ActionFunctionArgs, redirect } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const canvasName = String(formData.get("canvasName"));

  console.log(canvasName);

  return redirect("/canvases");
};
