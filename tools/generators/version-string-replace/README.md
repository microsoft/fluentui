# version-string-replace

Workspace Generator for matching a part of a version string in a package and replaces its. Will also update
dependent packages with the new version string.

<!-- toc -->

- [NOTES](#notes)
- [Usage](#usage)
  - [Examples](#examples)
- [Options](#options)
  - [`name`](#name)
  - [`all`](#all)
  - [`match`](#match)
  - [`replace`](#replace)

<!-- tocstop -->

## NOTES

- Converts converged (9.x) packages with the `alpha.x` prerelease tag to the `beta.0` prerelease tag
- Can remove prerelease tags `9.0.0-beta.11` -> `9.0.0`
- Bumps versions in dependent packages
- Can be run on a single package or all converged packages

## Usage

```sh
yarn nx workspace-generator version-string-replace ...
```

Show what will be generated without writing to disk:

```sh
yarn nx workspace-generator version-string-replace --dry-run
```

### Examples

Run migration on package named `@fluentui/example`

```sh
yarn nx workspace-generator version-string-replace --name='@fluentui/example'
```

Run migration on all vNext packages

```sh
yarn nx workspace-generator version-string-replace --all
```

## Options

#### `name`

Type: `string`

Package/library name (needs to be full name of the package, scope included - e.g. `@fluentui/<package-name>`)

> NOTE: will trigger CLI prompt if you didn't provide this option

#### `all`

Type: `boolean`

Run batch migration on all vNext packages with the tag `platform:web` in `nx.json`

#### `match`

Type: `Regexp`

Regular expression that matches the part the of the version string to replace

### `replace`

Type: `string`

The replacement string for the version, can be empty string to remove a substring from the version string
