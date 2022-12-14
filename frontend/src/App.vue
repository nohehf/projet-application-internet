<script setup lang="ts">
import { ref, computed } from "vue";
import DefaultLayout from "./layouts/default-layout.vue";
import Article from "./pages/Article.vue";
import NotFound from "./pages/NotFound.vue";
import { io } from "socket.io-client";
import { TYPE, useToast } from "vue-toastification";
const toast = useToast();

const socket = io("ws://localhost:4242");

const currentPath = ref(window.location.pathname);

const pageTitle = computed(() => {
  if (currentPath.value === "/") {
    return "/home";
  } else {
    return currentPath.value.replace("/page/", "");
  }
});

socket.on("pageCreated", (res) => {
  toast(`New page created: /${res.title}`, { type: TYPE.INFO });
});
</script>

<template>
  <DefaultLayout :title="pageTitle" :socket="socket">
    <NotFound v-if="currentPath === '/404'" :title="'404'" />
    <Article v-else :title="pageTitle" :socket="socket" />
  </DefaultLayout>
</template>

<style scoped></style>
