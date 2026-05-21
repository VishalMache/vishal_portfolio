import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBt6c1NI3-TRkaJot_Ts17l-dOjhb6d9bk",
  authDomain: "portfolio-26169.firebaseapp.com",
  projectId: "portfolio-26169",
  storageBucket: "portfolio-26169.firebasestorage.app",
  messagingSenderId: "779899798652",
  appId: "1:779899798652:web:911e5129145f12eeb035f9",
  measurementId: "G-2B3PZCC68W",
};

// Prevent re-initialization in dev mode (hot reload)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { db };
