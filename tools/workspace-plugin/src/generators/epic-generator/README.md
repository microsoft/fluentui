# epic-generator

Workspace Generator for creating a migration tracker issue epic and subsequent team sub-issues on GitHub.

<!-- toc -->

- [Usage](#usage)
  - [Examples](#examples)
- [Options](#options)
  - [`repository`](#repository)
  - [`title`](#title)
  - [`message`](#message)

<!-- tocstop -->

## Usage

```sh
yarn nx g @fluentui/workspace-plugin:epic-generator ...
```

### Examples

Create an epic and sub-issues on the `microsoft/fluentui` repository with the title `Migrate vNext packages`.

```sh
yarn nx g @fluentui/workspace-plugin:epic-generator --repository="microsoft/fluentui" --title="Migrate vNext packages"
```

## Options

#### `repository`

Type: `string`
Default: "microsoft/fluentui"

Full name of the GitHub repository to create the issues on.

#### `title`

Type: `string`

Title of the epic issue and sub-issues.

#### `message`

Type: `string`
Default: "\*Description to be added\*"

Description used in the epic issue.
