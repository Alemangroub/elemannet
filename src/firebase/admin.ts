import pkg from 'firebase-admin';

// This code block attempts to initialize the Firebase Admin SDK.
// It's wrapped in a try-catch block to prevent the app from crashing 
// if initialization fails, which is common if environment variables are missing.
try {
  // Check if the app is already initialized to prevent re-initialization errors.
  if (!pkg.apps.length) {
    // Initialize the app using credentials from environment variables.
    // Astro securely loads these variables from the .env file on the server.
    pkg.initializeApp({
      credential: pkg.credential.cert({
        projectId: import.meta.env.FIREBASE_PROJECT_ID,
        clientEmail: import.meta.env.FIREBASE_CLIENT_EMAIL,
        // The private key needs to have its newlines escaped (e.g., \n) in the .env file.
        privateKey: import.meta.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
      databaseURL: `https://${import.meta.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
    });
    console.log("Firebase Admin SDK initialized successfully.");
  } else {
    console.log("Firebase Admin SDK already initialized.");
  }
} catch (err: any) {
  // If an error occurs, log a detailed, helpful message to the server console.
  // This is crucial for debugging connection issues.
  if (!/already exists/.test(err.message)) {
    console.error(
      '\n🚨 Firebase Admin SDK initialization failed! 🚨\n' +
      'This is likely due to missing or incorrect server-side environment variables.\n' +
      'Please check your .env file and ensure the following are set correctly:\n' +
      '- FIREBASE_PROJECT_ID\n' +
      '- FIREBASE_CLIENT_EMAIL\n' +
      '- FIREBASE_PRIVATE_KEY\n' +
      'Remember to restart the development server after any changes to the .env file.\n' +
      'Error details:', err.message
    );
  }
}

// Export the Firestore database and Auth instances for use in other server-side files.
export const db = pkg.firestore();
export const auth = pkg.auth();
