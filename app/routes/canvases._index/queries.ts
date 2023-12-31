import { db } from "~/utils/db.server";
import { initialCanvasData } from "~/utils/tldraw.utils";

export const createCanvas = async (name: string, userId: string) => {
  const canvas = await db.canvas.create({
    data: {
      name,
      content: JSON.stringify(initialCanvasData),
      createdBy: userId,
      createdAt: new Date(),
    },
  });

  return { id: canvas.id };
};

export const getUserCanvases = async (userId: string) => {
  const canvases = await db.canvas.findMany({
    where: {
      createdBy: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return canvases;
};
