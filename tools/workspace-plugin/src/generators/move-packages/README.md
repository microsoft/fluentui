# move-packages

Workspace Generator for moving a package to another folder.

<!-- toc -->

- [NOTES](#notes)
- [Usage](#usage)
  - [Examples](#examples)
- [Options](#options)
  - [`name`](#name)
  - [`destination`](#destination)
  - [`allConverged`](#allConverged)

<!-- tocstop -->

## NOTES

- Due to current build setup, will only work with converged packages for now.

## Usage

```sh
yarn nx g @fluentui/workspace-plugin:move-packages ...
```

Show what will be generated without writing to disk:

```sh
yarn nx g @fluentui/workspace-plugin:move-packages --dry-run
```

### Examples

Run generator on package named `@fluentui/react-menu` and have it moved to a subfolder called `test`

```sh
yarn nx g @fluentui/workspace-plugin:move-packages --name='@fluentui/react-menu' --destination="testFolder/react-menu"
```

Run generator on all converged packages

```sh
yarn nx g @fluentui/workspace-plugin:move-packages --allConverged --destination="testFolder"
```

## Options

#### `name`

Type: `string`

Package/library name (needs to be full name of the package, scope included - e.g. `@fluentui/<package-name>`)

> NOTE: will trigger CLI prompt if you didn't provide this option

#### `destination`

Type: `string`

The folder to move package into.

> NOTE: will trigger CLI prompt if you didn't provide this option

#### `allConverged`

Type: `boolean`

Move all converged packages in a batch
