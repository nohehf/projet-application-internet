<script setup lang="ts">
import { onMounted, ref } from "vue";
import { marked } from "marked";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import NotFound from "./NotFound.vue";
import { type Socket } from "socket.io-client";
import { TYPE, useToast } from "vue-toastification";
const toast = useToast();

const props = defineProps<{ title: string; socket: Socket }>();
let data = ref<{ statusCode: number; content: string }>({
  content: "",
  statusCode: 0,
});
let status = ref<"loading" | "ok" | "error" | "404">("loading");
let html = ref("");
let mode = ref<"edit" | "view">("view");
const nClients = ref(0);

props.socket.on("connexion", (res) => {
  nClients.value = res.nClients;
});

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

props.socket.on("pageUpdated", async (res: { data: { title: string } }) => {
  if (res.data.title === props.title) {
    toast(`Current page updated: /${res.data.title}`, { type: TYPE.INFO });
    await fetchPage();
    renderHtml();
  } else {
    toast(`Page updated: /${res.data.title}`, { type: TYPE.INFO });
  }
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
    <NotFound :title="props.title" :callback="createPage" />
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
      {{ nClients }} client{{ nClients > 1 ? "s" : "" }} connected.
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
