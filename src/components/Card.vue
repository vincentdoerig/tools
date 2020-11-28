<template>
  <router-link
    v-if="slug"
    class="inline-block text-gray-800 border border-gray-700 rounded-lg outline-none bg-next hover:border-gray-400 w-60 focus:ring focus:ring-gray-300"
    :to="slug"
  >
    <div class="p-4">
      <h4 class="font-semibold">
        {{ title }}
      </h4>
      <div class="inline-flex py-2 text-sm text-gray-600">
        {{ description }}
      </div>
    </div>
  </router-link>
  <a
    v-else
    :href="url"
    class="relative inline-block text-gray-800 border border-gray-700 rounded-lg outline-none bg-next hover:border-gray-400 w-60 focus:ring focus:ring-gray-300"
    target="_blank"
  >
    <div class="p-4">
      <svg
        class="absolute w-5 h-5 top-4 right-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
      <h4 class="font-semibold">
        {{ title }}
      </h4>
      <div class="inline-flex py-2 text-sm text-gray-600">
        {{ description }}
      </div>
    </div>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    slug: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
  },
})
</script>
