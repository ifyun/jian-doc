import MarkdownIt, { Token } from "markdown-it"
import Renderer from "markdown-it/lib/renderer"

export const HeadingPlugin = (md: MarkdownIt) => {
  // Set id for heading
  md.renderer.rules.heading_open = (
    tokens: Token[],
    index: number,
    options: MarkdownIt.Options,
    _,
    slf: Renderer
  ): string => {
    const title = tokens[index + 1].content
    tokens[index].attrSet("id", title)
    return slf.renderToken(tokens, index, options)
  }
}
