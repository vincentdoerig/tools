import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { VueClipboard } from '@soerenmartius/vue3-clipboard'
import './index.css'

import Home from './Home.vue'
import Hello from './components/HelloWorld.vue'
import VideoToGIF from './components/VideoToGIF.vue'
import WordCount from './components/WordCount.vue'
import Date from './components/Date.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/word-count', component: WordCount },
  { path: '/date', component: Date },
  { path: '/video-to-gif', component: VideoToGIF },
  { path: '/hello', component: Hello },
]

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(),
  routes,
})

app.use(router)
app.use(VueClipboard)

app.mount('#app')
