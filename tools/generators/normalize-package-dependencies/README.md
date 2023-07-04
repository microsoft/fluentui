# normalize-package-dependencies

Workspace Generator for package.json dependencies normalization.

> it applies for all dependencies, devDependencies, peerDependencies

- update mode: updates projects package.json to use \* as version for inner monorepo dependencies
- verify mode: verifies projects package.json to use \* as version for inner monorepo dependencies

<!-- toc -->

- [Usage](#usage)
  - [Examples](#examples)
- [Options](#options)
  - [`verify`](#verify)
  - [`projectType`](#projecttype)
  - [`tag`](#tag)

<!-- tocstop -->

## Usage

```sh
yarn nx workspace-generator normalize-package-dependencies ...
```

Show what will be generated without writing to disk:

```sh
yarn nx workspace-generator normalize-package-dependencies --dry-run
```

### Examples

```sh
yarn nx workspace-generator normalize-package-dependencies
```

## Options

#### `verify`

Run generator in check(verification mode). Verify package.json dependencies for all projects or filtered projects (if filters are applied)

#### `projectType`

Type: `application | library | any`

Filter flag. Use to apply generator execution only on projects that contain provided `projectType` within their `project.json#projectType`.

#### `tag`

Type: `string`

Filter flag. Use to apply generator execution only on projects that contain provided tag within their `project.json#tags`.
