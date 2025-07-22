import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWQjuRA80Qyi5rFiWpjCNenxAZGOcaowU",
  authDomain: "video-streaming-app-e3263.firebaseapp.com",
  projectId: "video-streaming-app-e3263",
  storageBucket: "video-streaming-app-e3263.firebasestorage.app",
  messagingSenderId: "895770527974",
  appId: "1:895770527974:web:13175867f95a309cded327",
  measurementId: "G-NZRQ5DKN4P"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db=getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword };
