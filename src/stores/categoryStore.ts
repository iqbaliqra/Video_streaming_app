import { defineStore } from 'pinia';
import { ref, onUnmounted } from 'vue';
import { 
  listenToCategories, 
  createCategory, 
  updateCategory, 
  deleteCategoryIfUnused 
} from '../services/categoryService';
import { useToast } from 'vue-toastification';
import type { Category } from '../Interface/category';

export const useCategoryStore = defineStore('category', () => {
  const toast = useToast();

  const categories = ref<Category[]>([]);
  const categoryNamesMap = ref<Record<string, string>>({});
  let unsubscribe: (() => void) | null = null;

  
  const loadCategories = () => {
    if (unsubscribe) unsubscribe();

    unsubscribe = listenToCategories((updatedCategories) => {
      categories.value = updatedCategories;
      categoryNamesMap.value = {};
      updatedCategories.forEach(cat => {
        categoryNamesMap.value[cat.id] = cat.name;
      });
    });
  };

 
  const addCategory = async (name: string) => {
    try {
      await createCategory(name);
      toast.success("Category added successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add category!");
    }
  };

  
  const editCategory = async (updated: Category) => {
    try {
      await updateCategory(updated.id, updated.name);
      toast.success("Category updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update category!");
    }
  };

 
  const deleteCategory = async (id: string) => {
    try {
      const deleted = await deleteCategoryIfUnused(id);
      if (deleted) {
        toast.success("Category deleted successfully!");
      } else {
        toast.error("Cannot delete: Category is used in videos!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete category!");
    }
  };

  // ✅ Get category name helper
  const getCategoryName = (id: string): string => {
    return categoryNamesMap.value[id] || 'Uncategorized';
  };

  onUnmounted(() => {
    if (unsubscribe) unsubscribe();
  });

  return {
    categories,
    loadCategories,
    addCategory,
    editCategory,
    deleteCategory,
    getCategoryName
  };
});
