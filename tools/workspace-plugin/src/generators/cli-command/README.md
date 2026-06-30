# cli-command

Workspace generator that scaffolds a new CLI command for the `@fluentui/cli` package.

## Usage

```sh
yarn nx g @fluentui/workspace-plugin:cli-command <name>
```

Show what will be generated without writing to disk:

```sh
yarn nx g @fluentui/workspace-plugin:cli-command <name> --dry-run
```

### Examples

```sh
yarn nx g @fluentui/workspace-plugin:cli-command analyze --description "Analyze bundle sizes"
```

This generates:

```
tools/cli/src/commands/analyze/
├── index.ts          # CommandModule with lazy-loaded handler
├── handler.ts        # Handler implementation
└── handler.spec.ts   # Handler tests
```

And registers the command in `tools/cli/src/cli.ts`.

## Options

#### `name`

Type: `string` (required)

The command name (e.g., `migrate`, `report`, `analyze`). Must start with a lowercase letter and contain only lowercase letters, numbers, and hyphens.

#### `description`

Type: `string`

Short description shown in `--help` output. Defaults to `"TODO: Add description"`.

#### `skipFormat`

Type: `boolean` (default: `false`)

Skip formatting files after generation.
