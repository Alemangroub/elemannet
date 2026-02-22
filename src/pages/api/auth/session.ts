import type { APIRoute } from 'astro';
import { getAuth } from 'firebase-admin/auth';
import { app } from '../../../../firebase/server';

export const GET: APIRoute = async ({ request, cookies }) => {
  const auth = getAuth(app);

  // --- DIAGNOSTIC CODE START ---
  console.log("--- Vercel Server-Side Environment Variables ---");
  console.log("FIREBASE_PROJECT_ID:", process.env.FIREBASE_PROJECT_ID ? "Loaded" : "MISSING");
  console.log("FIREBASE_CLIENT_EMAIL:", process.env.FIREBASE_CLIENT_EMAIL ? "Loaded" : "MISSING");
  // Check if the private key exists and has a reasonable length
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  console.log("FIREBASE_PRIVATE_KEY:", privateKey && privateKey.length > 100 ? "Loaded" : "MISSING or TOO SHORT");
  console.log("--------------------------------------------");
  // --- DIAGNOSTIC CODE END ---

  const sessionCookie = cookies.get('session')?.value;
  if (!sessionCookie) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const decodedCookie = await auth.verifySessionCookie(sessionCookie, true);
    const user = await auth.getUser(decodedCookie.uid);
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error('Error verifying session cookie:', error);
    return new Response('Unauthorized', { status: 401 });
  }
};
