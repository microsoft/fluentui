# star-dev-deps

For all packages in the monorepo, replace dev dependencies on other internal packages in the monorepo with the `*`
version.

<!-- toc -->

- [NOTES](#notes)
- [Usage](#usage)
  - [Examples](#examples)

<!-- tocstop -->

## NOTES

- Only affects dev dependencies that are also published from the monorepo
- Does not affect third party dependencies
- Will run for every package in the monorepo

## Usage

```sh
yarn nx workspace-generator star-dev-deps
```

Show what will be generated without writing to disk:

```sh
yarn nx workspace-generator star-dev-deps --dry-run
```

### Examples

```sh
yarn nx workspace-generator star-dev-deps
```
