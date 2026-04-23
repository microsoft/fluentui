# @fluentui/react-compiler-analyzer

Detects redundant `'use no memo'` directives by running `babel-plugin-react-compiler` in analysis mode and checking whether the compiler actually needs to bail out.

## Problem

During the React Compiler migration, `'use no memo'` directives were added conservatively to many hooks and components. Most of these are redundant — the compiler is smart enough to bail out on its own when it encounters patterns it can't safely optimize (state mutations, conditional hooks, etc.).

## How it works

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
# Analyze a directory
react-compiler-analyzer ./packages/react-components/react-tree/library/src

# Auto-fix: remove redundant directives + annotate active ones
react-compiler-analyzer ./library/src --fix

# Show full compiler error reasons (not truncated)
react-compiler-analyzer ./src --full-reasons

# Verbose mode: per-function compiler events
react-compiler-analyzer ./src --verbose

# Save report to a file
react-compiler-analyzer ./src --full-reasons > report.md
```

### Nx integration

The tool accepts any directory path, making it usable as an Nx target per project:

```jsonc
// project.json
{
  "targets": {
    "analyze-compiler": {
      "command": "react-compiler-analyzer ./library/src"
    }
  }
}
```

## CLI arguments

| Argument / Flag  | Type       | Default | Description                                                      |
| ---------------- | ---------- | ------- | ---------------------------------------------------------------- |
| `<path>`         | `string`   | —       | **Required.** Directory to scan for `.ts`/`.tsx` files           |
| `--fix`          | `boolean`  | `false` | Auto-remove redundant directives and annotate active ones        |
| `--verbose`      | `boolean`  | `false` | Print per-function compiler events                               |
| `--full-reasons` | `boolean`  | `false` | Show full compiler error messages instead of truncated summaries |
| `--concurrency`  | `number`   | `10`    | Max parallel file processing                                     |
| `--exclude`      | `string[]` | _(1)_   | Glob patterns to exclude (tests, stories, mocks)                 |
| `--help`         |            |         | Show help                                                        |

_(1)_ Default excludes: `**/__tests__/**`, `**/testing/**`, `**/__mocks__/**`, `**/*.spec.*`, `**/*.test.*`, `**/*.stories.*`, `**/*.cy.*`

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

| Code | Meaning                                               |
| ---- | ----------------------------------------------------- |
| `0`  | No redundant directives found, or `--fix` was applied |
| `1`  | Redundant directives exist (useful for CI gating)     |

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
├── cli.ts        — CLI entry: arg parsing → file discovery → analysis → report → fix
├── args.ts       — yargs argument definitions and validation
├── analyzer.ts   — Core engine: directive parsing, source stripping, babel transforms, event correlation
├── reporter.ts   — Markdown report generation (grouped by package, then by status)
├── fixer.ts      — Source file modifications (remove redundant, annotate active)
├── types.ts      — Shared TypeScript interfaces
└── index.ts      — Public API exports
```

Key dependencies

- `@babel/core` — runs `transformAsync` for each file
- `@babel/preset-typescript` — parses `.ts`/`.tsx` without SWC
- `babel-plugin-react-compiler` — the React Compiler itself, configured with `noEmit: true` and a custom `Logger`. Defined as package peerDependency to enforce use of user land installed react compiler.
