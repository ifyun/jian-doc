import MarkdownIt, { Token } from "markdown-it"
import _md from "./common.ts"

function isTodo(tokens: Token[], index: number): boolean {
  return (
    tokens[index].type === "inline" &&
    tokens[index - 1].type === "paragraph_open" &&
    tokens[index - 2].type === "list_item_open" &&
    /^\[([ Xx])]/.test(tokens[index].content)
  )
}

export const TodoPlugin = (md: MarkdownIt) => {
  md.core.ruler.after("inline", "todo", (state) => {
    const tokens = state.tokens

    for (let i = 0; i < tokens.length; i++) {
      if (isTodo(tokens, i)) {
        tokens[i].type = "todo"

        if (/^\[([xX])]/.test(tokens[i].content)) {
          tokens[i].info = "checked"
          tokens[i - 2].attrSet("class", "todo-list checked")
        } else if (/^\[ ]/.test(tokens[i].content)) {
          tokens[i].info = "unchecked"
          tokens[i - 2].attrSet("class", "todo-list unchecked")
        }

        tokens[i].content = tokens[i].content.slice(3)
      }
    }
  })

  md.renderer.rules.todo = (tokens: Token[], index: number) => {
    return _md.renderInline(tokens[index].content)
  }
}
