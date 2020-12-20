<template>
  <div class="max-w-5xl mx-auto my-6">
    <div class="flex flex-col items-center justify-center text-gray-600 dark:text-gray-400">
      <h1
        class="mb-2 text-4xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-5xl sm:tracking-tight lg:text-6xl"
      >
        Online Toolbox
      </h1>
      <p class="text-center">
        Collection of online tools made by myself. — No bullshit and straight to the point.
      </p>
      <p class="text-center">
        Made by
        <a
          class="font-medium text-black underline hover:text-gray-800 dark:text-white dark:hover:text-gray-200"
          href="https://doerig.dev"
        >@vincentdoerig</a>. Open Source on
        <a
          class="font-medium underline ext-black hover:text-gray-800 dark:text-white dark:hover:text-gray-200"
          href="https://github.com/vincentdoerig/tools"
        >GitHub</a>.
      </p>
      <div
        class="grid grid-cols-none gap-4 mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <template
          v-for="card in cards"
          :key="card.slug"
        >
          <Card
            :title="card.title"
            :slug="card.link.type === 'slug' ? card.link.data : ''"
            :url="card.link.type === 'url' ? card.link.data : ''"
            :description="card.description"
            :class="card.class || ''"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Card from './components/Card.vue'

enum CATEGORY {
  Characters = 'characters',
}
enum URLType {
  Url = 'url',
  Slug = 'slug',
}
// type Link = 'slug' | 'url'
interface Card {
  title: string;
  link?: {
    type: URLType;
    data: string;
  };
  description: string;
  category?: CATEGORY;
  class?: string;
  // [key: Link]: string; // could maybe work with TS index signature in the future
}

export default defineComponent({
  components: {
    Card,
  },

  setup() {
    const cards: Card[] = [
      {
        title: 'About',
        link: {
          type: URLType.Slug,
          data: 'about',
        },
        description: 'Everything about this site.',
        class: 'border-blue-800 hover:border-blue-400 dark:border-blue-300 dark:hover:border-blue-200',
      },
      {
        title: 'Word Count',
        link: {
          type: URLType.Slug,
          data: 'word-count',
        },
        description: 'Count all your words.',
      },
      {
        title: 'Date',
        link: {
          type: URLType.Slug,
          data: 'date',
        },
        description: 'ISO, UTC, week, local time, etc.',
      },
      {
        title: 'Stopwatch',
        link: {
          type: URLType.Url,
          data: 'https://gymtimer.io',
        },
        description: 'Stopwatch with an integrated break timer.',
      },
      {
        title: 'Imgur Image Uploader',
        link: {
          type: URLType.Url,
          data: 'https://img.doerig.dev',
        },
        description: 'Quickly upload any image to imgur.com.',
      },
      {
        title: 'Video to GIF',
        link: {
          type: URLType.Slug,
          data: 'video-to-gif',
        },
        description: 'Online video to gif converter.',
      },
      {
        title: 'Arrows',
        link: {
          type: URLType.Slug,
          data: 'arrows',
        },
        description: 'Quickly copy and paste arrows.',
      },
      {
        title: 'Glyphs',
        link: {
          type: URLType.Slug,
          data: 'glyphs',
        },
        description: 'Find, copy and paste commonly used glyphs.',
      },
      {
        title: 'More coming soon™...',
        link: {
          type: URLType.Slug,
          data: '/',
        },
        description: '',
        class: 'opacity-75 bg-gradient-to-r from-blue-50 to-red-100 dark:from-black dark:to-gray-800 cursor-not-allowed',
      },
    ]

    return { cards }
  },
})
</script>
