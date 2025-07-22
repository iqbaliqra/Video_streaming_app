<template>
  <form @submit.prevent="handleSubmit" class="mb-8">
    <div class="flex items-stretch rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all shadow-sm">
      <input
        v-model="categoryName"
        type="text"
        placeholder="Add new video category..."
        class="flex-grow border-0 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-4 focus:outline-none placeholder-gray-400 dark:placeholder-gray-500"
        required
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
      <button
        type="submit"
        class="bg-blue-600 hover:bg-blue-700 text-white px-6 font-medium transition-all flex items-center justify-center gap-2"
        :class="{
          'w-12': !isFocused,
          'px-6': isFocused,
          'bg-blue-700': isFocused
        }"
      >
        <span v-if="isFocused" class="whitespace-nowrap">Add</span>
        <span class="text-xl font-light">+</span>
      </button>
    </div>
    <p v-if="errorMessage" class="mt-2 text-sm text-red-500 dark:text-red-400 flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
      {{ errorMessage }}
    </p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const categoryName = ref('')
const isFocused = ref(false)
const errorMessage = ref('')

const emit = defineEmits<{
  (e: 'add-category', name: string): void
}>()

const handleSubmit = () => {
  const trimmedName = categoryName.value.trim()
  
  if (!trimmedName) {
    errorMessage.value = 'Category name cannot be empty'
    return
  }
  
  if (trimmedName.length > 30) {
    errorMessage.value = 'Category name is too long (max 30 characters)'
    return
  }

  emit('add-category', trimmedName)
  categoryName.value = ''
  errorMessage.value = ''
}
</script>