The `@fluentui/react-icons` package provides [Fluent UI System Icons](https://github.com/microsoft/fluentui-system-icons) icon set. Each icon within this set is encapsulated within a React component, utilizing SVG-based graphics. Icons are available in two distinct styles: `Filled` and `Regular`.

## Sized icons vs unsized icons

- **Unsized** icons (e.g., `SendRegular`, `SendFilled`, etc.) are set to `1em` in size and can be adjusted proportionally using the `fontSize` property.
- **Sized** icons (e.g., `Send24Regular`, `Send32Regular`) are fixed to predetermined sizes and do not scale.

As a general guideline, it's recommended to utilize unsized icons since the same instance of an icon can be reused multiple times. However, there are instances where icons may not scale effectively. For example, icons containing logos and signs often have varied glyph sizes. In such cases, it's advisable to opt for sized icons.

---

You can preview <a href="#" data-sb-kind="icons-catalog--page">all icons in the catalog</a>.
