The entire color palette of the controls are themeable. We provide a set of sensible defaults, but you can override all colors individually.

## Loading Themes

To load the theme call `getTheme()`. This returns an object with all the colors and fonts set in the current theme:

```tsx
let myTheme = getTheme();

// returns:
myTheme = {
  palette: {...}, // All the palette colors
  semanticColors: {...}, // All the semanticColors
  fonts: {...}, // All the font stacks like small, medium, large, etc
  isInverted: false // Boolean of whether the theme is currently inverted
}
```

Using `getTheme(true)` will add comments to deprecated semanticColors.

## Overriding Themes

To override the themes, you need to call `loadTheme()` with the appropriate set of overrides:

```tsx
import { loadTheme } from 'office-ui-fabric-react/lib/Styling';

loadTheme({
  palette: {
    'themePrimary': 'red'
  }
});
```