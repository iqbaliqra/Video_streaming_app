import { defineStore } from "pinia";
import { ref } from "vue";
import {  db } from "../firebase";
import type { User } from "../Interface/User";
import { useToast } from "vue-toastification";
import { getDocs, collection } from "firebase/firestore";
import {
  loginWithEmail,
  loginWithGoogle,
  signupWithEmail,
  signupWithGoogle,
} from "../services/authService";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const alluser = ref<User[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const toast = useToast();

  const loginEmail = async (email: string, password: string) => {
    loading.value = true;
    error.value = null;
    try {
      user.value = await loginWithEmail(email, password);
      toast.success("Login successful!");
    } catch (err: any) {
      error.value = err.message;
      toast.error(error.value);
    } finally {
      loading.value = false;
    }
  };

  const loginGoogle = async () => {
    loading.value = true;
    error.value = null;
    try {
      user.value = await loginWithGoogle();
      toast.success("Google login successful!");
    } catch (err: any) {
      error.value = err.message;
      toast.error(error.value);
    } finally {
      loading.value = false;
    }
  };

  const signupEmail = async (email: string, password: string, name: string) => {
    loading.value = true;
    error.value = null;
    try {
      user.value = await signupWithEmail(email, password, name);
      toast.success("Signup successful!");
    } catch (err: any) {
      error.value = err.message;
      toast.error(error.value);
    } finally {
      loading.value = false;
    }
  };

  const signupGoogle = async () => {
    loading.value = true;
    error.value = null;
    try {
      user.value = await signupWithGoogle();
      toast.success("Signup with Google successful!");
    } catch (err: any) {
      error.value = err.message;
      toast.error(error.value);
    } finally {
      loading.value = false;
    }
  };

  

 const fetchAllUsers = async () => {
  loading.value = true;
  try {
    const snapshot = await getDocs(collection(db, 'users'));
    alluser.value = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        uid: data.uid || "",
        displayName: data.displayName || "",
        email: data.email || "",
        isExtAuth: data.isExtAuth || false,
        subscriptionStatus: data.subscriptionStatus || "inactive",
        subscriptionPlan: data.subscriptionPlan || "free",
      } as User;
    });
  } catch (err: any) {
    error.value = err.message;
    toast.error("Failed to fetch users!");
  } finally {
    loading.value = false;
  }
};


  return {
    user,
    alluser,
    loading,
    error,
    loginEmail,
    loginGoogle,
    signupEmail,
    signupGoogle,
    fetchAllUsers,
  };
});
