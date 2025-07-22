import { defineStore } from "pinia";
import { ref, onUnmounted } from "vue";
import {
  subscribeToPlans,
  addSubscriptionPlan,
  deleteSubscriptionPlan,
  updateSubscriptionPlan
} from "../services/subscriptionService";
import type { SubscriptionPlan } from "../Interface/subscriptionPlan";
import { useToast } from "vue-toastification";

export const useSubscriptionStore = defineStore("subscription", () => {
  const subscriptions = ref<SubscriptionPlan[]>([]);
  const loading = ref(false);
  const toast = useToast();
  let unsubscribe: (() => void) | null = null;

  const startListening = () => {
    loading.value = true;
    unsubscribe = subscribeToPlans((plans) => {
      subscriptions.value = plans;
      loading.value = false;
    });
  };

  const stopListening = () => {
    if (unsubscribe) unsubscribe();
  };

  const addPlan = async (plan: Omit<SubscriptionPlan, "id">) => {
    try {
      await addSubscriptionPlan(plan);
      toast.success("Plan added successfully!");
    } catch (error: any) {
      toast.error("Failed to add plan: " + (error.message || ""));
      throw error;
    }
  };

  const deletePlan = async (id: string) => {
    try {
      await deleteSubscriptionPlan(id);
      toast.success("Plan deleted successfully!");
    } catch (error: any) {
      toast.error("Failed to delete plan: " + (error.message || ""));
      throw error;
    }
  };

  const updatePlan = async (id: string, updatedData: Partial<Omit<SubscriptionPlan, "id">>) => {
    try {
      await updateSubscriptionPlan(id, updatedData);
      toast.success("Plan updated successfully!");
    } catch (error: any) {
      toast.error("Failed to update plan: " + (error.message || ""));
      throw error;
    }
  };

  onUnmounted(() => stopListening());

  return { 
    subscriptions, 
    loading, 
    startListening, 
    stopListening, 
    addPlan, 
    deletePlan,
    updatePlan 
  };
});