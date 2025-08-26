# react-integration-tester

This library was generated with [Nx](https://nx.dev).

## CLI

Scaffolded projects now live under a shared React root, e.g. `.../tmp/rit/react-17/<project-id>`, and dependencies are installed once under `.../tmp/rit/react-17/node_modules`.

Key flags:

- `--prepare-only` prepares the project. Use `--no-install` to skip installing deps.
- `--install-deps` installs dependencies for the selected React root and exits. Useful for CI when `--no-install` was used during prepare.
- `--project-id` deterministic suffix for the prepared project folder name. With `--prepare-only`, it names the scaffold. With `--run`, it reuses an already prepared scaffold.

Notes:

- When using `--run`, you cannot also pass `--prepare-only` or `--no-install`.

Examples:

```
# Install deps for particular React major. Run later without install (used on CI)
rit --react 17 --install-deps
rit --react 17 --prepare-only --no-install --project-id ci

# Run specific commands from existing project
rit --react 17 --project-id ci --run test --run type-check
```

## Building

Run `nx build react-integration-tester` to build the library.

## Running unit tests

Run `nx test react-integration-tester` to execute the unit tests via [Jest](https://jestjs.io).
