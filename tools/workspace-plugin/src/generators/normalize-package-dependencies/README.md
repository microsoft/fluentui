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

<!-- tocstop -->

## Usage

```sh
yarn nx g @fluentui/workspace-plugin:normalize-package-dependencies ...
```

Show what will be generated without writing to disk:

```sh
yarn nx g @fluentui/workspace-plugin:normalize-package-dependencies --dry-run
```

### Examples

```sh
yarn nx g @fluentui/workspace-plugin:normalize-package-dependencies
```

## Options

#### `verify`

Run generator in check(verification mode). Verify package.json dependencies for all projects.
