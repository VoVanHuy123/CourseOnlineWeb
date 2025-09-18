import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6U7CtshJD_N5KfXVxXpDNEXnYxkzD1BY",
  authDomain: "courseonline-be6d0.firebaseapp.com",
  projectId: "courseonline-be6d0",
  storageBucket: "courseonline-be6d0.firebasestorage.app",
  messagingSenderId: "424472809065",
  appId: "1:424472809065:web:3f381270b34c709f265cf8",
  measurementId: "G-6MJG6T8XTP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
