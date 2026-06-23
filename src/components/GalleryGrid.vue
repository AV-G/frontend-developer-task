<script setup lang="ts">
import { ref } from 'vue';
import ImageCard from './ImageCard.vue';
import type { Image, ImageDetails, ImageQueryParameters } from '@/api/picsum.types';

const props = defineProps<{
  images: ImageDetails[];
}>();
</script>

<template>
    <div class="gallery-container">
        <ImageCard v-for="image in props.images" :key="image.id" :image="image"/>
    </div>
</template>

<style scoped lang="scss">
.gallery-container {
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 1rem;
  justify-items: start;
  justify-content: start;
}

@media (max-width: 1400px) {
  .gallery-container {
    grid-template-columns: repeat(2, auto);
  }
}

@media (max-width: 640px) {
  .gallery-container {
    grid-template-columns: repeat(1, auto);
  }
}

</style>