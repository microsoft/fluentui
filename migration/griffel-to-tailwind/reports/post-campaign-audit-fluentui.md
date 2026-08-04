# Post-campaign audit — over-engineering & consistency (fluentui)

**Date:** 2026-08-04 · **Branch:** `styling/tailwind-css-modules` @ `62402f4375` ·
**Mandate:** validate the shipped diff is "as simple as it can possibly be" and internally
consistent. Method: repo-wide mechanical sweeps over the full converted surface plus
stratified per-era manual samples. **VR was NOT re-run** (all gates previously passed;
user directive: VR is non-negotiable, so nothing pixel-relevant was changed by this audit).

## 0. What was fixed vs reported

**Fixed: nothing in code.** Every candidate smell the sweeps surfaced was either
(a) already sanctioned by a recorded rule/decision with an in-file constraint comment, or
(b) pixel-/class-string-relevant and therefore report-only under the VR-first fix policy.
No change in this audit touches emitted CSS, class strings, comments, or exports — the
only commit is this report. (Fix policy applied: commit-without-VR only for changes that
provably cannot alter emitted CSS or runtime class strings; nothing needing such a fix
was found.)

## 1. Coverage (honest sampling list)

**Repo-wide mechanical sweeps** (every tracked file in scope, not samples):

- 238 `library/src/**/*.module.css` modules; 227 `*.styles.ts` hooks importing clsx;
  837 tracked `*.module.css` total (library + stories + docs + apps).
- Sweeps run: `@reference`-first + repeated canonical `@layer` statement; local-name
  casing; clsx import form; `:global(` usage; raw `[data-fui-focus-visible]`;
  `transition:` shorthand; empty rules; `!important`; TODO/FIXME/HACK; `console.log`;
  `useStyles = () => styles` shims; dead module locals (scripted local-vs-hook
  cross-reference, `.scratch/dead-locals.js`); marker-position in clsx calls;
  mutation-vs-immutable hook shape.

**Per-era manual samples** (read, not just grepped):

| Era                        | Sampled                                                                                                                           |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Pilot                      | react-divider (as the named template), react-switch module header + hook                                                          |
| Mass batches (phase-2 1–5) | react-switch, react-avatar (dynamic class map), react-text `presets`, react-badge PresenceBadge (`!important` special)            |
| Statics removal (D16)      | Legends header (statics→marker note), BreadcrumbButton compound, CalendarDayGrid `extraCalendarDayGridClassNames` empties         |
| Charts C1–C7               | Legends (module+hook), ChartAnnotationLayer (dead-slice carry), SankeyChart comment, charts stories tier                          |
| Harness S-E                | apps/vr-tests-react-components `Spinner.module.css` (pause-wrapper w/ marker selector)                                            |
| Stories S-F 1–7            | react-list `ListActiveElement`, react-drawer `DrawerWithTitle`, shim survey across 35 files                                       |
| S-G/S-H                    | conformance-griffel CHANGELOG move (S-H commit `71d6342693`), umbrella import grep                                                |
| S-J                        | Button/ToggleButton/MenuButton unlayered icon blocks; DataGridBody + ToolbarToggleButton wrapper hooks (immutable re-stamp shape) |

## 2. Dialect consistency across eras — PASS

Library tier is uniform to a degree that is unusual for a months-long campaign:

- **`@reference '#theme';` first line + repeated canonical `@layer` statement:
  238/238** (0 missing). Header comment block is verbatim-identical across eras
  (Switch = phase-2, Legends = charts; same text).
- **Lowercase-kebab locals: 238/238** (0 uppercase locals in library modules).
- **`import { clsx } from 'clsx'`: 227/227** — one form, no variance.
- **Marker placement:** leaf hooks stamp `clsx(styles.root, 'group/fui-x', …, consumer)`
  (Switch, Legends verified). 12 hooks lead their _call_ with the marker
  (ToggleButton, MenuButton, MenuItem\*, Toolbar\*Button, DataGrid\*) — all are
  delegating wrappers whose wrapped hook prepends its own unconditional class, each with
  an in-file comment stating the D15.1/D16.2 `classList[0]` constraint, and the
  `component-has-group-marker` conformance test asserts the invariant at runtime.
  Consistent-by-rule, not drift.
- **Pseudo-state via shared variants:** 0 raw `[data-fui-focus-visible]` selectors in
  library modules — every one of the 34 files that mention it do so only in comment
  citations of the compiled Griffel AOT output.
- **`:global(` policy:** 0 selector-position uses outside the two sanctioned patterns
  (icon swap `fui-Icon-*`, group markers). All 53 other grep hits are comments.
- **Transition longhands:** 0 `transition:` shorthands in library modules.
- **Comment policy (post-S-I):** all TODO/FIXME/HACK strings in library modules are
  constraint-stating carries of upstream notes ("carried verbatim", "reproduced, not
  fixed", D6 citations) — no migration-added debt markers.
- **`!important` in library modules:** only PresenceBadge (9) — the pre-planned
  react-badge special (semantics under layers, designed during the badge pilot). Story
  tier: vr-tests animation-pause helpers (deliberate test scaffolding).

**One deliberate two-shape split, documented:** 150 hooks keep the Griffel-era mutation
pattern (`state.root.className = …`) per D14 ("preserve during conversion; removal is a
single Phase 3 sweep — Batch F in `phase3-worklist.md`, still TODO), while 26 hooks use
immutable spread. The 26 are exactly the delegating wrappers that had to re-stamp around
their delegate call, each carrying a rationale comment (DataGridBody cites "F1 of the D14
mutation removal"). Not drift, but the D14 sweep is the single largest outstanding
consistency item — until Batch F lands, the codebase intentionally has two composition
shapes.

## 3. Simplicity smells — findings (all REPORT-ONLY)

1. **35 `const useStyles = () => styles;` story shims remain.** Survey of all 35: every
   caller uses a non-`styles` local (`classes`, `farGroupStyles`) — exactly the class the
   sf-batch cleanup script (`sf-shim-cleanup2.js`) intentionally kept (its rule removed
   only shadowing `const styles = useStyles()` cases). Zero violations of the script's
   own rule. One stylistic outlier:
   `packages/react-components/react-drawer/stories/src/Drawer/DrawerWithTitle.stories.tsx`
   calls `useStyles().drawer` inline; `styles.drawer` would be simpler. JS-only, cannot
   change the class string — but it is inside the sanctioned diff-minimizing shim
   dialect, so left as-is. (LOW)
2. **Story-tier local casing is mixed** where the library tier is 100% kebab: charts
   stories 20/20 modules camelCase, react-button stories 10/39, docsite 14/48,
   vr-tests 10/20, react-list stories 5/8. This is the deliberate diff-minimizing story
   dialect (locals kept their Griffel slice names); the sf-batch1 "kebab-case" claim
   applies only to MDX doc _fences_, which were codemodded to kebab. Normalizing would
   change hashed idents (jest snapshot churn) for zero rendered benefit — recommend
   leaving it, or folding into the post-merge comment-trail cleanup if ever done. (LOW,
   cosmetic)
3. **Story-tier `transition:` shorthands** (headless-preview stories, docsite intro,
   ~15 lines). The longhand rule exists for library fidelity to Griffel's
   shorthand/longhand machinery; story styles have no such constraint. No action. (NOTE)
4. **Empty rules:** all justified. The multiline empties
   (CalendarDayGrid `.hover-style`/`.pressed-style`, AlphaSlider `.root`, StackShim
   `.disable-shrink`) each carry the D15.1/D16.1/D16.2 constraint comment ("do not delete
   because it looks empty"), matching the identity-only-root contract.
5. **Dead module locals:** scripted sweep over all 238 library modules found exactly one
   hook-unreferenced local: charts `ChartAnnotationLayer` `.annotation-no-defaults` —
   a documented fidelity carry of a dead Griffel slice (declared, never returned
   upstream), recorded in the module header, hook JSDoc, `charts-c6-c7.md`, and ledger.
   Not dead code by accident; kept so an upstream fix is a one-line re-point.
   (False positives from the sweep — `group`/`fui-`/`ms-` escape-artifacts and
   `presets.module.css` consumed from subdirectories — were verified referenced.)
6. **Debris:** 0 tracked `.scratch` files; 0 migration-added `console.log`
   (the 2 library `console.log`s predate the branch on master); no duplicated rule
   blocks in the sampled variant-heavy modules (Avatar's ~60 color classes each map to a
   distinct token — irreducible without changing emitted CSS; charts share base blocks
   via grouped selectors, e.g. `.annotation, .annotation-no-defaults`).

## 4. Cross-repo contract spot-check (docs vs code) — PASS

Five contract clauses verified against code (samples + full-surface greps): marker
second-position invariant (§3b/D16.2), repeated layer statement (D2), kebab locals
(D15.2), shared focus-visible variants (no raw attribute selectors), `:global` restricted
to marker/icon patterns (D16.3/D2a5). No clause-vs-code discrepancy found. The
CONVERSION_GUIDE's named worked examples (Divider template, InfoButton unlayered-block
template, Button 6-pair scale-up) all match the shipped files.

## 5. Repo hygiene

- **fluentui working tree:** clean except known user files (`.gitignore`, `CLAUDE.md`,
  untracked `.claude/settings.json`, `graphify-out/`, `packages/graphify-out/` — the
  latter two untracked and deliberately NOT committed by this audit).
- **icons fork (`../fluentui-system-icons`):** 2 uncommitted modified files
  (`packages/react-icons/docs/build-transforms.md`, `packages/react-icons/metadata.json`)
  plus the untracked LOCAL-ONLY tarball `fluentui-react-icons-local.tgz`. The tarball is
  the expected D24 artifact; the two modified files should be committed or discarded in
  the fork before its `git push origin main` (closure §4 item 1). (REPORTED)
- **Large/generated:** largest added file is 530 KB
  (`metrics/perf-eval/variants/results/raw-all.json`, deliberate raw perf data under
  `migration/`); 4 small PNGs (8–16 KB) are icons-integration adjudication evidence in
  `validation/`; no binaries, tarballs, or node_modules paths tracked. 145 `.snap`
  changes — the serializer/statics regenerations, each batch-gated as pure class churn.
- **yarn.lock:** contains the expected LOCAL-ONLY
  `@fluentui/react-icons@file:../fluentui-system-icons/...tgz` resolution (revert
  procedure documented in closure §3). No other anomaly.
- **CHANGELOG/beachball:** 63 `change/*.json` files — intentional beachball entries for
  the converted packages (minor, with a uniform migration comment). The only
  CHANGELOG.md/json diffs are the S-H move of `react-conformance-griffel` into
  `deprecated/` (path rename, commit `71d6342693`).

## 6. Report/ledger coherence — closure claims re-verified

1. **Icon-line claim ("58 selector lines, 0 unlayered"):** raw grep over `*.module.css`
   returns 62 lines in 14 files; 4 are comment lines (TeachingPopoverTitle 1, MenuItem 2,
   MenuGridRow 1) → **58 selector lines, matching the claim.** Unlayered check: 0
   selector lines at column 0 (all sit inside indented `@layer` blocks; the closure's
   layer-brace walk was the stronger check — this audit's scan is consistent with it).
2. **Griffel-zero import grep:** survivors outside `deprecated/` are exactly the closure
   §2 list — 5 D11 VR story files in `apps/vr-tests-react-components` + 3 fixture-string
   files (eslint-plugin test, eslint-plugin-react-components spec/README). Identical, no
   drift since closure.
3. **Serializer absence:** `@griffel/jest-serializer` appears in no jest config, package
   manifest, or generator outside `deprecated/` — remaining mentions are yarn.lock (the
   deprecated packages' own devDeps), migration reports/ledger, and untracked
   graphify-out.

## 7. Verdict

**Consistent: yes, to an unusually high standard.** The library tier shows zero dialect
drift across all eras on every mechanically checkable clause (238 modules, 227 hooks),
and the deviations that exist (wrapper-hook immutable shape, unlayered icon blocks in
their day, story-tier shims/casing) are each governed by a written rule with in-file
constraint comments — the codebase explains itself at every point where it deviates from
the naive form.

**As simple as possible: yes, within the campaign's recorded constraints.** The
apparent complexity (repeated layer headers, identity-only empty rules, comment trails,
dead-slice carries, two hook shapes) is all load-bearing or explicitly deferred
simplification with a written landing plan, not over-engineering. Nothing found that a
zero-risk mechanical fix could simplify further.

**Systemic follow-ups (already planned, restated for visibility):**

1. **D14 mutation-removal sweep** (phase3-worklist Batch F) — collapses the 150/26 hook
   split into one shape; the largest remaining simplification.
2. **Post-merge comment-trail cleanup** (S-I ruling: citations stay until the PR lands) —
   removes the per-rule Griffel citations; optionally fold story-local casing
   normalization into the same pass if ever desired.
3. **Icons-fork tidy-up** — commit/discard the 2 modified files before the upstream push.
