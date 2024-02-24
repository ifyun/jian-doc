import StateBlock from "markdown-it/lib/rules_block/state_block"
import MarkdownIt, { Token } from "markdown-it"
import Renderer from "markdown-it/lib/renderer"
import { RuleBlock } from "markdown-it/lib/parser_block"

const math_block: RuleBlock = (
  state: StateBlock,
  start: number,
  end: number,
  silent: boolean
): boolean => {
  let firstLine: string = "",
    lastLine: string = "",
    next: number,
    lastPos: number,
    found = false,
    token: Token,
    pos = state.bMarks[start] + state.tShift[start],
    max = state.eMarks[start]

  // Less than 2 characters
  if (pos + 2 > max) {
    return false
  }

  // Not start with "$$"
  if (state.src.slice(pos, pos + 2) !== "$$") {
    return false
  }

  pos += 2
  firstLine = state.src.slice(pos, max)

  if (silent) {
    return true
  }

  if (firstLine.trim().slice(-2) === "$$") {
    firstLine = firstLine.trim().slice(0, -2)
    found = true
  }

  for (next = start; !found; ) {
    next += 1

    if (next >= end) {
      break
    }

    pos = state.bMarks[next] + state.tShift[next]
    max = state.eMarks[next]

    if (pos < max && state.tShift[next] < state.blkIndent) {
      break
    }

    if (state.src.slice(pos, max).trim().slice(-2) === "$$") {
      lastPos = state.src.slice(0, max).lastIndexOf("$$")
      lastLine = state.src.slice(pos, lastPos)
      found = true
    }
  }

  state.line = next + 1

  token = state.push("math_block", "math", 0)
  token.block = true
  token.content =
    (firstLine && firstLine.trim() ? firstLine + "\n" : "") +
    state.getLines(start + 1, next, state.tShift[start], true) +
    (lastLine && lastLine.trim() ? lastLine : "")
  token.map = [start, state.line]
  token.markup = "$$"

  return true
}

export const MathPlugin = (md: MarkdownIt) => {
  if (window.katex) {
    const defaultRender = md.renderer.rules.text!.bind(md.renderer.rules)

    md.block.ruler.after("blockquote", "math_block", math_block, {
      alt: ["paragraph", "reference", "blockquote", "list"]
    })

    md.renderer.rules.math_block = (tokens: Token[], index: number) => {
      const content = tokens[index].content

      try {
        return `<p>${window.katex.renderToString(content, { displayMode: true })}</p>`
      } catch {
        return content
      }
    }

    // Inline math, eg: $E=mc^2$
    md.renderer.rules.text = (
      tokens: Token[],
      index: number,
      options: MarkdownIt.Options,
      env: any,
      slf: Renderer
    ) => {
      let content = tokens[index].content as string
      const matchInline = content.match(/\$+([^$\n]+?)\$+/g)

      if (matchInline) {
        try {
          matchInline.forEach((value) => {
            const katexElement = window.katex.renderToString(
              value.substring(1, value.length - 1)
            )
            content = content.replace(value, katexElement)
          })

          return content
        } catch {
          return content
        }
      }

      return defaultRender(tokens, index, options, env, slf)
    }
  }
}
