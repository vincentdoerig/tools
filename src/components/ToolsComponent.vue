<template>
  <div>
    <div class="mt-4 mb-8 md:mt-2">
      <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
        {{ title }}
      </h1>
      <p class="text-gray-600">
        {{ description }}
      </p>
      <div
        v-if="related.length"
        class="mt-4 text-gray-600"
      >
        <h2 class="mt-4 mb-2 text-xl font-semibold text-gray-900">
          Related tools
        </h2>
        <ul
          v-for="relatedTool in related"
          :key="relatedTool.link"
        >
          <li class="relative pl-2 my-2 ml-4 text-sm text-left text-gray-900 list-disc">
            <router-link
              :to="relatedTool.link"
              class="font-medium text-left underline"
            >
              {{ relatedTool.name }} →
            </router-link>
          </li>
        </ul>
      </div>
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
    related: {
      type: Array,
      default: () => [],
    },
  },
})
</script>
