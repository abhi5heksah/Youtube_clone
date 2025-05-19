import { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  // redirect to Google OAuth screen
  return authenticator.authenticate("google", request, {
    successRedirect: "/dashboard",    // redirect after success
    failureRedirect: "/login",        // redirect after failure
  });
}
