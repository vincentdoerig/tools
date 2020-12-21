<template>
  <ToolsComponent
    title="About"
    meta-description="About tools.doerig.dev, a site with many useful online tools."
  >
    <div class="prose dark:prose-dark">
      <p>
        Hey there, this website is a collection of online tools I need and use. All tools are made by myself. I aim to create a non-intrusive experience, without annoying ads or cookie banners.
      </p>
      <p>
        This project is open source, the <a
          href="https://github.com/vincentdoerig/tools"
          target="_blank"
        >source code</a> is available and accessible on GitHub. If you have any suggestion for a missing tool I could build or want to submit one yourself, feel free to open an issue or a pull request.
      </p>
      <p>
        If you like this project, you may support me on <a
          href="https://ko-fi.com/vincentdoerig"
          target="_blank"
          rel="noopener noreferrer"
        >Ko-fi</a>, share the website with anyone you think would enjoy or give me a star on <a
          href="https://github.com/vincentdoerig/tools"
          target="_blank"
        >GitHub</a>. Cheers!
      </p>
      <p>
        <a
          href="https://ko-fi.com/P5P01ZU77"
          target="_blank"
        ><img
          class="h-9"
          src="../assets/ko-fi.png"
          alt="Buy Me a Coffee at ko-fi.com"
        ></a>
      </p>
    </div>
  </ToolsComponent>
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
