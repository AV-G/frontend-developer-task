<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# """the whole state should be controlled form my galleyimageview

"""<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue';
import { onMounted } from 'vue'
import { useGalleryStore } from '@/stores/gallery'
import GalleryImageDetail from '@/components/GalleryImageDetail.vue';
import GalleryArrowBar from '@/components/GalleryArrowBar.vue';
import TheNavbar from '@/components/TheNavbar.vue';
import Logo from '@/assets/logo.svg';
import type { Image, ImageDetails, ImageQueryParameters } from '@/api/picsum.types';

const props = withDefaults(defineProps<{
withPagination?: boolean
totalItems?: number
}>(), {
withPagination: false,
totalItems: 1
});

const route = useRoute()
const router = useRouter()
const store = useGalleryStore()

const imageId = computed(() => Number(route.params.id))

const currentImage = computed(() =>
store.images.find(img => Number(img.id) === imageId.value)
)

</script>

<template>
    <img alt="Hannah logo" class="logo" :src="Logo" width="125" height="125" />
    <div class="gallery-image">

        <GalleryArrowBar :images="store.images" :loading="store.isLoading" /> 
        <GalleryImageDetail :id="imageId"
        />
        <hr></hr>
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
"""
Which then has the galleryarrow bar
"""<script setup lang="ts">
import IconCarretRightRegular from './icons/IconCarretRightRegular.vue'
import IconCarretLeftRegular from './icons/IconCarretLeftRegular.vue'

defineProps<{
canGoLeft: boolean
canGoRight: boolean
}>()

const emit = defineEmits<{
(e: 'previous-image'): void
(e: 'next-image'): void
(e: 'back-to-gallery'): void
}>()
</script>

<template>
  <div class="gallery-arrow-bar">
    <button class="back-button" @click="emit('previous-image')">
      Back to gallery
    </button>

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
  </div>
</template>
<style scoped lang="scss">
.gallery-arrow-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.arrow-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pagination-icon {
  width: 2rem;
  height: 2rem;
  display: grid;
  place-items: center;
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
</style>"""
"""<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGalleryStore } from '@/stores/gallery'
import { imageUrlBuilder } from '@/api/picsum.helpers'
import { DEFAULT_GALLERY_IMAGE_DETAILS_HEIGHT, DEFAULT_GALLERY_IMAGE_DETAILS_WIDTH } from '@/constants/gallery.constants'
import GalleryArrowBar from '@/components/GalleryArrowBar.vue'
import Image from './Image.vue'

const props = defineProps<{
id:  number
}>()

function imageUrl() {
return imageUrlBuilder(props.id, DEFAULT_GALLERY_IMAGE_DETAILS_HEIGHT, DEFAULT_GALLERY_IMAGE_DETAILS_WIDTH);
}

const route = useRoute()
const router = useRouter()
const galleryStore = useGalleryStore()

const routePage = computed(() => {
const page = Number(route.query.page ?? 1)
return Number.isNaN(page) || page < 1 ? 1 : page
})

const currentImageId = computed(() => Number(props.id))

const currentIndex = computed(() => {
return galleryStore.images.findIndex(
(image) => Number(image.id) === currentImageId.value
)
})

const currentImage = computed(() => {
if (currentIndex.value < 0) return null
return galleryStore.images[currentIndex.value]
})

const canGoPrev = computed(() => {
return currentImageId.value > 1
})

const canGoNext = computed(() => {
return currentImageId.value < galleryStore.totalItems
})

const goBackToGallery = () => {
router.push({
name: 'gallery',
query: { page: routePage.value }
})
}

const goToAdjacentImage = (direction: 'prev' | 'next') => {
const targetId =
direction === 'prev'
? currentImageId.value - 1
: currentImageId.value + 1

if (targetId < 1 || targetId > galleryStore.totalItems) return

const targetPage = galleryStore.getPageFromImageId(targetId)

if (targetPage !== routePage.value) {
router.push({
name: 'gallery',
query: { page: targetPage }
})
return
}

router.push({
name: 'gallery-image',
params: { id: targetId },
query: { page: routePage.value }
})
}

const loadRoutePage = async () => {
await galleryStore.ensurePageLoaded(routePage.value)
}

onMounted(loadRoutePage)
watch(() => route.query.page, loadRoutePage)
</script>

<template>
  <div class="gallery-image-detail-container">
    ```
    <div class="image-resolution"></div>
    ```
    <GalleryArrowBar></GalleryArrowBar>
    <div v-if="galleryStore.isLoading" class="state-message">
      Loading...
    </div>

    <div v-else-if="galleryStore.error" class="state-message">
      {{ galleryStore.error }}
    </div>

    <div v-else-if="currentImage" class="image-stage">
      <Image
        class="full-image"
        :src="currentImage.download_url"
        :alt="`Image ${currentImage.id}`"
      />
    </div>
  </div>
</template>
<style scoped lang="scss">
.gallery-image-detail-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: vars.$bg;
}

.image-resolution {
    color: vars.$text-muted;
}

.back-button {
  width: fit-content;
}

.image-stage {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.full-image {
  width: 100%;
  max-height: 75vh;
  object-fit: contain;
  border-radius: 0.75rem;
}

.state-message {
  padding: 2rem 0;
}
</style>"""
The galleryimagedetail just shows the image with detail nothing else"""

Yes — that’s the right direction. `GalleryImageView` should own the route-driven state, loading, and navigation logic, while `GalleryArrowBar` and `GalleryImageDetail` stay presentational and receive props/events only. The guidance for web apps also recommends showing state clearly and keeping architecture simple, with URL state reflected in the UI rather than hidden inside leaf components .

## Recommended structure

Right now, `GalleryImageDetail` is doing too much: it reads the route, loads data, computes prev/next, and renders the arrow bar. That mixes “container” logic with “display” logic, so moving the state up to `GalleryImageView` is the cleaner design .

Use this split:

- `GalleryImageView`: source of truth, route/page/image loading, current image lookup, prev/next/back handlers.
- `GalleryArrowBar`: dumb control component, only props + emits.
- `GalleryImageDetail`: dumb detail component, only shows loading/error/image data passed in by the parent .


## What to move up

These should live in `GalleryImageView`, not in `GalleryImageDetail`:

- `routePage`
- `currentImageId`
- `currentIndex` or `currentImage`
- `canGoPrev` / `canGoNext`
- `goBackToGallery`
- `goToAdjacentImage`
- `loadRoutePage`
- `onMounted(...)` and `watch(...)` for route changes

That leaves `GalleryImageDetail` with a small API like:

```ts
defineProps<{
  image: Image | null
  loading: boolean
  error: string | null
}>()
```


## Parent example

Your parent becomes the smart component that controls everything from the route and store state .

```vue
<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGalleryStore } from '@/stores/gallery'
import GalleryArrowBar from '@/components/GalleryArrowBar.vue'
import GalleryImageDetail from '@/components/GalleryImageDetail.vue'
import Logo from '@/assets/logo.svg'

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
  <img alt="Hannah logo" class="logo" :src="Logo" width="125" height="125" />

  <div class="gallery-image">
    <GalleryArrowBar
      :can-go-left="canGoLeft"
      :can-go-right="canGoRight"
      @back-to-gallery="goBackToGallery"
      @previous-image="goToAdjacentImage('prev')"
      @next-image="goToAdjacentImage('next')"
    />

    <GalleryImageDetail
      :image="currentImage"
      :loading="galleryStore.isLoading"
      :error="galleryStore.error"
    />

    <hr />
  </div>
</template>
```


## Child components

`GalleryArrowBar` is almost fine, but your “Back to gallery” button currently emits the wrong event. It should emit `back-to-gallery`, not `previous-image`, otherwise clicking it will move left instead of returning to the grid .

```vue
<button class="back-button" @click="emit('back-to-gallery')">
  Back to gallery
</button>
```

Then make `GalleryImageDetail` presentation-only:

```vue
<script setup lang="ts">
import type { Image } from '@/api/picsum.types'
import ImageComponent from './Image.vue'

defineProps<{
  image: Image | null
  loading: boolean
  error: string | null
}>()
</script>

<template>
  <div class="gallery-image-detail-container">
    <div v-if="loading" class="state-message">
      Loading...
    </div>

    <div v-else-if="error" class="state-message">
      {{ error }}
    </div>

    <div v-else-if="image" class="image-stage">
      <ImageComponent
        class="full-image"
        :src="image.download_url"
        :alt="`Image ${image.id}`"
      />
    </div>
  </div>
</template>
```


## Why this is better

This gives you a single source of truth in the view component, which makes the route, store, and UI stay in sync more predictably . It also matches a cleaner component architecture where parent components manage behavior and child components focus on rendering and emitting user intent .

One more thing: in the parent template you currently pass `:id="imageId"`, but `imageId` is a computed ref, not a raw number. In templates Vue unwraps refs, so it works, but once you switch `GalleryImageDetail` to accept `image` instead of `id`, the API becomes much clearer and avoids unnecessary recomputation in the child .

Would you like me to rewrite all three components into their final cleaned-up versions in one go?

