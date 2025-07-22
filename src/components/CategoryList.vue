<template>
  <div class="space-y-3">
    <div v-if="categories.length" class="space-y-3">
      <div
        v-for="category in categories"
        :key="category.id"
        class="flex justify-between items-center bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow transition-all"
      >
        <div v-if="editId !== category.id" class="font-medium text-gray-800 dark:text-gray-200">
          {{ category.name }}
        </div>

        <input
          v-else
          v-model="editName"
          @keyup.enter="saveEdit(category.id)"
          @keyup.escape="cancelEdit"
          class="flex-1 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          autofocus
        />

        <div class="flex gap-3 items-center">
          <button
            v-if="editId !== category.id"
            @click="startEdit(category)"
            class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium px-2 py-1 rounded hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
            title="Edit category"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>

          <button
            v-else
            @click="saveEdit(category.id)"
            class="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-medium px-2 py-1 rounded hover:bg-green-50 dark:hover:bg-gray-700 transition-colors"
            title="Save changes"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </button>

          <button
            v-if="editId === category.id"
            @click="cancelEdit"
            class="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 font-medium px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Cancel editing"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>

          <button
            @click="$emit('delete-category', category.id)"
            class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-gray-700 transition-colors"
            title="Delete category"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-8 text-gray-500 dark:text-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="mt-2 text-lg font-medium">No categories found</p>
      <p class="text-sm">Add a new category to get started</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Category } from '../Interface/category'

defineProps<{
  categories: Category[]
}>()

const emit = defineEmits<{
  (e: 'edit-category', category: Category): void
  (e: 'delete-category', id: string): void
}>()

const editId = ref<string | null>(null)
const editName = ref('')

const startEdit = (category: Category) => {
  editId.value = category.id
  editName.value = category.name
}

const saveEdit = (id: string) => {
  if (editName.value.trim()) {
    emit('edit-category', { id, name: editName.value.trim() })
    editId.value = null
    editName.value = ''
  }
}

const cancelEdit = () => {
  editId.value = null
  editName.value = ''
}
</script>
