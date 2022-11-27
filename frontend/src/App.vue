<script setup lang="ts">
import { ref, computed } from "vue";
import Page from "./components/Page.vue";

const currentPath = ref(window.location.pathname);

window.addEventListener("hashchange", () => {
  currentPath.value = window.location.pathname;
});

const pageTitle = computed(() => {
  return currentPath.value.replace("/", "");
});
</script>

<template>
  <div v-if="currentPath === '/'">HOME</div>
  <div v-else>
    <Page :title="pageTitle" />
  </div>
</template>

<style scoped></style>
