# Fluent UI v9 Agentic Migration — Project Spec

## 1) Objective

Build an **agentic migration solution** for Fluent UI React v9 that consists of exactly two products:

1. **Agent Skills** — deterministic instructions/workflows AI coding agents can follow for complex migrations.
2. **CLI** — executable migration engine that performs Nx-style migrations and AST transformations.

The skills are the **primary source of migration logic and sequencing**; the CLI is a **supportive execution utility** for codemods, reporting, and deterministic automation steps.

---

## 2) Problem Statement

Current migrations (v8 → v9 and v9 minor upgrades) are inconsistent and largely manual:

- no official migration skill system that encodes migration strategy,
- no stable bridge between agent workflow decisions and codemod execution,
- no repeatable agent workflows tied to deterministic transform tooling.

Result: high migration cost, inconsistent outcomes, and low confidence for large codebases.

---

## 3) Scope

### In scope (MVP)

- Define and version **agent skills** for v8 → v9 migration.
- Publish a CLI package (`@fluentui/cli`) as a support tool with:
  - codemod execution (`migrate`) for skill-selected steps,
  - AST-based transforms (jscodeshift initially),
  - migration diagnostics/reporting (`report`),
  - dry-run support and machine-readable output for agents.
- Ensure skills invoke CLI only for deterministic/mechanical edits and analysis.
- Implement and ship the two required MVP codemods: `deprecated-packages`, `deprecated-props`.

### Out of scope (MVP)

- Full auto-migration for every v8 component.
- IDE plugin UI.
- New runtime shim framework.
- Cross-framework migrations beyond React/TS.
- Migration recommendation hints in `report` output (Phase 2).

---

## 4) Success Criteria

- Agent can execute end-to-end migration workflow on a sample app with no custom prompts.
- Skills own migration planning decisions; CLI only executes requested codemods reliably.
- CLI provides deterministic output (`dry-run` + applied mode) and idempotent transforms.
- For MVP migrations, at least 80% of targeted mechanical edits are automated.
- Type-check/test failure count after migration is lower than baseline manual approach.

---

## 5) Architecture

### 5.1 Agent Skills Layer

Skills are the migration control plane and contain:

- decision trees (when to run which migration),
- sequencing rules (report → dry-run → apply → verify),
- stop conditions (unsafe diff size, parser failures, unresolved imports),
- escalation rules (manual review checkpoints).

Skills select migration steps, call CLI commands, and evaluate outcomes before proceeding.

### 5.2 CLI Layer

CLI is an execution/data plane and contains:

- transform runner,
- reporting/analysis commands,
- structured result output for agent consumption.

Primary transform engine for MVP: **jscodeshift** (TS/TSX parser defaults). CLI does not own migration strategy.

---

## 6) CLI Spec

CLI command behavior is intentionally minimal and execution-focused; migration strategy remains in skills.

### 6.1 Commands

#### `migrate`

Run codemods selected by skills (from `migrations.json` or by migration name).

```sh
npx @fluentui/cli migrate [migration-name] [path] [options]

# Registry-driven run (Nx-style):
npx @fluentui/cli migrate --run-migrations=migrations.json src/

# Direct migration run:
npx @fluentui/cli migrate deprecated-packages src/

# Semver-filtered run (typically skill-driven):
npx @fluentui/cli migrate src/ --from 8 --to 9
```

Options:

- `--run-migrations <path>` — registry file path
- `--from <semver>` — lower bound
- `--to <semver>` — upper bound
- `-d, --dry-run` — preview without writing
- `-l, --list` — list known migrations
- `--cpus <n>` — worker count
- `--parser <tsx|ts|babel|babel-ts>` — default: `tsx`
- `--json` — emit machine-readable result summary to stdout

#### `report`

Produce diagnostics data for agents to decide migration steps. Writes structured JSON to a file by default (output can be large).

```sh
npx @fluentui/cli report [path] [options]
```

Options:

- `--output <file>` — default: `./fluent-report.json`
- `--print` — print compact summary to stdout instead of writing file
- `--json` — emit full JSON to stdout (for agent piping)

Output sections:

1. **Environment** — Node, OS, npm versions (always included).
2. **Installed packages** — all `@fluentui/*` and `@fluentui-contrib/*` versions (always included).
3. **Usage inventory** — imports + JSX props per component across scanned path (only when `[path]` is provided).

Terminal summary always printed after file write:

```sh
Report written to fluent-report.json

Node: 22.21.1  |  OS: darwin-arm64  |  npm: 10.9.4
Installed:  @fluentui/react-components@9.73.1  @fluentui/react@8.125.5  (+1 more)
Usage:      312 usages across 14 components in src/
```

JSON schema (`fluent-report.json`):

```json
{
  "generatedAt": "2026-03-02T10:00:00.000Z",
  "env": { "node": "22.21.1", "os": "darwin-arm64", "npm": "10.9.4" },
  "packages": {
    "@fluentui/react-components": "9.73.1",
    "@fluentui/react": "8.125.5"
  },
  "usage": {
    "scannedPath": "src/",
    "totalUsages": 312,
    "components": [
      { "name": "Button", "package": "@fluentui/react-components", "usages": 142, "props": ["appearance", "icon"] },
      { "name": "DefaultButton", "package": "@fluentui/react", "usages": 37, "props": ["text", "onClick"] }
    ]
  }
}
```

`usage` is `null` when no path is provided.

Migration recommendation hints are **Phase 2** — MVP `report` is data-only.

---

### 6.2 Migration Registry Contract (`migrations.json`)

`migrations.json` is an execution catalog consumed by CLI; it is not the migration strategy source.

```json
{
  "version": "1",
  "migrations": [
    {
      "name": "deprecated-packages",
      "version": "9.0.0",
      "fromVersion": "8.0.0",
      "description": "Replace deprecated @fluentui package imports with supported equivalents",
      "package": "@fluentui/react-components",
      "kind": "ast",
      "implementation": "./dist/transforms/v9/deprecated-packages.js",
      "idempotent": true
    },
    {
      "name": "deprecated-props",
      "version": "9.0.0",
      "fromVersion": "8.0.0",
      "description": "Replace @deprecated props across v9 components with their supported replacements",
      "package": "@fluentui/react-components",
      "kind": "ast",
      "implementation": "./dist/transforms/v9/deprecated-props.js",
      "idempotent": true
    }
  ]
}
```

Fields:

- `kind`: `ast` | `nx-generator` | `composite`
- `implementation`: path to compiled entrypoint, resolved from package root
- `idempotent`: required declaration — transforms that cannot guarantee idempotency are not permitted in MVP

---

### 6.3 Migration Types

1. **AST transform** (default): codemods for imports, props, JSX shape. Implemented as standard jscodeshift transforms.
2. **Nx-style migration wrapper**: invokes migration-style scripts through the unified CLI contract.
3. **Composite migration**: ordered list of atomic migrations with shared context.

---

## 7) Agent Skills Spec

Skills are the authoritative migration source for this project.

### 7.1 Location

`skills/<skill-name>/SKILL.md` at the **repo root**. Versioned with the codebase. Distributed via the `npx skills add` tooling (external).

### 7.2 Skill Inventory (MVP)

| Skill file                            | Purpose                               |
| ------------------------------------- | ------------------------------------- |
| `skills/fluentui-migrate-v8-to-v9.md` | End-to-end v8 → v9 migration workflow |

### 7.3 Skill Workflow Contract

Every skill must follow this baseline sequence:

1. Run `@fluentui/cli report [path] --json` and parse the JSON output.
2. Determine applicable migration plan from skill rules.
3. Resolve needed codemod steps against CLI migration list (`migrate --list --json`).
4. Run `migrate --dry-run --json` and evaluate risk signals against safety thresholds.
5. Run `migrate --json` (apply step) if safe; confirm with user if large-diff gate triggers.
6. Run verification (`npx nx run-many -t type-check` on touched projects).
7. Produce final summary: migrations run, files changed, remaining manual follow-ups.

### 7.4 Skill Safety Thresholds

Defined as named constants in the skill file (hardcoded defaults, documented for review):

| Constant                  | Default | Meaning                                               |
| ------------------------- | ------- | ----------------------------------------------------- |
| `PARSE_ERROR_RATE_LIMIT`  | `0.05`  | Stop if >5% of files fail to parse                    |
| `LARGE_DIFF_FILE_COUNT`   | `100`   | Require human confirmation if >100 files changed      |
| `UNRESOLVED_IMPORT_LIMIT` | `0`     | Stop if any unresolved imports remain after transform |

### 7.5 Safety Rules

- Never run apply step before dry-run succeeds.
- Stop if parser error rate exceeds `PARSE_ERROR_RATE_LIMIT`.
- Stop if transform claims success but outputs unresolved imports.
- Require human confirmation when changed file count exceeds `LARGE_DIFF_FILE_COUNT`.

---

## 8) Required Codemods (MVP)

### `deprecated-packages`

Rewrites imports from deprecated `@fluentui` packages to their current equivalents.

Deprecated packages (source: `packages/react-components/deprecated/`):

| Deprecated import             | Replacement                           | Note                                                                |
| ----------------------------- | ------------------------------------- | ------------------------------------------------------------------- |
| `@fluentui/react-alert`       | `@fluentui/react-toast`               | Insert `// TODO: also consider @fluentui/react-message-bar` comment |
| `@fluentui/react-infobutton`  | `@fluentui/react-infolabel`           | Rename component `InfoButton` → `InfoLabel`                         |
| `@fluentui/react-virtualizer` | `@fluentui-contrib/react-virtualizer` | Package moved to contrib                                            |

**Source of truth**: read `packages/react-components/deprecated/*/README.md` before implementing.

### `deprecated-props`

Renames (or removes) deprecated component props to their supported replacements.

Known deprecated props (source: `@deprecated` JSDoc tags in `packages/react-components/`):

| Component            | Deprecated prop       | Replacement                          |
| -------------------- | --------------------- | ------------------------------------ |
| `TableSelectionCell` | `hidden`              | `invisible`                          |
| `Popover`            | `legacyTrapFocus`     | `inertTrapFocus`                     |
| `Calendar` (compat)  | `overlayedWithButton` | `overlaidWithButton`                 |
| `PositioningOptions` | `positionFixed`       | `strategy="fixed"` (value transform) |
| `TagPickerList`      | `disableAutoFocus`    | _(remove — prop has no effect)_      |

**Source of truth**: search `@deprecated` across `packages/react-components/` before implementing to catch any additions.

### Transform conventions

```typescript
import type { Transform, API, FileInfo } from 'jscodeshift';
const transform: Transform = (file: FileInfo, api: API): string | void => { ... };
export default transform;
// Return undefined → nochange (no write). Must be idempotent.
```

---

## 9) Package Layout

```sh
packages/cli/
├── bin/fluentui.js              # #!/usr/bin/env node shebang
├── migrations.json              # execution catalog (ships in npm package)
├── src/
│   ├── index.ts                 # yargs root — registers migrate + report
│   ├── types.ts                 # MigrationEntry, RunnerOptions, ReportOutput, ...
│   ├── commands/
│   │   ├── migrate.ts
│   │   └── report.ts
│   ├── runner/
│   │   ├── MigrationRunner.ts   # loads registry, filters, invokes jscodeshift Runner API
│   │   └── semverFilter.ts      # normaliseVersion(), filterMigrationsByRange()
│   ├── report/
│   │   ├── packageScanner.ts    # globs node_modules for @fluentui/* versions
│   │   └── UsageCollector.ts    # jscodeshift read-only visitor for imports + JSX props
│   ├── transforms/
│   │   └── v9/
│   │       ├── deprecated-packages.ts
│   │       └── deprecated-props.ts
│   └── __tests__/
│       ├── semverFilter.test.ts
│       ├── MigrationRunner.test.ts
│       ├── report/packageScanner.test.ts
│       └── transforms/
│           ├── deprecated-packages/   # golden input/output fixtures
│           └── deprecated-props/      # golden input/output fixtures
├── package.json
├── project.json                 # @nx/js:swc build target, platform:node tag
├── .swcrc                       # copy from tools/visual-regression-assert/.swcrc
├── tsconfig.json
├── tsconfig.lib.json
├── tsconfig.spec.json
├── jest.config.ts
└── eslint.config.js
```

Skills (repo root, versioned with code):

```sh
skills/
└── fluentui-migrate-v8-to-v9.md
```

---

## 10) Build Tooling

Mirrors `tools/visual-regression-assert/` — the canonical modern Node CLI package in the repo.

| Concern        | Tool                                                                          |
| -------------- | ----------------------------------------------------------------------------- |
| Build executor | `@nx/js:swc` — output to `packages/cli/dist/`                                 |
| SWC config     | `.swcrc` — copy from `tools/visual-regression-assert/.swcrc`                  |
| Tests          | `@swc/jest` reading `.swcrc`, `testEnvironment: node`                         |
| TypeScript     | Solution config: `tsconfig.json` → `tsconfig.lib.json` + `tsconfig.spec.json` |
| Lint           | ESLint flat config, `@fluentui/eslint-plugin` `flat/node` base                |

Workspace changes required:

| File                 | Change                                                      |
| -------------------- | ----------------------------------------------------------- |
| `nx.json`            | Add `"packages/cli/**"` to workspace plugin `include` array |
| `tsconfig.base.json` | Add `"@fluentui/cli": ["packages/cli/src/index.ts"]`        |

---

## 11) Implementation Phases

### Phase 0 — Scaffold

- Create `packages/cli/` with all config files (build, test, lint, TypeScript).
- Update `nx.json` + `tsconfig.base.json`.
- Verify `nx build cli` and `nx test cli` pass on empty stubs.

### Phase 1 — Core Engine

- Implement `types.ts`, `semverFilter.ts`, `MigrationRunner.ts` with tests.
- Implement `migrate` command shell + `--list`, `--dry-run`, `--json` modes.
- Create `migrations.json` with two entries (stubs, implementations not yet wired).
- Verify CLI responds correctly to all flags against stub transforms.

### Phase 2 — Codemods

- Implement `deprecated-packages.ts` with golden tests + idempotency test.
- Implement `deprecated-props.ts` with golden tests + idempotency test.
- Wire transforms into `migrations.json`.

### Phase 3 — Report Command

- Implement `packageScanner.ts` + tests.
- Implement `UsageCollector.ts` + tests.
- Implement `report.ts` command (file write, `--print`, `--json`).

### Phase 4 — Agent Skill

- Author `skills/fluentui-migrate-v8-to-v9/SKILL.md` with safety thresholds, 7-step workflow, CLI invocations.
- Validate workflow against real CLI output on a sample v8 codebase.

---

## 12) Verification Strategy

- **Unit tests**: runner, semver filter, registry parsing.
- **Golden tests**: each transform has `*.input.tsx` / `*.output.tsx` fixture pairs.
- **Idempotency test**: run each transform twice — second run must return `undefined` (no change).
- **Integration test**: sample v8 app → CLI migrate → typecheck passes.
- **Skill E2E**: simulated agent execution path using real CLI `--json` outputs.

---

## 13) Risks and Mitigations

- **API drift**: registry versioning + semver gates.
- **False-positive transforms**: conservative AST matching + dry-run diff review.
- **Agent overreach**: enforce skills-first policy; CLI is execution-only.
- **Large monorepo runtime cost**: path scoping + `--cpus` worker control + incremental runs.

---

## 14) Open Decisions — Resolved

| Decision                       | Resolution                                                                                             |
| ------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Skills packaging location      | `skills/<name>.md` at repo root. `react-components-agent-skills/` placeholder not used.                |
| Report migration hints in MVP  | Phase 2 only. MVP `report` is data-only.                                                               |
| Safety gate threshold defaults | Hardcoded named constants in skill file: parse error 5%, diff gate 100 files, zero unresolved imports. |
