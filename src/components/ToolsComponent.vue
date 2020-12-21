<template>
  <!-- eslint-disable vue/max-attributes-per-line -->
  <Head>
    <title>{{ title }} — Tools</title>
    <meta name="title" :content="`${ title } — Tools`">
    <meta name="description" :content="metaDescription">

    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:url" :content="`https://tools.doerig.dev${this.$route.path}`">
    <meta property="og:title" :content="`${ title } — Tools`">
    <meta property="og:description" content="metaDescription">
    <meta
      property="og:image"
      :content="`https://og-image-seven-pi.vercel.app/%23%23%23%20${title}.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fcloud-bn0ai69us.vercel.app%2F0toolbox-black.svg`"
    >

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" :content="`https://tools.doerig.dev${this.$route.path}`">
    <meta property="twitter:title" :content="`${ title } — Tools`">
    <meta property="twitter:description" content="metaDescription">
    <meta
      property="twitter:image"
      :content="`https://og-image-seven-pi.vercel.app/%23%23%23%20${title}.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fcloud-bn0ai69us.vercel.app%2F0toolbox-black.svg`"
    >
  </Head>
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

import { Head } from '@egoist/vue-head'

export default defineComponent({
  components: {
    Head,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    metaDescription: {
      type: String,
      default: 'A site with many useful online tools.',
    },
    related: {
      type: Array,
      default: () => [],
    },
  },
})
</script>
