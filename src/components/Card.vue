<template>
  <router-link
    class="inline-block text-gray-800 border border-gray-700 rounded-lg outline-none bg-next hover:border-gray-400 w-60 focus:ring focus:ring-gray-300"
    :to="slug"
  >
    <div class="p-4">
      <h4 class="font-semibold">
        {{ title }}
      </h4>
      <div class="inline-flex py-2 text-gray-600">
        {{ description }}
      </div>
    </div>
  </router-link>
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
  },
})
</script>
