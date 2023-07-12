# release-package

Workspace Generator which automates release process stages for @fluentui (v9) package.

<!-- toc -->

- [Usage](#usage)
  - [Examples](#examples)
- [Options](#options)
  - [`project`](#project)
  - [`phase`](#phase)

<!-- tocstop -->

## Usage

```sh
yarn nx workspace-generator release-package ...
```

Show what will be generated without writing to disk:

```sh
yarn nx workspace-generator release-package --dry-run
```

### Examples

```sh
yarn nx workspace-generator release-package
```

## Options

#### `project`

Type: `string`

Library name to to be released.

#### `phase`

Type: `initial` | 'stable'

Phase of npm release life cycle for monorepo package
