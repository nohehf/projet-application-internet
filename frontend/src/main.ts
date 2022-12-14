import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import Toast, { POSITION, type PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App)
app.mount('#app')

const options: PluginOptions = {
  position: POSITION.TOP_LEFT
};

app.use(Toast, options);