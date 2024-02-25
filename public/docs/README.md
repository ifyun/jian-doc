# Jian Doc - 简单文档

## 使用

- 创建一个 `<div id="app"></div>` 的元素
- 引入 `jian-doc.umd.js`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Jian Doc</title>
    <script>
      window.$config = {
        // 文档相对于 index.html 的位置，不指定则使用根目录
        prefix: "docs",
        // 头像文件名
        logo: "logo.svg",
        // 显示在 avatar 下方
        name: "Jian Doc"
      }
    </script>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="jian-doc.umd.js"></script>
  </body>
</html>
```

- `menu.md` 将被渲染为菜单
- 若不存在 `menu.md`，则将 `README.md` 中的标题渲染为菜单

## 扩展

### 代码高亮

引入 `highlight.js`：

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/@highlightjs/cdn-assets@11.9.0/styles/atom-one-dark.min.css" />
<script src="https://unpkg.com/@highlightjs/cdn-assets@11.9.0/highlight.min.js"></script>
<script src="https://unpkg.com/@highlightjs/cdn-assets@11.9.0/languages/xml.min.js"></script>
```

可选择你喜欢的主题和需要的语言。

> 可以在 [https://highlightjs.org/](https://highlightjs.org/) 查看详细用法。

### 公式

引入 `katex`：

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/katex@0.16.9/dist/katex.min.css" />
<script src="https://unpkg.com/katex@0.16.9/dist/katex.min.js"></script>
```

## 文档示例

### 有序列表

1. 独立寒秋
2. 湘江北去
3. 橘子洲头

### 表格

| Header  | Header  | Header  |
| :-----: | :-----: | :-----: |
| Content | Content | Content |
| Content | Content | Content |

### 键盘

使用 <kbd>Ctrl</kbd> + <kbd>A</kbd> 全选。

<div style="text-align: center">
  <kbd>Q</kbd><kbd>W</kbd><kbd>E</kbd><kbd>R</kbd><kbd>T</kbd><kbd>Y</kbd><kbd>U</kbd><kbd>I</kbd><kbd>O</kbd><kbd>P</kbd>
  <br>
  <kbd>A</kbd><kbd>S</kbd><kbd>D</kbd><kbd>F</kbd><kbd>G</kbd><kbd>H</kbd><kbd>J</kbd><kbd>K</kbd><kbd>L</kbd>
  <br>
  <kbd>Z</kbd><kbd>X</kbd><kbd>C</kbd><kbd>V</kbd><kbd>B</kbd><kbd>N</kbd><kbd>M</kbd>
</div>

### 数学公式(KaTeX)

行内公式：$E=mc^2$

独立公式：

$$
y= \begin{cases} x^2, & x>0,\\ x^2 +x-8, & x \le 0 \end{cases}
$$