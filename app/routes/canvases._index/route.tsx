import { authCookie } from "~/auth";
import { LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const cookieString = request.headers.get("Cookie");
  const userId = await authCookie.parse(cookieString);

  return { userId };
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
