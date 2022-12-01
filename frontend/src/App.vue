<script setup lang="ts">
import { ref, computed } from "vue";
import DefaultLayout from "./layouts/default-layout.vue";
import Article from "./pages/Article.vue";
import E404 from "./pages/E404.vue";

const currentPath = ref(window.location.pathname);

// window.addEventListener("hashchange", () => {
//   console.log("hashchange", window.location.pathname);
//   currentPath.value = window.location.pathname;
// });

const pageTitle = computed(() => {
  if (currentPath.value === "/") {
    return "home";
  } else {
    return currentPath.value.replace("/", "");
  }
});
</script>

<template>
  <DefaultLayout :title="pageTitle">
    <E404 v-if="currentPath === '/404'" />
    <Article v-else :title="pageTitle" />
  </DefaultLayout>
</template>

<style scoped></style>
