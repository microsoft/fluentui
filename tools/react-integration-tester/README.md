# react-integration-tester (rit)

CLI to scaffold and run integration checks for multiple React majors (17/18/19) using your project test stack. Provides fast reuse of deps + project scaffold to run 3 essential commands (test, e2e, type-check).

## Essentials

React majors support: 17, 18, 19
Runners support: `test` (Jest), `type-check` (TypeScript), `e2e` (Cypress)
Shared root: `./tmp/rit/react-<major>/` (deps installed once)
Prepared project: `./tmp/rit/react-<major>/<project-id>/`

## Quick start

```bash
# Prepare once (install deps -> generate scaffold)
rit --react 18 --prepare-only --project-id demo

# Run scripts (re-uses scaffold + node_modules -> run)
rit --react 18 --project-id demo --run test --run type-check
```

One‑shot run (install -> prepare -> run -> cleanup):

```bash
rit --react 19  --run test
```

Install deps only (CI cache warm):

```bash
rit --react 17 --install-deps
```

## Usage

```bash
rit --react <17|18|19> [--project-id <id>] [--config <file>]
    [--prepare-only [--no-install] | --install-deps | --run <script> ...]
```

Key flags:

- `--react` (required) React major.
- `--project-id` stable folder name (speeds reuse). Auto-generated if omitted.
- `--config` path to `rit.config.js`; falls back to local `./rit.config.js`.
- `--prepare-only` scaffold/update project (no scripts).
- `--no-install` skip install during prepare (assumes deps present).
- `--install-deps` install/update deps only, then exit.
- `--run <script>` run script(s); repeat flag for multiple.

Rules: `--run` is mutually exclusive with `--prepare-only` / `--no-install`.

## Configuration (`rit.config.js`)

If you need to tweak defaults you have 2 options:

- create `rit.config.js` within your project root
- create any js module that follows RIT Config API and point `rit` to it via `--config='<path_to_your_config_module>'`

Override per‑major React version commands and add/override dependencies. Merge is shallow: template defaults + your overrides.

**Config API:**

```ts
export interface ReactOverrides {
  commands?: {
    test?: string; // maps to script "test"
    typeCheck?: string; // maps to script "type-check"
    e2e?: string; // maps to script "e2e"
  };
  dependencies?: Record<string, string>; // added to shared root
}

export interface Config {
  react: {
    17?: ReactOverrides;
    18?: ReactOverrides;
    19?: ReactOverrides;
  };
}
```

**Minimal config example:**

In your project root create `rit.config.js`

```js
/** @type {import('@fluentui/react-integration-tester').Config} */
module.exports = {
  react: {
    17: {
      commands: {
        // maps to package.json script "test"
        test: 'jest --passWithNoTests -u --testPathIgnorePatterns test-file-that-wont-work-in-react-17.test.tsx',
      },
      // installed once under ./tmp/rit/react-17/node_modules
      dependencies: { 'some-package': '^1.2.3' },
    },
  },
};
```

Script key mapping: `test` → `test`, `typeCheck` → `type-check`, `e2e` → `e2e`.

## Typical CI flow

Install dependencies for your React major under test ( cache warm )

```bash
rit --react 18 --install-deps
```

From project root:

```bash
# prepare project with known suffix so we can target it against --run
rit --react 18 --prepare-only --no-install --project-id ci

# execute following in parallel via your task runner for best performance
rit --react 18 --project-id ci --run test
rit --react 18 --project-id ci --run type-check
```

## Multiple runners

```bash
# runs test,type-check,e2e in order ( no parallelization )
rit --react 19 --project-id all --run test --run type-check --run e2e
```

## Troubleshooting

- Reset cache: delete `./tmp/rit/react-<major>/`.
- Template changed / stale deps: rerun `--install-deps`.
- Missing script: ensure key exists in `commands` and you invoke kebab-case (`type-check`).
- Faster local edits: keep the prepared project; only re-run with `--run`.

## Developing this package (monorepo specifics)

Inside this Nx repo only:

- Build: `nx build react-integration-tester`
- Unit tests: `nx test react-integration-tester`
- CLI e2e tests: `nx test-e2e react-integration-tester`

Outside the repo, these Nx commands are not needed; just use the published CLI.
