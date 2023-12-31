import { db } from "~/utils/db.server";

export const getCanvasFromId = async (id: string) => {
  const canvas = await db.canvas.findUnique({
    where: {
      id,
    },
  });

  return canvas;
};

export const updateCanvas = async (id: string, content: string) => {
  const canvas = await db.canvas.update({
    where: {
      id,
    },
    data: {
      content,
    },
  });

  return canvas;
};
