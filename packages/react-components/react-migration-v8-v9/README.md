# @fluentui/react-migration-v8-v9

**React Migration v8 to v9 [Fluent UI React](https://react.fluentui.dev/)**

This package contains component shims that provide the props interface of a v8 component and render a v9 component.

Our recommendation is to avoid using shims and instead migrate from using v8 components to using v9 components in your codebase. Shims provide a convienient way to start migrating to v9 while defering the cost of updating a multitude of call points.

Shims depend on both v8 and v9, so carefully consider the impact using a shim may have on bundle size and render performance vs. migrating to v9 directly.
