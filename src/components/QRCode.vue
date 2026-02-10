<template>
  <ToolsComponent
    title="QR Code Generator"
    meta-description="Generate a QR code from any text or URL. Simply enter the text you want to encode and click the button to generate your QR code."
  >
    <div
      class="flex flex-col flex-wrap justify-between w-full md:flex-row gap-4"
    >
      <div class="w-full mb-10 md:w-2/5">
        <div>
          <label
            for="text"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Text or URL</label
          >
          <textarea
            v-model="content"
            rows="3"
            class="block w-full p-2 mb-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter the text or URL you want to encode as a QR code"
          ></textarea>
          <div v-if="content" class="flex items-center gap-4">
            <div>
              <input
                v-model="showContent"
                id="show-content"
                name="show-content"
                type="checkbox"
                class="appearance-none rounded-sm border border-gray-300 bg-white checked:border-blue-600 checked:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
              />
              <label
                for="show-content"
                class="text-sm font-medium text-gray-900 dark:text-gray-200"
              >
                Show content
              </label>
            </div>
            <button
              type="button"
              @click="save"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Save as PNG
            </button>
            <button
              type="button"
              @click="saveWithContent"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Save with content
            </button>
          </div>
        </div>
      </div>
      <div class="flex-1">
        <div
          v-if="content"
          ref="qrContainer"
          class="flex flex-col items-center"
        >
          <QrcodeVue :value="content" :size="256" render-as="svg" />
          <div
            v-if="showContent"
            class="mt-6 text-xl font-mono text-blue-900 dark:text-blue-50 whitespace-pre-wrap text-center max-w-lg"
          >
            {{ content }}
          </div>
        </div>
      </div>
    </div>
  </ToolsComponent>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import QrcodeVue from "qrcode.vue";
import { domToPng } from "modern-screenshot";

import ToolsComponent from "./ToolsComponent.vue";

export default defineComponent({
  components: {
    ToolsComponent,
    QrcodeVue,
  },

  setup() {
    const content = ref("");
    const showContent = ref(true);
    const qrContainer = ref<HTMLDivElement | null>(null);

    const save = async () => {
      if (!qrContainer.value) return;
      const svg = qrContainer.value.querySelector(
        "svg",
      ) as SVGSVGElement | null;
      if (!svg) return;
      const dataUrl = await domToPng(svg as unknown as HTMLElement, {
        backgroundColor: "#ffffff",
        scale: 4,
      });
      const link = document.createElement("a");
      link.download = "qr-code.png";
      link.href = dataUrl;
      link.click();
    };

    const saveWithContent = async () => {
      if (!qrContainer.value) return;
      const originalShowContent = showContent.value;
      showContent.value = true;
      const dataUrl = await domToPng(qrContainer.value, {
        backgroundColor: "#ffffff",
        scale: 4,
        style: {
          padding: "16px 0",
        },
      });
      const link = document.createElement("a");
      link.download = "qr-code-with-content.png";
      link.href = dataUrl;
      link.click();
      showContent.value = originalShowContent;
    };

    return {
      qrContainer,
      showContent,
      content,
      save,
      saveWithContent,
    };
  },
});
</script>
