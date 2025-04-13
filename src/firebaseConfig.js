import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// Your Firebase Config (Replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyBxgSnZz9ghNOrRhlPbIndcdODEUsK9w_Q",
  authDomain: "toures-bcd.firebaseapp.com",
  projectId: "toures-bcd",
  storageBucket: "toures-bcd.firebasestorage.app",
  messagingSenderId: "917576454059",
  appId: "1:917576454059:web:35367127c577977a6a0cee",
  measurementId: "G-YX34TC10V7"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Export Firebase Auth
export const auth = getAuth(app);
export const db = getFirestore(app);