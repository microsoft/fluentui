# @fluentui/make-styles

**Make Styles components for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

# API design

# Build structure

```
/make-styles
  /babel - contains babel plugin/preset for built time - 0 kb
  /runtime - in dev contains all required utils, in prod - noop i.e. 0kb
  /runtime-ie11 - in dev - alias to runtime, in prod - optimized runtime 20kb
```
