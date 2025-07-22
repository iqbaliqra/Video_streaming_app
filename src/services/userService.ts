import { db } from "../firebase";
import { collection, doc, setDoc, onSnapshot } from "firebase/firestore";
import type { User } from "../Interface/User";

// Save User with isExtAuth
export const saveUserToFirestore = async (user: User): Promise<void> => {
  const userRef = doc(db, 'users', user.uid);
  await setDoc(userRef, user, { merge: true });
};

// Realtime Fetch Users
export const fetchUsers = (callback: (users: User[]) => void) => {
  const usersRef = collection(db, 'users');
  return onSnapshot(usersRef, snapshot => {
    const users: User[] = snapshot.docs.map(doc => ({
      uid: doc.id,
      displayName: doc.data().displayName,
      email: doc.data().email,
      isExtAuth: doc.data().isExtAuth
    }));
    callback(users);
  });
};
