# @fluentui/make-styles-webpack-loader

A loader for Webpack 5 that performs build time transforms for [`@fluentui/react-make-styles`](../react-make-styles).

## Install

```bash
yarn add @fluentui/make-styles-webpack-loader
```

## Usage

Webpack documentation: [Loaders](https://webpack.js.org/loaders/)

Within your webpack configuration object, you'll need to add the `@fluentui/make-styles-webpack-loader` to the list of modules, like so:

```javascript
module: {
  rules: [
    {
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: '@fluentui/make-styles-webpack-loader',
      },
    },
  ];
}
```

## Troubleshooting

Under hood `@fluentui/make-styles-webpack-loader` uses `@fluentui/babel-make-styles`(../babel-make-styles), please check "Troubleshooting" there.
