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
- Windows commit limit: nano-staged passes all staged filenames to ONE prettier
  invocation — above ~70 staged JS/TS files the command line overflows and husky
  rolls the commit back (leaving the INDEX staged — git reset before retrying).
  Commit batches in per-package chunks; never bypass hooks.
- The button-family VR set (342 shots, ~4min) reliably outlives sonnet verify
  agents — it is an OVERSEER-owned step, not a workflow agent step.
- Note: the ECC GateGuard hook fact-gates the first Bash call and every new-file Write in
  each session, including worker sessions. For mass-conversion sessions consider launching
  with `ECC_GATEGUARD=off` (user's call — ask once per session if unclear).

## Ledger contract (`ledger.json`)

- `phase`: `0-infrastructure` | `1-pilot` | `1.5-shipping-infra` | `2-mass-conversion` | `3-integration` | `4-report`
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
- [x] **Expanded pilot (user-requested 2026-07-27) — DONE, all VR zero-tolerance:**
  - [x] `Button` converted (129/129 VR incl. hover/pressed; tests 202/202; both
        borderRadius inversions layer-resolved; shared focus utilities in
        react-tailwind-theme with @property inherits:false nesting safety)
  - [x] FluentProvider root styles converted (Text 6/6, Menu ~30, Divider regression
        31/31; portal threading + portal-compat regex empirically verified identical)
  - [x] Mixed-mode proven: ToggleButton/CompoundButton/MenuButton/SplitButton stay
        Griffel composing the converted hook — 342/342 VR clean
  - [x] Non-component styles inventory: `reports/pilot-provider-inventory.md`
        (21 sources classified; makeStaticStyles = zero product usage; VR harness
        uses inline styles only — nothing to convert)
  - [x] Charts fallout resolved: 153 snapshot updates A/B-attributed (6 HeatMapChart
        failures pre-existing env flake, excluded); +593/-0 lines, all pure `data-*`
        additions (script-verified)
  - [x] jest.preset.js repo-wide css-module mapper (proven necessary: any suite
        rendering FluentProvider needs it); serializer whole-string bug fixed
- [x] Expanded pilot signed off by user 2026-07-27 ("ready for the next phase… go for it")
- [ ] Convert `react-badge` (enum-heavy: appearance × color × size × shape;
      `!important` inversion design — see ledger note) — after sign-off
- [x] Cookbook updated with pilot lessons (layer statement per module, AOT-output-first,
      'use client' policy, toolchain traps, VR blind-spot probes)
- [ ] `workflows/convert-batch.js` finalized after badge validates the multi-package flow

### Phase 1.5 — Shipping & test infra — COMPLETE 2026-07-27 (wf_b6b62013-472; VR 572/572, consumer smoke green, monosize -48/-50% gz on Button/Divider)

- [x] Package build emits compiled CSS: PostCSS/Tailwind step in the build →
      `dist/styles.css` + class-map JS in `lib`/`lib-commonjs` (today the build exits 0
      but ships dangling `.module.css` imports and zero CSS — verified in pilot);
      update `files`/`exports`; theme emission is a standalone root artifact imported
      once per document, NEVER embedded per-package (D13, settled with user); the
      emission step MUST prepend the canonical @layer order statement verbatim
      (Tailwind v4 rewrites it during module compilation — D13)
- [x] Gate off Griffel AOT + `*.styles.raw.js` generation for converted packages
      (both still run on the Griffel-free divider — dead work + install-size noise)
- [x] `classname-overrides-win` replacement conformance test (D9) — pilot only disables
      the Griffel one
- [x] Repo-wide `jest.preset.js` css-module mapper + serializer (pilot wired
      react-divider's config only; shared impl already at `scripts/jest/src/css-modules/`)
- [x] Generated token registration (user-settled 2026-07-27): `tokens.css` in
      react-tailwind-theme with `@theme inline` mapping all 459 Fluent tokens to
      Tailwind namespaces (bg-/text-/border-neutral-background-1 etc., camelCase to
      kebab), generated from @fluentui/tokens at build time (web-components
      design-tokens precedent). MUST be `@theme inline` - a naive @theme alias
      freezes var() resolution at :root and breaks provider theming (probe:
      .scratch/layer-probe/entry2.css). Settle alias-emission suppression + spacing
      namespace at build time.
- [x] monosize `assetTypes: ['js','css']` + webpack `experiments.css` fix (D10) so the
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

### Packaging refinement candidate (recorded 2026-07-27, batch-1 finding)

- Per-COMPONENT CSS emission + per-component side-effect imports (vs D1 per-package
  aggregation): PresenceBadge fixture +26.3% gz because every import pays the whole
  package stylesheet while its own JS share is small (react-icons dominates). Suite-
  level usage washes this out; single-component micro-bundles pay. Decide before or
  during Phase 3; requires only emission-step changes, no authoring changes.

### Queued (user-directed 2026-07-27, in order)

1. Stroke-widths workflow DONE (VR 20/21 + family clean; tests green; build 196s/AOT 42).
   OPEN: react-infolabel "sizes -- open" fails 238px deterministically. Bisection
   EXONERATED each stroke file individually (utilities.css / storybook theme css /
   theme regen / infolabel dir all reverted alone → still 238px). Diagnosis agent
   running with DOM-ground-truth method (icon-swap layered-vs-unlayered vs webpack
   cache theories). Do NOT convert more packages until root-caused.
2. Phase 2 batch 3 — next 10 lowest-level from needs-conversion
3. **Client performance evaluation** — PERF_EVAL_SPEC.md (5 components incl. Button,
   plain vs multi-layer-overridden, 1 vs 100-instance matrix, vs Griffel predecessors)

### Phase 3 — Integration

- [ ] `react-components` suite package builds; storybook (public-docsite-v9) builds
- [ ] Full VR pass across all packages; SSR tests (apps/ssr-tests-v9) green
- [ ] Conformance + unit test suites green repo-wide; snapshot tests updated intentionally
- [ ] **Remove the state-mutation builder pattern (D14, user-committed):** pure
      non-mutating hooks (spread-composed state/slot returns) across base hooks,
      all styles hooks, render pipeline; redesign customStyleHooks_unstable to
      functional form; enable react-hooks/immutability repo-wide with ZERO disables;
      verify slot-symbol metadata survives spread; full VR re-validation
- [ ] **Documentation audit (user-added 2026-07-27):** re-check ALL docs — inline and
      external — and validate they are updated and still correct post-migration.
      Inline: code comments/JSDoc across converted packages (the mergeClasses
      references in module headers and hooks are TRANSITIONAL — accurate today as
      mixed-mode/provenance notes, stale the day the mechanism is gone; decide
      keep-as-history vs rewrite vs delete per site). External: docsite MDX styling/
      customization guides that teach makeStyles/mergeClasses, READMEs, RFCs
      (styles-handbook.md), migration guides, storybook descriptions, headless
      preview GettingStarted. Method: sweep greps for mergeClasses|makeStyles|
      Griffel|shorthands across comments+docs, classify every hit, verify doc code
      samples against the converted API.
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
