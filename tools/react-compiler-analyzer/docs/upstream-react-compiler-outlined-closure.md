# React Compiler outlines a `useState` initializer past its captured scope

**Target:** [facebook/react](https://github.com/facebook/react/issues) — `babel-plugin-react-compiler`
**Status:** not yet filed
**Found by:** `@fluentui/react-compiler-analyzer` rollout, reported from a downstream app

---

## Summary

In the bounded integration reproduction, when a factory returns a component **defined as an arrow
function** and its `useState` initializer closes over a factory parameter, Babel, native SWC, and
Oxc all emit an outlined initializer that references the parameter at **module scope**. Evaluating
the emitted function produces `ReferenceError: factory is not defined`. A function-declaration
control keeps the helper inside the factory and does not throw under the same test harness.

This is a measured, source-specific reproduction—not a claim of general parity. Babel and Oxc
report compile success for the arrow form; native SWC has no acceptance telemetry in this harness.
The runtime check uses TypeScript lowering and stubs for hooks, cache, and JSX, not a React renderer
or a consumer build.

## Original report environment

| Package                       | Version  |
| ----------------------------- | -------- |
| `babel-plugin-react-compiler` | `1.0.0`  |
| `@babel/core`                 | `7.29.6` |
| `react`                       | `19.2.0` |

Compiler options: `{ panicThreshold: 'none' }` (defaults otherwise; `compilationMode: 'infer'`).

## Live bounded harness environment

The current three-way fixture records resolved versions and native bindings in its generated
evidence. The validated run used:

| Package                       | Version                         |
| ----------------------------- | ------------------------------- |
| `babel-plugin-react-compiler` | `1.0.0`                         |
| `@babel/core`                 | `7.29.7`                        |
| `@swc/core`                   | `1.15.47`                       |
| `oxc-transform-react`         | `0.156.0`                       |
| `oxc-parser`                  | `0.156.0`                       |
| TypeScript runtime harness    | `5.7.3`                         |
| Oxc binding                   | native (`aarch64-apple-darwin`) |

The harness transpiles output to CommonJS/ES2020 with TypeScript and stubs `useState`,
`createElement`, and compiler-cache calls. The binding target is platform-dependent and is recorded
in each fixture's evidence.

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

`_temp` must be placed inside `createLazy`, where `factory` is in scope. In the bounded harness, all
three backends do this for the function-declaration control.

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

The live harness directly tests both forms. The arrow reproduction throws for Babel, SWC, and Oxc;
the function-declaration control does not throw for those same versions. This isolates a measured
function-form difference without implying that other source shapes or compiler versions behave the
same way.

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

The original Babel report and the bounded current harness show why this is hard to catch:

| Layer                          | Result                                                   |
| ------------------------------ | -------------------------------------------------------- |
| TypeScript                     | passes — the **source** is valid                         |
| Babel and Oxc analyzer         | report `CompileSuccess` for the arrow reproduction       |
| Native SWC                     | emits output; it has no acceptance telemetry here        |
| `node --check` / bundler parse | passes — the **output** is syntactically valid           |
| Bundlers                       | no error; an unbound identifier is a legal global lookup |
| Bounded runtime harness        | all three emitted outputs throw `ReferenceError`         |

`panicThreshold` does not help: it governs errors the compiler _detects_, and the compiler does not
consider this an error. In the reporting app this reached production behaviour and cost roughly a
day to isolate.

## Suggested fix

When outlining a function body, verify that every free variable of the outlined body is still bound
at the chosen insertion point; if not, insert into the nearest enclosing scope that binds them (the
behaviour already exhibited for function-declaration components).

A cheap defensive check for the compiler's own test suite: after codegen, assert that the emitted
program introduces no unbound identifiers relative to the input program. The original reporter
prototyped this (diff `Program.scope.globals` between input and output, minus standard built-ins)
and measured **0 false positives across 948 real source files**, while catching both shapes above.

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
