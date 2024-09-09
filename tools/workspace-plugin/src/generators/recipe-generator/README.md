# recipe-generator

Workspace Generator to create a recipe.

<!-- toc -->

- [Usage](#usage)
  - [Examples](#examples)
- [Options](#options)
  - [`name`](#name)

<!-- tocstop -->

## Usage

```sh
yarn nx g @fluentui/workspace-plugin:recipe-generator
```

Show what will be generated without writing to disk:

```sh
yarn nx g @fluentui/workspace-plugin:recipe-generator --dry-run
```

### Examples

Guided CLI prompt:

```sh
yarn nx g @fluentui/workspace-plugin:recipe-generator
```

Single command:

```sh
yarn nx g @fluentui/workspace-plugin:recipe-generator --recipeName 'My Recipe'
```

## Options

#### `recipeName`

Type: `string`

Name for the recipe. This name will be used to generate the folder name and file names.
