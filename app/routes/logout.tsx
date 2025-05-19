
import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  return authenticator.logout(request, { redirectTo: "/" });
}
