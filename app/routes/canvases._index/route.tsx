import { Link, useActionData, useLoaderData } from "@remix-run/react";
import {
  redirect,
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/node";

import { getUserIdFromCookie } from "~/auth";
import { validateCreateCanvas } from "./validate";
import { createCanvas, getUserCanvases } from "./queries";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserIdFromCookie(request);

  if (!userId) {
    return redirect("/");
  }

  const userCanvases = await getUserCanvases(userId);

  return { userCanvases };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const canvasName = String(formData.get("canvasName"));

  const errors = await validateCreateCanvas(canvasName);

  if (errors) {
    return { errors };
  }

  const userId = await getUserIdFromCookie(request);
  await createCanvas(canvasName, userId);

  return redirect("/canvases");
};

const Canvases = () => {
  const { userCanvases } = useLoaderData<typeof loader>();
  let actionData = useActionData<typeof action>();

  let canvasNameError = actionData?.errors?.canvasName;

  return (
    <div>
      <div className="flex justify-between items-center m-4">
        <div className="text-2xl font-bold mb-4">Canvases</div>
        <form method="post" action="/logout">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Logout
          </button>
        </form>
      </div>
      <div className="m-4">
        <form method="post">
          <div className="flex gap-4">
            <input
              type="text"
              name="canvasName"
              placeholder="Canvas Name"
              className="border border-gray-400 rounded-lg p-2"
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create Canvas
            </button>
          </div>
        </form>
        {canvasNameError ? (
          <span className="text-red-500">{canvasNameError}</span>
        ) : null}
      </div>
      <div className="flex flex-wrap">
        {userCanvases &&
          userCanvases.map((canvas) => (
            <div key={canvas.id} className="m-4">
              <Link
                to={`/canvases/${canvas.id}`}
                className="border border-gray-300 shadow-md rounded-lg p-4"
              >
                <strong className="text-lg font-bold">{canvas.name}</strong>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Canvases;
