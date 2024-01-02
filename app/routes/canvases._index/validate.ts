export const validateCreateCanvas = async (canvasName?: string) => {
  let errors: { canvasName?: string } = {};

  if (!canvasName) {
    errors.canvasName = "Please enter a suitable canvas name";
  }

  return Object.keys(errors).length ? errors : null;
};
