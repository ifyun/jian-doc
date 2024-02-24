import MarkdownIt from "markdown-it"
import { MathPlugin } from "./math-plugin.ts"
import { FencePlugin } from "./fence-plugin.ts"
import { HeadingPlugin } from "./heading-plugin.ts"
import { LinkPlugin } from "./link-plugin.ts"

const md = new MarkdownIt({
  html: true,
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
