<template>
  <div class="px-4 pt-4 mx-auto mb-8 md:pt-8 max-w-7xl sm:px-6 lg:px-8">
    <nav
      v-if="$route.path !== '/'"
      class="text-xs sm:text-sm"
    >
      <router-link
        to="/"
        class="text-gray-700 hover:text-gray-800 focus:text-black dark:text-gray-300 dark:hover:text-gray-200 dark:focus:text-white"
      >
        &larr; All Tools
      </router-link>
    </nav>
    <div class="absolute flex right-2 top-2 md:right-4 md:top-3 lg:right-8 lg:top-4">
      <button
        class="p-4 text-gray-900 dark:text-gray-100 ffocus:ring focus:ring-gray-300"
        :title="isDark ? 'Toggle light mode' : 'Toggle dark mode'"
        @click="toggle"
      >
        <!-- Devfont icon name: cloudy-moon -->
        <svg
          v-if="isDark"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-5 h-5"
        ><path d="M14 7.776v-.091a7.045 7.045 0 0 0-1.432-4.271A6.56 6.56 0 0 0 8.896 1a7.142 7.142 0 0 1-.09 3.432 6.93 6.93 0 0 1-1.673 2.957 6.539 6.539 0 0 1-2.84 1.743A6.334 6.334 0 0 1 1 9.226a6.987 6.987 0 0 0 1.373 2.867 6.645 6.645 0 0 0 2.115 1.736" /><path d="M8.854 14.308c0-1.323.385-2.617 1.108-3.718a6.6 6.6 0 0 1 2.95-2.464 6.46 6.46 0 0 1 3.798-.38 6.538 6.538 0 0 1 3.365 1.83 6.73 6.73 0 0 1 1.799 3.427 6.805 6.805 0 0 1-.374 3.866 6.667 6.667 0 0 1-2.421 3.003A6.49 6.49 0 0 1 15.427 21H7.694a4.19 4.19 0 0 1-1.788-.403 4.263 4.263 0 0 1-1.455-1.13 4.356 4.356 0 0 1-.854-1.649 4.406 4.406 0 0 1 .589-3.59A4.312 4.312 0 0 1 5.52 12.95a4.181 4.181 0 0 1 3.557-.377" /></svg>
        <!-- Devfont icon name: sun-horizon -->
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-5 h-5"
        ><path d="M2 15h20" /><path d="M5 19h14" /><path d="M6.577 15a5.625 5.625 0 1 1 10.846 0" /><path d="M8.7 5.532l-.718-1.733" /><path d="M4.032 10.2l-1.733-.718" /><path d="M19.968 10.2l1.733-.718" /><path d="M15.3 5.532l.718-1.733" /></svg>
      </button>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const isDark = ref(false)
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.querySelector('html')?.classList.add('dark')
      isDark.value = true
    } else {
      document.querySelector('html')?.classList.remove('dark')
    }
    const toggle = () => {
      document.querySelector('html')?.classList.toggle('dark')
      if (document.querySelector('html')?.classList.contains('dark')){
        isDark.value = true
        localStorage.theme = 'dark'
      } else {
        isDark.value = false
        localStorage.theme = 'light'
      }
    }

    // maybe add a double click event listener that does `localStorage.removeItem('theme')` (respect the OS preference)

    return { toggle, isDark }
  },
})
</script>
