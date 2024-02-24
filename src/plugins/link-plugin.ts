import MarkdownIt, { Token } from "markdown-it"
import Renderer from "markdown-it/lib/renderer"

export const LinkPlugin = (md: MarkdownIt) => {
  // Use hash url for link
  md.renderer.rules.link_open = (
    tokens: Token[],
    index: number,
    options: MarkdownIt.Options,
    _,
    slf: Renderer
  ): string => {
    // link_open's next element is content
    const title = tokens[index + 1].content
    const href = tokens[index].attrGet("href")!

    if (href.startsWith(".")) {
      tokens[index].attrSet("title", title)
      tokens[index].attrSet("href", href.replace(".", "#"))
    }

    return slf.renderToken(tokens, index, options)
  }
}
