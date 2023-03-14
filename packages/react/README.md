# [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)

**The React-based front-end framework for building web experiences.**

[![npm version](https://badge.fury.io/js/%40fluentui%2Freact.svg)](https://badge.fury.io/js/%40fluentui%2Freact) [![Build Status](https://img.shields.io/azure-devops/build/uifabric/fabricpublic/164/master?style=flat-square)](https://dev.azure.com/uifabric/fabricpublic/_build?definitionId=164)

Fluent UI React (formerly Office UI Fabric React) is a collection of robust React-based components designed to make it simple for you to create consistent web experiences using the Fluent Design Language.

**What's changed in version 8? See the [release notes](https://github.com/microsoft/fluentui/wiki/Version-8-release-notes).**

_(If you're looking for [Fluent UI Northstar](https://aka.ms/fluent-ui), formerly Stardust, use `@fluentui/react-northstar` instead.)_

## Component documentation

See the [main Fluent UI website](https://developer.microsoft.com/en-us/fluentui) for the list of available components, API and usage documentation, and styling information.

## Who uses Fluent UI React?

![image](https://user-images.githubusercontent.com/785361/50458071-45b58d00-0915-11e9-90c0-ad8789c99db5.png)

\+ 45 additional Microsoft sites and products

## Contents

- [Using Fluent UI React](#using-fluent-ui-react)
  - [Integrating in your project](#integrating-in-your-project)
  - [Version policy](#version-policy)
  - [Browser support](#browser-support)
  - [Right-to-left support](#right-to-left-support)
  - [Server-side rendering](#server-side-rendering)
  - [Advanced usage](#advanced-usage)
- [Contribute to Fluent UI React](#contribute-to-fluent-ui-react)
- [Licenses](#licenses)
- [Changelog](#changelog)
- [More information](#more-information)

## Using Fluent UI React

### Creating a new app

To create a simple React app using [Create React App](https://create-react-app.dev), [install Node.js](https://nodejs.org), then run:

```sh
npx create-react-app my-app --template @fluentui/cra-template
cd my-app
npm start
```

### Integrating in an existing project

```sh
npm i @fluentui/react
```

This will add the package as a dependency in your `package.json` file and download it under `node_modules/@fluentui/react`.

The library includes ES module entry points under the `lib` folder (use `lib-amd` if you need AMD, or `lib-commonjs` if you need commonjs).

### Version policy

Fluent UI React adheres to [semantic versioning](http://www.semver.org/). However, we only consider constructs directly importable at the package level or from files at the root (e.g. `@fluentui/react/lib/Utilities` or `@fluentui/react/lib-amd/Styling`) to be part of our API surface. Everything else is considered package-internal and may be subject to changes, moves, renames, etc.

### Browser support

Fluent UI React supports all evergreen browsers, with IE 11 as the min-bar version of Internet Explorer<sup>\*</sup>. See the [browser support doc](https://github.com/microsoft/fluentui/wiki/Browser-Support) for more information.

<sup>\*</sup>**NOTE**: [Internet Explorer 11 has been sunset](https://github.com/microsoft/fluentui/wiki/Internet-Explorer-11-Sunset). Features and bug fixes after the sunset date may not be compatible with IE11.

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

Please take a look at our [contribution guidelines](https://github.com/microsoft/fluentui/wiki/Contributing) to learn how to make changes, build the repo and submit your contributions to Fluent UI.

## Licenses

All files on the Fluent UI React GitHub repository are subject to the MIT license. Please read the License file at the root of the project.

Usage of the fonts and icons referenced in Fluent UI React is subject to the terms of the [assets license agreement](https://aka.ms/fluentui-assets-license).

## Changelog

We use [GitHub Releases](https://github.com/blog/1547-release-your-software) to manage our releases, including the changelog between every release. View a complete list of additions, fixes, and changes on the [releases](https://github.com/microsoft/fluentui/releases) page.

## More information

Please see the [wiki](https://github.com/microsoft/fluentui/wiki).

---

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
