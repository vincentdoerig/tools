<template>
  <div>
    <div class="mt-4 mb-8 md:mt-2">
      <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
        {{ title }}
      </h1>
      <p class="text-gray-600">
        {{ description }}
      </p>
    </div>
    <slot />
  </div>
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
  },
})
</script>
