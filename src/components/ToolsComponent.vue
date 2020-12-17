<template>
  <div>
    <div class="mt-4 mb-8 text-gray-900 md:mt-2 dark:text-gray-100">
      <h1 class="text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl">
        {{ title }}
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        {{ description }}
      </p>
      <div
        v-if="related.length"
        class="mt-4"
      >
        <h2 class="mt-4 mb-2 text-xl font-semibold">
          Related tools
        </h2>
        <ul
          v-for="relatedTool in related"
          :key="relatedTool.link"
          class="text-gray-600 dark:text-gray-400"
        >
          <li class="relative pl-2 my-2 ml-4 text-sm text-left list-disc">
            <router-link
              :to="relatedTool.link"
              class="font-medium text-left underline hover:text-gray-700 dark:hover:text-gray-300"
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
