import bcrypt from "bcryptjs";

export const validateLogin = async (
  username: string,
  password: string,
  passwordHash?: string
) => {
  let errors: { username?: string; password?: string } = {};

  if (!username) {
    errors.username = "Please enter a username";
  }

  if (!password) {
    errors.password = "Please enter a password";
  }

  if (passwordHash) {
    const isPasswordCorrect = await bcrypt.compare(password, passwordHash);

    if (!isPasswordCorrect) {
      errors.password = "Incorrect password";
    }
  }

  return Object.keys(errors).length ? errors : null;
};
