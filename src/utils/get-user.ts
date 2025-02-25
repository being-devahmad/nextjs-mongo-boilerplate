import { cookies } from 'next/headers';

export default async function getUser() {
  const cookieStore = await cookies(); // ❌ No need for `await`
  const token = cookieStore.get('token')?.value; // ✅ Correct way to get token

  console.log('tokennnnnnnn', token);

  if (!token) {
    return null;
  }

  const URL = process.env.NEXT_PUBLIC_API_URL!;

  try {
    const response = await fetch(`${URL}/api/auth/user`, {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Send token in Authorization header
      },
      credentials: 'include', // ✅ Ensures cookies are sent
    });

    console.log('response status:', response.status);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    console.log('User Data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }

  return null;
}
