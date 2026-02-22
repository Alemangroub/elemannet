import 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
export { renderers } from '../../renderers.mjs';

{
  console.error("ERROR: The FIREBASE_SERVICE_ACCOUNT environment variable is not set.");
  throw new Error("The FIREBASE_SERVICE_ACCOUNT environment variable is not set. Please add your service account JSON to your project secrets.");
}
const adminAuth = getAuth();
const adminDb = getFirestore();

async function POST({ request }) {
  try {
    // 1. استخراج التوكن والمصادقة عليه
    const idToken = request.headers.get('Authorization')?.split('Bearer ')[1];
    if (!idToken) {
      return new Response(JSON.stringify({ error: 'Unauthorized: No token provided' }), { status: 401 });
    }

    let decodedToken;
    try {
      decodedToken = await adminAuth.verifyIdToken(idToken);
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Unauthorized: Invalid token' }), { status: 401 });
    }

    // 2. التحقق من صلاحيات المسؤول من Firestore
    const adminDocRef = adminDb.collection('users').doc(decodedToken.uid);
    const adminDoc = await adminDocRef.get();

    if (!adminDoc.exists || adminDoc.data().role !== 'admin') {
        return new Response(JSON.stringify({ error: 'Forbidden: User is not an admin' }), { status: 403 });
    }

    // 3. الحصول على UID المستخدم المراد حذفه من الطلب
    const { uid } = await request.json();
    if (!uid) {
      return new Response(JSON.stringify({ error: 'Bad Request: UID is required' }), { status: 400 });
    }
    
    // لا يمكن للمسؤول حذف حسابه بنفسه
    if (decodedToken.uid === uid) {
      return new Response(JSON.stringify({ error: 'Forbidden: Admins cannot delete their own account' }), { status: 403 });
    }

    // 4. حذف المستخدم من Firebase Authentication
    await adminAuth.deleteUser(uid);

    // 5. حذف مستند المستخدم من Firestore
    const userDocRef = adminDb.collection('users').doc(uid);
    await userDocRef.delete();

    // 6. إرجاع رسالة نجاح
    return new Response(JSON.stringify({ message: 'User deleted successfully' }), { status: 200 });

  } catch (error) {
    console.error('Error deleting user:', error);
    let errorMessage = 'Internal Server Error: Could not delete user.';
    if (error.code === 'auth/user-not-found') {
        errorMessage = 'User not found in Authentication. The user may have been already deleted.';
    }
    return new Response(JSON.stringify({ error: errorMessage, details: error.message }), { status: 500 });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
