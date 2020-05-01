Fluent UI comes with built-in support for pages written in right-to-left (RTL) languages, such as Arabic and Hebrew.

Each component in Fluent UI React will automatically reverse the layout of elements within the component.

For pages using Fabric Core's responsive grid, the order of columns is automatically reversed, making it easy to create an RTL layout without writing additional templates. Fabric Core also reverses many icons, particularly those used for navigation such as arrows. (Icons in Fluent UI React are not automatically reversed.)

<!-- headings get auto-generated IDs usually, and this page has two "Implementation" headings -->
<h3 id="rtl-implementation">Implementation</h3>

Apply the `dir` attribute with value `rtl` to the HTML tag.

```html
<html dir="rtl">
  <head>
    <meta charset="utf-8" />
  </head>
  ...
</html>
```
