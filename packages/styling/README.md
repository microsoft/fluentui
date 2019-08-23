# @uifabric/styling

**Styling helpers for [Office UI Fabric](https://dev.microsoft.com/fabric)**

## Using the styling package

Integrating components into your project depends heavily on your setup. The recommended setup is to use a bundler such as webpack which can resolve NPM package imports in your code and can bundle the specific things you import.

If you're using `office-ui-fabric-react`, the `@uifabric/styling` package contents are re-exported under `office-ui-fabric-react/lib/Styling`. It's recommended to access styling this way rather than via a direct dependency.

In a project which doesn't use `office-ui-fabric-react`, you can still install the styling package as a dependency:

```bash
npm install --save @uifabric/styling
```

This gives you access to styling-related constants, utilities, and Fabric Core style classes through JavaScript.

## Overriding the theme colors

The default palette of colors matches the default Fabric core styling conventions. However, it is possible to override the color slots to match your product requirements:

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
