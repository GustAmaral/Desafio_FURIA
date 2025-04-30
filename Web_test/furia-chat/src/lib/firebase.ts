import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASALnaVhMe-inKFVURKlKUkE710uJf-0k",
  authDomain: "furia-chat-b7729.firebaseapp.com",
  projectId: "furia-chat-b7729",
  storageBucket: "furia-chat-b7729.firebasestorage.app",
  messagingSenderId: "581955493152",
  appId: "1:581955493152:web:c076f1114f9e01abe64b45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);