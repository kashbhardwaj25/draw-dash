import { Link } from "@remix-run/react";

import { type MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Drawdash" },
    { name: "description", content: "Welcome to Drawdash!" },
  ];
};

export default function Index() {
  return (
    <div
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}
      className="font-sans text-lg flex flex-col items-center justify-center h-screen space-y-4"
    >
      <h1 className="text-4xl font-bold text-blue-700">DRAWDASH</h1>
      <p className="text-center text-gray-600">
        Forge ideas, diagrams, notes, and art in your limitless cloud canvas.
      </p>
      <Link to="/signup" className="text-blue-500 hover:text-blue-700">
        Signup
      </Link>
      <Link to="/login" className="text-blue-500 hover:text-blue-700">
        Login
      </Link>
    </div>
  );
}
