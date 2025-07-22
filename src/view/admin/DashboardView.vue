<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <SidebarView />

    <!-- Main Content -->
    <div class="flex flex-col flex-1 overflow-hidden">
      <!-- Main content area -->
      <div class="flex-1 overflow-auto p-4 md:p-6">
        <div class="mb-6">
          <h1 class="text-2xl md:text-3xl font-bold text-gray-800">Dashboard Overview</h1>
          <p class="text-gray-600 mt-1">Welcome back! Here's what's happening with your platform today.</p>
        </div>

        <!-- Stats Cards - Standardized -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <!-- Total Videos Card -->
          <div class="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md transition-all">
            <div class="flex items-center">
              <div class="p-3 rounded-lg bg-blue-50 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-sm font-medium text-gray-500">Total Videos</h3>
                <p class="text-xl font-semibold text-gray-900 mt-1">{{ videos.length }}</p>
                <p v-if="videos.length === 0" class="text-xs text-gray-400 mt-1">No videos available</p>
                <p v-else class="text-xs px-2 py-1 text-blue-800 bg-blue-100 mt-1">{{ videos.length }} available</p>
              </div>
            </div>
          </div>

          <!-- Total Users Card -->
          <div class="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md transition-all">
            <div class="flex items-center">
              <div class="p-3 rounded-lg bg-purple-50 text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-sm font-medium text-gray-500">Total Users</h3>
                <p class="text-xl font-semibold text-gray-900 mt-1">{{ alluser.length }}</p>
                <p v-if="alluser.length === 0" class="text-xs text-gray-400 mt-1">No videos available</p>
                <p v-else class="text-xs px-2 py-1 text-purple-800 bg-purple-100 mt-1">{{ alluser.length }} available</p>
              </div>
            </div>
          </div>

          <!-- Active Subscriptions Card -->
          <div class="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md transition-all">
            <div class="flex items-center">
              <div class="p-3 rounded-lg bg-green-50 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-sm font-medium text-gray-500">Active Subscriptions</h3>
                <p class="text-xl font-semibold text-gray-900 mt-1">{{ subscriptions.length }}</p>
                <div v-if="subscriptions.length > 0" class="flex flex-wrap gap-1 mt-1">
                  <span v-for="sub in subscriptions.slice(0, 2)" :key="sub.id" 
                    class="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                    {{ sub.name }}.{{ sub.quality }}
                  </span>
                  <span v-if="subscriptions.length > 2" class="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded">
                    +{{ subscriptions.length - 2 }} more
                  </span>
                </div>
                <p v-else class="text-xs text-gray-400 mt-1">No active subscriptions</p>
              </div>
            </div>
          </div>

          <!-- Total Categories Card -->
          <div class="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md transition-all">
            <div class="flex items-center">
              <div class="p-3 rounded-lg bg-yellow-50 text-yellow-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-sm font-medium text-gray-500">Total Categories</h3>
                <p class="text-xl font-semibold text-gray-900 mt-1">{{ categories.length }}</p>
                <div v-if="categories.length > 0" class="flex flex-wrap gap-1 mt-1">
                  <span v-for="cat in categories.slice(0, 2)" :key="cat.id" 
                    class="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                    {{ cat.name }}
                  </span>
                  <span v-if="categories.length > 2" class="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded">
                    +{{ categories.length - 2 }} more
                  </span>
                </div>
                <p v-else class="text-xs text-gray-400 mt-1">No categories found</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity and Quick Actions - Fixed Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <!-- Recent Activity - Takes 2/3 width -->
          <div class="lg:col-span-2 bg-white rounded-lg shadow-sm p-4 border border-gray-200 h-[420px] overflow-hidden">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-gray-800">Recent Activity</h2>
              <button class="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                View All
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div class="space-y-3 h-[calc(100%-40px)] overflow-y-auto scrollbar-hide">
              <template v-if="videos.length > 0">
                <div 
                  v-for="video in videos.slice(-4).reverse()" 
                  :key="video.id" 
                  class="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div class="relative flex-shrink-0 w-12 h-9 overflow-hidden rounded-md bg-gray-100">
                    <img 
                      :src="video.thumbnail_url || 'https://via.placeholder.com/150'" 
                      alt="Video thumbnail" 
                      class="w-full h-full object-cover"
                    >
                    <div class="absolute inset-0 flex items-center justify-center">
                      <div class="p-0.5 bg-black/50 rounded-full text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="ml-3 flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-800 truncate">{{ video.title }}</p>
                    <div class="text-xs text-gray-500 mt-1 space-y-1">
                      <div>{{ categoryStore.getCategoryName(video.category_id) }}</div>
                      <div class="truncate">{{ video.description }}</div>
                      <div>{{ formatDate(video.created_at) }}</div>
                    </div>
                  </div>
                  <button class="p-1 text-gray-400 hover:text-gray-600 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </template>
              <div v-else class="text-center py-8">
                <div class="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 class="text-base font-medium text-gray-900">No activity yet</h3>
                <p class="mt-1 text-sm text-gray-500">Recent platform activities will appear here</p>
                <router-link 
                  to="/admin/videos" 
                  class="mt-3 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Add Your First Video
                </router-link>
              </div>
              <template v-if="subscriptions.length > 0">
                <div 
                  v-for="subscription in subscriptions.slice(-4).reverse()" 
                  :key="subscription.id" 
                  class="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div class="p-2 rounded-lg bg-green-50 text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div class="ml-3 flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-800 truncate">{{ subscription.name }}</p>
                    <div class="flex items-center mt-1 text-xs text-gray-500">
                      <span>{{ subscription.max_screens || 'Uncategorized' }}</span>
                      <span class="mx-2">•</span>
                      <span>${{ subscription.price }}</span>
                      <span class="mx-1">/month</span>
                    </div>
                  </div>
                  <button class="p-1 text-gray-400 hover:text-gray-600 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </template>
              
            </div>
          </div>

          <!-- Quick Actions - Takes 1/3 width with fixed height -->
          <div class="bg-white rounded-lg shadow-sm p-4 border border-gray-200 h-[420px] overflow-hidden">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div class="grid grid-cols-1 gap-3 h-[calc(100%-60px)]">
              <router-link 
                to="/admin/videos" 
                class="w-full flex items-center justify-between px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <span class="font-medium">Add New Video</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </router-link>
              <router-link 
                to="/admin/categories" 
                class="w-full flex items-center justify-between px-4 py-3 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors"
              >
                <span class="font-medium">Create Category</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </router-link>
              <router-link 
                to="/admin/subscriptions" 
                class="w-full flex items-center justify-between px-4 py-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
              >
                <span class="font-medium">View Plans</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </router-link>
              <router-link 
                to="/admin/users" 
                class="w-full flex items-center justify-between px-4 py-3 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <span class="font-medium">Manage Users</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>

        <!-- Recent Videos and Users -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <!-- Recent Videos -->
          <div class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <div class="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h2 class="text-base font-semibold text-gray-800">Recent Videos</h2>
              <router-link 
                to="/admin/videos" 
                class="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                View All
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </router-link>
            </div>
            <div v-if="videos.length > 0" class="divide-y divide-gray-200">
              <div 
                v-for="video in videos.slice(0, 4)" 
                :key="video.id" 
                class="p-3 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div class="flex items-center space-x-3">
                  <div class="relative flex-shrink-0">
                    <img 
                      :src="video.thumbnail_url || 'https://via.placeholder.com/150'" 
                      alt="Video thumbnail" 
                      class="w-12 h-9 object-cover rounded-md border"
                      
                    >
                    <div class="absolute inset-0 flex items-center justify-center">
                      <div class="p-0.5 bg-black/50 rounded-full text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate">{{ video.title }}</p>
                    <div class="flex items-center mt-1 text-xs text-gray-500">
                      <span class="truncate">{{ video.description }}</span>
                    </div>
                  </div>
                  <button class="p-1 text-gray-400 hover:text-gray-600 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div v-else class="px-4 py-8 text-center">
              <div class="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="text-sm font-medium text-gray-900">No videos added yet</h3>
              <p class="mt-1 text-xs text-gray-500">Upload your first video to get started</p>
              <router-link 
                to="/admin/videos" 
                class="mt-3 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Add Video
              </router-link>
            </div>
          </div>

          <!-- Recent Users -->
          <!-- Recent Users -->
<div class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
  <div class="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
    <h2 class="text-base font-semibold text-gray-800">Recent Users</h2>
    <router-link 
      to="/admin/users" 
      class="text-sm text-blue-600 hover:text-blue-800 flex items-center"
    >
      View All
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </router-link>
  </div>
  <div v-if="alluser.length > 0" class="divide-y divide-gray-200">
    <div 
      v-for="user in alluser.slice(0, 4)" 
      :key="user.uid" 
      class="p-3 hover:bg-gray-50 transition-colors cursor-pointer"
    >
      <div class="flex items-center space-x-3">
        <div class="flex-shrink-0">
          <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium">
            {{ user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U' }}
          </div>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate">
            {{ user.displayName || 'No name' }}
          </p>
          <div class="flex items-center mt-1 text-xs text-gray-500">
            <span class="truncate">{{ user.email }}</span>
          </div>
        </div>
        <div class="text-xs px-2 py-1 rounded-full" 
             :class="user.email ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'">
          {{ user.email ? 'Verified' : 'Unverified' }}
        </div>
      </div>
    </div>
  </div>
  <div v-else class="px-4 py-8 text-center">
    <div class="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    </div>
    <h3 class="text-sm font-medium text-gray-900">No users registered yet</h3>
    <p class="mt-1 text-xs text-gray-500">User accounts will appear here when created</p>
  </div>
</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SidebarView from '../../components/SidebarView.vue'
import { useVideoStore } from '../../stores/videoStore'
import { useCategoryStore } from '../../stores/categoryStore'
import { onMounted, computed } from 'vue'
import { useSubscriptionStore } from '../../stores/subscriptionStore'
import { useAuthStore } from '../../stores/authStore'
const categoryStore = useCategoryStore()
const videoStore = useVideoStore()
const subscriptionStore=useSubscriptionStore()
const authStore = useAuthStore()
const videos = computed(() => videoStore.videos)
const categories = computed(() => categoryStore.categories)
const subscriptions=computed(()=>subscriptionStore.subscriptions)
const alluser=computed(()=>authStore.alluser)

onMounted(() => {
  categoryStore.loadCategories()
  videoStore.loadVideos()
  subscriptionStore.startListening()
  authStore.fetchAllUsers()
})


const formatDate = (dateString: any) => {
  if (!dateString) return 'No date available'

  let date
  if (typeof dateString === 'object' && 'seconds' in dateString) {
    date = new Date(dateString.seconds * 1000)
  } else {
    date = new Date(dateString)
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}
</script>


<style scoped>
/* Smooth transitions for interactive elements */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Hover effects for cards */
.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Custom scrollbar for activity feed */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
</style>