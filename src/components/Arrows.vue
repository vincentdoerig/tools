<template>
  <ToolsComponent
    title="Arrows"
    description="Find the arrow you need. Click to copy. Some arrows might not display correctly/differently."
    meta-description="Search through and copy ASCII arrows with ease. Paste them in any document or application."
    :related="[{ name: 'Glyphs', link: 'glyphs' }]"
  >
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="copySuccess"
        class="fixed z-20 p-4 border border-green-600 rounded-md top-4 right-4 bg-green-50"
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <!-- Heroicon name: check-circle -->
            <svg
              class="w-5 h-5 text-green-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-green-800">
              Copied
            </p>
          </div>
        </div>
      </div>
    </transition>

    <Search
      :to-search="arrows"
      :search-keys="[
        'value',
        { name: 'name', weight: 2 },
        { name: 'alt', weight: 0.8 },
      ]"
      name="arrows"
      class="mb-8"
      @results-change="updateResults"
    />

    <div
      class="flex flex-wrap w-full text-4xl text-blue-800 dark:text-blue-200 flex-cols"
    >
      <button
        v-for="arrow in allArrows"
        :key="arrow.item ? arrow.item.name : arrow.name"
        :title="arrow.item ? arrow.item.name : arrow.name"
        class="flex items-center justify-center w-20 h-20 transition transform border border-gray-300 cursor-pointer focus:ring focus:ring-blue-800 dark:focus:ring-blue-200 focus:scale-125 hover:text-blue-100 hover:bg-blue-900 focus:bg-gray-200 dark:focus:bg-gray-800 focus:z-20 focus:outline-none"
        @click="copy(arrow.item ? arrow.item.value : arrow.value)"
      >
        {{ arrow.item ? arrow.item.value : arrow.value }}
      </button>
    </div>
  </ToolsComponent>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { toClipboard } from '@soerenmartius/vue3-clipboard'

import ToolsComponent from './ToolsComponent.vue'
import Search from './Search.vue'
import arrows from '../utils/arrows'

interface Arrow {
  value: string;
  unicode: string;
  name: string;
  category: string;
  alt?: string;
}

export default defineComponent({
  components: {
    ToolsComponent,
    Search,
  },
  setup() {
    const allArrows = ref<Arrow[]>(arrows)

    const copy = (value: string) => {
      toClipboard(value)
        .then(() => {
          onSuccess()
        })
        .catch((error) => {
          console.log(`copy error: ${error}`)
        })
    }

    const updateResults = (newResults: Arrow[]) => {
      allArrows.value = newResults
    }

    const copySuccess = ref<boolean>(false)
    const onSuccess = () => {
      copySuccess.value = true
      setTimeout(() => {
        copySuccess.value = false
      }, 2000)
    }

    return {
      allArrows,
      arrows,
      copy,
      copySuccess,
      onSuccess,
      toClipboard,
      updateResults,
    }
  },
})
</script>
