import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBUIfCIFv0Dd46dh9xHJ90A8jj2C7Yi0DM",
  authDomain: "tsproject-f60a0.firebaseapp.com",
  projectId: "tsproject-f60a0",
  storageBucket: "tsproject-f60a0.appspot.com",
  messagingSenderId: "913567263501",
  appId: "1:913567263501:web:6fb48c21d004d802e75e44",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const auth = getAuth();

export default app;

export {db, auth}