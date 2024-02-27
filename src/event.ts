import { renderContent } from "./core.ts"

export function toggleMenu() {
  const side = document.getElementById("side")
  if (side?.style.display === "none") {
    side?.style.setProperty("display", "flex")
  } else {
    side?.style.setProperty("display", "none")
  }
}

export function toggleTheme(this: HTMLInputElement) {
  const root = document.documentElement
  const colorScheme = this.checked ? "dark" : ""
  root.setAttribute("color-scheme", colorScheme)
  window.localStorage.setItem("color-scheme", colorScheme)
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
      .querySelector(`#menu ul a[title="${data.id}"]`)
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
      console.log(anchor.offsetTop)
      document.getElementById("content")!.scrollTop =
        anchor.offsetTop - (anchor.parentNode as HTMLElement).offsetTop
    }

    menuActive({ id })
  }
}
