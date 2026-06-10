# @fluentui/react-compiler-analyzer

Analyzes React Compiler behavior on TypeScript source files. Two commands:

- **`lint`** — CI gate: validates `'use no memo'` and `'use memo'` directives for correctness. Exits 1 on issues.
- **`analyze`** — Health report: compiler coverage stats, directive breakdown, migration candidates, and runtime-risk detection ("Compiled but Risky").

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

| Flag            | Type     | Default   | Description                                                                                                             |
| --------------- | -------- | --------- | ----------------------------------------------------------------------------------------------------------------------- |
| `--mode`        | `string` | `"infer"` | Compilation mode: `infer`, `annotation`, `all`                                                                          |
| `--annotate`    | `string` | —         | Insert `'use memo'` directives. `manual-memo`: only functions with manual memoization. `all`: all compilable functions. |
| `--risk-config` | `string` | —         | Path to a JSON file configuring runtime-risk detection (see **Compiled but Risky**).                                    |

#### `--annotate`

Controls which compilable functions receive a `'use memo'` directive:

| Mode          | Annotates                                                                                                            |
| ------------- | -------------------------------------------------------------------------------------------------------------------- |
| `manual-memo` | Only functions that compile successfully **and** contain manual memoization (`useMemo`, `useCallback`, `React.memo`) |
| `all`         | All functions that compile successfully, regardless of manual memoization                                            |

Inserts `'use memo';` at the top of each matching function's body. Idempotent — functions that already have the directive are skipped.

#### Compiled but Risky (runtime-risk heuristics)

The compiler reports `CompileSuccess` based purely on whether a function is _structurally_
compilable. It does **not** reason about two semantic contracts that break at runtime once
the function is memoized — so `analyze` adds a heuristic **Compiled but Risky** section that
flags them:

| Rule                     | What it catches                                                                                         | Why memoization breaks it                                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `unstable-hook-arg`      | Fresh inline object/array/`equalityFn` passed to a selector hook each render (`useSelector(fn, {...})`) | Destabilizes the hook's `useSyncExternalStoreWithSelector` dependency slots → crash in React's `areHookInputsEqual`. |
| `nonreactive-store-read` | Imperative store snapshots: `store.getState().field`, `getXStore().field` _(opt-in only)_               | The read has no tracked inputs, so the compiler caches a **stale** value across store transitions.                   |

Findings are severity-ranked:

- `high` — a configured selector hook, or a `.getState()` snapshot.
- `medium` — a `getXStore().field` read matching a configured store-accessor pattern.
- `low` — a generic inline object/array passed to an unrecognized `use*` hook.

> **Note on conditional hooks.** A natural follow-up idea is to raise confidence when the
> function also contains a _conditionally-reached_ hook (after an early `return`, or inside an
> `if`/ternary) — the slot-count variance that backs the `areHookInputsEqual` crash. This was
> evaluated and intentionally **not** implemented: the React Compiler already emits a
> Rules-of-Hooks `CompileError` for that lexical shape, so such functions never reach
> `CompileSuccess` and the signal would never co-occur with a surfaced finding. The crashing
> functions that motivated this rule compiled successfully precisely because their hooks were
> all lexically unconditional — the variance lived inside a third-party selector hook at
> runtime, invisible to static analysis.

`unstable-hook-arg` runs generically and is **on by default** (zero config). `nonreactive-store-read`
is **off by default** — its `.getState()` / `getXStore()` conventions are app-specific, so it only
runs when you opt in via `--risk-config`. Use the config file to tighten or extend detection:

```jsonc
{
  // Optional: enables editor IntelliSense + validation against the shipped schema.
  "$schema": "./node_modules/@fluentui/react-compiler-analyzer/risk-config.schema.json",
  // Exact hook names to treat as high-confidence selector hooks (raises severity to `high`).
  "selectorHooks": ["useFilteredItems", "useItemField", "useStoreValue"],
  // Import sources whose `use*` exports are high-confidence selector hooks.
  "selectorHookSources": ["@acme/store-hooks"],
  // Enable `nonreactive-store-read` for `.getState()` snapshot reads (default: false).
  "detectGetStateReads": true,
  // Enable `nonreactive-store-read` for `getXStore().field`. Regex matching accessor names. Omit to disable.
  "storeAccessorPattern": "Store$",
  // Set to false to flag ONLY the configured selector hooks (disables the generic unstable-hook-arg heuristic).
  "generic": true
}
```

The config is validated on load: unknown keys are rejected. A JSON schema ships with the package
at `risk-config.schema.json` (copied to the published root on build) — point your editor's
`$schema` at it, as shown above, for autocomplete and inline validation.

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
