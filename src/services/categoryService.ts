import { db } from "../firebase";
import { collection, doc, query,getDocs,where, addDoc, deleteDoc, updateDoc, onSnapshot } from "firebase/firestore";
import type { Category } from "../Interface/category";

const categoryRef = collection(db, "categories");
const videoCollection = collection(db, "videos");

export const listenToCategories = (callback: (categories: Category[]) => void) => {
  return onSnapshot(categoryRef, (snapshot) => {
    const categories: Category[] = snapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name
    }));
    callback(categories);
  });
};

export const createCategory = async (name: string) => {
  const docRef = await addDoc(categoryRef, { name });
  return docRef;
};

export const updateCategory = async (id: string, name: string) => {
  await updateDoc(doc(db, "categories", id), { name });
};

export const deleteCategory = async (id: string) => {
  await deleteDoc(doc(db, "categories", id));
};

export const deleteCategoryIfUnused = async (categoryId: string): Promise<boolean> => {
  
  const videoQuery = query(videoCollection, where("category_id", "==", categoryId));
  const snapshot = await getDocs(videoQuery);

  if (!snapshot.empty) {
    
    return false;
  }

  
  await deleteDoc(doc(categoryRef, categoryId));
  return true;
};

