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
    "module:@fluentui/babel-make-styles",
    {
      "modules": [{ "moduleSource": "custom-package", "importName": "makeStyles" }]
    }
  ]
}
```

> NOTE: "custom-package" should re-export `__styles` function from `@fluentui/react-make-styles`

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
