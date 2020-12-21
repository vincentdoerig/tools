<template>
  <ToolsComponent
    title="Date"
    description="All the dates."
    meta-description="The current date in different time formats like UTC, ISO or as readable text."
  >
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="copySuccess"
        class="absolute p-4 border border-green-600 rounded-md top-4 right-4 bg-green-50"
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <!-- Heroicon name: check-circle -->
            <svg
              class="w-5 h-5 text-green-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-green-800">
              Copied
            </p>
          </div>
        </div>
      </div>
    </transition>

    <button
      type="button"
      class="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      @click="refresh"
    >
      Refresh dates
    </button>
    <div class="prose max-w-none dark:prose-dark">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="date in dates"
            :key="date.title"
          >
            <td>{{ date.title }}</td>
            <td
              class="tabular-nums"
            >
              {{ date.value }}
            </td>
            <td>
              <button
                v-clipboard="date.value"
                v-clipboard:success="onSuccess"
                type="button"
                class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Copy
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </ToolsComponent>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'

dayjs.extend(weekOfYear)

import ToolsComponent from './ToolsComponent.vue'

export default defineComponent({
  components: {
    ToolsComponent,
  },
  setup() {
    const today = ref<Date>(new Date())
    const refresh = () => {
      today.value = new Date()
    }

    const dates = computed(() => {
      return {
        locale: {
          title: 'Locale String',
          value: today.value.toLocaleDateString(),
        },
        british: {
          title: 'String (GB)',
          // Friday, 27 November 2020
          value: dayjs().format('dddd, D MMMM YYYY'),
        },
        american: {
          title: 'String (US)',
          // Friday, November 27, 2020
          value: dayjs().format('dddd, MMMM D, YYYY'),
        },
        week: {
          title: 'Week of Year',
          value: dayjs().week(),
        },
        timezone: {
          title: 'Timezone',
          value: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
         iso: {
          title: 'ISO',
          value: today.value.toISOString(),
        },
        now: {
          title: 'ISO8601',
          value: dayjs().format(),
        },
        utc: {
          title: 'UTC',
          value: today.value.toUTCString(),
        },
      }
    })

    const copySuccess = ref<boolean>(false)
    const onSuccess = () => {
      copySuccess.value = true
      setTimeout(() => {
        copySuccess.value = false
      }, 2000)
    }

    return { today, dates, refresh, onSuccess, copySuccess }
  },
})
</script>
