# RUNBOOK — Resume Protocol

This migration is designed to survive token-limit resets, session crashes, and computer
restarts. **All durable state lives in this directory on branch
`styling/tailwind-css-modules`** (committed — never rely on uncommitted state or on
conversation memory).

## If you are a fresh session picking this up

1. `git checkout styling/tailwind-css-modules` in `C:/Users/ArrayKnight/Code/fluentui`.
2. Read `README.md` (mission + invariants), then `ledger.json` (`phase` field + per-package
   statuses), then the phase section below matching `ledger.phase`.
3. Read `reports/DECISIONS.md` for settled architecture decisions — do not re-litigate them.
4. Continue at the first unfinished step. Update `ledger.json` and commit after **every**
   completed unit of work (small commits, `chore(migration): ...` prefix; plan files in
   dedicated commits so they can be dropped before the final PR).

## Orchestration model

- **Fable (main session)** oversees: reads/writes the ledger, launches workflows, reviews
  results, makes decisions, commits.
- **Opus workers** do conversion and analysis; **Sonnet workers** do mechanical steps
  (inventory, screenshot runs, diff triage). Set per-agent via workflow `model:` opts.
- Workflow scripts live in `workflows/` and are **parameterized by `args`** (the batch of
  package names). They never read the ledger themselves (workflow scripts have no fs
  access) — the overseer reads the ledger, picks the batch, passes it as `args`, and
  writes results back to the ledger when the workflow returns.
- Batch size: 3–6 packages per workflow run so a crash loses at most one batch.
- Note: the ECC GateGuard hook fact-gates the first Bash call and every new-file Write in
  each session, including worker sessions. For mass-conversion sessions consider launching
  with `ECC_GATEGUARD=off` (user's call — ask once per session if unclear).

## Ledger contract (`ledger.json`)

- `phase`: `0-infrastructure` | `1-pilot` | `2-mass-conversion` | `3-integration` | `4-report`
- Package `status` lifecycle:
  `pending-triage → (no-styles | needs-conversion | special) → converting → converted →
validated → done`, with `blocked` as an escape hatch (always fill `notes`).
- `validated` means: package builds, unit tests pass, and screenshot diff vs. baseline is
  clean for every covered story × theme × direction combo.
- Only the overseer writes the ledger. Workers return results; overseer records them.

## Phase checklists

### Phase 0 — Infrastructure (current)

- [x] Branch + scaffolding + ledger seeded (87 packages, pending-triage)
- [x] Research reports saved to `reports/` (7 areas: nyt-games conventions, Griffel
      inventory, theming, storybook/VR, build/metrics, headless precedent, risks)
- [x] `reports/DECISIONS.md` written (D1–D12; includes CSS shipping, layers, variants,
      className compat, RTL, focus, tests, metrics, out-of-scope)
- [x] `CONVERSION_GUIDE.md` cookbook completed (worked example lands with the pilot)
- [x] Shared theme layer created (`packages/react-components/react-tailwind-theme` —
      fui.\* layer order, variant catalog, `--base-scale`; no preflight, palette zeroed)
- [x] Tailwind v4 + CSS Modules wiring proven in the VR storybook + jest (pilot);
      package-build CSS emission is Phase 1.5 below
- [x] Validation harness written (`validation/` — capture.mjs/diff.mjs/README); proven
      during pilot baseline capture
- [ ] Baseline metrics captured (`metrics/baseline/` — build time, monosize bundle sizes,
      docsite bundle) **before any component code changes**
- [x] Ledger triage: 49 needs-conversion / 14 special / 24 no-styles (247 styles files)

### Phase 1 — Pilot (user validates the process here)

- [x] Convert `react-divider` — DONE 2026-07-27: VR 31/31 pixel-identical at zero
      tolerance (independently re-verified), tests 32/32, lint + type-check clean,
      snapshot diffs additive-only (data-\* attributes). Worked example referenced from
      CONVERSION_GUIDE.
- [ ] Present pilot results to user for sign-off before mass conversion ← **HERE**
- [ ] Convert `react-badge` second (enum-heavy: appearance × color × size × shape;
      `!important` inversion design — see ledger note)
- [x] Cookbook updated with pilot lessons (layer statement per module, AOT-output-first,
      'use client' policy, toolchain traps, VR blind-spot probes)
- [ ] `workflows/convert-batch.js` finalized after badge validates the multi-package flow

### Phase 1.5 — Shipping & test infra (gate before mass conversion)

- [ ] Package build emits compiled CSS: PostCSS/Tailwind step in the build →
      `dist/styles.css` + class-map JS in `lib`/`lib-commonjs` (today the build exits 0
      but ships dangling `.module.css` imports and zero CSS — verified in pilot);
      update `files`/`exports`; decide theme-layer production emission (per-package
      duplicated vs suite-owned — open question)
- [ ] Gate off Griffel AOT + `*.styles.raw.js` generation for converted packages
      (both still run on the Griffel-free divider — dead work + install-size noise)
- [ ] `classname-overrides-win` replacement conformance test (D9) — pilot only disables
      the Griffel one
- [ ] Repo-wide `jest.preset.js` css-module mapper + serializer (pilot wired
      react-divider's config only; shared impl already at `scripts/jest/src/css-modules/`)
- [ ] monosize `assetTypes: ['js','css']` + webpack `experiments.css` fix (D10) so the
      after-leg counts CSS honestly

### Phase 2 — Mass conversion (ledger-driven loop)

Repeat until no `needs-conversion` remain:

1. Overseer picks next batch from ledger (dependency-ordered: theme/utility layers first,
   then simple leaf components, then compound components, `react-components` suite last).
2. Run `workflows/convert-batch.js` with `args = [batch]`.
3. For each package: worker converts per cookbook → build + unit tests → validation
   harness screenshot diff → verifier agent adjudicates diffs.
4. Overseer updates ledger (converted/validated/blocked + notes), commits code + ledger.
5. `special` packages (runtime-value styles, portals, motion) get individual Opus
   deep-dives, not batch treatment.

### Phase 3 — Integration

- [ ] `react-components` suite package builds; storybook (public-docsite-v9) builds
- [ ] Full VR pass across all packages; SSR tests (apps/ssr-tests-v9) green
- [ ] Conformance + unit test suites green repo-wide; snapshot tests updated intentionally
- [ ] Remove Griffel deps where no longer used; dependency graph clean

### Phase 4 — Report + PR

- [ ] Re-run every metric from `metrics/baseline/` → `metrics/after/`
- [ ] Write `reports/METRICS_REPORT.md` (build time, output size, client bundle, deltas)
- [ ] Author PR; move/remove `migration/` docs per user's preference

## Recovery notes

- Workflow crashed mid-batch: ledger still says `converting` — reset those packages'
  working tree (`git checkout -- packages/react-components/<pkg>`) or inspect partial
  work, then re-run the batch. Never trust half-converted state.
- Session died before ledger update: `git status`/`git diff` is ground truth; reconcile
  ledger to match reality before continuing.
- Baseline artifacts (screenshots/metrics) are large; if missing after a clean clone,
  re-run capture scripts against `master` (scripts record the exact baseline commit).
