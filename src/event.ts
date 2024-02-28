import { renderContent } from "./core.ts"

import lightMode from "./icons/light-mode.svg?raw"
import darkMode from "./icons/dark-mode.svg?raw"

export function initUI() {
  const colorScheme = window.localStorage.getItem("color-scheme")

  if (colorScheme === "dark") {
    document.documentElement.setAttribute("color-scheme", colorScheme)
    document.getElementById("theme-btn")!.innerHTML = darkMode
  } else {
    document.getElementById("theme-btn")!.innerHTML = lightMode
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
    side?.style.setProperty("display", "flex")
  } else {
    side?.style.setProperty("display", "none")
  }
}

export function toggleTheme() {
  const themeButton = document.getElementById("theme-btn")
  const root = document.documentElement
  const colorScheme = root.getAttribute("color-scheme") == "dark" ? "" : "dark"
  root.setAttribute("color-scheme", colorScheme)
  window.localStorage.setItem("color-scheme", colorScheme)

  if (colorScheme === "dark") {
    themeButton!.innerHTML = darkMode
  } else {
    themeButton!.innerHTML = lightMode
  }
}

export function menuActive(data: { doc?: string; id?: string }) {
  document.querySelectorAll("#menu ul a")?.forEach((e) => {
    e.classList.remove("active")
  })

  if (data.doc) {
    document
      .querySelector(`#menu ul a[data-doc="${data.doc}"]`)
      ?.classList.add("active")
  } else if (data.id) {
    document
      .querySelector(`#menu ul a[data-title="${data.id}"]`)
      ?.classList.add("active")
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
      document.getElementById("content")!.scrollTop =
        anchor.offsetTop - (anchor.parentNode as HTMLElement).offsetTop
    }

    menuActive({ id })
  }
}
