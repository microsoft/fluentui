# @fluentui/theme

**Basic building blocks for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui) Themes**

Define your own theme based on an existing theme:

```js
import { createTheme } from '@uifabric/styling';
import { Theme, mergeThemes, FontWeights } from '@fluentui/theme';

export const MyTheme: Theme = mergeThemes(createTheme(), {
  tokens: {
    button: {
      fontWeight: FontWeights.semibold,
      padding: '0 24px',
    },
  },
});
```
