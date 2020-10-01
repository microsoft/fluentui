# [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)

**The React-based front-end framework for building web experiences.**

[![npm version](https://badge.fury.io/js/%40fluentui%2Freact.svg)](https://badge.fury.io/js/%40fluentui%2Freact) [![Build Status](https://dev.azure.com/uifabric/fabricpublic/_apis/build/status/office-ui-fabric-react%20-%20PR?branchName=master)](https://dev.azure.com/uifabric/fabricpublic/_build/latest?definitionId=84&branchName=master)

Fluent UI React is a collection of robust React-based components designed to make it simple for you to create consistent web experiences using the Fluent Design Language.

## Learn about Fluent UI

[Fluent UI React current release documentation](https://developer.microsoft.com/en-us/fluentui)

[Fluent UI Northstar documentation for Teams developers](https://aka.ms/fluent-ui)

## Who uses Fluent UI React?

![image](https://user-images.githubusercontent.com/785361/50458071-45b58d00-0915-11e9-90c0-ad8789c99db5.png)

\+ 45 additional Microsoft sites and products

## For more information...

Please see the [wiki](https://github.com/microsoft/fluentui/wiki).

## Contents

- [Using Fluent UI React](#using-fluent-ui-react)
  - [Integrating in your project](#integrating-in-your-project)
  - [Version policy](#version-policy)
  - [Browser support](#browser-support)
  - [Right-to-left support](#right-to-left-support)
  - [Server-side rendering](#server-side-rendering)
  - [Advanced usage](#advanced-usage)
- [Contribute to Fluent UI React](#contribute-to-fluent-ui-react)
- [Building the repo](#building-the-repo)
  - [Testing](#testing)
  - [Advanced building tips](#advanced-building-tips)
- [Licenses](#licenses)
- [Changelog](#changelog)

## Using Fluent UI React

### Creating a new app

To create a simple React app using [Create React App](https://create-react-app.dev), [install Node.js](https://nodejs.org), then run:

```sh
npx create-react-app my-app
cd my-app
npm install @fluentui/react
npm start
```

See the next section for some starter code using Fluent UI React controls.

### Integrating in your project

```sh
npm i @fluentui/react

# Or, use yarn
yarn add @fluentui/react
```

This will add the package as a dependency in your `package.json` file and download it under `node_modules/@fluentui/react`.

The library includes ES2015 module entry points under the `lib` folder (use `lib-amd` if you need AMD, or `lib-commonjs` if you need commonjs). To use a control, import it and then use it in your render method:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { PrimaryButton } from '@fluentui/react/lib/Button';

ReactDOM.render(<PrimaryButton>I am a button.</PrimaryButton>, document.getElementById('root'));
```

### Version policy

Fluent UI React adheres to [semantic versioning](http://www.semver.org/). However, we only consider constructs directly importable at the package level or from files at the root (e.g. `@fluentui/react/lib/Utilities` or `@fluentui/react/lib-amd/Styling`) to be part of our API surface. Everything else is considered package-internal and may be subject to changes, moves, renames, etc.

### Browser support

Fluent UI React supports all evergreen browsers, with IE 11 as the min-bar version of Internet Explorer. See the [browser support doc](https://github.com/microsoft/fluentui/wiki/Browser-Support) for more information.

### Right-to-left support

All components can render in LTR or RTL, depending on the `dir` attribute set on the `html` element (`dir="rtl"` will flip the direction of everything). You can also use the `setRTL` API if you don't have control over the `html` element's rendering. Example:

```tsx
import { setRTL } from '@fluentui/react/lib/Utilities';

setRTL(true);
```

### Server-side rendering

Fluent UI React components can be rendered in a server-side Node environment (or used in tests which run in an SSR-like environment), but it requires customizing how styles and SCSS files are loaded. See the [server-side rendering documentation](https://github.com/microsoft/fluentui/wiki/Server-side-rendering-and-browserless-testing) for examples of how to handle this.

### Advanced usage

For info about advanced usage including module- vs. path-based imports, using an AMD bundler like RequireJS, and deployment features, see our [advanced documentation](https://github.com/microsoft/fluentui/wiki/Advanced-Usage).

## Contribute to Fluent UI React

Please take a look at our [contribution guidelines](https://github.com/microsoft/fluentui/wiki/Contributing) for more info. Also read [Contribute bug fixes](https://github.com/microsoft/fluentui/wiki/Bug-Fixes) and [Contribute new component](https://github.com/microsoft/fluentui/wiki/New-Components).

## Building the repo

Before you get started, **make sure you have read the [Git branch setup instructions](https://github.com/microsoft/fluentui/wiki/Setup)**

To view the documentation including examples, contracts, component status, and to add functionality or fix issues locally, you can:

1. `git clone https://github.com/microsoft/fluentui.git`
2. `cd fluentui`
3. `yarn`
4. `yarn builddemo`
5. `yarn start`

This will start a demo page from the `office-ui-fabric-react` package folder, which will open a web browser with the example page. You can make changes to the code which will automatically build and refresh the page using live-reload.

To build and run tests for all packages in the repo, run `yarn build` from the root.

To build individual packages within the `packages/*` or `apps/*` folders, `cd` to the relevant folder and run `yarn build`. Note that because the packages are symlinked together, you must manage building dependencies in the right order, or use the `yarn buildto` script to build to the specific package you want.

#### Advanced build commands

There are more advanced build commands listed in the [Build Commands](https://github.com/microsoft/fluentui/wiki/Build-Commands) wiki page.

### Testing

For info about testing, see our [testing documentation](https://github.com/microsoft/fluentui/wiki/Testing).

## Licenses

All files on the Fluent UI React GitHub repository are subject to the MIT license. Please read the License file at the root of the project.

Usage of the fonts and icons referenced in Fluent UI React is subject to the terms of the [assets license agreement](https://aka.ms/fluentui-assets-license).

## Changelog

We use [GitHub Releases](https://github.com/blog/1547-release-your-software) to manage our releases, including the changelog between every release. View a complete list of additions, fixes, and changes on the [releases](https://github.com/microsoft/fluentui/releases) page.

---

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

> The **Office UI Fabric React** project has evolved into **Fluent UI React**! We have a lot in store for Fluent UI - [Read our announcement here](https://developer.microsoft.com/en-us/office/blogs/ui-fabric-is-evolving-into-fluent-ui/) and see more details about what this means for package consumers below.

# [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)

**The React-based front-end framework for building experiences for Microsoft 365.**

Fluent UI React ([formerly Office UI Fabric React](https://developer.microsoft.com/en-us/office/blogs/ui-fabric-is-evolving-into-fluent-ui/)) is a collection of robust React-based components designed to make it simple for you to create consistent web experiences using the Fluent Design Language.

For information about available controls, see the [Fluent UI website](https://developer.microsoft.com/en-us/fluentui).

To get started using or contributing to Fluent UI React, see the [full readme](https://github.com/microsoft/fluentui/blob/master/README.md).

## Moving to `@fluentui/react`

Going forward, the `office-ui-fabric-package` will be renamed to `@fluentui/react`. The `@fluentui/react` package exists today as a mirror of `office-ui-fabric-react`'s public API surface. (Updates will still be published under both names for at least the duration of version 7.)

If you'd like to start using `@fluentui/react` now, you can do so by changing your dependency and imports.

Imports in either of these formats can be directly renamed:

```ts
// Old
import { TextField } from 'office-ui-fabric-react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

// New
import { TextField } from '@fluentui/react';
import { TextField } from '@fluentui/react/lib/TextField';
```

However, deeper imports from internal files **will not** work with `@fluentui/react`. (These types of imports are also unsupported today, as internal file paths are considered private APIs and therefore subject to change without notice.)

```ts
// Not supported currently; won't work with @fluentui/react
import { TextField } from 'office-ui-fabric-react/lib/components/TextField/index';

// Use instead
import { TextField } from '@fluentui/react';
import { TextField } from '@fluentui/react/lib/TextField';
```

If you're currently depending on an API which you think should be public but is not exported from the top level of the package, please [file an issue](https://github.com/microsoft/fluentui/issues) to discuss.
