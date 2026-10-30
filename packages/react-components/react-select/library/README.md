# @fluentui/react-select

**React Select components for [Fluent UI React](https://react.fluentui.dev)**

The Select component provides a styled wrapper around the native `<select>` element. It is recommended over Combobox when features like filtering and virtualization are not required. It provides better cross-platform functionality particularly on mobile, and better accessibility.

## Opt-in CSS Modules styles

CSS Modules alternatives are available for `Select`. The default exports and component imports continue to use Griffel.

To opt in, configure your bundler to replace each `use<Component>Styles.styles.js` module with its adjacent `use<Component>Styles.styles.css.js` alternative (or `.styles.ts` with `.styles.css.ts` for source builds). Apply the replacement consistently to client and server bundles. The CSS loader must provide a default class-name map and retain the adjacent `.module.css` asset, including CSS from dependencies. All component rules are in `@layer fluentui` and use the theme custom properties supplied by `FluentProvider`.
