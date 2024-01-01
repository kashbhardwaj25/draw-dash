import { useEffect, useState } from "react";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";

import { getCanvasFromId } from "./queries";
import { getUserIdFromCookie } from "~/auth";
import TldrawComponent from "~/TldrawComponent.client";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const userId = await getUserIdFromCookie(request);
  const canvasId = params.canvasId;

  if (!userId) {
    return redirect("/");
  }

  if (!canvasId) {
    return redirect("/canvases");
  }

  const canvas = await getCanvasFromId(canvasId);

  return { canvas };
};

const Canvas = () => {
  const [isCanvasMounted, setIsCanvasMounted] = useState(false);

  useEffect(() => {
    setIsCanvasMounted(true);
  }, []);

  return isCanvasMounted ? <TldrawComponent /> : null;
};

export default Canvas;
