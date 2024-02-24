import app from "./app.html?raw"
import { init, renderContent } from "./core"
import "./style/global.scss"
import "./style/markdown.scss"

window.location.href = "/#"

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#app")!.innerHTML = app
  init()
})

window.addEventListener("hashchange", (e) => {
  const oldDoc = e.oldURL.split("#")[1].split("?")[0]
  const url = e.newURL.split("#")[1]
  const docAndId = url.split("?id=")

  if (oldDoc !== docAndId[0] && docAndId[0].trim().length > 0) {
    renderContent(docAndId[0])
  } else {
    // Same document, scroll to anchor
    const anchor = document.getElementById(decodeURI(docAndId[1]))
    anchor?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start"
    })
  }
})
