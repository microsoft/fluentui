# @fluentui/react-conformance-make-styles

A set of conformance tests for `@fluentui/react-make-styles`. Intended to be used with `@fluentui/react-conformance`.

## Usage

```ts
import { isConformant } from '@fluentui/react-conformance';
import makeStylesTests from '@fluentui/react-conformance-make-styles';

isConformant({
  Component,
  extraTests: makeStylesTests,
});
```

## Tests

### `classname-wins`

A conformance test for mergeClasses() that ensures that a classname from props is passed as a last param.

```ts
// ✅ good
mergeClasses(classes.root, 'foo', props.className);
// ❌ bad
mergeClasses(classes.root, props.className, 'foo');
```
