<template>
  <div class="flex flex-shrink-20">
    <div 
      class="flex flex-col bg-gray-800 border-r border-gray-700 transition-all duration-300 ease-in-out"
      :class="[isCollapsed ? 'w-20' : 'w-64']"
    >
      <!-- Collapse Button -->
      <div class="flex items-center justify-between h-16 px-4 bg-gray-900">
        <transition name="fade" mode="out-in">
          <div v-if="!isCollapsed" key="expanded" class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
            <span class="ml-2 text-xl font-bold text-white">CineVerse</span>
          </div>
          <div v-else key="collapsed" class="flex items-center justify-center w-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
          </div>
        </transition>
        <button 
          @click="toggleSidebar" 
          class="text-gray-400 hover:text-white focus:outline-none transition-colors duration-200"
          :class="{'ml-auto': isCollapsed}"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="isCollapsed" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>
      
      <div class="flex flex-col flex-grow px-2 py-4 overflow-y-auto">
        <nav class="flex-1 space-y-1">
          <router-link 
            to="/admin/dashboard" 
            class="flex items-center px-3 py-3 rounded-lg group transition-all duration-200"
            :class="[
              isCollapsed 
                ? 'justify-center text-gray-300 hover:bg-gray-700 mx-2' 
                : 'text-gray-300 hover:bg-gray-700 mx-1'
            ]"
            active-class="!bg-blue-600 !text-white"
          >
            <div class="relative flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="{'text-gray-400 group-hover:text-white': isCollapsed}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <transition name="slide-fade">
                <span v-if="!isCollapsed" class="ml-3 text-sm font-medium whitespace-nowrap">Dashboard</span>
              </transition>
            </div>
          </router-link>
          
          <router-link 
            to="/admin/videos" 
            class="flex items-center px-3 py-3 rounded-lg group transition-all duration-200"
            :class="[
              isCollapsed 
                ? 'justify-center text-gray-300 hover:bg-gray-700 mx-2' 
                : 'text-gray-300 hover:bg-gray-700 mx-1'
            ]"
            active-class="!bg-blue-600 !text-white"
          >
            <div class="relative flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="{'text-gray-400 group-hover:text-white': isCollapsed}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <transition name="slide-fade">
                <span v-if="!isCollapsed" class="ml-3 text-sm font-medium whitespace-nowrap">Manage Videos</span>
              </transition>
            </div>
          </router-link>
          
          <router-link 
            to="/admin/categories" 
            class="flex items-center px-3 py-3 rounded-lg group transition-all duration-200"
            :class="[
              isCollapsed 
                ? 'justify-center text-gray-300 hover:bg-gray-700 mx-2' 
                : 'text-gray-300 hover:bg-gray-700 mx-1'
            ]"
            active-class="!bg-blue-700 !text-white"
          >
            <div class="relative flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="{'text-gray-400 group-hover:text-white': isCollapsed}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <transition name="slide-fade">
                <span v-if="!isCollapsed" class="ml-3 text-sm font-medium whitespace-nowrap">Manage Categories</span>
              </transition>
            </div>
          </router-link>
          
          <router-link 
            to="/admin/users" 
            class="flex items-center px-3 py-3 rounded-lg group transition-all duration-200"
            :class="[
              isCollapsed 
                ? 'justify-center text-gray-300 hover:bg-gray-700 mx-2' 
                : 'text-gray-300 hover:bg-gray-700 mx-1'
            ]"
            active-class="!bg-blue-700 !text-white"
          >
            <div class="relative flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="{'text-gray-400 group-hover:text-white': isCollapsed}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <transition name="slide-fade">
                <span v-if="!isCollapsed" class="ml-3 text-sm font-medium whitespace-nowrap">Manage Users</span>
              </transition>
            </div>
          </router-link>
          
          <router-link 
            to="/admin/subscriptions" 
            class="flex items-center px-3 py-3 rounded-lg group transition-all duration-200"
            :class="[
              isCollapsed 
                ? 'justify-center text-gray-300 hover:bg-gray-700 mx-2' 
                : 'text-gray-300 hover:bg-gray-700 mx-1'
            ]"
            active-class="!bg-blue-700 !text-white"
          >
            <div class="relative flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="{'text-gray-400 group-hover:text-white': isCollapsed}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <transition name="slide-fade">
                <span v-if="!isCollapsed" class="ml-3 text-sm font-medium whitespace-nowrap">Subscription Plans</span>
              </transition>
            </div>
          </router-link>
          
           <router-link 
  to="/admin/login" 
  class="flex items-center px-3 py-3 rounded-lg group transition-all duration-200"
  :class="[
    isCollapsed 
      ? 'justify-center text-gray-300 hover:bg-gray-700 mx-2' 
      : 'text-gray-300 hover:bg-gray-700 mx-1'
  ]"
  active-class="!bg-blue-700 !text-white"
>
  <div class="relative flex items-center">
    <!-- Updated logout icon (power icon) -->
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      class="h-5 w-5" 
      :class="{'text-gray-400 group-hover:text-white': isCollapsed}" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
      />
    </svg>
    <transition name="slide-fade">
      <span v-if="!isCollapsed" class="ml-3 text-sm font-medium whitespace-nowrap">Logout</span>
    </transition>
  </div>
</router-link>
        </nav>
      </div>
      
      
      <div class="p-4 border-t border-gray-700">
        <transition name="fade" mode="out-in">
          <div v-if="!isCollapsed" key="expanded" class="flex items-center">
            <img class="w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Admin profile">
            <div class="ml-3">
              <p class="text-sm font-medium text-white">Admin User</p>
              <p class="text-xs font-medium text-gray-400">Super Admin</p>
            </div>
          </div>
          <div v-else key="collapsed" class="flex justify-center">
            <img class="w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Admin profile">
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'SidebarView',
  setup() {
    const isCollapsed = ref(false);
    
    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };
    
    return {
      isCollapsed,
      toggleSidebar
    };
  }
});
</script>

<style scoped>
/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide-fade transition */
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.15s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>