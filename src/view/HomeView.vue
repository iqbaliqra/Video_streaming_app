<template>
  <div class="min-h-screen bg-gray-900 text-white overflow-hidden">
    <!-- Enhanced Animated Background -->
    <div class="fixed inset-0 overflow-hidden z-0">
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-gray-900/40"></div>
      <div v-for="i in 30" :key="i" 
           class="absolute rounded-full opacity-10 animate-float"
           :class="['bg-blue-500', 'bg-purple-500', 'bg-cyan-400'][i % 3]"
           :style="{
             width: `${10 + Math.random() * 40}px`,
             height: `${10 + Math.random() * 40}px`,
             left: `${Math.random() * 100}%`,
             top: `${Math.random() * 100}%`,
             animationDuration: `${15 + Math.random() * 30}s`,
             animationDelay: `${Math.random() * 8}s`
           }"></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Hero Section -->
      <div class="text-center mb-16">
        <div class="flex items-center justify-center mb-6 animate-bounce-slow">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-blue-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
          <h1 class="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-blue-400 tracking-tight">
            CineVerse
          </h1>
        </div>
        <p class="mt-6 text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Immerse yourself in our premium cinematic universe with thousands of movies and TV shows in stunning 4K
        </p>
      </div>

      <!-- Feature Cards -->
      <div class="grid md:grid-cols-3 gap-8 mb-16">
        <div class="bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-700/60 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
          <div class="text-blue-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-3 text-white">4K Ultra HD</h3>
          <p class="text-gray-400">Experience crystal-clear picture quality with our extensive 4K HDR library</p>
        </div>

        <div class="bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-700/60 hover:border-purple-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
          <div class="text-purple-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-3 text-white">Smart Recommendations</h3>
          <p class="text-gray-400">Our AI learns your tastes to suggest perfect content just for you</p>
        </div>

        <div class="bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-700/60 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
          <div class="text-cyan-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-3 text-white">Multi-Device</h3>
          <p class="text-gray-400">Watch anywhere on phones, tablets, computers, and smart TVs</p>
        </div>
      </div>

      <!-- Login Form Section - Right Aligned Only -->
      <div class="flex justify-center items-center p-4">
        <!-- Login Form -->
        <Loginview />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Loginview from './user/Loginview.vue';

export default defineComponent({
  components: { Loginview },
  name: 'HomeView'
});
</script>

<style scoped>
@keyframes float {
  0% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(10px, 10px) rotate(5deg); }
  50% { transform: translate(20px, 0) rotate(0deg); }
  75% { transform: translate(10px, -10px) rotate(-5deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float linear infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}
</style>