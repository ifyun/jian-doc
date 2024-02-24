/// <reference types="vite/client" />

declare interface Window {
  $config: {
    prefix: string
    logo: string
    name: string
  }

  hljs: any
  katex: any
}
