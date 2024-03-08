import MarkdownIt, { Token } from "markdown-it"
import Renderer from "markdown-it/lib/renderer"

export const ImgPlugin = (md: MarkdownIt) => {
  md.renderer.rules.image = (
    tokens: Token[],
    index: number,
    options: MarkdownIt.Options,
    _,
    slf: Renderer
  ): string => {
    const alt = tokens[index].content
    const src = tokens[index].attrGet("src")

    if (!src?.startsWith("http://") && !src?.startsWith("https://")) {
      const hash = window.location.hash.split("#")
      let prefix = [window.$config.prefix]

      if (hash.length > 1) {
        const paths = hash[1].split("/")
        paths.pop()
        prefix.push(...paths)
      }

      tokens[index].attrSet("alt", alt)
      tokens[index].attrSet("src", `${prefix.join("/")}/${src}`)
    }

    return slf.renderToken(tokens, index, options)
  }
}
