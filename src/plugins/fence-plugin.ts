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

    if (info === "mermaid") {
      return `<pre class="mermaid">${content}</pre>`
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
        `<pre>` +
        `<div class="code-title"><span class="language-name" data-lang="${info}"></span></div>` +
        `<div class="code-content">` +
        `<div class="gutter">${html}</div>` +
        `<code class="hljs">${content}</code>` +
        `</div>` +
        `</pre>`
      )
    }

    return `<pre><code>${content}</code></pre>`
  }
}
