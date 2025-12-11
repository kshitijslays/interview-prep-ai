import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlLtdOr-IaNLZwaqv9YloT85CvY3YNWGk",
  authDomain: "prep-ai-5ae75.firebaseapp.com",
  projectId: "prep-ai-5ae75",
  storageBucket: "prep-ai-5ae75.firebasestorage.app",
  messagingSenderId: "416601599994",
  appId: "1:416601599994:web:d2fafc828f5af1e191be43",
  measurementId: "G-QCNHT6VXPP"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp()

export const auth = getAuth(app)
export const db = getFirestore(app)