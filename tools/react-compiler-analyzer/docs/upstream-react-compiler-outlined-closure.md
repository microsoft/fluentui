# Upstream: React Compiler outlines a `useState` initializer past its captured scope

**Target:** [facebook/react](https://github.com/facebook/react/issues) — `babel-plugin-react-compiler`
**Status:** not yet filed
**Found by:** `@fluentui/react-compiler-analyzer` rollout, reported from a downstream app

---

## Summary

When a factory function returns a component **defined as an arrow function**, and that component's
`useState` initializer closes over one of the factory's parameters, the compiler outlines the
initializer to **module scope** while leaving the captured binding behind. The emitted code
references an identifier that is not bound in its new scope, producing a `ReferenceError` the first
time the component mounts.

The compiler reports `CompileSuccess`. The emitted code is syntactically valid. Nothing in a normal
build pipeline catches it.

## Environment

| Package                       | Version  |
| ----------------------------- | -------- |
| `babel-plugin-react-compiler` | `1.0.0`  |
| `@babel/core`                 | `7.29.6` |
| `react`                       | `19.2.0` |

Compiler options: `{ panicThreshold: 'none' }` (defaults otherwise; `compilationMode: 'infer'`).

## Reproduction

```tsx
import { useState } from 'react';
declare function canUseDOM(): boolean;
const cache = new Map<unknown, unknown>();

export function createLazy(factory: () => Promise<unknown>) {
  const Cached = () => {
    const [resolved] = useState(() => (canUseDOM() ? cache.get(factory) : undefined));
    return resolved ? <div /> : null;
  };
  Cached.import = factory;
  return Cached;
}
```

### Actual output

```js
import { c as _c } from 'react/compiler-runtime';
import { useState } from 'react';
const cache = new Map();
export function createLazy(factory) {
  const Cached = () => {
    const $ = _c(2);
    const [resolved] = useState(_temp);
    let t0;
    if ($[0] !== resolved) {
      t0 = resolved ? <div /> : null;
      $[0] = resolved;
      $[1] = t0;
    } else {
      t0 = $[1];
    }
    return t0;
  };
  Cached.import = factory;
  return Cached;
}
function _temp() {
  return canUseDOM() ? cache.get(factory) : undefined;
  //                              ^^^^^^^ not bound at module scope
}
```

`_temp` is emitted at module scope, but `factory` is a parameter of `createLazy`. Rendering
`Cached` throws:

```
ReferenceError: factory is not defined
```

### Expected output

`_temp` should be placed inside `createLazy`, where `factory` is in scope — which is exactly what
the compiler does when the component is a **function declaration** instead of an arrow function.

## The differential: arrow function vs. function declaration

The only difference between these two inputs is `const Cached = () => {}` vs `function Cached() {}`.

```tsx
// ❌ BROKEN — `_temp` hoisted to module scope
export function createLazy(factory: () => Promise<unknown>) {
  const Cached = () => {
    const [resolved] = useState(() => (canUseDOM() ? cache.get(factory) : undefined));
    return resolved ? <div /> : null;
  };
  Cached.import = factory;
  return Cached;
}

// ✅ CORRECT — `_temp` placed inside `createLazy`
export function createLazy(factory: () => Promise<unknown>) {
  function Cached() {
    const [resolved] = useState(() => (canUseDOM() ? cache.get(factory) : undefined));
    return resolved ? <div /> : null;
  }
  Cached.import = factory;
  return Cached;
}
```

Emitted tail for the correct case:

```js
export function createLazy(factory) {
  function Cached() {
    /* … */
  }
  function _temp() {
    return canUseDOM() ? cache.get(factory) : undefined; // in scope ✅
  }
  Cached.import = factory;
  return Cached;
}
```

So the outlining destination is chosen correctly for one function form and incorrectly for the
other. This looks like the outlining pass picking an insertion point without checking that the
outlined body's free variables remain bound there.

## It is not limited to one initializer

A `memo(function …)` component closing over two parameters produces **two** dangling references:

```tsx
export function makeLazy(factory: () => Promise<unknown>, other: string) {
  const Inner = memo(function Inner() {
    const [a] = useState(() => (canUseDOM() ? cache.get(factory) : undefined));
    const [b] = useState(() => other.trim());
    return (
      <div>
        {String(a)}
        {b}
      </div>
    );
  });
  Inner.import = factory;
  return Inner;
}
```

```js
export function makeLazy(factory, other) {
  /* … */
  Inner.import = factory;
}
function _temp() {
  return canUseDOM() ? cache.get(factory) : undefined; // unbound
}
function _temp2() {
  return other.trim(); // unbound
}
```

## Why this is hard to catch downstream

Every layer reports success:

| Layer                          | Result                                                   |
| ------------------------------ | -------------------------------------------------------- |
| TypeScript                     | passes — the **source** is valid                         |
| React Compiler                 | logs `CompileSuccess`                                    |
| `node --check` / bundler parse | passes — the **output** is syntactically valid           |
| Bundlers                       | no error; an unbound identifier is a legal global lookup |
| Runtime                        | `ReferenceError` on first mount                          |

`panicThreshold` does not help: it governs errors the compiler _detects_, and the compiler does not
consider this an error. In the reporting app this reached production behaviour and cost roughly a
day to isolate.

## Suggested fix

When outlining a function body, verify that every free variable of the outlined body is still bound
at the chosen insertion point; if not, insert into the nearest enclosing scope that binds them (the
behaviour already exhibited for function-declaration components).

A cheap defensive check for the compiler's own test suite: after codegen, assert that the emitted
program introduces no unbound identifiers relative to the input program. We prototyped exactly this
(diff `Program.scope.globals` between input and output, minus standard built-ins) and measured
**0 false positives across 948 real source files**, while catching both shapes above.

## Workaround for consumers

Convert the returned component from an arrow function to a function declaration, or lift the
`useState` initializer so it does not close over the outer function's parameters:

```tsx
const [resolved] = useState(() => (canUseDOM() ? cache.get(factory) : undefined));
// →
const initial = canUseDOM() ? cache.get(factory) : undefined;
const [resolved] = useState(initial);
```

Or opt the factory out with `'use no memo'`.
