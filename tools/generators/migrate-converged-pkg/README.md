# migrate-converged-pkg

Workspace Generator for migrating converged packages to new DX (stage 1)[https://github.com/microsoft/fluentui/issues/18579]

<!-- toc -->

- [NOTES](#notes)
- [Usage](#usage)
  - [Examples](#examples)
- [Options](#options)
  - [`name`](#name)
  - [`all`](#all)
  - [`stats`](#stats)

<!-- tocstop -->

## NOTES

- this generator will migrate existing stories for your package from `react-examples` to your migrated package
- migrated stories source will be transformed (replacing absolute imports and adding required default export)
- if your original stories (within react-examples) used non converged packages/tools (like old icons, css/scss for styling), you'll need to manually refactor your stories to remove any non converged dependencies.

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

Run migration on all vNext packages

```sh
yarn nx workspace-generator migrate-converged-pkg --all
```

Get migration stats for how many packages have been migrated yet.

> No actual migration will happen.

```sh
yarn nx workspace-generator migrate-converged-pkg --stats
```

## Options

#### `name`

Type: `string`

Package/library name (needs to be full name of the package, scope included - e.g. `@fluentui/<package-name>`)

> NOTE: will trigger CLI prompt if you didn't provide this option

#### `all`

Type: `boolean`

Run batch migration on all vNext packages

#### `stats`

Type: `boolean`

Get stats for migration progress.
