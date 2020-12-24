<template>
  <ToolsComponent
    title="EXIF Viewer"
    description="TODO"
    meta-description="TODO"
  >
    <div
      v-if="exifFileData"
      class="mb-8"
    >
      <div class="flex justify-between">
        <div>
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            File Information
          </h3>
          <p class="max-w-2xl mt-1 text-sm text-gray-500">
            EXIF data on the file you provided
          </p>
        </div>
        <img
          v-if="dataURL && fileType.split('/')[0] === 'image'"
          :src="dataURL"
          alt="your image"
          class="h-12"
        >
        <div v-else>
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
          >file type: {{ fileType }}</span>
        </div>
      </div>
      <div class="mt-5 border-t border-gray-200">
        <dl class="sm:divide-y sm:divide-gray-200">
          <p
            v-if="exifFileData.length === 0"
            class="mt-4 text-gray-500"
          >
            This {{ fileType.split('/')[0] === 'application' ? 'file' : fileType.split('/')[0] }} does not contain any EXIF information.
          </p>
          <div
            v-for="property in exifFileData.sort()"
            :key="property.key"
            class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4"
          >
            <dt class="text-sm font-medium text-gray-500">
              {{ property.key }}
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ property.value }}
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <div
      class="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md sm:max-w-lg"
      :class="isDragOver ? 'bg-blue-50' : ''"
      @drop="dragAndDropHandler"
      @dragover="dragAndDropHandler"
      @dragleave="dragAndDropHandler"
    >
      <div class="space-y-1 text-center">
        <svg
          class="w-12 h-12 mx-auto text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div class="flex justify-center text-sm text-gray-600">
          <label
            for="file-upload"
            class="relative font-medium text-blue-600 rounded-md cursor-pointer hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
          >
            <span @click="$refs.input.click()">Choose a <span v-if="fileType">new</span> file</span>
            <input
              id="file-upload"
              ref="input"
              name="file-upload"
              type="file"
              class="sr-only"
              @change="addFileTroughInput"
            >
          </label>
          <p class="pl-1">
            or drag and drop
          </p>
        </div>
        <p class="text-xs text-gray-500">
          Large files might cause your browser to be unresponsive for several seconds.
        </p>
      </div>
    </div>
  </ToolsComponent>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import EXIF from 'exif-js'

import ToolsComponent from './ToolsComponent.vue'

const getExifData = async (dataUrl) => new Promise((resolve) => {
  const image = new Image()
  image.src = dataUrl
  setTimeout(() => {
    EXIF.getData(image, function () {
      const exifData = EXIF.getAllTags(this)
      const result = Object.keys(exifData).sort().map((key) => ({
        key,
        value: exifData[key],
      }))
      console.log(exifData)
      resolve(result)
    })
  }, 0)
})

export default defineComponent({
  components: {
    ToolsComponent,
  },
  setup() {
    const file = ref<null | Blob>(null)
    const fileType = ref('')
    const isDragOver = ref(false)
    const dataURL = ref('')
    const exifFileData = ref()

    const addFileTroughInput = (e: Event) => {
      loadFile(e.target.files[0])
    }

    const dragAndDropHandler = (e: Event) => {
      e.preventDefault()
      switch (e.type) {
        case 'dragover': isDragOver.value = true
          break
        case 'drop': loadFile(e.dataTransfer.files[0])
          break
        default: isDragOver.value = false
      }
    }

    const loadFile = (image: Blob) => {
      console.log(image.type)
      fileType.value = image.type
      exifFileData.value = null
      dataURL.value = ''
      isDragOver.value = false
      file.value = image
      const fileReader = new FileReader()
      fileReader.onload = async (e: Event) => {
        dataURL.value = e.target.result
        exifFileData.value = await getExifData(dataURL.value)
      }
      fileReader.readAsDataURL(image)
    }

    return { addFileTroughInput, isDragOver, exifFileData, dataURL, dragAndDropHandler, fileType }
  },
})
</script>
