<script lang="ts" setup>
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
    <span class="pagination-counter">{{currentMinimumItemIndex}}-{{currentMaximumItemIndex}} of {{props.totalItems}}</span>
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
