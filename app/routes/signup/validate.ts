export const validateSignup = (username: string, password: string) => {
  const usernameRegex = new RegExp(/^[a-zA-Z0-9._]+$/);

  let errors: { username?: string; password?: string } = {};

  if (!username) {
    errors.username = "Please enter a username";
  } else if (username.length < 8) {
    errors.username = "Username should be more than 8 characters.";
  } else if (!usernameRegex.test(username)) {
    errors.username = "Alphanumeric, . and _ characters only";
  }

  if (!password) {
    errors.password = "Please enter a password";
  } else if (password.length < 8) {
    errors.password = "Password should be more than 8 characters.";
  }

  return Object.keys(errors).length ? errors : null;
};
