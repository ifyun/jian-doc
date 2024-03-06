import MarkdownIt from "markdown-it"
import { FencePlugin } from "./fence-plugin.ts"
import { HeadingPlugin } from "./heading-plugin.ts"
import { LinkPlugin } from "./link-plugin.ts"
import { MathPlugin } from "./math-plugin.ts"

const md = new MarkdownIt({
  html: true,
  linkify: true,
  highlight: function (str: string, language: string) {
    if (language && window.hljs) {
      try {
        return window.hljs.highlight(str, { language }).value
      } catch {
        return str
      }
    }

    return str
  }
})
  .use(LinkPlugin)
  .use(HeadingPlugin)
  .use(FencePlugin)
  .use(MathPlugin)

export default md
