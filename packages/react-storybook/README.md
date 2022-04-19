# @fluentui/react-storybook

**Storybook addons and utils for Fluent UI React [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

> ⚠️ This is not production-ready and **should never be used in product**.

## Install

```sh
yarn add -D @fluentui/react-storybook

# you'll need to install following storybook packages on your own as they are peerDependencies

yarn add -D @storybook/addons @storybook/addon-knobs
```

## Usage

You need to register fluentui decorators on your particular level (global/story/component story).

```js
// @filename: .storybook/preview.js

import { withKnobs } from '@storybook/addon-knobs';
import { withStrictMode } from '@fluentui/react-storybook';

// Register decorators on global level
export const decorators = [withKnobs, withStrictMode];
```
