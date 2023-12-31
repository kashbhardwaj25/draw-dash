import { LoaderFunctionArgs, redirect } from "@remix-run/node";

import { handleRedirectionUsingAuthCookie } from "~/auth";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await handleRedirectionUsingAuthCookie(request);

  if (!userId) {
    return redirect("/");
  }

  return {};
};

const Canvases = () => {
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
              name="name"
              placeholder="Canvas Name"
              className="border border-gray-400 rounded-lg p-2"
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create Canvas
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Canvases;
