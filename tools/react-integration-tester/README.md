# react-integration-tester (rit)

CLI to scaffold and run integration checks for multiple React majors (17/18/19) using YOUR project's existing test tooling (Jest / Cypress / TypeScript). It re‑uses a single shared dependency install per React major and creates cheap throw‑away (or reusable) scaffold projects exposing exactly three scripts: `test`, `type-check`, `e2e`.

## Essentials

React majors support: 17, 18, 19
Runners support: `test` (Jest), `type-check` (TypeScript), `e2e` (Cypress)
Shared root: `<repoRoot>/tmp/rit/react-<major>/` (deps installed once)
Prepared project naming:

```
<repoRoot>/tmp/rit/react-<major>/<origin-project-name>-react-<major>-<project-id>
```

When you omit `--project-id`, a random suffix is used instead of `<project-id>`, e.g.

```
button-react-18-7423891
```

This deterministic pattern (when you pass `--project-id`) lets you reliably re‑use a scaffold across multiple `--run` invocations without re‑preparing.

## How it works

```mermaid
flowchart LR
  START((Start)) --> A["A: Install dependencies<br/>shared react-<major> root<br/><code>tmp/rit/react-<major></code>"]
  A --> B["B: Scaffold project<br/><code><origin>-react-<major>-<id></code>"]
  B --> C{C: Run selected scripts}
  C -->|test| T["test (Jest)"]
  C -->|type-check| TC["type-check (tsc)"]
  C -->|e2e| E2E["e2e (Cypress)"]
  T --> END((End))
  TC --> END
  E2E --> END
  classDef phase fill:#eef,stroke:#447,stroke-width:1px;
  class A,B,C phase;
```

Legend:

- A runs when you use `--install-deps`, or implicitly during a prepare/run unless you pass `--no-install` with prior deps installed.
- B runs on `--prepare-only` or any one‑shot run without `--project-id` (temporary) or with `--project-id` (reusable).
- C executes only the scripts you explicitly list via repeated `--run` flags, sequentially.

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
rit --react <17|18|19> \
  [--project-id <id>] [--config <file>] [--cwd <path>] \
  [--prepare-only [--no-install] [--force]] \
  [--install-deps] \
  [--run <test|type-check|e2e> ...] \
  [--cleanup|--no-cleanup] [--verbose]
```

Flag reference (implementation accurate):

- `--react` (required for every invocation) React major.
- `--project-id` stable suffix enabling scaffold reuse. Required when using `--prepare-only`. Optional otherwise (random suffix used if omitted).
- `--config` path to a config module (CommonJS or ESM). Defaults to `./rit.config.js` if present.
- `--prepare-only` create/update a scaffold (and install unless `--no-install`). Does NOT run scripts.
- `--no-install` (only valid with `--prepare-only`) skips dependency installation. Requires that dependencies have already been installed earlier via `--install-deps` for that React major; otherwise it fails fast.
- `--install-deps` install/update shared deps for the React major root and exit (no scaffold created).
- `--run <script>` select one or more scripts to execute sequentially. Repeat the flag for multiple (e.g. `--run test --run type-check`). You must list all you want; there is no implicit “run all”.
- `--force` (with `--prepare-only`) delete existing scaffold with the same computed name before recreating it.
- `--cleanup` / `--no-cleanup` (default: cleanup) remove the temporary project after running. When reusing via `--run` + `--project-id`, cleanup is effectively a no‑op; the scaffold remains unless you prepared and then ran in one shot without reuse.
- `--verbose` extra logging including resolved metadata.
- `--cwd` working directory for discovering the origin project (defaults to process cwd).

Rules & guardrails:

- `--run` cannot be combined with `--prepare-only` or `--no-install`.
- `--prepare-only` requires `--project-id` (deterministic reuse is a core feature).
- You must pass at least one `--run` OR use `--prepare-only` OR `--install-deps`.
- Reusing (`--run ... --project-id <id>`) requires that dependencies are already installed for that React root (`rit --install-deps --react <major>` or a prior prepare/run that installed them).

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

Script key mapping (config camelCase → scaffold script name): `test` → `test`, `typeCheck` → `type-check`, `e2e` → `e2e`.

Only these three script names are runnable (`--run` choices). Additional scripts you add to the template are ignored by the CLI selector.

## Typical CI flow

Install dependencies for your React major under test (cache warm; safe to run repeatedly—it only rewrites/reacts when deps change):

```bash
rit --react 18 --install-deps
```

From project root:

```bash
# prepare project with known suffix so we can target it against --run (depends already installed)
rit --react 18 --prepare-only --no-install --project-id ci

# execute following in parallel via your task runner for best performance
rit --react 18 --project-id ci --run test
rit --react 18 --project-id ci --run type-check
```

## Multiple runners

```bash
rit --react 19 --project-id all --run test --run type-check --run e2e  # runs sequentially
# Partial subset
rit --react 19 --project-id fast --run type-check
```

## Project naming & reuse

Given a source package `@scope/button` and `--react 18 --project-id demo` the scaffold will live at:

```text
<repoRoot>/tmp/rit/react-18/button-react-18-demo
```

Reusing later:

```bash
rit --react 18 --project-id demo --run test
```

If you omit `--project-id` the name ends with a random number and is NOT intended for reuse.

## Troubleshooting

- Reset cache (all scaffolds + deps for a major): delete `<repoRoot>/tmp/rit/react-<major>/`.
- Template or dependency change: run `rit --react <major> --install-deps` (updates root package.json & installs if needed).
- Missing script: confirm it exists in merged template AND origin project tooling (e.g. Jest/Cypress present). You must invoke with kebab-case (`type-check`).
- Using `--prepare-only --no-install` without prior `--install-deps` will fail intentionally to prevent unusable scaffolds.
- Keep a scaffold for iterative local debugging: run with `--no-cleanup` (except when reusing via `--project-id`, cleanup is already a no-op).
- Force a clean re‑prepare (discard old scaffold): add `--force`.

## Contributing

Inside this repo only:

- Build: `nx run react-integration-tester:build`
- Tests: `nx test react-integration-tester:test`
