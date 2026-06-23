<script lang="ts" setup>
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
