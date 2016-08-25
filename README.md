# [Office UI Fabric React](http://dev.office.com/fabric)

##### The React-based front-end framework for building experiences for Office and Office 365.

Fabric React is a responsive, mobile-first collection of robust components designed to make it quick and simple for you to create web experiences using the Office Design Language.

**This project is in a pre-v1 state**, so we encourage you to check out the [Roadmap](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/ghdocs/ROADMAP.md) to see what the v1 we're working towards entails and what this means for your usage of the controls set.

## Contents

- [View the docs](#view-the-docs)
- [Get started](#get-started)
- [Advanced usage](#advanced-usage)
- [Roadmap](#roadmap)
- [Contribute to Fabric React](#contribute-to-fabric-react)
- [Licenses](#licenses)
- [Changelog](#changelog)


## View the docs

Before you get started, make sure you have [node.js](https://nodejs.org/), [gulp](http://gulpjs.com/), and [git](https://git-scm.com/) installed. To view the documentation including examples, contracts, component status, and to add functionality or fix issues locally, you can:

1. `git clone https://github.com/OfficeDev/office-ui-fabric-react.git`
2. `npm install`
3. `gulp serve`

This will open a web browser with the example page. You can make changes to the code which will automatically build and refresh the page using live-reload.


## Get started

### Tutorial
[Here is a step by step tutorial](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/ghdocs/Tutorial.md) on how to build a simple React app with an Office UI Fabric React component.

### Integrate into an existing project
Integrating components into your project depends heavily on your setup. The recommended setup is to use a bundler such as Webpack which can resolve NPM package imports in your code and can bundle the specific things you import.

Within an npm project, you should install the package and save it as a dependency:

```
npm install --save office-ui-fabric-react
```

This will add the fabric-react project as a dependency in your package.json file, and will drop the project under node_modules/office-ui-fabric-react.

The library includes commonjs entry points under the lib folder. To use a control, you should be able to import it and use it in your render method:

```
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button } from 'office-ui-fabric-react/lib/Button';

const MyPage = () => (<div><Button>I am a button.</Button></div>);

ReactDOM.render(<MyPage />, document.body.firstChild);
```

## Advanced usage

For advanced usage including info about module vs. path-based imports, using an AMD bundler like Require, and deployment features, see our [advanced documentation](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/ghdocs/ADVANCED.md).


## Roadmap

As mentioned above, the project is currently in a **pre-v1 state**. Components will be in varying states with the end goal being keyboard accessible, screen reader friendly, RTL friendly, and themeable controls. To see details about the components and the desired goal, please check out the [Roadmap](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/ghdocs/ROADMAP.md).


## Contribute to Fabric React

We're excited to share our development of this project with folks outside of the company, but please keep in mind that we're moving towards a v1 state which requires that we stay focused on reaching that goal. With this in mind, take a look at our [contribution guidelines](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/ghdocs/CONTRIBUTING.md) for more info on how we plan to look at issues, how to structure your commit messages, and more.


## Licenses

All files on the Office UI Fabric React GitHub repository are subject to the MIT license. Please read the License file at the root of the project.

Usage of the fonts referenced in Office UI Fabric files is subject to the [license](http://appsforoffice.microsoft.com/fabric/Segoe_UI_and_Fabric_CDN_License.txt).


## Changelog

We use [GitHub Releases](https://github.com/blog/1547-release-your-software) to manage our releases, including the changelog between every release. View a complete list of additions, fixes, and changes on the [releases](https://github.com/OfficeDev/office-ui-fabric-react/releases) page.

- - -

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
