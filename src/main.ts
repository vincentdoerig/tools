import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './index.css'

import Home from './Home.vue'
import About from './components/HelloWorld.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
]

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(),
  routes,
})

app.use(router)

app.mount('#app')
