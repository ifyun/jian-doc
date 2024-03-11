import MarkdownIt, { Token } from "markdown-it"
import StateBlock from "markdown-it/lib/rules_block/state_block"
import { RuleBlock } from "markdown-it/lib/parser_block"
import note from "../icons/note.svg?raw"
import tips from "../icons/tips.svg?raw"
import important from "../icons/important.svg?raw"
import warning from "../icons/warning.svg?raw"
import caution from "../icons/caution.svg?raw"
import _md from "./common.ts"

const RuleAlert: RuleBlock = (
  state: StateBlock,
  startLine: number,
  endLine: number,
  silent: boolean
) => {
  let pos = state.bMarks[startLine] + state.tShift[startLine]
  let max = state.eMarks[startLine]

  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false
  }

  if (pos + 3 > max) {
    return false
  }

  const marker = state.src.charCodeAt(pos)

  if (marker !== 0x3a /* : */) {
    return false
  }

  let mem = pos
  pos = state.skipChars(pos, marker)

  let len = pos - mem

  if (len < 3) {
    return false
  }

  const markup = state.src.slice(mem, pos)
  const params = state.src.slice(pos, max)

  if (marker === 0x3a /* : */) {
    if (params.indexOf(String.fromCharCode(marker)) >= 0) {
      return false
    }
  }

  if (silent) {
    return true
  }

  let nextLine = startLine
  let haveEndMarker = false

  for (;;) {
    nextLine++
    if (nextLine >= endLine) {
      break
    }

    pos = mem = state.bMarks[nextLine] + state.tShift[nextLine]
    max = state.eMarks[nextLine]

    if (pos < max && state.sCount[nextLine] < state.blkIndent) {
      break
    }

    if (state.src.charCodeAt(pos) !== marker) {
      continue
    }

    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      continue
    }

    pos = state.skipChars(pos, marker)

    if (pos - mem < len) {
      continue
    }

    pos = state.skipSpaces(pos)

    if (pos < max) {
      continue
    }

    haveEndMarker = true
    break
  }

  len = state.sCount[startLine]

  state.line = nextLine + (haveEndMarker ? 1 : 0)

  const token = state.push("alert", "div", 0)
  token.info = params
  token.content = state.getLines(startLine + 1, nextLine, len, true)
  token.markup = markup
  token.map = [startLine, state.line]

  return true
}

export const AlertPlugin = (md: MarkdownIt) => {
  md.block.ruler.after("fence", "alert", RuleAlert, {
    alt: ["paragraph", "reference", "blockquote", "list"]
  })

  md.renderer.rules.alert = (tokens: Token[], index: number) => {
    const info = tokens[index].info.toLowerCase()
    const content = tokens[index].content
    let icon = ""

    if (info === "note") {
      icon = note
    } else if (info === "tips") {
      icon = tips
    } else if (info === "important") {
      icon = important
    } else if (info === "warning") {
      icon = warning
    } else if (info === "caution") {
      icon = caution
    }

    return (
      `<div class="alert ${info}">` +
      `<p class="title">${icon}${info}</p>` +
      `<p class="content">${_md.renderInline(content)}</p>` +
      `</div>`
    )
  }
}
