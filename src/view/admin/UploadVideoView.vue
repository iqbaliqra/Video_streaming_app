<script setup lang="ts">
import SidebarView from '../../components/SidebarView.vue'
import { onMounted, computed, ref, onUnmounted } from 'vue'
import { useCategoryStore } from '../../stores/categoryStore'
import { useVideoStore } from '../../stores/videoStore'

const categoryStore = useCategoryStore()
const videoStore = useVideoStore()

onMounted(() => {
  categoryStore.loadCategories()
})

const categories = computed(() => categoryStore.categories)
const videoPreviewUrl = ref('')
const thumbnailPreviewUrl = ref('')

const onVideoChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    videoStore.handleVideoUpload(file.name)
    if (videoPreviewUrl.value) URL.revokeObjectURL(videoPreviewUrl.value)
    videoPreviewUrl.value = URL.createObjectURL(file)
  }
}

const onThumbnailChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    videoStore.handleThumbnailUpload(file.name)
    
    if (thumbnailPreviewUrl.value) URL.revokeObjectURL(thumbnailPreviewUrl.value)
    thumbnailPreviewUrl.value = URL.createObjectURL(file)
  }
}

const onSubmit = async () => {
  const success = await videoStore.submitVideo()
  if (success) {
    
    const videoInput = document.querySelector('input[type="file"][accept="video/*"]') as HTMLInputElement
    const thumbnailInput = document.querySelector('input[type="file"][accept="image/*"]') as HTMLInputElement
    
    if (videoInput) videoInput.value = ''
    if (thumbnailInput) thumbnailInput.value = ''
    
    if (videoPreviewUrl.value) {
      URL.revokeObjectURL(videoPreviewUrl.value)
      videoPreviewUrl.value = ''
    }
    if (thumbnailPreviewUrl.value) {
      URL.revokeObjectURL(thumbnailPreviewUrl.value)
      thumbnailPreviewUrl.value = ''
    }
  }
}


onUnmounted(() => {
  if (videoPreviewUrl.value) URL.revokeObjectURL(videoPreviewUrl.value)
  if (thumbnailPreviewUrl.value) URL.revokeObjectURL(thumbnailPreviewUrl.value)
})
</script>

<template>
  <div class="flex h-screen bg-gray-50">
    <SidebarView />
    <main class="flex-1 p-4 md:p-8 overflow-auto">
      <div class="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg space-y-6">
        <h2 class="text-2xl font-bold text-gray-800">Upload New Video</h2>

        <div v-if="videoStore.fieldErrors.length" class="bg-red-100 border border-red-200 text-red-700 p-4 rounded-lg">
          <h3 class="font-medium mb-2">Please fix the following errors:</h3>
          <ul class="list-disc list-inside space-y-1">
            <li v-for="err in videoStore.fieldErrors" :key="err">{{ err }}</li>
          </ul>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <!-- Left column -->
          <div class="space-y-6">
            <div class="space-y-2">
              <label class="block font-medium text-gray-700">Video Title <span class="text-red-500">*</span></label>
              <input 
                v-model="videoStore.video.title" 
                class="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                placeholder="Enter video title"
              />
            </div>

            <div class="space-y-2">
              <label class="block font-medium text-gray-700">Description</label>
              <textarea 
                v-model="videoStore.video.description" 
                rows="4"
                class="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                placeholder="Enter video description"
              ></textarea>
            </div>

            <div class="space-y-2">
              <label class="block font-medium text-gray-700">Category <span class="text-red-500">*</span></label>
              <select 
                v-model="videoStore.video.category_id" 
                class="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled selected>Select Category</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
              </select>
            </div>
          </div>

          <!-- Right column -->
          <div class="space-y-6">
            <!-- Video Upload -->
            <div class="space-y-2">
              <label class="block font-medium text-gray-700">Video File <span class="text-red-500">*</span></label>
              <div class="flex items-center justify-center w-full">
                <label class="flex flex-col w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50">
                  <div class="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                    <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p class="mb-2 text-sm text-gray-500">
                      <span class="font-semibold">Click to upload video</span> or drag and drop
                    </p>
                    <p class="text-xs text-gray-500">MP4, WebM or MOV (MAX. 100MB)</p>
                  </div>
                  <input type="file" @change="onVideoChange" accept="video/*" class="hidden" />
                </label>
              </div>
              <p v-if="videoStore.video.video_url" class="text-sm text-green-600 mt-1">Selected: {{ videoStore.video.video_url }}</p>
              
              <!-- Video Preview -->
              <div v-if="videoPreviewUrl" class="mt-4">
                <video 
                  controls
                  class="w-full rounded-lg border border-gray-200"
                  :src="videoPreviewUrl"
                ></video>
              </div>
            </div>

            <!-- Thumbnail Upload -->
            <div class="space-y-2">
              <label class="block font-medium text-gray-700">Thumbnail Image <span class="text-red-500">*</span></label>
              <div class="flex items-center justify-center w-full">
                <label class="flex flex-col w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50">
                  <div class="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                    <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <p class="mb-2 text-sm text-gray-500">
                      <span class="font-semibold">Click to upload thumbnail</span> or drag and drop
                    </p>
                    <p class="text-xs text-gray-500">PNG or JPG (MAX. 5MB)</p>
                  </div>
                  <input type="file" @change="onThumbnailChange" accept="image/*" class="hidden" />
                </label>
              </div>
              <p v-if="videoStore.video.thumbnail_url" class="text-sm text-green-600 mt-1">Selected: {{ videoStore.video.thumbnail_url }}</p>
              
              <!-- Thumbnail Preview -->
              <div v-if="thumbnailPreviewUrl" class="mt-4">
                <img 
                  :src="thumbnailPreviewUrl" 
                  alt="Thumbnail preview" 
                  class="w-full h-48 object-cover rounded-lg border border-gray-200"
                />
              </div>
            </div>
          </div>
        </div>

        <button 
          @click="onSubmit" 
          :disabled="videoStore.isSubmitting" 
          class="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="videoStore.isSubmitting" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Uploading...
          </span>
          <span v-else>Upload Video</span>
        </button>
      </div>
    </main>
  </div>
</template>