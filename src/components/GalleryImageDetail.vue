<script setup lang="ts">
import { computed, onMounted, watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGalleryStore } from '@/stores/gallery'
import { imageUrlBuilder } from '@/api/picsum.helpers'
import { DEFAULT_GALLERY_IMAGE_DETAILS_HEIGHT, DEFAULT_GALLERY_IMAGE_DETAILS_WIDTH } from '@/constants/gallery.constants'
import Spinner from './Spinner.vue'
import GalleryArrowBar from '@/components/GalleryArrowBar.vue'
import Image from './Image.vue'

const props = defineProps<{
  imageId: number
}>()

function imageUrl() {
  return imageUrlBuilder(props.imageId, DEFAULT_GALLERY_IMAGE_DETAILS_HEIGHT, DEFAULT_GALLERY_IMAGE_DETAILS_WIDTH);
}

function imageResolutionAnnotation() {
  return `${DEFAULT_GALLERY_IMAGE_DETAILS_HEIGHT}x${DEFAULT_GALLERY_IMAGE_DETAILS_WIDTH}`
}

const loading = ref<boolean>(true);
const failed = ref<boolean>(false);

function onLoad() {
  loading.value = false;
  failed.value = false;
}

function onError() {
  loading.value = false;
  failed.value = true;
}

watch(() => props.imageId, () => {
  loading.value = true
  failed.value = false
})

</script>

<template>
  <div class="gallery-image-detail-container">
    <div class="image-resolution">{{imageResolutionAnnotation()}}</div>
    <div class="image-container">
        <div v-if="loading" class="spinner-overlay">
            <Spinner />
        </div>
      <Image
        v-show="!failed"
        class="full-image"
        :class="{ invisible: loading }"
        :src="imageUrl()"
        :style="{maxHeight: DEFAULT_GALLERY_IMAGE_DETAILS_HEIGHT, maxWidth: DEFAULT_GALLERY_IMAGE_DETAILS_WIDTH}"
        @load="onLoad"
        @error="onError"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.gallery-image-detail-container {
  background: vars.$bg;
  border-radius: vars.$default-radius;
  padding-bottom: 3rem;
}

.spinner-overlay {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.image-resolution {
    color: vars.$text-muted;
    padding: 2rem;
}

.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline: 1rem;
}

.invisible {
  opacity: 0;
}

.full-image {
  border-radius: vars.$default-radius;
}

</style>