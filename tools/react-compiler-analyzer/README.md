# @fluentui/react-compiler-analyzer

Analyzes React Compiler behavior on TypeScript source files. Three commands:

- **`init`** — Creates a minimal `rca.config.json` and installs the packaged Agent Skill into the repository.
- **`lint`** — CI gate: validates `'use no memo'` and `'use memo'` directives for correctness. Exits 1 on issues.
- **`analyze`** — Health report: compiler coverage stats, directive breakdown, manual-memo migration candidates, and opt-in runtime-risk detection ("Compiled but Risky").

## User Flows

### Flow 0: Initialize a repository

```bash
# Interactive; infer is the recommended default
react-compiler-analyzer init

# Scripted setup with recommended infer, CLI, and scan-exclude defaults
react-compiler-analyzer init --yes
```

Initialization creates `rca.config.json` in the current directory and copies the skill bundled
with the installed package to `.agents/skills/react-compiler-analyzer` at the nearest Git root.
Review and commit both so configuration and agent guidance stay versioned with the repository.

### Flow 1: Initial migration assessment

```bash
# See which functions the compiler accepts and where it emits memo caches
react-compiler-analyzer analyze ./library/src --mode infer --verbose

# Analyze multiple directories at once
react-compiler-analyzer analyze packages/pkg-a/src packages/pkg-b/src --mode infer --verbose
# Output: coverage stats + directive health breakdown + manual-memo migration candidates
```

Team reviews output — identifies which components compile, which error out, and which manual memo
sites need migration review. Compiler acceptance is not a performance-value estimate.

### Flow 2: Gradual opt-in (annotation mode build)

```bash
# 1. Identify candidates — what CAN compile and has manual memo
react-compiler-analyzer analyze ./library/src --mode infer

# 2a. Opt-in only functions with manual memoization (useMemo/useCallback/React.memo)
react-compiler-analyzer analyze ./library/src --mode infer --annotate manual-memo

# 2b. Or opt-in ALL compilable functions
react-compiler-analyzer analyze ./library/src --mode infer --annotate all

# 3. Verify — run tests, check bundle size
yarn nx run react-button:test

# 4. Review manual hook removal after behavior tests; review React.memo wrappers separately
```

### Flow 3: CI enforcement

```bash
# Build uses compilationMode: 'annotation'
# CI validates directives match that mode:
react-compiler-analyzer lint ./library/src --mode annotation

# Fails (exit 1) if:
# - Redundant 'use no memo' (compiler wouldn't touch it anyway in annotation mode)
# - Broken 'use memo' (function opted-in but compiler errors on it)
# - Conflicting directives (both on same function)
```

### Flow 4: Full infer mode adoption

```bash
# Build uses compilationMode: 'infer' (compiler auto-detects components/hooks)
react-compiler-analyzer lint ./library/src --mode infer

# Fails (exit 1) if:
# - Redundant 'use no memo' (compiler can't optimize it regardless)
# - Broken 'use memo' (compiler can't handle the function)
# - Conflicting directives

# Passes (exit 0): 'use memo' is valid in infer mode
# (forward-compatible for switching to annotation mode later)
```

## Configuration

`analyze` and `lint` read stable defaults from an optional `rca.config.json` in the current working
directory. Use `--config <path>` to select a different file. RCA does not search parent
directories. When no implicit config exists, the built-in defaults apply.

Use `init` for the minimal first-time config:

```json
{
  "$schema": "./node_modules/@fluentui/react-compiler-analyzer/rca.config.schema.json",
  "mode": "infer",
  "format": "cli",
  "exclude": [
    "**/__tests__/**",
    "**/testing/**",
    "**/__mocks__/**",
    "**/*.spec.*",
    "**/*.test.*",
    "**/*.stories.*",
    "**/*.cy.*",
    "**/*.e2e.*",
    "**/e2e/**"
  ]
}
```

`init` offers `infer` and `annotation`, with `infer` selected by default because `analyze` is the
primary workflow. It also persists the analyzer's current default excludes, including Cypress and
E2E files and directories. It does not offer `all`. Re-running it preserves custom excludes and other valid
advanced settings already present in the file. An invalid existing config requires confirmation,
or `--yes --force` in a non-interactive environment.

```jsonc
{
  "$schema": "./node_modules/@fluentui/react-compiler-analyzer/rca.config.schema.json",
  "mode": "infer",
  "concurrency": 10,
  "exclude": ["**/__tests__/**", "**/*.test.*"],
  "parserPlugins": ["decorators-legacy"],
  "analyze": {
    "quote": "single",
    "risks": {
      "detectGetStateReads": true,
      "storeAccessorPattern": "Store$",
      "selectorHookProperties": ["use"]
    }
  }
}
```

The shipped `rca.config.schema.json` provides editor validation and is also used for runtime
validation. Unknown keys and invalid nested values fail the run. Explicit CLI options override
config values. JSON uses camelCase (`strictPaths`, `parserPlugins`), while CLI flags retain
kebab-case (`--strict-paths`, `--parser-plugin`).

Scan paths remain required positional arguments. Source-writing operations are intentionally not
persistent configuration: use `--annotate` and `--fix` explicitly on each run.

If you previously used `analyze --risk-config ./risk.config.json`, see the dated
[configuration migration](MIGRATION.md#2026-09-03--unified-rca-configuration).

### Agent Skill

The npm package ships the canonical skill at `skills/react-compiler-analyzer`. By default, `init`
copies it to the consuming repository's `.agents/skills/react-compiler-analyzer` directory.
Copilot and other Agent Skills-compatible tools can then discover it from the repository rather
than from `node_modules`.

The skill keeps first-time init small. On its first analyzer task it inspects the actual compiler
build mode, parser syntax, store APIs, wrapper indirection, and applicable inherited tsconfig
aliases before proposing advanced `rca.config.json` settings. Agent-driven runs explicitly use
`--format json`; the persisted default remains human-friendly `cli`.

The repository copy is never silently overwritten. Identical content is a no-op; a different copy
requires interactive confirmation or `--force`. Use `--no-skill` to initialize only the config:

```bash
react-compiler-analyzer init --no-skill
```

After adding or updating the skill, reload active agent sessions (for GitHub Copilot CLI,
`/skills reload`).

## Commands

### `init` — Repository setup

```bash
react-compiler-analyzer init [options]
```

| Flag          | Type      | Default | Description                                                               |
| ------------- | --------- | ------- | ------------------------------------------------------------------------- |
| `--config`    | `string`  | _(1)_   | Config file to create or update                                           |
| `--yes`, `-y` | `boolean` | `false` | Accept recommended defaults without prompting                             |
| `--force`     | `boolean` | `false` | Replace an invalid config or a differing installed skill                  |
| `--skill`     | `boolean` | `true`  | Copy the packaged skill to the repository; use `--no-skill` to disable it |

_(1)_ Defaults to `./rca.config.json`.

Without `--yes`, init requires an interactive terminal. The config is replaced atomically, and
cancelling the final confirmation leaves both config and skill unchanged.

### `lint` — Directive health gate

```bash
react-compiler-analyzer lint <paths..> [options]
```

Scans one or more files or directories for both `'use no memo'` and `'use memo'` directives. `--mode` controls what compilation strategy is assumed.

#### Status categories

| Status        | Meaning                                                    | Exit code |
| ------------- | ---------------------------------------------------------- | --------- |
| `redundant`   | Directive has no effect                                    | **1**     |
| `active`      | Directive is valid (compilable or intentionally opted out) | 0         |
| `broken`      | `'use memo'` requests compilation that errors              | **1**     |
| `conflicting` | Both `'use no memo'` and `'use memo'` on same function     | **1**     |
| `skipped`     | Has `// justified:` comment                                | 0         |

#### Classification matrix

| Directive                      | Scenario                      | `--mode infer`  | `--mode annotation` |
| ------------------------------ | ----------------------------- | --------------- | ------------------- |
| `'use no memo'`                | on compilable named component | **active**      | **redundant**       |
| `'use no memo'`                | on non-compilable function    | **redundant**   | **redundant**       |
| `'use no memo'` + `'use memo'` | on same function              | **conflicting** | **conflicting**     |
| `'use memo'`                   | on compilable named component | **active**      | **active**          |
| `'use memo'`                   | on non-compilable function    | **broken**      | **broken**          |

#### Options

| Flag     | Type      | Default   | Description                                                          |
| -------- | --------- | --------- | -------------------------------------------------------------------- |
| `--mode` | `string`  | `"infer"` | Compilation mode: `infer`, `annotation`, `all`                       |
| `--fix`  | `boolean` | `false`   | Auto-remove redundant directives, annotate active, resolve conflicts |

#### `--fix` behavior

- Redundant `'use no memo'` → removed
- Active `'use no memo'` → annotated with `// justified: <reason>`
- Conflicting → removes `'use no memo'`, keeps `'use memo'`

#### Examples

```bash
# Detect issues (CI gate)
react-compiler-analyzer lint ./library/src --mode annotation

# Lint multiple directories
react-compiler-analyzer lint packages/pkg-a/src packages/pkg-b/src --mode annotation

# Lint a single file
react-compiler-analyzer lint ./library/src/components/Button/Button.tsx --mode annotation

# Auto-fix
react-compiler-analyzer lint ./library/src --fix

# Show detailed compiler events and full code-framed diagnostics
react-compiler-analyzer lint ./src --verbose
```

#### Retiring a `'use no memo'` directive

A directive that is doing nothing and one that is preventing a crash both produce **no live
finding** — that is the point of the opt-out. So "the analyzer reports nothing here" is not
evidence that a directive is safe to delete, and bulk-removing on that basis will silently
re-introduce every hazard the directives were holding back.

`analyze` reports the risks inside opted-out functions rather than hiding them. In JSON, a
load-bearing finding has `suppressed: true`:

```bash
# Load-bearing: removing the directive makes these live.
react-compiler-analyzer analyze ./src --format json \
  | jq -r '.findings[] | select(.suppressed == true) | "\(.file):\(.line)"' | sort -u

# Files that contain at least one load-bearing directive — exclude these from bulk removal.
react-compiler-analyzer analyze ./src --format json \
  | jq -r '.findings[] | select(.suppressed == true) | .file' | sort -u
```

Note the two lists key on different lines: a finding is reported where the **risk** is, not where
the directive is, so subtract at file granularity rather than by line. A `'use no memo'` whose file
never appears above still requires review: risk analysis is configurable and cannot prove that an
opt-out is behaviorally redundant. `lint` enumerates the full directive set to inspect.

The `suppressed` marker covers indirectly-reached risks too, so the audit stays valid under
`resolveWrappers: true` — a directive guarding only a hazard several calls away is still reported
as load-bearing, with the `reached via` chain in the message. Run the audit with the **same risk
config** the bail-out set was generated under; a narrower config finds fewer risks and will
mislabel load-bearing directives as stale.

The human-readable report splits the same way, under **Suppressed by 'use no memo'** versus
**Risky but Not Compiled** — the latter is now reserved for genuine compile failures.

### `analyze` — Coverage + migration report

```bash
react-compiler-analyzer analyze <paths..> [options]
```

Reports which functions the React Compiler accepts, skips, or bails out on across one or more files
or directories. Accepted functions are separated by whether the compiler reports an emitted memo
cache. Also shows a directive breakdown summary. Always exits 0.

Without `--verbose`, human-readable output contains only package summary tables and one aggregate
summary table. Candidate lists, candidate and memo-counter legends, per-function compiler outcomes,
runtime-risk details, unparseable-file details, explanatory notes, and the lint tip require
`--verbose`.

Each package summary partitions all analyzed functions into emitted memo caches, accepted functions
with no emitted cache, unavailable memo-cache statistics, skips, and errors. The row percentages
therefore use the same package total and do not treat compiler acceptance alone as an optimization
signal. A separate **Manual Memo Migration Candidates** row reports its percentage of
compiler-accepted functions because it is an overlapping migration subset, not another outcome.

#### Options

| Flag         | Type     | Default    | Description                                                                        |
| ------------ | -------- | ---------- | ---------------------------------------------------------------------------------- |
| `--mode`     | `string` | `"infer"`  | Compilation mode used to **discover** functions: `infer`, `annotation`, `all`      |
| `--annotate` | `string` | —          | Insert directives: `manual-memo`, `all`, `all-safe`, or `bailout-only` (see below) |
| `--quote`    | `string` | `"single"` | Quote style for directives written by `--annotate`: `single` or `double`           |

#### Manual memo migration candidates

Candidate output is an unscored migration inventory, not a performance ranking. A function is a
candidate only when:

- its canonical compiler outcome is `compiled`;
- it is not opted out with `'use no memo'`; and
- it contains at least one detected `useMemo`, `useCallback`, or `React.memo` site.

Human-readable reports render a separate candidate section inside each package. Candidates are
intentionally not part of the JSON contract: they are review guidance rather than stable
machine-ranked evidence. Compiler-accepted components and hooks without detected manual memo APIs
are not candidates.

The verbose report renders this legend once before the package sections. In HTML, the `Action` and
`Readiness` headers and values also expose the same meanings as native `title` tooltips.

| Column    | Value                      | Meaning                                                                                     |
| --------- | -------------------------- | ------------------------------------------------------------------------------------------- |
| Action    | `hook-lowering-review`     | Review detected `useMemo`/`useCallback` behavior before removing or lowering it.            |
| Action    | `default-wrapper-review`   | Review a comparator-free `React.memo` separately from its compiler-accepted inner function. |
| Action    | `custom-comparator-retain` | Retain a custom `React.memo` comparator unless behavior proves it redundant.                |
| Readiness | `reviewable`               | Risk analysis ran, no known risk was found, and the function kind is known.                 |
| Readiness | `risk-unassessed`          | Runtime-risk analysis was not configured for this run.                                      |
| Readiness | `needs-kind-review`        | The source function kind is unknown and needs manual classification.                        |
| Readiness | `blocked-known-risk`       | A known runtime-risk finding blocks migration until addressed.                              |

Manual call counts and compiler memo counters are descriptive only and never influence ordering.

#### `--annotate`

Controls which compilable functions receive a directive:

| Mode           | Writes `'use memo'` on…                                                | Writes `'use no memo'` on… |
| -------------- | ---------------------------------------------------------------------- | -------------------------- |
| `manual-memo`  | compilable functions that contain `useMemo`/`useCallback`/`React.memo` | —                          |
| `all`          | every compilable function                                              | —                          |
| `all-safe`     | every compilable function **except** risky ones                        | risky functions            |
| `bailout-only` | —                                                                      | risky functions            |

Inserts the directive at the top of each matching function's body.

**Idempotent, and never contradictory.** A function that already declares _either_ `'use memo'` or
`'use no memo'` is skipped — the check reads directives from the AST, so it is unaffected by quote
style and cannot be confused by a directive belonging to a neighbouring function.

##### Choosing between `all-safe` and `bailout-only`

Both bail risky functions out with
`'use no memo'; // justified: <rule> risk via <symbol> — unsafe to memoize`. They differ only in
whether the _safe_ functions get an opt-in, and that depends on the compilation mode your **build**
will run — which is not necessarily the `--mode` you scanned with:

| Your build runs  | Use            | Why                                                                                 |
| ---------------- | -------------- | ----------------------------------------------------------------------------------- |
| `infer` or `all` | `bailout-only` | Those functions already compile without a directive, so `'use memo'` is dead weight |
| `annotation`     | `all-safe`     | Nothing compiles without an explicit `'use memo'`, so the opt-ins are required      |

```bash
# Target build = infer: only mark what is unsafe
react-compiler-analyzer analyze ./src --annotate bailout-only

# Target build = annotation: opt in the safe functions, bail out the risky ones
react-compiler-analyzer analyze ./src --mode all --annotate all-safe
```

Both find risky functions only when risk detection is enabled under `analyze.risks` in
`rca.config.json`; without it, `all-safe` degrades to `all` and `bailout-only` does nothing.

##### `--mode` selects what is _discoverable_, not what your build does

`--annotate` can only write to functions the compiler actually reported on, and that set is decided
by `--mode`:

| `--mode`     | Compiler reports                                              | Useful with `--annotate`?                          |
| ------------ | ------------------------------------------------------------- | -------------------------------------------------- |
| `infer`      | components/hooks, plus anything already carrying `'use memo'` | Yes                                                |
| `all`        | every top-level function                                      | Yes — the widest set                               |
| `annotation` | **only** functions that already have `'use memo'`             | **No** — nothing new to find; a warning is printed |

So generate annotations with `--mode infer` or `--mode all`, then switch your _build_ to
`compilationMode: 'annotation'`. Scanning with `--mode annotation` before annotating is
chicken-and-egg: the compiler will not tell you which functions are viable until they are already
annotated.

#### `--quote`

Directives are written single-quoted by default. Pass `--quote double` if your codebase writes
`"use memo"`, so plain greps for your own convention keep matching:

```bash
react-compiler-analyzer analyze ./src --annotate all --quote double
```

Detection is always quote-agnostic, so switching styles never causes a duplicate insertion.

#### Compiled but Risky (runtime-risk rules)

The compiler reports `CompileSuccess` based purely on whether a function is _structurally_
compilable. It does **not** reason about a value's reactivity, nor recognize hooks that aren't
`useXxx()`-named at the call site — so `analyze` adds an opt-in **Compiled but Risky** section
flagging real, compiler-introduced bugs:

| Rule                     | What it catches                                                                                                                                                                            | Why memoization breaks it                                                                                                                                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `nonreactive-store-read` | Imperative store snapshots: `store.getState().field`, `getXStore().field`, `const { field } = getXStore()`, and one level of local binding — `const s = getXStore(); … s.field` _(opt-in)_ | The read has no tracked inputs, so the compiler hoists it into a compute-once cache slot — it runs on the first render and is **never re-read**, freezing the value.                                                  |
| `hidden-selector-hook`   | Selector hooks accessed via property chain: `store.use.field()`, on **any** receiver — `useFooStore(x).use.field()`, `a.b.use.field()`, `store.use['field']()` _(opt-in)_                  | `.use.field()` calls a real hook (`useStore`) internally but isn't `useXxx()`-named, so the compiler memoizes around it — running the hidden hook only on the first render → hook-order crash (`areHookInputsEqual`). |

Both rules match **optional-chained** forms too — `store?.use.field()`, `store?.use?.field()`,
`store?.getState()`, `getXStore()?.field`, `const s = getXStore(); … s?.field`. Babel parses these as
`OptionalCallExpression`/`OptionalMemberExpression`, distinct node types from their plain
counterparts, so a rule that only matched the latter would let `?.` slip through unflagged.

`storeAccessorPattern` **never matches a `useXxx`-named callee**, even when the regex would.
`Store$` is the obvious pattern for "my stores are named `*Store`", and it also matches `useStore`,
`useToastStore` and `useSyncExternalStore`. Verified against the compiler's output: a hook call is
never placed in a `Symbol.for("react.memo_cache_sentinel")` slot — doing so would break the Rules of
Hooks — so its result is recomputed every render and cannot go stale. The hazard's precondition does
not exist, which makes such a finding a false positive by construction.

The exclusion is deliberately confined to `storeAccessorPattern`:

- `detectGetStateReads` is unaffected — `useStoreApi().getState().field` is a genuine non-reactive
  read and still fires.
- `hidden-selector-hook` is unaffected — `store.use.field()` is the opposite case, where the compiler
  _fails_ to recognize a hook.
  Both are verifiable in the compiler's own output: the call is wrapped in a
  `Symbol.for("react.memo_cache_sentinel")` slot that computes once and then always returns the
  cached value. For a plain snapshot that freezes the value; for a hidden hook that means the
  underlying `useStore` runs only once, changing the hook count between renders and crashing.

Nothing lexically inside a **`useSyncExternalStore(…)`** call is reported. That API is React's
sanctioned reactive subscription: it owns `subscribe` and re-invokes `getSnapshot` on every store
transition, so neither argument is read during render and the callback cannot go stale.

```tsx
// not flagged — the accessors are passed by reference, invoked by React
React.useSyncExternalStore(promptLabConfigStore.subscribe, promptLabConfigStore.getState);

// not flagged — React re-invokes this callback on every transition
useSyncExternalStore(store.subscribe, () => store.getState().enabled);
```

This is keyed on the React API name only. The analyzer has no type information, so outside that
call a bare `store.subscribe` is indistinguishable from a state read and is still reported — as is a
state value passed as an argument, `log(store.currentId)`, which reads it now.

Findings are severity-ranked:

- `high` — a `.getState()` snapshot read, or a `store.use.field()` hidden selector hook.
- `medium` — a `getXStore().field` read matching a configured store-accessor pattern.

All rules are **off by default** — their `.getState()` / `getXStore()` / `.use.field()`
conventions are app-specific, so they only run when you opt in under `analyze.risks`:

```jsonc
{
  // Optional: enables editor IntelliSense + validation against the shipped schema.
  "$schema": "./node_modules/@fluentui/react-compiler-analyzer/rca.config.schema.json",
  "analyze": {
    "risks": {
      // Enable `nonreactive-store-read` for `.getState()` snapshot reads (default: false).
      "detectGetStateReads": true,
      // Enable `nonreactive-store-read` for `getXStore().field`. Omit to disable.
      "storeAccessorPattern": "Store$",
      // ["use"] matches `store.use.field()`. Empty/omitted disables the rule.
      "selectorHookProperties": ["use"]
    }
  }
}
```

The config is validated on load against the same JSON schema used by the editor. The schema ships
at the package root as `rca.config.schema.json`.

##### Following wrappers across files (`resolveWrappers`)

By default the rules are **local** — they only see the file being analyzed. A component that
calls a plain first-party helper which internally does the risky read slips through:

```ts
// store.ts
export function readActiveId() {
  return getAppStore().getState().activeId; // the actual risky leaf
}

// Widget.tsx  — looks innocent, but the compiler memoizes around `readActiveId()`
function Widget() {
  const id = readActiveId(); // ← cached across renders → stale
  return <div>{id}</div>;
}
```

Set `resolveWrappers: true` to follow first-party wrapper calls (and `export … from` barrels)
to the leaf, reporting the finding at the call site with the resolution chain:

```jsonc
{
  "$schema": "./node_modules/@fluentui/react-compiler-analyzer/rca.config.schema.json",
  "analyze": {
    "risks": {
      "detectGetStateReads": true,
      "resolveWrappers": true,
      // Only needed for tsconfig path aliases. Relative baseUrl values are config-relative.
      "pathAliases": { "baseUrl": "./src", "paths": { "@app/*": ["app/*"] } }
    }
  }
}
```

The finding reads e.g. `reached via \`readActiveIdIndirect → readActiveId\`: imperative store
snapshot via .getState()…`. Resolution is **demand-driven and memoized** (files are parsed only
when a call path reaches them), so it's far cheaper than a full TypeScript `Program`. It is
purely **syntactic and first-party**: `useXxx()`-named callees are skipped (the compiler
recognizes those as hooks and they're flagged at their own definition), and it stops at the
`node_modules` boundary, dynamic dispatch, and method calls on inferred receivers.

##### Verifying that resolution actually worked

A misconfigured `pathAliases` resolves nothing and still exits 0, so an empty risk section would be
indistinguishable from clean code. Every run therefore prints what resolution reached — on **stderr**,
so it survives `--format json`:

```text
Wrapper resolution: 812 import(s) resolved, 5140 stopped at the package boundary, 12 unresolvable.
  baseUrl: /abs/repo/src
  aliases: 2/3 matched at least one import
    @app/                        802
    @shared/                      10
    @legacy/                       0   ← never matched
```

An alias sitting at `0` resolved nothing all run. On top of that:

- `pathAliases` whose target directories do not exist are reported at config load, by name —
  the usual cause of a wrong `baseUrl`.
- If **no** alias matched anything while bare imports were seen, the run says so explicitly and
  states that the risk report below covers none of them.

`baseUrl` is resolved relative to **the RCA config file**, not the working directory, so the same
config behaves identically wherever it is run from.

> **Why these and not `unstable-hook-arg`?** An earlier draft also flagged fresh inline arguments
> passed to selector hooks (`useSelector(fn, { id })`). That was removed after verifying against the
> compiler's output: for a `CompileSuccess` function the compiler **memoizes** those inline
> arguments itself (the `{ id }` object is rebuilt only when `id` changes; inline filter
> functions are hoisted to module scope), so the instability the rule warned about is exactly
> what compilation eliminates. It only ever fired where the compiler had already fixed the
> problem, so it was a false positive by construction. The `hidden-selector-hook` rule is the
> opposite: the compiler makes it _worse_ (it caches around a hook it failed to recognize).

**Known limitations.** Detection is syntactic, so it deliberately does **not** flag:

- **node_modules wrappers** — a helper whose body lives in a package (often `.d.ts`-only or
  minified). `resolveWrappers` follows **first-party** source only; it stops at the package boundary.
- **Dynamic / inferred dispatch** — `obj.method()` where the receiver's type comes from inference,
  or `fns[key]()`. Following these needs type information a syntactic pass doesn't have.
- **Multi-step binding chains** — `const a = getStore(); const b = a; b.field`. Exactly **one** level
  of local binding is resolved (`const s = getStore(); … s.field`); re-binding past that needs real
  dataflow rather than a scope lookup.
- **Conditional-hook crashes** — the React Compiler already rejects lexically-conditional hook calls
  with a Rules-of-Hooks `CompileError`, so they never reach `CompileSuccess`; nothing to add here.

> **Future: TypeChecker-based resolution.** Building a TypeScript `Program` instead of the Babel
> resolver would catch the two type-directed cases above — **method calls on inferred receivers**
> (`service.getActive()`) and **type-directed dispatch / overloads** — and would make the
> `pathAliases` config unnecessary (TS reads `tsconfig` `paths`/`baseUrl` natively). It would **not**
> help the cases that motivated these rules: `node_modules` hook bodies (`.d.ts` ships the signature,
> not the implementation that calls `useStore`) and dynamically-generated members (zustand's
> `.use.*`) stay config-seeded regardless. Given the eager whole-program build cost (seconds–minutes
> on large workspaces) buys only the _internal_ method-chain tier — not the package/dynamic boundary
> where real crashes originate — the lazy, demand-driven Babel approach was chosen deliberately.

Risk findings are advisory — they never change the exit code. Treat them as a review queue
for compiler-accepted sites that may need a justified `'use no memo'` opt-out.

Findings are reported in two sections:

- **Compiled but Risky** — the compiler accepts the function and it contains a pattern that is
  unsafe when retained memoization is emitted. A zero memo-slot count means the current compiler
  output did not retain a memo cache; acceptance alone is not proof of memoization.
- **Risky but Not Compiled** — the same patterns in a function the compiler errored on or skipped
  (e.g. an existing `'use no memo'`). Not hazardous yet, but becomes live the moment the error is
  fixed or the opt-out is removed. `--annotate all-safe` ignores these — it only bails out functions
  that actually compile.

#### Not Analyzed (files that could not be parsed)

A file the parser rejects yields no functions, so without a signal the totals would quietly shrink
and the report would look clean because nothing was read. Such files are listed in a **Not Analyzed**
section, counted in the summary, and exposed as `unparseable` in `--format json`.

**If your build compiles these files, fix it with `--parser-plugin`.** The analyzer parses with
`typescript` + `jsx` only; a build whose loader enables a wider grammar (commonly
`decorators-legacy`) compiles files the analyzer cannot read, leaving analyzed scope smaller than
compiled scope. Match the two:

```bash
react-compiler-analyzer analyze ./src --parser-plugin decorators-legacy
```

Anything still listed after matching your build's parser config is a genuine hole — the React
Compiler cannot process it either.

#### Examples

```bash
# Full analysis report
react-compiler-analyzer analyze ./library/src --verbose

# Analyze multiple directories at once
react-compiler-analyzer analyze packages/pkg-a/src packages/pkg-b/src --verbose

# Analyze a single file
react-compiler-analyzer analyze ./library/src/components/Button/Button.tsx --verbose

# Use annotation compilation mode
react-compiler-analyzer analyze ./library/src --mode annotation

# Auto-annotate only functions with manual memoization (migration candidates)
react-compiler-analyzer analyze ./library/src --annotate manual-memo

# Auto-annotate all compilable functions
react-compiler-analyzer analyze ./library/src --annotate all

# Opt in everything EXCEPT risk-flagged functions, which get a justified 'use no memo' bailout
react-compiler-analyzer analyze ./library/src --annotate all-safe
```

## Analyze/lint shared options

| Argument / Flag   | Type       | Default | Description                                                                                                                        |
| ----------------- | ---------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `<paths..>`       | `string[]` | —       | **Required.** One or more files or directories to scan for `.ts`/`.tsx` files. Excludes are not applied to explicitly passed files |
| `--format`        | `string`   | `"cli"` | Output format: `cli`, `md`, `html`, or `json` (machine-readable)                                                                   |
| `--verbose`       | `boolean`  | `false` | Print detailed compiler events and full code-framed diagnostics                                                                    |
| `--concurrency`   | `number`   | `10`    | Max parallel file processing                                                                                                       |
| `--exclude`       | `string[]` | _(1)_   | Glob patterns to exclude                                                                                                           |
| `--strict-paths`  | `boolean`  | `false` | Fail instead of warning when a given path does not exist                                                                           |
| `--parser-plugin` | `string[]` | `[]`    | Extra Babel parser plugins, e.g. `decorators-legacy`. Match your build's parser config — see **Not Analyzed**                      |
| `--config`        | `string`   | —       | Use this RCA config instead of an optional `./rca.config.json`                                                                     |

_(1)_ Default excludes: `**/__tests__/**`, `**/testing/**`, `**/__mocks__/**`, `**/*.spec.*`, `**/*.test.*`, `**/*.stories.*`, `**/*.cy.*`, `**/*.e2e.*`, `**/e2e/**`

### `--parser-plugin`

The analyzer parses with `typescript` + `jsx`. If your build's loader enables more, pass the same
plugins here so the analyzed scope matches the compiled scope:

```bash
react-compiler-analyzer analyze ./src --parser-plugin decorators-legacy
```

Unknown names are rejected. Babel ignores unrecognized parser plugins silently, so a typo would
otherwise produce a run that looks successful and analyzed nothing extra.

### Missing paths

A path that does not exist is **skipped with a warning** rather than aborting the run, so a sparse
checkout does not need a pre-filter step. The run only fails if _no_ given path exists. A path that
exists but is not a `.ts`/`.tsx` file is always fatal — that is a typo, not a missing checkout.
Pass `--strict-paths` to fail on the first missing path instead.

### Path resolution

`<paths..>` accepts any mix of directories and files, resolved **independently per path**:

| Path kind         | Behavior                                                                                                  |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| **Directory**     | Recursively scanned for `.ts`/`.tsx` files. `--exclude` globs **are** applied.                            |
| **Explicit file** | Analyzed as-is. `--exclude` globs are **bypassed** — naming a file selects it even if a glob excludes it. |

Files discovered across all paths are **de-duplicated by absolute path**, so overlapping arguments are safe — e.g. passing a directory together with a file inside it analyzes that file once, not twice. This also means a file explicitly named alongside its containing directory is never double-processed (or double-annotated/fixed).

```bash
# Directory (excludes apply) + two explicit files (excludes bypassed), all analyzed once
react-compiler-analyzer analyze \
  src/components/Foo/ \
  src/components/Bar.styles.ts \
  src/components/Baz.test.tsx   # explicitly named — analyzed despite the default *.test.* exclude
```

### `--format`

Controls how reports are rendered:

| Value  | Output                                                                                                  |
| ------ | ------------------------------------------------------------------------------------------------------- |
| `cli`  | **Default.** Terminal-friendly plain text — aligned columns, plain headings, no markdown/HTML noise.    |
| `md`   | GitHub-flavored markdown — pipe tables, `##` headings, and `<details>` blocks suitable for PR comments. |
| `html` | Self-contained styled HTML document — embedded CSS, real tables, and a collapsible scan log.            |
| `json` | Machine-readable document on stdout; every diagnostic goes to stderr.                                   |

Pass `--format md` when capturing output for a markdown destination (e.g. posting to a PR), or `--format html`
for a shareable report you can open in a browser:

```bash
react-compiler-analyzer analyze ./library/src --format md > coverage-report.md
react-compiler-analyzer analyze ./library/src --format html > coverage-report.html
```

#### `--format json`

Emits a versioned document so results can be diffed, tracked, or fed to a dashboard without
scraping text. **stdout carries only the document** — the scan log and per-file diagnostics are
redirected to stderr — so it pipes straight into a parser:

`summary.memoCacheEmitted` is the direct machine-readable equivalent of the human
**Compiler accepted (memo cache emitted)** metric. It counts only canonical `compiled` function
rows whose reported `memoStats.memoSlots` is greater than zero.

```bash
react-compiler-analyzer analyze ./src --format json \
  | jq '.findings[] | select(.compiled and (.suppressed != true)) | {file, line, rule: .ruleId, severity}'
```

```jsonc
{
  "schemaVersion": 2,
  "tool": "react-compiler-analyzer",
  "command": "analyze",
  "mode": "infer",
  "summary": {
    "functions": 1,
    "compiled": 1,
    "memoCacheEmitted": 1,
    "skipped": 0,
    "errors": 0,
    "findings": 1,
    "findingsOnCompiled": 1,
    "findingsSuppressed": 0,
    "unparseableFiles": 0
  },
  "functions": [
    {
      "file": "src/Widget.tsx",
      "package": "app",
      "line": 6,
      "column": 7,
      "function": "Widget",
      "status": "compiled",
      "compilerEvent": "CompileSuccess",
      "memoStats": {
        "memoSlots": 2,
        "memoBlocks": null,
        "memoValues": 1,
        "prunedMemoBlocks": null,
        "prunedMemoValues": null
      }
    }
  ],
  "findings": [
    {
      "file": "src/Widget.tsx",
      "package": "app",
      "line": 7,
      "column": 13,
      "function": "Widget",
      "ruleId": "nonreactive-store-read",
      "severity": "medium",
      "symbol": "getAppStore",
      "message": "...",
      "compiled": true
    }
  ],
  "unparseable": []
}
```

- Findings use `compiled` to distinguish risks on compiler-accepted functions from latent risks on
  failed/skipped functions. `suppressed: true` marks risks held back by `'use no memo'`; the key is
  omitted for other findings.
- Memo counters preserve compiler absence as `null`; a reported zero remains `0`.
- `unparseable` lists files the parser rejected outright. They contribute nothing to the other
  counts, so a shrinking `functions` total is never silently caused by a parse failure.
- Paths are workspace-relative and POSIX-separated.
- Output is deterministically ordered, so equivalent runs produce byte-identical documents.
- `lint --format json` emits the directive equivalent (`command: "lint"`, a `directives` array) and
  keeps its usual exit code. `lint --format json --fix` performs the requested write before
  serializing.
- Full code-framed compiler diagnostics remain available in human reports with `--verbose`; JSON
  stays compact and includes the terminal reason and location only.
- `--annotate` still writes directives to disk under `--format json`; the outcome is reported in an
  `annotate` key (`{ mode, filesModified, functionsAnnotated, functionsBailedOut }`).
- [`rca.analyze.schema.json`](rca.analyze.schema.json) validates the compact `analyze` document.
  It is a package artifact only and adds nothing to the emitted payload or analyzer hot path. See
  [MIGRATION.md](MIGRATION.md) for the v1-to-v2 field and behavior changes.

Section headings are color-coded by compiler state — accepted functions with emitted memo caches
are green, accepted functions without emitted caches use muted neutral styling, unavailable cache
statistics and skipped functions are yellow, errors are red, and manual memo migration candidates
are blue. In `cli` format, colors use ANSI and are emitted only when stdout is an interactive
terminal; honors `NO_COLOR` / `FORCE_COLOR`. In `html` format, colors are applied via CSS. `md`
output is left plain (markdown has no native text color).

HTML navigation always includes every analyzed package. Verbose compiler sections and candidate
chapters appear as nested links beneath their package, but a package remains navigable even when
it has no foldable sections.

## Nx integration

```jsonc
// project.json
{
  "targets": {
    "lint-compiler": {
      "command": "react-compiler-analyzer lint ./library/src --mode annotation"
    },
    "analyze-compiler": {
      "command": "react-compiler-analyzer analyze ./library/src --mode infer"
    },
    "analyze-compiler-multi": {
      "command": "react-compiler-analyzer analyze packages/pkg-a/src packages/pkg-b/src --mode infer"
    }
  }
}
```

## Known upstream issues

Defects found during rollout that live in the React Compiler toolchain rather than in this analyzer.
Each write-up carries a minimal reproduction and the exact versions it was verified against.

| Issue                                                                                                                                                                                                                | Affects                             | Write-up                                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| A `useState` initializer is outlined to module scope while still referencing the enclosing function's parameter, emitting an unbound identifier. Compiles as `CompileSuccess`; fails with `ReferenceError` at mount. | `babel-plugin-react-compiler@1.0.0` | [docs/upstream-react-compiler-outlined-closure.md](docs/upstream-react-compiler-outlined-closure.md)             |
| The loader appends its own parser plugins after the user's, so `jsx` cannot be disabled and a `.ts` angle-bracket cast (`<Foo>bar`) fails the build.                                                                 | `react-compiler-webpack@1.0.0`      | [docs/upstream-react-compiler-webpack-parser-plugins.md](docs/upstream-react-compiler-webpack-parser-plugins.md) |

## Architecture

```
src/
├── cli.ts                — CLI entry: yargs with init + lint + analyze commands
├── config.ts             — Raw/runtime rca.config.json validation and path normalization
├── prompts.ts            — Lazy Enquirer adapter used only by init
├── commands/
│   ├── shared.ts         — Shared options, validation, DEFAULT_EXCLUDE
│   ├── init.ts           — Minimal config setup + repository Agent Skill installation
│   ├── lint.ts           — 'lint' command (directive health CI gate)
│   └── analyze.ts        — 'analyze' command (coverage + migration)
├── compiler.ts           — Unified compilation: compileFile, compileFiles, compileSource
├── source-functions.ts   — Canonical function inventory and span resolver
├── compiler-events.ts    — Occurrence normalization and terminal-outcome reduction
├── concurrency.ts        — Generic concurrent file processor
├── discovery.ts          — File discovery and nearest-package attribution
├── analyzer.ts           — Pure derivation: deriveMemoDirectiveStatuses, analyzeNoMemoDirectives
├── coverage-analyzer.ts  — Pure derivation: deriveCoverage (from FileCompilationResult)
├── manual-memo-plugin.ts — Babel plugin detecting useMemo/useCallback/React.memo
├── risk-patterns.ts      — Shared leaf risk predicates (used by plugin + call-graph)
├── risk-plugin.ts        — In-file Babel plugin recording 'Compiled but Risky' findings
├── module-resolver.ts    — Sync, first-party specifier → file resolver (relative + tsconfig paths)
├── call-graph.ts         — Demand-driven cross-file 'reaches-a-risk' analyzer (wrapper resolution)
├── fixer.ts              — Directive fixes (remove redundant, justify active, resolve conflicts)
├── coverage-fixer.ts     — Insert 'use memo' annotations (manual-memo or all compilable)
├── reporter.ts           — Directive reporting (full report + compact summary for analyze)
├── coverage-reporter.ts  — Coverage reporting (stats, per-function, migration candidates)
├── candidates.ts         — Manual-memo candidate actions, readiness, and ordering
├── stable-json.ts        — Stable event comparison and source fingerprint helpers
├── serializer.ts         — Compact machine-readable document projection
├── formatter.ts          — Output rendering abstraction (cli plain text / md markdown / html document)
├── patterns.ts           — Shared regex patterns for directive detection
├── types.ts              — Shared TypeScript interfaces
└── index.ts              — Package entry (CLI-only, no public API)

skills/react-compiler-analyzer/
├── SKILL.md              — Agent Skills entry point
└── references/           — CLI and evidence-based config-discovery guidance
```

### Data flow

```
discoverFiles → nearest package → compileFilesStreaming
                                        │
                      source-function index + compiler occurrences
                                        │
                     ┌──────────────────┴──────────────────┐
                     ▼                                     ▼
         canonical FunctionAnalysis[]           canonical DirectiveAnalysis[]
                     │                                     │
                     └───────────────┬─────────────────────┘
                                     ▼
                         deterministic v2 / v1 projection
```

Each file is compiled once via `compileFile()`, and compact results are consumed as workers finish
without retaining every source or AST. Directive lint performs a second probe for `'use no memo'`,
neutralizing the directive in place so parser settings, lines, columns, and offsets are preserved.
All producers resolve through the same canonical function index.

Key dependencies:

- `@babel/core` — runs `transformAsync` for each file
- `@babel/preset-typescript` — parses `.ts`/`.tsx` without SWC
- `babel-plugin-react-compiler` — the React Compiler itself, configured with `noEmit: true` and a custom `Logger`
