# react-integration-tester

This library was generated with [Nx](https://nx.dev).

## CLI

Scaffolded projects now live under a shared React root, e.g. `.../tmp/rit/react-17/<project-id>`, and dependencies are installed once under `.../tmp/rit/react-17/node_modules`.

Key flags:

- `--prepare-only` prepares the project. Use `--no-install` to skip installing deps.
- `--install-deps` installs dependencies for the selected React root and exits. Useful for CI when `--no-install` was used during prepare.
- `--project-id` deterministic suffix for the prepared project folder name. With `--prepare-only`, it names the scaffold. With `--run`, it reuses an already prepared scaffold.
- `--config <path>` optional path to a `rit.config.js` that overrides commands and dependencies per React version. If not provided, a `./rit.config.js` in the current working directory will be used if present.

Notes:

- When using `--run`, you cannot also pass `--prepare-only` or `--no-install`.
- Commands and dependencies are resolved by merging your config with a builtin template for the selected React version (`files/react-<version>.json.template`).
- Command keys in config map to scripts as follows: `test` → `test`, `e2e` → `e2e`, `typeCheck` → `type-check`.

Examples:

```
# Install deps for particular React major. Run later without install (used on CI)
rit --react 17 --install-deps
rit --react 17 --prepare-only --no-install --project-id ci

# Run specific commands from existing project
rit --react 17 --project-id ci --run test --run type-check

# Provide a custom config explicitly
rit --react 18 --config ./path/to/rit.config.js --prepare-only --project-id custom
```

### Configuration file

`rit.config.js` lets you override commands and add dependencies per React major. The structure is:

```
/** @type {import('@fluentui/react-integration-tester').Config} */
module.exports = {
	react: {
		17: {
			commands: {
				// maps to package.json script "test"
				test: "jest --passWithNoTests -u --testPathIgnorePatterns components/FluentProvider/FluentProvider-hydrate.test.tsx",
				// optional: maps to script "type-check"
				// typeCheck: "tsc -p tsconfig.json --noEmit",
				// optional: maps to script "e2e"
				// e2e: "cypress run --config-file cypress.config.ts",
			},
			// Optional: add or override dependencies installed under the shared react root
			// dependencies: { "some-package": "^1.2.3" }
		},
		18: {
			// ...
		},
		19: {
			// ...
		},
	},
};
```

## Building

Run `nx build react-integration-tester` to build the library.

## Running unit tests

Run `nx test react-integration-tester` to execute the unit tests via [Jest](https://jestjs.io).
