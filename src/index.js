import { createApp } from 'vue'
import App from './app.vue'
import store from './store'
import router from './router'
import '@/assets/style/reset.styl'
const app = createApp(App)
app.use(router).use(store).mount('#app')
