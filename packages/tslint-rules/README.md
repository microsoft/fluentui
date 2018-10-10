# TSLint standard rules

This project contains the baseline standard tslint rules for UI Fabric projects.

## Using tslint-rules

### Install Dependencies
We are using the [tslint-microsoft-contrib](https://github.com/Microsoft/tslint-microsoft-contrib) with additional rules. The following packages are needed.
```
yarn add -D tslint tslint-react tslint-microsoft-contrib
```

### NPM Setup
For manual lint, add the following under scripts within `package.json`, and just run `npm run lint` or `yarn lint` to get a quick console lint report.

```json
{
  "scripts": {
    "lint": "tslint --project tsconfig.json --config tslint.json -t stylish -r node_modules/tslint-microsoft-contrib"
  }
}
```

### VSCode Setup
Using Visual Studio Code, the following settings will make the codebase more consistent. Add workspace settings to the following location `.vscode/settings.json`, the tslint rules are defined at the end.

```json
{
  "editor.tabSize": 2,
  "editor.detectIndentation": false,
  "files.trimTrailingWhitespace": true,
  "editor.renderWhitespace": "all",
  "editor.insertSpaces": true,
  "files.exclude": {
    "**/.git": true,
    "**/.DS_Store": true,
    "**/coverage": true
  },
  "files.watcherExclude": {
    "**/.git": true,
    "**/node_modules": true,
    "**/dist": true,
    "**/coverage": true
  },
  "search.exclude": {
    "common": true,
    "**/node_modules": true,
    "**/dist": true
   },
  "editor.wordWrap": "wordWrapColumn",
  "editor.wordWrapColumn": 140,
  "typescript.format.insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces": false,
  "editor.formatOnSave": true,
  "typescript.tsdk": "./node_modules/typescript/lib",
  "tslint.enable": true,
  "tslint.rulesDirectory": "./node_modules/tslint-microsoft-contrib",
  "tslint.autoFixOnSave": false,
  "tslint.alwaysShowStatus": true,
  "tslint.config": "./tslint.json"
}
```

### Project Setup
The project should have a valid `tslint.json` which looks like the following. Rules could be overidden if included in the `rules` section.
```json
{
 "extends": [
 "@uifabric/tslint-rules"
 ],
 "rules": {}
}
```

### Webpack Setup
Adding this plugin/rule will add more time to your build since it will spawn tslint addiontinally to the one in vscode, if you are not using VS Code then this will be great in your workflow.

You can use [tslint-webpack-plugin](https://github.com/jrparish/tslint-webpack-plugin)

```js
var webpackConfig = {
  plugins: [
    new TSLintPlugin({
      files: ['./src/**/*.ts', './src/**/*.tsx'],
      emitErrors: true,
      config: './tslint.json',
      project: './tsconfig.json',
      format: 'stylish',
      rulesDirectory: './node_modules/tslint-microsoft-contrib'
    })
  ]
}
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
              rulesDirectory: './node_modules/tslint-microsoft-contrib'
            }
          }
        ]
      }
    ]
  }
}
```