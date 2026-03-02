---
name: fluentui-migrate-v8-to-v9
description: >
  Orchestrates end-to-end migration of a codebase from Fluent UI React v8 (@fluentui/react) to v9
  (@fluentui/react-components) using the @fluentui/cli toolchain. Use this skill when asked to
  migrate a project, run migration codemods, analyze what needs to change, or generate a migration
  plan. Covers: CLI report/migrate commands, codemod selection and sequencing, safety evaluation,
  verification, and identifying what requires manual migration vs. what can be automated.
---

# Fluent UI v8 → v9 Migration Workflow

## Safety Thresholds

```
PARSE_ERROR_RATE_LIMIT  = 0.05   # Stop if >5% of files fail to parse
LARGE_DIFF_FILE_COUNT   = 100    # Require human confirmation if >100 files changed
UNRESOLVED_IMPORT_LIMIT = 0      # Stop if any unresolved imports remain after transform
```

## Safety Rules

- **Never run apply before dry-run succeeds.**
- Stop if parse error rate exceeds `PARSE_ERROR_RATE_LIMIT`.
- Stop if transform succeeds but leaves unresolved imports.
- Require user confirmation when changed file count exceeds `LARGE_DIFF_FILE_COUNT`.

---

## 7-Step Migration Workflow

### Step 1 — Assess (Report)

```sh
npx @fluentui/cli report <path> --json
```

Parse the JSON output. Check:

- Which `@fluentui/*` packages are installed and at what versions
- Total usage count and per-component breakdown
- Presence of both v8 and v9 packages (mixed mode)

Save the report path for later reference:

```sh
npx @fluentui/cli report src/ --output ./fluent-report.json
```

### Step 2 — Plan

From the report output, decide which codemods apply. Use [codemod-catalog.md](references/codemod-catalog.md) to:

1. Identify Tier 1 (mechanical) transforms to run immediately
2. Identify Tier 2 (partial) transforms that need post-run validation
3. Identify Tier 3 (manual) patterns that need human migration — estimate scope from usage counts

List available codemods:

```sh
npx @fluentui/cli migrate --list --json
```

### Step 3 — Dry Run

Run selected codemods in dry-run mode:

```sh
# Single codemod
npx @fluentui/cli migrate deprecated-packages <path> --dry-run --json

# All applicable codemods from registry
npx @fluentui/cli migrate --run-migrations=migrations.json <path> --dry-run --json
```

Evaluate dry-run output:

- Check `parseErrors` count against `PARSE_ERROR_RATE_LIMIT`
- Check `filesChanged` against `LARGE_DIFF_FILE_COUNT`
- Check `unresolvedImports` against `UNRESOLVED_IMPORT_LIMIT`
- Stop and report if any threshold is exceeded

### Step 4 — Confirm (if threshold triggered)

If `filesChanged > LARGE_DIFF_FILE_COUNT`, pause and show the user:

- Total files that will be changed
- Breakdown by codemod
- Ask for explicit confirmation before proceeding

### Step 5 — Apply

```sh
npx @fluentui/cli migrate deprecated-packages <path> --json
npx @fluentui/cli migrate deprecated-props <path> --json
# ... additional codemods in sequenced order
```

Run codemods in this sequence (order matters for idempotency):

1. `deprecated-packages` — fix package imports first
2. `deprecated-props` — fix deprecated props
3. `import-paths` — consolidate deep path imports to barrel
4. `aria-props` — aria prop renames
5. `component-ref` — componentRef → ref
6. `component-renames` — 1:1 renames
7. `button-variants` — button variant transforms
8. Remaining Tier 2 codemods

After each codemod, check returned JSON for errors before proceeding.

### Step 6 — Verify

Run type-check on all touched packages:

```sh
# In the fluentui monorepo:
npx nx run-many -t type-check --projects=<touched-projects>

# In a standalone project:
npx tsc --noEmit
```

Report any type errors to the user. Type errors after mechanical transforms indicate either:

- A codemod missed a pattern → investigate and fix manually
- A Tier 3 change still needed → direct user to manual steps

### Step 7 — Summarize

Produce a final summary:

- Codemods run and files changed per codemod
- Remaining manual migration items (from Tier 3 detection in report)
- Any type-check failures still open
- Recommended next actions

---

## Codemod Decision Guide

Load [codemod-catalog.md](references/codemod-catalog.md) to determine:

- Which patterns in the codebase are mechanical (run codemod)
- Which are partial (run codemod + validate)
- Which are manual (flag with TODO, estimate effort)

**Key question per usage**: "Can this be transformed without reading surrounding context?" → Yes = Tier 1-2, No = Tier 3.

## Common Flags

```sh
# Run with TypeScript/TSX parser (default):
npx @fluentui/cli migrate <codemod> src/ --parser tsx

# Control parallelism for large codebases:
npx @fluentui/cli migrate <codemod> src/ --cpus 4

# Version-filtered run (skill-driven):
npx @fluentui/cli migrate src/ --from 8 --to 9
```

## Component-Specific Migration Guidance

For detailed prop mapping and examples when doing manual or partial migration steps, refer to the companion `fluentui-v8-to-v9` skill which contains:

- Per-component migration guides (Button, Menu, Input, Tabs, Stack, Theme)
- Full component mapping table
- Troubleshooting guide
