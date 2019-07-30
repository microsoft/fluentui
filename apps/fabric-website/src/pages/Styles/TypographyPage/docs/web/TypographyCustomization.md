You can add some of your own customizations to the default theme.
For example, you can utilize `defaultFontStyle` to override the default font style and
`fonts` to override the default font styles for specific fonts, like small, medium, large, etc.
The example below shows how to override styles for the 'medium' fonts.
You can override anything in `IRawStyle`.

```tsx
import { loadTheme } from 'office-ui-fabric-react';

loadTheme({
  defaultFontStyle: { fontFamily: 'Arial Black', fontWeight: 'bold' },
  fonts: {
    medium: {
      fontFamily: 'Monaco, Menlo, Consolas',
      fontSize: '30px'
    }
  }
});
```
