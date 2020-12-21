import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createHead } from '@egoist/vue-head'
import App from './App.vue'
import { VueClipboard } from '@soerenmartius/vue3-clipboard'
import './index.css'

import Home from './Home.vue'
import About from './components/About.vue'
import VideoToGIF from './components/VideoToGIF.vue'
import WordCount from './components/WordCount.vue'
import Date from './components/Date.vue'
import Arrows from './components/Arrows.vue'
import Glyphs from './components/Glyphs.vue'
import NotFound from './components/NotFound.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/word-count', component: WordCount },
  { path: '/date', component: Date },
  { path: '/video-to-gif', component: VideoToGIF },
  { path: '/arrows', component: Arrows },
  { path: '/glyphs', component: Glyphs },
  { path: '/about', component: About },
  { path: '/:pathMatch(.*)*', component: NotFound },
]

const app = createApp(App)
const head = createHead()
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

app.use(head)
app.use(router)
app.use(VueClipboard)

app.mount('#app')
