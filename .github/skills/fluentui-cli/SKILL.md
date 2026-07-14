---
name: fluentui-cli
description: 'Guides working with @fluentui/cli — the internal Fluent UI command-line tool. Use when asked to add a new CLI command, modify an existing command, understand CLI architecture, debug CLI issues, or work with the CLI build/test workflow. Covers: architecture overview, yargs conventions, lazy-loading pattern, testing, and available Nx generators.'
---

# `@fluentui/cli`

The `@fluentui/cli` package (`tools/cli/`) is the internal Fluent UI command-line tool built with **yargs**. It uses a modular, lazy-loading architecture where each command lives in its own directory and is only loaded at runtime when invoked.

## Architecture

### File Structure

```
tools/cli/
├── bin/fluentui-cli.js              # Node entry point (requires compiled output)
├── src/
│   ├── cli.ts                       # Main yargs setup, registers all commands
│   ├── index.ts                     # Public API re-exports
│   ├── utils/
│   │   ├── index.ts                 # Barrel exports
│   │   └── types.ts                 # Shared CommandHandler type
│   └── commands/
│       ├── migrate/                 # Command module
│       │   ├── index.ts             # CommandModule definition (eagerly loaded)
│       │   ├── handler.ts           # Handler implementation (lazy-loaded)
│       │   └── handler.spec.ts      # Tests
│       └── report/                  # Command module
│           ├── index.ts
│           ├── handler.ts
│           └── handler.spec.ts
```

### Lazy Loading Pattern

Command definitions (name, description, options builder) are eagerly imported — they are lightweight. The actual handler logic is **lazy-loaded via dynamic `import()`** only when the command is invoked:

```typescript
// index.ts — always loaded (lightweight)
handler: async argv => {
  // handler.ts only loaded when this specific command runs
  const { handler } = await import('./handler');
  return handler(argv);
},
```

This means running `fluentui-cli migrate` will never load the code for `report` or any other command.

### CommandHandler Type

All handlers use the shared `CommandHandler<T>` type from `src/utils/types.ts`:

```typescript
import type { ArgumentsCamelCase } from 'yargs';

export type CommandHandler<T = {}> = (argv: ArgumentsCamelCase<T>) => Promise<void>;
```

### Command Registration in cli.ts

Each command is imported and registered in `tools/cli/src/cli.ts`:

```typescript
import yargs from 'yargs';
import migrateCommand from './commands/migrate';
import reportCommand from './commands/report';

export async function main(argv: string[]): Promise<void> {
  await yargs(argv)
    .scriptName('fluentui-cli')
    .usage('$0 <command> [options]')
    .command(migrateCommand)
    .command(reportCommand)
    .demandCommand(1, 'You need to specify a command to run.')
    .help()
    .strict()
    .parse();
}
```

## Build & Test

```sh
# Build the CLI
yarn nx run cli:build

# Run tests
yarn nx run cli:test

# Test --help output
node tools/cli/bin/fluentui-cli.js --help
node tools/cli/bin/fluentui-cli.js <command-name> --help
```

## Conventions

- **Always use the Nx generator** to scaffold new commands — do not create command files manually. See the [adding commands](references/adding-commands.md) reference.
- Place shared utilities in `tools/cli/src/utils/` and export through the barrel file.
- Every command must support `--help` (handled by yargs `.help()` in the builder).
- Handler files must export a named `handler` constant typed with `CommandHandler<T>`.
- Tests live adjacent to handlers as `handler.spec.ts`.

## Common Patterns

### Subcommands (nested commands)

If a command needs subcommands, use yargs nested command pattern in the builder:

```typescript
builder: yargs =>
  yargs
    .command('run', 'Run migrations', subBuilder => subBuilder, subHandler)
    .command('list', 'List available migrations', subBuilder => subBuilder, subHandler)
    .demandCommand(1)
    .help(),
```
