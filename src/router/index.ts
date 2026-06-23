import { createRouter, createWebHistory } from 'vue-router'
import GalleryCollectionView from '@/views/GalleryCollectionView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'gallery',
      component: GalleryCollectionView
    },
    {
      path: '/gallery/:id',
      name: 'gallery-image',
      component: () => import('../views/GalleryImageView.vue'),
      props: true
    }
  ],
})

export default router
