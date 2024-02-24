import MarkdownIt, { Token } from "markdown-it"

export const FencePlugin = (md: MarkdownIt) => {
  // Rules for fence
  md.renderer.rules.fence = (
    tokens: Token[],
    index: number,
    options: MarkdownIt.Options
  ): string => {
    let content = tokens[index].content
    let info = tokens[index].info

    if (info.trim() === "") {
      info = "text"
    }

    // Render code and line number
    if (options.highlight) {
      content = options.highlight(content, info, "")
      const lines = content.split("\n").length - 1
      let html = ""

      for (let i = 0; i < lines; i += 1) {
        html += `<span class="line-number" data-line="${i + 1}"></span>`
      }

      return (
        `<pre class="hljs" data-lang="${info}">` +
        `<pre class="gutter">${html}</pre>` +
        `<code>${content}</code></pre>`
      )
    }

    return `<pre><code>${content}</code></pre>`
  }
}
