<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps<{ title: string }>();

let content = ref("");

async function fetchPage() {
  fetch("http://localhost:3000/" + props.title)
    .then((response) => response.text())
    .then((data) => {
      content.value = data;
    });
}

onMounted(() => {
  console.log("component mounted");
  fetchPage();
});
</script>

<template>
  {{ title }}
  {{ content }}
</template>

<style scoped></style>
