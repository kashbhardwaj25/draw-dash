import { db } from "~/utils/db.server";

export const createCanvas = async (name: string) => {
  const canvas = await db.canvas.create({
    data: { name },
  });

  return { id: canvas.id };
};
