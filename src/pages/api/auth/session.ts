
import type { APIRoute } from 'astro';
import { adminAuth } from '../../../firebase/admin';

export const POST: APIRoute = async ({ request, cookies }) => {
  const { idToken } = await request.json();

  try {
    // 7 days
    const expiresIn = 60 * 60 * 24 * 7 * 1000;
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    cookies.set("session", sessionCookie, {
      path: "/",
      httpOnly: true,
      secure: true,
      maxAge: expiresIn,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to create session cookie" }), { status: 500 });
  }
};
