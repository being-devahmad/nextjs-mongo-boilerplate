// import { NextRequest, NextResponse } from "next/server";

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get("token")?.value; // Assuming authentication token is stored in cookies
//   console.log("token-->", token);

//   const role = req.cookies.get("role")?.value; // Assuming role is stored in cookies

//   const { pathname } = req.nextUrl;

//   // Paths to protect
//   const adminRoutes = ["/admin/dashboard", "/admin/settings"];
//   const userRoutes = ["/user/profile", "/user/settings"];
//   const authRoutes = ["/auth/signin", "/auth/signup"];

//   // Redirect unauthorized users
//   if (!token) {
//     if (adminRoutes.includes(pathname) || userRoutes.includes(pathname)) {
//       return NextResponse.redirect(new URL("/auth/signin", req.url));
//     }
//   } else {
//     // Prevent logged-in users from accessing auth pages
//     if (authRoutes.some((route) => pathname.startsWith(route))) {
//       return NextResponse.redirect(new URL("/", req.url));
//     }

//     // Admin access control
//     if (adminRoutes.includes(pathname) && role !== "admin") {
//       return NextResponse.redirect(new URL("/", req.url));
//     }

//     // User access control
//     if (userRoutes.includes(pathname) && role !== "user") {
//       return NextResponse.redirect(new URL("/", req.url));
//     }
//   }

//   return NextResponse.next();
// }

// // Apply middleware to these paths
// export const config = {
//   matcher: ["/admin/:path*", "/user/:path*", "/auth/:path*"],
// };

import { type NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  console.log('TOKEN------->', token);
  const role = req.cookies.get('role')?.value;

  const { pathname } = req.nextUrl;

  // Paths to protect
  const adminRoutes = ['/admin/dashboard', '/admin/settings'];
  const userRoutes = ['/user/profile', '/user/settings'];
  const authRoutes = ['/auth/signin', '/auth/signup'];

  // If no token, redirect unauthenticated users to signin page
  if (!token) {
    if (adminRoutes.includes(pathname) || userRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }
  } else {
    // Prevent logged-in users from accessing auth pages
    if (authRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // Role-based access control
    if (role === 'user') {
      // User can access user routes but not admin routes
      if (adminRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/', req.url));
      }
    } else if (role === 'admin') {
      // Admin can access admin routes but not user routes
      if (userRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/', req.url));
      }
    } else {
      // If role is neither user nor admin, redirect to home
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware to these paths
export const config = {
  matcher: ['/admin/:path*', '/user/:path*', '/auth/:path*'],
};
