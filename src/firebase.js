// Import Firebase
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCkAEYd8OWXkHMcA3AXP11wNAvd3bLUtp8",
  authDomain: "free-sms-27bf4.firebaseapp.com",
  projectId: "free-sms-27bf4",
  storageBucket: "free-sms-27bf4.firebasestorage.app",
  messagingSenderId: "576142187938",
  appId: "1:576142187938:web:8999420fb074efddf326fb",
  measurementId: "G-8YFS9TTXTG"
};

// Initialize
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Firestore
export const db = getFirestore(app);

// Save user to Firestore
async function saveUser(user) {

  const userRef = doc(db, "users", user.uid);

  const data = {
    uid: user.uid,

    fullname: user.displayName || "",
    firstname: user.displayName?.split(" ")[0] || "",
    lastname: user.displayName?.split(" ")[1] || "",

    gmail: user.email || "",
    mobilenumber: user.phoneNumber || "",

    profileimg: user.photoURL || "",   // profile image
    address: "",                       // user address

    dateofbirth: "",

    profileComplete: false,

    createdAt: new Date()
  };

  await setDoc(userRef, data, { merge: true });
}

// Google Login
export const googleLogin = async () => {

  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  await saveUser(user);

  return user;
};

// Facebook Login
export const facebookLogin = async () => {

  const result = await signInWithPopup(auth, facebookProvider);
  const user = result.user;

  await saveUser(user);

  return user;
};