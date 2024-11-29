import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    },
  );

  // if (request.nextUrl.pathname === "/")
  //   return NextResponse.redirect(new URL("/home", request.nextUrl.href));

  if (
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/_next')
  )
    return response;

  let {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (
    user &&
    (request.nextUrl.pathname === "/signup" ||
      request.nextUrl.pathname === "/confirm" ||
      request.nextUrl.pathname === "/reset_password" ||
      request.nextUrl.pathname === "/login")
  ) {
    response = NextResponse.redirect(new URL("/home", request.nextUrl.href));}
  else if (!user && request.nextUrl.pathname === "/home") {
    response = NextResponse.redirect(new URL("/login", request.nextUrl.href));}
  else if (!user) {
    if ( request.nextUrl.pathname !== "/" && request.nextUrl.pathname !== "/login" && request.nextUrl.pathname !== "/signup" && request.nextUrl.pathname !== "/confirm" && request.nextUrl.pathname !== "/reset_password") {
      response = NextResponse.redirect(new URL("/login", request.nextUrl.href)); }
    else {
      response = NextResponse.next();
    }
  }


  return response;
}
