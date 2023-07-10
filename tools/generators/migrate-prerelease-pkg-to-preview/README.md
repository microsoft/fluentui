# migrate-prerelease-pkg-to-preview

Workspace Generator to migrate v9 pre-release packages to new [preview versioning scheme](https://github.com/microsoft/fluentui/issues/28471).

<!-- toc -->

- [Usage](#usage)
  - [Examples](#examples)
- [Options](#options)
  - [`project`](#project)
  - [`force`](#force)

<!-- tocstop -->

## Usage

```sh
yarn nx workspace-generator migrate-prerelease-pkg-to-preview ...
```

Show what will be generated without writing to disk:

```sh
yarn nx workspace-generator migrate-prerelease-pkg-to-preview --dry-run
```

### Examples

```sh
yarn nx workspace-generator migrate-prerelease-pkg-to-preview
```

## Options

#### `project`

Type: `string`

Library name

#### `force`

> Optional [default:false]

Type: `boolean`

When `true`, forces migration operations even if the project is still in use.
