<script setup lang="ts">
import IconCarretRightRegular from './icons/IconCarretRightRegular.vue'
import IconCarretLeftRegular from './icons/IconCarretLeftRegular.vue'
import ArrowLeftRegular from './icons/ArrowLeftRegular.vue';
import BaseButton from './BaseButton.vue';
import { getImageDetailsById } from '@/api/picsum.api';

const props = defineProps<{
  canGoLeft: boolean;
  canGoRight: boolean;
  imageId: number;
}>()

async function downloadImage() {
   const imageDetails = await getImageDetailsById(props.imageId);
   const image = await fetch(imageDetails.download_url);
   const imageBlob = await image.blob();
   const imageURL = URL.createObjectURL(imageBlob);
 
   const link = document.createElement('a');
   link.href = imageURL;
   link.download = `${props.imageId}.jpg`;
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
}

const emit = defineEmits<{
  (e: 'previous-image'): void
  (e: 'next-image'): void
  (e: 'back-to-gallery'): void
}>()
</script>

<template>
  <div class="gallery-arrow-bar">
      <div class="back-button-container">
        <button class="back-button" @click="emit('back-to-gallery')">
            <ArrowLeftRegular />
        </button>

      </div>
    <div class="arrow-controls">
      <button
        class="pagination-icon"
        :disabled="!canGoLeft"
        @click="emit('previous-image')"
        aria-label="Previous image"
      >
        <IconCarretLeftRegular />
      </button>

      <button
        class="pagination-icon"
        :disabled="!canGoRight"
        @click="emit('next-image')"
        aria-label="Next image"
      >
        <IconCarretRightRegular />
      </button>
    </div>

      <div class="download-button-container">
          <BaseButton @click="downloadImage" class="download-button">Download</BaseButton>
      </div>
  </div>
</template>

<style scoped lang="scss">
.gallery-arrow-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.back-button-container, .download-button-container {
    flex: 0
}

.arrow-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex: 2;
}

.pagination-icon, .back-button {
  width: 2rem;
  height: 2rem;
  border: 1px solid transparent;
  border-radius: vars.$default-button-radius;
  color: vars.$text-primary;
}

.pagination-icon:hover {
  border: 1px solid vars.$text-primary;
}

.pagination-icon:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>