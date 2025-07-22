<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gray-900">
    <!-- Animated Background Elements - More dynamic -->
    <div class="fixed inset-0 overflow-hidden z-0">
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-gray-900/40"></div>
      <div v-for="i in 20" :key="i" 
           class="absolute rounded-full opacity-10 animate-float"
           :class="['bg-blue-500', 'bg-purple-500', 'bg-gray-400'][i % 3]"
           :style="{
             width: `${10 + Math.random() * 30}px`,
             height: `${10 + Math.random() * 30}px`,
             left: `${Math.random() * 100}%`,
             top: `${Math.random() * 100}%`,
             animationDuration: `${15 + Math.random() * 25}s`,
             animationDelay: `${Math.random() * 5}s`
           }"></div>
    </div>

    <!-- Main Login Card - More refined -->
    <div class="relative w-full max-w-md z-10">
      <!-- Enhanced Glowing Border Effect -->
      <div class="absolute -inset-2 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 opacity-60 blur-xl animate-pulse-slow"></div>
      
      <div class="relative bg-gray-800/95 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-700/60 shadow-2xl">
        <!-- Hero Header - More cinematic -->
        <div class="relative h-36 bg-gradient-to-r from-gray-900/90 to-blue-900/70 flex items-center justify-center overflow-hidden">
          <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
          <div class="relative z-10 text-center p-6">
            <div class="flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
              <h1 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-400 tracking-tight">
                CineVerse
              </h1>
            </div>
            <p class="text-sm text-gray-300 font-light tracking-wider">Your premium cinematic experience</p>
          </div>
        </div>

        <!-- Login Form - More streamlined -->
        <div class="p-8">
          <!-- Email Login Form -->
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Email Field - Enhanced -->
            <div class="space-y-2">
              <label for="email" class="block text-sm font-medium text-gray-300 tracking-wide">Email address</label>
              <div class="relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  id="email"
                  v-model="user.email"
                  type="email"
                  autocomplete="email"
                  required
                  class="block w-full pl-10 pr-3 py-3 bg-gray-700/80 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/80 focus:border-transparent transition duration-200"
                  placeholder="your@email.com"
                  @focus="focusedField = 'email'"
                  @blur="focusedField = null"
                >
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg v-if="user.email && isEmailValid" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Password Field - Enhanced -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <label for="password" class="block text-sm font-medium text-gray-300 tracking-wide">Password</label>
              </div>
              <div class="relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  v-model="user.password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="current-password"
                  required
                  class="block w-full pl-10 pr-10 py-3 bg-gray-700/80 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/80 focus:border-transparent transition duration-200"
                  placeholder="••••••••"
                  @focus="focusedField = 'password'"
                  @blur="focusedField = null"
                >
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button type="button" @click="showPassword = !showPassword" class="text-gray-400 hover:text-gray-300 transition-colors duration-200">
                    <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  </button>
                  
                </div>
              </div>
            </div>

            <!-- Remember Me - More subtle -->
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="rememberMe"
                type="checkbox"
                class="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-600 rounded bg-gray-700/80 transition duration-200"
              >
              <label for="remember-me" class="ml-2 block text-sm text-gray-300 tracking-wide">
                Keep me signed in
              </label>
            </div>

            <!-- Submit Button - More elegant -->
             <div>
              <button
                type="submit"
                :disabled="isLoading"
                
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span v-if="!isLoading">Start Streaming</span>
                <span v-else class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              </button>
            </div>
          </form>

          <!-- Error Message - More refined -->
          <div v-if="error" class="mt-4 p-3 bg-red-900/40 text-red-200 rounded-lg text-sm border border-red-800/50 animate-shake">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              {{ error }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const user = reactive({
  email: 'admin@example.com',
  password: 'admin123'
});

const error = ref('');
const isLoading = ref(false);
const isLoggedIn = ref(false);
const rememberMe = ref(false);
const showPassword = ref(false);
const focusedField = ref<string | null>(null);

const isEmailValid = computed(() =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)
);

const validateForm = (): boolean => {
  if (!user.email || !user.password) {
    error.value = 'Both email and password are required';
    return false;
  }

  if (!isEmailValid.value) {
    error.value = 'Please enter a valid email address';
    return false;
  }

  return true;
};

const handleSubmit = async (): Promise<void> => {
  if (!validateForm()) return;

  isLoading.value = true;
  error.value = '';

  try {
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (user.email === 'admin@example.com' && user.password === 'admin123') {
      isLoggedIn.value = true;
      router.push('/admin/dashboard');
    } else {
      error.value = 'Invalid email or password';
    }
  } catch (err) {
    error.value = 'An error occurred during login';
  } finally {
    isLoading.value = false;
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

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 0.3; }
}

.animate-float {
  animation: float linear infinite;
}

.animate-shake {
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

.animate-pulse-slow {
  animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>