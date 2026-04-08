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
  - [`scope`](#scope)
  - [`versionSuffix`](#versionsuffix)

<!-- tocstop -->

## NOTES

- Can bump single package or all packages in a given scope
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
yarn nx g @fluentui/workspace-plugin:version-bump --name=example --bumpType prerelease --prereleaseTag beta
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

Bump all tools packages for an experimental release, preserving each package's base version:

```sh
yarn nx g @fluentui/workspace-plugin:version-bump --all --scope tools --versionSuffix "experimental.my-feature.20260408-abc1234"
```

## Options

#### `name`

Type: `string`

Project name (without @npmScope prefix - e.g. `<project-name>`)

> NOTE: will trigger CLI prompt if you didn't provide this option

#### `all`

Type: `boolean`

Run batch migration on all packages in the specified scope (see [`scope`](#scope)).

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

### `scope`

Type: `string` (enum: `vNext`, `tools`)
Default: `vNext`

Which package scope `--all` targets:

- `vNext` — all converged/vNext packages (default, backward compatible)
- `tools` — all public tools packages (tagged `tools`, non-private, non-v8)

### `versionSuffix`

Type: `string`

A suffix to append to each package's current version. The resulting version will be `{currentVersion}-{versionSuffix}`.

- Mutually exclusive with `--bumpType` and `--explicitVersion`
- Requires `--all`
- Useful for experimental releases where each package keeps its own base version
