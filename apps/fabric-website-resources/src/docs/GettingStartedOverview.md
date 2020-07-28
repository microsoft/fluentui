## Overview

Fluent UI React components are built as production-ready, generalized, documented, and reusable components to be used in Microsoft products. This enables us and our partners to more easily build great applications without spending a ton of time implementing the same things over and over.

Each component is designed to be RTL-friendly, keyboard accessible, screen reader-friendly, themeable, and generalized. TypeScript definition files are also included, so if you use TypeScript (which isn't a requirement), you will get compiler validation and using an editor like VS Code, you'll get intellisense. Each component is exported as a named module that can be easily imported in your code, allowing your external bundler to create small bundles that include just what you need.

## Getting Started

Integrating components into your project depends heavily on your setup. The recommended setup is to use a bundler such as <a href='https://webpack.github.io/' target='_blank' rel='noopener noreferrer'>Webpack</a> which can resolve NPM package imports in your code and can bundle the specific things you import.

Within an npm project, you should install the package and save it as a dependency:

```bash
npm install --save @fluentui/react
```

This will add the `@fluentui/react` project as a dependency in your package.json file, and will drop the project under `node_modules/@fluentui/react`.

The library includes commonjs entry points under the `lib-commonjs` folder. To use a control, you should be able to import it and use it in your render method. Note that wrapping your application in the `<Fabric>` component is required to support RTL, keyboard focus and other features.

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Fabric, DefaultButton } from '@fluentui/react';

const MyPage = () => (
  <Fabric>
    <DefaultButton>I am a button.</DefaultButton>
  </Fabric>
);

ReactDOM.render(<MyPage />, document.body.firstChild);
```

## Notes on module vs path-based imports

While it is possible to import all components as named imports from the main module entry point, it is not recommended to do so without using a bundler that supports es6 tree shaking. In other words, if you import the Button component like this:

```tsx
import { Button } from '@fluentui/react';
```

...this would work, but then unless you are using a tree-shaking bundler such as Rollup.js or Webpack 2, Webpack will assume you want every module exported from the main entry file to be included in your final bundle, which produces unnecessary large bundles and slows your page load down. Instead you can import the specific paths to trim down your bundle size:

```tsx
import { Button } from '@fluentui/react/lib/Button';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { List } from '@fluentui/react/lib/List';
```

## Using an AMD bundler like r.js

If your project relies on AMD modules, they are dropped in the lib-amd folder. You will need to set up your bundler to handle the imports correctly. This may require you to symlink or copy the folder into your pre-bundle location.
