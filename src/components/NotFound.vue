<template>
  <div class="mt-8 prose max-w-none dark:prose-dark">
    <div class="pb-4">
      <h1>Sorry, we can’t seem to find what you’re looking for.</h1>
      <span><code>404 Not Found</code></span>
    </div>

    <p>
      You’ve landed on a URL that doesn’t seem to exist. Return <router-link to="/">
        home
      </router-link> or if you think this is an error, please <a
        href="https://github.com/vincentdoerig/tools/issues"
        target="_blank"
        rel="noopener noreferrer"
      >let me know</a>.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style scoped>
h1 {
  margin-bottom: 0;
}
</style>
