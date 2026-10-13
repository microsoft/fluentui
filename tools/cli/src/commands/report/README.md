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

Runs against the current project and prints to stdout. Catalog selectors can add private or headless package roots while the legacy related-tool list remains included by default.

#### Tracked packages

| Scope          | Packages                                                |
| -------------- | ------------------------------------------------------- |
| Fluent scoped  | `@fluentui/*`, `@fluentui-contrib/*`                    |
| Fluent related | `tabster`, `keyborg`, `@griffel/*`                      |
| 3rd party      | `react`, `@types/react`, `typescript`, `@floating-ui/*` |

### `report usage`

Deep codebase analysis of Fluent UI API usage intended for the **core team** to understand how consumers use the library.

```bash
fluentui report usage [--path <dir>] [--reporter json|markdown|html] [--include <glob>...] [--exclude <glob>...] [--system <name>...]
```

| Flag         | Alias | Default   | Description                                  |
| ------------ | ----- | --------- | -------------------------------------------- |
| `--path`     | `-p`  | git root  | Root directory for file traversal            |
| `--reporter` | `-r`  | `json`    | Output format: `json`, `markdown`, or `html` |
| `--include`  | —     | all files | Glob patterns to include                     |
| `--exclude`  | —     | none      | Glob patterns to exclude                     |

Both report subcommands accept the shared catalog selectors:

| Flag              | Default  | Description                                                          |
| ----------------- | -------- | -------------------------------------------------------------------- |
| `--config`        | nearest  | JSON-only `fluentui.config.json`                                     |
| `--system`        | presets  | Selected catalog system; repeatable                                  |
| `--package`       | all      | Narrow to one parsed npm package name; imported subpaths still match |
| `--metadata-mode` | `prefer` | `prefer` metadata with declaration fallback, `required`, or `off`    |

Configuration schema version 1 supports named systems with `catalogs` containing either a package name or a local path, plus independent `packages` and `exclusions` selectors. An explicitly configured system replaces its preset definition; `{ "disabled": true }` disables it. Local paths resolve from the config file and are read as static JSON. Config files and catalogs are never executed or downloaded.

Traverses `.ts` and `.tsx` files (skipping gitignored files), resolves imports from tracked packages, and classifies every imported symbol into one of five categories.
Git discovery works from a child directory of a parent repository. Outside a Git repository or when Git is unavailable, filesystem discovery honors `.gitignore` rules (including nested rules) and skips `node_modules`, `.git`, and declaration files. Other Git failures are reported as errors instead of empty reports. A genuine empty source selection still produces an empty report. Each file uses its nearest project tsconfig and package boundary for declaration resolution, including when a report spans multiple projects.

#### Categories

| Category       | What it captures                                     | Tracked details                                  |
| -------------- | ---------------------------------------------------- | ------------------------------------------------ |
| **Components** | React components (JSX elements)                      | Per-component prop usage with values             |
| **Hooks**      | React hooks (`use*` naming)                          | Call-site argument usage with values             |
| **Types**      | TypeScript interfaces, type aliases, enums           | `typeof` reference count, generic type arguments |
| **Others**     | Value exports (constants, utility functions, themes) | Call-site argument usage when invoked            |
| **Unknowns**   | Symbols whose `.d.ts` could not be resolved          | Naming-convention-based description              |

#### Output formats

- **JSON** — machine-readable metadata with a `legend`, `fileMap`, and per-import-path `packages` map. Default.
- **Markdown** — summary tables, per-package breakdowns, and per-component observed-prop tables with usage counts and values.
- **HTML** — self-contained report with expanded observed component props, collapsible argument details, and dark mode support.

Markdown and HTML group nested import paths under their npm package boundary: imports from
`@fluentui/react/lib/Button` and `@fluentui/react/lib/Checkbox` belong to one `@fluentui/react` package section.
Summary rows are labeled **Import Path** and retain their individual counts. Detailed entrypoint sections keep
their symbols and observed props separate, including when the same symbol is imported through different paths.
JSON retains its existing import-path keys and count/value semantics.

Prop tables describe usage observed in source, not the complete supported component API. Query `api` to inspect
supported props that are not used in the analyzed files. Empty value lists mean no value was captured; defaults are
not inferred.

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

1. **Import scanning** — parsed npm package names are matched against the effective systems, packages, and exclusions
2. **Metadata classification** — compact package indexes classify symbols without loading API details or guidance
3. **Type resolution fallback** — under `prefer` or `off`, unresolved classifications use the imported package's `.d.ts` declaration:
   - Functions returning JSX → `component`
   - React class components (including inherited implementations) → `component`, when their inheritance resolves to the React package
   - `use*` naming or hook signatures → `hook`
   - Interfaces, type aliases, enums → `type`
   - Everything else with a resolved `.d.ts` → `other`
   - Unresolvable `.d.ts` → `unknown`
4. **Usage enrichment** — JSX props, call arguments, `typeof` references, and generic type arguments are captured
5. **Deduplication** — symbols appearing in multiple categories are reconciled (e.g., a component found via both JSX and value reference)

JSON retains its existing shape and count/value semantics. Markdown and HTML present the same observed data without
changing the collected counts or values. Discovery and fallback diagnostics are written to stderr so stdout remains
a valid report document.

### Testing

```bash
yarn nx run cli:test
```

Tests use a fixture-based approach with a `__fixtures__/sample-app/` containing mock `_mock_node_modules` with `.d.ts` declarations. The `usage-report.spec.ts` uses a mock `AstParser` for isolated unit testing.
