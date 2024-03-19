# rc-caret

Short-lived workspace generator that converts pinned Fluent UI RC dependencies to be caret dependencies

Before:

```json
{
  "dependencies": {
    "@fluentui/react-button": "9.0.0-rc.1"
  }
}
```

After:

```json
{
  "dependencies": {
    "@fluentui/react-button": "^9.0.0-rc.1"
  }
}
```

<!-- toc -->

- [NOTES](#notes)
- [Usage](#usage)
  - [Examples](#examples)
- [Options](#options)
  - [`name`](#name)
  - [`all`](#all)

<!-- tocstop -->

## NOTES

- Can be used on packages that are not v9
- Only converts v9 dependencies that have the rc prerelease tag

## Usage

```sh
yarn nx g @fluentui/workspace-plugin:rc-caret
```

Show what will be generated without writing to disk:

```sh
yarn nx g @fluentui/workspace-plugin:rc-caret --dry-run
```

### Examples

Check `@fluentui/react-components` for pinned rc deps and convert them to carets

```sh
yarn nx g @fluentui/workspace-plugin:rc-caret --name='@fluentui/react-components'
```

Check all packages for pinned rc deps and convert them to carets

```sh
yarn nx g @fluentui/workspace-plugin:rc-caret --all
```

## Options

#### `name`

Type: `string`

Package/library name (needs to be full name of the package, scope included - e.g. `@fluentui/<package-name>`)

> NOTE: will trigger CLI prompt if you didn't provide this option

#### `all`

Type: `boolean`

Run batch migration on all vNext packages with the tag `platform:web` in `nx.json`
