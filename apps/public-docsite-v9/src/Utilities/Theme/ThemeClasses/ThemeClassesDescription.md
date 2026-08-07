Fluent UI themes ship as static CSS classes in `@fluentui/react-tailwind-theme` (import
`@fluentui/react-tailwind-theme/styles.css` once per document). Each theme class contains only
custom-property declarations, so applying it to any DOM node — a provider is not required — themes
that subtree. Typed constants for the class names (`webLightThemeClassName`,
`webDarkThemeClassName`, …) are exported from `@fluentui/react-components`.
