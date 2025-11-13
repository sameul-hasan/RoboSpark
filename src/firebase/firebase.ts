import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAAjAnwTjXPAqM0Seh9AYQ4FZRocPhZZs0",
  authDomain: "expense-tracker-a7a73.firebaseapp.com",
  projectId: "expense-tracker-a7a73",
  storageBucket: "expense-tracker-a7a73.firebasestorage.app",
  messagingSenderId: "993431165957",
  appId: "1:993431165957:web:fca4415d6c359d7d3b106c",
  measurementId: "G-MEJRC953S4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
