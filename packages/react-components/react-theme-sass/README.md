# @fluentui/react-theme-sass

**React Theme Sass for [Fluent UI React](https://react.fluentui.dev)**

Sass variables referencing react-theme design tokens injected to DOM by react-provider.

## Usage

1. Instantiate a `FluentProvider` to inject a Fluent theme into a DOM:

```jsx
import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';
import App from './App';

ReactDOMClient.createRoot(document.getElementById('root')).render(
  <FluentProvider theme={teamsLightTheme}>
    <App />
  </FluentProvider>,
);
```

2. In SCSS styles, use the Sass module's variables with a namespace. The `pkg:` URL resolves the package's public `style` entrypoint using Dart Sass's Node.js package importer:

```scss
@use 'pkg:@fluentui/react-theme-sass' as fluentTokens;

.brandedElement {
  color: fluentTokens.$colorBrandForeground1;
  background: fluentTokens.$colorBrandBackground;
  border-radius: fluentTokens.$borderRadiusLarge;
}
```

The alias after `as` is an unquoted identifier. Variable references include `$` after the namespace.

To use the same variables without a namespace, use `as *`:

```scss
@use 'pkg:@fluentui/react-theme-sass' as *;

.brandedElement {
  color: $colorBrandForeground1;
  background: $colorBrandBackground;
  border-radius: $borderRadiusLarge;
}
```

Enable the Node.js package importer with Dart Sass 1.71.0 or later:

```sh
sass --pkg-importer=node input.scss output.css
```

For the JavaScript Sass API, configure `importers: [new sass.NodePackageImporter()]`. If your tooling uses file-based load paths instead, add `node_modules` to the load paths and replace the `pkg:` URL with `@fluentui/react-theme-sass/sass/tokens`.

The token module requires Dart Sass 1.23.0 or later; LibSass and Ruby Sass do not support Sass modules. Existing `@import` consumers on module-capable Dart Sass retain the same global variables and CSS-variable values, but `@import` is deprecated and consumers should migrate to `@use`.

> ⚠ Note: This package does not export any Javascript code.️
