# @fluentui/storybook

**Storybook addons for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

## Addons

_Learn more about storybook addons [here](https://storybook.js.org/docs/addons/introduction/)._

### Decorator: withStrictMode

This adds a knob for wrapping a story in `React.StrictMode`.

```js
import { addDecorator } from '@storybook/react';
import { withStrictMode } from '@fluentui/storybook';

addDecorator(withStrictMode);
```
