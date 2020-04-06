By default, Fluent UI presents all text using the Western European character set of Segoe UI. For languages with other characters, Fluent UI will either serve a version of Segoe UI with a different character set or use a system font.

<!-- headings get auto-generated IDs usually, and this page has two "Implementation" headings -->
<h3 id="fonts-implementation">Implementation</h3>

The HTML “lang” attribute specifies the language of the element's content. This is typically applied to the root HTML element, where it will be inherited by the entire page. In this example the entire page is in Thai.

```html
<html lang="th-TH">
  ...
</html>
```

For pages with content in multiple languages, the “lang” attribute can be applied to individual elements. In this example, a page that is mostly Thai also contains some Vietnamese.

```html
<html lang="th-TH">
  ...
  <section lang="vi-VN">...</section>
</html>
```
