# Adding a New CLI Command

## Step 1 — Scaffold the Command

Run the `cli-command` Nx generator:

```sh
yarn nx g @fluentui/workspace-plugin:cli-command <command-name> --description "<short description>"
```

### Example

```sh
yarn nx g @fluentui/workspace-plugin:cli-command analyze --description "Analyze bundle sizes"
```

### What Gets Generated

```
tools/cli/src/commands/<command-name>/
├── index.ts          # Yargs CommandModule definition (lightweight, eagerly loaded)
├── handler.ts        # Handler implementation (lazy-loaded via dynamic import)
└── handler.spec.ts   # Jest unit tests for the handler
```

The generator also **automatically registers** the new command in `tools/cli/src/cli.ts` by:

1. Adding an import statement for the command module
2. Adding a `.command()` registration call

Preview what will be generated without writing to disk:

```sh
yarn nx g @fluentui/workspace-plugin:cli-command <command-name> --dry-run
```

## Step 2 — Implement the Handler

Open `tools/cli/src/commands/<command-name>/handler.ts` and implement the command logic:

```typescript
import type { CommandHandler } from '../../utils/types';

// Define the shape of your command's arguments
interface AnalyzeArgs {
  project?: string;
  verbose?: boolean;
}

export const handler: CommandHandler<AnalyzeArgs> = async argv => {
  const { project, verbose } = argv;

  // Your implementation here
  console.log(`Analyzing${project ? ` project: ${project}` : ''}...`);
};
```

## Step 3 — Add Options and Arguments

Edit `tools/cli/src/commands/<command-name>/index.ts` to add yargs options in the `builder`:

```typescript
import type { CommandModule } from 'yargs';

const command: CommandModule = {
  command: 'analyze',
  describe: 'Analyze bundle sizes',
  builder: yargs =>
    yargs
      .option('project', {
        alias: 'p',
        type: 'string',
        describe: 'Project name to analyze',
      })
      .option('verbose', {
        type: 'boolean',
        default: false,
        describe: 'Show detailed output',
      })
      .version(false)
      .help(),
  handler: async argv => {
    const { handler } = await import('./handler');
    return handler(argv);
  },
};

export default command;
```

## Step 4 — Write Tests

Update `tools/cli/src/commands/<command-name>/handler.spec.ts` with meaningful tests:

```typescript
import { handler } from './handler';

describe('analyze handler', () => {
  let logSpy: jest.SpyInstance;

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it('should analyze all projects when no project specified', async () => {
    await handler({ _: ['analyze'], $0: 'fluentui-cli' });

    expect(logSpy).toHaveBeenCalledWith('Analyzing...');
  });

  it('should analyze specific project when specified', async () => {
    await handler({ _: ['analyze'], $0: 'fluentui-cli', project: 'react-button' });

    expect(logSpy).toHaveBeenCalledWith('Analyzing project: react-button...');
  });
});
```

## Step 5 — Verify

```sh
# Build the CLI
yarn nx run cli:build

# Run tests
yarn nx run cli:test

# Test --help output
node tools/cli/bin/fluentui-cli.js --help
node tools/cli/bin/fluentui-cli.js <command-name> --help
```
