# @fluentui/react-compiler-analyzer

Analyzes React Compiler behavior on TypeScript source files. Two commands:

- **`directives`** — Detects redundant `'use no memo'` directives by checking whether the compiler actually needs to bail out.
- **`coverage`** — Reports which functions the React Compiler will memoize, skip, or bail out on. Also detects manual memoization (`useMemo`, `useCallback`, `React.memo`) and identifies migration candidates.

## `directives`

Detects redundant `'use no memo'` directives that were added conservatively during the React Compiler migration. Most are redundant — the compiler bails out on its own for patterns it can't safely optimize.

```bash
react-compiler-analyzer directives <path> [options]
```

### How it works

For each source file containing `'use no memo'`:

1. **Parse** — finds all directive locations and checks for `// justified: <reason>` comments
2. **Strip** — creates an in-memory copy with non-justified directives removed (no files written)
3. **Analyze** — runs `babel-plugin-react-compiler` with `noEmit: true` and a custom `Logger`
4. **Classify** each directive:

| Status        | Meaning                                                               | `--fix` action                          |
| ------------- | --------------------------------------------------------------------- | --------------------------------------- |
| **Redundant** | Compiler emits `CompileError` / `PipelineError` — it bails out anyway | Removes the directive                   |
| **Active**    | Compiler emits `CompileSuccess` — the directive prevents optimization | Annotates with `// justified: <reason>` |
| **Skipped**   | Directive already has a `// justified:` comment                       | No change                               |

### Options

| Flag    | Type      | Default | Description                                               |
| ------- | --------- | ------- | --------------------------------------------------------- |
| `--fix` | `boolean` | `false` | Auto-remove redundant directives and annotate active ones |

When `--fix` annotates an active directive it uses:

```ts
'use no memo'; // justified: compiler would optimize useFoo — manual opt-out to preserve runtime behavior
```

This format satisfies the `@nx/workspace-no-unjustified-use-no-memo` ESLint rule (in `tools/eslint-rules/`), which enforces that every `'use no memo'` carries a justification comment.

Exit code `1` when redundant directives exist and `--fix` is not applied (useful for CI gating).

### Examples

```bash
# Detect redundant directives
react-compiler-analyzer directives ./packages/react-components/react-tree/library/src

# Auto-fix: remove redundant + annotate active
react-compiler-analyzer directives ./library/src --fix

# Show full compiler error reasons
react-compiler-analyzer directives ./src --full-reasons
```

## `coverage`

Reports which functions the React Compiler will memoize, skip, or bail out on. Detects manual memoization and identifies migration candidates.

```bash
react-compiler-analyzer coverage <path> [options]
```

### Options

| Flag         | Type      | Default   | Description                                                               |
| ------------ | --------- | --------- | ------------------------------------------------------------------------- |
| `--mode`     | `string`  | `"infer"` | React Compiler compilation mode. Choices: `infer`, `annotation`, `all`    |
| `--annotate` | `boolean` | `false`   | Insert `'use memo'` into compilable functions that use manual memoization |

### `--annotate`

Supports a gradual migration workflow. A function is a **migration candidate** when:

1. The React Compiler reports `CompileSuccess` (it can fully optimize the function)
2. The function contains manual memoization (`useMemo`, `useCallback`, `React.memo`)

The flag inserts `'use memo';` at the top of each candidate's function body:

**Before:**

```tsx
export function useTree_unstable(props: TreeProps) {
  const sorted = useMemo(() => sortItems(props.items), [props.items]);
}
```

**After:**

```tsx
export function useTree_unstable(props: TreeProps) {
  'use memo';
  const sorted = useMemo(() => sortItems(props.items), [props.items]);
}
```

It does **not** remove `useMemo`/`useCallback`/`React.memo` calls, does not modify functions the compiler cannot compile, and is idempotent (running twice is safe).

**Recommended workflow:**

1. **Audit** — Run `coverage` without `--annotate` to review migration candidates
2. **Annotate** — Run with `--annotate` to opt-in candidates to compiler optimization
3. **Verify** — Run tests, check bundle size
4. **Clean up** (optional) — Remove now-redundant manual memoization calls

### Examples

```bash
# Report which functions will be memoized
react-compiler-analyzer coverage ./packages/react-components/react-button/library/src

# Per-function detail tables
react-compiler-analyzer coverage ./library/src --verbose

# Use annotation compilation mode
react-compiler-analyzer coverage ./library/src --mode annotation

# Auto-annotate migration candidates
react-compiler-analyzer coverage ./library/src --annotate

# Save report to a file
react-compiler-analyzer coverage ./src > report.md
```

## Shared options

| Argument / Flag  | Type       | Default | Description                                                      |
| ---------------- | ---------- | ------- | ---------------------------------------------------------------- |
| `<path>`         | `string`   | —       | **Required.** Directory to scan for `.ts`/`.tsx` files           |
| `--verbose`      | `boolean`  | `false` | Print per-function detail tables                                 |
| `--full-reasons` | `boolean`  | `false` | Show full compiler error messages instead of truncated summaries |
| `--concurrency`  | `number`   | `10`    | Max parallel file processing                                     |
| `--exclude`      | `string[]` | _(1)_   | Glob patterns to exclude (tests, stories, mocks)                 |

_(1)_ Default excludes: `**/__tests__/**`, `**/testing/**`, `**/__mocks__/**`, `**/*.spec.*`, `**/*.test.*`, `**/*.stories.*`, `**/*.cy.*`

The package name shown in the report is derived from the nearest `package.json` found by walking up from `<path>`.

## Nx integration

```jsonc
// project.json
{
  "targets": {
    "analyze-compiler": {
      "command": "react-compiler-analyzer directives ./library/src"
    },
    "compiler-coverage": {
      "command": "react-compiler-analyzer coverage ./library/src"
    }
  }
}
```

## Architecture

```
src/
├── cli.ts                — CLI entry: yargs setup and command registration
├── commands/
│   ├── shared.ts         — Shared options builder, path/concurrency validation, defaults
│   ├── directives.ts     — CommandModule for 'directives' (builder + handler)
│   └── coverage.ts       — CommandModule for 'coverage' (builder + handler, --annotate)
├── discovery.ts          — File discovery utilities (findPackageName, glob helpers)
├── analyzer.ts           — Directive engine: parsing, source stripping, babel transforms, event correlation
├── coverage-analyzer.ts  — Coverage engine: runs manual-memo + compiler plugins, captures per-function events
├── manual-memo-plugin.ts — Babel plugin detecting useMemo/useCallback/React.memo usage per function
├── coverage-fixer.ts     — Applies 'use memo' annotations to migration candidates
├── reporter.ts           — Directive report generation (grouped by package, then by status)
├── coverage-reporter.ts  — Coverage report generation (summary tables + migration candidates + per-function details)
├── compiler-utils.ts     — Shared utilities for processing compiler events
├── fixer.ts              — Source file modifications (remove redundant, annotate active)
├── types.ts              — Shared TypeScript interfaces
└── index.ts              — Public API exports
```

Key dependencies:

- `@babel/core` — runs `transformAsync` for each file
- `@babel/preset-typescript` — parses `.ts`/`.tsx` without SWC
- `babel-plugin-react-compiler` — the React Compiler itself, configured with `noEmit: true` and a custom `Logger`
