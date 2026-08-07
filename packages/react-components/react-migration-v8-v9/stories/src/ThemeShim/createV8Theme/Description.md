The createV8Theme shim method allows you to create a v8 Theme from a BrandVariants (a.k.a brand ramp) and a v9 Theme object.

The v9 theme object input comes from `@fluentui/tokens` (e.g. `webLightTheme` or a
`createLightTheme`/`createDarkTheme` result) — v9 itself consumes themes as static CSS classes
at runtime, so theme objects are build-time/tooling data.

The `fluent2ComponentStyles` are applied from the `@fluentui/fluent2-theme`.
This updates the component styles to better match the exact styling of v9.
