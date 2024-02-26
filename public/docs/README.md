# Jian Doc · 简单文档

## 使用

- 创建一个 `<div id="app"></div>` 的元素
- 引入 `jian-doc.umd.js`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My Documents</title>
    <script>
      window.$config = {
        prefix: "docs",
        logo: "logo.svg",
        logoRound: false,
        name: "My Documents"
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

配置说明：

- `prefix`：文档相对于 `index.html` 的位置，不设置则文档与 `index.html` 位于同一目录
- `logo`：链接或者相对路径，`prefix` 对该项无效

### 自定义字体/字重

重写 `:root` 的样式：

```css
:root {
  --font: "Source Han Sans", sans-serif !important;
  --font-weight: 300 !important;
  --font-weight-bold: 500 !important;
}
```

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

按下 <kbd>Ctrl</kbd> + <kbd>A</kbd> 全选，<kbd>Alt</kbd> + <kbd>f4</kbd> 关闭窗口。

### 数学公式

行内公式：$E=mc^2$

独立公式：

$$
y= \begin{cases} x^2, & x>0,\\ x^2 +x-8, & x \le 0 \end{cases}
$$
