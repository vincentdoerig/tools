<template>
  <ToolsComponent
    title="Arrows"
    description="Click to copy."
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

    <div class="flex flex-wrap w-full text-xl text-blue-900 md:text-5xl flex-cols">
      <button
        v-for="arrow in arrows"
        :key="arrow.title"
        class="flex items-center justify-center w-12 h-12 p-2 transition transform bg-blue-200 border border-blue-800 cursor-pointer md:w-20 md:h-20 hover:scale-110 hover:z-10 focus:z-10 focus:scale-125 hover:text-blue-100 hover:bg-blue-900"
        :title="arrow.title"
        @click="copy(arrow.value)"
      >
        {{ arrow.value }}
      </button>
    </div>
  </ToolsComponent>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { toClipboard } from '@soerenmartius/vue3-clipboard'

import ToolsComponent from './ToolsComponent.vue'
import arrows from '../utils/arrows'

export default defineComponent({
  components: {
    ToolsComponent,
  },
  setup() {

    const copy = (value: string) => {
      toClipboard(value).then(() => {
        onSuccess()
      }).catch(error => {
        console.log(`copy error: ${error}`)
      })
    }
    const copySuccess = ref<boolean>(false)
    const onSuccess = () => {
      copySuccess.value = true
      setTimeout(() => {
        copySuccess.value = false
      }, 2000)
    }

    return { arrows, onSuccess, copySuccess, toClipboard, copy }
  },
})
</script>
