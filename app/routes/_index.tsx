import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import Home from "./../components/home";
import Navbar from "./../components/navbar";
import { AuthProvider } from "~/context/authprovider";
import { authenticator } from "~/utils/auth.server";
import { redirect } from "@remix-run/node"; // ✅ use directly

export const meta: MetaFunction = () => {
  return [
    { title: "Youtube Clone" },
    { name: "description", content: "Welcome to youtube clone" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  if (!user) {
    // 🚨 Redirect to login if not logged in
    return redirect("/login");
  }

  return null; // user is allowed to see the home page
};

export default function Index() {
  return (
    <AuthProvider>
      <Navbar />
      <Home />
    </AuthProvider>
  );
}
