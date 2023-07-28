# cypress-component-configuration

Workspace Generator for setting up Cypress component testing for a project

<!-- toc -->

- [Usage](#usage)
  - [Examples](#examples)
- [Options](#options)
  - [`project`](#project)

<!-- tocstop -->

## Usage

```sh
yarn nx g @fluentui/workspace-plugin:cypress-component-configuration ...
```

Show what will be generated without writing to disk:

```sh
yarn nx g @fluentui/workspace-plugin:cypress-component-configuration --dry-run
```

### Examples

```sh
yarn nx g @fluentui/workspace-plugin:cypress-component-configuration
```

## Options

#### `project`

Type: `string`

The name of the project to add cypress component testing to
