<template>
  <div class="min-h-screen flex" :class="{'bg-gray-900': darkMode, 'bg-gray-100': !darkMode}">

    <!-- Sidebar -->
    <aside class="w-64 shadow-md hidden md:block transition-colors duration-300" 
           :class="{'bg-gray-800': darkMode, 'bg-white': !darkMode}">
      <div class="p-4 border-b" :class="{'border-gray-700': darkMode, 'border-gray-200': !darkMode}">
        <h1 class="text-xl font-bold" :class="{'text-blue-400': darkMode, 'text-blue-600': !darkMode}">CineVerse</h1>
      </div>
      <nav class="p-4">
        <ul class="space-y-2">
          <li>
            <router-link to="/dashboard" class="flex items-center p-2 rounded-lg transition-colors"
                         :class="{'text-blue-400 bg-blue-900 bg-opacity-30': darkMode && $route.path === '/dashboard',
                                  'text-blue-600 bg-blue-50': !darkMode && $route.path === '/dashboard',
                                  'text-gray-400 hover:bg-gray-700': darkMode && $route.path !== '/dashboard',
                                  'text-gray-700 hover:bg-gray-100': !darkMode && $route.path !== '/dashboard'}">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span class="ml-3">Dashboard</span>
            </router-link>
          </li>
          <li>
            <router-link to="/profile" class="flex items-center p-2 rounded-lg transition-colors"
               :class="{'text-gray-400 hover:bg-gray-700': darkMode,
                        'text-gray-700 hover:bg-gray-100': !darkMode}">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
              <span class="ml-3">Profile</span>
            </router-link>
          </li>
          <li>
            <a href="#" class="flex items-center p-2 rounded-lg transition-colors"
               :class="{'text-gray-400 hover:bg-gray-700': darkMode,
                        'text-gray-700 hover:bg-gray-100': !darkMode}">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
              <span class="ml-3">Search</span>
            </a>
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

      <!-- Top Header -->
      <header class="shadow-sm" :class="{'bg-gray-800': darkMode, 'bg-white': !darkMode}">
        <div class="flex items-center justify-between p-4">
          <!-- Mobile menu button -->
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden p-2 rounded-md"
                  :class="{'text-gray-400 hover:bg-gray-700': darkMode,
                           'text-gray-500 hover:bg-gray-100': !darkMode}">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <!-- Search Bar -->
          <div class="relative w-full max-w-md mx-4">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="{'text-gray-400': darkMode, 'text-gray-500': !darkMode}" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
            <input 
              type="text" 
              class="block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 transition-colors"
              :class="{'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500': darkMode,
                       'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-transparent': !darkMode}"
              placeholder="Search videos..."
              v-model="searchQuery"
            >
          </div>

          <!-- User Profile -->
          <div class="ml-4 flex items-center">
            <div class="relative group">
              <button class="flex items-center space-x-2 focus:outline-none">
                <div class="h-10 w-10 rounded-full flex items-center justify-center font-semibold"
                     :class="{'bg-blue-600 text-white': darkMode, 'bg-blue-500 text-white': !darkMode}">
                  {{ userInitials }}
                </div>
                <span class="hidden md:inline-block font-medium" :class="{'text-white': darkMode, 'text-gray-900': !darkMode}">
                  {{ user?.displayName || user?.email }}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hidden md:inline-block" 
                     :class="{'text-gray-400': darkMode, 'text-gray-500': !darkMode}" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
              <div class="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-10 hidden group-hover:block transition-all"
                   :class="{'bg-gray-700': darkMode, 'bg-white': !darkMode}">
                <a href="#" @click="signOut" class="block px-4 py-2 text-sm transition-colors"
                   :class="{'text-gray-300 hover:bg-gray-600': darkMode,
                            'text-gray-700 hover:bg-gray-100': !darkMode}">Sign out</a>
              </div>
            </div>
          </div>
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
                            :class="{'text-blue-400 bg-blue-900 bg-opacity-30': darkMode && $route.path === '/dashboard',
                                     'text-blue-600 bg-blue-50': !darkMode && $route.path === '/dashboard',
                                     'text-gray-400 hover:bg-gray-700': darkMode && $route.path !== '/dashboard',
                                     'text-gray-700 hover:bg-gray-100': !darkMode && $route.path !== '/dashboard'}"
                            @click="mobileMenuOpen = false">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <span class="ml-3">Dashboard</span>
                </router-link>
              </li>
              <li>
                <a href="#" class="flex items-center p-2 rounded-lg transition-colors"
                   :class="{'text-gray-400 hover:bg-gray-700': darkMode,
                            'text-gray-700 hover:bg-gray-100': !darkMode}"
                   @click="mobileMenuOpen = false">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                  </svg>
                  <span class="ml-3">Profile</span>
                </a>
              </li>
              <li>
                <a href="#" class="flex items-center p-2 rounded-lg transition-colors"
                   :class="{'text-gray-400 hover:bg-gray-700': darkMode,
                            'text-gray-700 hover:bg-gray-100': !darkMode}"
                   @click="mobileMenuOpen = false">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                  </svg>
                  <span class="ml-3">Search</span>
                </a>
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

      <!-- Video Player Modal -->
      <transition enter-active-class="transition ease-out duration-300"
                  enter-from-class="opacity-0"
                  enter-to-class="opacity-100"
                  leave-active-class="transition ease-in duration-200"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0">
        <div v-if="showVideoPlayer" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
          <div class="relative w-full max-w-4xl">
            <button @click="closeVideoPlayer" class="absolute -top-10 right-0 text-white hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div class="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
              <video 
                ref="videoPlayer" 
                :src="currentVideoUrl" 
                controls 
                autoplay 
                class="w-full h-full"
                @ended="onVideoEnded"
              ></video>
            </div>
            <div class="mt-4 text-white">
              <h3 class="text-xl font-bold">{{ currentVideoTitle }}</h3>
              <p class="text-gray-300 mt-2">{{ currentVideoDescription }}</p>
            </div>
          </div>
        </div>
      </transition>

      <!-- Main Content Area -->
      <main class="flex-1 overflow-y-auto p-6 max-w-6xl mx-auto space-y-6">

        <!-- Category Filter -->
        <section class="rounded-xl shadow p-4 transition-colors"
                 :class="{'bg-gray-800': darkMode, 'bg-white': !darkMode}">
          <h2 class="text-xl font-semibold mb-4" :class="{'text-white': darkMode, 'text-gray-900': !darkMode}">Categories</h2>
          <div class="flex flex-wrap gap-2">
            <button 
              class="px-4 py-2 rounded transition-colors border"
              :class="{'bg-blue-600 text-white border-blue-600': selectedCategory === '' && darkMode,
                       'bg-blue-500 text-white border-blue-500': selectedCategory === '' && !darkMode,
                       'text-blue-400 hover:bg-blue-900 hover:bg-opacity-30 border-blue-400': selectedCategory !== '' && darkMode,
                       'text-blue-600 hover:bg-blue-100 border-blue-500': selectedCategory !== '' && !darkMode}"
              @click="selectedCategory = ''"
            >
              All
            </button>
            <button
              v-for="cat in categories"
              :key="cat.id"
              class="px-4 py-2 rounded transition-colors border"
              :class="{'bg-blue-600 text-white border-blue-600': selectedCategory === cat.id && darkMode,
                       'bg-blue-500 text-white border-blue-500': selectedCategory === cat.id && !darkMode,
                       'text-blue-400 hover:bg-blue-900 hover:bg-opacity-30 border-blue-400': selectedCategory !== cat.id && darkMode,
                       'text-blue-600 hover:bg-blue-100 border-blue-500': selectedCategory !== cat.id && !darkMode}"
              @click="selectedCategory = cat.id"
            >
              {{ cat.name }}
            </button>
          </div>
        </section>

        <!-- All Videos -->
        <section class="rounded-xl shadow p-4 transition-colors"
                 :class="{'bg-gray-800': darkMode, 'bg-white': !darkMode}">
          <h2 class="text-xl font-semibold mb-4" :class="{'text-white': darkMode, 'text-gray-900': !darkMode}">All Videos</h2>
          <div v-if="filteredVideos.length === 0" class="text-gray-500">No videos available.</div>
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div 
              v-for="vid in filteredVideos" 
              :key="vid.id"
              class="rounded-lg shadow hover:shadow-lg transition relative group overflow-hidden"
              :class="{'bg-gray-700': darkMode, 'bg-gray-50': !darkMode}"
            >
              <div class="relative">
                <img :src="vid.thumbnail_url" class="w-full h-40 object-cover rounded-t-lg" />
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button @click="playVideo(vid)" class="bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="p-4">
                <h3 class="text-lg font-bold truncate" :class="{'text-white': darkMode, 'text-gray-900': !darkMode}">{{ vid.title }}</h3>
                <p class="text-sm line-clamp-2" :class="{'text-gray-300': darkMode, 'text-gray-600': !darkMode}">{{ vid.description }}</p>
                <div class="flex justify-between items-center mt-2">
                  <span class="text-xs" :class="{'text-gray-400': darkMode, 'text-gray-500': !darkMode}">
                    Category: {{ getCategoryName(vid.category_id) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Recommended Videos -->
        <section class="rounded-xl shadow p-4 transition-colors"
                 :class="{'bg-gray-800': darkMode, 'bg-white': !darkMode}">
          <h2 class="text-xl font-semibold mb-4" :class="{'text-white': darkMode, 'text-gray-900': !darkMode}">Recommended For You</h2>
          <div v-if="recommenedVideos.length === 0" class="text-gray-500">No recommended videos yet.</div>
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div 
              v-for="vid in recommenedVideos"
              :key="vid.id"
              class="rounded-lg shadow hover:shadow-lg transition relative group overflow-hidden"
              :class="{'bg-gray-700': darkMode, 'bg-gray-50': !darkMode}"
            >
              <div class="relative">
                <img :src="vid.thumbnail_url" class="w-full h-40 object-cover rounded-t-lg" />
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button @click="playVideo(vid)" class="bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="p-4">
                <h3 class="text-lg font-bold truncate" :class="{'text-white': darkMode, 'text-gray-900': !darkMode}">{{ vid.title }}</h3>
                <p class="text-sm line-clamp-2" :class="{'text-gray-300': darkMode, 'text-gray-600': !darkMode}">{{ vid.description }}</p>
                <div class="flex justify-between items-center mt-2">
                  <span class="text-xs" :class="{'text-gray-400': darkMode, 'text-gray-500': !darkMode}">
                    Category: {{ getCategoryName(vid.category_id) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';
import { useVideoStore } from '../../stores/videoStore';
import { useCategoryStore } from '../../stores/categoryStore';
import { useAuthStore } from '../../stores/authStore';
import { useRouter } from 'vue-router';

const videoStore = useVideoStore();
const categoryStore = useCategoryStore();
const authStore = useAuthStore();
const router = useRouter();

const selectedCategory = ref<string>('');
const searchQuery = ref<string>('');
const darkMode = ref<boolean>(false);
const mobileMenuOpen = ref<boolean>(false);
const showVideoPlayer = ref<boolean>(false);
const currentVideoUrl = ref<string>('');
const currentVideoTitle = ref<string>('');
const currentVideoDescription = ref<string>('');
const videoPlayer = ref<HTMLVideoElement | null>(null);

// Check for saved dark mode preference
onMounted(() => {
  videoStore.loadVideos();
  categoryStore.loadCategories();
  
  const savedMode = localStorage.getItem('darkMode');
  if (savedMode !== null) {
    darkMode.value = savedMode === 'true';
  } else {
    // Default to user's preferred color scheme
    darkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
});

const videos = computed(() => videoStore.videos);
const categories = computed(() => categoryStore.categories);
const user = computed(() => authStore.user);

// Get user initials for avatar
const userInitials = computed(() => {
  if (!user.value) return router.push('/');
  if (user.value.displayName) {
    const names = user.value.displayName.split(' ');
    return names.map(name => name[0]).join('').toUpperCase().substring(0, 2);
  }
  return user.value.email.substring(0, 2).toUpperCase();
});

// Filter videos by category and search query
const filteredVideos = computed(() => {
  let result = videos.value;
  
  if (selectedCategory.value) {
    result = result.filter(video => video.category_id === selectedCategory.value);
  }
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(video => 
      video.title.toLowerCase().includes(query) || 
      video.description.toLowerCase().includes(query)
    );
  }
  
  return result;
});

// Recommended Videos (latest 5)
const recommenedVideos = computed(() => {
  return [...videos.value].slice(-5).reverse();
});

const getCategoryName = (id: string): string => categoryStore.getCategoryName(id);

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
  localStorage.setItem('darkMode', darkMode.value.toString());
};

const playVideo = (video: any) => {
  currentVideoUrl.value = video.video_url;
  currentVideoTitle.value = video.title;
  currentVideoDescription.value = video.description;
  showVideoPlayer.value = true;
  
  // Wait for the modal to render and video element to be available
  nextTick(() => {
    if (videoPlayer.value) {
      videoPlayer.value.load(); // Ensure the video is loaded
      videoPlayer.value.play().catch(error => {
        console.error('Error attempting to play video:', error);
      });
    }
  });
};

const closeVideoPlayer = () => {
  showVideoPlayer.value = false;
  if (videoPlayer.value) {
    videoPlayer.value.pause();
    videoPlayer.value.currentTime = 0;
  }
};

const onVideoEnded = () => {
  // You can add logic here for when the video ends
  console.log('Video ended');
};

const signOut = async () => {
  try {
    router.push('/');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
}

.aspect-h-9 {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

/* Ensure video fills its container */
video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>