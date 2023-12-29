import { ActionFunctionArgs } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";

import { validateSignup } from "./validate";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const username = String(formData.get("username"));
  const password = String(formData.get("password"));

  const errors = validateSignup(username, password);

  if (errors) {
    return { errors };
  }
};

const Signup = () => {
  let actionData = useActionData<typeof action>();

  let usernameError = actionData?.errors?.username;
  let passwordError = actionData?.errors?.password;

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div className="flex justify-center items-center h-screen">
        <div className="border border-gray-300 rounded-lg p-8 shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Create an Account</h2>
          <Form method="post" className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username &nbsp;
                {usernameError ? (
                  <span className="text-red-500">{usernameError}</span>
                ) : null}
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Enter a username"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password &nbsp;
                {passwordError ? (
                  <span className="text-red-500">{passwordError}</span>
                ) : null}
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter a password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </button>
            </div>

            <div className="mt-8">
              <Link
                to="/"
                className="text-indigo-600 hover:text-indigo-800 text-sm"
              >
                Already have an account? Login here
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
