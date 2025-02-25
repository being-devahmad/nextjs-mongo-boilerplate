// import { NextResponse } from 'next/server';

// export async function POST() {
//   // If using httpOnly cookies, clear them
//   const response = NextResponse.json(
//     { message: 'Logged out successfully' },
//     { status: 200 },
//   );

//   response.headers.set(
//     'Set-Cookie',
//     'token=; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
//   );

//   return response;
// }

import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json(
    { success: true, message: 'Logged out successfully' },
    { status: 200 },
  );

  // Expire the cookies by setting `maxAge` to 0
  response.cookies.set('token', '', { maxAge: 0, path: '/' });
  response.cookies.set('role', '', { maxAge: 0, path: '/' });

  return response;
}
