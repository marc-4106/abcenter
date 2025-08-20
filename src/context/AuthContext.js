import React, { createContext, useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  signOut,
  setPersistence, // Import setPersistence
  browserSessionPersistence, // Import browserSessionPersistence
  signInWithEmailAndPassword // Import a sign-in method
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // A function to handle the login process
  const login = async (email, password) => {
    try {
      // Set the persistence to 'session' before signing in
      await setPersistence(auth, browserSessionPersistence);

      // Now, sign the user in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // userCredential.user is automatically picked up by onAuthStateChanged
      return userCredential;
    } catch (error) {
      console.error("Login failed:", error.message);
      // Throw the error so the calling component can handle it
      throw error;
    }
  };

  const logout = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const docRef = doc(db, 'users', firebaseUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUser(firebaseUser);
          setRole(docSnap.data().role);
        } else {
          // Handle case where user document doesn't exist
          setUser(firebaseUser);
          setRole('user'); // Or a default role
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, setUser, setRole, logout, login }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
