# tsconfig-base-all

Workspace Generator for generating/updating `/tsconfig.base.all.json`.

> `tsconfig.base.all.json` contains all monorepo project path aliases, and reflect source of truth for all monorepo packages.

<!-- toc -->

- [Usage](#usage)
  - [Examples](#examples)
- [Options](#options)
  - [`verify`](#verify)

<!-- tocstop -->

## Usage

```sh
yarn nx g @fluentui/workspace-plugin:tsconfig-base-all
```

Show what will be generated without writing to disk:

```sh
yarn nx g @fluentui/workspace-plugin:tsconfig-base-all --dry-run
```

### Examples

```sh
yarn nx g @fluentui/workspace-plugin:tsconfig-base-all
```

## Options

#### `verify`

Type: `boolean`

use this option on CI to check if base.all.json is up to date and in sync with all other base configs

Following will throw an error if `tsconfig.base.all.json` is out of date

```sh
yarn nx g @fluentui/workspace-plugin:tsconfig-base-all --verify
```
