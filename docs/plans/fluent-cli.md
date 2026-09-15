# Fluent UI CLI Project Spec

## Objective

`@fluentui/cli` provides focused diagnostics for Fluent UI maintainers and consumers. It exposes two command surfaces:

1. `report` generates environment, package, and source-usage reports.
2. `metadata` extracts structured API metadata from TypeScript declaration output.

The package is published under the `experimental` npm tag while these contracts evolve.

## Scope

### Included

- Environment and installed-package summaries for issue reports.
- Static analysis of Fluent UI imports and component usage.
- API metadata extraction from package `.d.ts` entry points.
- JSON, Markdown, and HTML output where supported.
- File output or standard output for scripting and local inspection.

### Excluded

- Source-code transformations.
- Automated source edits.
- Interactive or graphical interfaces.
- Runtime component behavior.

## Architecture

The CLI is a Node.js library under `tools/cli/`, built with Nx and SWC. Yargs owns argument parsing, help output, strict command validation, and subcommand routing.

Command definitions are lightweight and registered in `src/cli.ts`. Implementations are loaded with dynamic `import()` only after yargs selects a command. Shared command types live in `src/utils/`.

```text
tools/cli/
├── bin/fluentui-cli.js
├── src/
│   ├── cli.ts
│   ├── index.ts
│   ├── commands/
│   │   ├── metadata/
│   │   │   ├── index.ts
│   │   │   ├── handler.ts
│   │   │   └── impl/
│   │   └── report/
│   │       ├── index.ts
│   │       ├── commands/
│   │       └── impl/
│   └── utils/
├── package.json
└── project.json
```

## Commands

### `report info`

Produces a compact environment and Fluent UI package summary suitable for issue reports.

```sh
npx @fluentui/cli@experimental report info [--output <file>]
```

Options:

- `-o, --output <file>` writes the report to a file instead of standard output.

### `report usage`

Analyzes TypeScript and TSX sources for Fluent UI imports, components, hooks, and API usage.

```sh
npx @fluentui/cli@experimental report usage [options]
```

Options:

- `-p, --path <directory>` selects the traversal root; the git root is used by default.
- `-r, --reporter <json|markdown|html>` selects the output format; JSON is the default.
- `--include <glob...>` limits analysis to matching files.
- `--exclude <glob...>` excludes matching files.
- `-o, --output <file>` writes the report to a file instead of standard output.

### `metadata`

Parses a package declaration entry point and emits structured API metadata.

```sh
npx @fluentui/cli@experimental metadata [options]
```

Options:

- `-e, --entry <file>` selects an `index.d.ts` entry; the package `types` field is resolved by default.
- `-r, --reporter <json|markdown|html>` selects the output format; JSON is the default.
- `-o, --output <file>` writes the result to a file instead of standard output.

## Output Requirements

- Standard output remains usable in scripts when no output file is provided.
- Errors are written to standard error and result in a nonzero exit code.
- JSON output remains machine-readable and deterministic for the same inputs.
- Markdown and HTML output escape source content appropriately.
- Source analysis does not modify consumer files.

## Quality Requirements

- Every command and formatter has focused Jest coverage.
- File traversal respects include and exclude patterns.
- Declaration parsing resolves cross-package references without requiring runtime package imports.
- Root and command-level `--help` output accurately reflects the supported surface.
- Build and validation tasks leave the tracked worktree unchanged.

## Development Workflow

```sh
yarn nx run cli:test
yarn nx run cli:lint
yarn nx run cli:type-check
yarn nx run cli:build
node tools/cli/bin/fluentui-cli.js --help
```

New commands should be scaffolded with the workspace CLI-command generator and follow the existing command-definition plus lazy-implementation pattern.
