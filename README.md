# [Office UI Fabric React](http://dev.office.com/fabric)

##### The React-based front-end framework for building experiences for Office and Office 365.

[![npm version](https://badge.fury.io/js/office-ui-fabric-react.svg)](https://badge.fury.io/js/office-ui-fabric-react)
[![Build Status](https://travis-ci.org/OfficeDev/office-ui-fabric-react.svg?branch=master)](https://travis-ci.org/OfficeDev/office-ui-fabric-react)

Fabric React is a responsive, mobile-first collection of robust components designed to make it quick and simple for you to create web experiences using the Office Design Language.

## Contents

- [Using Fabric React](#using-fabric-react)
- [Browser support](#browser-support)
- [Server-side rendering](#server-side-rendering)
- [Advanced usage](#advanced-usage)
- [Contribute to Fabric React](#contribute-to-fabric-react)
- [Building the repo](#building-the-repo)
- [Testing](#testing)
- [Advanced building tips](#advanced-building-tips)
- [Licenses](#licenses)
- [Changelog](#changelog)

### Using Fabric React

[Here is a step by step tutorial](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/ghdocs/README.md) on how to build a simple React app with an Office UI Fabric React component.

Integrating components into your project depends heavily on your setup. The recommended setup is to use a bundler such as Webpack which can resolve NPM package imports in your code and can bundle the specific things you import.

Within an npm project, you should install the package and save it as a dependency:

```
npm install --save office-ui-fabric-react
```

This will add the fabric-react project as a dependency in your package.json file, and will drop the project under node_modules/office-ui-fabric-react.

The library includes commonjs entry points under the lib folder. To use a control, you should be able to import it and use it in your render method:

```js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button } from 'office-ui-fabric-react/lib/Button';

const MyPage = () => (<div><Button>I am a button.</Button></div>);

ReactDOM.render(<MyPage />, document.body.firstChild);
```

## Browser support

Fabric React supports many commonly used browsers. See the [browser support doc](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/ghdocs/BROWSERSUPPORT.md) for more information.

## Server-side rendering

If you need to render Fabric components on the server side in a node environment, there is a way to do this. The basic idea is that you need to tell the styles loader to pipe styles into a variable, which you can later use to inject into your page. Example:

```ts
import { configureLoadStyles } from '@microsoft/load-themed-styles';

// Store registered styles in a variable used later for injection.
let _allStyles = '';

// Push styles into variables for injecting later.
configureLoadStyles((styles: string) => {
  _allStyles += styles;
});

import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { Button } from 'office-ui-fabric-react/lib/Button';

let body = ReactDOMServer.renderToString(<Button>hello</Button>);

console.log(
  `
  <html>
  <head>
    <style>${ _allStyles}</style>
  </head>
  <body>
    ${ body}
  </body>
  </html>
  `);
```

Note: we are evaluating a more robust theming and style loading approach, which will allow a much more flexible server rendering approach, so this syntax may be simplified in the future.

## Advanced usage

For advanced usage including info about module vs. path-based imports, using an AMD bundler like Require, and deployment features, see our [advanced documentation](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/ghdocs/ADVANCED.md).

## Contribute to Fabric React

We're excited to share our development of this project with folks outside of the company, but please keep in mind that we're moving towards a v1 state which requires that we stay focused on reaching that goal. With this in mind, take a look at our [contribution guidelines](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/ghdocs/CONTRIBUTING.md) for more info on how we plan to look at issues, how to structure your commit messages, and more.

## Building the repo

Before you get started, **make sure you have [node.js](https://nodejs.org/) and [git](https://git-scm.com/) installed.**

To view the documentation including examples, contracts, component status, and to add functionality or fix issues locally, you can:

1. `git clone https://github.com/OfficeDev/office-ui-fabric-react.git`
2. `npm install`
3. `npm start`

This will start a demo page from the office-ui-fabric-react package folder, which will open a web browser with the example page. You can make changes to the code which will automatically build and refresh the page using live-reload.

To build and run tests for all packages in the repo, you can run `npm run build` from the root.

To build individual packages within the `packages/*/` folders, you can use `npm run build` in each individually. Note that because the packages are symlinked together, you must manage building dependencies in the right order, or use the `rush` tool to build to the specific package you want. (See advanced tips below.)

## Testing

For testing see our [testing documentation](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/ghdocs/TESTING.md).

## Advanced building tips

The repo contains many packages, each which may have dependencies on each other. You can use the rush tool to build projects in the correct order, if you have it globally installed.

```bash
npm install -g @microsoft/rush
```

To use rush to build, you can run `rush build`, which will incrementally build the entire repo (only build what has changed since the last build.)

To can also build up to a specific project using the `--to <package>` argument. For example, to build up to `office-ui-fabric-react`, you can run:

```bash
rush build --to office-ui-fabric-react
```

## Licenses

All files on the Office UI Fabric React GitHub repository are subject to the MIT license. Please read the License file at the root of the project.

Usage of the fonts and icons referenced in Office UI Fabric is subject to the terms of the [assets license agreement](http://aka.ms/fabric-assets-license).


## Changelog

We use [GitHub Releases](https://github.com/blog/1547-release-your-software) to manage our releases, including the changelog between every release. View a complete list of additions, fixes, and changes on the [releases](https://github.com/OfficeDev/office-ui-fabric-react/releases) page.

- - -

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
