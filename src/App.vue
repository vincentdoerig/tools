<template>
  <div class="px-4 pt-4 mx-auto md:pt-8 max-w-7xl sm:px-6 lg:px-8">
    <nav
      v-if="$route.path !== '/'"
      class="text-xs sm:text-sm"
    >
      <router-link
        to="/"
        class="text-gray-700 hover:text-gray-800 focus:text-black"
      >
        &larr; All Tools
      </router-link>
    </nav>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>
