import { useEffect, useState } from "react";

import TldrawComponent from "~/TldrawComponent.client";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getUserIdFromCookie } from "~/auth";
import { getCanvasFromId } from "./queries";

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
