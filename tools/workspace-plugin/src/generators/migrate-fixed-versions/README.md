# migrate-fixed-versions

Workspace Generator for migrating converged package dependencies from carets to fixed versions

<!-- toc -->

- [NOTES](#notes)
- [Usage](#usage)
  - [Examples](#examples)
- [Options](#options)
  - [`name`](#name)
  - [`all`](#all)

<!-- tocstop -->

## NOTES

- Can be used on any package in the monorepo
- Changes all dependencies on converged `^9.x.x` versions to `9.x.x`

## Usage

```sh
yarn nx g @fluentui/workspace-plugin:migrate-fixed-versions ...
```

Show what will be generated without writing to disk:

```sh
yarn nx g @fluentui/workspace-plugin:migrate-fixed-versions --dry-run
```

### Examples

Run migration on project named `example`

```sh
yarn nx g @fluentui/workspace-plugin:migrate-fixed-versions --name=example
```

Run migration on all vNext web packages

```sh
yarn nx g @fluentui/workspace-plugin:migrate-fixed-versions --all
```

## Options

#### `name`

Type: `string`

Project name (without @npmScope prefix - e.g. `<project-name>`)

> NOTE: will trigger CLI prompt if you didn't provide this option

#### `all`

Type: `boolean`

Run batch migration on all vNext packages
