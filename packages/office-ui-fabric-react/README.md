# [Office UI Fabric React](http://dev.office.com/fabric)

##### The React-based front-end framework for building experiences for Office and Office 365.

[![npm version](https://badge.fury.io/js/office-ui-fabric-react.svg)](https://badge.fury.io/js/office-ui-fabric-react)
[![Build Status](https://uifabric.visualstudio.com/fabricpublic/_apis/build/status/office-ui-fabric-react%20-%20PR?branchName=master)](https://uifabric.visualstudio.com/fabricpublic/_build/latest?definitionId=84&branchName=master)

Fabric React is a responsive, mobile-first collection of robust components designed to make it quick and simple for you to create web experiences using the Office Design Language.

## Contents

- [Get started](#get-started)
- [Documentation](#documentation)
- [Testing](#testing)
- [Advanced usage](#advanced-usage)
- [Browser support](#browser-support)
- [Contribute](#contribute)
- [Licenses](#licenses)
- [Changelog](#changelog)

## Get started

### Tutorial

[Here is a step by step tutorial](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Sample-App) on how to build a simple React app with an Office UI Fabric React component.

### Integrate into an existing project

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
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

const MyPage = () => <DefaultButton>I am a button</DefaultButton>;

ReactDOM.render(<MyPage />, document.body.firstChild);
```

## Rendering Fabric components on the server (SSR)

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
    <style>${_allStyles}</style>
  </head>
  <body>
    ${body}
  </body>
  </html>
  `
);
```

Note: we are evaluating a more robust theming and style loading approach, which will allow a much more flexible server rendering approach, so this syntax may be simplified in the future.

## Documentation

To learn more about how to use the components in your application visit the [Office UI Fabric website](https://developer.microsoft.com/en-us/fabric#/components). If you are looking to create a new fabric component, or contribute to the project, the developer documentation can be found in [our Wiki](https://github.com/OfficeDev/office-ui-fabric-react/wiki).

## Testing

For testing see our [testing documentation](https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react#testing).

## Advanced usage

For advanced usage including info about module vs. path-based imports, using an AMD bundler like Require, and deployment features, see our [advanced documentation](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Advanced-Usage).

## Browser support

Fabric React supports many commonly used browsers. See the [browser support doc](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Browser-Support) for more information.

## Contributing

We're excited to share our development of this project with folks outside of the company, but please keep in mind that we're moving towards a v1 state which requires that we stay focused on reaching that goal. With this in mind, take a look at our [contribution guidelines](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Contributing) for more info on how we plan to look at issues, how to structure your commit messages, and more.

## Licenses

All files on the Office UI Fabric React GitHub repository are subject to the MIT license. Please read the License file at the root of the project.

Usage of the fonts and icons referenced in Office UI Fabric is subject to the terms of the [assets license agreement](http://aka.ms/fabric-assets-license).

## Changelog

We use [GitHub Releases](https://github.com/blog/1547-release-your-software) to manage our releases, including the changelog between every release. View a complete list of additions, fixes, and changes on the [releases](https://github.com/OfficeDev/office-ui-fabric-react/releases) page.

---

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
