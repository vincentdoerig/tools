<template>
  <div class="max-w-5xl mx-auto my-6">
    <div class="flex flex-col items-center justify-center">
      <h1 class="mb-8 text-4xl font-bold text-gray-900">
        Tools
      </h1>
      <Card
        title="hello"
        slug="about"
        description="Hello"
      />
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
