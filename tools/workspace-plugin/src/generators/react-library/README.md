# react-library

Workspace Generator for bootstrapping a new react library (fluentui v9)

<!-- toc -->

- [Usage](#usage)
  - [Examples](#examples)
- [Options](#options)
  - [`name`](#name)
  - [`owner`](#owner)
  - [`kind`](#kind)

<!-- tocstop -->

## Usage

```sh
yarn nx g @fluentui/workspace-plugin:react-library --help
```

Show what will be generated without writing to disk:

```sh
yarn nx g @fluentui/workspace-plugin:react-library --dry-run
```

### Examples

```sh
yarn nx g @fluentui/workspace-plugin:react-library
```

## Options

#### `name`

Type: `string`

Library name (without @fluentui scope prefix)

#### `owner`

Type: `string`

Team owning the library. Will be written in CODEOWNERS

#### `kind`

Type: `standard` | `compat`

v9 library kind either embracing converged patterns(standard) or using griffel only with old framework patterns(compat)
