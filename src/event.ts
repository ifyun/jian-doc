import { renderContent } from "./core.ts"

import darkMode from "./icons/dark-mode.svg?raw"
import lightMode from "./icons/light-mode.svg?raw"

export function initUI() {
  const colorScheme = window.localStorage.getItem("color-scheme")

  if (colorScheme === "dark") {
    document.documentElement.setAttribute("color-scheme", colorScheme)
    document.getElementById("theme-btn")!.innerHTML = lightMode
  } else {
    document.getElementById("theme-btn")!.innerHTML = darkMode
  }

  if (window.$config.logoRound) {
    document.getElementById("logo")!.style.borderRadius = "50%"
  }

  document.getElementById("logo")?.setAttribute("src", window.$config.logo)
  document.getElementById("name")!.innerHTML = window.$config.name ?? ""
}

export function toggleMenu() {
  const side = document.getElementById("side")

  if (side?.style.display === "none") {
    side?.style.removeProperty("display")
    document.getElementById("main")?.style.setProperty("flex-shrink", "0")
  } else {
    side?.style.setProperty("display", "none")
    document.getElementById("main")?.style.removeProperty("flex-shrink")
  }
}

export function toggleTheme() {
  const root = document.documentElement
  const colorScheme = root.getAttribute("color-scheme") == "dark" ? "" : "dark"
  const themeButton = document.getElementById("theme-btn")

  root.setAttribute("color-scheme", colorScheme)
  window.localStorage.setItem("color-scheme", colorScheme)

  if (colorScheme === "dark") {
    themeButton!.innerHTML = lightMode
  } else {
    themeButton!.innerHTML = darkMode
  }

  if (document.querySelector(".mermaid")) {
    // Rerender for mermaid
    renderContent(window.location.hash.split("#")[1], true)
  }
}

function menuActive(data: { doc?: string; id?: string }) {
  document.querySelectorAll("#menu ul a")?.forEach((e) => {
    e.classList.remove("active")
  })

  document.querySelectorAll(`#nav ul a`)?.forEach((e) => {
    e.classList.remove("active")
  })

  if (data.doc) {
    document
      .querySelector(`#menu ul a[data-doc="${data.doc}"]`)
      ?.classList.add("active")
  }

  if (data.id) {
    document
      .querySelector(`#menu ul a[data-title="${data.id}"]`)
      ?.classList.add("active")
    document
      .querySelector(`#nav ul a[data-title="${data.id}"]`)
      ?.classList.add("active")
  }
}

export function widthChange() {
  document.getElementById("main")?.style.removeProperty("flex-shrink")

  if (window.innerWidth <= 960) {
    document.getElementById("side")?.style.setProperty("display", "none")
  } else {
    document.getElementById("side")?.style.removeProperty("display")
  }
}

export function hashChange(e: HashChangeEvent) {
  const oldDoc = e.oldURL.split("#")[1]?.split("?")[0]
  const url = e.newURL.split("#")[1]
  const docAndId = url.split("?id=")

  if (oldDoc !== docAndId[0] && docAndId[0].trim().length > 0) {
    menuActive({ doc: docAndId[0] })
    renderContent(docAndId[0])
  } else {
    const id = decodeURI(docAndId[1])
    const anchor = document.getElementById(id)

    if (anchor) {
      const marginTop = getComputedStyle(anchor)["marginTop"]

      document.getElementById("content")!.scrollTop =
        anchor.offsetTop -
        (anchor.parentNode as HTMLElement).offsetTop +
        parseInt(marginTop)
    }

    menuActive({ doc: docAndId[0], id })
  }
}
