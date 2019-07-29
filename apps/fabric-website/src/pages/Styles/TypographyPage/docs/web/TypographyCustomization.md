You can add some of your own customizations to the default theme.
For example, you can utilize `defaultFontStyle` to override the default font style and
`fonts` to override the default medium font size.

```tsx
import { loadTheme } from 'office-ui-fabric-react';

loadTheme({
  defaultFontStyle: { fontFamily: 'Comic Sans MS', fontWeight: 'bold' },
  fonts: {
    medium: { fontSize: 50 }
  }
});
```
