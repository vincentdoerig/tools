<template>
  <ToolsComponent
    title="Video to GIF converter"
    description="/ɡɪf/ — no upload, everything happens on your device"
  >
    <div v-if="!isSupported">
      <div class="p-4 border-l-4 border-yellow-400 bg-yellow-50">
        <div class="flex">
          <div class="flex-shrink-0">
            <!-- Heroicon name: exclamation -->
            <svg
              class="w-5 h-5 text-yellow-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-yellow-700">
              Your browser does not support the functionality of this tool. Please try with a supported browser like Firefox, Chrome or Edge.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div
        v-if="error"
        class="p-4 mb-4 border-l-4 border-red-400 bg-red-50"
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <!-- Heroicon name: exclamation -->
            <svg
              class="w-5 h-5 text-red-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700">
              {{ error }}
            </p>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-none gap-4 sm:grid-cols-2">
        <div
          class="flex flex-col items-center justify-center p-6 bg-white rounded shadow-sm dark:bg-black"
        >
          <video
            v-if="video"
            :src="video"
            class="w-auto h-auto mb-4"
            controls
            muted
            alt="video preview"
          />
          <button
            v-if="!video"
            type="button"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            @click="$refs.input.click()"
          >
            Select video
          </button>

          <button
            v-else-if="gif"
            type="button"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm disabled:cursor-not-allowed hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
            @click="clear"
          >
            Convert new video
          </button>
          <button
            v-else
            type="button"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm disabled:cursor-not-allowed hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
            :disabled="!isReady || !isSupported"
            @click="convert(videoFile)"
          >
            {{ isReady ? 'Convert video &rarr;' : isSupported ? 'Wait, library loading...' : 'Your browser is not supported' }}
          </button>
          <input
            ref="input"
            type="file"
            class="fixed hidden"
            accept="video/*"
            @change="addFileTroughInput"
          >
        </div>
        <div
          class="flex items-center justify-center p-6 bg-white rounded shadow-sm dark:bg-black"
        >
          <div
            v-if="isConverting"
            class="flex justify-around w-full"
          >
            <button
              type="button"
              class="inline-flex items-center px-4 py-2 text-xs font-medium leading-6 text-black transition duration-150 ease-in-out bg-gray-200 border border-transparent rounded-md cursor-not-allowed md:text-base sm:text-sm bg-rose-600 hover:bg-rose-500 focus:border-rose-700 active:bg-rose-700"
              disabled=""
            >
              <svg
                class="w-5 h-5 mr-3 -ml-1 text-black animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing ({{ progress >= 0 ? Math.ceil(progress * 100) : 0 }}%)
            </button>
            <button
              type="button"
              class="inline-flex items-center px-4 py-2 text-xs font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm sm:text-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              title="abort current conversion"
              @click="this.$router.go()"
            >
              Abort
            </button>
          </div>
          <div v-else-if="gif">
            <img
              :src="gif"
              alt="output gif"
              class="mb-4"
            >
            <button
              type="button"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-700 border border-transparent rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
              @click="download"
            >
              Download gif
            </button>
          </div>
          <div
            v-else
            class="text-gray-600 dark:text-gray-400"
          >
            Your GIF will appear here.
          </div>
        </div>
      </div>

      <div class="mt-2">
        <div class="text-right">
          <button
            type="button"
            class="text-sm font-medium text-gray-600 border border-transparent rounded dark:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            @click="toggleLogs"
          >
            {{ showLogs ? 'Hide' : 'Show' }} logs
          </button>
        </div>
        <pre
          v-if="showLogs"
          ref="logComponent"
          class="px-2 py-1 mt-2 mb-6 overflow-auto text-xs leading-5 text-gray-900 whitespace-pre-wrap bg-gray-200 rounded shadow max-h-56 dark:bg-gray-800 dark:text-gray-300"
        >{{ logs }}</pre>
      </div>
    </div>
  </ToolsComponent>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

import ToolsComponent from './ToolsComponent.vue'
import useFFmpeg, { logs, progress } from '../utils/FFmpeg'

export default defineComponent({
  components: {
    ToolsComponent,
  },
  setup() {
    const video = ref<null | string>(null)
    const videoFile = ref<null | Blob>(null)
    const error = ref('')

    const { isReady, convert, clearGIF, gif, isConverting, isSupported } = useFFmpeg()

    const addFileTroughInput = (e: Event) => {
      error.value = ''
      const selectedFile = e.target.files[0]
      videoFile.value = selectedFile
      if (!selectedFile) return
      if (selectedFile.type.split('/')[0] !== 'video') {
        console.log('File type not supported')
        error.value = 'File type not supported'
        return
      }
      video.value = URL.createObjectURL(selectedFile)
    }

    const download = () => {
      const image = document.createElement('a')
      image.href = gif.value
      image.download = `${Date.now()}.gif`
      image.click()
    }

    const handleLogScroll = () => {
      logComponent.value.scrollTop = logComponent.value.scrollHeight
    }

    const showLogs = ref<boolean>(false)
    const toggleLogs = () => {
      showLogs.value = !showLogs.value
      if(showLogs.value) {
        // scrolls to the bottom of the logs
        setTimeout(() => handleLogScroll(), 100)
      }
    }

    const logComponent = ref(null)
    watch(logs, () => {
      // scroll to end of logs
      if(showLogs.value) handleLogScroll()
    })
    watch(isReady, () => {
      console.log(isReady.value)
    })

    const clear = () => {
      error.value = ''
      videoFile.value = null
      video.value = null
      clearGIF()
    }

    return {
      addFileTroughInput,
      clear,
      convert,
      download,
      error,
      gif,
      isConverting,
      isReady,
      isSupported,
      logComponent,
      logs,
      progress,
      showLogs,
      toggleLogs,
      video,
      videoFile,
    }
  },
})
</script>
