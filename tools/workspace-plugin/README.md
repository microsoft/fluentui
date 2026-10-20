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

Run `yarn nx run workspace-plugin:test --runInBand` on Windows or Unix.
Use native path helpers for filesystem assertions and sort generated directory listings before comparing them.
When checking that a fixture is unchanged, compare its original bytes rather than assuming checkout line endings.
