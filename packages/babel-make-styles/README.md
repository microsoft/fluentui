# @fluentui/babel-make-styles

A Babel plugin that performs build time transforms for [`@fluentui/react-make-styles`](../react-make-styles).

## Install

```bash
yarn add @fluentui/babel-make-styles
```

## Usage

`.babelrc`

```json
{
  "plugins": ["module:@fluentui/babel-make-styles"]
}
```

### Import `makeStyles()` from custom packages

```js
import { makeStyles } from 'custom-package';
// 👇 custom import names are also supported
import { createStyles } from 'custom-package';
```

By default plugin handles imports from `@fluentui/react-components` & `@fluentui/react-make-styles`, to handle imports from custom packages settings should be tweaked:

```json
{
  "plugins": [
    [
      "module:@fluentui/babel-make-styles",
      {
        "modules": [{ "moduleSource": "custom-package", "importName": "makeStyles" }]
      }
    ]
  ]
}
```

> NOTE: "custom-package" should re-export `__styles` function from `@fluentui/react-make-styles`

### Configuring Babel settings

If you need to specify custom Babel configuration, you can pass them to `babelOptions`. These options will be used by the plugin when parsing and evaluating modules.

```json
{
  "plugins": [
    [
      "module:@fluentui/babel-make-styles",
      {
        "babelOptions": {
          "plugins": ["@babel/plugin-proposal-class-static-block"],
          "presets": ["@babel/preset-typescript"]
        }
      }
    ]
  ]
}
```

## Transforms

This plugin is designed to performed build time transforms for `@fluentui/react-make-styles`, it supports both ES modules and CommonJS thus can be used in post processing after TypeScript, for example.

Transforms applied by this plugin allow to strip runtime part of `makeStyles()` and improve performance.

## Example

Transforms

```js
import { makeStyles } from '@fluentui/react-make-styles';

const useStyles = makeStyles({
  root: { color: 'red' },
});
```

roughly to

```js
import { __styles } from '@fluentui/react-make-styles';

const useStyles = __styles({
  root: {
    /* resolved styles */
  },
});
```

## Troubleshooting

This section focuses mainly on troubleshooting this babel plugin in the [microsoft/fluentui](https://github.com/microsoft/fluentui) repo.
However the concepts are not coupled to the repo setup.

### Linaria

The plugin uses tools from [linaria](https://github.com/callstack/linaria) to evaluate runtime calls of `makeStyles`.
[Linaria's debugging documentation can help here](https://github.com/callstack/linaria/blob/master/CONTRIBUTING.md#debugging-and-deep-dive-into-babel-plugin). Here are a few examples with building packages with linaria debug output.

Directly from the package

```sh
$ DEBUG=linaria\* LINARIA_LOG=debug yarn build
```

Using Lage from the root of the repo

```sh
$ DEBUG=linaria\* LINARIA_LOG=debug yarn lage build --to <package-name>
```

Using `yarn workspace` from the root of the repo

```sh
$ DEBUG=linaria\* LINARIA_LOG=debug yarn workspace <package-name> build
```
On Windows it's required to set environment variables via [`set`](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/set_1) or you can use `cross-env`, for example:

```sh
$ yarn cross-env DEBUG=linaria\* LINARIA_LOG=debug yarn workspace <package-name> build
```
The debug output will include:

- Transformed code
- Evaluated code
- AST that indicates what code has been shaken with `@linaria/shaker`
