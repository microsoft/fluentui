You can add some of your own customizations to the default theme.
For example, you can set the `defaultFontStyle` property to modify every font variant
(small, medium, large, etc.), or you can target specific variants through the `fonts` property.
These can be used separately, or together, as shown in the example below.
The overrides can include any property from [`IRawStyle`](#/controls/web/references/irawstyle).

```tsx
import { createTheme } from '@fluentui/react';

const appTheme = createTheme({
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
