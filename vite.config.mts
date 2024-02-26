import { defineConfig, Plugin } from "vite"
import fs from "node:fs"

/**
 * Replace script tag of "index.html"
 */
function transformIndex(file: string) {
  const plugin: Plugin = {
    name: "transformIndex",
    async buildStart() {
      this.addWatchFile(file)
    },
    async buildEnd() {
      this.emitFile({
        type: "asset",
        fileName: file,
        source: fs
          .readFileSync(file)
          .toString()
          .replace(
            `<script type="module" src="/src/main.ts"></script>`,
            `<script src="jian-doc.umd.js"></script>`
          )
      })
    }
  }

  return plugin
}

export default defineConfig({
  appType: "mpa",
  build: {
    lib: {
      name: "jiandoc",
      entry: "src/main.ts",
      formats: ["umd"]
    },
    cssCodeSplit: true,
    rollupOptions: {
      input: "index.html",
      plugins: [transformIndex("index.html")]
    }
  }
})
