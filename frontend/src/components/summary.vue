<script setup lang="ts">
const props = defineProps<{
  summary: { level: number; title: string }[];
  pageTitle: string;
}>();
const computeTitle = (title: string) => {
  return title.slice(0, 10) + (title.length > 15 ? "..." : "");
};
const computeHref = (title: string) => {
  return props.pageTitle + "#" + title.toLocaleLowerCase().replace(/ /g, "-");
};
</script>

<template>
  <div>
    <h4>Summary:</h4>
    <div v-for="(item, index) in summary" :key="index">
      <div :style="{ marginLeft: (item.level - 1) * 20 + 'px' }">
        <a :href="computeHref(item.title)"> {{ computeTitle(item.title) }} </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
h4 {
  margin: 0;
}
</style>
