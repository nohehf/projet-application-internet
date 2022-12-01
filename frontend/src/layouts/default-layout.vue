<template>
  <div>
    <slot />
    <div class="bottom-bar">
      <div>Wiki - Savy Hugo - Duclos Eliott - nohehf ®</div>
      <div>/{{ title }}.md</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
defineProps<{ title: string }>();
</script>

<style lang="scss" scoped>
div {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .content {
    height: calc(100% - 1rem);
  }

  .bottom-bar {
    position: fixed;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 1rem;
    height: 24px;
    background-color: rgb(60, 123, 231);
  }
}
</style>
