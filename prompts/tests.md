//////// USER

<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# """.

├── assets
│   ├── arrow-left-regular.svg
│   ├── caret-left-regular.svg
│   ├── caret-right-regular.svg
│   └── logo.svg
├── designs
│   ├── 01-gallery.png
│   └── 02-details.png
├── package-lock.json
├── README.md
└── vue-project
├── Dockerfile
├── env.d.ts
├── index.html
├── package-lock.json
├── package.json
├── public
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── apple-touch-icon.png
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── manifest.json
│   └── placeholder.jpg
├── README.md
├── README2.md
├── src
│   ├── api
│   │   ├── picsum.api.ts
│   │   ├── picsum.helpers.ts
│   │   └── picsum.types.ts
│   ├── App.vue
│   ├── assets
│   │   ├── arrow-left-regular.svg
│   │   ├── base.css
│   │   ├── caret-left-regular.svg
│   │   ├── caret-right-regular.svg
│   │   ├── logo.svg
│   │   ├── main.css
│   │   └── placeholder.jpg
│   ├── components
│   │   ├── __tests__
│   │   │   └── HelloWorld.spec.ts
│   │   ├── BaseButton.vue
│   │   ├── GalleryArrowBar.vue
│   │   ├── GalleryGrid.vue
│   │   ├── GalleryGridSkeleton.vue
│   │   ├── GalleryImageDetail.vue
│   │   ├── GalleryNumberPaginationBar.vue
│   │   ├── icons
│   │   │   ├── ArrowLeftRegular.vue
│   │   │   ├── IconCarretLeftRegular.vue
│   │   │   └── IconCarretRightRegular.vue
│   │   ├── Image.vue
│   │   ├── ImageCard.vue
│   │   ├── ImageCardSkeleton.vue
│   │   ├── Spinner.vue
│   │   └── TheNavbar.vue
│   ├── constants
│   │   ├── api.constants.ts
│   │   └── gallery.constants.ts
│   ├── main.ts
│   ├── router
│   │   └── index.ts
│   ├── stores
│   │   └── gallery.ts
│   ├── styles
│   │   ├── abstracts
│   │   │   └── _variables.scss
│   │   ├── base
│   │   ├── components
│   │   ├── layout
│   │   ├── main.scss
│   │   ├── pages
│   │   ├── themes
│   │   └── vendors
│   └── views
│       ├── GalleryCollectionView.vue
│       └── GalleryImageView.vue
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── tsconfig.vitest.json
├── vite.config.ts
└── vitest.config.ts

23 directories, 65 files"""
this is my current project
"""The app should use the following API: [Picsum](https://picsum.photos/)
Create a simple image gallery UI that allows users to:
Browse the image gallery.
Paginate the results (show 20 images per page).
Show the current page number and the buttons to navigate to the next and previous pages.
Clicking on an image opens the image details page where more image data is shown (author, sizes).
The image details view has the ability to navigate to the next and previous image.
When returning back from the details view, take the current photo into account and mark it in the gallery.
💻 Our tech stack

[Vue.js](https://vuejs.org/) (Composition API, <script setup>)
[TypeScript](https://www.typescriptlang.org/)
[Pinia](https://pinia.vuejs.org/) for state management (Setup stores)
[Vue Router](https://router.vuejs.org/)
Bonus points if you use the same stack. But feel free to use another framework like React or Angular if you’re more comfortable with it.
🛠️ Other requirements

Use a CSS preprocessor of your choice to style the app. Don't use a CSS framework since we would like to see your CSS coding skills as well.
Follow the designs provided below as a guideline. No need to be pixel-perfect but try to match it as closely as possible.
Feel free to use any fonts you see fit.
Add some unit tests for components and store.
Provide short instructions in the form of a README.md file on how to set up and run the app.
Running in a Docker container is a plus.
🚀 Submission

Clone this repository to your own Github before you start your task.
When you're happy with the result send us the link or add us as collaborators if it's a private repository."""
this is what i had to do right. can you just write some component tests for me ill paste the code of the components in the next chat if you need them i assume i just need to share the componnents nothing else
"""<script setup lang="ts">
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

</style>"""
"""<script setup lang="ts">
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
"""
"""<script setup lang="ts">
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
    ```
    <div class="image-resolution">{{imageResolutionAnnotation()}}</div>
    ```
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

</style>"""
"""<script setup lang="ts">
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
          ```
          <BaseButton @click="downloadImage" class="download-button">Download</BaseButton>
          ```
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
</style>"""
"""<script lang="ts" setup>
import { reactive, computed } from 'vue';
import IconCarretRightRegular from './icons/IconCarretRightRegular.vue';
import IconCarretLeftRegular from './icons/IconCarretLeftRegular.vue';

const props = withDefaults(defineProps<{
maxIndicators?: number;
minPage?: number;
maxPage?: number;
currentLimit: number;
totalItems: number;
currentPage: number;
}>(), {
currentPage: 1,
maxIndicators: 5
})

const emit = defineEmits<{
(e: 'page-change', page: number): void
}>()

const totalPages = computed(() => {
return Math.ceil(props.totalItems / props.currentLimit)
})

const currentMinimumItemIndex = computed(() => {
if (props.totalItems === 0) return 0
return (props.currentPage - 1) * props.currentLimit + 1
})

const currentMaximumItemIndex = computed(() => {
return Math.min(props.currentPage * props.currentLimit, props.totalItems)
})

const startPage = computed(() => {
const half = Math.floor(props.maxIndicators / 2)
let start = props.currentPage - half

if (start < 1) start = 1
if (start + props.maxIndicators - 1 > totalPages.value) {
start = Math.max(1, totalPages.value - props.maxIndicators + 1)
}

return start
})

const endPage = computed(() => {
return Math.min(totalPages.value, startPage.value + props.maxIndicators - 1)
})

const visiblePages = computed(() => {
return Array.from(
{ length: endPage.value - startPage.value + 1 },
(_, i) => startPage.value + i
)
})

const goToPage = (page: number) => {
if (page < 1 || page > totalPages.value) return
emit('page-change', page)
}

</script>

<template>
<div class="pagination-bar-container">
    ```
    <span class="pagination-counter">{{currentMinimumItemIndex}}-{{currentMaximumItemIndex}} of {{props.totalItems}}</span>
    ```
    <span class="pagination-selector-container">
            <button
                class="pagination-icon"
                :disabled="currentPage === 1"
                @click="goToPage(currentPage - 1)"
              >
                <IconCarretLeftRegular />
              </button>
        
              <button
                v-for="page in visiblePages"
                :key="page"
                class="pagination-selector"
                :class="{ 'current-index': currentPage === page }"
                @click="goToPage(page)"
              >
                {{ page }}
              </button>
        
              <button
                class="pagination-icon"
                :disabled="currentPage === totalPages"
                @click="goToPage(currentPage + 1)"
              >
                  <IconCarretRightRegular />

              </button>
    </span>
</div>
</template>
<style scoped lang="scss">
.pagination-counter {
    color: vars.$text-muted;
}

.pagination-bar-container {
    display: flex;
    justify-content: space-between;
}

.pagination-selector {
    color: vars.$text-primary;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    flex-shrink: 0;

    border-radius: vars.$default-button-radius;
}

.pagination-selector-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem
}

.pagination-icon {
  width: 1rem;
  height: 1rem;
  color: vars.$text-primary;
  border: 1px solid transparent;
  border-radius: vars.$default-button-radius;
}

.pagination-icon:hover {
  border: 1px solid vars.$text-primary;
}

.pagination-selector.current-index {
  border: solid 1px vars.$primary;
  color: vars.$primary;
}

.pagination-selector-container > * {
  border: 1px solid transparent;
}

.pagination-selector-container > *:hover {
    border: solid 1px vars.$text-primary;
}

</style>
"""
"""import { defineStore } from 'pinia'
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
})"""
"""import { createRouter, createWebHistory } from 'vue-router'
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
"""

///////// LLM
Yes — for **component tests**, the component code is usually enough to get started, but in your case I’d ideally want a bit more than just the `.vue` files because several of these components depend on router, Pinia, child components, and API helpers. Your current snippets are enough for me to draft solid tests already, though.

## What to share

The most useful files to send next are:

- `BaseButton.vue`, `Image.vue`, and `Spinner.vue`, because they are direct child components used in the components you want tested.
- `picsum.helpers.ts` and `picsum.api.ts`, because `ImageCard` and `GalleryArrowBar` call those functions and they’ll usually need mocking in tests.
- `api.constants.ts` and `gallery.constants.ts`, because some assertions may depend on your default page size and image detail dimensions.
- Optionally `GalleryCollectionView.vue` and `GalleryImageView.vue` if you also want view-level tests, not just isolated component tests.


## What I can already test

From what you pasted, I can already write tests for these behaviors:


| File | Good test targets |
| :-- | :-- |
| `GalleryGrid.vue` | Renders one `ImageCard` per image prop and passes image data down. |
| `ImageCard.vue` | Navigates to `gallery-image` on image click with `page` query, shows author, triggers download flow, reacts to image load/error events. |
| `GalleryImageDetail.vue` | Shows resolution annotation, starts in loading state, hides spinner after load, resets loading when `imageId` prop changes. |
| `GalleryArrowBar.vue` | Emits `back-to-gallery`, `previous-image`, `next-image`; disables arrows correctly; triggers download on button click. |
| `GalleryNumberPaginationBar.vue` | Computes visible pages, emits `page-change`, disables prev/next at boundaries, shows correct item range text. |
| `gallery` store | `fetchImages`, `ensurePageLoaded`, `getPageFromImageId`, `getIndexInPage`, loading/error state transitions. |

## One important note

Your store paging math may be slightly off depending on how Picsum IDs map to pages, because `getPageFromImageId` uses `Math.floor(id / currentLimit) + 1` and `getIndexInPage` uses `id % currentLimit`; for IDs that start at 1, that can shift expected positions by one.  I’d still test the store against its **current implementation** unless you want me to suggest corrected logic too.

## Best next message

Paste these files next:

- `BaseButton.vue`
- `Image.vue`
- `Spinner.vue`
- `src/api/picsum.helpers.ts`
- `src/api/picsum.api.ts`

Then I can give you ready-to-paste Vitest test files with mocks tailored to your project setup.

/////// USER
<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# """<script lang="ts" setup>

interface BaseButtonProps {
type?: 'button' | 'submit';
disabled?: boolean;
}

const props = withDefaults(defineProps<BaseButtonProps>(), {
type: 'button',
disabled: false
});

</script>

<template>
  <button
  class="base-button"
  :type="props.type"
  :disabled="props.disabled"
  >
      <slot></slot>
  </button>
</template>
<style scoped lang="scss">
.base-button {
  background-color: vars.$bg-dark;
  color: vars.$text-primary;
  border-radius: vars.$default-button-radius;
  padding: vars.$default-button-padding-block vars.$default-button-padding-inline;
}

.base-button:hover {
    background-color: vars.$bg-light;
}

.base-button:active {
    background-color: vars.$bg;
}
</style>
"""
""<script lang="ts" setup>
interface Image {
src: string;
alt?: string;
}

withDefaults(defineProps<Image>(), {
alt: "some image"
})

const emit = defineEmits<{
(e: 'load', event: Event): void
(e: 'error', event: Event): void
}>()

</script>

<template>
  <img :src="src" :alt="alt || ''" @load="emit('load', $event)" @error="emit('error', $event)" />
</template>
<style scoped lang="scss">
img {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
}

</style>
""
"""import { DEFAULT_IMAGE_HEIGHT, DEFAULT_IMAGE_WIDTH } from "@/constants/api.constants"

export const imageUrlBuilder = function (id: number, height: number = DEFAULT_IMAGE_HEIGHT, width: number = DEFAULT_IMAGE_WIDTH) {
return `${import.meta.env.VITE_PICSUM_API_URL}/id/${id}/${width}/${height !== undefined ? height : width}`
}""
"""import axios, { AxiosError } from "axios";
import type {Image, ImageDetails, ImageQueryParameters} from "./picsum.types.ts"
import { API_TIMEOUT_MS } from "@/constants/api.constants.ts";
import { DEFAULT_IMAGE_WIDTH } from "@/constants/api.constants.ts";

const picsumApi = axios.create({
baseURL: import.meta.env.VITE_PICSUM_API_URL,
timeout: API_TIMEOUT_MS
})

picsumApi.interceptors.response.use(
(res) => res,
(error: AxiosError) => {
const response = error.response

       if (!response) {
         console.error('Network / timeout / CORS error:', error.message)
         return Promise.reject(error)
       }
    
       const data = response.data
       const status = response.status
    switch (status) {
      case 400:
        console.error(data);
        break;
    
      case 401:
        console.error('unauthorised');
        break;
    
      case 404:
        console.error('/not-found');
        break;
    
      case 500:
        console.error('/server-error');
        break;
      default:
          console.error('API error:', status, data)
    }
    return Promise.reject(error);
    }
);

```
export async function getData<T>(url: string, params: ImageQueryParameters = {}): Promise<T> {
```

return picsumApi.get<T>(url, { params }).then(response => response.data);
}

export async function getImageDetailsBySeed(identifier: string | number): Promise<ImageDetails> {
return getData<ImageDetails>(`/seed/${identifier}/info`);
}

export async function getImageDetailsList(page: number, limit: number): Promise<ImageDetails[]> {
return getData<ImageDetails[]>(`/v2/list`, {page, limit})
}

export async function getImageDetailsById(identifier: number): Promise<ImageDetails> {
return getData<ImageDetails>(`/id/${identifier}/info`)
}

export async function getImageById(id: number, width: number = DEFAULT_IMAGE_WIDTH, height?: number, params: ImageQueryParameters = {}): Promise<Blob> {
return getData<Blob>(`/id/${id}/${width}/${height !== undefined ? height : width}`, params)
}

export async function getImageBySeed(seed: string, params: ImageQueryParameters): Promise<Blob> {
return getData<Blob>(`/seed/${seed}/`, params)
}

export async function getRandomImage(params: ImageQueryParameters): Promise<Blob> {
return getData<Blob>(``, params)
}

"""
again i just need a few tests for the components, nothing complicate dreally i think.

/////// LLM

## Recommended scope

I’d keep it to 3 files:

- `GalleryGrid.spec.ts`, because it is very easy to test and shows prop rendering.
- `GalleryArrowBar.spec.ts`, because it shows event emission, disabled buttons, and mocking an API call.
- `GalleryNumberPaginationBar.spec.ts`, because it shows computed state and emitted page changes.

## GalleryGrid test

This checks that one card is rendered per image and that image data is passed to `ImageCard`.

```ts
// src/components/__tests__/GalleryGrid.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GalleryGrid from '../GalleryGrid.vue'

describe('GalleryGrid', () => {
  it('renders one ImageCard per image', () => {
    const images = [
      { id: '1', author: 'Alice', download_url: 'https://example.com/1.jpg' },
      { id: '2', author: 'Bob', download_url: 'https://example.com/2.jpg' },
      { id: '3', author: 'Carol', download_url: 'https://example.com/3.jpg' }
    ]

    const wrapper = mount(GalleryGrid, {
      props: { images },
      global: {
        stubs: {
          ImageCard: {
            props: ['image'],
            template: '<div class="image-card-stub">{{ image.author }}</div>'
          }
        }
      }
    })

    const cards = wrapper.findAll('.image-card-stub')
    expect(cards).toHaveLength(3)
    expect(cards[0].text()).toBe('Alice')
    expect(cards[1].text()).toBe('Bob')
    expect(cards[2].text()).toBe('Carol')
  })
})
```


## GalleryArrowBar test

This covers:

- emitted events from back/left/right buttons,
- disabled state,
- download click calling the API and fetch flow.

```ts
// src/components/__tests__/GalleryArrowBar.spec.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import GalleryArrowBar from '../GalleryArrowBar.vue'
import { getImageDetailsById } from '@/api/picsum.api'

vi.mock('@/api/picsum.api', () => ({
  getImageDetailsById: vi.fn()
}))

describe('GalleryArrowBar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('emits navigation events', async () => {
    const wrapper = mount(GalleryArrowBar, {
      props: {
        canGoLeft: true,
        canGoRight: true,
        imageId: 10
      },
      global: {
        stubs: {
          BaseButton: {
            template: '<button class="download-btn"><slot /></button>'
          },
          ArrowLeftRegular: true,
          IconCarretLeftRegular: true,
          IconCarretRightRegular: true
        }
      }
    })

    const buttons = wrapper.findAll('button')

    await buttons[0].trigger('click')
    expect(wrapper.emitted('back-to-gallery')).toHaveLength(1)

    await buttons[1].trigger('click')
    expect(wrapper.emitted('previous-image')).toHaveLength(1)

    await buttons[2].trigger('click')
    expect(wrapper.emitted('next-image')).toHaveLength(1)
  })

  it('disables arrow buttons correctly', () => {
    const wrapper = mount(GalleryArrowBar, {
      props: {
        canGoLeft: false,
        canGoRight: false,
        imageId: 10
      },
      global: {
        stubs: {
          BaseButton: {
            template: '<button class="download-btn"><slot /></button>'
          },
          ArrowLeftRegular: true,
          IconCarretLeftRegular: true,
          IconCarretRightRegular: true
        }
      }
    })

    const buttons = wrapper.findAll('button')
    expect((buttons[1].element as HTMLButtonElement).disabled).toBe(true)
    expect((buttons[2].element as HTMLButtonElement).disabled).toBe(true)
  })

  it('downloads the image when download is clicked', async () => {
    vi.mocked(getImageDetailsById).mockResolvedValue({
      id: '10',
      author: 'Alice',
      width: 1000,
      height: 800,
      url: 'https://example.com/photo',
      download_url: 'https://example.com/photo.jpg'
    } as any)

    const blob = new Blob(['test'], { type: 'image/jpeg' })
    global.fetch = vi.fn().mockResolvedValue({
      blob: vi.fn().mockResolvedValue(blob)
    }) as any

    const createObjectURLSpy = vi
      .spyOn(URL, 'createObjectURL')
      .mockReturnValue('blob:test-url')

    const appendChildSpy = vi.spyOn(document.body, 'appendChild')
    const removeChildSpy = vi.spyOn(document.body, 'removeChild')

    const clickSpy = vi.fn()
    vi.spyOn(document, 'createElement').mockReturnValue({
      href: '',
      download: '',
      click: clickSpy
    } as any)

    const wrapper = mount(GalleryArrowBar, {
      props: {
        canGoLeft: true,
        canGoRight: true,
        imageId: 10
      },
      global: {
        stubs: {
          BaseButton: {
            template: '<button class="download-btn" @click="$emit(`click`)"><slot /></button>'
          },
          ArrowLeftRegular: true,
          IconCarretLeftRegular: true,
          IconCarretRightRegular: true
        }
      }
    })

    await wrapper.find('.download-btn').trigger('click')

    expect(getImageDetailsById).toHaveBeenCalledWith(10)
    expect(global.fetch).toHaveBeenCalledWith('https://example.com/photo.jpg')
    expect(createObjectURLSpy).toHaveBeenCalled()
    expect(appendChildSpy).toHaveBeenCalled()
    expect(clickSpy).toHaveBeenCalled()
    expect(removeChildSpy).toHaveBeenCalled()
  })
})
```


## Pagination test

This is a very good component test because it checks rendered text, visible page buttons, emits, and disabled state.

```ts
// src/components/__tests__/GalleryNumberPaginationBar.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GalleryNumberPaginationBar from '../GalleryNumberPaginationBar.vue'

describe('GalleryNumberPaginationBar', () => {
  it('shows the correct item range', () => {
    const wrapper = mount(GalleryNumberPaginationBar, {
      props: {
        currentLimit: 20,
        totalItems: 95,
        currentPage: 2
      },
      global: {
        stubs: {
          IconCarretLeftRegular: true,
          IconCarretRightRegular: true
        }
      }
    })

    expect(wrapper.text()).toContain('21-40 of 95')
  })

  it('emits page-change when a page button is clicked', async () => {
    const wrapper = mount(GalleryNumberPaginationBar, {
      props: {
        currentLimit: 20,
        totalItems: 95,
        currentPage: 2
      },
      global: {
        stubs: {
          IconCarretLeftRegular: true,
          IconCarretRightRegular: true
        }
      }
    })

    const pageButtons = wrapper.findAll('.pagination-selector')
    await pageButtons[0].trigger('click')

    expect(wrapper.emitted('page-change')).toBeTruthy()
  })

  it('disables previous button on first page', () => {
    const wrapper = mount(GalleryNumberPaginationBar, {
      props: {
        currentLimit: 20,
        totalItems: 95,
        currentPage: 1
      },
      global: {
        stubs: {
          IconCarretLeftRegular: true,
          IconCarretRightRegular: true
        }
      }
    })

    const buttons = wrapper.findAll('button')
    expect((buttons[0].element as HTMLButtonElement).disabled).toBe(true)
  })

  it('disables next button on last page', () => {
    const wrapper = mount(GalleryNumberPaginationBar, {
      props: {
        currentLimit: 20,
        totalItems: 40,
        currentPage: 2
      },
      global: {
        stubs: {
          IconCarretLeftRegular: true,
          IconCarretRightRegular: true
        }
      }
    })

    const buttons = wrapper.findAll('button')
    expect((buttons[buttons.length - 1].element as HTMLButtonElement).disabled).toBe(true)
  })
})
```


## Small note

Because your `BaseButton` does not define its own emits and just wraps a native `<button>`, stubbing it as a real button in tests is the easiest approach.  Also, your download tests are a bit more “integration-like” than pure unit tests, so if you want to keep things simpler, you can skip that one and use only the emission/rendering tests.
