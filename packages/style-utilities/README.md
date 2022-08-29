# @fluentui/style-utilities

**Styling helpers for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**
([formerly Office UI Fabric React](https://developer.microsoft.com/en-us/office/blogs/ui-fabric-is-evolving-into-fluent-ui/))

## Using the style-utilities package

Integrating components into your project depends heavily on your setup. The recommended setup is to use a bundler such as webpack which can resolve NPM package imports in your code and can bundle the specific things you import.

If you're using `@fluentui/react`, the `@fluentui/style-utilities` package contents are re-exported under `@fluentui/react/lib/Styling` (for `office-ui-fabric-react`, use `office-ui-fabric-react/lib/Styling`). It's recommended to access style-utilities this way rather than via a direct dependency.

In a project which doesn't use `@fluentui/react` (or `office-ui-fabric-react`), you can still install the style-utilities package as a dependency:

```bash
npm install --save @fluentui/style-utilities
```

This gives you access to style-utilities-related constants, utilities, and Fabric Core style classes through JavaScript.

## Overriding the theme colors

The default palette of colors matches the default Fabric core style-utilities conventions. However, it is possible to override the color slots to match your product requirements:

```tsx
import {
  loadTheme({
    palette: {
      themePrimary: 'red',
      themeSecondary: 'blue'
    }
  });
}
```

If you override theme settings, you need to do this before accessing theme colors. Otherwise you won't get a notification that the theme changed.
