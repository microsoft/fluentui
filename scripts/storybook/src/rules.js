/**
 * @type {import("webpack").RuleSetRule}
 */
const tsRule = {
  test: [/\.tsx?$/],
  use: {
    loader: 'swc-loader',
    options: {
      jsc: {
        target: 'es2015',
        parser: {
          syntax: 'typescript',
          tsx: true,
          decorators: true,
          dynamicImport: true,
        },
        transform: {
          decoratorMetadata: true,
          legacyDecorator: true,
        },
        keepClassNames: true,
        externalHelpers: true,
        loose: true,
      },
    },
  },
};

/**
 * @type {import("webpack").RuleSetRule}
 */
const cssRule = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
};

/**
 * v8 uses SCSS/CSS modules
 * @type {import("webpack").RuleSetRule}
 */
const scssRule = {
  test: /\.scss$/,
  enforce: 'pre',
  exclude: [/node_modules/],
  use: [
    {
      // creates style nodes from JS strings
      loader: '@microsoft/loader-load-themed-styles',
    },
    {
      // translates CSS into CommonJS
      loader: 'css-loader',
      options: {
        esModule: false,
        modules: true,
        importLoaders: 2,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
      },
    },
    {
      loader: 'sass-loader',
    },
  ],
};

/**
 *
 * @type {import("webpack").RuleSetRule}
 */
const griffelRule = {
  test: /\.tsx?$/,
  exclude: [/node_modules/],
  enforce: 'post',
  use: [
    {
      loader: '@griffel/webpack-loader',
      options: {
        babelOptions: {
          presets: ['@babel/preset-typescript'],
        },
      },
    },
  ],
};

exports.tsRule = tsRule;
exports.scssRule = scssRule;
exports.cssRule = cssRule;
exports.griffelRule = griffelRule;
