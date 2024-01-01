import { Link, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";

import { getUserCanvases } from "./queries";
import { getUserIdFromCookie } from "~/auth";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserIdFromCookie(request);

  if (!userId) {
    return redirect("/");
  }

  const userCanvases = await getUserCanvases(userId);

  return { userCanvases };
};

const Canvases = () => {
  const { userCanvases } = useLoaderData<typeof loader>();

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
        <form method="post" action="/create-canvas">
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
