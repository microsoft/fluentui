# @fluentui/babel-preset-global-context

**Babel Preset Global Context for [Fluent UI React](https://react.fluentui.dev)**

Babel preset that transforms createContext calls to use global context shims

## Install

```bash
yarn add --dev @fluentui/babel-preset-global-context
# or
npm install --dev @fluentui/babel-preset-global-context
```

## When to use it?

This preset is mainly inteded for application developers to target specific libraries that use React context
and suffer from the context duplication problem. React contexts are not real singletons and are scoped by module
level. This can cause problems when the context is duplicated in node_modules.

This is a known issue that is by design according to [facebook/react#13346](https://github.com/facebook/react/issues/13346)
that is illustrated in the below example.

```tsx
// my-context-package
import * as React from 'react';

export const MyContext = React.createContext({ foo: 'foo' });

// provider.ts

// node_modules/my-context-package/lib/index.js
import { MyContext } from 'my-context-package';

function Provider({ children }) {
  const ctx = { foo: 'bar' };

  // 1. Instantiate context with value foo='bar'
  return <MyContext.Provider value={ctx}>{children}</MyContext.Provider>;
}

// consumer.ts

// node_modules/nested-dep/node_modules/my-context-package/lib/index.js
import * as React from 'react';
import { MyContext } from 'my-context-package';

function Consumer() {
  // 2. Consume the 'same' context from different module
  const ctx = React.useContext(MyContext);

  // 3. ⚠️ Actual value would be the default 'foo'
  return <div>{ctx.foo}</div>;
}
```

> ⚠️ The recommended solution to the above problem is to make sure that the affected dependency
> only exists once in node_modules. You can do this by upgrading your dependencies or using [resolutions](https://classic.yarnpkg.com/lang/en/docs/selective-version-resolutions/).

This library should only be used as a workaround in the cases where it might not be feasible to deduplicate `node_modules`.

## Usage

Install the shims for `createContext` that will this Babel preset will use to replace original `React.createContext`
calls.

```bash
yarn add @fluentui/global-context
# or
npm install @fluentui/global-context
```

We recommend using this preset with [Webpack](https://webpack.js.org/) and [babel-loader](https://www.npmjs.com/package/babel-loader)
while scoping the transforms to the affected packages.

```js
// weboack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(ts|js|tsx|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@fluentui/babel-preset-global-context']],
          },
        },
        // Targets all @fluentui scoped packages and replaces `createContext` calls with global context
        // Can be setup for other packages
        // /node_modules\/(<packageName>|<pacakgeName>)\/*/
        include: [/node_modules\/@fluentui\/*/],
      },
      {
        test: /\.(ts|tsx)$/i,
        use: ['ts-loader'],
        exclude: ['/node_modules/'],
      },
    ],
  },
};
```
