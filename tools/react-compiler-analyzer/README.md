# @fluentui/react-compiler-analyzer

Analyzes React Compiler behavior on TypeScript source files. Two commands:

- **`lint`** — CI gate: validates `'use no memo'` and `'use memo'` directives for correctness. Exits 1 on issues.
- **`analyze`** — Health report: compiler coverage stats, directive breakdown, migration candidates, and opt-in runtime-risk detection ("Compiled but Risky").

## User Flows

### Flow 1: Initial migration assessment

```bash
# See what compiler can optimize across a package
react-compiler-analyzer analyze ./library/src --mode infer --verbose

# Analyze multiple directories at once
react-compiler-analyzer analyze packages/pkg-a/src packages/pkg-b/src --mode infer --verbose
# Output: coverage stats + directive health breakdown + migration candidates
```

Team reviews output — identifies which components compile, which error out, which have manual memo the compiler can replace.

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

# 4. (Optional) Remove now-redundant useMemo/useCallback — compiler handles it
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

## Commands

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

# Show full compiler error reasons
react-compiler-analyzer lint ./src --full-reasons
```

### `analyze` — Coverage + migration report

```bash
react-compiler-analyzer analyze <paths..> [options]
```

Reports which functions the React Compiler will memoize, skip, or bail out on across one or more files or directories. Also shows a directive breakdown summary. Always exits 0.

#### Options

| Flag            | Type     | Default   | Description                                                                                                                                                                                                      |
| --------------- | -------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--mode`        | `string` | `"infer"` | Compilation mode: `infer`, `annotation`, `all`                                                                                                                                                                   |
| `--annotate`    | `string` | —         | Insert directives. `manual-memo`: `'use memo'` on functions with manual memoization. `all`: `'use memo'` on all compilable. `all-safe`: like `all`, but risky functions get a justified `'use no memo'` bailout. |
| `--risk-config` | `string` | —         | Path to a JSON file enabling opt-in runtime-risk detection (see **Compiled but Risky**).                                                                                                                         |

#### `--annotate`

Controls which compilable functions receive a directive:

| Mode          | Annotates                                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `manual-memo` | `'use memo'` on functions that compile successfully **and** contain manual memoization (`useMemo`, `useCallback`, `React.memo`) |
| `all`         | `'use memo'` on all functions that compile successfully, regardless of manual memoization                                       |
| `all-safe`    | Like `all`, but functions carrying **runtime-risk findings** get a justified `'use no memo'` bailout instead of `'use memo'`    |

Inserts the directive at the top of each matching function's body. Idempotent — functions that
already have the relevant directive are skipped.

`all-safe` is the migration-friendly mode: it opts every compilable function into the compiler
**except** the ones the risk rules flag as unsafe, which instead receive
`'use no memo'; // justified: <rule> risk via <symbol> — unsafe to memoize`. It only differs
from `all` when risk detection is enabled via `--risk-config` (otherwise no risks are found and
it behaves identically). Example output:

```tsx
// WidgetViaHook — safe → opted in
export function WidgetViaHook() {
  'use memo';
  // …
}

// WidgetIndirect — reaches getState() through a wrapper → bailed out
export function WidgetIndirect() {
  'use no memo'; // justified: nonreactive-store-read risk via getAppStore.getState — unsafe to memoize
  // …
}
```

#### Compiled but Risky (runtime-risk rules)

The compiler reports `CompileSuccess` based purely on whether a function is _structurally_
compilable. It does **not** reason about a value's reactivity, nor recognize hooks that aren't
`useXxx()`-named at the call site — so `analyze` adds an opt-in **Compiled but Risky** section
flagging real, compiler-introduced bugs:

| Rule                     | What it catches                                                                                                       | Why memoization breaks it                                                                                                                                                                                             |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `nonreactive-store-read` | Imperative store snapshots: `store.getState().field`, `getXStore().field`, `const { field } = getXStore()` _(opt-in)_ | The read has no tracked inputs, so the compiler hoists it into a compute-once cache slot — it runs on the first render and is **never re-read**, freezing the value.                                                  |
| `hidden-selector-hook`   | Selector hooks accessed via property chain: `store.use.field()` _(opt-in)_                                            | `.use.field()` calls a real hook (`useStore`) internally but isn't `useXxx()`-named, so the compiler memoizes around it — running the hidden hook only on the first render → hook-order crash (`areHookInputsEqual`). |

Both are verifiable in the compiler's own output: the call is wrapped in a
`Symbol.for("react.memo_cache_sentinel")` slot that computes once and then always returns the
cached value. For a plain snapshot that freezes the value; for a hidden hook that means the
underlying `useStore` runs only once, changing the hook count between renders and crashing.

Findings are severity-ranked:

- `high` — a `.getState()` snapshot read, or a `store.use.field()` hidden selector hook.
- `medium` — a `getXStore().field` read matching a configured store-accessor pattern.

All rules are **off by default** — their `.getState()` / `getXStore()` / `.use.field()`
conventions are app-specific, so they only run when you opt in via `--risk-config`:

```jsonc
{
  // Optional: enables editor IntelliSense + validation against the shipped schema.
  "$schema": "./node_modules/@fluentui/react-compiler-analyzer/risk-config.schema.json",
  // Enable `nonreactive-store-read` for `.getState()` snapshot reads (default: false).
  "detectGetStateReads": true,
  // Enable `nonreactive-store-read` for `getXStore().field`. Regex matching accessor names. Omit to disable.
  "storeAccessorPattern": "Store$",
  // Enable `hidden-selector-hook` for property-chain selectors. Marker property names, e.g.
  // ["use"] matches `store.use.field()`. Empty/omitted disables the rule.
  "selectorHookProperties": ["use"]
}
```

The config is validated on load: unknown keys are rejected. A JSON schema ships with the package
at `risk-config.schema.json` (copied to the published root on build) — point your editor's
`$schema` at it, as shown above, for autocomplete and inline validation.

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
  "$schema": "./node_modules/@fluentui/react-compiler-analyzer/risk-config.schema.json",
  "detectGetStateReads": true,
  "resolveWrappers": true,
  // Only needed if wrappers are imported via tsconfig path aliases (not plain relative imports).
  "pathAliases": { "baseUrl": "/abs/repo/src", "paths": { "@app/*": ["app/*"] } }
}
```

The finding reads e.g. `reached via \`readActiveIdIndirect → readActiveId\`: imperative store
snapshot via .getState()…`. Resolution is **demand-driven and memoized** (files are parsed only
when a call path reaches them), so it's far cheaper than a full TypeScript `Program`. It is
purely **syntactic and first-party**: `useXxx()`-named callees are skipped (the compiler
recognizes those as hooks and they're flagged at their own definition), and it stops at the
`node_modules` boundary, dynamic dispatch, and method calls on inferred receivers.

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
- **Indirect binds** — `const s = getStore(); … s.field` (the accessor result stored in a variable and
  read later). Only direct member access and object-destructuring off the accessor call are detected.
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
for sites that compile cleanly but may need a justified `'use no memo'` opt-out.

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
react-compiler-analyzer analyze ./library/src --risk-config risk.json --annotate all-safe
```

## Shared options

| Argument / Flag  | Type       | Default | Description                                                                                                                        |
| ---------------- | ---------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `<paths..>`      | `string[]` | —       | **Required.** One or more files or directories to scan for `.ts`/`.tsx` files. Excludes are not applied to explicitly passed files |
| `--format`       | `string`   | `"cli"` | Output format: `cli` (terminal-friendly plain text), `md` (GitHub-flavored markdown), or `html` (styled document)                  |
| `--verbose`      | `boolean`  | `false` | Print per-function detail tables                                                                                                   |
| `--full-reasons` | `boolean`  | `false` | Show the compiler's full code-framed diagnostics instead of one-line summaries                                                     |
| `--concurrency`  | `number`   | `10`    | Max parallel file processing                                                                                                       |
| `--exclude`      | `string[]` | _(1)_   | Glob patterns to exclude                                                                                                           |

_(1)_ Default excludes: `**/__tests__/**`, `**/testing/**`, `**/__mocks__/**`, `**/*.spec.*`, `**/*.test.*`, `**/*.stories.*`, `**/*.cy.*`

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

Pass `--format md` when capturing output for a markdown destination (e.g. posting to a PR), or `--format html`
for a shareable report you can open in a browser:

```bash
react-compiler-analyzer analyze ./library/src --format md > coverage-report.md
react-compiler-analyzer analyze ./library/src --format html > coverage-report.html
```

Section headings are color-coded by compiler state — **Compiled** (green), **Errors** (red), **Skipped** (yellow),
and **Migration Candidates** (blue). In `cli` format, colors use ANSI and are emitted only when stdout is an
interactive terminal; honors `NO_COLOR` / `FORCE_COLOR`. In `html` format, colors are applied via CSS. `md` output
is left plain (markdown has no native text color).

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

## Architecture

```
src/
├── cli.ts                — CLI entry: yargs with lint + analyze commands
├── commands/
│   ├── shared.ts         — Shared options, validation, DEFAULT_EXCLUDE
│   ├── lint.ts           — 'lint' command (directive health CI gate)
│   └── analyze.ts        — 'analyze' command (coverage + migration)
├── compiler.ts           — Unified compilation: compileFile, compileFiles, compileSource
├── concurrency.ts        — Generic concurrent file processor
├── discovery.ts          — File discovery (findPackageName, discoverFilesWithDirectives, discoverAllFiles)
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
├── formatter.ts          — Output rendering abstraction (cli plain text / md markdown / html document)
├── patterns.ts           — Shared regex patterns for directive detection
├── types.ts              — Shared TypeScript interfaces
└── index.ts              — Package entry (CLI-only, no public API)
```

### Data flow

```
discoverFiles → compileFiles(entries) → FileCompilationResult[]
                                            │
                          ┌─────────────────┼─────────────────┐
                          ▼                 ▼                  ▼
                  deriveCoverage   deriveMemoDirective   analyzeNoMemo
                                   Statuses              Directives
                          │                 │                  │
                          ▼                 ▼                  ▼
                   FunctionAnalysis[]  DirectiveAnalysis[]  DirectiveAnalysis[]
```

Each file is compiled **once** via `compileFile()`. Downstream analysis functions are pure derivations over the `FileCompilationResult` (except `analyzeNoMemoDirectives` which requires a second stripped-directive compilation).

Key dependencies:

- `@babel/core` — runs `transformAsync` for each file
- `@babel/preset-typescript` — parses `.ts`/`.tsx` without SWC
- `babel-plugin-react-compiler` — the React Compiler itself, configured with `noEmit: true` and a custom `Logger`
