# version-bump

Workspace generator that bumps packages. The allowed package bumps the same ones available from the official
NPM [semver](https://github.com/npm/node-semver) package and consist of:

- major
- premajor
- minor
- preminor
- patch
- prepatch
- prerelease

Prerelease tags can also be configured.

The generator also bumps the versions in any dependent packages.

<!-- toc -->

- [NOTES](#notes)
- [Usage](#usage)
  - [Examples](#examples)
- [Options](#options)
  - [`name`](#name)
  - [`all`](#all)
  - [`exclude`](#exclude)
  - [`bumpType`](#bumpType)
  - [`prereleaseTag`](#prereleaseTag)

<!-- tocstop -->

## NOTES

- Can bump single package or all convered packages
- Bumps the package version in all dependent packages
- Converged packages are currently only identified as having version `9.x`

## Usage

```sh
yarn nx g @fluentui/workspace-plugin:version-bump ...
```

Show what will be generated without writing to disk:

```sh
yarn nx g @fluentui/workspace-plugin:version-bump --dry-run
```

### Examples

Bump `@fluentui/example@9.0.0-alpha.1` to beta

```sh
yarn nx g @fluentui/workspace-plugin:version-bump --name='@fluentui/example' --bumpType prerelease --prereleaseTag beta
```

Bump all vNext packages from alpha to beta

```sh
yarn nx g @fluentui/workspace-plugin:version-bump --all --bumpType prerelease --prereleaseTag beta
```

Bump all vNext packages from beta (9.0.0-beta) to full release. The actual bumptype is irrelevant.

```sh
yarn nx g @fluentui/workspace-plugin:version-bump --all --bumpType minor
```

Bump all vNext packages for a nightly release (0.0.0-nightly).

```sh
yarn nx g @fluentui/workspace-plugin:version-bump --all --bumpType nightly --prereleaseTag nightly
```

## Options

#### `name`

Type: `string`

Package/library name (needs to be full name of the package, scope included - e.g. `@fluentui/<package-name>`)

> NOTE: will trigger CLI prompt if you didn't provide this option

#### `all`

Type: `boolean`

Run batch migration on all vNext packages with the tag `platform:web` in `nx.json`

#### `exclude`

Type: `string`

Comma-delimited list of packages that should not be bumped when using the `--all` flag

#### `bumpType`

Type: `string`

Bump type that can be any allowed in the official NPM [semver](https://github.com/npm/node-semver) package

- major
- premajor
- minor
- preminor
- patch
- prepatch
- prerelease

### `prereleaseTag`

Type: `string`

For example `alpha` or `beta` Only used when bumping prerelease versions.
