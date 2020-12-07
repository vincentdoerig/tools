<template>
  <div>
    <label
      for="search"
      class="block text-sm font-medium text-gray-700"
    >Search</label>
    <div class="mt-1">
      <input
        id="search"
        v-model="searchTerm"
        type="search"
        name="search"
        class="block w-full max-w-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder="Find arrows..."
        autocomplete="off"
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import Fuse from 'fuse.js'

export default defineComponent({

  props: {
    toSearch: {
      type: Array,
      default: () => [],
    },
    searchKeys: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['results-change'],
  setup(props, { emit }) {
    const fuse = new Fuse(props.toSearch, {
      keys: props.searchKeys,
    })

    const searchTerm = ref('')
    const results = ref([])

    watch(searchTerm, () => {
      if(!searchTerm.value) {
        results.value = props.toSearch
        emit('results-change', props.toSearch)
        return
      }
      const searchResults = fuse.search(searchTerm.value)
      results.value = searchResults
      emit('results-change', searchResults)
    })

    return { results, searchTerm }
  },
})
</script>
