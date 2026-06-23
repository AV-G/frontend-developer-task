<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseButton from '@/components/BaseButton.vue';
import { useRoute } from 'vue-router'
import { onMounted, watch} from 'vue'
import { useGalleryStore } from '@/stores/gallery'
import type { Image, ImageDetails, ImageQueryParameters } from '@/api/picsum.types';
import GalleryNumberPaginationBar from '@/components/GalleryNumberPaginationBar.vue';
import GalleryGrid from '@/components/GalleryGrid.vue';
import GalleryGridSkeleton from '@/components/GalleryGridSkeleton.vue';
import Logo from '@/assets/logo.svg';

const store = useGalleryStore()
const route = useRoute()

const routePage = computed(() => {
  const page = Number(route.query.page ?? 1)
  return Number.isNaN(page) || page < 1 ? 1 : page
})

async function loadGalleryPage() {
  await store.fetchImages(routePage.value)
}

onMounted(loadGalleryPage)
watch(() => route.query.page, loadGalleryPage)
</script>

<template>
    <div>
        <img alt="Hannah logo" class="logo" :src="Logo" width="125" height="125" />
        <div class="gallery-collection">
            <GalleryNumberPaginationBar
            :currentPage="store.currentPage"
            :totalItems="store.totalItems"
            :currentLimit="store.currentLimit"
            @page-change="store.fetchImages"
                />
            <hr></hr>
            <GalleryGridSkeleton v-if="store.isLoading" :count="store.currentLimit" />
            <GalleryGrid v-else :images="store.images" />
        </div>
    </div>
</template>

<style scoped lang="scss">
    .gallery-collection {
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
