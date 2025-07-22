import { db } from "../firebase";
import { collection, addDoc, deleteDoc, doc, onSnapshot,updateDoc } from "firebase/firestore";
import type { SubscriptionPlan } from "../Interface/subscriptionPlan";

const subscriptionRef = collection(db, "subscription_plans");

export const subscribeToPlans = (callback: (plans: SubscriptionPlan[]) => void) => {
  return onSnapshot(subscriptionRef, (snapshot) => {
    const plans = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as SubscriptionPlan[];
    callback(plans);
  });
  
};

export const addSubscriptionPlan = async (plan: Omit<SubscriptionPlan, "id">) => {
  const docRef=await addDoc(subscriptionRef, plan);
  return docRef;
};


export const deleteSubscriptionPlan = async (id: string) => {
  const docRef = doc(db, "subscription_plans", id);
  await deleteDoc(docRef);
};

export const updateSubscriptionPlan = async (
  id: string,
  updatedPlan: Partial<Omit<SubscriptionPlan, "id">>
) => {
  const docRef = doc(db, "subscription_plans", id);
  await updateDoc(docRef, updatedPlan);
};