# RFC: Baseline "Widely Available" & ES2022 for Fluent v9

<!--
An RFC can be anything. A question, a suggestion, a plan. The purpose of this template is to give some structure to help folks write successful RFCs. However, don't feel constrained by this template; use your best judgement.

Tips for writing a successful RFC:

- Simple plain words that make your point, fancy words obfuscate
- Try to stay concise, but don't gloss over important details
- Try to write a neutral problem statement, not one that motivates your desired solution
- Remember, "Writing is thinking". It's natural to realize new ideas while writing your proposal
-->

---

Contributors: @Hotell

_Feb 2026_

<!-- If substantial updates are made add an "Updated on: $date" below, don't replace the original date -->

> **Supersedes:** [06-browser-support-for-v9.md](./06-browser-support-for-v9.md)

## Summary

This RFC replaces the static flex-gap-based browser version matrix introduced in RFC #06 with the [web.dev Baseline "Widely Available"](https://web.dev/baseline) standard as the single source of truth for Fluent v9 browser support.

Alongside this change, the minimum ECMAScript target advances from **ES2019 → ES2022**. All ES2022 features reached interoperability across all core browsers well before the 30-month Widely Available threshold as of February 2026, making ES2022 a safe and natural match for the new browser floor.

The scope of this RFC is **documentation only**. Actual changes to `tsconfig.base.json`, ESLint configuration, and related tooling files are deferred to a follow-up implementation PR.

## Problem Statement

RFC #06 established a concrete browser matrix anchored to the CSS `flex-gap` feature. Three problems have emerged with that approach:

1. **The matrix is ~4 years out of date.** It was defined in 2021 against browser populations that no longer represent real-world usage. The explicit version numbers (e.g. Chrome ≥ 84, Safari ≥ 14.1) now exclude browsers that have already reached end-of-life and incorrectly constrain what syntax and APIs the library may ship.

2. **The anchor feature creates an arbitrary constraint.** Tying the entire browser support policy to a single CSS feature (`flex-gap`) means any future change — adding a new API, bumping the ES target, adopting a new CSS feature — requires a manual re-evaluation against the flex-gap matrix rather than a coherent, principled standard.

3. **No tooling integration.** The ESLint `compat/compat` rule in `packages/eslint-plugin/src/configs/base.js` uses eleven hardcoded browser version strings. These diverge over time from any living standard and need manual synchronisation every time the policy changes.

## Detailed Design

### Browser Support — Baseline "Widely Available"

The [Baseline](https://web.dev/baseline) initiative, maintained by the [WebDX Community Group](https://www.w3.org/community/webdx/), defines two stages of cross-browser interoperability:

| Stage                | Definition                                                                                                                                                      |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Newly Available**  | A feature is interoperable across all core browsers (Chrome, Edge, Firefox, Safari — desktop and mobile) as of the date it landed in the last of those engines. |
| **Widely Available** | A feature has been Newly Available for at least **30 months**, giving the installed browser base time to update.                                                |

Fluent v9 targets **Widely Available** — the conservative, production-appropriate tier.

As of February 2026, Widely Available corresponds approximately to:

| Browser        | Minimum version |
| -------------- | --------------- |
| Chrome / Edge  | ≥ 107           |
| Firefox        | ≥ 107           |
| Safari (macOS) | ≥ 16            |
| Safari on iOS  | ≥ 16            |

These numbers are derived from the Baseline standard and are **not maintained manually**. Going forward, the floor is defined as "whatever Widely Available resolves to at the time of the annual audit" (see [Governance](#governance)) rather than as a frozen table.

Internet Explorer 11 remains explicitly unsupported, unchanged from RFC #06.

### ECMAScript Target — ES2022

The minimum ECMAScript target advances from **ES2019** to **ES2022**.

Key net-new language features unlocked compared to ES2019:

| Feature                                                     | Specification |
| ----------------------------------------------------------- | ------------- |
| Native private class fields & methods (`#field`, `#method`) | ES2022        |
| Static class initialization blocks (`static { … }`)         | ES2022        |
| `Array.prototype.at()` / `String.prototype.at()`            | ES2022        |
| `Object.hasOwn()`                                           | ES2022        |
| `Error.cause`                                               | ES2022        |
| Top-level `await` (ESM modules)                             | ES2022        |
| RegExp match indices (`/d` flag)                            | ES2022        |
| `String.prototype.replaceAll()`                             | ES2021        |
| Logical assignment operators (`&&=`, `\|\|=`, `??=`)        | ES2021        |
| `Promise.allSettled()`                                      | ES2020        |
| Optional chaining (`?.`) and nullish coalescing (`??`)      | ES2020        |

All of the above are Baseline Widely Available as of February 2026, confirming they are safe to ship without transpilation for the target browser set.

### Tooling Changes

The following files require updates in the implementation PR:

#### `tsconfig.base.json`

```diff
-  "target": "ES2019",
-  "lib": ["ES2019", "dom"],
+  "target": "ES2022",
+  "lib": ["ES2022", "dom"],
```

#### `packages/eslint-plugin/src/configs/base.js`

Replace the eleven hardcoded browser version strings in `settings.targets` with the Browserslist Baseline query, which is natively supported by `browserslist` as of v4.23:

```diff
- settings: {
-   browsers: [
-     'last 2 Chrome versions',
-     'last 2 Firefox versions',
-     // … (11 entries total)
-   ],
- },
+ settings: {
+   browsers: ['baseline:widely'],
+ },
```

Running `npx browserslist "baseline:widely"` can be used at any time to inspect the resolved browser list.

#### Individual package `tsconfig.json` / `tsconfig.lib.json`

Any package-level tsconfig that explicitly overrides `"target": "ES2019"` should be updated to inherit the base value or set `"target": "ES2022"`. Files that do not override the target need no changes.

#### Individual package `.swcrc`

SWC's `env` block is powered by [browserslist-rs](https://github.com/browserslist/browserslist-rs) — a Rust port of Browserslist. It does **not** support the `baseline:widely` query (see [browserslist-rs limitations](https://github.com/browserslist/browserslist-rs?tab=readme-ov-file#limitations)). Therefore `.swcrc` files **cannot** use the same living-query approach as ESLint; browser targets must remain as explicit version numbers.

There are two distinct patterns across the ~97 `.swcrc` files in the monorepo:

**Pattern A — `env.targets` present (most packages)**

When `env.targets` is configured, SWC derives the output ES level from the browser list internally. `jsc.target` **must not** be set alongside `env` — SWC will reject the combination with an error. The only change needed is to ensure the browser versions reflect the current Widely Available floor:

```diff
{
  "jsc": {
    "transform": { ... }
-   "target": "es2022"     ← remove this; env.targets already controls the level
  },
  "env": {
    "targets": {
      "chrome": "115",
      "edge": "115",
      "firefox": "116",
      "safari": "16"
    }
  }
}
```

**Pattern B — only `jsc.target`, no `env`**

Packages without an `env` block use `jsc.target` alone and must be bumped:

```diff
{
  "jsc": {
-   "target": "es2019"
+   "target": "es2022"
  }
}
```

The `env.targets` browser versions are already aligned with the Baseline Widely Available floor as of February 2026 and **must not be changed to a query string**. They are updated manually during the annual audit (see [Governance](#governance)) using `npx browserslist "baseline widely available"` to determine the correct version numbers at that point in time.

> There are ~97 `.swcrc` files across the monorepo — all should be audited to ensure they follow the correct pattern and `env.targets` matches the current Widely Available floor.

#### `packages/web-components/test/harness/vite.config.ts`

```diff
- esbuild: { target: 'ES2019' },
+ esbuild: { target: 'ES2022' },
```

#### `apps/public-docsite-v9/src/Concepts/BrowserSupportMatrix.stories.mdx`

Replace the static browser version table with a section explaining Baseline Widely Available and linking to [web.dev/baseline](https://web.dev/baseline). The page should make clear that:

- the precise versions are not maintained manually in the docsite;
- the canonical source is the Baseline standard;
- IE 11 is not supported.

## Consumer Impact

Fluent v9 will ship ES2022 syntax in its published output. This is consistent with the long-standing policy in RFC #06 that consumers targeting older browsers are responsible for transpilation.

The recommended transpilation path remains unchanged: use `@babel/preset-env`, `swc`, or `esbuild` with an appropriate `targets` configuration, together with `core-js` or equivalent polyfills for runtime APIs.

### Note on Fluent v8 compatibility

This RFC applies exclusively to **Fluent v9**. Fluent v8 (`@fluentui/react`) is in maintenance mode and will **not** adopt the Baseline requirement or the ES2022 target bump.

Consumers who use both v8 and v9 in the same application should be aware:

- v9 will ship ES2022 syntax; their bundler/transpiler must be configured to process `@fluentui/react-components` (and its constituent packages) if they need to support browsers below the Widely Available floor.
- v8 does not impose or document a formal browser matrix; it continues to target broadly compatible output as it always has.
- Combined usage does not introduce any new _runtime_ incompatibility, but consumers targeting browsers below Baseline Widely Available remain responsible for ensuring end-to-end compatibility across both packages.

## Migration / Audit

1. **After tsconfig changes** — run `yarn nx run-many -t build` and address any TypeScript errors caused by strict ES2022 type-checking (e.g., `lib` additions may surface new overloads or stricter types).

2. **Existing ES2020/ES2021/ES2022 usages** — syntax that was previously tolerated but technically out-of-spec for the ES2019 target (optional chaining, nullish coalescing, etc.) becomes formally permitted. No action required.

3. **ESLint compat rule migration** — switching `settings.targets` from explicit version strings to `baseline:widely` may surface API usages that were previously below the old (looser) version floor but fall outside Widely Available. Each occurrence must be evaluated:

   - If the API is Newly Available but not yet Widely Available, either wait for the annual promotion or replace it.
   - If the API is genuinely unsupported, it must be replaced or polyfilled at the consumer level.

   Run `yarn nx run eslint-plugin:lint` after the change to get an initial baseline of new violations.

## Governance

The annual browser support audit introduced in RFC #06 is preserved. Under the new policy, however, the audit no longer involves manually bumping browser version numbers. Instead, it evaluates:

> "Should we advance the effective Baseline year target from 'as of 2026' to 'as of 2027'?"

In practice this means reviewing whether any widely-used Fluent v9 feature (CSS or JS) is currently Newly Available but has not yet reached Widely Available, and deciding whether the 30-month threshold has been reached for the next cycle. The Browserslist `baseline:widely` query handles the browser version arithmetic automatically.

## Pros and Cons

### Pros

- **Reduced maintenance** — no manually curated version table in config files or docsite pages.
- **Living standard alignment** — as browsers update, the effective floor advances automatically without engineering effort.
- **Unlocked modern JS syntax** — private class fields, `Object.hasOwn()`, top-level `await`, and the full ES2022 feature set become first-class in the Fluent codebase.
- **Consistent policy** — a single Browserslist query (`baseline:widely`) drives ESLint and documentation; tooling that cannot consume Browserslist queries (SWC's `.swcrc`) uses explicit versions derived from the same query.
- **Future-proof governance** — annual audits focus on policy decisions rather than version bookkeeping.

### Cons

- **New ESLint compat violations may surface** — migrating from explicit old version strings to `baseline:widely` could flag API usages that the old (outdated) strings didn't catch, requiring one-time cleanup effort.
- **Consumer impact** — teams that consume Fluent v9 and support browsers below Widely Available must ensure their build toolchains process Fluent packages for transpilation. While this is simple for ECMA down leveling it might be difficult impossible for CSS/Browser api features.

## Open Issues

- Confirm that all package-level tsconfig files that hardcode `ES2019` have been identified before the implementation PR is merged.
- Decide whether the docsite browser support page should embed the live Browserslist output (e.g., via a build-time script) or simply link to [web.dev/baseline](https://web.dev/baseline).
- Coordinate with partner teams (Teams, Office) to validate that their transpilation pipelines handle ES2022 syntax in Fluent v9 package output.
