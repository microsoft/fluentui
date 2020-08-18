# @fluentui/themes

**Themes for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

To import theme and provide the theme down to components:

```js
import { FluentTheme } from '@fluentui/themes';
import { ThemeProvider, Button } from '@fluentui/react';

const App = () => (
  <ThemeProvider theme={FluentTheme}>
    <Button />
  </ThemeProvider>
);
```
