import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getImageDetailsList } from '@/api/picsum.api'
import { DEFAULT_LIST_PAGE, DEFAULT_LIST_LIMIT } from '@/constants/api.constants'
import type { ImageDetails } from '@/api/picsum.types'

export const useGalleryStore = defineStore('gallery', () => {
  const images = ref<ImageDetails[]>([])
  const currentPage = ref(DEFAULT_LIST_PAGE)
  const currentLimit = ref(DEFAULT_LIST_LIMIT)
  const totalItems = ref(1000)
  const isLoading = ref(true)
  const error = ref<string | null>(null)

  async function fetchImages(page: number = 1, limit: number = currentLimit.value) {
    isLoading.value = true
    error.value = null
    images.value = []

    currentPage.value = page
    currentLimit.value = limit

    try {
      images.value = await getImageDetailsList(page, limit)
    } catch (e) {
      error.value = 'Failed to load images'
      images.value = []
    } finally {
      isLoading.value = false
    }
  }

  async function ensurePageLoaded(page: number) {
     if (page !== currentPage.value) {
       await fetchImages(page, currentLimit.value)
     }
   }
 
   function getPageFromImageId(id: number | string) {
     const numericId = Number(id)
     return Math.floor(numericId / currentLimit.value) + 1
   }
 
   function getIndexInPage(id: number | string) {
     const numericId = Number(id)
     return numericId % currentLimit.value
   }

  return { images, currentPage, currentLimit, totalItems, isLoading, error, fetchImages, ensurePageLoaded, getPageFromImageId, getIndexInPage }
})