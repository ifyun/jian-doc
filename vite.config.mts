import { defineConfig } from "vite"

export default defineConfig({
  appType: "mpa",
  build: {
    lib: {
      name: "jiandoc",
      entry: "src/main.ts",
      formats: ["umd"]
    },
    cssCodeSplit: true
  }
})
