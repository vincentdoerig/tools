<template>
  <ToolsComponent
    title="Word Count"
    description="Text is saved locally on every edit."
  >
    <textarea
      ref="textarea"
      v-model="words"
      name="textarea"
      class="w-full rounded-md"
      rows="10"
      placeholder="Start typing or paste your text..."
      autofocus
    />
    <div class="flex flex-col flex-wrap justify-between w-full md:flex-row">
      <dl class="grid w-full max-w-xl grid-cols-1 mt-5 overflow-hidden bg-white divide-y divide-gray-200 rounded-lg shadow md:grid-cols-3 md:divide-y-0 md:divide-x">
        <div>
          <div class="px-4 py-5 sm:p-6">
            <dt class="text-base font-normal text-gray-900">
              Words
            </dt>
            <dd class="flex items-baseline justify-between mt-1 md:block lg:flex">
              <div class="flex items-baseline text-2xl font-semibold text-green-600">
                {{ selection.words || stats.words }}
                <span
                  v-if="selection.characters"
                  class="ml-2 text-sm font-medium text-gray-500"
                >
                  of {{ stats.words }}
                </span>
              </div>
            </dd>
          </div>
        </div>

        <div>
          <div class="px-4 py-5 sm:p-6">
            <dt class="text-base font-normal text-gray-900">
              Characters
            </dt>
            <dd class="flex items-baseline justify-between mt-1 md:block lg:flex">
              <div class="flex items-baseline text-2xl font-semibold text-green-600">
                {{ selection.characters || stats.characters }}
                <span
                  v-if="selection.characters"
                  class="ml-2 text-sm font-medium text-gray-500"
                >
                  of {{ stats.characters }}
                </span>
              </div>
            </dd>
          </div>
        </div>

        <div>
          <div class="px-4 py-5 sm:p-6">
            <dt class="text-base font-normal text-gray-900">
              Sentences
            </dt>
            <dd class="flex items-baseline justify-between mt-1 md:block lg:flex">
              <div class="flex items-baseline text-2xl font-semibold text-green-600">
                {{ selection.sentences || stats.sentences }}
                <span
                  v-if="selection.characters"
                  class="ml-2 text-sm font-medium text-gray-500"
                >
                  of {{ stats.sentences }}
                </span>
              </div>
            </dd>
          </div>
        </div>
      </dl>
    </div>
    <!-- <button
      v-if="!supportSelection"
      @click="calculateSelection"
    >
      Calculate for selection
    </button> -->
  </ToolsComponent>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue'

import ToolsComponent from './ToolsComponent.vue'

export default defineComponent({
  components: {
    ToolsComponent,
  },

  setup() {
    onMounted(() => {
      document.onselectionchange = () => {
        /*
          FIXME
          this currently always throws an error if an element
          apart from the textarea is selected
        */
        if (
          // check if the current node is the textarea
          document.getSelection()?.anchorNode?.children[1].name === 'textarea'
        ) {
          textSelection.value = document.getSelection().toString()
          console.log(document.getSelection()?.toString())
        }
      }
    })
    onUnmounted(() => {
      document.onselectionchange = null
    })

    // FIXME: make it work in Firefox
    const supportSelection = ref(true)
    const textarea = ref(null)
    const calculateSelection = () => {
      /*
         I can't get this to work but
         it's the only way due this
         (stupid) 20+ year old Firefox bug
         https://bugzilla.mozilla.org/show_bug.cgi?id=85686
      */
      const start = textarea.value.selectionStart
      const end = textarea.value.selectionEnd
      const value = textarea.value.value
      const words = value.substring(start, end)
      textSelection.value = words
    }

    const words = ref(localStorage.getItem('words') || '')
    const stats = computed(() => {
      return {
        characters: words.value.length,
        words: words.value.split(/\S+/g).length - 1,
        sentences: words.value.split(/\s+[^.!?]*[.!?]/).length - 1,
      }
    })

    const textSelection = ref('')
    const selection = computed(() => {
      return {
        characters: textSelection.value.length,
        words: textSelection.value.split(/\S+/g).length - 1,
        sentences: textSelection.value.split(/\s+[^.!?]*[.!?]/).length - 1,
      }
    })

    watch(words, (content) => {
      localStorage.setItem('words', content)
    })

    return {
      selection,
      stats,
      words,
    }
  },
})
</script>
