# @fluentui/react-compiler-analyzer

Analyzes React Compiler behavior on TypeScript source files. Two commands:

- **`lint`** — CI gate: validates `'use no memo'` and `'use memo'` directives for correctness. Exits 1 on issues.
- **`analyze`** — Health report: compiler coverage stats, directive breakdown, and migration candidates.

## User Flows

### Flow 1: Initial migration assessment

```bash
# See what compiler can optimize across a package
react-compiler-analyzer analyze ./library/src --mode infer --verbose
# Output: coverage stats + directive health breakdown + migration candidates
```

Team reviews output — identifies which components compile, which error out, which have manual memo the compiler can replace.

### Flow 2: Gradual opt-in (annotation mode build)

```bash
# 1. Identify candidates — what CAN compile and has manual memo
react-compiler-analyzer analyze ./library/src --mode infer

# 2. Opt-in compilable candidates — insert 'use memo' for compiler to pick up at build time
react-compiler-analyzer analyze ./library/src --mode infer --annotate

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

# Informational only (exit 0): 'use memo' is redundant in infer mode
# (compiler already picks up named components/hooks without it)
```

## Commands

### `lint` — Directive health gate

```bash
react-compiler-analyzer lint <path> [options]
```

Scans for both `'use no memo'` and `'use memo'` directives. `--mode` controls what compilation strategy is assumed.

#### Status categories

| Status        | Meaning                                                | Exit code                                                                 |
| ------------- | ------------------------------------------------------ | ------------------------------------------------------------------------- |
| `redundant`   | Directive has no effect                                | **1** (for `'use no memo'`); **0** (for `'use memo'`, informational only) |
| `active`      | Directive meaningfully changes compiler behavior       | 0                                                                         |
| `broken`      | `'use memo'` requests compilation that errors          | **1**                                                                     |
| `conflicting` | Both `'use no memo'` and `'use memo'` on same function | **1**                                                                     |
| `skipped`     | Has `// justified:` comment                            | 0                                                                         |

#### Classification matrix

| Directive                      | Scenario                      | `--mode infer`              | `--mode annotation` |
| ------------------------------ | ----------------------------- | --------------------------- | ------------------- |
| `'use no memo'`                | on compilable named component | **active**                  | **redundant**       |
| `'use no memo'`                | on non-compilable function    | **redundant**               | **redundant**       |
| `'use no memo'` + `'use memo'` | on same function              | **conflicting**             | **conflicting**     |
| `'use memo'`                   | on compilable named component | **redundant** _(info only)_ | **active**          |
| `'use memo'`                   | on non-compilable function    | **broken**                  | **broken**          |

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

# Auto-fix
react-compiler-analyzer lint ./library/src --fix

# Show full compiler error reasons
react-compiler-analyzer lint ./src --full-reasons
```

### `analyze` — Coverage + migration report

```bash
react-compiler-analyzer analyze <path> [options]
```

Reports which functions the React Compiler will memoize, skip, or bail out on. Also shows a directive breakdown summary. Always exits 0.

#### Options

| Flag         | Type      | Default   | Description                                                               |
| ------------ | --------- | --------- | ------------------------------------------------------------------------- |
| `--mode`     | `string`  | `"infer"` | Compilation mode: `infer`, `annotation`, `all`                            |
| `--annotate` | `boolean` | `false`   | Insert `'use memo'` into compilable functions that use manual memoization |

#### `--annotate`

A function is a **migration candidate** when:

1. The React Compiler reports `CompileSuccess`
2. The function contains manual memoization (`useMemo`, `useCallback`, `React.memo`)

Inserts `'use memo';` at the top of each candidate's function body. Idempotent.

#### Examples

```bash
# Full analysis report
react-compiler-analyzer analyze ./library/src --verbose

# Use annotation compilation mode
react-compiler-analyzer analyze ./library/src --mode annotation

# Auto-annotate migration candidates
react-compiler-analyzer analyze ./library/src --annotate
```

## Shared options

| Argument / Flag  | Type       | Default | Description                                            |
| ---------------- | ---------- | ------- | ------------------------------------------------------ |
| `<path>`         | `string`   | —       | **Required.** Directory to scan for `.ts`/`.tsx` files |
| `--verbose`      | `boolean`  | `false` | Print per-function detail tables                       |
| `--full-reasons` | `boolean`  | `false` | Show full compiler error messages                      |
| `--concurrency`  | `number`   | `10`    | Max parallel file processing                           |
| `--exclude`      | `string[]` | _(1)_   | Glob patterns to exclude                               |

_(1)_ Default excludes: `**/__tests__/**`, `**/testing/**`, `**/__mocks__/**`, `**/*.spec.*`, `**/*.test.*`, `**/*.stories.*`, `**/*.cy.*`

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
│   └── analyze.ts        — 'analyze' command (coverage + directives + migration)
├── compiler.ts           — Unified compiler invocation (compileSource, CompilerEvent, extractDetailReason)
├── concurrency.ts        — Generic concurrent file processor
├── discovery.ts          — File discovery (findPackageName, discoverFilesWithDirectives, discoverAllFiles)
├── analyzer.ts           — Directive analysis engine (both 'use no memo' + 'use memo')
├── coverage-analyzer.ts  — Coverage engine (compiler + manual-memo plugin)
├── manual-memo-plugin.ts — Babel plugin detecting useMemo/useCallback/React.memo
├── fixer.ts              — Directive fixes (remove redundant, justify active, resolve conflicts)
├── coverage-fixer.ts     — Insert 'use memo' annotations for migration candidates
├── reporter.ts           — Directive reporting (full report + compact summary for analyze)
├── coverage-reporter.ts  — Coverage reporting (stats, per-function, migration candidates)
├── patterns.ts           — Shared regex patterns for directive detection
├── types.ts              — Shared TypeScript interfaces
└── index.ts              — Package entry (CLI-only, no public API)
```

Key dependencies:

- `@babel/core` — runs `transformAsync` for each file
- `@babel/preset-typescript` — parses `.ts`/`.tsx` without SWC
- `babel-plugin-react-compiler` — the React Compiler itself, configured with `noEmit: true` and a custom `Logger`
