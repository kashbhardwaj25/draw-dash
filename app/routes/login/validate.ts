export const validateLogin = async (username: string, password: string) => {
  let errors: { username?: string; password?: string } = {};

  if (!username) {
    errors.username = "Please enter a username";
  }

  if (!password) {
    errors.password = "Please enter a password";
  }

  return Object.keys(errors).length ? errors : null;
};
