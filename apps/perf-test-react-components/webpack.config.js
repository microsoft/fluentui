// @ts-check
const path = require('path');
const { rules, registerTsPaths } = require('@fluentui/scripts-storybook');

const tsConfigPath = path.resolve(__dirname, '../../tsconfig.base.json');

// The issue here is making readable Flamegraphs that don't have complicated paths like:
//  ~Fabric.../../packages/react/lib/components/DetailsList/DetailsRow.base.js.DetailsRowBase.render
// But rather show paths like:
//  ~DetailsRowBase.render (22.16%, 168 samples)
// The only way found to do this so far has been to use a webpack serve config for bundling.
// TODO: Should root cause why this only works as a serve config.
const config = /** @type {import('webpack').Configuration}*/ ({
  mode: 'production',
  target: ['web', 'es5'],
  // The shared Tailwind theme emission loads first: compiled `*.module.css` utilities
  // reference `var(--spacing, calc(1px * var(--base-scale)))`, so without this entry every
  // numeric utility is invalid at computed-value time and converted components render
  // unstyled in perf scenarios. `rules.tailwindThemeRule` below routes it through the same
  // Tailwind PostCSS pass the storybooks use.
  entry: [rules.tailwindThemeEntry, './src/app.tsx'],
  output: {
    filename: 'perf-test.js',
    libraryTarget: 'umd',
    path: path.join(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  devtool: 'eval',
  module: {
    // `cssModulesRule` resolves `*.module.css` (converted components and the MakeStyles
    // scenario) with the same getLocalIdent/PostCSS chain as every storybook in the repo;
    // `tailwindThemeRule` owns the theme entry added above. The plain `cssRule` must stop
    // matching both so they are not double-processed as global CSS (which would also emit
    // the theme entry's `@import … source(none)` verbatim).
    rules: [
      { ...rules.cssRule, exclude: [/\.module\.css$/, /[\\/]tailwind-theme\.css$/] },
      rules.cssModulesRule,
      rules.tailwindThemeRule,
      rules.scssRule,
      rules.tsRule,
    ],
  },
});

module.exports = registerTsPaths({ config, configFile: tsConfigPath });
