# @fluentui/cli

Command-line tool for Fluent UI usage reporting and API metadata extraction.

> **Preview** — APIs and commands may change without notice.

## Usage

```sh
npx @fluentui/cli <command> [options]
```

> Run any command with `--help` for detailed options.

## Commands

### `report`

Generate reports for issue filing or codebase analysis.

```sh
# Quick environment/package summary for issue reporting
npx @fluentui/cli report info

# Deep codebase usage analysis of Fluent UI APIs
npx @fluentui/cli report usage --path ./src --reporter markdown --output report.md
```

### `metadata`

Extract API metadata from package `.d.ts` build output.

```sh
npx @fluentui/cli metadata --entry dist/index.d.ts --reporter json
```

## Development

```sh
# Build
yarn nx run cli:build

# Test
yarn nx run cli:test
```
