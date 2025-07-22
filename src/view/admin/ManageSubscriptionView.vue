<template>
  <div class="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100">
    <SidebarView />

    <main class="flex-1 p-6 max-w-6xl mx-auto overflow-y-auto">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Subscription Plans</h1>
          <p class="text-gray-500 mt-1">Create and manage your streaming subscription plans</p>
        </div>
        <button 
          @click="openAddPlanModal" 
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
        >
          <PlusIcon class="w-5 h-5" />
          Create New Plan
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="store.loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>

      <!-- Empty State -->
      <div v-else-if="store.subscriptions.length === 0" class="bg-white p-8 rounded-xl text-center border border-gray-200 shadow-sm">
        <div class="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-4">
          <DocumentTextIcon class="w-10 h-10 text-blue-500" />
        </div>
        <h3 class="text-xl font-medium text-gray-800 mb-2">No Plans Created Yet</h3>
        <p class="text-gray-500 mb-6">Get started by creating your first subscription plan</p>
        <button 
          @click="openAddPlanModal" 
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Plan
        </button>
      </div>

      <!-- Plans Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="plan in store.subscriptions" 
          :key="plan.id" 
          class="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-xl font-bold text-gray-800">{{ plan.name }}</h3>
            <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {{ plan.quality }}
            </span>
          </div>
          
          <div class="space-y-3 mb-6">
            <div class="flex items-center gap-2">
              <CurrencyDollarIcon class="w-5 h-5 text-gray-400" />
              <span class="text-gray-700">
                <span class="font-bold text-2xl">${{ plan.price }}</span>
                <span class="text-gray-500 text-sm"> /month</span>
              </span>
            </div>
            
            <div class="flex items-center gap-2">
              <DeviceTabletIcon class="w-5 h-5 text-gray-400" />
              <span class="text-gray-700">
                Up to {{ plan.max_screens }} {{ plan.max_screens > 1 ? 'screens' : 'screen' }} simultaneously
              </span>
            </div>
          </div>
          
          <div class="flex gap-2">
            <button 
              @click="openEditPlanModal(plan)" 
              class="px-3 py-1.5 text-sm bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors flex items-center gap-1"
            >
              <PencilSquareIcon class="w-4 h-4" />
              Edit
            </button>
            <button 
              @click="confirmDelete(plan.id)" 
              class="px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-1"
            >
              <TrashIcon class="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Add/Edit Plan Modal -->
      <transition name="fade">
        <div v-if="showModal" class="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div 
            class="bg-white rounded-xl w-full max-w-md shadow-xl"
            @click.stop
          >
            <div class="p-6 space-y-4">
              <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold">{{ isEditing ? 'Edit Plan' : 'Create New Plan' }}</h2>
                <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
                  <XMarkIcon class="w-6 h-6" />
                </button>
              </div>
              
              <div v-if="errorMessage" class="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                {{ errorMessage }}
              </div>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
                  <input 
                    v-model="currentPlan.name" 
                    type="text" 
                    placeholder="e.g. Premium Plan" 
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Monthly Price ($)</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span class="text-gray-500">$</span>
                    </div>
                    <input 
                      v-model.number="currentPlan.price" 
                      type="number" 
                      min="0" 
                      step="0.01" 
                      class="w-full pl-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Maximum Screens</label>
                  <select 
                    v-model.number="currentPlan.max_screens" 
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option v-for="n in 6" :value="n" :key="n">{{ n }} {{ n > 1 ? 'screens' : 'screen' }}</option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Video Quality</label>
                  <div class="grid grid-cols-3 gap-2">
                    <button 
                      v-for="quality in ['SD', 'HD', '4K']" 
                      :key="quality"
                      @click="currentPlan.quality = quality"
                      class="p-2 border rounded-lg text-center"
                      :class="{
                        'border-blue-500 bg-blue-50': currentPlan.quality === quality,
                        'border-gray-300 hover:bg-gray-50': currentPlan.quality !== quality
                      }"
                    >
                      {{ quality }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="bg-gray-50 px-6 py-4 rounded-b-xl flex justify-end gap-3">
              <button 
                @click="closeModal" 
                class="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                @click="savePlan" 
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                :disabled="isSaving"
              >
                <span v-if="isSaving">Saving...</span>
                <span v-else>{{ isEditing ? 'Update Plan' : 'Create Plan' }}</span>
              </button>
            </div>
          </div>
        </div>
      </transition>

      <!-- Delete Confirmation Modal -->
      <transition name="fade">
        <div v-if="showDeleteModal" class="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div class="bg-white rounded-xl w-full max-w-md shadow-xl p-6">
            <div class="text-center">
              <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <ExclamationTriangleIcon class="h-6 w-6 text-red-600" />
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">Delete Subscription Plan</h3>
              <p class="text-gray-500 mb-6">Are you sure you want to delete this plan? This action cannot be undone.</p>
            </div>
            <div class="flex justify-center gap-3">
              <button 
                @click="showDeleteModal = false" 
                class="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                @click="deletePlanHandler" 
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                :disabled="isDeleting"
              >
                <span v-if="isDeleting">Deleting...</span>
                <span v-else>Delete Plan</span>
              </button>
            </div>
          </div>
        </div>
      </transition>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import SidebarView from '../../components/SidebarView.vue';
import { useSubscriptionStore } from '../../stores/subscriptionStore';
import type { SubscriptionPlan } from '../../Interface/subscriptionPlan';
import { 
  PlusIcon,
  TrashIcon,
  XMarkIcon,
  CurrencyDollarIcon,
  DeviceTabletIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  PencilSquareIcon
} from '@heroicons/vue/24/outline';

const store = useSubscriptionStore();
const showModal = ref(false);
const showDeleteModal = ref(false);
const errorMessage = ref<string | null>(null);
const isSaving = ref(false);
const isDeleting = ref(false);
const isEditing = ref(false);
const planToDelete = ref<string | null>(null);
const currentPlanId = ref<string | null>(null);

const currentPlan = ref<Omit<SubscriptionPlan, 'id'>>({
  name: '',
  price: 0,
  max_screens: 1,
  quality: 'SD',
});

const resetCurrentPlan = () => {
  currentPlan.value = {
    name: '',
    price: 0,
    max_screens: 1,
    quality: 'SD',
  };
  currentPlanId.value = null;
  isEditing.value = false;
};

onMounted(() => store.startListening());
onUnmounted(() => store.stopListening());

const openAddPlanModal = () => {
  errorMessage.value = null;
  resetCurrentPlan();
  showModal.value = true;
};

const openEditPlanModal = (plan: SubscriptionPlan) => {
  errorMessage.value = null;
  currentPlan.value = { 
    name: plan.name, 
    price: plan.price, 
    max_screens: plan.max_screens, 
    quality: plan.quality 
  };
  currentPlanId.value = plan.id;
  isEditing.value = true;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  resetCurrentPlan();
};

const validatePlan = (): boolean => {
  if (!currentPlan.value.name.trim()) {
    errorMessage.value = 'Plan name is required';
    return false;
  }
  
  if (currentPlan.value.price <= 0) {
    errorMessage.value = 'Price must be greater than 0';
    return false;
  }
  
  if (currentPlan.value.max_screens < 1) {
    errorMessage.value = 'At least 1 screen is required';
    return false;
  }
  
  if (!['SD', 'HD', '4K'].includes(currentPlan.value.quality)) {
    errorMessage.value = 'Please select a valid quality option';
    return false;
  }
  
  errorMessage.value = null;
  return true;
};

const savePlan = async () => {
  if (!validatePlan()) return;
  
  try {
    isSaving.value = true;
    
    if (isEditing.value && currentPlanId.value) {
      await store.updatePlan(currentPlanId.value, currentPlan.value);
    } else {
      await store.addPlan(currentPlan.value);
    }
    
    showModal.value = false;
    resetCurrentPlan();
  } catch (error) {
    errorMessage.value = 'An error occurred while saving the plan. Please try again.';
    console.error('Error saving plan:', error);
  } finally {
    isSaving.value = false;
  }
};

const confirmDelete = (id: string) => {
  planToDelete.value = id;
  showDeleteModal.value = true;
};

const deletePlanHandler = async () => {
  if (!planToDelete.value) return;
  
  try {
    isDeleting.value = true;
    await store.deletePlan(planToDelete.value);
    showDeleteModal.value = false;
    planToDelete.value = null;
  } catch (error) {
    errorMessage.value = 'An error occurred while deleting the plan. Please try again.';
    console.error('Error deleting plan:', error);
  } finally {
    isDeleting.value = false;
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Smooth transitions for interactive elements */
button, input, select {
  transition: all 0.15s ease;
}

/* Focus styles */
input:focus, select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}
</style>