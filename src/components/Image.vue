<script lang="ts" setup>
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
