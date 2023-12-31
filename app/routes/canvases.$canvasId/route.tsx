import { useEffect, useState } from "react";
import { useParams } from "@remix-run/react";

import TldrawComponent from "~/TldrawComponent.client";

const Canvas = () => {
  const { canvasId } = useParams();

  console.log(canvasId, "<<<<<< CANVAS ID");

  const [isCanvasMounted, setIsCanvasMounted] = useState(false);

  useEffect(() => {
    setIsCanvasMounted(true);
  }, []);

  return isCanvasMounted ? <TldrawComponent /> : null;
};

export default Canvas;
