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

    <!-- Main Content Container -->
    <div class="relative z-10 flex items-center justify-center min-h-screen p-4">
      <div class="w-full max-w-md bg-gray-800/90 backdrop-blur-lg rounded-xl p-8 border border-gray-700/60 shadow-2xl">
        <h2 class="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
          SignUp to CineVerse
        </h2>
        
        <form class="space-y-6" @submit.prevent="signUpWithEmail">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-300 mb-1">Name</label>
            <input 
              id="name" 
              type="name"
              v-model="name" 
              autocomplete="name" 
              required 
              class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
              placeholder="John">
               
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-300 mb-1">Email address</label>
            <input 
              id="email" 
              type="email" 
              v-model="email"
              autocomplete="email" 
              required 
              class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
              placeholder="you@example.com">
              <p v-if="emailError" class="text-red-400 text-sm mt-1">{{ emailError }}</p>
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input 
              id="password" 
              type="password" 
              v-model="password"
              autocomplete="current-password" 
              required 
              class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
              placeholder="••••••••">
          </div>
          
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
              <label for="remember-me" class="ml-2 block text-sm text-gray-300">Remember me</label>
            </div>
            
            <div class="text-sm">
              <a href="#" class="font-medium text-blue-400 hover:text-blue-300">Forgot password?</a>
            </div>
          </div>
          
          <div>
            <button 
              type="submit" 
              :disabled="isLoading"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all relative"
              :class="{'opacity-75 cursor-not-allowed': isLoading}">
              <span v-if="!isLoading">Sign up</span>
              <span v-else class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            </button>
          </div>
        </form>

        <!-- Divider -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-600"></div>
          </div>
          <div class="relative flex justify-center">
            <span class="px-2 bg-gray-800 text-sm text-gray-400">Or continue with</span>
          </div>
        </div>

        <!-- Google Sign-In Button -->
        <button 
  @click="signUpWithGoogle"
  :disabled="isLoadingGoogle"
  class="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 transition-colors group"
  :class="{'opacity-75 cursor-not-allowed': isLoadingGoogle}">
  
  <svg v-if="!isLoadingGoogle" class="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
  
  <span v-if="!isLoadingGoogle" class="group-hover:text-white transition-colors">
    Continue with Google
  </span>
  
  <span v-else class="flex items-center">
    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    Signing in...
  </span>
</button>
        
        <!-- Login link -->
        <div class="mt-6 text-center text-sm text-gray-400">
          Already have an account? 
          <router-link to="/" class="font-medium text-blue-400 hover:text-blue-300 ml-1">
            Login
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

// Form fields
const name = ref('');
const email = ref('');
const password = ref('');

// Error for invalid email
const emailError = ref<string | null>(null);
const isLoadingGoogle = computed(() => authStore.loading);
// Validation function
const validateEmail = (emailValue: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|org)$/i;
  return emailRegex.test(emailValue);
};

// Computed properties from store
const isLoading = computed(() => authStore.loading);


// Signup with Email
const signUpWithEmail = async () => {
  emailError.value = null;

  if (!validateEmail(email.value)) {
    emailError.value = 'Please enter a valid email address.';
    return;
  }

  await authStore.signupEmail(email.value, password.value, name.value);

  if (authStore.user) {
    router.push('/');
  }
};

// Signup with Google
const signUpWithGoogle = async () => {
  await authStore.signupGoogle();

  if (authStore.user) {
    router.push('/dashboard');
  }
};
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