import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  signInUrl: "/login",
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
