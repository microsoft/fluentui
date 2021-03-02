# @fluentui/jest-serializer-merge-styles

Provides a Jest serializer for `@fluentui/merge-styles` which expands class names into css rules.

## Overview

When using Jest snapshot testing with components that use `@fluentui/merge-styles`, class names may be rendered as such in the snapshot (Note the `css-2342` generated class name):

```
<div className='ms-Foo css-2432'>
  Hello world
</div>
```

Using this serializer, the generated `css-2342` class name will be auto expanded to the rules resolved by merge-styles:

```
<div
  className=
      ms-Foo
      {
        background-color: #f4f4f4;
        box-sizing: border-box;
        color: #333333;
        cursor: pointer;
      }
      &:hover {
        background-color: #f8f8f8;
      }
>
  Hello world
</div>
```

This means that your tests can pass reliably (no generated class names) and your rules get included in the snapshot. (Snapshots need updates when css is altered.)

## Usage

In your jest.config.js (or appropriate config location) include a `snapshotSerializers` array that references this package:

```js
module.exports = {
  snapshotSerializers: [path.resolve(__dirname, 'jest-serializer-merge-styles')],
};
```

See [Testing](https://github.com/microsoft/fluentui/wiki/Testing) for more detailed usage.
