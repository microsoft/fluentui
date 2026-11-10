# Fluent UI Web Components

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/@fluentui/web-components?/style=flat-square)](https://www.npmjs.com/package/@fluentui/web-components)

Microsoft's [Fluent UI Web Components](https://github.com/microsoft/fluentui/tree/master/packages/web-components) is designed to help you build web apps using Web Components styled with the [Fluent design language](https://github.com/microsoft/fluentui).

## Installation

## Install

Fluent UI should be installed as a `dependency` of your app.

**Yarn**

```sh
yarn add @fluentui/web-components
```

**NPM**

```sh
npm i @fluentui/web-components
```

**pnpm**

```sh
pnpm add @fluentui/web-components
```

### From CDN

A pre-bundled script that contains all APIs needed to use Fluent UI Web Components is available on CDN. You can use this script by adding [`type="module"`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) to the script element and then importing from the CDN.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script type="module" src="https://unpkg.com/@fluentui/web-components"></script>
  </head>
  <!-- ... -->
</html>
```

The above CDN location points to the latest release of `@fluentui/web-components`. It is advised that when you deploy your site or app, you import the specific version you have developed and tested with.

For simplicity, examples throughout the documentation will assume the library has been installed from NPM, but you can always replace the import location with the CDN URL.

## Setup

### Required Theming

Fluent UI Web Components are styled using tokens in the form of CSS variables. You can use the `setTheme` utility to provide a theme for your website or application.

Available themes:

- `webLightTheme`
- `webDarkTheme`

Theme implementation:

```js
import { setTheme } from '@fluentui/web-components';
import { webLightTheme } from '@fluentui/tokens';

setTheme(webLightTheme);
```

## Usage

Each component can be directly imported. The side effect only module will call define and cause it to be set up.

### Defining Components

**Importing a defined component:**

```js
import '@fluentui/web-components/button.js';
```

**Importing all defined components:**

```js
import '@fluentui/web-components/web-components.js';
```

### Defining Declarative Components

Each component provides a declarative `f-template`.

Include an `f-template` on your page, you can find it at
`'@fluentui/web-components/button/template.html'`.

**Importing a defined component:**

```js
import '@fluentui/web-components/button/define-async.js';
```

### Hydrating Declarative Components

For more information about including hydratable syntax, we recommend using an integration with [WebUI Framework](https://microsoft.github.io/webui/) project.

[More information about FAST hydration](https://fast.design/docs/3.x/declarative-templates/server-rendering/).

### Custom Elements Manifest

We ship a [CEM (custom elements manifest)](https://github.com/webcomponents/custom-elements-manifest) from the root of the bundle.

```js
import CEM from '@fluentui/web-components/custom-elements.json' with { type: 'json' };
```

## Contributing

To start the component development environment, run `yarn start`.

### SSR templates and stylesheets

Each component ships a declarative-shadow-DOM template (`*.template.html`) and an extracted stylesheet (`*.styles.css`) next to its `*.template.ts` and `*.styles.ts` sources. These files are generated from the TypeScript sources and committed to the repo so the DSD output is visible without running a build.

After editing a `*.template.ts` or `*.styles.ts`, regenerate the matching HTML and CSS with:

```sh
yarn generate:ssr
```

To check that the committed files match what the generators would produce (for example, before opening a PR), run:

```sh
yarn check:ssr
```

`yarn compile` does not regenerate these files; it copies them from `src/` into `dist/esm/` alongside the compiled JS.

Use the `yarn check:ssr` summary to avoid clobbering intentional SSR-only edits:

- `stale`: the committed source and generated file are unchanged, but regeneration disagrees with disk. Rebase if needed, then run `yarn generate:ssr`, review the generated diff, and commit it with the related source or generator change.
- `hand-edited`: the generated HTML/CSS changed without a matching `*.template.ts` or `*.styles.ts` change. Do not overwrite it blindly; either move the intended delta into the TypeScript source or generator before regenerating, or reapply and call out the intentional SSR-only edit in the PR.
- `conflicts`: both the TypeScript source and generated file changed, and regeneration still disagrees with disk. Treat this like a merge conflict: inspect the current generated-file diff, regenerate, then preserve only the intentional SSR delta before committing.

Keep generated-file updates scoped to the component you changed. If `yarn check:ssr` reports unrelated stale files, leave them out of your PR and coordinate a dedicated cleanup.

### Testing

On CI, a static test harness build is first generated by running Vite in build mode. The Playwright tests are then run against the generated harness. To run Playwright tests in this mode, use the command `yarn nx run web-components:e2e`.

To run Playwright tests locally in [UI mode](https://playwright.dev/docs/test-ui-mode), use the command `yarn nx run web-components:e2e:local`. This will start a local development server with Vite and open the Playwright test runner UI.
