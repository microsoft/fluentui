# @fluentui/react-compiler-analyzer

Analyzes React Compiler behavior on TypeScript source files. Two commands:

- **`directives`** — Detects redundant `'use no memo'` directives by checking whether the compiler actually needs to bail out.
- **`coverage`** — Reports which functions the React Compiler will memoize, skip, or bail out on. Also detects manual memoization (`useMemo`, `useCallback`, `React.memo`) and identifies migration candidates.

## Commands

### `directives` — Redundant directive analysis

During the React Compiler migration, `'use no memo'` directives were added conservatively to many hooks and components. Most of these are redundant — the compiler is smart enough to bail out on its own when it encounters patterns it can't safely optimize (state mutations, conditional hooks, etc.).

For each source file containing `'use no memo'`:

1. **Parse** — finds all `'use no memo'` directive locations and checks for `// justified: <reason>` comments
2. **Strip** — creates an in-memory copy of the source with non-justified directives removed (no files are written)
3. **Analyze** — runs `babel-plugin-react-compiler` with `noEmit: true` and a custom `Logger` that captures per-function compiler events
4. **Classify** each directive:

| Status        | Meaning                                                                      | `--fix` action                          |
| ------------- | ---------------------------------------------------------------------------- | --------------------------------------- |
| **Redundant** | Compiler emitted `CompileError` / `PipelineError` — it bails out anyway      | Removes the directive                   |
| **Active**    | Compiler emitted `CompileSuccess` — the directive is preventing optimization | Annotates with `// justified: <reason>` |
| **Skipped**   | Directive already has a `// justified:` comment                              | No change                               |

The analysis uses `@babel/preset-typescript` to handle `.ts`/`.tsx` directly — no SWC pre-compilation needed. Babel config is fully isolated (`babelrc: false, configFile: false`) so package-level configs don't interfere.

## Usage

```bash
# Directive analysis — detect redundant 'use no memo' directives
react-compiler-analyzer directives ./packages/react-components/react-tree/library/src

# Auto-fix: remove redundant directives + annotate active ones
react-compiler-analyzer directives ./library/src --fix

# Coverage analysis — report which functions will be memoized
react-compiler-analyzer coverage ./packages/react-components/react-button/library/src

# Coverage with a specific compilation mode
react-compiler-analyzer coverage ./library/src --mode all

# Coverage with per-function details
react-compiler-analyzer coverage ./library/src --verbose

# Coverage with migration candidates + auto-annotate
react-compiler-analyzer coverage ./library/src --annotate

# Show full compiler error reasons (works for both commands)
react-compiler-analyzer directives ./src --full-reasons

# Save report to a file
react-compiler-analyzer coverage ./src > report.md
```

### Nx integration

The tool accepts any directory path, making it usable as an Nx target per project:

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

## CLI arguments

### Shared options (all commands)

| Argument / Flag  | Type       | Default | Description                                                      |
| ---------------- | ---------- | ------- | ---------------------------------------------------------------- |
| `<path>`         | `string`   | —       | **Required.** Directory to scan for `.ts`/`.tsx` files           |
| `--verbose`      | `boolean`  | `false` | Print per-function compiler events                               |
| `--full-reasons` | `boolean`  | `false` | Show full compiler error messages instead of truncated summaries |
| `--concurrency`  | `number`   | `10`    | Max parallel file processing                                     |
| `--exclude`      | `string[]` | _(1)_   | Glob patterns to exclude (tests, stories, mocks)                 |
| `--help`         |            |         | Show help                                                        |

_(1)_ Default excludes: `**/__tests__/**`, `**/testing/**`, `**/__mocks__/**`, `**/*.spec.*`, `**/*.test.*`, `**/*.stories.*`, `**/*.cy.*`

### `directives` command options

| Flag    | Type      | Default | Description                                               |
| ------- | --------- | ------- | --------------------------------------------------------- |
| `--fix` | `boolean` | `false` | Auto-remove redundant directives and annotate active ones |

### `coverage` command options

| Flag         | Type      | Default   | Description                                                               |
| ------------ | --------- | --------- | ------------------------------------------------------------------------- |
| `--mode`     | `string`  | `"infer"` | React Compiler compilation mode. Choices: `infer`, `annotation`, `all`    |
| `--annotate` | `boolean` | `false`   | Insert `'use memo'` into compilable functions that use manual memoization |

The package name shown in the report is derived from the nearest `package.json` found by walking up from `<path>`.

## Report output

The report is valid Markdown grouped by package:

```
## react-tree

### Active (needs `// justified:` comment)

| File | Line | Function | Compiler Event | Reason |
|------|------|----------|----------------|--------|
| .../useTree.ts | 27 | useNestedRootTree | CompileSuccess |  |

### Redundant (removable)

| File | Line | Function | Compiler Event | Reason |
|------|------|----------|----------------|--------|
| .../useTreeStyles.styles.ts | 25 | useTreeStyles_unstable | CompileError | This value cannot be modified... |

## Summary

- **Total directives:** 16
- **Redundant** (removable): 13
- **Active** (needs `// justified:` comment): 3
- **Skipped** (already justified): 0
```

## Exit codes

### `directives`

| Code | Meaning                                               |
| ---- | ----------------------------------------------------- |
| `0`  | No redundant directives found, or `--fix` was applied |
| `1`  | Redundant directives exist (useful for CI gating)     |

### `coverage`

| Code | Meaning                    |
| ---- | -------------------------- |
| `0`  | Analysis complete (always) |

## What `--fix` does

1. **Removes** redundant `'use no memo'` lines from source files
2. **Annotates** active directives with a justification comment:
   ```ts
   'use no memo'; // justified: compiler would optimize useFoo — manual opt-out to preserve runtime behavior
   ```

The annotation format matches the pattern required by the `@nx/workspace-no-unjustified-use-no-memo` ESLint rule, so all remaining directives will pass lint after fixing.

## Relationship to the ESLint rule

The `@nx/workspace-no-unjustified-use-no-memo` ESLint rule (in `tools/eslint-rules/`) enforces that every `'use no memo'` carries a `// justified: <reason>` comment. Its auto-fix removes any directive without justification.

This analyzer is complementary — it uses the React Compiler itself to determine **which** directives are actually needed before deciding what to remove or justify. The ESLint rule enforces the policy; the analyzer provides the data.

## Gradual Migration with `--annotate`

The `coverage` command supports a gradual migration workflow for adopting the React Compiler. It detects manual memoization patterns (`useMemo`, `useCallback`, `React.memo`) and cross-references them with the compiler's analysis to identify **migration candidates** — functions that the compiler can already optimize automatically.

### What it detects

The analyzer runs a babel plugin _before_ the React Compiler plugin that counts: s

- `useMemo(...)` calls inside each function
- `useCallback(...)` calls inside each function
- `React.memo(...)` / `memo(...)` wrapping (when called inside a function body)

Functions that already contain `'use memo'` are skipped (idempotent).

### Migration Candidates

A function is a migration candidate when:

1. The React Compiler reports `CompileSuccess` (it can fully optimize the function)
2. The function contains manual memoization hooks

These functions are listed in the **"Migration Candidates"** section of the report:

```
## Migration Candidates

| File | Line | Function | useMemo | useCallback | React.memo | Memo Slots |
|------|------|----------|---------|-------------|------------|------------|
| src/useTree.ts | 12 | useTree_unstable | 2 | 1 | no | 5 |
| src/Tree.tsx | 8 | Tree | 0 | 1 | no | 3 |

> **2** migration candidate(s) found.
```

### Using `--annotate`

The `--annotate` flag automatically inserts `'use memo';` at the top of each migration candidate's function body:

```bash
# Dry run — see candidates without modifying files
react-compiler-analyzer coverage ./library/src

# Apply annotations
react-compiler-analyzer coverage ./library/src --annotate
```

**Before:**

```tsx
export function useTree_unstable(props: TreeProps) {
  const sorted = useMemo(() => sortItems(props.items), [props.items]);
  // ...
}
```

**After:**

```tsx
export function useTree_unstable(props: TreeProps) {
  'use memo';
  const sorted = useMemo(() => sortItems(props.items), [props.items]);
  // ...
}
```

### What `--annotate` does NOT do

- Does **not** remove `useMemo`, `useCallback`, or `React.memo` calls — that's a separate refactoring step
- Does **not** modify functions where the compiler cannot compile successfully (errors/bailouts)
- Does **not** insert duplicate directives (running twice is safe)

### Recommended workflow

1. **Audit** — Run `coverage` without `--annotate` to review migration candidates
2. **Annotate** — Run with `--annotate` to opt-in candidates to compiler optimization
3. **Verify** — Run tests, check bundle size; the compiler now handles memoization for these functions
4. **Clean up** (optional, future step) — Remove now-redundant `useMemo`/`useCallback` calls since the compiler handles them

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

Key dependencies

- `@babel/core` — runs `transformAsync` for each file
- `@babel/preset-typescript` — parses `.ts`/`.tsx` without SWC
- `babel-plugin-react-compiler` — the React Compiler itself, configured with `noEmit: true` and a custom `Logger`. Defined as package peerDependency to enforce use of user land installed react compiler.
