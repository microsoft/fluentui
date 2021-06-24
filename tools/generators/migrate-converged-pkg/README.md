# migrate-converged-pkg

Workspace Generator for migrating converged packages to new DX (stage 1)

<!-- toc -->

- [NOTES](#notes)
- [Usage](#usage)
  - [Examples](#examples)
- [Options](#options)
  - [`name`](#name)
  - [`stats`](#stats)

<!-- tocstop -->

## NOTES

- this generator will migrate existing stories for your package from `react-examples` to your migrated package
- migrated stories source will be transformed (replacing absolute imports and adding required default export)
- if your original stories (within react-examples) used non converged packages/tools (like old icons, css/scss for styling), you'll need to manually accommodate that for your migrated stories.

## Usage

```sh
yarn nx workspace-generator migrate-converged-pkg ...
```

Show what will be generated without writing to disk:

```sh
yarn nx workspace-generator migrate-converged-pkg --dry-run
```

### Examples

Run migration on package named `@fluentui/example`

```sh
yarn nx workspace-generator migrate-converged-pkg --name='@fluentui/example'
```

Get migration stats for how many packages have been migrated yet.

> No actual migration will happen.

```sh
yarn nx workspace-generator migrate-converged-pkg --stats --no-interactive
```

## Options

#### `name`

Type: `string`

Package/library name (needs to be full name of the package, scope included - e.g. `@fluentui/<package-name>`)

#### `stats`

Type: `boolean`

Get stats for migration progress.

> TIP: Use it with `--no-interactive` option to disable prompts.
