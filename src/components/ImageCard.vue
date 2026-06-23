<script setup lang="ts">
import { reactive, computed, ref } from 'vue';
import { useRouter } from 'vue-router'
import { useGalleryStore } from '@/stores/gallery'
import { imageUrlBuilder } from '@/api/picsum.helpers';

import Spinner from './Spinner.vue';
import Image from './Image.vue';
import BaseButton from './BaseButton.vue';

import type { ImageDetails, ImageQueryParameters } from '@/api/picsum.types';

const props = defineProps<{
  image: ImageDetails;
}>();
const router = useRouter()
const galleryStore = useGalleryStore()

const loading = ref<boolean>(true);
const failed = ref<boolean>(false);

function imageUrl() {
  return imageUrlBuilder(props.image.id);
}

const openImage = (id: string | number) => {
  router.push({
    name: 'gallery-image',
    params: { id },
    query: { page: galleryStore.currentPage }
  })
}

async function downloadImage() {
   const image = await fetch(props.image.download_url)
   const imageBlob = await image.blob()
   const imageURL = URL.createObjectURL(imageBlob)

   const link = document.createElement('a')
   link.href = imageURL
   link.download = `${props.image.id}.jpg`
   document.body.appendChild(link)
   link.click()
   document.body.removeChild(link)
}

function onLoad() {
  loading.value = false;
  failed.value = false;
}

function onError() {
  loading.value = false;
  failed.value = true;
}

</script>


<template>
<transition>
<div class="image-card-container">
    <div class="image-wrapper">
          <Image
            :src="imageUrl()"
            alt="something"
            @load="onLoad"
            @error="onError"
            @click="openImage(image.id)"
          />
    </div>
  <div class="card-description">
    <div class="author">{{props.image.author}}</div>
    <hr />
    <BaseButton @click="downloadImage">Download</BaseButton>
  </div>
</div>
</transition>
</template>

<style scoped lang="scss">
.image-card-container {
    background: vars.$bg;
    border-radius: vars.$default-radius;
    color: vars.$text-primary;
}

.image-wrapper {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  height: 300px;
  width: 350px;

}

.loading-spinner {
    display: flex;
    justify-content: center;
    justify-items: center;
    flex-gap: 1em;
}

.author {
    font-size: 1.5rem;
}

.card-description {
    padding: clamp(1rem, 2vw + 0.5rem, 1.5rem) clamp(0.875rem, 1vw + 0.75rem, 1.00rem);
}

.pagination-bar-container {
    display: flex;
    justify-content: space-between;
}

.current-index {
  border: solid 1px vars.$primary;
  color: vars.$primary;
}

</style>
