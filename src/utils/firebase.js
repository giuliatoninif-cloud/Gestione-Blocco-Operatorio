import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAL7Mi4qo7_OV2NZTGgVbU7RHoEnh2FkI8",
  authDomain: "gestione-blocco-operatorio.firebaseapp.com",
  projectId: "gestione-blocco-operatorio",
  storageBucket: "gestione-blocco-operatorio.appspot.com",

  messagingSenderId: "498812907583",
  appId: "1:498812907583:web:8ad71908eb144a7dc9c88a"
};
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);