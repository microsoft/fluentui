# @fluentui/workspace-plugin

nx private monorepo plugin which contains:

- generators
- executors
- migrations
- other things...

## Usage

Run following to get all plugin functionality:

`yarn nx list @fluentui/workspace-plugin`

## Testing

Run `yarn nx run workspace-plugin:test --runInBand`.
Use native path helpers for filesystem assertions and sort generated directory listings before comparing them.
When checking that a fixture is unchanged, compare its original bytes rather than assuming checkout line endings.
For source maps, compare every field and use the original source content, including its checkout line endings.

A passing Unix run is not native Windows validation. Windows export-subpath tests also depend on the separate
API-rollup runtime fix tracked in [#36654](https://github.com/microsoft/fluentui/issues/36654).
