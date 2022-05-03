# @fluentui/keyboard-keys

Contains a set of keyboard constants for key and keyCode comparison in components. This package contains
**named key values** from [The w3 uievents-key specification](https://www.w3.org/TR/uievents-key/).

Unicode values are not included since there are a lot of locales to consider and they provide no benefit since
unicode characters can be used directly in code.

# Usage

```ts
import { Enter } from '@fluentui/keyboard-keys';

const onKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === Enter) {
    // ...
  }

  // Unicode characters 'a', '1', '%'...
  // should be used directly in code
  if (e.key === 'a') {
    // ...
  }
};
```

## Legacy keyCode

In order to migrate easily from `@fluentui/keyboard-key` legacy `keyCode` support is available in this library but
is not encouraged for reuse since this propoerty has been deprecated for a while and will be removed in future
standards.

```ts
import { keyCodes } from '@fluentui/keyboard-keys';

const onKeyDown = (e: React.KeyboardEvent) => {
  if (e.keyCode === keyCodes.Enter) {
    // ...
  }

  if (e.key === keyCodes.a) {
    // ...
  }
};
```
