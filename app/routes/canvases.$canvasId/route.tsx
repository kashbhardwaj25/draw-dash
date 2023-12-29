import { useEffect, useState } from "react";
import { useParams } from "@remix-run/react";
import TldrawComponent from "~/TldrawComponent.client";

const Canvas = () => {
  const { canvasId } = useParams();

  console.log(canvasId, "<<<<<< CANVAS ID");

  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return mount ? <TldrawComponent /> : null;
};

export default Canvas;
