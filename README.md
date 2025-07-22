# 🎬 Video Streaming Platform

A modern **Video Streaming Web Application** with two panels – **Admin** and **User** – built using **Vue 3**, **TypeScript**, **TailwindCSS**, and fully integrated with **Firebase (Auth, Firestore, Storage)**.

---

## ⚙️ Tech Stack

- 🎯 **Frontend**: Vue 3 + TypeScript  
- 🎨 **Styling**: TailwindCSS  
- 🔐 **Authentication**: Firebase Auth  
- 🗂️ **Database**: Firebase Firestore  
- 📦 **File Storage**: Firebase Storage  
- 🧠 **State Management**: Pinia  
- 🔍 **Search/Recommendations**: Local filtering & smart queries

---

# 📁 Project Structure

src/
├── assets/ # Static files like images, thumbnails
├── components/ # Reusable UI components
├── services/ # Firebase logic (auth, firestore, storage)
├── stores/ # Pinia stores for state management
├── views/
│ ├── admin/ # Admin panel screens
│ └── user/ # User-facing screens
├── router/ # Route guards for admin/user separation
└── App.vue # Root component
---

## 🔑 Features

### 👤 User Panel
- ✅ Signup & Login (with Firebase Auth)
- 🔍 Video Search (by title)
- 🎞️ Watch Videos (from Firebase Storage)
- 📺 Recommended Videos
- ⚙️ Profile View
- 🚪 Logout

### 🛠️ Admin Panel
- 👥 Manage Users (Read)
- 🎬 Manage Videos (Upload to Firebase Storage + Firestore entry)
- 🏷️ Manage Categories (CRUD with Firestore)
- 💳 Manage Subscription Plans (CRUD with Firestore)

---

## 🔐 Firebase Configuration

Before using the app, set up your Firebase project:

### 🔸 1. Create Firebase Project
- Go to [Firebase Console](https://console.firebase.google.com/)
- Enable:
  - Authentication → Email/Password
  - Firestore Database
  - Storage

### Getting Started
## 1. Clone the Repository

- git clone https://github.com/your-username/video-streaming-app.git
- cd video-streaming-app
## 2. Install Dependencies

- npm install
## 3. Add Firebase Config
-Create a firebase.ts file in src folder.

## 4. Run the Development Server

npm run dev


