import md from "./plugins"

window.$config = window.$config || {}

function initUI() {
  const colorScheme = window.localStorage.getItem("color-scheme")

  if (colorScheme === "dark") {
    document.documentElement.setAttribute("color-scheme", colorScheme)
    document.querySelector<HTMLInputElement>("#theme-checkbox")!.checked = true
  }

  if (window.$config.logoRound) {
    document.getElementById("logo")!.style.borderRadius = "50%"
  }
}

function toggleMenu() {
  const side = document.getElementById("side")
  if (side?.style.display === "none") {
    side?.style.setProperty("display", "flex")
  } else {
    side?.style.setProperty("display", "none")
  }
}

function toggleTheme(this: HTMLInputElement) {
  const root = document.documentElement
  const colorScheme = this.checked ? "dark" : ""
  root.setAttribute("color-scheme", colorScheme)
  window.localStorage.setItem("color-scheme", colorScheme)
}

/// Get markdown file
function getDoc(docPath: string): Promise<string> {
  const prefix = window.$config.prefix
  if (prefix && prefix.trim().length > 0) {
    if (docPath.startsWith(".")) {
      docPath = docPath.replace(".", "/" + prefix)
    } else if (docPath.startsWith("/")) {
      docPath = docPath.replace("/", "/" + prefix + "/")
    } else {
      docPath = "/" + prefix + "/" + docPath
    }
  }

  return new Promise<string>((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", docPath)
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
  getDoc("./README.md")
    .then((val) => {
      const ast = md.parse(val, {})

      let menuContent = ""
      let space = ""

      for (let i = 0; i < ast.length; i++) {
        if (ast[i].type === "heading_open") {
          if (ast[i].tag === "h2") {
            space = "  "
          }

          if (ast[i].tag === "h3") {
            space = "    "
          }

          if (ast[i].tag >= "h4") {
            continue
          }

          const title = ast[i + 1].content
          menuContent += `${space}- [${title}](./README.md?id=${title.replace(
            /\s*/g,
            ""
          )})\n`
        }
      }

      menu.innerHTML = md.render(menuContent)
      window.location.replace("#/README.md")
    })
    .catch((err) => {
      menu.innerHTML = err
    })
}

// Generate menu from menu.md
function renderMenu() {
  const menu = document.querySelector("#menu")!
  getDoc("./menu.md")
    .then((val) => {
      menu.innerHTML = md.render(val)
    })
    .catch(() => {
      // No menu.md, read README.md
      renderMenuByREADME(menu)
    })
}

// Generate article
export function renderContent(path: string) {
  const content = document.querySelector("#content .markdown-body")!
  getDoc(path)
    .then((val) => {
      content.innerHTML = md.render(val)
    })
    .catch((err) => {
      content.innerHTML = err
    })
}

export function init() {
  document.getElementById("logo")?.setAttribute("src", window.$config.logo)
  document.getElementById("name")!.innerHTML = window.$config.name ?? ""
  document.getElementById("menu-btn")?.addEventListener("click", toggleMenu)
  document
    .getElementById("theme-checkbox")
    ?.addEventListener("change", toggleTheme)

  initUI()
  renderMenu()
}
