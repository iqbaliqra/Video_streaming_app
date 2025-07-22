<template>
  <div class="flex min-h-screen bg-gray-50">
    <SidebarView />

    <main class="flex-1 p-8 overflow-auto">
      <div class="max-w-4xl mx-auto">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold text-gray-800">Category Management</h1>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 class="text-xl font-semibold mb-4 text-gray-700">Add New Category</h2>
          <CategoryForm @add-category="addCategory" />
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold mb-4 text-gray-700">Categories</h2>
          <CategoryList
            :categories="categories"
            @edit-category="editCategory"
            @delete-category="deleteCategory"
          />

          <div v-if="categories.length === 0" class="text-center py-8 text-gray-500">
            No categories found. Add your first category above.
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import SidebarView from '../../components/SidebarView.vue';
import CategoryForm from '../../components/CategoryForm.vue';
import CategoryList from '../../components/CategoryList.vue';
import { onMounted,computed } from 'vue';
import { useCategoryStore } from '../../stores/categoryStore';

const categoryStore = useCategoryStore();

onMounted(() => {
  categoryStore.loadCategories();
});

const addCategory=categoryStore.addCategory;
const deleteCategory=categoryStore.deleteCategory;
const editCategory=categoryStore.editCategory;
const categories = computed(() => categoryStore.categories)
</script>

<style>
button, input, a {
  transition: all 0.2s ease;
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
