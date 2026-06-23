<script setup lang="ts">
import ImageCardSkeleton from './ImageCardSkeleton.vue';

withDefaults(defineProps<{
  count?: number;
}>(), {
  count: 8
});
</script>

<template>
  <div class="gallery-container">
    <ImageCardSkeleton v-for="n in count" :key="n" />
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

@media (max-width: 900px) {
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