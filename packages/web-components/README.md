# Fluent UI Web Components

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/@fluentui/web-components/beta?style=flat-square)](https://www.npmjs.com/package/@fluentui/web-components/v/beta)

Microsoft's [Fluent UI Web Components](https://github.com/microsoft/fluentui/tree/master/packages/web-components) is designed to help you build web apps using Web Components styled with the [Fluent design language](https://github.com/microsoft/fluentui).

## Installation

## Install

Fluent UI should be installed as a `dependency` of your app.

**Yarn**

```sh
yarn add @fluentui/web-components@beta
```

**NPM**

```sh
npm i @fluentui/web-components@beta
```

**pnpm**

```sh
pnpm add @fluentui/web-components@beta
```

### From CDN

A pre-bundled script that contains all APIs needed to use FAST Foundation is available on CDN. You can use this script by adding [`type="module"`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) to the script element and then importing from the CDN.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script type="module" src="https://unpkg.com/@fluentui/web-components@beta"></script>
  </head>
  <!-- ... -->
</html>
```

The above CDN location points to the latest Beta release of `@fluentui/web-components`. It is advised that when you deploy your site or app, you import the specific version you have developed and tested with.

For simplicity, examples throughout the documentation will assume the library has been installed from NPM, but you can always replace the import location with the CDN URL.

## Setup

Fluent UI Web Components are styled using tokens in the form of CSS variables. You can use the `setTheme` utility to provide a theme for your website or application.

```js
import { setTheme } from '@fluentui/web-components';
import { webLightTheme } from '@fluentui/tokens';

setTheme(webLightTheme);
```

## Usage

That's it. You can now use Fluent UI Web Components in your app.

**Importing the defined component:**

```js
import '@fluentui/web-components/button.js';
```

**Defining the element yourself using named imports:**

```js
import { ButtonDefinition, FluentDesignSystem } from '@fluentui/web-components';

ButtonDefinition.define(FluentDesignSystem.registry);
```

## Development

To start the component development environment, run `yarn start`.

### Known issue with Storybook site hot-reloading during development

Storybook will watch modules for changes and hot-reload the module when necessary. This is usually great but poses a problem when the module being hot-reloaded defines a custom element. A custom element name can only be defined by the `CustomElementsRegistry` once, so reloading a module that defines a custom element will attempt to re-register the custom element name, throwing an error because the name has already been defined. This error will manifest with the following message:
`Failed to execute 'define' on 'CustomElementRegistry': the name "my-custom-element-name" has already been used with this registry`

This is a known issue and will indicate that you need to refresh the page. We're working on surfacing a more instructive error message for this case.

## Testing

When testing locally, start the dev server and in a separate terminal window, run `yarn test:dev` within the web-components folder.
