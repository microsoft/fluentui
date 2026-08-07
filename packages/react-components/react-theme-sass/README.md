# @fluentui/react-theme-sass

**React Theme Sass for [Fluent UI React](https://react.fluentui.dev)**

SASS variables referencing react-theme design tokens shipped as static CSS by
`@fluentui/react-tailwind-theme`.

## Usage

1. Import `@fluentui/react-tailwind-theme/styles.css` once per document (it emits the theme's custom
   properties; web-light values are the `:root` defaults) and instantiate a `FluentProvider` with a
   theme class:

```jsx
import React from 'react';
import ReactDOMClient from 'react-dom/client';
import '@fluentui/react-tailwind-theme/styles.css';
import { FluentProvider, teamsLightThemeClassName } from '@fluentui/react-components';
import App from './App';

ReactDOMClient.createRoot(document.getElementById('root')).render(
  <FluentProvider themeClassName={teamsLightThemeClassName}>
    <App />
  </FluentProvider>,
);
```

2. In SCSS styles you can import SCSS variables from `@fluentui/react-theme-sass` and use them in the styles:

```scss
@import '@fluentui/react-theme-sass';

.brandedElement {
  color: $colorBrandForeground1;
  background: $colorBrandBackground;
  border-radius: $borderRadiusLarge;
}
```

> ⚠ Note: This package does not export any Javascript code.️
