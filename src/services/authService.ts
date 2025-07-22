import { auth, googleProvider, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import type { User } from "../Interface/User";

const saveUserToFirestore = async (user: User) => {
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, user, { merge: true });
};

// ✅ Login with Email (reset subscription)
export const loginWithEmail = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const { uid, displayName, email: userEmail } = userCredential.user;

  const user: User = {
    uid,
    displayName: displayName || "",
    email: userEmail || "",
    isExtAuth: false,
    subscriptionStatus: "inactive", // ✅ reset subscription status
    subscriptionPlan: "free", // ✅ default free plan
  };

  await saveUserToFirestore(user);
  return user;
};

// ✅ Login with Google
export const loginWithGoogle = async () => {
  const userCredential = await signInWithPopup(auth, googleProvider.setCustomParameters({
    prompt: 'select_account'
  }));
  const { uid, displayName, email: userEmail } = userCredential.user;

  const user: User = {
    uid,
    displayName: displayName || "",
    email: userEmail || "",
    isExtAuth: true,
    subscriptionStatus: "inactive",
    subscriptionPlan: "free",
  };

  await saveUserToFirestore(user);
  return user;
};

// ✅ Signup with Email
export const signupWithEmail = async (email: string, password: string, name: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const userAuth = userCredential.user;

  if (userAuth) await updateProfile(userAuth, { displayName: name });

  const user: User = {
    uid: userAuth.uid,
    displayName: name,
    email: userAuth.email || "",
    isExtAuth: false,
    subscriptionStatus: "inactive",
    subscriptionPlan: "free",
  };

  await saveUserToFirestore(user);
  return user;
};

// ✅ Signup with Google
export const signupWithGoogle = async () => {
  return loginWithGoogle();
};
