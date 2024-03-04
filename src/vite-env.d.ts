/// <reference types="vite/client" />

declare interface Window {
  $config: {
    prefix: string
    logo: string
    logoRound: boolean
    name: string
  }

  hljs: any
  katex: any
  mermaid: any
}
