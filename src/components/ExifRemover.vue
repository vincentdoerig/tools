<template>
  <ToolsComponent
    title="EXIF Remover"
    description="TODO"
    meta-description="TODO"
  >
    <button
      type="button"
      class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      @click="$refs.input.click()"
    >
      Select image
    </button>
    <input
      ref="input"
      type="file"
      class="fixed hidden"
      @change="addFileTroughInput"
    >
    <div v-if="exifFileData" class="overflow-hidden">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Image Information
        </h3>
        <p class="max-w-2xl mt-1 text-sm text-gray-500">
          EXIF data on the file you provided
        </p>
      </div>
      <div class="px-4 py-5 border-t border-gray-200 sm:p-0">
        <dl class="sm:divide-y sm:divide-gray-200">
          <div
            v-for="property in exifFileData"
            :key="property.key"
            class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
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
      const result = Object.keys(exifData).map((key) => ({
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
    const isDragOver = ref(false)
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
      file.value = image
      const fileReader = new FileReader()
      fileReader.onload = async (e: Event) => {
        const dataUrl = e.target.result
        exifFileData.value = await getExifData(dataUrl)
      }
      fileReader.readAsDataURL(image)
    }

    return { addFileTroughInput, isDragOver, exifFileData }
  },
})
</script>
