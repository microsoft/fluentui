# @fluentui/react-range-slider-preview

**React Range Slider components for [Fluent UI React](https://react.fluentui.dev/)**

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

## Opt-in CSS Modules styles

CSS Modules alternatives are available for `RangeSlider`. The default exports and component imports continue to use Griffel.

To opt in, configure your bundler to replace each `use<Component>Styles.styles.js` module with its adjacent `use<Component>Styles.styles.css.js` alternative (or `.styles.ts` with `.styles.css.ts` for source builds). Apply the replacement consistently to client and server bundles. The CSS loader must provide a default class-name map and retain the adjacent `.module.css` asset, including CSS from dependencies. All component rules are in `@layer fluentui` and use the theme custom properties supplied by `FluentProvider`.
