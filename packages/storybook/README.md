# @fluentui/storybook

**Storybook for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

## Addons

Learn more about storybook addons [here](https://storybook.js.org/docs/addons/introduction/).

To import ThemeProvider decorator which allows you to select theme and provided to stories using `ThemeProvider` wrapper:

```js
import { addDecorator } from '@storybook/react';
import { withThemeProvider } from '@fluentui/storybook';

addDecorator(withThemeProvider);
```
