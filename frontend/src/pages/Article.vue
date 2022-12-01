<script setup lang="ts">
import { onMounted, ref } from "vue";
import { marked } from "marked";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";

const props = defineProps<{ title: string }>();

let data = ref<{ statusCode: number; content: string }>({
  content: "",
  statusCode: 0,
});
let status = ref<"loading" | "ok" | "error" | "404">("loading");
let html = ref("");
let mode = ref<"edit" | "view">("view");

async function fetchPage() {
  try {
    let res = await fetch("http://localhost:3000/" + props.title);
    data.value = await res.json();
    if (res.status === 404) {
      status.value = "404";
    } else {
      status.value = "ok";
    }
  } catch (e) {
    status.value = "error";
  }
}

async function createPage() {
  status.value = "loading";
  try {
    await fetch("http://localhost:3000/" + props.title, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `# ${props.title}  \nEdite cette page pour commencer`,
      }),
    });
  } catch (e) {
    status.value = "error";
    return;
  } finally {
    await fetchPage();
    await renderHtml();
    status.value = "ok";
  }
}

async function renderHtml() {
  html.value = await marked.parse(data.value.content);
}

async function saveEdition() {
  status.value = "loading";
  try {
    await fetch("http://localhost:3000/" + props.title, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: data.value.content,
      }),
    });
  } catch (e) {
    status.value = "error";
    return;
  } finally {
    await fetchPage();
    await renderHtml();
    status.value = "ok";
  }
  await switchMode();
}

async function switchMode() {
  mode.value = mode.value === "edit" ? "view" : "edit";
}

async function editButtonCallback() {
  if (mode.value === "edit") {
    await saveEdition();
  } else {
    await switchMode();
  }
}

onMounted(async () => {
  await fetchPage();
  renderHtml();
});
</script>

<template>
  <div v-if="status === 'loading'">
    <h1>Loading...</h1>
  </div>
  <div v-else-if="status === 'error'">
    <h1>An error happened</h1>
  </div>
  <div v-else-if="status === '404'">
    <h1>404 page not found</h1>
    <button v-on:click="createPage">Create {{ title }} page</button>
    <p></p>
  </div>
  <div v-else class="article-wrapper">
    <div class="article" v-if="mode === 'view'" v-html="html" />

    <MdEditor
      v-else
      language="en-US"
      v-model="data.content"
      theme="dark"
      :value="data.content"
      :on-save="saveEdition"
      :on-cancel="switchMode"
      style="height: 100%"
    />

    <div class="sidebar">
      <button v-on:click="editButtonCallback">
        {{ mode === "edit" ? "Save" : "Edit" }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.article-wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100% - 24px);
  justify-content: space-between;

  .article {
    padding: 0.5rem 1rem;
    overflow: auto;
    width: 100%;
    height: 100%;
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 10rem;
    height: 100%;
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.2);
  }
}
</style>
