// services/videoService.ts
import { db } from "../firebase";
import { collection, addDoc, onSnapshot, query } from "firebase/firestore";
import type { Video } from "../Interface/videoUpload";

const videoCollection = collection(db, "videos");

export const addVideo = async (video: Video) => {
  const docRef = await addDoc(videoCollection, video);
  return docRef;
};

// Realtime listener callback
export const listenToVideos = (callback: (videos: Video[]) => void) => {
  const q = query(videoCollection);
  return onSnapshot(q, (snapshot) => {
    const videos: Video[] = snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    } as Video));
    callback(videos);
  });
};
