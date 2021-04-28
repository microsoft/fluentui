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
  "plugins": ["@fluentui/babel-make-styles"]
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
