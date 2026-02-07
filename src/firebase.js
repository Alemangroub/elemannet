// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIPUR1qFzLbNi---_qDQa11fpIB6yRyFo",
  authDomain: "elemancompany-2b00c.firebaseapp.com",
  projectId: "elemancompany-2b00c",
  storageBucket: "elemancompany-2b00c.firebasestorage.app",
  messagingSenderId: "842755919578",
  appId: "1:842755919578:web:0423c8f54f46ea3e6f5fe3",
  measurementId: "G-QF3C2TBTBS"
};

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error("Firebase initialization error:", error);
  // You can add a user-facing error message here if needed
}

export { app };
export const db = getFirestore(app);
export const auth = getAuth(app);
