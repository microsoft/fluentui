Fabric comes with an alternate CSS file for pages written in right-to-left (RTL) languages, such as Arabic and Hebrew. This reverses the order of columns in the responsive grid, making it easy to create an RTL layout without writing additional templates. Many icons are also reversed, particularly those used for navigation such as arrows.

<!-- headings get auto-generated IDs usually, and this page has two "Implementation" headings -->
<h3 id="rtl-implementation">Implementation</h3>

Apply the “dir” attribute to the HTML tag, and reference the RTL version of Fabric.

```html
<html dir="rtl">
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="fabric-[version].rtl.min.css" />
  </head>
  ...
</html>
```
