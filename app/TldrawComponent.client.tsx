import { Tldraw } from "@tldraw/tldraw";

const TldrawComponent = () => {
  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Tldraw />
    </div>
  );
};

export default TldrawComponent;
