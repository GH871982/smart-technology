import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    if (request.nextUrl.pathname.startsWith("/admin") && request.nextUrl.pathname !== "/admin/login") {
      return NextResponse.redirect(new URL("/admin/login?setup=1", request.url));
    }
    return response;
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookies) {
        cookies.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookies.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();
  const isAdminPath = request.nextUrl.pathname.startsWith("/admin");
  const isLogin = request.nextUrl.pathname === "/admin/login";
  const role = user?.app_metadata?.role;
  const isAdmin = role === "admin" || role === "super_admin";

  if (isAdminPath && !isLogin && !isAdmin) {
    const destination = user ? "/admin/login?role=denied" : "/admin/login";
    return NextResponse.redirect(new URL(destination, request.url));
  }
  if (isLogin && isAdmin) return NextResponse.redirect(new URL("/admin", request.url));
  return response;
}

export const config = { matcher: ["/admin/:path*"] };
