# Office UI Fabric React - Webpack utilities

This package contains different utilities for optimizing the use of Office UI Fabric React for the [Webpack](https://webpack.js.org) bundler.

## Installation

To use any of these Webpack utilities, you must install it into your project:

`npm i -D @uifabric/webpack-utils`

or

`yarn add -D @uifabric/webpack-utils`

## Fabric Async Loader

This is a Webpack loader that will automatically perform code splitting with no code changes needed on the Fabric or the application side. It accomplishes this through the Webpack loader mechanism filtered through the `include` property. To use this, modify your `webpack.config.js` like so:

```js
module.exports = {
  ...,
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        include: require('@uifabric/webpack-utils/lib/fabricAsyncLoaderInclude'),
        loader: '@uifabric/webpack-utils/lib/fabricAsyncLoader.js',
        options: {
          ...
        }
      },
    ...
  }
};
```

## Loader Options (Webpack 4 only)

- `chunkName`: the generated file name will be based on this setting
- `prefetch`: translates to the webpackPrefetch magic comment
- `preload`: translates to the webpackPreload magic comment

### Credits

Thanks to:

- [react-loadable](https://github.com/jamiebuilds/react-loadable) by @jamiebuilds who created a delay loaded component
- [react-loadable-loader](https://github.com/baflo/react-loadable-loader) by @baflo who inspired this project; Fabric modified that implementation to work with non-default exports
