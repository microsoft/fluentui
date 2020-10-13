# @fluentui/theme

**Basic building blocks for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui) Themes**

Define your own theme based on an existing theme:

```js
import { createTheme, Theme, FontWeights } from '@fluentui/theme';

export const MyTheme: Theme = createTheme({
  components: {
    Button: {
      variants: {
        fontWeight: FontWeights.semibold,
        paddingLeft: '24px',
        paddingRight: '24px',
      },
    },
  },
});
```
