# RFC: Handle keyboard keys in more modern and tree shakeable way

@ling1726

## Summary

Proposes to break the dependency of any v9 packages on `@fluentui/keyboard-key` since it is not a converged package and can increase bundle size.
Also proposes to stop using `keyCode` in v9 components and start using `key`.

## Problem statement

```typescript
import { ArrowLeftKey } from '@fluentui/keyboard-key';

console.log(ArrowLeftKey);
```

The above code will increase the bundle size by **2kb** minified and **1.0kb** gzipped. Looking at the output, every single key is retained in the bundle. The measurement was done using the bunde-size tool implemented as a part of [#17697](https://github.com/microsoft/fluentui/issues/17697).

According to [MDN](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode) `keyCode` has been deprecated from some time and developers should prefer to use `e.key` which takes into consideration modifier keys and the locale and layout. IE11 handles the values differently to other evergreen browsers, a few examples:

| Everyone else | IE11     |
| ------------- | -------- |
| ArrowDown     | Down     |
| Escape        | Esc      |
| ' '           | Spacebar |

The `getCode` and `getKey` helpers in the `@fluentui/keyboard-key` package no longer provide value since IE11 became the oldest supported browser. In practice `e.which` or `e.code` are no longer used. Any event handler logic can easily rely on either `e.key` or `e.keyCode` values without an extra layer of validation.

## Detailed Design or Proposal

### Remove dual v8/v9 dependency on `@fluentui/keyboard-key`

Since there are v9 components now being used in HVCs and products, this might be difficult since this could result in a breaking change in terms of dependencies.

### Create new package

We could create a new `@fluentui/react-keyboard-key` (naming flexible from this RFC) package to store these constants. The one advantage this would have over the previous option is more readable imports:

```typescript
import { ArrowDown, Escape } from '@fuentui/react-keyboard-key';
```

instead of

```typescript
import { ArrowDown, useIsomorphicLayoutEffect, Escape, useEventCallback } from '@fuentui/react-utilities';
```

This new package will only contain constants that will be used in comparisons in event handlers. Utility functions such as `getCode` and `getKey` in the current `@fluentui/keyboard-key` package will not be supported in the new package.

### Use e.key

Since we no longer target support for IE11, the usage of `e.key` is simplified and no longer needs to have special handling for IE11. We can modify an existing package or create a new one that simply stores all of the keys as constants which are easily tree shaken.

A list of support for `key` [can be found in MDN](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key#browser_compatibility)

### Compatibility with e.keyCode

In order to comfortably use both `key` and `keyCode` during a transition phase and also in the future if we ever find out one might be preferrable to another, we should implement the new package to be compatible with both. This can be done with a `key` and `keycode` naming convention.

```typescript
import { ArrowDownKey, ArrowDownKeyCode } from '@fluentui/react-keyboard-key';
```

## Pros and Cons

### Pros

- Continues our original objective of separating v8 and v9 dependencies
- Stop using deprecated properties
- Result in a ~2kb minified size decrease for every package that uses keyboard-key (all of them)
  - In practice in Fluent we only use a small set of keys

### Cons

- Managing the dependency issues in HVCs and products that have mismatching versions of fluent packages that depend on keyboard-key
  - Continuously apologizing

## Discarded solutions

### Option 1: Keep using keyboard-key

We can copy the contents of keyboard-key internally into the v8 `react` folder. We have already done this previously with v7. This lets us modify keyboard-key freely without breaking v8.

However this will be messy as products migrate to v9. For example teams has a specific yarn resolution to a version of `@fluentui/keyboard-key`

### Option 2: Use existing package (i.e. react-utilities)

Since we expect any new form key(code)s to be easily tree shakeable we can simply use an existing package like `@fluentui/react-utilities` to store the next tree-shakeable iteration of these key(code)s.

If following semver, this would not result in a major bump of the package and should be updated without too many problems by partners.

> NOTE: we do not currently use semver, so we might not have this advantage while in alpha
