// stores/videoStore.ts
import { defineStore } from 'pinia';
import { ref, onUnmounted } from 'vue';
import { useToast } from 'vue-toastification';
import { addVideo, listenToVideos } from '../services/videoService';
import type { Video } from '../Interface/videoUpload';

export const useVideoStore = defineStore('video', () => {
  const toast = useToast();

  const video = ref<Video>({
    id: '',
    title: '',
    description: '',
    category_id: '',
    video_url: '',
    thumbnail_url: '',
    created_at: null
  });

  const videos = ref<Video[]>([]);
  const unsubscribe = ref<null | (() => void)>(null);

  const fieldErrors = ref<string[]>([]);
  const isSubmitting = ref(false);

  const validateForm = (): boolean => {
    fieldErrors.value = [];
    if (!video.value.title) fieldErrors.value.push("Title is required");
    if (!video.value.description) fieldErrors.value.push("Description is required");
    if (!video.value.category_id) fieldErrors.value.push("Category is required");
    if (!video.value.video_url) fieldErrors.value.push("Video file is required");
    if (!video.value.thumbnail_url) fieldErrors.value.push("Thumbnail is required");
    return fieldErrors.value.length === 0;
  };

  const handleVideoUpload = (filename: string) => {
    video.value.video_url = `/videos/${filename}`;
  };

  const handleThumbnailUpload = (filename: string) => {
    video.value.thumbnail_url = `/thumbnails/${filename}`;
  };

  const submitVideo = async () => {
  if (!validateForm()) return false;
  isSubmitting.value = true;
  try {
    const duplicate = videos.value.find(v =>
     v.title.trim().toLowerCase() === video.value.title.trim().toLowerCase() &&
     v.description.trim().toLowerCase() === video.value.description.trim().toLowerCase() &&
     v.video_url === video.value.video_url &&
     v.thumbnail_url === video.value.thumbnail_url
);

    if (duplicate) {
      toast.error("Duplicate video! A video with same title and files already exists.");
      return false;
    }

    const videoData = { ...video.value, created_at: new Date() };
    await addVideo(videoData);
    toast.success("Video uploaded successfully!");
    resetVideo();
    return true;
  } catch (error) {
    toast.error("Upload failed!");
    return false;
  } finally {
    isSubmitting.value = false;
  }
};


  const resetVideo = () => {
    video.value = {
      id: '',
      title: '',
      description: '',
      category_id: '',
      video_url: '',
      thumbnail_url: '',
      created_at: null
    };
    fieldErrors.value = [];
  };

  const loadVideos = () => {
    if (unsubscribe.value) unsubscribe.value();
    unsubscribe.value = listenToVideos((fetchedVideos) => {
      videos.value = fetchedVideos;
    });
  };

  onUnmounted(() => {
    if (unsubscribe.value) unsubscribe.value();
  });

  return {
    video,
    videos,
    fieldErrors,
    isSubmitting,
    validateForm,
    handleVideoUpload,
    handleThumbnailUpload,
    submitVideo,
    resetVideo,
    loadVideos,
  };
});
