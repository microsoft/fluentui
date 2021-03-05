# @fluentui/style-utilities

**Styling helpers for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**
([formerly Office UI Fabric React](https://developer.microsoft.com/en-us/office/blogs/ui-fabric-is-evolving-into-fluent-ui/))

## Using this package

Integrating components into your project depends heavily on your setup. The recommended setup is to use a bundler such as webpack which can resolve NPM package imports in your code and can bundle the specific things you import.

If you're using `@fluentui/react`, the `@fluentui/style-utilities` package contents are re-exported under `@fluentui/react/lib/Styling`. It's recommended to access the package this way rather than via a direct dependency.

In a project which doesn't use `@fluentui/react`, you can still install this package as a dependency:

```
npm install --save @fluentui/style-utilities
```

This gives you access to styling-related constants, utilities, and Fabric Core style classes through JavaScript.
