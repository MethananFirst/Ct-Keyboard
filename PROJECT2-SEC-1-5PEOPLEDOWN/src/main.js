import './assets/main.css'
import{ createPinia } from 'pinia'
import { createApp } from 'vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import App from './App.vue'
import router from './router'
const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.mount('#app')
app.use(pinia)