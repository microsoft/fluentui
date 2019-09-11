# [Office UI Fabric React](https://dev.microsoft.com/fabric)

**The React-based front-end framework for building experiences for Office and Office 365.**

**Fabric 7**: Summary, breaking changes, and more details available in [the wiki](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Fabric-7).

[![npm version](https://badge.fury.io/js/office-ui-fabric-react.svg)](https://badge.fury.io/js/office-ui-fabric-react) [![Build Status](https://uifabric.visualstudio.com/fabricpublic/_apis/build/status/office-ui-fabric-react%20-%20PR?branchName=master)](https://uifabric.visualstudio.com/fabricpublic/_build/latest?definitionId=84&branchName=master)

Fabric React is a collection of robust React-based components designed to make it simple for you to create consistent web experiences using the Office Design Language.

## Who uses UI Fabric?

![image](https://user-images.githubusercontent.com/785361/50458071-45b58d00-0915-11e9-90c0-ad8789c99db5.png)

\+ 45 additional Microsoft sites and products

## For more information...

Please see the [wiki](https://github.com/OfficeDev/office-ui-fabric-react/wiki).

## Contents

- [Using Fabric React](#using-fabric-react)
  - [Starter apps](#starter-apps)
  - [Integrating in your project](#integrating-in-your-project)
  - [Version policy](#version-policy)
  - [Browser support](#browser-support)
  - [Right-to-left support](#right-to-left-support)
  - [Server-side rendering](#server-side-rendering)
  - [Advanced usage](#advanced-usage)
- [Contribute to Fabric React](#contribute-to-fabric-react)
- [Building the repo](#building-the-repo)
  - [Testing](#testing)
  - [Advanced building tips](#advanced-building-tips)
- [Licenses](#licenses)
- [Changelog](#changelog)

## Using Fabric React

### Starter apps

To create a simple starter app using Fabric components, [install the latest LTS node.js](https://nodejs.org), then run:

```
npm init uifabric
```

It'll prompt you for a project name. If you choose to create a project called `my-app`, you can start working on the project like this:

```
cd my-app
npm start
```

This scaffold uses the [`just`](https://github.com/microsoft/just) build library. It is very flexible and requires no "eject" script to allow for customization on its configurations.

If you prefer to use `create-react-app`, [follow these instructions](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Getting-Started-with-UI-Fabric#create-react-app).

### Integrating in your project

How to integrate components into your project depends heavily on your setup. The recommended setup is to use a bundler such as [Webpack](https://webpack.js.org/) which can resolve NPM package imports in your code and bundle only the specific things you import.

Within an npm project, you should install the package and save it as a dependency:

```
npm install --save office-ui-fabric-react
```

This will add the package as a dependency in your `package.json` file and download it under `node_modules/office-ui-fabric-react`.

The library includes ES2015 module entry points under the `lib` folder (use `lib-amd` if you need AMD, or `lib-commonjs` if you need commonjs). To use a control, import it and then use it in your render method:

```js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

ReactDOM.render(<PrimaryButton>I am a button.</PrimaryButton>, document.body.firstChild);
```

### Version policy

Fabric React adheres to [semantic versioning](http://www.semver.org/). However, we only consider constructs directly importable at the package level or from files at the root (e.g. `office-ui-fabric-react/lib/Utilities` or `office-ui-fabric-react/lib-amd/Styling`) to be part of our API surface. Everything else is considered package-internal and may be subject to changes, moves, renames, etc.

### Browser support

Fabric React supports all evergreen browsers, with IE 11 as the min-bar version of Internet Explorer. See the [browser support doc](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Browser-Support) for more information.

### Right-to-left support

All components can render in LTR or RTL, depending on the `dir` attribute set on the `html` element (`dir="rtl"` will flip the direction of everything). You can also use the `setRTL` API if you don't have control over the `html` element's rendering. Example:

```tsx
import { setRTL } from 'office-ui-fabric-react/lib/Utilities';

setRTL(true);
```

### Server-side rendering

Fabric components can be rendered in a server-side Node environment (or used in tests which run in an SSR-like environment), but it requires customizing how styles and SCSS files are loaded. See the [server-side rendering documentation](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Server-side-rendering-and-browserless-testing) for examples of how to handle this.

### Advanced usage

For info about advanced usage including module- vs. path-based imports, using an AMD bundler like RequireJS, and deployment features, see our [advanced documentation](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Advanced-Usage).

## Contribute to Fabric React

Please take a look at our [contribution guidelines](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Contributing) for more info. Also read [Contribute bug fixes](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Bug-Fixes) and [Contribute new component](https://github.com/OfficeDev/office-ui-fabric-react/wiki/New-Components).

## Building the repo

Before you get started, **make sure you have read the [Git branch setup instructions](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Setup)**

To view the documentation including examples, contracts, component status, and to add functionality or fix issues locally, you can:

1. `git clone https://github.com/OfficeDev/office-ui-fabric-react.git`
2. `cd office-ui-fabric-react`
3. `yarn`
4. `yarn builddemo`
5. `yarn start`

This will start a demo page from the office-ui-fabric-react package folder, which will open a web browser with the example page. You can make changes to the code which will automatically build and refresh the page using live-reload.

To build and run tests for all packages in the repo, run `yarn build` from the root.

To build individual packages within the `packages/*` or `apps/*` folders, `cd` to the relevant folder and run `yarn build`. Note that because the packages are symlinked together, you must manage building dependencies in the right order, or use the `yarn buildto` script to build to the specific package you want.

#### Advanced build commands

There are more advanced build commands listed in the [Build Commands](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Build-Commands) wiki page.

### Testing

For info about testing, see our [testing documentation](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Testing).

## Licenses

All files on the Office UI Fabric React GitHub repository are subject to the MIT license. Please read the License file at the root of the project.

Usage of the fonts and icons referenced in Office UI Fabric is subject to the terms of the [assets license agreement](https://aka.ms/fabric-assets-license).

## Changelog

We use [GitHub Releases](https://github.com/blog/1547-release-your-software) to manage our releases, including the changelog between every release. View a complete list of additions, fixes, and changes on the [releases](https://github.com/OfficeDev/office-ui-fabric-react/releases) page.

---

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
