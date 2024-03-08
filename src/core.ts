import { changeTitle, hashChange, initUI } from "./event.ts"
import md from "./plugins"

/**
 * Request markdown file
 */
function getDoc(docPath: string): Promise<string> {
  const prefix = window.$config.prefix
  if (prefix && prefix.trim().length > 0) {
    if (docPath.startsWith(".")) {
      docPath = docPath.replace(".", prefix)
    } else {
      docPath = prefix + "/" + docPath
    }
  }

  return new Promise<string>((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", `./${docPath}`)
    xhr.send()
    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          resolve(this.responseText)
        } else {
          reject(this.statusText)
        }
      }
    }
  })
}

function renderMenuByREADME(menu: Element) {
  getDoc("README.md")
    .then((val) => {
      const ast = md.parse(val, {})

      let menuContent = ""
      let space = ""

      for (let i = 0; i < ast.length; i++) {
        if (ast[i].type === "heading_open") {
          if (ast[i].tag === "h1" || ast[i].tag >= "h4") {
            continue
          }

          if (ast[i].tag === "h2") {
            space = ""
          }

          if (ast[i].tag === "h3") {
            space = "  "
          }

          const title = ast[i + 1].content
          menuContent += `${space}- [${title}](README.md?id=${encodeURI(title)})\n`
        }
      }

      menu.innerHTML = md.render(menuContent)
      window.location.replace("./#README.md")
    })
    .catch((err) => {
      menu.innerHTML = err
    })
}

function renderNav(doc: string) {
  const nav = document.getElementById("nav")
  const content = document.querySelector(".markdown-body")
  let navContent = ""
  let space = ""

  content?.querySelectorAll("h2,h3,h4")?.forEach((e) => {
    if (e.tagName === "H2") {
      space = ""
    } else if (e.tagName === "H3") {
      space = "  "
    } else if (e.tagName === "H4") {
      space = "    "
    }

    navContent += `${space}- [${e.innerHTML}](${doc}?id=${encodeURI(e.getAttribute("id")!)})\n`
  })

  nav!.innerHTML = md.render(navContent)
}

/**
 * Generate menu from menu.md
 */
function renderMenu() {
  const menu = document.querySelector("#menu")!

  getDoc("@menu.md")
    .then((val) => {
      menu.innerHTML = md.render(val)
      hashChange(
        new HashChangeEvent("hashchange", {
          newURL: window.location.hash,
          oldURL: ""
        })
      )
    })
    .catch(() => {
      // No menu.md, read README.md
      renderMenuByREADME(menu)
    })
}

export function renderContent(path: string, rerender: boolean = false) {
  const colorScheme = window.localStorage.getItem("color-scheme")
  const markdown = document.querySelector("#content .markdown-body")!

  getDoc(path)
    .then((val) => {
      markdown.innerHTML = md.render(val)

      if (!rerender) {
        changeTitle()
        renderNav(path)
      }

      if (window.mermaid) {
        window.mermaid.initialize({
          startOnLoad: false,
          theme: colorScheme ? "dark" : "base",
          themeVariables: {
            // Only working for "base"
            primaryColor: "#f2f5fd"
          }
        })

        window.mermaid.run()
      }
    })
    .catch((err) => {
      markdown.innerHTML = err
    })
}

export function init() {
  initUI()
  renderMenu()
}
