# Upstream: `react-compiler-webpack` forces the `jsx` parser plugin on every file

**Target:** [`react-compiler-webpack`](https://github.com/SukkaW/react-compiler-webpack) — `react-compiler-loader`
**Status:** not yet filed
**Found by:** `@fluentui/react-compiler-analyzer` rollout, reported from a downstream app

---

## Summary

The loader appends its own parser plugins **after** the user's, so `jsx` can never be removed. A
`.ts` file containing an angle-bracket type assertion (`<Foo>bar`) is then parsed as JSX and fails
the build, even though the syntax is valid TypeScript.

## Environment

| Package                       | Version  |
| ----------------------------- | -------- |
| `react-compiler-webpack`      | `1.0.0`  |
| `babel-plugin-react-compiler` | `1.0.0`  |
| `@babel/core`                 | `7.29.6` |

## The code

`dist/react-compiler-loader.js`:

```js
const defaultBabelParsePlugins = [
    'jsx',
    'typescript'
];

// …
parserOpts: {
    ...babelTransFormOpt?.parserOpts,
    // override babel parserOpts plugins and add jsx
    plugins: [
        ...babelTransFormOpt?.parserOpts?.plugins || [],
        ...defaultBabelParsePlugins
    ]
},
```

User plugins are spread first and the defaults are appended, so the resulting set is always a
**superset** containing `jsx`. There is no configuration that yields a `jsx`-free parse.

## Why that breaks valid TypeScript

`jsx` and TypeScript's angle-bracket type assertion are mutually ambiguous — this is why
`@babel/preset-typescript` exposes `isTSX` as a per-file switch rather than always enabling both.

```ts
// cast.ts — valid TypeScript
interface Foo {
  a: number;
}
const bar: unknown = { a: 1 };
const foo = <Foo>bar;
export const a = foo.a;
```

Parsed with the loader's effective plugin set:

```
SyntaxError: Unterminated JSX contents. (4:17)
```

Parsed with `['typescript']` only: succeeds.

Because this is a hard parse failure, the file does not merely skip compilation — it fails the
build.

## Impact

The reporting app hit this as a CI failure and restricted the loader's `test` to `.tsx` for most of
an evaluation, excluding **5,373 hook-bearing `.ts` files** from React Compiler coverage. After
preflighting the full app scope with the loader's exact plugin set they measured:

|                    |             |
| ------------------ | ----------- |
| `.ts` files parsed | 42,889      |
| parse failures     | 33 (0.077%) |

Small in absolute terms, but each one is a build break rather than a skipped file, so it cannot be
ignored.

## Requested change

Either of:

1. **Make the default plugin set extension-aware** — enable `jsx` for `.jsx`/`.tsx` (and plain
   `.js`, where JSX is conventional) and omit it for `.ts`/`.mts`/`.cts`. This mirrors
   `@babel/preset-typescript`'s `isTSX` and requires no configuration from consumers.

2. **Let user plugins take precedence** — treat `defaultBabelParsePlugins` as a fallback applied
   only when the user supplies no `parserOpts.plugins`, so opting out is possible.

Option 1 is preferable: it is correct by default, and option 2 still forces every consumer with a
mixed `.ts`/`.tsx` codebase to hand-maintain a plugin list.

## Note for anyone building similar tooling

We had the identical defect in our own analyzer — it set
`isTSX: ext === '.tsx' || ext === '.ts'`, silently making every `.ts` file with an angle-bracket
cast unparseable, in both the compile pass and the cross-file resolver. Fixed by keying `isTSX`
strictly to the `.tsx` extension. Files that still fail to parse are now reported explicitly rather
than dropped, since a shrinking function count is otherwise indistinguishable from clean code.
