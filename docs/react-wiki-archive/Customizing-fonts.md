Fluent UI React provides various options for customizing text fonts. For customizing icon fonts, [see this page instead](Using-icons).

[This codesandbox](https://codesandbox.io/s/customizing-fabric-icons-and-fonts-bveg8) has working examples of various font and icon customization methods.

## Changing the default text font

You can change the default text font using theming:

```ts
import { createTheme } from '@fluentui/react';

const theme = createTheme({
  // You can also modify certain other properties such as fontWeight if desired
  defaultFontStyle: { fontFamily: 'Monaco, Menlo, Consolas' },
});
```

You can also target specific variants (small, medium, large, etc.) through the `fonts` property. The overrides can include any property from [`IRawStyle`](#/controls/web/references/irawstyle).

```ts
// Partial example of what can be done
const theme = createTheme({
  defaultFontStyle: { fontFamily: 'Monaco, Menlo, Consolas', fontWeight: 'regular' },
  fonts: {
    small: {
      fontSize: '11px',
    },
    medium: {
      fontSize: '13px',
    },
    large: {
      fontSize: '20px',
      fontWeight: 'semibold',
    },
    xLarge: {
      fontSize: '22px',
      fontWeight: 'semibold',
    },
  },
});
```

### Caveats

- This works in Fluent UI React (Fabric) 7+ but not 5 or 6.
- This does not prevent the Segoe `@font-face`s from being defined. In some browsers, this may mean the default font files are still loaded.

## Changing the CDN

By default, text fonts (such as Segoe) are loaded from `https://static2.sharepointonline.com/files/fabric/assets`.

To load the default text fonts from a different CDN, set the global variable `FabricConfig.fontBaseUrl`. The URL should **not** have a trailing slash.

If your app is bootstrapped from an HTML file, it's easiest to put the global there:

```html
<!-- Must go BEFORE you load Fabric -->
<script type="text/javascript">
  var FabricConfig = { fontBaseUrl: 'https://your-url-here' };
</script>
```

You can also set it from your app's root JS file, but **it MUST run before anything is imported from Fluent UI React!** For example:

```ts
window.FabricConfig = { fontBaseUrl: 'https://your-url-here' };
// Fabric imports must go AFTER this ^^^
import { Button } from '@fluentui/react';
```

### Caveats

- Again: this global must be set **BEFORE** any Fluent UI React code is imported or executed.
- The alternative CDN is assumed to follow the same file structure (relative to `fontBaseUrl`) as the default CDN.
- [#3881](https://github.com/microsoft/fluentui/issues/3881) tracks adding a way to change the CDN without a global.
