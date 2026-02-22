import { initializeApp, getApp, type FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// **START: Environment Variable Diagnostics**
// This code checks if all the necessary Firebase environment variables are available.
// If any variable is missing, it will throw a detailed error to help diagnose deployment issues.

const requiredEnvVars = [
  'PUBLIC_FIREBASE_API_KEY',
  'PUBLIC_FIREBASE_AUTH_DOMAIN',
  'PUBLIC_FIREBASE_PROJECT_ID',
  'PUBLIC_FIREBASE_STORAGE_BUCKET',
  'PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'PUBLIC_FIREBASE_APP_ID'
];

// This will be populated with the names of any missing environment variables.
const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);

// If there is at least one missing variable, throw an error.
if (missingVars.length > 0) {
  // We log this to the console so it's visible in the browser's developer tools.
  console.error("Firebase Initialization Error: The following environment variables are missing:", missingVars.join(', '));
  // We also throw an error to halt execution, as Firebase cannot initialize without these values.
  throw new Error(`Firebase config failed: Missing environment variables: ${missingVars.join(', ')}. Please check your Vercel/Netlify environment variable settings.`);
}
// **END: Environment Variable Diagnostics**


const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
let app;
try {
  app = getApp();
} catch (e) {
  app = initializeApp(firebaseConfig);
}

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); 

export { auth, db, storage, app, firebaseConfig };
