import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router/router'

createApp(App).use(ElementPlus).use(router).mount('#app')
