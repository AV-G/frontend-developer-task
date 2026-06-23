<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue';
import { onMounted } from 'vue'
import { useGalleryStore } from '@/stores/gallery'
import GalleryImageDetail from '@/components/GalleryImageDetail.vue';
import GalleryArrowBar from '@/components/GalleryArrowBar.vue';
import Logo from '@/assets/logo.svg';
import type { Image, ImageDetails, ImageQueryParameters } from '@/api/picsum.types';

const route = useRoute()
const router = useRouter()
const galleryStore = useGalleryStore()

const imageId = computed(() => {
  const id = Number(route.params.id)
  return Number.isNaN(id) || id < 1 ? 1 : id
})

const routePage = computed(() => {
  const page = Number(route.query.page ?? 1)
  return Number.isNaN(page) || page < 1 ? 1 : page
})

const currentImage = computed(() =>
  galleryStore.images.find(img => Number(img.id) === imageId.value) ?? null
)

const canGoLeft = computed(() => imageId.value > 1)
const canGoRight = computed(() => imageId.value < galleryStore.totalItems)

const loadRoutePage = async () => {
  await galleryStore.ensurePageLoaded(routePage.value)
}

const goBackToGallery = () => {
  router.push({
    name: 'gallery',
    query: { page: routePage.value }
  })
}

const goToAdjacentImage = async (direction: 'prev' | 'next') => {
  const targetId = direction === 'prev'
    ? imageId.value - 1
    : imageId.value + 1

  if (targetId < 1 || targetId > galleryStore.totalItems) return

  const targetPage = galleryStore.getPageFromImageId(targetId)

  await galleryStore.ensurePageLoaded(targetPage)

  router.push({
    name: 'gallery-image',
    params: { id: targetId },
    query: { page: targetPage }
  })
}

onMounted(loadRoutePage)
watch(() => route.query.page, loadRoutePage)
watch(() => route.params.id, async () => {
  const targetPage = galleryStore.getPageFromImageId(imageId.value)
  if (targetPage !== routePage.value) {
    await galleryStore.ensurePageLoaded(targetPage)
  }
})

</script>

<template>
    <div>
        <img alt="Hannah logo" class="logo" :src="Logo" width="125" height="125" />
        <div class="gallery-image">
            <GalleryArrowBar
                :can-go-left="canGoLeft"
                :can-go-right="canGoRight"
                :imageId="imageId"
                @back-to-gallery="goBackToGallery"
                @previous-image="goToAdjacentImage('prev')"
                @next-image="goToAdjacentImage('next')"
                />
            <hr></hr>
            
            <GalleryImageDetail :imageId="imageId"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .gallery-image {
        background: vars.$white;
        box-shadow:
              0 1px 1px hsl(0deg 0% 0% / 0.075),
              0 2px 2px hsl(0deg 0% 0% / 0.075),
              0 4px 4px hsl(0deg 0% 0% / 0.075),
              0 8px 8px hsl(0deg 0% 0% / 0.075),
              0 16px 16px hsl(0deg 0% 0% / 0.075)
            ;
        border-radius: vars.$default-radius;
        padding: clamp(1rem, 2vw, 1.5rem);
    }
</style>
