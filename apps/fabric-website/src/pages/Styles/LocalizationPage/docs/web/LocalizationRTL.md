Fabric comes with built-in support for pages written in right-to-left (RTL) languages, such as Arabic and Hebrew. Fabric achieves this by reversing the order of columns in the responsive grid, making it easy to create an RTL layout without writing additional templates. In addition to this, Fabric Core specifically also reverses many icons, particularly those used for navigation such as arrows.

<!-- headings get auto-generated IDs usually, and this page has two "Implementation" headings -->
<h3 id="rtl-implementation">Implementation</h3>

Apply the `dir` attribute with the `rtl` value to the HTML tag.

```html
<html dir="rtl">
  <head>
    <meta charset="utf-8" />
  </head>
  ...
</html>
```
