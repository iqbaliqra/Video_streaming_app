<template>
  <div class="min-h-screen flex" :class="{'bg-gray-900': darkMode, 'bg-gray-100': !darkMode}">

    <!-- Sidebar (same as dashboard) -->
    <aside class="w-64 shadow-md hidden md:block transition-colors duration-300" 
           :class="{'bg-gray-800': darkMode, 'bg-white': !darkMode}">
      <div class="p-4 border-b" :class="{'border-gray-700': darkMode, 'border-gray-200': !darkMode}">
        <h1 class="text-xl font-bold" :class="{'text-blue-400': darkMode, 'text-blue-600': !darkMode}">CineVerse</h1>
      </div>
      <nav class="p-4">
        <ul class="space-y-2">
          <li>
            <router-link to="/dashboard" class="flex items-center p-2 rounded-lg transition-colors"
                         :class="{'text-gray-400 hover:bg-gray-700': darkMode && $route.path !== '/dashboard',
                                  'text-gray-700 hover:bg-gray-100': !darkMode && $route.path !== '/dashboard',
                                  'text-blue-400 bg-blue-900 bg-opacity-30': darkMode && $route.path === '/dashboard',
                                  'text-blue-600 bg-blue-50': !darkMode && $route.path === '/dashboard'}">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span class="ml-3">Dashboard</span>
            </router-link>
          </li>
          <li>
            <router-link to="/profile" class="flex items-center p-2 rounded-lg transition-colors"
                         :class="{'text-gray-400 hover:bg-gray-700': darkMode && $route.path !== '/profile',
                                  'text-gray-700 hover:bg-gray-100': !darkMode && $route.path !== '/profile',
                                  'text-blue-400 bg-blue-900 bg-opacity-30': darkMode && $route.path === '/profile',
                                  'text-blue-600 bg-blue-50': !darkMode && $route.path === '/profile'}">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
              <span class="ml-3">Profile</span>
            </router-link>
          </li>
          <li class="pt-4 mt-4 border-t" :class="{'border-gray-700': darkMode, 'border-gray-200': !darkMode}">
            <button @click="toggleDarkMode" class="flex items-center p-2 w-full rounded-lg transition-colors"
                    :class="{'text-gray-400 hover:bg-gray-700': darkMode,
                             'text-gray-700 hover:bg-gray-100': !darkMode}">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path v-if="darkMode" d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                <path v-else fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
              </svg>
              <span class="ml-3">{{ darkMode ? 'Light Mode' : 'Dark Mode' }}</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Top Header (same as dashboard) -->
      <header class="shadow-sm" :class="{'bg-gray-800': darkMode, 'bg-white': !darkMode}">
        <div class="flex items-center justify-between p-4">
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden p-2 rounded-md"
                  :class="{'text-gray-400 hover:bg-gray-700': darkMode,
                           'text-gray-500 hover:bg-gray-100': !darkMode}">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      <!-- Mobile Sidebar Overlay -->
      <div v-if="mobileMenuOpen" class="fixed inset-0 z-40 md:hidden" @click="mobileMenuOpen = false">
        <div class="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <!-- Mobile Sidebar -->
      <transition enter-active-class="transition ease-in-out duration-300 transform"
                  enter-from-class="-translate-x-full"
                  enter-to-class="translate-x-0"
                  leave-active-class="transition ease-in-out duration-300 transform"
                  leave-from-class="translate-x-0"
                  leave-to-class="-translate-x-full">
        <aside v-if="mobileMenuOpen" class="fixed inset-y-0 left-0 z-50 w-64 shadow-md md:hidden"
               :class="{'bg-gray-800': darkMode, 'bg-white': !darkMode}">
          <div class="p-4 border-b" :class="{'border-gray-700': darkMode, 'border-gray-200': !darkMode}">
            <h1 class="text-xl font-bold" :class="{'text-blue-400': darkMode, 'text-blue-600': !darkMode}">CineVerse</h1>
          </div>
          <nav class="p-4">
            <ul class="space-y-2">
              <li>
                <router-link to="/dashboard" class="flex items-center p-2 rounded-lg transition-colors"
                            :class="{'text-gray-400 hover:bg-gray-700': darkMode && $route.path !== '/dashboard',
                                     'text-gray-700 hover:bg-gray-100': !darkMode && $route.path !== '/dashboard',
                                     'text-blue-400 bg-blue-900 bg-opacity-30': darkMode && $route.path === '/dashboard',
                                     'text-blue-600 bg-blue-50': !darkMode && $route.path === '/dashboard'}"
                            @click="mobileMenuOpen = false">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <span class="ml-3">Dashboard</span>
                </router-link>
              </li>
              <li>
                <router-link to="/profile" class="flex items-center p-2 rounded-lg transition-colors"
                            :class="{'text-gray-400 hover:bg-gray-700': darkMode && $route.path !== '/profile',
                                     'text-gray-700 hover:bg-gray-100': !darkMode && $route.path !== '/profile',
                                     'text-blue-400 bg-blue-900 bg-opacity-30': darkMode && $route.path === '/profile',
                                     'text-blue-600 bg-blue-50': !darkMode && $route.path === '/profile'}"
                            @click="mobileMenuOpen = false">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                  </svg>
                  <span class="ml-3">Profile</span>
                </router-link>
              </li>
              <li class="pt-4 mt-4 border-t" :class="{'border-gray-700': darkMode, 'border-gray-200': !darkMode}">
                <button @click="toggleDarkMode" class="flex items-center p-2 w-full rounded-lg transition-colors"
                        :class="{'text-gray-400 hover:bg-gray-700': darkMode,
                                 'text-gray-700 hover:bg-gray-100': !darkMode}">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path v-if="darkMode" d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    <path v-else fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
                  </svg>
                  <span class="ml-3">{{ darkMode ? 'Light Mode' : 'Dark Mode' }}</span>
                </button>
              </li>
            </ul>
          </nav>
        </aside>
      </transition>

      <!-- Main Content Area -->
      <main class="flex-1 overflow-y-auto p-6 max-w-4xl mx-auto">
        <div class="rounded-xl shadow-lg overflow-hidden transition-colors duration-300"
             :class="{'bg-gray-800': darkMode, 'bg-white': !darkMode}">
          
          <!-- Profile Header -->
          <div class="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <div class="h-24 w-24 rounded-full flex items-center justify-center text-white font-bold text-4xl"
                   :class="{'bg-blue-600': darkMode, 'bg-blue-500': !darkMode}">
                {{ userInitials }}
              </div>
              <div class="text-center md:text-left">
                <h2 class="text-2xl font-bold">{{ user?.displayName || 'User' }}</h2>
                <p class="text-blue-100">{{ user?.email }}</p>
              </div>
            </div>
          </div>
          
          <!-- Profile Details -->
          <div class="p-6">
            <h3 class="text-lg font-semibold mb-4" :class="{'text-white': darkMode, 'text-gray-900': !darkMode}">
              Account Information
            </h3>
            
            <div class="space-y-4">
              <!-- Display Name -->
              <div>
                <label class="block text-sm font-medium" :class="{'text-gray-300': darkMode, 'text-gray-700': !darkMode}">
                  Display Name
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <input 
                    type="text" 
                    v-model="displayName" 
                    class="flex-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    :class="{'bg-gray-700 border-gray-600 text-white': darkMode,
                             'bg-white border-gray-300 text-gray-900': !darkMode}"
                    placeholder="Your name"
                  >
                </div>
              </div>
              
              <!-- Email -->
              <div>
                <label class="block text-sm font-medium" :class="{'text-gray-300': darkMode, 'text-gray-700': !darkMode}">
                  Email Address
                </label>
                <div class="mt-1">
                  <div class="flex-1 block w-full rounded-md p-2" 
                       :class="{'bg-gray-700 text-gray-300': darkMode,
                                'bg-gray-100 text-gray-600': !darkMode}">
                    {{ user?.email }}
                  </div>
                </div>
              </div>
              
              <!-- Account Created -->
              <div>
                <label class="block text-sm font-medium" :class="{'text-gray-300': darkMode, 'text-gray-700': !darkMode}">
                  SubscriptionStatus
                </label>
                <div class="mt-1">
                  <div class="flex-1 block w-full rounded-md p-2" 
                       :class="{'bg-gray-700 text-gray-300': darkMode,
                                'bg-gray-100 text-gray-600': !darkMode}">
                    {{ user?.subscriptionStatus }}
                  </div>
                </div>
              </div>
              
              <!-- Last Sign In -->
              <div>
                <label class="block text-sm font-medium" :class="{'text-gray-300': darkMode, 'text-gray-700': !darkMode}">
                  SubscriptionPlan
                </label>
                <div class="mt-1">
                  <div class="flex-1 block w-full rounded-md p-2" 
                       :class="{'bg-gray-700 text-gray-300': darkMode,
                                'bg-gray-100 text-gray-600': !darkMode}">
                    {{ user?.subscriptionPlan }}
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Action Buttons -->
        
             
          </div>
        </div>
      </main>
    </div>
</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../../stores/authStore'
import { auth } from '../../firebase'
import router from '../../router'

const authStore = useAuthStore()


const darkMode = ref(false)
const mobileMenuOpen = ref(false)
const displayName = ref('')
const isUpdating = ref(false)
const isSendingVerification = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Check for saved dark mode preference
onMounted(() => {
  const savedMode = localStorage.getItem('darkMode')
  if (savedMode !== null) {
    darkMode.value = savedMode === 'true'
  } else {
    darkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  
  // Initialize display name with current user's display name
  if (authStore.user?.displayName) {
    displayName.value = authStore.user.displayName
  }
})

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
  localStorage.setItem('darkMode', darkMode.value.toString())
}

const user = computed(() => authStore.user)

const userInitials = computed(() => {
  if (!user.value) return router.push('/')
  if (user.value.displayName) {
    const names = user.value.displayName.split(' ')
    return names.map(name => name[0]).join('').toUpperCase().substring(0, 2)
  }
  return user.value.email.substring(0, 2).toUpperCase()
})

const formatDate = (timestamp) => {
  if (!timestamp) return 'Unknown'
  return new Date(timestamp).toLocaleString()
}


</script>

<style scoped>
/* Add any custom styles here if needed */
</style>