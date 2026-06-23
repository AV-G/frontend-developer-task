<script setup lang="ts">
</script>

<template>
  <div class="image-card-container">
    <div class="image-wrapper">
      <div class="loading-spinner"></div>
    </div>
    <div class="card-description">
      <div class="author"></div>
      <hr />
      <div class="download-link"></div>
      <div class="download-button"></div>
    </div>
  </div>
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
  background: #e5e5e5;
}

.loading-spinner {
    height: 100%;
    width: 100%;
    background: #e5e5e5;
}

.author {
    font-size: 1.5rem;
    height: 1.5rem;
    width: 60%;
    background: #e5e5e5;
}

.card-description {
    padding: clamp(1rem, 2vw + 0.5rem, 1.5rem) clamp(0.875rem, 1vw + 0.75rem, 1.00rem);
}

.download-link {
    height: 1rem;
    width: 30%;
    background: #e5e5e5;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.download-button {
    height: 2.5rem;
    width: 40%;
    background: #e5e5e5;
    border-radius: vars.$default-radius;
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