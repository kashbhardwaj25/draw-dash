import { authCookie } from "~/auth";
import { LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const cookieString = request.headers.get("Cookie");
  const userId = await authCookie.parse(cookieString);

  return { userId };
};

const Canvases = () => {
  return <div>Canvases Screen</div>;
};

export default Canvases;
