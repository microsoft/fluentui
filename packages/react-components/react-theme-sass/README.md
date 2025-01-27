# @fluentui/react-theme-sass

**React Theme Sass for [Fluent UI React](https://react.fluentui.dev)**

SASS variables referencing react-theme design tokens injected to DOM by react-provider.

## Usage

1. Instantiate a `FluentProvider` to inject a Fluent theme into a DOM:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';
import App from './App';
ReactDOM.render(
  <FluentProvider theme={teamsLightTheme}>
    <App />
  </FluentProvider>,
  document.getElementById('root'),
);
```

2. In SCSS styles you can `@use` SASS variables from `@fluentui/react-theme-sass`.
   
```scss
// With a namespace
@use '@fluentui/react-theme-sass/sass/tokens' as 'fluentTokens';

.brandedElement {
  color: fluentTokens.colorBrandForeground1;
  background: fluentTokens.colorBrandBackground;
  border-radius: fluentTokens.borderRadiusLarge;
}
```

```scss
// Without a namespace
@use '@fluentui/react-theme-sass/sass/tokens' as *;

.brandedElement {
  color: $colorBrandForeground1;
  background: $colorBrandBackground;
  border-radius: $borderRadiusLarge;
}
```
> ⚠ Note: This package does not export any Javascript code.️
