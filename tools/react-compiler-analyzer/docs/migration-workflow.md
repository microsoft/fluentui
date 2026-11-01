# Migration workflow

[Documentation contents](README.md) | [CLI reference](../README.md)

Treat migration as a behavior change, not a directive-cleanup task. The compiler can accept a
function without emitting memo caches, and runtime-risk checks cannot prove that every accepted
function is safe to memoize.

## Assess your current code

Discover compiler-accepted components and hooks, even if your build currently requires annotations:

```bash
react-compiler-analyzer analyze ./src --mode infer --verbose
```

Use `--mode all` if you need the compiler to consider all top-level functions. Scanning with
`--mode annotation` only reports functions already carrying `'use memo'`; it cannot discover new
opt-in candidates. The scan mode does not modify your build's `compilationMode`.

Review errors, parse failures, and manual memo candidates separately. A compiler-accepted function
with `useMemo`, `useCallback`, or `React.memo` is an inventory item, not a recommendation to remove
those APIs. A custom `React.memo` comparator needs its own behavior review.

If your build enables extra Babel syntax, pass matching `--parser-plugin` options before comparing
coverage. Otherwise you may be measuring a smaller scope than your build processes.

## Adopt annotation mode gradually

```bash
react-compiler-analyzer analyze ./src --mode infer --annotate manual-memo
```

This adds `'use memo'` only to accepted functions with detected manual memoization. It does not
remove hooks or `React.memo` wrappers. Review the diff, run behavior tests, inspect bundle size,
and measure the workflows you care about before expanding the opt-in set.

Use `--annotate all` to opt in all accepted functions, or enable project-specific risk rules and
use `--annotate all-safe` to opt in functions without known findings while bailing out risky ones.
The latter is not a safety proof: with risk rules disabled it behaves exactly like `all`.

## Choose risk-driven annotations for your build

| Build mode       | Annotation strategy | Reason                                                                                            |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------------- |
| `infer` or `all` | `bailout-only`      | Accepted functions already compile without explicit opt-ins.                                      |
| `annotation`     | `all-safe`          | Functions need `'use memo'` to opt in; known risky accepted functions receive an opt-out instead. |

Both strategies require configured [runtime-risk detection](runtime-risks.md). They only annotate
functions the compiler accepted, and skip functions already declaring either directive. Risky
functions receive a justified `'use no memo'` directive.

```bash
# Discover in infer mode; the target build can still use annotation mode.
react-compiler-analyzer analyze ./src --mode infer --annotate all-safe

# An infer-mode build needs only risk-driven opt-outs.
react-compiler-analyzer analyze ./src --mode infer --annotate bailout-only
```

Use `--quote double` when that matches your repository's style. Existing directive detection is
quote-agnostic, so switching styles does not cause duplicate insertion.

## Review existing opt-outs

An absent live risk finding is not evidence that `'use no memo'` can be removed: suppressing the
compiler is the purpose of that directive. `analyze` retains configured risks inside opted-out
functions and marks them with `suppressed: true` in JSON.

```bash
react-compiler-analyzer analyze ./src --format json \
  | jq '.findings[] | select(.suppressed == true) | {file, line, ruleId, message}'

# Files with at least one configured risk held back by an opt-out.
react-compiler-analyzer analyze ./src --format json \
  | jq -r '.findings[] | select(.suppressed == true) | .file' | sort -u
```

A finding's location is the risk location, not necessarily the directive location. Audit by
containing function or file rather than subtracting directive and finding line numbers.
With `resolveWrappers: true`, this also covers risks reached through first-party helpers.

Use the same risk config that motivated the original opt-outs. A narrower config will find fewer
risks. Files with no findings still need review because these checks are not exhaustive. `lint`
enumerates directive statuses; it does not establish runtime equivalence after deleting an opt-out.

## Keep directives honest in CI

Run lint using the build's mode:

```bash
react-compiler-analyzer lint ./src --mode annotation
```

Review `--fix` diffs rather than applying them blindly. A justified directive is deliberately
retained, and parse/compiler failures cannot be repaired by directive edits. After migration,
continue to run your application's tests and measure behavior and performance.

When upgrading the analyzer itself, consult the [version migration guide](../MIGRATION.md).
