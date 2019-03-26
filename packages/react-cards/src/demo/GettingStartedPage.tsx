/* tslint:disable:jsx-no-multiline-js max-line-length */

import * as React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import './GettingStartedPage.scss';
import { Highlight } from '@uifabric/example-app-base';

export class GettingStartedPage extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div className="ms-GettingStartedPage">
        <div className="ms-GettingStartedPage-banner">
          <h1>Office UI Fabric React Cards!</h1>
          <h3>A library of reusable, generic React components</h3>
        </div>

        <h2>Overview</h2>

        <p>
          Fabric React components are built as production ready components to be used in Microsoft products, but generalized, documented,
          and reusable. This enables us and our partners to more easily build great applications without spending a ton of time implementing
          the same things over and over.`
        </p>

        <p>
          Each component is designed to be RTL friendly, keyboard accessible, screen reader friendly, themeable, and generalized. TypeScript
          definition files are also included, so if you use TypeScript (which isn't a requirement), you will get compiler validation and
          using an editor like VS Code, you'll get intellisense. Each component is exported as a named module that can be easily imported in
          your code, allowing your external bundler to create small bundles that include just what you need.`
        </p>

        <h2>Getting started</h2>

        <p>
          Integrating components into your project depends heavily on your setup. The recommended setup is to use a bundler such as
          <Link href="https://webpack.github.io/" target="_blank">
            Webpack
          </Link>
          which can resolve NPM package imports in your code and can bundle the specific things you import.
        </p>

        <p>Within an npm project, you should install the package and save it as a dependency:</p>

        <div className="ms-GettingStartedPage-code">
          <Highlight className="bash">npm install --save office-ui-fabric-react</Highlight>
        </div>

        <p>
          This will add the fabric-react project as a dependency in your package.json file, and will drop the project under
          node_modules/office-ui-fabric-react.
        </p>

        <p>
          The library includes commonjs entry points under the lib folder. To use a control, you should be able to import it and use it in
          your render method. Note that wrapping your application in the Fabric component is required to support RTL, keyboard focus and
          other features.
        </p>

        <div className="ms-GettingStartedPage-code">
          <Highlight className="typescript">{`
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

const MyPage = () => (<Fabric><DefaultButton>I am a button.</DefaultButton></Fabric>);

ReactDOM.render(<MyPage />, document.body.firstChild);`}</Highlight>
        </div>

        <h2>Notes on module vs path-based imports</h2>
        <p>
          While it is possible to import all components as named imports from the main module entry point, it is not recommended to do so
          without using a bundler that supports es6 tree shaking. In other words, if you import the Button component like this: }
        </p>

        <div className="ms-GettingStartedPage-code">
          <Highlight className="typescript">{`import { Button } from 'office-ui-fabric-react';`}</Highlight>
        </div>

        <p>
          ...this would work, but then unless you are using a tree-shaking bundler such as Rollup.js or Webpack 2, Webpack will assume you
          want every module exported from the main entry file to be included in your final bundle, which produces unnecessary large bundles
          and slows your page load down. Instead you can import the specific paths to trim down your bundle size:
        </p>

        <div className="ms-GettingStartedPage-code">
          <Highlight className="typescript">{`
import { Button } from 'office-ui-fabric-react/lib/Button';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { List } from 'office-ui-fabric-react/lib/List';`}</Highlight>
        </div>

        <h2>Using an AMD bundler like r.js</h2>

        <p>
          If your project relies on AMD modules, they are dropped in the lib-amd folder. You will need to set up your bundler to handle the
          imports correctly. This may require you to symlink or copy the folder into your pre-bundle location.
        </p>
      </div>
    );
  }
}
