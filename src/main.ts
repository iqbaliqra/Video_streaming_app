import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { createPinia } from 'pinia';
const app = createApp(App)

app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts:1,
  newestOnTop: true
})
app.use(router)
app.mount('#app')
app.use(createPinia())
