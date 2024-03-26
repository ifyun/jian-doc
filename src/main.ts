import { throttle } from "lodash"
import app from "./app.html?raw"
import { init } from "./core"
import {
  afterPrint,
  beforePrint,
  hashChange,
  toggleMenu,
  toggleTheme,
  widthChange
} from "./event.ts"
import "./style/global.scss"
import "./style/markdown.scss"

window.$config = window.$config || {}

if (window.location.hash === "") {
  window.location.href = `./#README.md`
}

window.addEventListener("resize", throttle(widthChange, 200))
window.addEventListener("hashchange", hashChange)
window.addEventListener("beforeprint", beforePrint)
window.addEventListener("afterprint", afterPrint)

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#app")!.innerHTML = app
  document.getElementById("menu-btn")?.addEventListener("click", toggleMenu)
  document.getElementById("theme-btn")?.addEventListener("click", toggleTheme)

  init()
})
