# @fluentui/react-conformance-griffel

A set of conformance tests for `@griffel/react`. Intended to be used with `@fluentui/react-conformance`.

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
