<template>
  <h1>404 page not found</h1>
  <button v-if="callback" v-on:click="callback">
    Create {{ props.title }} page
  </button>
  <a v-else="callback" href="/"> Back to homepage </a>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps<{
  title: string;
  callback?: () => void;
}>();
</script>
