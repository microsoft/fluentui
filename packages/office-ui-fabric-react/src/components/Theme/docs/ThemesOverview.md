The entire color palette of the controls is themeable. We provide a set of sensible defaults, but you can override all colors individually. To do this, you must call `loadTheme()` with a custom theme object at app startup.

## Using Themes

To use themes, an application must call `loadTheme()` immediately at app startup before any app code executes.
Here is an example:

```tsx
import { loadTheme } from 'office-ui-fabric-react/lib/Styling';

loadTheme({
  palette: {
    themePrimary: '#0078d4',
    themeLighterAlt: '#eff6fc',
    themeLighter: '#deecf9',
    themeLight: '#c7e0f4',
    themeTertiary: '#71afe5',
    themeSecondary: '#2b88d8',
    themeDarkAlt: '#106ebe',
    themeDark: '#005a9e',
    themeDarker: '#004578',
    neutralLighterAlt: '#f8f8f8',
    neutralLighter: '#f4f4f4',
    neutralLight: '#eaeaea',
    neutralQuaternaryAlt: '#dadada',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c8c8',
    neutralTertiary: '#c2c2c2',
    neutralSecondary: '#858585',
    neutralPrimaryAlt: '#4b4b4b',
    neutralPrimary: '#333333',
    neutralDark: '#272727',
    black: '#1d1d1d',
    white: '#ffffff'
  }
});
```

## Customization

You can also add some of your own customizations to the default theme.
For example, you can set the `defaultFontStyle` property to modify every font variant
(small, medium, large, etc.), or you can target specific variants through the `fonts` property.
These can be used separately, or together, as shown in the example below.
The overrides can include any property from [`IRawStyle`](#/controls/web/references/irawstyle).

```tsx
import { loadTheme } from 'office-ui-fabric-react';

loadTheme({
  defaultFontStyle: { fontFamily: 'Monaco, Menlo, Consolas', fontWeight: 'regular' },
  fonts: {
    small: {
      fontSize: '11px'
    },
    medium: {
      fontSize: '13px'
    },
    large: {
      fontSize: '20px',
      fontWeight: 'semibold'
    },
    xLarge: {
      fontSize: '22px',
      fontWeight: 'semibold'
    }
  }
});
```
