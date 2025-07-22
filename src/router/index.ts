import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:[
    {
      path:'/',
      name:'HomeView',
      component:()=>import('../view/HomeView.vue')
    },
     {
     path:'/admin/login',
     name:'AdminLogin',
     component:()=>import('../view/admin/LoginView.vue')
    },
    {
      path:'/admin/Dashboard',
      name:'AdminDashboard',
      component:()=>import('../view/admin/DashboardView.vue')
    },
    {
      path:'/admin/categories',
      name:'CategoryView',
      component:()=>import('../view/admin/CategoryView.vue')
    },
    {
      path:'/admin/videos',
      name:'UploadVideo',
      component:()=>import('../view/admin/UploadVideoView.vue')
    },
    {
  path: '/admin/subscriptions',
  name: 'ManageSubscription',
  component: () => import('../view/admin/ManageSubscriptionView.vue')
    },
    {
       path: '/signup',
      name: 'SignUp',
  component: () => import('../view/user/Signupview.vue')
    },
    {
       path: '/admin/users',
      name: 'ManageUser',
  component: () => import('../view/admin/ManageUserView.vue')
    },
    {
       path: '/dashboard',
      name: 'Dashboard',
  component: () => import('../view/user/Dashboard.vue')
    },
     {
       path: '/profile',
      name: 'Profile',
  component: () => import('../view/user/Profile.vue')
    }

  ]
})

export default router