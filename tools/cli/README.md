# @fluentui/cli

Command-line tool for Fluent UI — migration analysis, usage reporting, and API metadata extraction.

> **⚠️ Experimental** — This package is published under the `experimental` npm tag. APIs and commands may change without notice.

## Usage

```sh
npx @fluentui/cli@experimental <command> [options]
```

> Run any command with `--help` for detailed options.

## Commands

### `migrate`

Run migration analysis and annotation.

```sh
# List available migrations
npx @fluentui/cli migrate --list

# Analyze v8 → v9 migration (dry run)
npx @fluentui/cli migrate v8-to-v9 --path src/ --dryRun

# Annotate source files with migration hints
npx @fluentui/cli migrate v8-to-v9 --path src/
```

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
