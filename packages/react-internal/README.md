# [Fluent UI React](https://developer.microsoft.com/en-us/fluentui) - Component internals

## 🚨🚨🚨 DO NOT depend directly on this package! 🚨🚨🚨

This package only exists to work around circular dependency issues with the per-component packages. All Fluent UI React consumers should directly depend on and import from the `@fluentui/react` package (or per-component packages such as `@fluentui/react-button` or `@fluentui/react-checkbox`), NOT this package.

While the public API exported from `@fluentui/react` (and the per-component packages) will be stable within major releases, **contents and paths in `@fluentui/react-internal` may change _at any time_**.
