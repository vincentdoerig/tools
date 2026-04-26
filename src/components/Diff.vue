<template>
  <ToolsComponent
    title="Diff"
    description="Compare two text snippets or uploaded files with split and unified views."
    meta-description="Compare two versions of a file side by side or in a unified view."
  >
    <div class="space-y-6">
      <div class="grid gap-4 lg:grid-cols-[1fr_auto_1fr]">
        <section
          class="p-4 border rounded-md border-gray-200 dark:border-gray-900 bg-white/80 dark:bg-black/40"
        >
          <div class="flex items-start justify-between gap-4 mb-3">
            <div>
              <p
                class="text-xs font-semibold tracking-[0.2em] uppercase text-gray-600 dark:text-gray-300"
              >
                Original
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ oldFileName || "before" }}
              </p>
            </div>
            <div class="flex items-center gap-2">
              <button
                type="button"
                class="px-3 py-2 text-sm font-medium text-gray-700 transition border border-gray-200 rounded-md hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-900"
                @click="oldFileInput?.click()"
              >
                Upload file
              </button>
              <input
                ref="oldFileInput"
                type="file"
                multiple
                class="sr-only"
                tabindex="-1"
                @change="handleFileInput('old', $event)"
              />
            </div>
          </div>
          <textarea
            v-model="oldText"
            class="w-full min-h-[18rem] p-4 font-mono text-sm leading-6 text-gray-900 border border-gray-200 rounded-md resize-y bg-gray-50 dark:bg-gray-950 dark:text-gray-100 dark:border-gray-800"
            :placeholder="PLACEHOLDER_OLD"
            spellcheck="false"
          ></textarea>
        </section>

        <div
          class="hidden lg:flex items-center justify-center text-gray-400 dark:text-gray-600"
        >
          →
        </div>
        <div
          class="flex lg:hidden items-center justify-center text-gray-400 dark:text-gray-600"
        >
          ↓
        </div>

        <section
          class="relative p-4 border rounded-md border-gray-200 dark:border-gray-900 bg-white/80 dark:bg-black/40"
        >
          <div class="flex items-start justify-between gap-4 mb-3 pr-32">
            <div>
              <p
                class="text-xs font-semibold tracking-[0.2em] uppercase text-gray-600 dark:text-gray-300"
              >
                Modified
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ newFileName || "after" }}
              </p>
            </div>
          </div>
          <textarea
            v-model="newText"
            class="w-full min-h-[18rem] p-4 font-mono text-sm leading-6 text-gray-900 border border-gray-200 rounded-md resize-y bg-gray-50 dark:bg-gray-950 dark:text-gray-100 dark:border-gray-800"
            :placeholder="PLACEHOLDER_NEW"
            spellcheck="false"
          ></textarea>
          <div class="absolute top-4 right-4 flex items-center gap-2">
            <button
              type="button"
              class="px-3 py-2 text-sm font-medium text-gray-700 transition border border-gray-200 rounded-md hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-900"
              @click="newFileInput?.click()"
            >
              Upload file
            </button>
            <input
              ref="newFileInput"
              type="file"
              class="sr-only"
              tabindex="-1"
              @change="handleFileInput('new', $event)"
            />
          </div>
        </section>
      </div>

      <section v-show="showDiff" class="relative">
        <div class="absolute -right-10 top-0 h-full">
          <div class="sticky top-2 flex flex-col z-20">
            <button
              v-for="option in layoutOptions"
              :key="option.value"
              type="button"
              class="p-2 text-sm font-medium rounded-sm transition cursor-pointer"
              :class="
                diffStyle === option.value
                  ? 'bg-gray-900 text-white shadow-sm dark:bg-white dark:text-gray-900'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
              "
              @click="diffStyle = option.value"
            >
              <span v-html="option.svg"></span>
            </button>
          </div>
        </div>

        <div
          v-if="renderError"
          class="p-4 mb-4 text-sm text-rose-700 border border-rose-200 rounded-md bg-rose-50 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200"
        >
          {{ renderError }}
        </div>

        <div
          ref="diffContainer"
          class="border rounded-md border-gray-200 dark:border-gray-900 [&>diffs-container]:rounded-t-md"
        />
      </section>
    </div>
  </ToolsComponent>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";
import {
  FileDiff,
  getFiletypeFromFileName,
  parseDiffFromFile,
  preloadHighlighter,
  type FileContents,
  type FileDiffMetadata,
} from "@pierre/diffs";

import ToolsComponent from "./ToolsComponent.vue";

type DiffStyle = "split" | "unified";
type FileSide = "old" | "new";

const PLACEHOLDER_OLD = `function greet(name) {
  console.log("Hello, " + name);
  return "Hello, " + name;
}

function add(a, b) {
  return a + b;
}
`;

const PLACEHOLDER_NEW = `function greet(name, greeting = "Hello") {
  const message = \`\${greeting}, \${name}!\`;
  console.log(message);
  return message;
}

function add(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
`;

const layoutOptions: { value: DiffStyle; label: string; svg: string }[] = [
  {
    value: "split",
    label: "Split",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M12 3v18"/><path d="m16 16 4-4-4-4"/><path d="m8 8-4 4 4 4"/></svg>`,
  },
  {
    value: "unified",
    label: "Unified",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m16 16-4 4-4-4"/><path d="M3 12h18"/><path d="m8 8 4-4 4 4"/></svg>`,
  },
];

const readFileAsText = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(String(event.target?.result ?? ""));
    };
    reader.onerror = () => {
      reject(reader.error ?? new Error("Failed to read file"));
    };
    reader.readAsText(file);
  });

export default defineComponent({
  components: {
    ToolsComponent,
  },

  setup() {
    const diffStyle = ref<DiffStyle>("split");
    const isDarkMode = ref(document.documentElement.classList.contains("dark"));
    const theme = computed(() =>
      isDarkMode.value ? "pierre-dark" : "pierre-light",
    );

    const oldText = ref("");
    const newText = ref("");
    const oldFileName = ref("before");
    const newFileName = ref("after");
    const showDiff = ref(false);
    const renderError = ref("");
    const fileDiff = ref<FileDiffMetadata | null>(null);

    const oldFileInput = ref<HTMLInputElement | null>(null);
    const newFileInput = ref<HTMLInputElement | null>(null);
    const diffContainer = ref<HTMLElement | null>(null);
    const diffInstance = ref<FileDiff | null>(null);
    let darkModeObserver: MutationObserver | null = null;

    const oldFile = computed<FileContents>(() => ({
      name: oldFileName.value,
      contents: oldText.value,
    }));

    const newFile = computed<FileContents>(() => ({
      name: newFileName.value,
      contents: newText.value,
    }));

    const additionsCount = computed(
      () =>
        fileDiff.value?.hunks.reduce(
          (total, hunk) => total + hunk.additionLines,
          0,
        ) ?? 0,
    );
    const deletionsCount = computed(
      () =>
        fileDiff.value?.hunks.reduce(
          (total, hunk) => total + hunk.deletionLines,
          0,
        ) ?? 0,
    );

    const canDiff = computed(
      () => oldText.value.trim() !== "" || newText.value.trim() !== "",
    );

    const loadFile = async (side: FileSide, file: File) => {
      const contents = await readFileAsText(file);

      if (side === "old") {
        oldFileName.value = file.name;
        oldText.value = contents;
      } else {
        newFileName.value = file.name;
        newText.value = contents;
      }

      renderError.value = "";
    };

    const loadFilePair = async (firstFile: File, secondFile: File) => {
      const [firstContents, secondContents] = await Promise.all([
        readFileAsText(firstFile),
        readFileAsText(secondFile),
      ]);

      oldFileName.value = firstFile.name;
      oldText.value = firstContents;
      newFileName.value = secondFile.name;
      newText.value = secondContents;
      renderError.value = "";
    };

    const handleFileInput = (side: FileSide, event: Event) => {
      const target = event.target as HTMLInputElement | null;
      const files = target?.files;

      if (files == null || files.length === 0) return;

      if (side === "old" && files.length >= 2) {
        const firstFile = files[0];
        const secondFile = files[1];
        if (firstFile != null && secondFile != null) {
          void loadFilePair(firstFile, secondFile);
          if (target != null) {
            target.value = "";
          }
          return;
        }
      }

      const file = files[0];
      if (file != null) {
        void loadFile(side, file);
      }

      if (target != null) {
        target.value = "";
      }
    };

    const preloadForCurrentFiles = async () => {
      const langs = [
        getFiletypeFromFileName(oldFileName.value),
        getFiletypeFromFileName(newFileName.value),
      ].filter((lang): lang is string => lang != null);

      if (langs.length === 0) return;

      await preloadHighlighter({
        themes: ["pierre-dark", "pierre-light"],
        langs: [...new Set(langs)],
      });
    };

    const renderDiff = async () => {
      if (!canDiff.value) {
        showDiff.value = false;
        fileDiff.value = null;
        renderError.value = "";
        if (diffContainer.value != null) {
          diffContainer.value.innerHTML = "";
        }
        return;
      }

      showDiff.value = true;
      if (!diffContainer.value) return;

      try {
        await preloadForCurrentFiles();

        const parsedDiff = parseDiffFromFile(oldFile.value, newFile.value);
        fileDiff.value = parsedDiff;

        if (!diffInstance.value) {
          diffInstance.value = new FileDiff();
        }

        diffInstance.value.setOptions({
          theme: theme.value,
          diffStyle: diffStyle.value,
          diffIndicators: "bars", // 'classic' | 'bars' | 'none'
          lineDiffType: "word",
          hunkSeparators: "line-info",
          unsafeCSS: `
            [data-diffs-header] {
              position: sticky;
              top: 0;
              border-top-left-radius: var(--radius-md);
              border-top-right-radius: var(--radius-md);
            }
          `,
        });

        diffInstance.value.render({
          fileDiff: parsedDiff,
          containerWrapper: diffContainer.value,
          forceRender: true,
        });

        renderError.value = "";
      } catch (error) {
        console.error(error);
        fileDiff.value = null;
        showDiff.value = true;
        renderError.value = "Could not compute diff. Please check your inputs.";
      }
    };

    watch(
      [oldText, newText, oldFileName, newFileName, diffStyle, theme],
      () => {
        void renderDiff();
      },
      { immediate: true },
    );

    onMounted(() => {
      darkModeObserver = new MutationObserver(() => {
        isDarkMode.value = document.documentElement.classList.contains("dark");
      });

      darkModeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
    });

    onBeforeUnmount(() => {
      darkModeObserver?.disconnect();
      diffInstance.value?.cleanUp();
    });

    return {
      PLACEHOLDER_OLD,
      PLACEHOLDER_NEW,
      additionsCount,
      canDiff,
      deletionsCount,
      diffContainer,
      diffStyle,
      handleFileInput,
      layoutOptions,
      newFileInput,
      newFileName,
      newText,
      oldFileInput,
      oldFileName,
      oldText,
      renderError,
      showDiff,
      theme,
    };
  },
});
</script>
