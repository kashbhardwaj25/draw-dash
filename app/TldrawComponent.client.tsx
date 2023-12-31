import {
  Tldraw,
  createTLStore,
  defaultShapeUtils,
  throttle,
} from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { useLayoutEffect, useState } from "react";

import { useLoaderData, useSubmit } from "@remix-run/react";
import { loader } from "./routes/canvases.$canvasId/route";

const TldrawComponent = () => {
  const { canvas } = useLoaderData<typeof loader>();
  const submit = useSubmit();

  const [store] = useState(() =>
    createTLStore({ shapeUtils: defaultShapeUtils })
  );
  const [loadingState, setLoadingState] = useState<
    | { status: "loading" }
    | { status: "ready" }
    | { status: "error"; error: string }
  >({
    status: "loading",
  });

  useLayoutEffect(() => {
    setLoadingState({ status: "loading" });

    // Get persisted data from prisma db
    if (canvas && canvas.content) {
      const prismaDbSnapshot = JSON.parse(canvas.content);

      try {
        store.loadSnapshot(prismaDbSnapshot);
        setLoadingState({ status: "ready" });
      } catch (error: any) {
        setLoadingState({ status: "error", error: error.message }); // Something went wrong
      }
    } else {
      setLoadingState({ status: "ready" }); // Nothing persisted, continue with the empty store
    }

    // Each time the store changes, run the (debounced) persist function
    const cleanupFn = store.listen(
      throttle(() => {
        const snapshot = store.getSnapshot();

        submit(
          { finalCanvasSnapshot: JSON.stringify(snapshot) },
          {
            method: "post",
            action: "/save-canvas",
            navigate: false,
          }
        );
      }, 500)
    );

    return () => {
      cleanupFn();
    };
  }, [store]);

  if (loadingState.status === "loading") {
    return (
      <div className="tldraw__editor">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (loadingState.status === "error") {
    return (
      <div className="tldraw__editor">
        <h2>Error!</h2>
        <p>{loadingState.error}</p>
      </div>
    );
  }

  return (
    <div className="tldraw__editor fixed inset-0">
      <Tldraw store={store} />
    </div>
  );
};

export default TldrawComponent;
