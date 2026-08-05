# Review fixes — external review of PR microsoft/fluentui#36513

Per-item verification + fix log. Each section records the verification verdict with
evidence, the fix, and the gate results. Zero-tolerance VR protocol per
`validation/README.md` (fresh `--skip-nx-cache` builds both legs, staleness guard,
`--maxDiffPixels 0`).

## Item 11 — Pie.tsx `wrapTextInsideDonut` document-wide (MEDIUM) — CONFIRMED, fixed

Commit: `a50ef4522c` (shared with item 10). Date: 2026-08-05.

### Verification

- **Document-global: CONFIRMED.** `wrapTextInsideDonut` (utilities.ts) did
  `d3SelectAll(`.${selectorClass}`)` — document scope. `Pie.tsx:29` passed
  `pieInsideDonutStringClassName`, the CSS-module local shared by every Pie instance, so
  mounting one Pie re-wrapped the center text of EVERY mounted DonutChart with the
  mounting Pie's `maxWidth = innerRadius * 2 − TEXT_PADDING`. Empirically demonstrated:
  the new multi-donut jest test run against the pre-fix code fails exactly there —
  chart A (innerRadius 60, single-line value) ends up with 3 tspans after chart B
  (innerRadius 35) mounts.
- **Pre-migration behavior:** dead code. Under Griffel the argument was a multi-token
  `mergeClasses` composition interpolated into `` `.${selectorClass}` ``, producing a
  descendant chain matching nothing — no wrapping ever ran in v9 (ledger react-charts
  notes; commit `a160a27eab`). ANY wrapping is post-migration behavior.
- **C1 intent (on record, `a160a27eab`):** "C1's conversion accidentally revived it
  (pixel-neutral — text fits one line). Export the single module local and pass it
  directly so the revival is robust, not accidental." The revival decision is
  deliberate and stands — nothing in it endorses cross-instance scope, which is an
  accident of `selectAll`'s default document scope inherited from v8. Scoping to the
  owning chart preserves the C1 intent (wrapping live) and is pixel-identical for
  single-chart rendering (a scoped selection resolves to the same element the
  document-wide one matched when only one donut exists).
- **Stale-effect claim: CONFIRMED.** Effect deps were `[]` — radius/value changes never
  re-wrapped. Worse, a `valueInsideDonut` change was silently LOST: the wrap replaces
  React's text child with tspans (`text.text(null)`), so React's later `commitTextUpdate`
  wrote to a detached text node.

### Fix

- `utilities.ts` — `wrapTextInsideDonut(selectorClass, maxWidth, root?: Element | null)`:
  `undefined` = legacy document-wide `selectAll` (back-compat for external callers),
  `null` = no-op ("no node yet"), Element = `d3Select(root).selectAll(...)`.
- `Pie.tsx` — passes its own `<g>` via a new ref; effect deps
  `[props.innerRadius, props.valueInsideDonut]`; the now-unused file-top
  `react-hooks/exhaustive-deps` disable removed; `<text>` keyed by
  `value-inside-donut-${props.valueInsideDonut}` so a value change recreates the node
  d3 had rewritten (fixes the detached-text-node swallow above).

### Gates

- New tests: `Pie.test.tsx` multi-donut behavior test (two DonutCharts, different radii
  — each keeps its own wrap; FAILS pre-fix, passes post-fix);
  `UtilityUnitTests.test.ts` scoped-wrap unit test (root-scoped call wraps inside the
  root only, `null` no-ops, outside text byte-identical).
- `charts-donutchart` VR set 3/3 pixel-clean at zero tolerance (see the combined VR
  table under item 10 — all 19 sets were re-run because item 10 touches
  CartesianChart, which underlies them).
- Full react-charts jest: 917 passed / 86 skipped / 1003 = exact 912/86/998 baseline
  plus the 5 new tests; 321/321 snapshots pass untouched (zero churn).

## Item 10 — CartesianChart axis measurement document-global (MEDIUM) — CONFIRMED, fixed

Commit: `a50ef4522c` (shared with item 11). Date: 2026-08-05.

### Verification

- **CONFIRMED.** `calculateLongestLabelWidth` (utilities.ts) resolved its font-probe
  selector via `document.querySelector(query)` — first match in the DOCUMENT. Five
  CartesianChart call sites feed margins/tick math from it: `CartesianChart.tsx:173`
  (y-axis, `.${cartesianYAxisClassName} text` → `startFromX` → `margins.left`) and four
  x-axis sites in `_calcMaxLabelWidthWithTransform`
  (`CARTESIAN_XAXIS_TEXT_SELECTOR` → rotation/truncation/wrap label-space and
  `hideTickOverlap` tick-count suppression). Both selector tokens are shared by every
  CartesianChart instance (hashed module local / retained identity literal), so with
  multiple charts every chart measured the FIRST chart's axis typography.
- **Pre-migration behavior:** all five sites were dead selectors under Griffel
  (multi-token `mergeClasses` interpolation → descendant chain matching nothing →
  hardcoded `600 10px "Segoe UI"` fallback; documented in the file's own conversion
  comments and the ledger note "CartesianChart same latent dead selector"). The
  migration deliberately revived the measurement (C2 — margins sized from the painted
  font); the DOCUMENT-GLOBAL resolution scope is the unintended part. The reviewer's
  framing is confirmed with one nuance: pre-migration the selector matched nothing at
  all (fallback font), it was not per-instance-correct — so the migration did not
  _break_ correct scoping, it revived a measurement into an incorrectly-scoped query.
- Note: `getTextSize`/`createWrapOfXLabels` (the other half of x-axis wrapping) already
  accept a `container` and were not flagged; unchanged.

### Fix

- `utilities.ts` — `calculateLongestLabelWidth(labels, query, container?: HTMLElement | null)`:
  `undefined` = legacy document scope (external callers — VBC/GVBC/VSBC pass no query at
  all and are unaffected), `null` = no scope yet → fallback font, element = scoped
  `container.querySelector`.
- `CartesianChart.tsx` — all five sites pass `chartContainer.current`. The y-axis site
  runs from effects (ref always attached). The x-axis sites run during render: on the
  FIRST render the ref is `null` → fallback font, which is exactly what the unscoped
  query yielded then too (the chart's own axis DOM did not exist yet to be matched) —
  single-chart rendering is pixel-identical by construction, and re-renders measure the
  chart's OWN axis.

### Gates

- New tests (`UtilityUnitTests.test.ts`, "calculateLongestLabelWidth container
  scoping"): two chart containers with different inline axis fonts (30px chart FIRST in
  document order, 20px second); scoped calls copy the PROVIDED container's font (20px /
  30px respectively), omitted container documents the legacy first-in-document behavior
  (30px), `null` yields the hardcoded fallback font.
- **VR: ALL 19 charts sets re-run — 187/187 pixel-clean at zero tolerance, zero pixel
  diffs.** Same set list, filters, and expects as the C7 full re-validation
  (`vr-c6c7-full.log`): annotationonlychart 6, areachart 9, chartannotationlayer 9,
  charttable 6, donutchart 3, funnelchart 12, gaugechart 12, groupedverticalbarchart
  12, heatmapchart 12, horizontalbarchart 11, horizontalbarchartwithaxis 12, legend 9,
  linechart 14, polarchart 12, sankeychart 12, scatterchart 9, sparklinechart 3,
  verticalbarchart 12, verticalstackedbarchart 12. Both legs fresh `--skip-nx-cache`
  builds, build logs checked for zero cache-replay lines, dist mtimes confirmed
  rewritten. Baseline captured from the pre-fix tree (fix stashed);
  candidate from the fixed tree.
- Full react-charts jest at baseline + 5 new tests (see item 11); lint 0 errors
  (438 → 439 warnings: the new test file's standard `import/no-extraneous-dependencies`
  shape carried by every test file in the package — net of removing Pie.tsx's stale
  disable); `nx run react-charts:type-check` clean.

### Cross-session note (both items)

A parallel session was fixing other review items in the same working tree during the VR
runs; the capture staleness guard tripped twice on its edits (dialog CSS, carousel CSS)
and each time the affected sets were re-captured after another fresh `--skip-nx-cache`
rebuild — no capture was taken from a stale bundle (the only
`--baseline-from-current-bundle` use was the sanctioned baseline-leg exception, sourcing
the already-verified pre-fix bundle). The parallel deltas never touched
`packages/charts` sources; with 187/187 clean pairs, attribution questions are moot —
both the parallel deltas and this fix are proven pixel-inert for every charts story.

## Item 3 — Breaking changes queued as minor (HIGH) — CONFIRMED, fixed

Commits: `eae2756306` (entry flips, 1/2), `9b59224287` (gate lifts, 2/2). Date: 2026-08-05.

### Verification

- 63 change files on the branch vs master: 60 `minor`, 1 `patch`, 1 `none`, 1 `prerelease`.
  57 of the minors carried the standard migration comment (BEM statics removal + stylesheet
  contract — breaking); the umbrella entry additionally covers the D19 Griffel re-export
  removal. Two changed packages with breaking surface had NO entry at all: react-charts
  (full migration) and react-tabster (`createFocusOutlineStyle` /
  `createCustomFocusIndicatorStyle` + 4 option types DELETED from the public index).
- Beachball gating: repo config (`scripts/beachball/base.config.json`) disallows `major`;
  per-package `beachball.disallowedChangeTypes` fully overrides repo config
  (beachball `getCombinedPackageOptions` — `{...default, ...repo, ...package, ...cli}`,
  and `getDisallowedChangeTypes` reads only `combinedOptions`). Verified in
  `node_modules/beachball/lib/options/getPackageOptions.js`.
- Repo precedent for `"type": "major"`: `@fluentui/react-breadcrumb-preview` change entry
  ("BREAKING CHANGE: Removed non-interactive item and `slash` divider", commit
  `d518c2850d`) — major type used when the package-level config permits it,
  `dependentChangeType: patch`.
- Branch's own release intent: DECISIONS.md D16/D19/D23 repeatedly scope the migration as
  "this migration's breaking change" / "same major as D16".

### Mapping decision

- **major**: all 54 stable (>=9.x) packages whose entry documents the migration — the 53
  standard component/compat entries plus the umbrella `@fluentui/react-components` — plus
  new major entries for `@fluentui/react-charts` (9.3.22) and `@fluentui/react-tabster`
  (9.26.16, deleted exports). `dependentChangeType` stays `patch` (breadcrumb-preview
  precedent).
- **minor kept** (0.x semver — minor is the breaking-capable bump; major gate NOT lifted):
  react-calendar-compat 0.4.4, react-datepicker-compat 0.6.34, react-menu-grid-preview
  0.5.3, react-timepicker-compat 0.4.36. Also kept minor as genuinely additive:
  react-conformance 0.20.1 (new tests + `getTargetElement`), react-utilities 9.26.5
  (`fuiSelector` addition).
- **Gate lifts** (56 manifests): removed `"major"` from `beachball.disallowedChangeTypes`
  in exactly the packages above — `["major","prerelease"]` / `["prerelease","major"]` to
  `["prerelease"]`; bare `["major"]` (react-components, react-card, react-migration-v8-v9,
  react-positioning, react-table) to `[]`. Repo-level gate untouched, so every other
  package still cannot queue a major.

### Gate

`yarn check:change` (beachball check): green — "No change files are needed", change
type validation OK against the lifted gates (re-run post-commit).

## Items 4 + 19 — Dependency floors for newly-added sibling behavior (HIGH) — CONFIRMED; mechanism-fix + missing entry

Commit: `9143d113d2` (react-shared-contexts entry; part of the missing-entries commit).

### Verification of the mechanism

- **#4 crash path CONFIRMED**: converted components thread state through the hook —
  `Button.tsx:19` `state = useCustomStyleHook_unstable('useButtonStyles_unstable')(state)`.
  The normalizing implementation lives ONLY on this branch:
  `react-shared-contexts/library/src/CustomStyleHooksContext/CustomStyleHooksContext.ts`
  now returns `<TState>(state) => customStyleHook?.(state) ?? state` (old published
  9.26.2: `?? noop`, returns `undefined`, so `state = undefined` and render crashes).
  Consumers declare `^9.26.2` (e.g. react-button/library/package.json).
- **#19 CONFIRMED**: `fuiSelector` is a NEW react-utilities export (branch diff of
  `react-utilities/src/index.ts`; also new: `useCssVarValue`). 58 packages import
  `fuiSelector` (react-tree included); react-table imports `useCssVarValue`. All declare
  `@fluentui/react-utilities ^9.26.5`, which predates both.

### Repo mechanism (why floors are NOT hand-edited)

- beachball `bumpDeps` defaults to `true` (`getDefaultOptions.js:12`); no repo/release
  config overrides it (checked base.config.json, shared.config.ts, release-vNext).
- At publish, `setDependentVersions` rewrites every in-repo dependent's
  dependencies/devDependencies/peerDependencies range to the newly published floor
  (`bumpMinSemverRange`). Concrete evidence from the latest release commit `4aa1084999`
  ("release: applying package updates - react-components", 2026-07-15): react-charts'
  manifest range `@fluentui/react-overflow` `^9.9.0` to `^9.9.1`.
- Therefore: with react-utilities and react-shared-contexts queued in the SAME release as
  their consumers, every published consumer manifest gets floor `^9.27.0` (next minor)
  automatically — a partial upgrade cannot resolve the old implementation.
- **The actual gap was #4's missing change file**: react-shared-contexts had NO beachball
  entry, so the normalizing implementation would never have published at all (and no
  floor bump would occur). Fixed by adding the minor entry
  (`change/@fluentui-react-shared-contexts-acd616a5-*.json`). react-utilities already had
  its minor entry, so #19 was already release-correct; documented here.

### Gate

`yarn check:change` green (entry validates; shared-contexts gate `["major","prerelease"]`
allows minor).

## Item 6 — tsconfig.cy/spec missing static-assets types (HIGH) — CONFIRMED, fixed

Commit: `6ddf01b255`.

- Sweep basis: every `tsconfig.cy.json` / `tsconfig.spec.json` overriding
  `compilerOptions.types` without `static-assets` in a package that ships `*.module.css`.
  Precedents followed: react-positioning spec fix (`5e1a928581`, adds `static-assets` to
  `types`) and react-card cy fix (also re-lists `../../../../typings` in `typeRoots`,
  because cy configs REPLACE the base `typeRoots` that contains `./typings`).
- Fixed 14 cy configs (avatar, breadcrumb, color-picker, combobox, drawer,
  menu-grid-preview, menu, message-bar, positioning, tag-picker, tags, teaching-popover,
  toolbar, tree) and 15 spec configs (breadcrumb, calendar-compat, color-picker, combobox,
  drawer, field, menu-grid-preview, menu, nav, radio, rating, slider, switch, tabs,
  tag-picker).
- Deliberately untouched: react-dialog + react-carousel (owned by the concurrent
  review-fix agent — their cy configs still need the same treatment if not already done
  in that workstream); packages with zero `*.module.css` (react-aria, react-motion,
  react-headless-components-preview, etc.).
- Gate: `nx run react-menu:type-check` and `nx run react-color-picker:type-check` green;
  the target solution-builds `tsconfig.lib/spec/cy` via the package tsconfig `references`.

## Item 7 — Cypress + perf bundles omit the theme entry (HIGH) — CONFIRMED, fixed

Commit: `a79fd72734`.

- Mirrored the storybook wiring (`b0ed9dd7c5`): the single theme emission is
  `scripts/storybook/src/tailwind-theme.css` (emits `--base-scale`, token registration,
  `--spacing-thin/...` stroke widths; `source(none)` so nothing else).
- Cypress (`scripts/cypress/src/base.config.ts`): new `tailwindThemeRule`
  (filename-matched include + `@tailwindcss/postcss` pass, same shape as
  `rules.tailwindThemeRule`); plain `cssRule` now excludes the entry; the entry is
  imported once per spec document from `scripts/cypress/src/support/component.js`.
- Perf (`apps/perf-test-react-components/webpack.config.js`): `rules.tailwindThemeEntry`
  prepended to `entry`, `rules.tailwindThemeRule` added, plain cssRule excludes the entry.
- Evidence:
  - Probe spec (temporary, not committed) in react-menu: mounted `MenuList`/`MenuItem`,
    asserted `--base-scale` non-empty at `:root` and `min-h-32` computes to **`32px`**
    (the review's failure mode is 0px/invalid). 1/1 green.
  - Real spec `MenuList.cy.tsx`: 5/5 green.
  - Perf bundle (`yarn bundle`) output `dist/perf-test.js` now contains the theme
    emission: `--base-scale: calc(1rem / 16px)` registration, `--spacing-thin`, and the
    `@layer fui.*` order declaration.

## Item 8 — export-to-sandbox scaffold lacks CSS-module typings (MEDIUM) — CONFIRMED, fixed

Commit: `cbed108639`.

- Fix: the generated scaffolds now emit the standard ambient declaration file each
  toolchain ships — Vite: `src/vite-env.d.ts` (`/// <reference types="vite/client" />`,
  which declares `*.module.css`); CRA: `src/react-app-env.d.ts`
  (`/// <reference types="react-scripts" />`). `sandbox-scaffold.ts` scaffold maps +
  helper getters.
- Verification (what was run): generated a real Vite sandbox via the scaffold API for a
  story importing `./probe.module.css` (with `cssModuleSources`), wrote it to
  `.scratch/sandbox-probe/`, ran the repo's `tsc -p tsconfig.json --noEmit` against it —
  no TS2307 (only the probe story's own unrelated TS6133). Negative control: deleting
  `src/vite-env.d.ts` reproduces
  `TS2307: Cannot find module './styles/probe.module.css'`. Addon jest suite 54/54 green
  (5 inline snapshots updated).

## Item 13 — Umbrella promises ./styles.css but doesn't export it (MEDIUM) — CONFIRMED; contract corrected in change entries

Commit: `39dc0afa76`.

- Documented contract (docsite QuickStart.mdx, the shipped consumer guidance): import
  `@fluentui/react-tailwind-theme/styles.css` once at the document root; "You never
  import a component stylesheet yourself — importing the component brings its CSS with
  it". Mechanism verified in built output: the generated `*.module.css.js` shim
  side-effect imports `../../../dist/styles.css` (ESM only, survives tree-shaking via
  `sideEffects: ["**/*.css"]`); SSR/CommonJS consumers use each package's `./styles.css`
  export subpath.
- **Decision: correct the change entries, not add an umbrella aggregate.** Rationale: no
  shipped doc anywhere promises `@fluentui/react-components/styles.css` (repo-wide grep —
  the only occurrence was the change entry itself); an aggregate would duplicate CSS that
  the side-effect imports already load and contradict the documented model; the umbrella
  has `sideEffects: false` and no dist CSS pipeline.
- Applied: umbrella entry rewritten (now also names the 12 removed `@griffel/react`
  re-exports + 3 types per D19, and states the real stylesheet contract); the false
  "(the @fluentui/react-components umbrella re-exports it)" parenthetical replaced in all
  57 per-package entries + the charts entry with the real three-part contract.
- Smoke: `require.resolve` green for `@fluentui/react-button/styles.css`,
  `@fluentui/react-menu/styles.css`, `@fluentui/react-tailwind-theme/styles.css`;
  `@fluentui/react-components/styles.css` fails `ERR_PACKAGE_PATH_NOT_EXPORTED` and is no
  longer promised anywhere. beachball check green.

## Item 14 — react-icons-compat missing beachball entry (MEDIUM) — CONFIRMED, fixed

Commit: `9143d113d2`.

- Baseline `beachball check` was RED: 10 changed packages without entries
  (react-icons-compat among them, exactly as the review predicted). Added
  `@fluentui/react-icons-compat` patch entry (dropped `@griffel/react` dependency; 0.2.21,
  gate `["major","prerelease"]` — patch valid). The same commit adds the other 9 missing
  entries: react-shared-contexts (minor, item 4), react-storybook-addon (minor,
  styles/docs-chrome split), react-theme (patch, README), and `none` entries for the four
  frozen deprecated packages (react-alert, react-infobutton, react-virtualizer,
  react-conformance-griffel — beachball freeze `major/minor/patch`, published history
  untouched per D23).
- Gate: `yarn check:change` green.

## Item 16 — storybook-addon README stale (MEDIUM) — CONFIRMED, fixed

Commit: `23ae3aaf78`.

- Verified exports in `react-storybook-addon/package.json`: both
  `"./styles.css": "./dist/styles.css"` and `"./docs-chrome.css": "./dist/docs-chrome.css"`
  exist; `src/docs-chrome.css` header documents the rename (old `styles.css` docs chrome
  moved to `docs-chrome.css`; `styles.css` = aggregated CSS-Module component styles, same
  contract as every converted package). In-repo `.storybook/preview.js` imports the
  docs-chrome source directly.
- README "Shared Storybook Preview Styles" now instructs importing BOTH subpaths and
  carries a migration note for consumers who imported only `styles.css`.
