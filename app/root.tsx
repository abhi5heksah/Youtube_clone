import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import "./tailwind.css";

import { AuthProvider } from "./context/authprovider";
import { authenticator } from "./utils/auth.server";
import Navbar from "./components/navbar";


/*  1. Head <link> tags*/
export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

  /*  2. Root-level loader: fetch user once*/
  export const loader: LoaderFunction = async ({ request }) => {
    // check user loggedin 
    const user = await authenticator.isAuthenticated(request).catch(() => null);
    return json({ user });
  };



/*  3.HTML skeleton*/
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

/* ------------------------------------------------------------------ */
/*  4. App component: wrap providers, place Navbar + Outlet           */
/* ------------------------------------------------------------------ */
export default function App() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <AuthProvider>
      {/* Navbar now gets the user prop */}
      <Navbar user={user} />
      <Outlet />
    </AuthProvider>
  );
}
