<template>
  <div class="max-w-5xl mx-auto my-6">
    <div class="flex flex-col items-center justify-center">
      <h1 class="mb-2 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
        Tools
      </h1>
      <p class="text-center text-gray-600">
        Collection of online tools — No bullshit and straight to the point
      </p>
      <p class="text-center text-gray-600">
        Made by <a
          class="font-medium text-black underline hover:text-gray-800"
          href="https://doerig.dev"
        >@vincentdoerig</a>. Open Source on <a
          class="font-medium text-black underline hover:text-gray-800"
          href="https://github.com/vincentdoerig/tools"
        >GitHub</a>.
      </p>
      <div class="grid grid-cols-none gap-4 mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Card
          title="Hello World"
          slug="hello"
          description="👋"
        />
        <Card
          title="Word Count"
          slug="word-count"
          description="Count all your words."
        />
        <Card
          title="Date"
          slug="date"
          description="ISO, UTC, week, local time, etc."
        />
        <Card
          title="More coming soon™..."
          slug="/"
          class="opacity-75 bg-gradient-to-r from-blue-50 to-red-100"
        />
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'

import Card from './components/Card.vue'

export default defineComponent({
  components: {
    Card,
  },
})
</script>
