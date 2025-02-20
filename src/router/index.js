import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppLayout from "@/views/Layout/AppLayout.vue";
import Login from "@/views/Auth/Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },

    {
      path: '',
      name: 'layout',
      component: AppLayout,
      children: [
        {
          path: '/posts/create',
          name: 'createPost',
          component: () => import('@/views/Posts/CreatePost.vue'),
        },
      ]
    },
  ],
})

export default router
