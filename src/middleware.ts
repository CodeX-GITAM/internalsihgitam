import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const protectedRoutes: Array<String> = ["/admin"];
  const tokenData = request.cookies.get("token");
  const url = new URL(request.url); // Convert request.url to a URL object
  if (protectedRoutes.includes(url.pathname) && !tokenData) {
    // Access the pathname property
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin:pathname*"],
};
