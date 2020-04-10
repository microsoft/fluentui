# TSLint standard rules

This project contains the baseline standard TSLint rules for [Fluent UI](https://developer.microsoft.com/en-us/fluentui) ([formerly Office UI Fabric React](https://developer.microsoft.com/en-us/office/blogs/ui-fabric-is-evolving-into-fluent-ui/)) projects.

## Using tslint-rules

This project extends the [tslint-microsoft-contrib](https://github.com/Microsoft/tslint-microsoft-contrib) and [tslint-react](https://github.com/palantir/tslint-react) rules, both of which are included in the package dependencies.

### NPM Setup

For manual lint, add the following under scripts within `package.json`, and just run `npm run lint` or `yarn lint` to get a quick console lint report.

```json
{
  "scripts": {
    "lint": "tslint --project tsconfig.json --config tslint.json -t stylish -r node_modules/tslint-microsoft-contrib"
  }
}
```

### VSCode Setup

Using Visual Studio Code, make sure the [TSLint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint) Extension is installed from VSCode, and update the projects workspace settings, located at `.vscode/settings.json`

```json
{
  "editor.tabSize": 2,
  "editor.detectIndentation": false,
  "files.trimTrailingWhitespace": true,
  "editor.renderWhitespace": "all",
  "editor.insertSpaces": true,
  "typescript.format.insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces": false,
  "typescript.tsdk": "./node_modules/typescript/lib",
  "tslint.enable": true,
  "tslint.rulesDirectory": "./node_modules/tslint-microsoft-contrib",
  "tslint.autoFixOnSave": false,
  "tslint.alwaysShowStatus": true
}
```

### Project Setup

The project should have a valid `tslint.json` which looks like the following. Rules could be overridden if included in the `rules` section.

```json
{
  "extends": ["@uifabric/tslint-rules"],
  "rules": {}
}
```

### Webpack Setup

Adding this plugin/rule will add more time to your build since it will spawn tslint in addition to the one in vscode, if you are not using VS Code then this will be great in your workflow.

You can use [tslint-webpack-plugin](https://github.com/jrparish/tslint-webpack-plugin)

```js
var webpackConfig = {
  plugins: [
    new TSLintPlugin({
      files: ['./src/**/*.ts', './src/**/*.tsx'],
      emitErrors: true,
      config: './tslint.json',
      project: './tsconfig.json',
      format: 'stylish',
      rulesDirectory: './node_modules/tslint-microsoft-contrib',
    }),
  ],
};
```

Or you can use [tslint-loader](https://github.com/wbuchwalter/tslint-loader)

```js
var webpackConfig = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader',
            options: {
              emitErrors: true,
              tsConfigFile: 'tsconfig.json',
              configFile: './tslint.json',
              rulesDirectory: './node_modules/tslint-microsoft-contrib',
            },
          },
        ],
      },
    ],
  },
};
```
