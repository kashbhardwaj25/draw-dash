import { useParams } from "@remix-run/react";

const Canvas = () => {
  const { canvasId } = useParams();

  return <div>Canvas Screen: {canvasId}</div>;
};

export default Canvas;
