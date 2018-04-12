The entire color palette of the controls are themeable. We provide a set of sensible defaults, but you can override all colors individually.

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