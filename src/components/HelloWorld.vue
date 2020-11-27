<template>
  <ToolsComponent
    title="Hello World"
    description="Hello, this website is a collection of online tools I need and use. No bullshit and straight to the point."
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import ToolsComponent from './ToolsComponent.vue'

export default defineComponent({
  components: {
    ToolsComponent,
  },
})
</script>
