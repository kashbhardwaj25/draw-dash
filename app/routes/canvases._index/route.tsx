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
      <div>Canvases Screen</div>
      <form method="post" action="/logout">
        <button>Logout</button>
      </form>
    </div>
  );
};

export default Canvases;
