import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase Config

const firebaseConfig = {
  apiKey: "AIzaSyDPmg7C0ecFVfaE_Y2PpcrM6TL4H3vuKxQ",
  authDomain: "abcenter-6a6fa.firebaseapp.com",
  projectId: "abcenter-6a6fa",
  storageBucket: "abcenter-6a6fa.firebasestorage.app",
  messagingSenderId: "591073508941",
  appId: "1:591073508941:web:5707d3b2759feb17516604"
};
// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Auth & Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
