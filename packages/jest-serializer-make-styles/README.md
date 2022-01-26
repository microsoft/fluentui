# @fluentui/jest-serializer-make-styles

Provides a Jest serializer for `@fluentui/make-styles` which removes class names.

## Overview

When using Jest snapshot testing with components that use `@fluentui/make-styles`, class names will be
rendered as such:

```html
<div className="static-class __1qdh4ig f16th3vw frdkuqy0 fat0sn40 fjseox00">Hello world</div>
```

Using this serializer, the generated class names will be stripped

```html
<div className="static-class">Hello world</div>
```

This means that your tests can pass reliably (no generated class names) and your rules get included in the snapshot. (Snapshots doesn't need update when css is altered.)

## Usage

Add it as a dependency

```shell
yarn --dev @fluentui/jest-serializer-make-styles
# or
npm -D @fluentui/jest-serializer-make-styles
```

Update your jest.config.js (or appropriate config location). Include a `snapshotSerializers` array that references this package:

```js
module.exports = {
  snapshotSerializers: ['@fluentui/jest-serializer-make-styles'],
};
```
