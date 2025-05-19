// // // app/session.server.ts
// // import { createCookieSessionStorage } from "@remix-run/node";

// // export const sessionStorage = createCookieSessionStorage({
// //   cookie: {
// //     name: "__session",
// //     secrets: ["super-secret-session-key"], // replace with env var in production
// //     sameSite: "lax",
// //     path: "/",
// //     httpOnly: true,
// //     secure: process.env.NODE_ENV === "production",
// //   },
// // });

// // export const getSession = (request: Request) =>
// //   sessionStorage.getSession(request.headers.get("Cookie"));

// // export const getUser = async (request: Request) => {
// //   const session = await getSession(request);
// //   return session.get("user");
// // };

// // export const requireUser = async (request: Request) => {
// //   const user = await getUser(request);
// //   if (!user) {
// //     throw new Response("Unauthorized", { status: 401 });
// //   }
// //   return user;
// // };

// // export const logout = async (request: Request) => {
// //   const session = await getSession(request);
// //   return sessionStorage.destroySession(session);
// // };

// // app/session.server.ts
// import { createCookieSessionStorage } from "@remix-run/node";

// // Set a secret key (use something stronger in production)
// export const sessionStorage = createCookieSessionStorage({
//   cookie: {
//     name: "__session",
//     secrets: ["your-session-secret"], // replace with a strong secret
//     sameSite: "lax",
//     path: "/",
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//   },
// });

// // Export session helpers
// export const getSession = sessionStorage.getSession;
// export const commitSession = sessionStorage.commitSession;
// export const destroySession = sessionStorage.destroySession;



// app/session.server.ts
import { createCookieSessionStorage } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secrets: ["your-secret"],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
});
