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

- Intended to be used on packages that will be consumed by partner web apps in prerelease phase of Fluent
- Changes all `^9.x.x` versions to `9.x.x`
- Only works on packages that have run the [migrated-converged-pkg](https://github.com/microsoft/fluentui/blob/master/tools/generators/migrate-converged-pkg/README.md) generator
- Only works on packages that have the tag `platform:web` in `nx.json`

## Usage

```sh
yarn nx workspace-generator migrate-fixed-versions ...
```

Show what will be generated without writing to disk:

```sh
yarn nx workspace-generator migrate-fixed-versions --dry-run
```

### Examples

Run migration on package named `@fluentui/example`

```sh
yarn nx workspace-generator migrate-fixed-versions --name='@fluentui/example'
```

Run migration on all vNext web packages

```sh
yarn nx workspace-generator migrate-fixed-versions --all
```

## Options

#### `name`

Type: `string`

Package/library name (needs to be full name of the package, scope included - e.g. `@fluentui/<package-name>`)

> NOTE: will trigger CLI prompt if you didn't provide this option

#### `all`

Type: `boolean`

Run batch migration on all vNext packages with the tag `platform:web` in `nx.json`
