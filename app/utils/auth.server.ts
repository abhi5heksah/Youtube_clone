// app/auth.server.ts
import { Authenticator } from "remix-auth";
import { GoogleStrategy } from "remix-auth-google";
import { sessionStorage } from "./../session.server";
import dotenv from "dotenv";
dotenv.config();

export const authenticator = new Authenticator(sessionStorage);

authenticator.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "http://localhost:5173/api/auth/google/callback",
    },
    async ({ profile }) => {
      return {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails?.[0].value,
        image: profile.photos?.[0].value,
      };
    }
  ),
  "google"
);
