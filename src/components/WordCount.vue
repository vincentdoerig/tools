<template>
  <ToolsComponent
    title="Word Count"
    description="Text is saved locally on every edit."
  >
    <textarea
      v-model="words"
      class="w-full rounded-md "
      rows="10"
      placeholder="Start typing or paste your text..."
      autofocus
    />
    <div class="flex flex-wrap justify-between max-w-md text-gray-800 tabular-nums">
      <p>{{ wordCount }} Words</p>
      <p>{{ charCount }} Characters</p>
      <p>{{ sentenceCount }} <span v-if="sentenceCount === 1">Sentence</span> <span v-else>Sentences</span></p>
    </div>
  </ToolsComponent>
</template>

<script lang="ts">
import { defineComponent, watch, ref, computed } from 'vue'

import ToolsComponent from './ToolsComponent.vue'

export default defineComponent({
  components: {
    ToolsComponent,
  },

  setup() {

    const words = ref(localStorage.getItem('words') || '')
    const charCount = computed(() => words.value.length)
    const wordCount = computed(() => words.value.split(/\S+/g).length - 1 )
    const sentenceCount = computed(() => words.value.split(/\s+[^.!?]*[.!?]/).length - 1)

    watch(words, (content) => {
      localStorage.setItem('words', content)
    })
    return { words, charCount, wordCount, sentenceCount }
  },
})
</script>
