
import { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/./utils/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  return authenticator.authenticate("google", request, {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  });
}
