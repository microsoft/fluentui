# Charts batch C6+C7 — ChartAnnotationLayer conversion + react-charts plumbing (package Griffel-ZERO)

Date: 2026-07-30. Branch `styling/tailwind-css-modules`. Final react-charts batch: C6
converts the package's LAST `@griffel` consumer, C7 removes the Griffel plumbing and
lands the deferred D2a5 layer promotions. C5 (`4cddd61c87`, report `charts-c5.md`) was
the template. Commits: **12f6bcd714** (C6); C7 is the commit carrying this report.

## C6 — ChartAnnotationLayer converted (full contract in one pass)

| Component            | Module                            | Hook                            | Notes                                                                                                                                                                                                                                                                                                                                                          |
| -------------------- | --------------------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ChartAnnotationLayer | `ChartAnnotationLayer.module.css` | `useChartAnnotationLayerStyles` | 10 locals, ALL l1 (every classed element — layer root div, connector svg, foreignObjects, annotation/measurement divs, connector `<g>` — is the component's own); marker `group/fui-chart-annotation-layer` on `root`; `props.className` (live: CartesianChart hands `classes.annotationLayer` through it) + all `props.styles?.*` per-slot channels preserved |

- Statics narrowed to `{ root: marker }` with the @deprecated-for-styling JSDoc
  (`chartAnnotationLayerClassNames`; `@internal`, zero external references, not in the
  api.md as a constant). The `SlotClassNames` import went with it.
- The non-Griffel surface of `useChartAnnotationLayer.styles.ts` is UNCHANGED:
  `DEFAULT_*` constants, `applyOpacityToColor`, `getDefaultAnnotationBackgroundColor`,
  `getDefaultConnectorStrokeColor` (the latter two keep the `tokens` import — runtime
  JS color computation, not styling slices).
- `ChartAnnotationLayer.tsx`: `mergeClasses` → `clsx` at all 5 call sites, import swap
  only — no structural change.
- Shared-base expression: the Griffel source spread one `annotationBaseStyles` object
  (typographyStyles.caption1 + layout/padding/color) into `annotation` and
  `annotationNoDefaults`; expressed as a two-class selector list (PolarChart `gridLine`
  precedent) + an `.annotation`-only chrome block (shadow16 + 1px neutralStroke1 border,
  shorthands kept — no longhand contention).
- In-file order is load-bearing once: `.annotation-content-interactive` /
  `.annotation-foreign-object-interactive` (`pointer-events: auto`) declared AFTER their
  `none` counterparts — mergeClasses last-argument winner reproduced by file position
  (D2a3).
- RTL: two `[ltr, rtl]` compiled pairs, both inert, carried faithfully — root
  `left:0`+`right:0` symmetric → physical `inset-0`; connectorLayer `left:0` only →
  `start-0` (exact flip). Padding 4px/8px → `py-vertical-xs px-horizontal-s` (D4 steps).
  No HighContrastSelector anywhere — nothing to narrow. Zero `fui-Icon-*` /
  `:global(.fui-*)` hits in the module.

### Fidelity adjudication (the one non-mechanical call)

**`annotationNoDefaults` is a DEAD SLICE and stays dead.** The Griffel hook _declared_
the slice and the `ChartAnnotationLayerStyles` interface declares the key, but the hook's
return object NEVER composed it — `classes.annotationNoDefaults` was always `undefined`,
so under `hideDefaultStyles` (AnnotationOnlyChart's path) an annotation renders with NO
base styling (no caption1 typography, no flex centering, no padding), and
`props.styles?.annotationNoDefaults` was equally dead. Verified in the compiled
`lib-commonjs/.../useChartAnnotationLayer.styles.js` (9 returned keys, no
`annotationNoDefaults`). Returning the module class would have silently restyled every
`hideDefaultStyles` consumer, so the converted hook omits the key exactly as Griffel did
(VSBC upstream-bug precedent); the compiled slice is carried as an unreferenced
`.annotation-no-defaults` local so an upstream fix is a one-line re-point. The
HideDefaultStyles VR stories pin this behaviour (baselines pre-conversion, 0 diff).

## C7 — plumbing

- **`@griffel/react` REMOVED from `package.json` dependencies.** Precondition verified:
  zero `@griffel` matches under `packages/charts/react-charts` src after C6; post-build,
  the only `@griffel` string anywhere under the package is `@griffel/jest-serializer` in
  `jest.config.js` (below — resolves from the ROOT package.json devDeps, not this
  package's) plus a JSDoc mention in rebuilt lib output. Validation: ESLint
  (`import/no-extraneous-dependencies` active over the suites) + type-check + fresh
  build all green after removal; no yarn.lock change (react-popover `20d6774d53`
  precedent — the dep remains in the workspace via other packages). The package opts out
  of syncpack (`"syncpack": {"dependencyTypes": []}`), so no syncpack step applies.
- **`@griffel/jest-serializer` STAYS — probed, NOT inert.** Method per the batch spec:
  full jest before removal (912/86/998, 321/321 snapshots) → remove → full jest again →
  **1 snapshot FAILED**: GaugeChart "Should re-render the Gauge chart with data" gained
  `class="___9ctc0p0_1xvj9ao f1w7gpdv fez10in f1dd5bof"` on an icon `<svg>` —
  `@fluentui/react-icons` Griffel atomics (`f1w7gpdv` is the `bundleIcon`
  `display:inline` atomic from the D2a5 record), mounted transitively. react-icons is
  PERMANENTLY Griffel (D11), so Griffel classes CAN appear in these snapshots and the
  serializer is load-bearing. Restored verbatim (config value byte-identical to
  pre-batch); the config comment now documents the probe so nobody re-litigates it. The
  d3 `moduleNameMapper` block was never touched.
- **Zero `*.styles.raw.js` from a fresh `nx run react-charts:build --skip-nx-cache`**:
  0 "Processing griffel AOT" lines, 0 raw.js/raw.js.map files under lib/lib-commonjs
  (2 stale pairs from the previous build are gone). No package-local AOT wiring existed
  to remove — the AOT step lives in the SHARED workspace-plugin build executor and
  self-gates on `@griffel` imports (now zero), so nothing repo-shared was touched.
- **D2a5 promotions (the deferred transitional blocks), both under the full VR gate:**
  - `ResponsiveContainer.module.css`: `.root`/`.chart-wrapper`/`.chart` moved from
    UNLAYERED into `@layer fui.components.l2` (C5 confirmed SankeyChart was the last
    wrapped chart with unlayered root atomics; every subject element now takes its
    slices from l1 modules, which l2 beats — the old last-argument winner preserved).
  - `CartesianChart.module.css`: `.annotation-layer` (subject: ChartAnnotationLayer's
    root, the owner converted in C6) moved from UNLAYERED into `@layer
fui.components.l2` per the D2a5 return rule. Verified in `dist/styles.css`: both
    blocks sit inside `@layer fui.components.l2`.
- **AOT metric context**: `metrics/phase4` recorded 4 AOT packages (react-infobutton 2
  files, react-alert 1, react-virtualizer 3, react-charts 24). react-charts is now 0 →
  **3 AOT packages remain** as of that snapshot (noted in ledger; whole-repo metrics NOT
  re-run — batch-scoped).

## VR evidence (all zero tolerance, fresh --skip-nx-cache builds every leg, 0 cache-replay lines)

New coverage added BEFORE conversion (D17): `charts-chartannotationlayer`, 9 baselines —
Default (default chrome + `<b>/<i>/<br/>` markup + pixel anchor) / Connectors (end,
start+dash, both+custom stroke) / HideDefaultStyles (style channels: background,
border+rotation, typography+opacity) × base/RTL/DarkMode. Deterministic
relative/pixel coordinates only (no data scales, no dates — machine-TZ rule). Baselines
captured from the pre-conversion bundle (built 17:24 PT), visually verified (annotation
chrome, arrows, dash, rotation all present); C6 candidates from the post-conversion
bundle (17:32 PT): **9/9 clean.**

After C7 (dep removal + serializer probe + D2a5 promotions), ALL 19 `charts-*` sets
re-validated against a fresh post-plumbing bundle (17:39 PT): **187/187 clean, zero
retries** —

| Set                               | Pairs | Result |
| --------------------------------- | ----- | ------ |
| charts-annotationonlychart        | 6     | PASS   |
| charts-areachart                  | 9     | PASS   |
| charts-chartannotationlayer       | 9     | PASS   |
| charts-charttable                 | 6     | PASS   |
| charts-donutchart                 | 3     | PASS   |
| charts-funnelchart                | 12    | PASS   |
| charts-gaugechart                 | 12    | PASS   |
| charts-groupedverticalbarchart    | 12    | PASS   |
| charts-heatmapchart               | 12    | PASS   |
| charts-horizontalbarchart         | 11    | PASS   |
| charts-horizontalbarchartwithaxis | 12    | PASS   |
| charts-legend                     | 9     | PASS   |
| charts-linechart                  | 14    | PASS   |
| charts-polarchart                 | 12    | PASS   |
| charts-sankeychart                | 12    | PASS   |
| charts-scatterchart               | 9     | PASS   |
| charts-sparklinechart             | 3     | PASS   |
| charts-verticalbarchart           | 12    | PASS   |
| charts-verticalstackedbarchart    | 12    | PASS   |

(Charts sources live outside capture.mjs's `packages/react-components` staleness walk,
so the guard was supplemented the C3–C5 way: every leg built `--skip-nx-cache`, log
checked for zero cache-replay lines, `dist/storybook` mtimes confirmed rewritten.)

## Jest

`node node_modules/jest/bin/jest.js` in `packages/charts/react-charts/library`, four
runs, all **912 passed / 86 skipped / 998 = exact pre-batch baseline**:

1. C6 `-u --ci`: 2 snapshots updated in 1 suite (AnnotationOnlyChart — the only suite
   whose snapshots contain the layer's DOM). Script-verified pure class churn (C4/C5
   normalized method: class attributes normalized away, whole-line class attrs dropped):
   271 normalized lines, **0 non-class diffs**. Shape is the expected D16.8 one:
   `fui-chartAnnotationLayer__root` → `group/fui-chart-annotation-layer` on the root
   (serializer strips the leading `fuicm-*` module class), sub-slots → `class=""`.
2. C7 pre-serializer-removal `--ci`: 321/321 snapshots pass.
3. C7 post-serializer-removal `--ci`: 1 snapshot FAILED (the react-icons delta above) →
   serializer restored.
4. Final state `--ci` (all C7 changes in): 321/321 pass.

No dependent-test seams this batch: repo-wide grep finds zero non-snapshot references to
the removed `fui-chartAnnotationLayer__*` statics anywhere (no test queried them; the
`data-chart-annotation*` attributes every existing query uses are untouched).

## Other gates

- Type-check: `nx run react-charts:type-check` clean (run after C6 and again after C7).
- ESLint: `nx run react-charts:lint --skip-nx-cache` **0 errors / 438 warnings — the
  exact pre-batch total** (C5 report figure), after C6 and again after C7; the converted
  hook/module/TSX emit ZERO warnings (all warnings are the pre-existing shapes:
  export-all on index files, extraneous-dev-deps on test imports, no-restricted-globals,
  2 unused-disable-directives present in both legs' logs).
- Fresh package build: `dist/styles.css` emits all 10 new
  `fuicm-chart-annotation-layer-*` locals (incl. the carried dead
  `annotation-no-defaults`); zero `fui-chartAnnotationLayer` strings in dist css; the
  D16.2 invariant holds in built JS (`clsx(styles.root, 'group/…', …)`).
- Repo-wide grep: zero `@griffel` imports under `packages/charts/react-charts` (the
  jest.config serializer string is the sole, documented, load-bearing `@griffel` text).

## Adjudications

1. **`annotationNoDefaults` dead slice** — carried dead, not revived (section above).
   Adjudicated from the compiled Griffel output, pinned by VR.
2. **Serializer removal reverted** — the batch spec's conditional ("if inert, remove")
   resolved to NOT INERT by the prescribed before/after jest proof; kept with the probe
   documented in the config comment.

No VR diffs to adjudicate anywhere in the batch (196 total pair-comparisons across both
legs, all clean first try).

## react-charts end state

**Griffel-ZERO.** 23/23 chart components on Tailwind + CSS Modules; `@griffel/react`
out of the dependency list; no AOT output; both D2a5 transitional blocks promoted to
`fui.components.l2`; the only remaining Griffel artifact is the jest snapshot serializer,
which guards against `@fluentui/react-icons` atomics (permanently Griffel, D11) in
transitively mounted glyphs.
