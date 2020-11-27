import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './index.css'

import Home from './Home.vue'
import Hello from './components/HelloWorld.vue'
import WordCount from './components/WordCount.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/word-count', component: WordCount },
  { path: '/hello', component: Hello },
]

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(),
  routes,
})

app.use(router)

app.mount('#app')
