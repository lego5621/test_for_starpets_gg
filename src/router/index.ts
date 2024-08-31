import { createRouter, createWebHistory } from 'vue-router'
import { Routes } from '@/constants'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          name: Routes.Main,
          component: () => import('@/pages/MainPage.vue')
        }
      ]
    },
    {
      path: '/convert',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          name: Routes.Conversion,
          component: () => import('@/pages/ConversionPage.vue')
        }
      ]
    }
  ]
})

export default router
