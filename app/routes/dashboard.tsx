import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { authenticator } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return json({ user });
};

export default function Dashboard() {
  const { user } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(interval);
          navigate("/");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  console.log("Dashboard user:", user);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center animate-fade-in">
        <img
          src={user.image}
          alt={user.name}
          className="w-24 h-24 mx-auto rounded-full border-4 border-blue-500 shadow-sm"
        />
        <h1 className="text-2xl font-semibold text-gray-800 mt-4">
          Welcome, {user.name}
        </h1>
        <p className="text-gray-500 text-sm mt-1">{user.email}</p>

        <div className="mt-6">
          <p className="text-blue-600 font-medium">
            Redirecting in <span className="font-bold">{countdown}</span>...
          </p>
          <div className="w-full h-2 bg-blue-100 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-1000 rounded-full"
              style={{ width: `${(3 - countdown + 1) * 33.33}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
