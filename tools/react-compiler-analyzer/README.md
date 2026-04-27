# @fluentui/react-compiler-analyzer

Analyzes React Compiler behavior on TypeScript source files. Two commands:

- **`directives`** — Detects redundant `'use no memo'` directives by checking whether the compiler actually needs to bail out.
- **`coverage`** — Reports which functions the React Compiler will memoize, skip, or bail out on.

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

| Flag     | Type     | Default   | Description                                                            |
| -------- | -------- | --------- | ---------------------------------------------------------------------- |
| `--mode` | `string` | `"infer"` | React Compiler compilation mode. Choices: `infer`, `annotation`, `all` |

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

## Architecture

```
src/
├── cli.ts                — CLI entry: arg parsing → command dispatch → report
├── args.ts               — yargs subcommand definitions and validation
├── analyzer.ts           — Directive engine: parsing, source stripping, babel transforms, event correlation
├── coverage-analyzer.ts  — Coverage engine: runs compiler on all files, captures per-function events
├── reporter.ts           — Directive report generation (grouped by package, then by status)
├── coverage-reporter.ts  — Coverage report generation (summary tables + per-function details)
├── compiler-utils.ts     — Shared utilities for processing compiler events
├── fixer.ts              — Source file modifications (remove redundant, annotate active)
├── types.ts              — Shared TypeScript interfaces
└── index.ts              — Public API exports
```

Key dependencies

- `@babel/core` — runs `transformAsync` for each file
- `@babel/preset-typescript` — parses `.ts`/`.tsx` without SWC
- `babel-plugin-react-compiler` — the React Compiler itself, configured with `noEmit: true` and a custom `Logger`. Defined as package peerDependency to enforce use of user land installed react compiler.
