# @fluentui/react-conformance-griffel

A set of conformance tests for `@griffel/react`. Intended to be used with `@fluentui/react-conformance`.

> These tests apply to components that still compose their class names with Griffel's
> `mergeClasses()`. Components converted to CSS Modules compose with `clsx`, where argument order
> carries no cascade meaning — they disable `make-styles-overrides-win` and enable
> `classname-overrides-win` from `@fluentui/react-conformance` instead, which asserts the
> cascade-native contract. See that package's README.

## Usage

```ts
import { isConformant } from '@fluentui/react-conformance';
import griffelTests from '@fluentui/react-conformance-griffel';

isConformant({
  Component,
  extraTests: griffelTests,
});
```

Please make sure this package is being used with `@fluentui/react-conformance` if you do use this package without the
conformance test runner, you will have problems with missing types. To resolve, just install `@fluentui/react-conformance`
as a dev dependency or a dependency.

## Tests

### `classname-wins`

A conformance test for mergeClasses() that ensures that a classname from props is passed as a last param.

```ts
// ✅ good
mergeClasses(classes.root, 'foo', props.className);
// ❌ bad
mergeClasses(classes.root, props.className, 'foo');
```
