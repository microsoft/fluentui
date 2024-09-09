# split-library-in-two

Workspace Generator for splitting existing v9 web packages into `/library` and `/stories` packages under the same folder name.

```sh
|- react-components/
|- |- react-text/
```

↓↓↓

```
|- react-components/
|- |- react-text/
|- |- |- library/
|- |- |- stories/
```

Generator also parses source AST and adds ghost dependencies as `devDependencies` to `library` project for cypress/jest test files in order to create proper dependency graph ( without this `type-check` would fail )

<!-- toc -->

- [Usage](#usage)
  - [Examples](#examples)
- [Options](#options)
  - [`project`](#project)
  - [`all`](#all)

<!-- tocstop -->

## Usage

```sh
yarn nx g @fluentui/workspace-plugin:split-library-in-two --help
```

Show what will be generated without writing to disk:

```sh
yarn nx g @fluentui/workspace-plugin:split-library-in-two --dry-run
```

### Examples

```sh
yarn nx g @fluentui/workspace-plugin:split-library-in-two
```

## Options

#### `project`

Type: `string`

project name

#### `all`

Type: `boolean`

will execute generator on all applicable projects
