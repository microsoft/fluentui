# `report` command

The `report` command generates reports about Fluent UI package usage in a codebase. It has two subcommands targeting different audiences and use cases.

## Subcommands

### `report info`

Quick package & environment summary intended for **end-users** reporting issues.

```bash
fluentui report info
```

Outputs a copy-paste-friendly block with:

- System info (Node version, OS, package manager)
- Installed Fluent UI and related packages with versions
- Duplicate package warnings (multiple resolved versions)

No flags — runs against the current project and prints to stdout.

#### Tracked packages

| Scope          | Packages                                                |
| -------------- | ------------------------------------------------------- |
| Fluent scoped  | `@fluentui/*`, `@fluentui-contrib/*`                    |
| Fluent related | `tabster`, `keyborg`, `@griffel/*`                      |
| 3rd party      | `react`, `@types/react`, `typescript`, `@floating-ui/*` |

### `report usage`

Deep codebase analysis of Fluent UI API usage intended for the **core team** to understand how consumers use the library.

```bash
fluentui report usage [--path <dir>] [--reporter json|markdown|html] [--include <glob>...] [--exclude <glob>...]
```

| Flag         | Alias | Default   | Description                                  |
| ------------ | ----- | --------- | -------------------------------------------- |
| `--path`     | `-p`  | git root  | Root directory for file traversal            |
| `--reporter` | `-r`  | `json`    | Output format: `json`, `markdown`, or `html` |
| `--include`  | —     | all files | Glob patterns to include                     |
| `--exclude`  | —     | none      | Glob patterns to exclude                     |

Traverses `.ts` and `.tsx` files (skipping gitignored files), resolves imports from tracked packages, and classifies every imported symbol into one of five categories.

#### Categories

| Category       | What it captures                                     | Tracked details                                  |
| -------------- | ---------------------------------------------------- | ------------------------------------------------ |
| **Components** | React components (JSX elements)                      | Per-component prop usage with values             |
| **Hooks**      | React hooks (`use*` naming)                          | Call-site argument usage with values             |
| **Types**      | TypeScript interfaces, type aliases, enums           | `typeof` reference count, generic type arguments |
| **Others**     | Value exports (constants, utility functions, themes) | Call-site argument usage when invoked            |
| **Unknowns**   | Symbols whose `.d.ts` could not be resolved          | Naming-convention-based description              |

#### Output formats

- **JSON** — machine-readable metadata with a `legend`, `fileMap`, and per-package `packages` map. Default.
- **Markdown** — summary tables and per-package breakdowns; concise, no prop details.
- **HTML** — self-contained report with collapsible prop/argument details and dark mode support.

## Architecture

```
report/
├── index.ts                   # Parent command — registers subcommands
├── commands/
│   ├── info.ts                # `report info` subcommand
│   └── usage.ts               # `report usage` subcommand
├── impl/
│   ├── types.ts               # All type definitions
│   ├── ast-parser.ts          # ts-morph AST parser (symbol classification, JSX/call/type-ref extraction)
│   ├── file-discovery.ts      # Source file traversal (respects .gitignore)
│   ├── package-resolver.ts    # Package version resolution and reportable-package filtering
│   ├── usage-report.ts         # Core analysis engine — collects metadata from AST parser
│   ├── info-report.ts          # Package/system info collection and formatting
│   ├── markdown-reporter.ts   # Markdown output formatter
│   ├── html-reporter.ts       # HTML output formatter
│   └── index.ts               # Barrel exports
├── __fixtures__/              # Test fixtures (sample-app with mock node_modules)
├── SPEC.md                    # Original specification
└── README.md                  # This file
```

### How symbol classification works

1. **Import scanning** — all `import` declarations from tracked packages are collected
2. **Type resolution** — each symbol is resolved through its `.d.ts` declaration:
   - Functions returning JSX → `component`
   - `use*` naming or hook signatures → `hook`
   - Interfaces, type aliases, enums → `type`
   - Everything else with a resolved `.d.ts` → `other`
   - Unresolvable `.d.ts` → `unknown`
3. **Usage enrichment** — JSX props, call arguments, `typeof` references, and generic type arguments are captured
4. **Deduplication** — symbols appearing in multiple categories are reconciled (e.g., a component found via both JSX and value reference)

### Testing

```bash
yarn nx run cli:test
```

Tests use a fixture-based approach with a `__fixtures__/sample-app/` containing mock `_mock_node_modules` with `.d.ts` declarations. The `usage-report.spec.ts` uses a mock `AstParser` for isolated unit testing.
