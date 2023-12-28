import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

const TldrawComponent = () => {
  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Tldraw />
    </div>
  );
};

export default TldrawComponent;
