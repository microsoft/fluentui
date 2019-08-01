You can add some of your own customizations to the default theme.
For example, you can utilize `defaultFontStyle` to override the default font style and
`fonts` to override the default font styles for specific fonts, like small, medium, large, etc.
The example below shows how to override font styles for some of the fonts.
You can override anything in `IRawStyle`.

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
