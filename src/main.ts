import { throttle } from "lodash"
import app from "./app.html?raw"
import { init } from "./core"
import { hashChange, toggleMenu, toggleTheme, widthChange } from "./event.ts"
import "./style/global.scss"
import "./style/markdown.scss"

window.location.href = `./#`
window.$config = window.$config || {}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#app")!.innerHTML = app
  document.getElementById("menu-btn")?.addEventListener("click", toggleMenu)
  document.getElementById("theme-btn")?.addEventListener("click", toggleTheme)
  window.addEventListener("resize", throttle(widthChange, 200))
  widthChange()
  init()
})

window.addEventListener("hashchange", hashChange)
