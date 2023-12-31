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
    <div className="flex justify-between items-center m-4">
      <div className="text-2xl font-bold mb-4">Canvases</div>
      <form method="post" action="/logout">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </form>
    </div>
  );
};

export default Canvases;
