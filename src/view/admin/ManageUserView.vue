<template>
  <div class="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100">
    <SidebarView />

    <main class="flex-1 p-6 max-w-6xl mx-auto overflow-y-auto">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">User Management</h1>
          <p class="text-gray-500 mt-1">Manage all registered users and their subscriptions</p>
        </div>
        <div class="flex items-center space-x-3">
          <button 
            @click="fetchAllUsers"
            class="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="bg-white rounded-xl shadow-sm p-8 text-center">
        <div class="flex justify-center">
          <svg class="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p class="mt-4 text-lg font-medium text-gray-700">Loading users...</p>
        <p class="text-gray-500">Please wait while we fetch the latest data</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="users.length === 0" class="bg-white rounded-xl shadow-sm p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <h3 class="mt-4 text-xl font-medium text-gray-900">No users found</h3>
        <p class="mt-2 text-gray-500">There are currently no registered users in the system.</p>
        <button 
          @click="fetchAllUsers"
          class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Try Again
        </button>
      </div>

      <!-- User List -->
      <div v-else class="space-y-4">
        <div class="bg-white rounded-xl shadow-sm overflow-hidden">
          <div class="grid grid-cols-12 bg-gray-50 px-6 py-3 border-b border-gray-200">
            <div class="col-span-5 md:col-span-4 text-sm font-medium text-gray-500 uppercase tracking-wider">User</div>
            <div class="col-span-4 md:col-span-3 text-sm font-medium text-gray-500 uppercase tracking-wider">Subscription</div>
            <div class="col-span-3 md:col-span-3 text-sm font-medium text-gray-500 uppercase tracking-wider">Status</div>
            <div class="col-span-0 md:col-span-2"></div>
          </div>
          
          <div v-for="u in users" :key="u.uid" class="grid grid-cols-12 px-6 py-4 hover:bg-gray-50 transition-colors duration-150 items-center">
            <div class="col-span-5 md:col-span-4 flex items-center">
              <div class="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span class="text-blue-600 font-medium">{{ u.displayName ? u.displayName.charAt(0).toUpperCase() : 'U' }}</span>
              </div>
              <div class="ml-4">
                <h3 class="text-sm font-medium text-gray-900">{{ u.displayName || 'Unnamed User' }}</h3>
                <p class="text-sm text-gray-500 truncate max-w-[180px]">{{ u.email }}</p>
              </div>
            </div>
            
            <div class="col-span-4 md:col-span-3">
              <p class="text-sm text-gray-900 capitalize">{{ u.subscriptionPlan || 'None' }}</p>
              <p class="text-xs text-gray-500">Since {{ new Date().toLocaleDateString() }}</p>
            </div>
            
            <div class="col-span-3 md:col-span-3">
              <span 
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="{
                  'bg-green-100 text-green-800': u.subscriptionStatus === 'active',
                  'bg-red-100 text-red-800': u.subscriptionStatus === 'inactive',
                  'bg-gray-100 text-gray-800': !u.subscriptionStatus
                }"
              >
                {{ u.subscriptionStatus || 'unknown' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import SidebarView from '../../components/SidebarView.vue'
import { useAuthStore } from '../../stores/authStore'
import { onMounted, computed } from 'vue'

const authStore = useAuthStore()
const loading = computed(() => authStore.loading)
const users = computed(() => authStore.alluser)

const fetchAllUsers = async () => {
  await authStore.fetchAllUsers()
}

onMounted(() => {
  fetchAllUsers()
})
</script>