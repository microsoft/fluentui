# @fluentui/storybook

**Storybook for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

## Addons

_Learn more about storybook addons [here](https://storybook.js.org/docs/addons/introduction/)._

### Decorator: withThemeProvider

This adds Theme knob which allows selecting different theme to provide to components via `ThemeProvider`.

```js
import { addDecorator } from '@storybook/react';
import { withThemeProvider } from '@fluentui/storybook';

addDecorator(withThemeProvider);
```
