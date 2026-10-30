# Runtime-risk detection

[Documentation contents](README.md) | [Configuration reference](../README.md#configuration)

The compiler's acceptance result describes whether it can transform a function. It is not a
runtime-safety guarantee. Optional risk rules look for project-specific patterns that can interact
poorly with retained memoization. Findings are advisory and never change the exit code.

All rules are disabled by default. Enable only conventions that your application actually uses:

```json
{
  "$schema": "./node_modules/@fluentui/react-compiler-analyzer/rca.config.schema.json",
  "analyze": {
    "risks": {
      "detectGetStateReads": true,
      "storeAccessorPattern": "Store$",
      "selectorHookProperties": ["use"]
    }
  }
}
```

## Imperative store snapshots

`nonreactive-store-read` matches imperative `.getState()` snapshots when `detectGetStateReads` is
enabled, and non-hook accessors matching `storeAccessorPattern` when a regex is supplied.

```tsx
function Widget() {
  const activeId = getAppStore().getState().activeId;
  return <div>{activeId}</div>;
}
```

An imperative snapshot has no tracked reactive input. If the compiler retains it in a compute-once
memo slot, later store changes can leave the cached value stale. Accessor matches include property
reads, destructuring, and one level of local binding:

```ts
const { activeId } = getAppStore();
const state = getAppStore();
const currentId = state.activeId;
```

`.getState()` matches have `high` severity; configured accessor matches have `medium` severity.
Optional chaining is supported, including `store?.getState()` and `getAppStore()?.activeId`.

`storeAccessorPattern` never matches `useXxx`-named callees, even if the regex matches their names:
the compiler recognizes those as hooks and does not treat their call as a compute-once accessor.
This exclusion does not disable genuine snapshots such as `useStoreApi().getState().activeId`.

## Hidden selector hooks

`hidden-selector-hook` matches configured property chains, such as `store.use.field()`, when
`selectorHookProperties` includes `use`. Receivers can be a variable, a call, or a longer chain:

```tsx
function Widget() {
  const activeId = appStore.use.activeId();
  return <div>{activeId}</div>;
}
```

If that property function calls a real hook internally, its name hides the hook from the compiler.
Memoizing around the call can execute the hidden hook only on the first render, changing hook
order later. These findings have `high` severity. Computed property access and optional chaining,
such as `store.use['field']()` and `store?.use?.field()`, are also recognized.

This rule depends on application conventions, not inferred types. A property named `use` is not
universally a selector-hook API; configure the list to match your codebase.

## Reactive subscriptions and exclusions

Nothing lexically inside a `useSyncExternalStore(...)` call is reported. React owns the subscription
and re-invokes the snapshot callback when the store changes:

```tsx
React.useSyncExternalStore(appStore.subscribe, appStore.getState);
useSyncExternalStore(store.subscribe, () => store.getState().enabled);
```

This is keyed on the React API name. Outside that call, the analyzer has no type information to
distinguish a bare `store.subscribe` property from a snapshot property. Reading a value as an
argument, such as `log(store.currentId)`, is still an immediate read.

A previous experimental rule for fresh inline selector arguments was removed: accepted compiler
output already memoizes those arguments, so flagging them did not identify a compiler-induced
problem. These rules focus on patterns the compiler can make worse, rather than every suspicious
React pattern.

## Follow first-party wrappers

Local detection can miss a risky read hidden in a helper:

```ts
// store.ts
export function readActiveId() {
  return getAppStore().getState().activeId;
}
```

```tsx
// Widget.tsx
import { readActiveId } from './store';

function Widget() {
  return <div>{readActiveId()}</div>;
}
```

Wrapper resolution is enabled by default only when at least one leaf risk rule is configured.
Set `resolveWrappers: false` to restrict detection to scanned source. The finding is reported at the
call site, with a `reached via` chain identifying the helpers traversed.

```json
{
  "analyze": {
    "risks": {
      "detectGetStateReads": true
    }
  }
}
```

Resolution is demand-driven and memoized: files are parsed only when a call path reaches them.
`useXxx`-named callees are skipped; their definitions can be analyzed separately. The Oxc resolver
uses the nearest tsconfig for each importer, including `extends` and `paths`; there is no manually
maintained `pathAliases` config and no TypeScript `Program`. Resolution follows first-party
realpath targets outside `node_modules`, including ESM package exports and workspace symlinks.

The default conditional-export activation set is `import`, `node`, and `default`. It does not
activate `source`, `types`, or `require` implicitly. Opt into a source condition explicitly:

```json
{
  "analyze": {
    "risks": {
      "detectGetStateReads": true,
      "resolver": {
        "additionalConditionNames": ["source"]
      }
    }
  }
}
```

For example, given:

```json
{
  "exports": {
    "./typography": {
      "source": "./src/typography.ts",
      "types": "./lib/typography.d.ts",
      "default": "./lib/typography.js"
    }
  }
}
```

the default resolver follows the ESM/default implementation. With `source` opted in, it may follow
the source implementation instead. Additional conditions activate matching branches but do not
reorder package `exports` keys; package key order determines the first matching branch. The chosen
source may differ from the consumer's build and is not build-output parity.

`resolver.mainFields` is an optional ordered replacement for the default `["module", "main"]`
fields, used only when an applicable `exports` or `imports` map does not select a target:

```json
{
  "analyze": {
    "risks": {
      "detectGetStateReads": true,
      "resolver": {
        "mainFields": ["source", "module", "main"]
      }
    }
  }
}
```

Package export restrictions take precedence; custom fields do not bypass unexported subpaths.
Only string implementation targets are followed. Declaration targets (`.d.ts`, `.d.mts`, `.d.cts`),
CommonJS modules, and implementations under `node_modules` remain boundaries. The resolver does
not redirect missing `dist` output to source.

### Check resolution diagnostics

A misconfigured alias may resolve nothing without failing the command. Inspect stderr, including
when using JSON output:

```text
Wrapper resolution: 812 first-party import(s) resolved, 5140 package boundaries, 12 unresolved.
  tsconfigs used: 3
  first-party files followed: 27
```

Unresolved first-party specifiers are reported even in JSON mode because they may hide risks.
Verbose diagnostics include the active condition names, ordered main fields, and actual resolved
targets. An unresolved import or package boundary is not evidence that the code is risk-free.

## Read findings in context

Human reports distinguish:

- **Compiled but Risky:** accepted functions with configured risks; acceptance alone does not mean a memo cache was emitted.
- **Suppressed by 'use no memo':** risks in opted-out functions; the guard may be preventive,
  not proven load-bearing.
- **Risky but Not Compiled:** risks in functions the compiler skipped or errored on.

JSON uses `compiled` and optional `suppressed: true` to express the same distinctions. See
[reviewing opt-outs](migration-workflow.md#review-existing-opt-outs) before removing directives.
Compiler acceptance, reported statistics, configured risk, and actual emitted caching are separate
observations. Normal RCA analysis does not inspect emitted code. Positive counters do not prove
that the risky operation was cached, and zero counters do not invalidate preventive opt-outs.
Suppression-related compiler rejection is reported separately with retained findings: another
compiler/profile may optimize those functions. They are not automatically annotated.

## Limits

- Package implementations under `node_modules` are not followed; type declarations do not expose their runtime bodies.
- Dynamic dispatch and method calls on inferred receivers require type information this analysis does not have.
- Binding resolution follows one local binding, not arbitrary reassignment or multi-step dataflow chains.
- Lexically conditional hooks are already rejected by the compiler; they do not need a second runtime-risk rule.
- Unknown application-specific risks and upstream compiler defects may remain undetected.

A TypeChecker-based resolver could expand type-directed resolution, but would not recover missing
package bodies or dynamically generated members from declarations. The current design favors lazy
first-party resolution over an eager whole-program analysis.
