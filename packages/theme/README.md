# @fluentui/theme

**Basic building blocks for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui) Themes**

Define your own theme based on an existing theme:

```js
import { FluentTheme } from '@fluentui/fluent-theme';
import { Theme, mergeThemes } from '@fluentui/theme';

export const MyTheme: Theme = mergeThemes(FluentTheme, {
  tokens: {
    button: {
      padding: '0 24px',
    },
  },
});
```
