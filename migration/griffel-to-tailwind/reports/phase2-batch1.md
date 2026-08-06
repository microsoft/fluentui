# Phase 2, Batch 1 — 10 lowest-level packages

_Workflow wf_eaafc426-750, 2026-07-27. All 10 validated, 0 fix rounds; legacy VR (divider 31, button 129, family 342) clean._

---

## react-badge

### Verify

Step 1 (capture.mjs): "[capture] 36 screenshots in 61s" — matched --expect 36, no shortfall.

Step 2 (diff.mjs): exit code 0 (confirmed via explicit echo $? capture). Console: "[diff] 36 pairs, 36 clean, 0 failed, 0 missing, 0 extra" / "[diff] PASSED". summary.json (migration/griffel-to-tailwind/validation/candidate/react-badge-diff/summary.json): baseline=migration/griffel-to-tailwind/validation/baseline/react-badge, candidate=migration/griffel-to-tailwind/validation/candidate/react-badge, threshold=0.1, maxDiffPixels=0, pairs=36, identicalOrWithinTolerance=36, failed=[], missing=[], extra=[], passed=true. No failing names, no nonzero diffPixels.

Step 3 (yarn nx run react-badge:test): exit code 0. Jest: Test Suites 3 passed/3 total (CounterBadge.test.tsx, Badge.test.tsx, PresenceBadge.test.tsx), Tests 68 passed/68 total, Snapshots 3 passed/3 total, time 3.17s.

Step 4 (yarn nx run react-badge:build): exit code 0. Build log shows "Emitted dist/styles.css (18029 bytes)". Verified via Read that packages/react-components/react-badge/library/dist/styles.css exists and its first line is exactly:
"@layer fui.theme, fui.base, fui.components, fui.components.l1, fui.components.l2, fui.components.l3, fui.components.l4, fui.components.l5, fui.utilities;"
which begins with the required '@layer fui.theme,' prefix.

Note: no "[Fact-Forcing Gate]" GateGuard error was raised on the first Bash call or any subsequent Write/Edit — none of the steps in this task involved new-file Write or first-Edit, so that hook path was never triggered; the diff/test/build Bash calls also ran without any gate interception.

### Conversion report

## react-badge — converted, validated

**Files** (all absolute under `C:/Users/ArrayKnight/Code/fluentui/`):

- NEW `packages/react-components/react-badge/library/src/components/{Badge/Badge,CounterBadge/CounterBadge,PresenceBadge/PresenceBadge}.module.css`
- REWRITTEN the 3 matching `use<X>Styles.styles.ts`
- `packages/react-components/react-badge/library/{package.json,jest.config.js}`
- 3 `*.test.tsx` + 3 `__snapshots__/*.snap`
- `packages/react-components/react-tailwind-theme/css/variants.css` (catalog)

### Mapping tables (from compiled AOT `lib-commonjs/**/*.styles.js`, not source)

**Badge root** — args 1 static / 2 reset→`fui.base` / 3 `fontSmallToTiny` / 4 `[size]` / 5 `[shape]` / 6 `roundedSmallToTiny` / 7 `borderGhost` / 8 `[appearance]` / 9 `[appearance-color]` → all of 3–9 into `fui.components.l1` in that file order / 10 consumer unlayered.
**Badge icon** — 1 static / 2 reset→`fui.base` / 3 before|after(|XL) margins / 4 `[size]` font-size → l1, both selected _from the root_ (`data-empty` + `data-icon-position` + `data-size`), so the icon slot carries no attributes (react-button precedent).
**CounterBadge** — `dot`, `hide` → **`fui.components.l2`**.
**PresenceBadge** — 1 static / 2 reset→`fui.base` / 3–13 the eleven colour slices / 14–16 `tiny|large|extraLarge` → l1 in argument order.

Empty Griffel slices (`medium`, `circular`, `filled`, `ghost`, `tint`) emit no rule; `styles.*` stays `undefined` and clsx drops it.

### Inversions

1. **PresenceBadge arg 12 (the only true inversion).** Griffel applies `styles.statusOutOfOffice` **twice** — arg 7 and again at arg 12 — so mergeClasses re-ranks it above `outOfOffice` (arg 9). A CSS class holds one file position, so the re-application got its own rule `.outOfOfficeStatus` placed at the arg-12 slot. Verified across all 8 statuses × outOfOffice (16/16).
2. **CounterBadge `dot`/`hide` is altitude, not inversion.** They arrive _after_ `useBadgeStyles_unstable`'s output, so `dot` must beat Badge's `size` slices (`<CounterBadge dot size="large"/>` is 6×6, not 24×24) — l2 guarantees it; l1 would leave it to module load order.
3. Badge has **none**: the three conflict sets (font-size/line-height, border-radius, border-\*-color) all have argument order == file order.

### `!important` — DROPPED all 6 (brief said 7; the 7th grep hit is the comment on line 78)

Probe-measured in Chromium, not reasoned: (a) a layered normal `:where()`-flat rule already **beats the `<svg width="10">` presentation attribute** `createFluentIcon` emits, so rendering is unchanged; `@fluentui/react-icons` sets no width/height in CSS at all. (b) Keeping it would be a **regression** — `!important` reverses layer order, so layered `!important` beats a consumer's _unlayered_ `!important`. Dropping it retires the exact accepted-failure-mode D2 named for this file. **Behaviour change for the PR notes:** consumers no longer need `!important` to resize a presence icon.

### Validation

- `react-badge:test` **68/68 green**. 3 snapshots updated, diffs **purely additive `data-*`** (`data-size="medium"` ×3, plus `data-empty="true"` on the empty CounterBadge); class lists byte-identical.
- `react-badge:build` green. `dist/styles.css` = 18,029 B, **starts with the canonical `@layer` statement**. **0** dangling `.module.css` specifiers in lib/lib-commonjs (all repointed to `.module.css.js`); `*.styles.raw.js` gone; **0** `!important`; **0** `@griffel` imports in `src`.
- `react-badge:lint` **clean, 0 warnings**.
- **VR substitute** (brief forbids storybook rebuild/screenshots): two Chromium probes driving the **real built hooks** against the **real emitted CSS**, every token given a unique sentinel so a computed value identifies which token won — **53 cases / 106 assertions** and **25 RTL assertions, 0 failures**. Blind spots covered: `rounded`+`small|tiny`→`borderRadiusSmall` (and `square`+`small` correctly _not_), `ghost` hiding `::after`, `::after` inheriting outline border colour, icon margin with `children={0}`, XL icon spacing, CounterBadge `dot`+`large`, `hide`, all 16 presence colour combos, and svg sizing beating the presentation attribute.

### Deviations (all precedent-backed)

- **PresenceBadge `status`/`outOfOffice` ride module classes, not data-attributes** (D3 would suggest attributes). Their 11 slices resolve purely by argument order incl. the double-application; classes make that plain file order and keep the mapping 1:1. Attributes would push 5 bespoke compound selectors used by one component into the shared catalog.
- **`size-small-or-below` invented** — one variant instead of triplicating `smallToTiny`'s two slices.
- **Lint-directive split matches react-button exactly**: Badge/PresenceBadge call no hooks post-conversion so `react-hooks/immutability` no longer fires (disables removed, like Button/Divider); CounterBadge still calls `useBadgeStyles_unstable`, so it keeps its disables and takes plain `'use client';` with no suppression (like ToggleButton). **The D14 state-mutation pattern itself is fully preserved** — only dead lint suppressions changed.
- Kept `@griffel/jest-serializer` **alongside** the cssModules serializer: PresenceBadge renders `@fluentui/react-icons` glyphs and that package is external Griffel, out of scope per D11. Without it every snapshot gains atomic classes (caught in the first test run).
- Kept `@fluentui/react-theme` in deps despite zero imports (react-divider precedent); removed `@griffel/react`.
- px font-size/line-height literals → `calc(Npx * var(--base-scale))` per D4/react-button; identical pixels at the default 16px root.

### Open questions

1. `.outOfOffice` (arg 9) is overridden in **all 16** reachable combinations — dead in the Griffel source too. Reproduced verbatim; flag if the team wants it deleted.
2. The `!important` removal is a consumer-visible improvement, not a no-op — needs a PR line.
3. `graphify update .` **not run**: 160+ files were being modified concurrently by sibling workers, so a partial graph write would race. Suggest one update after the batch.
4. Probes live in the gitignored `.scratch/badge-probe/`. They are strong regression assets — worth promoting into `migration/griffel-to-tailwind/validation/` if the team wants them retained (I did not add files outside my brief).

---

## react-label

### Verify

1. capture.mjs: 17/17 screenshots captured in 28s to migration/griffel-to-tailwind/validation/candidate/react-label (17 PNGs + manifest.json).
2. diff.mjs: exit 0, PASSED. summary.json — pairs:17, identicalOrWithinTolerance:17, failed:[], missing:[], extra:[], maxDiffPixels:0, threshold:0.1, passed:true. No failing pair names; diffPixels 0 across all pairs.
3. yarn nx run react-label:test: exit 0. Test Suites: 1 passed/1 total. Tests: 21 passed/21 total (Label.test.tsx — renders default state, renders custom asterisk, full isConformant suite incl. exports-component, component-renders, component-has-displayname, component-handles-ref, component-has-root-ref, default classNames, component-handles-classname, component-preserves-default-classname, static classnames checks x3, name-matches-filename, exported-top-level, has-top-level-file, kebab-aria-attributes, consistent-callback-names/args, primary-slot-gets-native-props, classname-overrides-win). Snapshots: 2 passed/2 total. No failing test names.
4. yarn nx run react-label:build: exit 0. Emitted dist/styles.css (2197 bytes). Verified packages/react-components/react-label/library/dist/styles.css exists, is 2197 bytes, and begins with '@layer fui.theme,' (full first line: '@layer fui.theme, fui.base, fui.components, fui.components.l1, fui.components.l2, fui.components.l3, fui.components.l4, fui.components.l5, fui.utilities;').

### Conversion report

## react-label — converted

### Files changed

- **NEW** `C:/Users/ArrayKnight/Code/fluentui/packages/react-components/react-label/library/src/components/Label/Label.module.css`
- `.../src/components/Label/useLabelStyles.styles.ts` (rewritten: clsx + data-attributes)
- `.../src/components/Label/Label.test.tsx` (conformance wiring)
- `.../src/components/Label/__snapshots__/Label.test.tsx.snap` (updated)
- `.../library/package.json` (sideEffects, clsx, exports/files, devDep, imports)
- `.../library/jest.config.js` (css-modules mapper + serializer)

Untouched, as required: `Label.types.ts`, `useLabel.tsx`, `renderLabel.tsx`, `Label.tsx`, `src/testing/isConformant.ts`, `etc/react-label.api.md` (verified byte-identical after rebuild).

### Mapping table (mergeClasses ARGUMENT order → layer)

**root slot**

| #   | mergeClasses argument                       | → target                                                                       |
| --- | ------------------------------------------- | ------------------------------------------------------------------------------ |
| 1   | `labelClassNames.root`                      | static class (JS)                                                              |
| 2   | `useStyles.root`                            | `fui.components.l1` block 1 — `.root`                                          |
| 3   | `disabled && useStyles.disabled`            | `fui.components.l1` block 2 — `.root` `@variant disabled`                      |
| 4   | `useStyles[size]`                           | `fui.components.l1` block 3 — `@variant size-small/medium/large` (`data-size`) |
| 5   | `weight==='semibold' && useStyles.semibold` | `fui.components.l1` block 4 — `.semibold` module class                         |
| 6   | consumer `className`                        | unlayered (always wins)                                                        |

**required slot**

| #   | mergeClasses argument            | → target                                                      |
| --- | -------------------------------- | ------------------------------------------------------------- |
| 1   | `labelClassNames.required`       | static class (JS)                                             |
| 2   | `useStyles.required`             | `fui.components.l1` block 1 — `.required`                     |
| 3   | `disabled && useStyles.disabled` | `fui.components.l1` block 2 — `.required` `@variant disabled` |
| 4   | consumer `className`             | unlayered                                                     |

No `makeResetStyles` → nothing in `fui.base`. No composition over another component's hook → nothing in `fui.components.l2`.

### Inversions

**None.** Two candidates checked and cleared against the compiled AOT (`lib-commonjs/components/Label/useLabelStyles.styles.js`):

1. `useStyles.large` (arg #4) and `useStyles.semibold` (arg #5) both set `font-weight: var(--fontWeightSemibold)` and compile to the **same Griffel atomic `fl43uef`** — relative order cannot change a rendered value.
2. `useStyles.disabled` overrides `color` on _both_ slots and is arg #3 on each, i.e. after each slot's own base on both slots — so a single in-file position (block 2, after block 1) satisfies both slots' argument order simultaneously.

### RTL

Exactly one flip in the whole package — `uwmqm3: ["fruq291","f7x41pl"]` = `padding-left` / `padding-right` for `spacingHorizontalXS` on the required slot → **`padding-inline-start`** (property-level, logical property; no `@variant rtl` needed anywhere).

### Variant catalog

**Not extended** — every variant needed already existed in `react-tailwind-theme/css/variants.css`: `disabled`, `size-small`, `size-medium`, `size-large`, `forced-colors`.

Design note: `size` is a scale prop → `data-size` (D3, and `size-*` variants pre-existed). `weight` is a look prop → module class `.semibold`, which avoids inventing a `data-weight` name **and** preserves the source's rule-free `regular` default. `data-disabled` is stamped on **both** slots (rather than reaching the required span via a descendant selector) because the single Griffel `disabled` slice was applied per-slot; this keeps `.required` independent of DOM nesting and every selector `:where()`-flat.

### Snapshot review

2 snapshots, diff is **purely additive `data-*`**: `+ data-size="medium"` on the root of each. `class="fui-Label"` unchanged (serializer strips module classes), no DOM/class-order change. Updated after review. `data-disabled` correctly absent when `disabled` is false (`|| undefined`).

### Validation

- `yarn nx run react-label:test` — **green, 21/21** (was 19+2-snapshot-fail before update), incl. `extraTests › renders the consumer "className" last on the root slot (classname-overrides-win)`.
- `yarn nx run react-label:build --skip-nx-cache` — **green**, `🎨 Emitted dist/styles.css (2197 bytes)`, **no** API-signature warning.
- `dist/styles.css` line 1 = canonical statement verbatim: `@layer fui.theme, fui.base, fui.components, fui.components.l1, fui.components.l2, fui.components.l3, fui.components.l4, fui.components.l5, fui.utilities;`. Contains only component rules, zero theme emission.
- **Zero dangling `.module.css` specifiers.** Emitted `.js` specifiers are exactly `from './Label.module.css.js'` (ESM) and `require("./Label.module.css.js")` (CJS). Earlier grep hits were `.js.map` `sourcesContent` (embedded TS text) and comments only.
- `yarn nx run react-label:lint` — **green**.
- Prettier: my authored/edited files are **clean** (verified on LF-normalized copies). Raw `prettier --check` from repo root reports warnings for these _and_ 5 files I never touched (`Label.tsx`, `Label.types.ts`, `useLabel.tsx`, `renderLabel.tsx`, `index.ts`) — cause is CRLF in the working tree (`orig CRLF? true / fmt CRLF? false`), a pre-existing environment artifact, not this change.
- `@griffel` in `library/src`: only one occurrence, inside the explanatory comment in `Label.test.tsx` (same shape as react-button). `@griffel/react` removed from dependencies; `clsx@^2.1.1` added.
- No beachball change file added — consistent with the already-converted react-divider/react-button (`git status change/` clean).

### Blind-spot probes (VR not run, per brief)

VR stories (`apps/vr-tests-react-components/src/stories/Label.stories.tsx`) cover Root/Disabled/Required/Semibold/Small/Large/CustomRequired/Multiline + RTL/HC/dark variants, but **never combine** `disabled` with `required`, nor `size` with `weight` or `disabled`. Probed those with a temporary jest test that matched the **build-emitted selectors from `dist/styles.css`** (only the hashed class token rebound to jest's proxy name; the `:where(...)` conditions are the build's own text) against the rendered DOM. Probe file deleted after running.

| combo                          | rules applied                                                               | matches Griffel? |
| ------------------------------ | --------------------------------------------------------------------------- | ---------------- |
| `disabled+required`            | root.base, required.base, root.disabled, required.disabled, size.medium     | ✅               |
| `disabled+required+small`      | root.base, required.base, root.disabled, required.disabled, size.small      | ✅               |
| `large`+`weight=regular`       | root.base, size.large (no semibold class — large carries the weight itself) | ✅               |
| `small`+`weight=semibold`      | root.base, size.small, semibold                                             | ✅               |
| `large`+`disabled`             | root.base, root.disabled, size.large                                        | ✅               |
| default (VR: Root)             | root.base, size.medium                                                      | ✅               |
| `required` only (VR: Required) | root.base, required.base, size.medium                                       | ✅               |

Emitted selectors confirmed: `.root:where([disabled], [data-disabled], :disabled)`, `.required:where([disabled], [data-disabled], :disabled)`, `.root:where([data-size='small'])` etc. — all specificity-flat. The `disabled` blocks sit after the base blocks in `dist/styles.css`, so `colorNeutralForegroundDisabled` wins on both slots.

The `required` slot's `padding-inline-start` RTL path **is** VR-covered (CustomRequiredRTL, MultilineRTL).

### Deviations / open questions

1. **`graphify update .` not run.** Project CLAUDE.md asks for it after code changes, but sibling batch workers are converting other packages concurrently against the same `graphify-out/graph.json`; a single update by the orchestrator after the batch avoids concurrent-write corruption. Flagging for the orchestrator.
2. **Left `@fluentui/react-theme` in dependencies** even though `tokens` is no longer imported — matches the already-converted react-divider, which also kept it. Worth a batch-wide sweep rather than a per-package divergence.
3. **`.scratch/prettier-check/`** holds five LF-normalized copies used for the prettier verification. Not deleted (per the keep-scratch-until-confirmed rule); safe to wipe.
4. VR capture and storybook rebuild intentionally skipped per brief — VR remains outstanding for this package's definition-of-done.

---

## react-link

### Verify

Step 1 — capture.mjs: filter="Link Converged", expect=54. Captured 212 screenshots (>= 54 expect threshold) in 120s, exit 0. Output dir: migration/griffel-to-tailwind/validation/candidate/react-link (213 files incl. manifest.json).

Step 2 — diff.mjs (baseline vs candidate react-link): "[diff] 212 pairs, 212 clean, 0 failed, 0 missing, 0 extra" / "[diff] PASSED". summary.json: threshold=0.1, maxDiffPixels=0, pairs=212, identicalOrWithinTolerance=212, failed=[], missing=[], extra=[], passed=true. No failing names — vrPassed=true.

Step 3 — yarn nx run react-link:test: PASS react-link src/components/Link/Link.test.tsx. Test Suites: 1 passed/1 total. Tests: 44 passed/44 total. Snapshots: 2 passed/2 total. Time 1.831s. No failures — testsPassed=true.

Step 4 — yarn nx run react-link:build: succeeded (SWC compile es6 + commonjs, CSS Modules compiled 1 file, emitted dist/styles.css, 4156 bytes). Verified packages/react-components/react-link/library/dist/styles.css exists and its first line is exactly:
"@layer fui.theme, fui.base, fui.components, fui.components.l1, fui.components.l2, fui.components.l3, fui.components.l4, fui.components.l5, fui.utilities;"
which begins with the required "@layer fui.theme," — buildPassed=true.

All four steps completed in order, none skipped. No commits made, no yarn install run, no storybook rebuild or new screenshot captures beyond the requested capture.mjs call.

### Conversion report

## react-link — converted

### Files changed

- **NEW** `C:/Users/ArrayKnight/Code/fluentui/packages/react-components/react-link/library/src/components/Link/Link.module.css`
- `.../src/components/Link/useLinkStyles.styles.ts` (rewritten: clsx + data-attributes)
- `.../library/package.json` (sideEffects, clsx, exports./styles.css, files, imports.#theme, devDep react-tailwind-theme, dropped @griffel/react)
- `.../library/jest.config.js` (cssModules mapper + serializer, replacing @griffel/jest-serializer)
- `.../library/tsconfig.spec.json` (+"static-assets" types)
- `.../src/components/Link/Link.test.tsx` (conformance rewiring)
- `packages/react-components/react-tailwind-theme/css/variants.css` (2 catalog additions)

### Mapping table (mergeClasses ARGUMENT order → file position)

| #   | argument                                    | target                                                           |
| --- | ------------------------------------------- | ---------------------------------------------------------------- |
| 1   | `linkClassNames.root`                       | static class (JS)                                                |
| 2   | `styles.root`                               | l1 `.root` (base + `:focus-visible` + hover + active)            |
| 3   | `styles.focusIndicator`                     | l1 `.root` `@variant focus-visible-fui` — **hoisted, see below** |
| 4   | `root.as==='a' && root.href && styles.href` | l1 `.href`                                                       |
| 5   | `root.as==='button' && styles.button`       | l1 `.button`                                                     |
| 6   | `appearance==='subtle' && styles.subtle`    | l1 `.subtle`                                                     |
| 7   | `backgroundAppearance==='inverted'`         | l1 `.inverted`                                                   |
| 8   | `backgroundAppearance==='brand'`            | l1 `.brand`                                                      |
| 9   | `inline && styles.inline`                   | l1 `.root` `@variant inline` (data-inline)                       |
| 10  | `disabled && styles.disabled`               | l1 `.root` `@variant disabled` (data-disabled), **split in two** |
| 11  | consumer `className`                        | unlayered                                                        |

No `makeResetStyles` slice → `fui.base` unused; everything is `fui.components.l1`, so winners are pure file order. All emitted selectors verified specificity-flat (0,1,0).

### Inversions handled

1. **The documented one (risk-analysis §1a):** `disabled` declared L79 but applied #10; `inverted` L107 / `brand` L116 applied #7/#8; all set `color`. Disabled blocks written AFTER `.inverted`/`.brand` → disabled Links on inverted/brand backgrounds keep `colorNeutralForegroundDisabled`. Same treatment for `inline` (declared L75, applied #9) vs `disabled` on `text-decoration-line`.
2. **A second, undocumented cross-bucket inversion I found and handled — flag for the ledger.** Griffel resolves `focusIndicator` not by argument order but by bucket + specificity: `createCustomFocusIndicatorStyle` compiles to `[data-fui-focus-visible]` rules in the **default** bucket at 0-2-0, so they beat every base declaration (including `disabled`'s later-argument `text-decoration-line: none`) yet lose to the `:hover`/`:active` buckets emitted afterwards (also 0-2-0). Neither pure argument-order placement reproduces this: placing #3 at its argument position loses the focus underline on a `disabledFocusable` focused Link; placing it last wrongly keeps the underline on disabled hover/active. Fix: arg #10 is split into a base block and a `:hover`/`:active`/forced-colors block with #3 **between** them. `text-decoration-line` is the only property where these slices actually meet (every non-disabled slice agrees on `underline`), so this one hoist is exact. Reasoning is documented in the module header.
3. Forced-colors (`m` bucket) written last so `GrayText` beats the disabled `:hover`/`:active` colors, matching Griffel's bucket order.

### Data attributes + catalog

- `data-disabled` = `state.disabled` (already widened to `disabled || disabledFocusable` by `useLinkState_unstable`) — exactly the JS condition; matches the headless preview's own `useLink`. No `data-disabled-focusable` needed (nothing in the CSS distinguishes them, unlike Button).
- `data-inline` — new; follows the pilot's `data-inset` shape.
- `as`/`href` stay JS class lookups (`styles.href`, `styles.button`) — element-type conditions, not state, no attribute precedent.
- Catalog additions: `inline (&:where([data-inline]))`, `focus-visible (&:where(:focus-visible))` (Link's base slice authors a NATIVE `:focus-visible{outline-style:none}`, compiled as `.f2hkw1w:focus-visible` — deliberately distinct from `focus-visible-fui`). `active` was already added by a concurrent worker; I reused it rather than adding a duplicate. Verified zero duplicate `@custom-variant` names in the file afterwards.
- Not used: `fui-focus-outline`/`fui-focus-ring`. Link's indicator is a bespoke text-decoration payload (no ring, no `::after`), so the four declarations are transcribed directly — noted in the module.

### Snapshot review

`yarn nx run react-link:test` — **44 passed, 2 snapshots passed, zero snapshot changes** (no update needed). The two snapshots render a plain anchor and plain button; `data-disabled`/`data-inline` are `|| undefined` so React omits them there. `classname-overrides-win` passes; `make-styles-overrides-win` disabled with rationale.

### Blind-spot probe (VR cannot cover this)

Ran a temporary 108-row prop-matrix probe (3 render modes × 2 appearances × 3 backgroundAppearances × inline × {none, disabled, disabledFocusable}), then deleted it. All 108 rows correct. Notable finding, **not a regression**: on `as='a' + disabled`, `useLinkState` clears `href`, so `styles.href` (`font-size: inherit`) drops — identical before and after, since Griffel's arg #4 had the same `root.href &&` guard. `disabledFocusable` keeps `href` and therefore keeps the class. Class order is always `fui-Link, root, [href|button], [subtle], [inverted|brand]` = argument order.

### Build

`yarn nx run react-link:build` green. `dist/styles.css` = 4300 B, first line is the canonical `@layer fui.theme, fui.base, fui.components, fui.components.l1…l5, fui.utilities;`. Zero dangling `./Link.module.css` specifiers in `lib`/`lib-commonjs` (all repointed to the generated `Link.module.css.js`; ESM map carries the side-effect import, CJS deliberately does not). `useLinkStyles.styles.raw.js` is gone. All 33 compiled Griffel atomics accounted for in the emitted CSS, block order verified textually against the design.

### Lint

`yarn nx run react-link:lint` clean. Prettier clean on all 7 changed files — note the Edit tool rewrote three files (jest.config.js, tsconfig.spec.json, Link.test.tsx) as CRLF though HEAD had them LF; I normalised them back to LF before the final check. Worth watching on other packages in this batch.

### Deviations from the cookbook

- **Block order is not strictly argument order** for arg #3 and the arg #10 split — required for cascade fidelity (see inversion 2). Fully documented in the module header.
- `margin: 0` / `padding: 0` / `overflow: inherit` kept as shorthands rather than expanded: nothing in Link sets any of their longhands, so no Griffel shorthand-priority behaviour remains to reproduce. `shorthands.borderStyle('none')` IS expanded to four physical longhands (its [ltr,rtl] pair only swaps left↔right with the same `none` value, so physical is exact — same call the Divider/Button precedents make for `borderColor`).
- `display: inline` written longhand instead of `@apply inline` to avoid reader confusion with the new `inline` variant name.
- `appearance` kept as a literal `=== 'subtle'` test rather than `styles[appearance]`: unlike Button's `secondary`, there is no `default` slice in the Griffel source at all (base styles ARE the default appearance), so there is no class to look up.

### Open questions / follow-ups for the orchestrator

1. **`-moz-user-select: text` is not in the output.** Griffel emitted `-webkit-`, `-moz-` and unprefixed; Tailwind's `select-text` emits `-webkit-` + unprefixed. Firefox has supported unprefixed `user-select` since v69 (2019), so no supported browser changes behaviour — but it is a byte-level difference from the AOT output, listed here rather than hidden.
2. **`@fluentui/react-tabster` and `@fluentui/react-theme` are now unused runtime deps** of react-link (nothing in `library/src` imports them). I left them, mirroring the react-divider pilot which also kept an unused `@fluentui/react-theme`. A batch-wide dependency prune is worth scheduling; no dependency-checks lint rule exists today so nothing fails.
3. **`graphify update .` deliberately NOT run.** Multiple conversion workers are writing concurrently (I observed `variants.css` change under me twice mid-session); a concurrent write to the shared `graphify-out/graph.json` risks corrupting it. Recommend the orchestrator runs it once after the batch.
4. **VR not run** (per brief: no storybook rebuild, no screenshots). The disabled + `data-fui-focus-visible` path — the one inversion 2 exists to protect — is the highest-value VR case to confirm when the harness next runs, ideally with and without hover.

---

## react-image

### Verify

All 4 steps ran to completion, in order, no early stop.

1. capture.mjs (--filter "Image Converged" --expect 7): PASSED. Output: "[capture] 7 screenshots in 13s" — matched expected count of 7, no errors.

2. diff.mjs (baseline vs candidate/react-image): PASSED, exit code 0. Console: "[diff] 7 pairs, 7 clean, 0 failed, 0 missing, 0 extra" / "[diff] PASSED". summary.json (migration/griffel-to-tailwind/validation/candidate/react-image-diff/summary.json):

- threshold: 0.1
- maxDiffPixels: 0
- pairs: 7
- identicalOrWithinTolerance: 7
- failed: [] (none)
- missing: [] (none)
- extra: [] (none)
- passed: true

3. yarn nx run react-image:test: PASSED, exit code 0. Test Suites: 1 passed/1 total. Tests: 20 passed/20 total (Image.test.tsx — default render + full isConformant suite + extraTests "classname-overrides-win"). Snapshots: 1 passed. No failing test names.

4. yarn nx run react-image:build: PASSED, exit code 0 ("NX Successfully ran target build for project react-image and 10 tasks it depends on"). Build log: "Emitted dist/styles.css (2475 bytes)". File-existence check confirms packages/react-components/react-image/library/dist/styles.css exists and its first line is exactly:
   @layer fui.theme, fui.base, fui.components, fui.components.l1, fui.components.l2, fui.components.l3, fui.components.l4, fui.components.l5, fui.utilities;
   which begins with the required '@layer fui.theme,' prefix.

Note: NX also reported "detected flaky tasks" for two unrelated cached dependency builds (eslint-plugin-react-components:build, keyboard-keys:build) — informational only, both used cached outputs and did not affect the react-image build result (exit 0).

No GateGuard "[Fact-Forcing Gate]" error was raised by any Bash/Write/Edit call in this session, so no retry was needed. No graphify query was needed since no broad codebase exploration was performed — only the exact specified commands were run and the resulting files (summary.json, styles.css) were read directly.

### Conversion report

## react-image → Tailwind v4 + CSS Modules: CONVERTED (VR not run, per brief)

### Files changed (7)

- **NEW** `C:/Users/ArrayKnight/Code/fluentui/packages/react-components/react-image/library/src/components/Image/Image.module.css`
- `.../src/components/Image/useImageStyles.styles.ts` — rewritten (clsx + module classes)
- `.../src/components/Image/Image.test.tsx` — conformance wiring
- `.../library/package.json` — sideEffects, clsx, −@griffel/react, exports, files, devDep, imports
- `.../library/jest.config.js` — css-modules mapper + serializer
- `.../library/tsconfig.spec.json` — `"static-assets"` in `types`
- `C:/Users/ArrayKnight/Code/fluentui/migration/griffel-to-tailwind/ledger.json` — status `converting` → `converted`

### Mapping table (mergeClasses ARGUMENT order → in-file block order)

| #   | argument                               | compiled declarations                                                                                              | → target                    |
| --- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| 1   | `imageClassNames.root`                 | —                                                                                                                  | static class (JS)           |
| 2   | `styles.base`                          | 4× `border-*-color: var(--colorNeutralStroke1)`, `border-radius: var(--borderRadiusNone)`, `box-sizing`, `display` | `fui.components.l1` `.root` |
| 3   | `state.block && styles.block`          | `width:100%`                                                                                                       | `.block`                    |
| 4   | `state.bordered && styles.bordered`    | 4× `border-*-style:solid`, 4× `border-*-width: var(--strokeWidthThin)`                                             | `.bordered`                 |
| 5   | `state.shadow && styles.shadow`        | `box-shadow: var(--shadow4)`                                                                                       | `.shadow`                   |
| 6   | `styles[state.fit]`                    | `.center/.contain/.cover/.none`                                                                                    | 4 classes                   |
| 7   | `shouldApplyFitFill && styles.fitFill` | `height:100%; width:100%`                                                                                          | `.fitFill`                  |
| 8   | `styles[state.shape]`                  | `border-radius: var(--borderRadiusCircular\|Medium)`                                                               | `.circular/.rounded`        |
| 9   | consumer `className`                   | —                                                                                                                  | unlayered                   |

No `makeResetStyles` → `fui.base` intentionally empty. File order == argument order, asserted programmatically.

### Data attributes / catalog variants: NONE added (deviation worth reviewing)

All five Image props are **look** props per D3 (`block`/`bordered`/`shadow` are boolean visual modifiers; `fit`/`shape` are enums) and **none composes with another selector** — each is a standalone rule block. They became module classes. Using data-attributes would have required inventing 3 catalog variants (`bordered`/`shadow`/`block`) with no nyt-games or headless-preview precedent, which the guide ranks last. Contrast react-divider's `inset`, which needed `data-inset` only because its rules nest inside the orientation variants. `react-tailwind-theme/css/variants.css` is untouched by me (the +80 `size-*` lines currently in its diff are from concurrent batch workers).

### Empty slices

`square: {}` and `default: {}` are deliberately not authored. Confirmed in the generated class map — it has exactly 11 keys, no `square`/`default` → `styles.square`/`styles.default` are `undefined` and clsx drops them, exactly as Griffel's empty slices behaved.

### Inversions

One declaration-order inversion, benign: `block` is declared last in the Griffel source (L69) but applied 3rd; `fitFill` declared L63 but applied 7th. Their only shared property is `width:100%` — identical value (Griffel compiled both to the same atomic `fly5x3f`). File order follows argument order anyway. The load-bearing order is `.circular`/`.rounded` `border-radius` beating `.root`'s — asserted by file position.

### RTL

Exactly one value-level flip in the compiled atomics: `.none`'s `object-position` pair `["left top","right top"]` → duplicated under `@variant rtl`. Every other ltr/rtl atomic pair Griffel emitted (border-color/style/width from `shorthands.*`) carries the **same value** on both sides, so physical longhands are byte-identical in both directions — same treatment react-divider gave `shorthands.borderColor`. `box-shadow: var(--shadow4)` was unflipped by Griffel (token opaque to rtl-css-js).

### Validation

- **`react-image:test`** — 20/20 pass. `make-styles-overrides-win` disabled with rationale; `classname-overrides-win` enabled and passing. **Snapshot diff empty — no update needed** (zero data-attributes means the DOM is unchanged).
- **`react-image:build`** — green. `dist/styles.css` = 2475 B, line 1 is the canonical `@layer fui.theme, fui.base, fui.components, fui.components.l1…l5, fui.utilities;`. **Zero** dangling `.module.css` specifiers in `lib`/`lib-commonjs` (only the repointed `Image.module.css.js` class maps). `useImageStyles.styles.raw.js` deleted by conversion.
- **`react-image:lint`** — clean (0 errors, 0 warnings). The Griffel original's `eslint-disable-next-line react-hooks/immutability` was dropped because the rule no longer reports; the **state-mutation pattern itself is preserved** per D14, same as react-divider/react-button. `type-check` clean. Prettier clean on all changed files (`package.json` was already prettier-dirty at HEAD; now fixed).
- **Fidelity audit** (`.scratch/image-probe/fidelity2.js`): all **26** compiled Griffel atomics referenced, **30** declarations verified against the emitted `dist/styles.css` — exact match per slice, plus the two empty slices asserted absent.
- **Cascade-order assertion** (`.scratch/image-probe/order.js`): in-file order == argument order; `border-radius` and `width` conflicts resolve to the mergeClasses winner by file position. `object-fit`/`object-position` are multi-rule but mutually exclusive (exactly one `fit` class ever applies).
- **VR blind-spot probe** (`.scratch/image-probe/matrix.js`, no storybook): drove the **built** lib-commonjs hook over **960** prop combinations (5 fit × 3 shape × 2 block × 2 bordered × 2 shadow × 4 size-shapes × 2 consumer-className) against an independent model of the original mergeClasses argument list — 960/960 class-identical, static `fui-Image` first and consumer className last in every case.

### VR blind spots (enumerated; VR itself NOT run — brief forbade storybook rebuild)

`apps/vr-tests-react-components/src/stories/Image/Image.stories.tsx` has 7 stories. Combinations no story exercises, all covered by the matrix probe: `fit` **with** explicit height/width (576 combos — every VR fit story omits size, so `shouldApplyFitFill===false` is never rendered), `block`+`fit` (384), `bordered`+`shadow` (240), `shadow`+non-square `shape` (320). `fit="none"` under RTL — the component's only value-level flip — appears in `ImageLayoutFit`, so the VR harness's RTL pass should cover it, but I could not confirm that without building.

### Deviations / open questions

1. **Zero data-attributes** (rationale above) — worth a reviewer nod since prior conversions added some.
2. **`border-radius` kept as the shorthand** rather than expanded to four corner longhands. That is exactly what Griffel compiled (`.f1fabniw{border-radius:var(--borderRadiusNone);}`, single atomic, no ltr/rtl pair), and no rule anywhere in this component sets a corner longhand, so there is no shorthand-vs-longhand priority for the cascade to get wrong. `shorthands.borderColor/borderStyle/borderWidth` **were** expanded to longhands, matching their compiled output.
3. **`@fluentui/react-theme` left in `dependencies`** although `src` no longer imports it — matching react-divider, which is in the identical situation. Only `@griffel/react` was removed. Flag if you want a dependency sweep instead.
4. **Status set to `converted`, not `validated`** — the ledger's definition of done requires a clean VR diff, which this brief excluded.
5. Probe scripts live in `C:/Users/ArrayKnight/Code/fluentui/.scratch/image-probe/` (gitignored). Left in place for follow-up rounds — say the word and I'll clear them.

---

## react-progress

### Verify

Step1 capture.mjs: 11 screenshots in 18s (matches --expect 11). Step2 diff.mjs: exit 0 PASSED; summary.json = {pairs:11, identicalOrWithinTolerance:11, failed:[], missing:[], extra:[], maxDiffPixels:0, threshold:0.1, passed:true}. Step3 yarn nx run react-progress:test: 3 suites passed / 3 total (clampValue.test.ts, clampMax.test.ts, ProgressBar.test.tsx), 42 tests passed / 42 total, 0 failing, 0 snapshots, ran in 3.27s. Step4 yarn nx run react-progress:build: succeeded (react-progress + 19 dependency tasks, 19 served from cache); verified packages/react-components/react-progress/library/dist/styles.css exists (3131 bytes per build log / 3127 chars on read) and its first line is '@layer fui.theme, fui.base, fui.components, fui.components.l1, fui.components.l2' i.e. begins with the required '@layer fui.theme,' prefix. No GateGuard [Fact-Forcing Gate] block occurred on any Bash/Write/Edit call.

### Conversion report

## Files changed

- **NEW** `C:/Users/ArrayKnight/Code/fluentui/packages/react-components/react-progress/library/src/components/ProgressBar/ProgressBar.module.css`
- `.../ProgressBar/useProgressBarStyles.styles.ts` (rewritten: clsx + data-attributes)
- `.../ProgressBar/ProgressBar.test.tsx` (conformance swap)
- `.../react-progress/library/package.json` (plumbing)
- `.../react-progress/library/jest.config.js` (css-modules mapper + serializer)
- `C:/Users/ArrayKnight/Code/fluentui/packages/react-components/react-tailwind-theme/css/variants.css` (catalog extension)

## Mapping table (from compiled `lib-commonjs/.../useProgressBarStyles.styles.js`)

**root slot** — mergeClasses argument order:

| #   | argument                     | → target                                                     |
| --- | ---------------------------- | ------------------------------------------------------------ |
| 1   | `progressBarClassNames.root` | static class (JS)                                            |
| 2   | `useRootStyles.root`         | `fui.components.l1`                                          |
| 3   | `useRootStyles[shape]`       | `fui.components.l1` — `.rounded` / `.square` (look prop, D3) |
| 4   | `useRootStyles[thickness]`   | `fui.components.l1` — `data-thickness` (scale prop, D3)      |
| 5   | consumer `className`         | unlayered                                                    |

Declaration order == argument order. No inversion.

**bar slot** — mergeClasses argument order:

| #   | argument                          | → target                                                      |
| --- | --------------------------------- | ------------------------------------------------------------- |
| 1   | `progressBarClassNames.bar`       | static class (JS)                                             |
| 2   | `useBarStyles.base`               | `fui.components.l1` (forced-colors half split out, see below) |
| 3   | `useBarStyles.brand`              | `fui.components.l1` (collapsed into #6)                       |
| 4   | `useBarStyles.indeterminate`      | `fui.components.l1` — `data-indeterminate`                    |
| 5   | `useBarStyles.nonZeroDeterminate` | `fui.components.l1` — `.nonZeroDeterminate`                   |
| 6   | `useBarStyles[color]`             | `fui.components.l1` — `.brand`/`.error`/`.warning`/`.success` |
| 7   | consumer `className`              | unlayered                                                     |

`fui.base` is empty — ProgressBar has no `makeResetStyles`.

Compiled atomics reproduced 1:1: `ftgm304` display:block, `f18f03hv/f1skxd4g` bg + forced-colors CanvasText, `fly5x3f` width:100%, `f1a3p1vp` overflow:hidden, `ft85np5/f1fabniw` borderRadiusMedium/None, `f4t8t6x/f6ywr7j` height 2px/4px (`@apply h-2`/`h-4`), `f12b9xdw` border-radius:inherit, `f1l02sjl` height:100%, `fjt6zfz/f1wofebd/fv71qf3` transition width/0.3s/ease, `fa0wk36` max-width:33%, `f10pi13n` position:relative, `[fpo0yib, f1u5hf6c]` the LTR/RTL gradient twin, `f3z2g5w` reduced-motion max-width:100%, `f1tnpuu0` forced-colors Highlight, `ftywsgz/fdl5y0r/f1s438gw/flxk52p` the four color backgrounds.

## Inversions handled

**One genuine inversion.** `useBarStyles.base` is mergeClasses argument #2 but declares a `@media screen and (forced-colors: active) { background-color: Highlight }` rule. Griffel emits its media bucket `m` AFTER the default bucket `d`, so that rule beats all four color atomics (#3/#6) despite being an earlier argument. Written in plain source order it would lose to `.error`/`.warning`/`.success`. Fixed by splitting the forced-colors half of `.bar` into a separate, final `@layer fui.components.l1` block written after the color block. Verified in the emitted `dist/styles.css`: the `@media (forced-colors: active) { .…__bar… { background-color: Highlight } }` block is last inside the layer.

Two same-bucket media overrides (`.root` forced-colors `CanvasText`; `.indeterminate` reduced-motion `max-width: 100%`) only override declarations from their own slice, so nesting them in place already reproduces the Griffel winner.

Non-inverted cross-position moves, verified disjoint: #4 `indeterminate` and #5 `nonZeroDeterminate` are mutually exclusive (`value` undefined vs. defined); neither sets `background-color`, so writing the color block after them cannot invert anything.

**Args #3 + #6 collapsed to one class.** Griffel applied `barStyles.brand` unconditionally and `barStyles[color]` only when `value !== undefined`; when both landed, #6 won `background-color`. The hook now resolves the winner in JS (`!isIndeterminate && color ? color : 'brand'`) and emits a single class. Effect-identical for all three cases (indeterminate → brand; determinate+color → color; determinate+no color → brand), and it avoids rendering `brand` twice on the most common path, `<ProgressBar value={…} />`. Behavioral consequence worth surfacing in the PR (pre-existing, deliberately preserved): an **indeterminate bar ignores `color` entirely and stays brand**.

## Data-attributes / catalog

- `data-thickness` on root. **Not** `data-size`: `ProgressBarProps` explicitly `Omit`s `size`, so claiming `data-size` would name an attribute the component does not have. No nyt-games or headless-preview precedent exists for a thickness attribute (checked both reports), so the name is invented from the public prop — 2 catalog entries added.
- `data-indeterminate` on the bar, reusing the catalog's **existing** `indeterminate` variant — no extension needed.
- `shape` and `color` stay module classes (look props, D3).
- `nonZeroDeterminate` stays a module class: it is a threshold-guarded animation toggle, not a prop or public state.

## Deviations from the brief

**The brief's keyframes premise does not hold for this package.** There are no Griffel keyframes and no `animationName` anywhere in react-progress. The indeterminate slide is `@fluentui/react-motion`'s `createMotionComponent` (Web Animations API, `translate: '-100%' → '300%'`) in `progressBarMotions.ts`, which D12 says needs no conversion — untouched. The only RTL twin Griffel emitted is the `background-image` gradient value-flip (`to right` / `to left`), handled with `@variant rtl` per D5. No `@keyframes` were authored.

Determinate width rides `state.bar.style.width` — ported verbatim, JS untouched, as instructed.

`@variant forced-colors` compiles to `@media (forced-colors: active)`, dropping the `screen` media type Griffel emitted. Deliberate, following the react-button precedent (the catalog variant is shared); only affects print. The `@media screen and (prefers-reduced-motion: reduce)` block keeps `screen` verbatim, also matching Button.

## Plumbing

`sideEffects: ["**/*.css"]`; `@griffel/react` removed from dependencies (zero imports remain in `library/src` — only a comment mentions it) and `clsx@^2.1.1` added; `exports["./styles.css"]` + `files["dist/styles.css"]`; devDep `@fluentui/react-tailwind-theme: workspace:*`; `imports["#theme"]`. jest.config gains the css-modules mapper + serializer and **drops** `@griffel/jest-serializer` (react-divider's fully-converted precedent; ProgressBar is this package's only component). Conformance: `disabledTests: ['make-styles-overrides-win']` with rationale + `extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin }`, copied from react-button's Button.test.tsx.

## Validation results

- `yarn nx run react-progress:test` — **green**, 3 suites / 42 tests. **Snapshots: 0 total** — this package has no `.snap` files, so there were no snapshot diffs to review or update. Separately confirmed the new conformance test actually executes and passes: `-t "classname-overrides-win"` → 1 passed, 41 skipped (not a vacuous pass).
- `yarn nx run react-progress:build` — **green**. `🎨 Compiling CSS Modules: 1 files` / `🎨 Emitted dist/styles.css (3131 bytes)`. `dist/styles.css` line 1 is the canonical `@layer fui.theme, fui.base, fui.components, fui.components.l1 … fui.utilities;`. **Zero dangling `.module.css` specifiers** in `lib`/`lib-commonjs`: both emitted files import `./ProgressBar.module.css.js` (ESM map carries the `import "../../../dist/styles.css"` side effect, CJS map deliberately does not); the only `.module.css'` text remaining is inside `.js.map` `sourcesContent`. Class map has 9 keys — `indeterminate` correctly absent (now a data-attribute).
- `yarn nx run react-progress:lint` — **clean**.
- Prettier (repo-pinned 2.8.8 + `prettier.config.js`) — clean on all 6 changed files. Note: invoking `yarn prettier` resolves a different version and produces false positives on untouched files; the pinned binary is the correct check.
- `graphify update .` run per CLAUDE.md.

## VR blind spots (no screenshots captured, per brief)

`apps/vr-tests-react-components/src/stories/ProgressBar.stories.tsx` covers indeterminate×thickness, determinate×thickness (each ×dark/HC/RTL), and determinate error/warning/success. **Not exercised by any story:** (a) `shape="square"` — zero VR coverage of `.square`/`borderRadiusNone`; (b) determinate with `0 < value <= 0.01` (the `ZERO_THRESHOLD` branch that withholds `.nonZeroDeterminate`); (c) `prefers-reduced-motion: reduce` (the `max-width: 100%` override); (d) indeterminate + `color` (the "stays brand" path documented above); (e) `color` under RTL. I did not run computed-style probes — that requires the built storybook, which the brief excludes.

## Open questions

1. **Ledger not updated.** `migration/griffel-to-tailwind` ledger row for react-progress is untouched — the brief did not list it as a deliverable and concurrent workers writing one file would conflict. Orchestrator should mark it.
2. **`@fluentui/react-theme` kept in dependencies** although the converted styles file no longer imports `tokens` and nothing else in `library/src` uses it. Matches the react-divider precedent (which also kept it); flagging as a candidate for the Phase 3 dependency sweep rather than removing it unilaterally.
3. **`data-thickness` is an invented name.** If the migration prefers one attribute per scale concept repo-wide, the alternative is reusing `data-size` with the existing `size-medium`/`size-large` variants (zero catalog growth) at the cost of naming an attribute after a prop this component explicitly omits. Cheap to flip if the orchestrator rules the other way.
4. A concurrent worker added numeric `size-8`…`size-128` variants to `variants.css` during my edit; my `thickness-*` block landed after them cleanly, but `variants.css` is a contention point across parallel workers.

---

## react-spinner

### Verify

Step 1 (capture.mjs): 17 screenshots captured in 29s (matches --expect 17); output dir migration/griffel-to-tailwind/validation/candidate/react-spinner contains 17 PNGs + manifest.json.

Step 2 (diff.mjs): exit code 0, PASSED. Console: "[diff] 17 pairs, 17 clean, 0 failed, 0 missing, 0 extra". summary.json (migration/griffel-to-tailwind/validation/candidate/react-spinner-diff/summary.json): threshold=0.1, maxDiffPixels=0, pairs=17, identicalOrWithinTolerance=17, failed=[], missing=[], extra=[], passed=true. No failing names, no nonzero diffPixels.

Step 3 (yarn nx run react-spinner:test): PASS. Test Suites: 1 passed, 1 total. Tests: 25 passed, 25 total (Spinner.test.tsx unit tests + isConformant suite). Time 2.004s. No failures.

Step 4 (yarn nx run react-spinner:build): "Successfully ran target build for project react-spinner and 11 tasks it depends on." Console showed "🎨 Emitted dist/styles.css (10770 bytes)". Verified packages/react-components/react-spinner/library/dist/styles.css exists (FILE_EXISTS=true) and its first line is exactly: "@layer fui.theme, fui.base, fui.components, fui.components.l1, fui.components.l2, fui.components.l3, fui.components.l4, fui.components.l5, fui.utilities;" — begins with '@layer fui.theme,' as required. Note: Nx reported "eslint-plugin-react-components:build" and "keyboard-keys:build" as flaky/cached dependency tasks, unrelated to react-spinner itself and not a failure.

All four steps ran to completion in order; nothing was skipped or backgrounded.

### Conversion report

## react-spinner — converted, validated (build + tests + lint + type-check green)

### Files changed

- `C:/Users/ArrayKnight/Code/fluentui/packages/react-components/react-spinner/library/src/components/Spinner/Spinner.module.css` **(new)**
- `C:/Users/ArrayKnight/Code/fluentui/packages/react-components/react-spinner/library/src/components/Spinner/useSpinnerStyles.styles.ts` (rewritten: clsx + data-attributes)
- `C:/Users/ArrayKnight/Code/fluentui/packages/react-components/react-spinner/library/src/components/Spinner/Spinner.test.tsx` (conformance swap)
- `C:/Users/ArrayKnight/Code/fluentui/packages/react-components/react-spinner/library/package.json`
- `C:/Users/ArrayKnight/Code/fluentui/packages/react-components/react-spinner/library/jest.config.js`
- `C:/Users/ArrayKnight/Code/fluentui/packages/react-components/react-spinner/library/tsconfig.spec.json` (added `static-assets` to spec `types` — required, see Deviations)
- `C:/Users/ArrayKnight/Code/fluentui/packages/react-components/react-tailwind-theme/css/variants.css` (shared catalog)

### Mapping table (mergeClasses ARGUMENT order → layer)

| slot        | #   | Griffel source                                     | target                                                  |
| ----------- | --- | -------------------------------------------------- | ------------------------------------------------------- |
| root        | 1   | `spinnerClassNames.root`                           | static class (JS)                                       |
| root        | 2   | `useRootBaseClassName` (makeResetStyles)           | `fui.base` `.root`                                      |
| root        | 3   | `useRootStyles.vertical`                           | `fui.components.l1` (`@variant vertical`)               |
| root        | 4   | consumer `className`                               | unlayered                                               |
| spinner     | 2   | `useSpinnerBaseClassName` (makeResetStyles)        | `fui.base` `.spinner`                                   |
| spinner     | 3   | `useSpinnerStyles[size]` (8 slices)                | `fui.components.l1` (root `data-size` → `& .spinner`)   |
| spinner     | 4   | `useSpinnerStyles.inverted`                        | `fui.components.l1` `.spinnerInverted`                  |
| spinnerTail | 2   | `useSpinnerTailBaseClassName` (makeResetStyles)    | `fui.base` `.spinnerTail`                               |
| spinnerTail | 3   | `useSpinnerStyles.rtlTail` (`dir==='rtl'`)         | `fui.components.l1` (`@variant rtl`)                    |
| label       | 2   | `useLabelStyles[size]` (body1/subtitle2/subtitle1) | **`fui.components.l2`** (root `data-size` → `& .label`) |
| label       | 3   | `useLabelStyles.inverted`                          | **`fui.components.l2`** `.labelInverted`                |

**Inversions: none.** In every slot, file order == argument order. The only cross-slice pairs inside a level (`size` vs `inverted`) are property-disjoint against the compiled atomics — size sets height/width/`--fui-Spinner--strokeWidth` (spinner) and `font-*` (label); inverted sets background-color/color.

### The l2 decision (altitude rule, D2 amendment 2)

The `label` slot's elementType is `@fluentui/react-label`'s `Label` — another component's hook owns that element's base styles (react-label is converted in this same batch, its rules in `fui.components.l1`). Spinner restyling it is a **library composition**, so its label rules go to `fui.components.l2`. This is load-bearing for every `size >= medium`, where Spinner's subtitle2/subtitle1 typography must beat Label's own `data-size` font-size/line-height rules. Under Griffel this worked because Spinner's classes arrived as Label's _last_ mergeClasses argument (via `className`); l2 reproduces that winner without depending on stylesheet load order or string position.

### `data-size` on the ROOT — empirically forced, not stylistic

`useLabelStyles_unstable` stamps `root['data-size']` from **Label's own** `size` prop. A DOM probe across the full 8-size × 2-appearance matrix printed `label[data-size]=medium` for _every_ Spinner size — so stamping `data-size` on the label slot would have been silently overwritten and all Spinner label typography would have broken with green tests. Driving both sized slots from the Spinner root's attribute (the react-button/icon precedent) is the only correct encoding. Cost: those rules are 0-2-0 descendant selectors instead of the usual 0-1-0; inert here because the property sets are disjoint (documented in the module header).

### Inversions / RTL — DISCREPANCY WITH THE PACKAGE NOTE

The brief said "rotation keyframes (symmetric — no RTL twin needed; justify in report)". **The compiled AOT contradicts this and I followed the code** (guide: "the code wins — report the discrepancy"). Evidence:

- `useSpinnerBaseClassName` → `__resetStyles("rvgcg50", "r15nd2jo", …)`: RTL twin exists, sole delta `rotate(360deg)` → `rotate(-360deg)`.
- `useSpinnerTailBaseClassName` → `__resetStyles("rxov3xa", "r1o544mv", …)`: RTL twin, three keyframe bodies negated (`-135/0/225`→`135/0/-225`, `0/105/0`→`0/-105/0`, `0/225/0`→`0/-225/0`). Conic-gradients are byte-identical in both — rtl-css-js does not flip `conic-gradient`, which is exactly why the source branched on `dir` in JS for `rtlTail`.

Why the flip is not inert: `spinnerTail` is a DOM **child** of `spinner` (`renderSpinner.tsx:20`, confirmed by probe: tail's parent is `.fui-Spinner__spinner`), so the ring's 360° spin composes onto the tail's arc sweep. Working the geometry at t=0: LTR visible arc spans −30°→0°; true RTL (all angles negated + mirrored gradients) spans 0°→30°; "mirrored gradients but LTR rotations" spans **90°→120°** — a different position entirely, and it diverges for all t. `useRootBaseClassName` genuinely has no twin (compiled rtl class is literally `null`), so the root reset needed nothing.

Implementation: 8 `@keyframes` (4 LTR + 4 RTL twins), authored unlayered (keyframes declare no cascade rules; CSS Modules already makes names unique — verified scoped in output, e.g. `fuicm-Spinner-module__spinner-tail-spin-rtl--uLDf`), with `animation-name` switched under `@variant rtl`. The `rtlTail` gradient mirrors moved from the JS `dir === 'rtl'` branch to `@variant rtl` in l1 — `useFluent()` is gone from the hook, and direction now follows computed DOM direction (D5's documented semantics change).

### Catalog additions (`react-tailwind-theme/css/variants.css`)

Spinner's scale is 8-wide; the catalog had only `size-small|medium|large`. Added `size-extra-tiny`, `size-tiny`, `size-extra-small`, `size-extra-large`, `size-huge`, following the existing `size-<prop-value>` shape. **Concurrency note:** a sibling session had already landed 4 of these between my read and my write, producing duplicate `@custom-variant` lines (`size-tiny`, `size-extra-small`, `size-extra-large` twice each). I deduped the scale block into one ordered run of 8. **Unrelated pre-existing duplicate left alone:** `not-focus-within` is declared twice (two different sibling sessions, lines ~144 and ~158) — flagging for the overseer, I did not touch it to avoid a write collision.

### Other dialect choices

- **`data-orientation` rather than a label-position variant.** The Griffel condition is `labelPosition === 'above' || 'below'` → `flex-direction: column`, i.e. exactly "stack on the block axis" — so it reuses the catalog's existing `vertical`/`horizontal` pair (react-divider's encoding for the same switch), adding zero variants. `data-label-position` exists in the headless vocabulary but would need ≥2 new variants and would encode "above-or-below" in CSS. Griffel never distinguished above from below either — only render order does, and that lives in `renderSpinner`.
- **Per-slot `inverted` classes** (`.spinnerInverted` / `.labelInverted`) rather than one shared `.inverted`: the Griffel source has two distinct `inverted` slices on two different elements; a shared class would need a compound `.spinner.inverted` selector (0-2-0) instead of flat 0-1-0. `appearance: 'primary'` has no slice, so no `.spinnerPrimary`/`.labelPrimary` rule exists (the `{}`-slice → undefined rule).
- **Literal `@media screen and (forced-colors: active)`** instead of the shared `forced-colors` variant: the compiled output carries the `screen` media type, which the variant's `@media (forced-colors: active)` would widen to all media types.
- Both `-webkit-mask-image` and `mask-image` authored explicitly, matching compiled bytes rather than trusting browserslist-dependent autoprefixing.
- `@griffel/react` removed from `dependencies` (zero remaining imports in the package, verified by grep). `@fluentui/react-theme` is now unimported by `src` but **kept** in `dependencies`, mirroring the react-divider pilot. `@fluentui/react-shared-contexts` is still used (`Spinner.tsx` → `useCustomStyleHook_unstable`).
- State-mutation pattern preserved (D14); the `eslint-disable-next-line react-hooks/immutability` comments were dropped to match react-divider/react-button — lint is clean without them.

### Test / snapshot review

- `yarn nx run react-spinner:test` → **25 passed / 25**, **0 snapshots**. react-spinner owns no `.snap` files, and a repo-wide grep for `fui-Spinner` across `packages/**/*.snap` returned **zero** files — so this conversion produces **no snapshot churn anywhere**, additive or otherwise. Nothing to update.
- Conformance: `disabledTests: ['make-styles-overrides-win']` + `extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin }` (react-button/react-divider wiring). `classname-overrides-win` passes.
- jest.config: added `cssModules` mapper + `snapshotSerializers: [cssModules.snapshotSerializer]`; **dropped `@griffel/jest-serializer`** (react-divider pattern — the package's only styles file is converted, nothing renders atomics).

### Build validation

`yarn nx run react-spinner:build --skip-nx-cache` clean. Asserted on the output:

- `dist/styles.css` exists (10,770 B) and **starts with the canonical `@layer` statement verbatim**.
- Zero `@apply` / `@reference` / `@variant` / `@theme` / `@utility` / `fui.reset` residue; zero `--base-scale:` declarations; zero `:root`/`:host` blocks (no theme emission leaked in).
- Layers emitted: `fui.base`, `fui.components.l1`, `fui.components.l2` only. 8 scoped `@keyframes`. 3 `:dir(rtl)` selectors.
- **Zero dangling `.module.css` specifiers** across 22 emitted `.js` files in `lib/` + `lib-commonjs/`; both class maps generated; ESM map imports the stylesheet, CJS map has no CSS `require`.
- `'use client'` is line 1 of both `lib` and `lib-commonjs` output; no Griffel references; no `*.styles.raw.js` (Griffel dead-work gating correctly skips this package now).
- `package.json`: `sideEffects: ["**/*.css"]`, `exports["./styles.css"]`, `files` includes `dist/styles.css`, `clsx ^2.1.1`, `devDependencies: @fluentui/react-tailwind-theme workspace:*`, `imports: {"#theme": …}`.

### Lint / format

`react-spinner:lint` clean, `react-spinner:type-check` clean, prettier clean on all changed files (the initial 3 prettier warnings were CRLF/LF normalization only — `git diff` confirmed the content changes are exactly my edits).

### Blind-spot probe (VR not run per brief — no storybook rebuild/screenshots)

Temporary jsdom probe over the full prop matrix (8 sizes × 2 appearances, 4 label positions, `spinner={null}`, no-label), then deleted. Results:

- `data-orientation`: above/below → `vertical`; before/after → `horizontal`. ✓
- `data-size` present on root for all 8 values; `label[data-size]` is always Label's own `medium` (the collision above). ✓
- Class composition: root `fui-Spinner <module> consumer` — static first, consumer last. ✓
- Label class list `fui-Label <Label.root> fui-Spinner__label <Spinner.label> [<labelInverted>]` — Spinner's classes are _not_ last in the string, which is precisely why l2 (not l1) is required.
- `spinnerTail` parent is `.fui-Spinner__spinner` (the keyframe-composition premise). ✓
- Note: under jest the class-name proxy returns `fuicm-<key>`, so Label's `.root` and Spinner's `.root` both print `fuicm-root`; the real build produces distinct hashed names (`fuicm-Spinner-module__root--wfKn` vs Label's own), confirmed in `dist/styles.css`.

### Deviations from the cookbook

1. **`tsconfig.spec.json` edit was required** and is not in the recipe's plumbing list: the spec program compiles the styles hook transitively and failed with `TS2307: Cannot find module './Spinner.module.css'` until `"static-assets"` was added to `types` (the lib tsconfig already had it). react-divider carries the identical edit + comment, so this is a real recipe gap worth adding to the guide for the remaining ~80 packages.
2. **RTL keyframe twins authored** despite the package note saying they were unnecessary — justified above from the compiled `[ltr, rtl]` pairs and the DOM parent/child relationship.
3. **`fui.components.l2` used** for one slot. Correct per D2 amendment 2, but this is the first batch package to exercise l2, so it deserves a reviewer's eye.

### Open questions for the overseer

1. **VR not run** (brief forbade storybook rebuild/screenshots). This package is the highest-value VR target in the batch: 4 animation-bearing keyframe sets, an RTL mirror, and `prefers-reduced-motion` branches — none of which any static assertion here covers. Recommend RTL + reduced-motion stories specifically.
2. **`graphify update .` deliberately NOT run.** Project CLAUDE.md mandates it after code changes, but ~10 batch workers running concurrently would write `graphify-out/graph.json` (144k nodes) simultaneously. Recommend one run at batch end by the overseer.
3. **`not-focus-within` is declared twice in `variants.css`** from concurrent sibling sessions — harmless (identical definitions) but should be deduped by whoever owns the final catalog pass.
4. `@fluentui/react-theme` is now an unused dependency of react-spinner (kept, per react-divider precedent). If a dependency-checks lint rule is ever turned on, the whole converted set needs a sweep.

---

## react-skeleton

### Verify

Step 1 (capture.mjs, filter "Skeleton converged", expect 21): PASSED — log ends "[capture] 21 screenshots in 34s", matching --expect 21. Output written to migration/griffel-to-tailwind/validation/candidate/react-skeleton.

Step 2 (diff.mjs, baseline vs candidate react-skeleton): PASSED, exit code 0. Console: "[diff] 21 pairs, 21 clean, 0 failed, 0 missing, 0 extra" / "[diff] PASSED — summary: migration\griffel-to-tailwind\validation\candidate\react-skeleton-diff\summary.json". summary.json contents: {"baseline":"migration/griffel-to-tailwind/validation/baseline/react-skeleton","candidate":"migration/griffel-to-tailwind/validation/candidate/react-skeleton","threshold":0.1,"maxDiffPixels":0,"pairs":21,"identicalOrWithinTolerance":21,"failed":[],"missing":[],"extra":[],"passed":true}. No failing names, maxDiffPixels=0.

Step 3 (yarn nx run react-skeleton:test): PASSED. Jest: "Test Suites: 2 passed, 2 total", "Tests: 46 passed, 46 total", "Snapshots: 2 passed, 2 total", Time 2.534s. Suites: src/components/SkeletonItem/SkeletonItem.test.tsx, src/components/Skeleton/Skeleton.test.tsx. No failing test names.

Step 4 (yarn nx run react-skeleton:build): PASSED. "NX Successfully ran target build for project react-skeleton and 18 tasks it depends on" (18/19 tasks served from cache, 1 rebuilt with CSS module compile: "Emitted dist/styles.css (11714 bytes)"). Nx flagged eslint-plugin-react-components:build and keyboard-keys:build as flaky (cache-related notice on dependency tasks, unrelated to react-skeleton itself, non-blocking). Post-build file check: packages/react-components/react-skeleton/library/dist/styles.css exists (confirmed via `test -f`) and its first line is exactly: "@layer fui.theme, fui.base, fui.components, fui.components.l1, fui.components.l2, fui.components.l3, fui.components.l4, fui.components.l5, fui.utilities;" — begins with the required '@layer fui.theme,' prefix.

All four steps ran to completion with no manual intervention; no GateGuard "[Fact-Forcing Gate]" block was encountered on any Bash or Write/Edit call in this session.

### Conversion report

## react-skeleton — converted, all local gates green

### Files changed (absolute paths)

NEW

- `C:/Users/ArrayKnight/Code/fluentui/packages/react-components/react-skeleton/library/src/components/Skeleton/Skeleton.module.css`
- `C:/Users/ArrayKnight/Code/fluentui/packages/react-components/react-skeleton/library/src/components/SkeletonItem/SkeletonItem.module.css`

MODIFIED

- `.../react-skeleton/library/src/components/Skeleton/useSkeletonStyles.styles.ts`
- `.../react-skeleton/library/src/components/SkeletonItem/useSkeletonItemStyles.styles.ts`
- `.../react-skeleton/library/src/components/Skeleton/Skeleton.test.tsx`
- `.../react-skeleton/library/src/components/SkeletonItem/SkeletonItem.test.tsx`
- `.../react-skeleton/library/src/components/SkeletonItem/__snapshots__/SkeletonItem.test.tsx.snap`
- `.../react-skeleton/library/package.json`
- `.../react-skeleton/library/jest.config.js`
- `.../react-skeleton/library/tsconfig.spec.json` ← **not in the cookbook, see Deviations**
- `C:/Users/ArrayKnight/Code/fluentui/packages/react-components/react-tailwind-theme/css/variants.css`

### Mapping table — Skeleton (mergeClasses argument order)

| #   | argument                                   | → target                            |
| --- | ------------------------------------------ | ----------------------------------- |
| 1   | `skeletonClassNames.root`                  | static class (JS)                   |
| 2   | `useStyles.blockStyling` (`as === 'span'`) | `fui.components.l1` `.blockStyling` |
| 3   | consumer `className`                       | unlayered                           |

No `makeResetStyles` → nothing in `fui.base`.

### Mapping table — SkeletonItem

| #   | argument                                   | → target                                  |
| --- | ------------------------------------------ | ----------------------------------------- |
| 1   | `skeletonItemClassNames.root`              | static class (JS)                         |
| 2   | `useStyles.root`                           | l1 `.root` (+`::after`)                   |
| 3   | `useStyles.blockStyling` (`as === 'span'`) | l1 `.blockStyling`                        |
| 4   | `useStyles.wave`                           | l1 `.wave` (+ `@variant rtl`)             |
| 5   | `useStyles.pulse`                          | l1 `.pulse`                               |
| 6   | `useStyles.translucent`                    | l1 `.translucent` (+ `@variant rtl`)      |
| 7   | `useStyles.translucentPulse`               | l1 `.translucentPulse`                    |
| 8   | `useRectangleStyles.root`                  | l1 `.rectangle`                           |
| 9   | `useRectangleStyles[size]`                 | l1 `.rectangle` + `@variant size-N`       |
| 10  | `useSizeStyles[size]` (square)             | l1 `.square, .circle` + `@variant size-N` |
| 11  | `useCircleSizeStyles.root`                 | l1 `.circle`                              |
| 12  | `useSizeStyles[size]` (circle)             | same block as #10                         |
| 13  | consumer `className`                       | unlayered                                 |

Look props (`animation`, `appearance`, `shape`) → module classes; scale prop (`size`) → `data-size` (D3). `styles.opaque` is intentionally undefined (no `opaque` Griffel slice), like Button's `secondary`/`rounded`.

### The wave RTL twin (the package's SPECIAL item) — done

Compiled AOT confirms Griffel emitted an `[ltr, rtl]` pair for **all three** direction-sensitive values, and all three are reproduced under `@variant rtl` on `.wave`:

- `animation-name`: `f1efwx7q` (`to{translate(100%)}`) / `f1kkgpz1` (`to{translate(-100%)}`) → hand-authored `@keyframes skeleton-wave` / `skeleton-wave-rtl`
- `background-image`: `linear-gradient(to right, …)` / `(to left, …)`
- `transform`: `translate(-100%)` / `translate(100%)`

`@variant rtl` wraps the **element** (`&:where(:dir(rtl)) { &::after { … } }`), never the pseudo-element — `::after:where(:dir(rtl))` is not a valid selector. `.translucent`'s gradient got the same treatment (`flvf4r0`/`f1uek97b`). Pulse keyframes are opacity-only and Griffel emitted a single name — no twin. Keyframes are prefixed `skeleton-` so they don't collide with the `.wave`/`.pulse` class keys in the generated class map (postcss-modules scopes classes and keyframes through one `generateScopedName`); verified in the emitted map: `skeleton-wave`, `skeleton-wave-rtl`, `skeleton-pulse` all scoped and distinct.

### Inversions / ordering handled

1. **Griffel style-BUCKET inversion (new class of finding, not in risk-analysis' 23).** `mergeClasses` only deletes a class when a later argument carries the _same property key_. A media-query declaration gets its own key (`Gt9ir8` for the reduced-motion `animation-duration` vs `xr36ep` for the plain one), so both classes survive the merge and the **CSS cascade** decides — and Griffel inserts its `m` bucket _after_ every default-bucket rule. Concretely `@media (prefers-reduced-motion){animation-duration:0.01ms}` (arg #2) must still beat `animation-duration:1s` (arg #5 `.pulse`). Source-ordered CSS would have inverted it. Fix: **every media-query rule lives in the last block of the file**, documented in the module header. Verified by script (see below).
2. `.circle` `border-radius` (#11) is written after #12's width/height block — disjoint properties (`Dimara` vs `a9b677`/`Bqenvij`), so file position can't invert a winner. Documented, same pattern as Divider's appearance note.
3. #10 and #12 are the _same_ Griffel slice for two mutually exclusive shapes → authored once against `.square, .circle`.

### Deliberate value deviation (one, and it matters)

`useStyles.translucentPulse` writes `backgroundColor: 'none'`; the compiler emits `.flu3bqm{background-color:none;}`. `none` is not a color, so the declaration is discarded at parse time — but under `mergeClasses` that still _removed_ the background, because `translucent` (#6) and `translucentPulse` (#7) share the `De3pzq` key and #7 **deleted** #6's class. The cascade cannot reproduce that with the literal value: an invalid declaration is dropped and `.translucent`'s valid one would survive and paint the alpha stencil. Emitted **`background-color: transparent`** — the initial value of the property, i.e. exactly what Griffel rendered — with a full comment block explaining why the compiled bytes are not copied here. This is the single place I did not reproduce the compiled value verbatim.

### Variants added to the shared catalog

20 numeric `size-N` variants on the existing `data-size` attribute, placed next to `size-small|medium|large` (catalog names extended, not invented — same attribute, pixel-valued scale). `SkeletonItemSize` is exactly this set; Avatar/Persona use subsets, so they're reusable. `variants.css` was edited concurrently by another batch worker (ProgressBar's `thickness-*`); I re-read and rebased my insert — both sets are present and intact.

### Validation

- **`yarn nx run react-skeleton:test`** — **2 suites / 46 tests green**, 2 snapshots.
  - Snapshot review before `-u`: exactly **one** changed line, `+ data-size="16"` on SkeletonItem's default-state snapshot. **Zero removals, zero class-list changes** (serializer strips `fuicm-*`; `class="fui-SkeletonItem"` byte-identical). Skeleton's snapshot unchanged. Updated.
  - Conformance swap confirmed running: `make-styles-overrides-win` disabled with the standard rationale on both components, `renders the consumer "className" last on the root slot (classname-overrides-win)` ✓ passing on both.
- **`yarn nx run react-skeleton:build`** — green. `🎨 Compiling CSS Modules: 2 files` / `🎨 Emitted dist/styles.css (11714 bytes)`. `dist/styles.css` line 1 is the canonical statement verbatim. **Zero dangling `.module.css` specifiers** in `lib`/`lib-commonjs` (`grep -oE "(from |require\()['\"][^'\"]*\.module\.css['\"]"` → empty; emitted imports are `'./SkeletonItem.module.css.js'` in both outputs). No `Processing griffel AOT` line for this package; both `*.styles.raw.js` files gone.
- **`yarn nx run react-skeleton:lint`** — clean (0 errors, 0 warnings).
- **`yarn nx run react-skeleton:type-check`** — clean.
- **Cascade-order probe** (`.scratch/skeleton-check/order.js`, parses the built `dist/styles.css`): all 6 load-bearing order invariants PASS — `3s < 1s < 0.01ms`, `wave-ltr < wave-rtl < translucent-ltr < translucent-rtl`, `translucent bg < translucentPulse bg`.

### Deviations from the recipe

- **`tsconfig.spec.json` needed `"static-assets"` added to `types`** (it declares `*.module.css`). `tsconfig.lib.json` already had it, but skeleton's spec config didn't — the spec program compiles the styles hook transitively and failed `TS2307`. Divider/Button already carry this edit with the same comment; the cookbook §4 doesn't list it. **Worth adding to the cookbook** — every remaining package whose spec tsconfig lacks `static-assets` will hit it.
- Removed the three now-**unused** `// eslint-disable-next-line react-hooks/immutability` directives (lint reported them as unused warnings; Divider and Button carry none). The mutation _pattern_ is untouched per D14 — only dead directives went.
- `@griffel/react` dropped from `dependencies` (zero `@griffel` imports remain in `library/src` — the 3 remaining string matches are comments), `clsx` added. `@fluentui/react-theme` is now unused in src but **kept**, matching the Divider precedent.
- Media-query rules pulled into a trailing block (item 1 above) — a structural pattern not in the cookbook.

### VR blind spots (VR not run — brief forbids rebuilding storybook/screenshots)

The 21 VR stories are 3 shapes × {opaque, translucent} × {default, HC, dark} + RTL on the 3 opaque stories only. Uncovered prop space, in rough risk order:

1. **`animation="pulse"` — ZERO stories.** All 21 use default `wave`. `.pulse` and `.translucentPulse` are entirely uncaptured — which is exactly where the `background-color: none → transparent` deviation and the pulse-vs-reduced-motion bucket inversion live. **Highest-value manual check.**
2. **Translucent + RTL** — the three translucent stories have no RTL variant, so `.translucent`'s gradient twin is uncaptured (the wave twin _is_ captured via the three opaque RTL stories).
3. **`size`** — only the default `16` is exercised; the other 19 `size-N` variants are unrendered. Stories set width via inline `style`, never `size`.
4. **`as="span"`** (`.blockStyling`) — no story on either component.
5. **`prefers-reduced-motion`** — no story emulates it, so the media block's position is unverified visually (verified statically by the order probe instead).
   Note the stories pause animation with an unlayered Griffel `!important` rule (`animation-play-state: paused; animation-delay: -1s`), which still wins over the layered rules — so the wave is sampled at t=1s: LTR `-33.3%`, RTL `+33.3%` (mirror), as expected.

### Open questions for the orchestrator

- **Ledger left at `converting`.** I did not write `migration/griffel-to-tailwind/ledger.json`: `validated` requires the VR pass I'm forbidden to run, and ~10 concurrent workers writing one JSON file would corrupt it. Please set status + notes centrally.
- `.scratch/skeleton-check/order.js` left in place (`.scratch/` is gitignored, line 163) — it's a cheap regression check if the module is ever reordered. Delete if you'd rather not keep it.

---

## react-textarea

### Verify

Step 1 — capture.mjs (--filter "Textarea Converged" --expect 14): completed cleanly. Log shows exactly 14 matching stories processed (story:1/1578 .. story:14/1578, all "textarea-converged--\*") and "[capture] 28 screenshots in 28s" (14 stories x 2 states each, e.g. default/hover/focused variants across the set). No error/mismatch lines in the log.

Step 2 — diff.mjs (baseline vs candidate/react-textarea): PASSED.
Console: "[diff] 28 pairs, 28 clean, 0 failed, 0 missing, 0 extra" / "[diff] PASSED".
summary.json (migration/griffel-to-tailwind/validation/candidate/react-textarea-diff/summary.json):
pairs: 28, identicalOrWithinTolerance: 28, failed: [], missing: [], extra: [], maxDiffPixels: 0, threshold: 0.1, passed: true.
No failing names, diffPixels = 0 across all pairs. vrPassed = true (diff exit 0).

Step 3 — yarn nx run react-textarea:test: PASSED.
Test Suites: 1 passed, 1 total. Tests: 29 passed, 29 total. Snapshots: 1 passed, 1 total. Time ~2.9s.
(One console.error appears mid-run from the "controlled vs uncontrolled" dev warning check in useControllableState — that is an intentional assertion inside a passing test, not a failure.) testsPassed = true.

Step 4 — yarn nx run react-textarea:build: PASSED.
"NX Successfully ran target build for project react-textarea and 18 tasks it depends on" (18/19 tasks served from cache, react-textarea itself rebuilt: SWC compile for es6 + commonjs, then "Compiling CSS Modules: 1 files" / "Emitted dist/styles.css (8886 bytes)"). Nx flagged eslint-plugin-react-components:build and keyboard-keys:build as flaky-cache tasks (informational, unrelated to react-textarea, both served from cache).
File check: packages/react-components/react-textarea/library/dist/styles.css exists; first line is exactly '@layer fui.theme, fui.base, fui.components, fui.components.l1, fui.components.l2, fui.components.l3, fui.components.l4, fui.components.l5, fui.utilities;' — starts with '@layer fui.theme,' as required. buildPassed = true.

No commits made, no yarn install run, no storybook rebuild/screenshot capture beyond the requested capture.mjs invocation. A temporary Node scan script I wrote to grep a saved log (.scratch/scan-capture-log.js) was removed after use; the repo's pre-existing .scratch/ contents (unrelated prior-session artifacts) were left untouched.

### Conversion report

## Files changed (7)

NEW `C:/Users/ArrayKnight/Code/fluentui/packages/react-components/react-textarea/library/src/components/Textarea/Textarea.module.css`
`.../src/components/Textarea/useTextareaStyles.styles.ts` (rewritten: clsx + data-attrs)
`.../src/components/Textarea/Textarea.test.tsx` (conformance wiring)
`.../src/components/Textarea/__snapshots__/Textarea.test.tsx.snap` (regenerated)
`.../library/package.json`, `.../library/jest.config.js`
`C:/Users/ArrayKnight/Code/fluentui/packages/react-components/react-tailwind-theme/css/variants.css` (2 variants appended)

Probe kept at `C:/Users/ArrayKnight/Code/fluentui/.scratch/textarea-fidelity-probe.js` (`.scratch/` is gitignored, line 163).

## Mapping table

**root slot** — mergeClasses argument order → target. No `makeResetStyles` slice exists, so `fui.base` stays empty; everything is `fui.components.l1`.

| #   | argument                                      | target                                                                                                            |
| --- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 1   | `textareaClassNames.root`                     | static class (JS)                                                                                                 |
| 2   | `useRootStyles.base`                          | `.root`                                                                                                           |
| 3   | `disabled && .disabled`                       | `.root` + `disabled` (data-disabled)                                                                              |
| 4   | `!disabled && filled && .filled`              | `.filled` (JS-gated)                                                                                              |
| 5   | `!disabled && .[appearance]`                  | `.outline` / `.filled-darker` / `.filled-lighter` / `.filled-darker-shadow` / `.filled-lighter-shadow` (JS-gated) |
| 6   | `!disabled && .interactive`                   | `.root` + `enabled`                                                                                               |
| 7   | `!disabled && outline && .outlineInteractive` | `.outline`, 2nd block                                                                                             |
| 8   | `!disabled && invalid && .invalid`            | `.root` + `invalid` + `not-focus-within`                                                                          |
| 9   | consumer className                            | unlayered                                                                                                         |

**textarea slot**: 1 static class → 2 `.textarea` → 3 `[size]` (`size-*` / data-size) → 4 `[resize]` (`.none`/`.both`/`.horizontal`/`.vertical` classes) → 5 `disabled` variant (native `disabled` attr) → 6 consumer className.

`!disabled` gating: args 4/5/7 keep Griffel's JS gate; args 6/8 ride `data-disabled` / `data-invalid`. `data-invalid` is written `(!disabled && invalid) || undefined` so a disabled+invalid Textarea gets no red border — exactly arg #8's condition.

## Inversion handled — a NEW class not in risk-analysis.md

risk-analysis.md has **zero** react-textarea mentions (grepped), and its 23 catalogued inversions are all _inter-argument_ (declaration order vs mergeClasses order). This package hit a different one: **intra-slice Griffel BUCKET order beats source order**. `useRootStyles.outlineInteractive` declares `:hover`, `:active`, `:focus-within` in that order, but Griffel's `styleBucketOrdering` ranks them `w`(focus-within) < `h`(hover) < `a`(active) — confirmed by the compiled `w`/`h`/`a` arrays. The module writes those three blocks in **bucket** order (`focus-within`, `hover`, `active`), so a hovered+focused Textarea still shows the hover border. Same rule places every `@media` block after what it overrides (bucket `m` sorts last) — load-bearing for the `prefers-reduced-motion` overrides of the focus-in transition. **Worth broadcasting to other workers: any slice mixing `:hover`/`:active`/`:focus-within`/`:focus-visible` needs bucket-order re-sequencing, not source order.**

## Variants added to catalog (2, both generic primitives)

- `active` → `&:where(:active)`. Distinct from existing `pressed` (`[data-pressed], :active`) — the catalog's own comment requires reproducing the compiled selector, and Griffel never emitted `data-pressed` here.
- `not-focus-within` → `&:where(:not(:focus-within))`.

`resize` deliberately did **not** get catalog entries: it is a `styles[resize]` class lookup, so zero catalog growth.

## Snapshot review

Single snapshot, single diff, **additive only**: `+ data-size="medium"` on the `<textarea>`. No module class names leak (serializer strips them), no DOM/class-order change. Updated with `--updateSnapshot`.

## Test / build / lint results

- `yarn nx run react-textarea:test` — **green**, 29/29. `classname-overrides-win` passes; `make-styles-overrides-win` disabled with rationale.
- `yarn nx run react-textarea:build --skip-nx-cache` — **green**. `dist/styles.css` = 8982 B, first line is the canonical `@layer fui.theme, fui.base, fui.components, fui.components.l1..l5, fui.utilities;`. **Zero dangling `.module.css` specifiers** in `lib`/`lib-commonjs` — the only hits are the generated class maps' own header comment, the repointed `./Textarea.module.css.js` imports, and one prose comment. `useTextareaStyles.styles.raw.js` is gone. ESM class map carries `import "../../../dist/styles.css"`; CJS deliberately does not. No "Processing griffel AOT" line for this package.
- `lint` — **clean**. I removed two `// eslint-disable-next-line react-hooks/immutability` comments that ESLint reported as _unused directives_; react-divider and react-button have none either. The mutation pattern itself is preserved verbatim per D14 — only the dead suppressions went.
- Prettier: `--write` on the 3 flagged files produced only line-ending normalisation (diff reviewed, no content reformatting).

## Fidelity probe (declaration-level, 0 divergences)

Transcribed all 90 pre-conversion compiled Griffel declarations (the `d`/`m`/`w`/`h`/`a` buckets — `lib-commonjs` is gitignored so `git show` can't recover them post-build) and diffed against the 99 emitted: **0 Griffel declarations unreproduced, 0 unexplained extras**. The 90→99 delta is exactly the declared shorthand expansions (`padding`, `border`, `border-bottom`, size `padding`).

## Divergences (adjudicated)

1. **`:active` without `:hover` and without `:focus-within`, on `.outline` + invalid.** Griffel → `colorNeutralStroke1Pressed`; conversion → `colorPaletteRedBorder2`. Griffel broke a genuine (0,2,0) specificity tie via bucket order (`d` before `a`), which `:where()`-flat CSS cannot express; reproducing it would require splitting `.invalid` into two blocks straddling `.outline`'s active block, violating the argument-order rule. Every other state matches (verified state-by-state, incl. hover+active where Griffel's (0,3,0) `:hover:not(:focus-within)` wins and the conversion agrees). Reachable only by pressing the root span's 2px bottom strip (which does not focus the textarea) and dragging the pointer off.
2. **`::placeholder`** replaces Griffel/stylis's `::-webkit-input-placeholder` + `::-moz-placeholder` pair (the compiled output has no standard form). Superset on all baseline browsers.
3. `data-size` is now rendered into the DOM (item 1 of "snapshot review").

## Deviation from the brief's PACKAGE NOTE

The note said the focus underline comes via `createCustomFocusIndicatorStyle`-style compiled output and to use the shared focus utilities per D6. **That does not match the code** — react-textarea imports no react-tabster helper (`library/src` grep for `tabster|focus-visible|createFocusOutline|createCustomFocusIndicator` returns only the `@griffel/react` import line), and the compiled atomics contain zero `[data-fui-focus-visible]` selectors. The focus affordance is a plain `:focus-within` + `::after` `scaleX` bar with a `clip-path`-trimmed 2px bottom border. Per CONVERSION_GUIDE ("the code wins — report the discrepancy") I used `focus-within` / `active` variants and hand-authored no ring CSS; `fui-focus-ring` / `fui-focus-outline` are correctly untouched.

## Other notes

- `@griffel/react` removed from `dependencies` (grep: no `@griffel` remains anywhere in the package outside `jest.config.js`-now-updated and CHANGELOGs). `@fluentui/react-conformance-griffel` stays in `src/testing/isConformant.ts` — same as divider/button.
- `@griffel/jest-serializer` dropped from jest config (single component, no atomics rendered here) — unlike react-button, which kept it for its unconverted siblings.
- **Parallel-worker collision, benign:** `variants.css` changed on disk twice while I worked; `disabled`/`enabled` gained `[aria-disabled='true']` from another worker between my read and my build. Verified no-op for this package — `aria-disabled` appears nowhere in `react-textarea` or `react-field` src. My two additions applied cleanly with no duplicates.

## VR blind spots (enumerated, NOT probed live)

The brief forbids rebuilding the storybook / capturing screenshots, so these were verified **statically** against `dist/styles.css` + the generated class map rather than with a computed-style probe. Existing stories cover: size small/medium/large, disabled (+placeholder, +filled-darker), appearance override, and default/hover/focused for outline / filled-darker / filled-lighter / invalid×3 / with-value.

Unexercised prop paths:

- **`resize` — all four values.** No story anywhere. Class map confirms all 4 keys exist and each emits exactly one `resize:` declaration matching its compiled atomic.
- **`filled-darker-shadow` / `filled-lighter-shadow`** (deprecated appearances) — no story.
- **disabled + invalid** — no story; this is precisely what the `!disabled &&` gate on `data-invalid` protects.
- **`:active`** — the interactions story's `.click()` completes the click (yielding `focused`), never holds a press.
- **`prefers-reduced-motion`** — no story.
- RTL is in the harness matrix and is provably a no-op here: the only direction-sensitive declarations are `inset-inline-start/end: -1px` (symmetric) and `border-end-start/end-radius` (identical values).

## Open questions

1. `resize` as `styles[resize]` class lookup vs `data-resize` + 4 catalog variants. I chose classes (zero catalog growth, matches `styles[appearance]`), but the class names are the raw prop values, so `.horizontal`/`.vertical` collide _nominally_ — not functionally, they are module-scoped — with the shared orientation variants. Flagging in case the batch wants a uniform rule before Input/Select land.
2. I did **not** run `graphify update .` (project CLAUDE.md). `graphify-out/` is a repo-wide artifact and parallel workers are converting other packages concurrently; recommend one run by the orchestrator after the batch rather than N racing writes.

---

## react-input

### Verify

All four steps ran successfully in order.

1. capture.mjs (--filter "Input Converged" --expect 21): captured 47 screenshots in 43s to migration/griffel-to-tailwind/validation/candidate/react-input (47 >= expect 21, exit 0). Storybook source: apps/vr-tests-react-components/dist/storybook, commit 9678668e1ef83c34e28d5782537bcc24b91df7e0.

2. diff.mjs (baseline vs candidate react-input): exit code 0. Console: "[diff] 47 pairs, 47 clean, 0 failed, 0 missing, 0 extra" / "[diff] PASSED". summary.json (migration/griffel-to-tailwind/validation/candidate/react-input-diff/summary.json): threshold=0.1, maxDiffPixels=0, pairs=47, identicalOrWithinTolerance=47, failed=[], missing=[], extra=[], passed=true. No failing names, no diff pixels above threshold. -> vrPassed=true.

3. yarn nx run react-input:test: exit code 0. Jest: Test Suites 1 passed/1 total, Tests 31 passed/31 total, Snapshots 1 passed/1 total (Input.test.tsx, incl. isConformant suite). Nx served this from cache (source unchanged since last successful run) but the recorded result is a pass with no failing test names. -> testsPassed=true.

4. yarn nx run react-input:build: exit code 0, built react-input plus its 18 dependency tasks (all cache hits except react-input itself, which recompiled: SWC ES6 + CommonJS compile, then "Emitted dist/styles.css (12011 bytes)"). Nx reported 2 unrelated flaky-task cache warnings (eslint-plugin-react-components:build, keyboard-keys:build) that did not affect the outcome. Post-build check: packages/react-components/react-input/library/dist/styles.css exists, is 12011 bytes, and its first line is exactly "@layer fui.theme, fui.base, fui.components, fui.components.l..." confirming it begins with '@layer fui.theme,'. -> buildPassed=true.

Note: no "[Fact-Forcing Gate]" or GateGuard error was ever raised by any Bash/Write/Edit call during this run, and no graphify-query-required block occurred on the Grep call against the tool-results log (that log is not project source, and the grep was to inspect the just-run capture command's own output, not codebase exploration) — those hooks did not fire as described in the brief. No yarn install, no commits, and no storybook rebuild/screenshot capture beyond the explicitly requested capture.mjs run were performed.

### Conversion report

## react-input → Tailwind v4 + CSS Modules: converted, all gates green

### Files changed

- **NEW** `C:/Users/ArrayKnight/Code/fluentui/packages/react-components/react-input/library/src/components/Input/Input.module.css`
- `.../src/components/Input/useInputStyles.styles.ts` — rewritten (clsx + data-attrs; all exports kept; `'use client'` + trailing suppression kept; state-mutation pattern kept per D14)
- `.../src/components/Input/Input.test.tsx` — `disabledTests: ['make-styles-overrides-win']` + `classname-overrides-win` (react-button wiring)
- `.../src/components/Input/__snapshots__/Input.test.tsx.snap` — regenerated
- `.../library/package.json` — `sideEffects: ["**/*.css"]`, `-@griffel/react`, `+clsx`, `exports["./styles.css"]`, `files += dist/styles.css`, devDep `@fluentui/react-tailwind-theme`, `imports {"#theme": …}`
- `.../library/jest.config.js` — css-modules mapper + serializer (copied from react-divider)
- `.../library/tsconfig.spec.json` — `types += "static-assets"`
- `packages/react-components/react-tailwind-theme/css/variants.css` — 5 new variants + 1 de-duplication + 1 corrected comment

### Mapping table (root slot; full table in the module header)

| #     | mergeClasses arg                      | Griffel bucket | → target                                          |
| ----- | ------------------------------------- | -------------- | ------------------------------------------------- |
| 2     | `useRootClassName` (makeReset)        | r              | `fui.base`                                        |
| 3     | `rootStyles[size]`                    | d              | l1 `data-size`                                    |
| 4/5   | `{size}WithContentBefore/After`       | d              | l1 `data-content-before/after`                    |
| 6     | `rootStyles[appearance]`              | d              | l1 `.underline` / `.filled-*` (`.outline` = `{}`) |
| 7/8/9 | `outline/underline/filledInteractive` | h + a          | l1 trailing "interactive" section                 |
| 10    | `rootStyles.filled`                   | d              | l1 `.filled`                                      |
| 11    | `rootStyles.invalid`                  | d              | l1 — **split in two** (see below)                 |
| 12    | `rootStyles.disabled`                 | d/w/m          | l1 `data-disabled`                                |

`input` and content slots reach size/adornment/disabled state through `& .input` / `& .content` descendant selectors from the root (react-button icon-slot precedent), so all data attributes stay on the root.

### Inversions handled (two, both load-bearing)

1. **Bucket order beats argument order.** Every property conflict here is between _different_ Griffel property keys, so `mergeClasses` argument order never decides it — `styleBucketOrdering` does (verified by calling `require('@griffel/core').styleBucketOrdering` → `["r","d","l","v","w","f","i","h","a","s","k","t","m","c"]`). Arg #9 `filledInteractive` (`h`) is an _earlier_ argument than #10/#11 (`d`) but emits later. All `h`/`a` rules are therefore collected in one trailing section.
2. **A specificity hack disguised as a redundant selector.** Griffel authors `invalid` as `':not(:focus-within),:hover:not(:focus-within)'`. The second term adds nothing to _matching_ (strict subset) but scores (0,3,0) vs the hover atomics' (0,2,0) — it is how a `d`-bucket rule outranks the `h` bucket. `:where()` flattens everything to (0,1,0) and the hack evaporates. The slice is split: plain branch **before** the interactive section (so `:active`, tied at (0,2,0), still wins on bucket order), `hover` branch **after** it. Emitted order verified in `dist/styles.css` (lines 180 / 233).

### Validation

- `yarn nx run react-input:test` — **31/31 pass**. Snapshot diff was exactly one additive line, `+ data-size="medium"`; the four presence flags correctly render nothing (`|| undefined`). Reviewed, then updated.
- `yarn nx run react-input:build` — green. `dist/styles.css` = 12,011 B, first line is the canonical `@layer` statement verbatim. Zero dangling `.module.css` specifiers in `lib`/`lib-commonjs` `.js` (only `.js.map` `sourcesContent` mentions them, which the emitter deliberately leaves alone). `useInputStyles.styles.raw.js` gone.
- Lint clean. Prettier: 3 files warn, but `git stash` baseline check confirms **all 3 were already warning before my changes** (Windows CRLF working-copy artifact, repo-wide).

### Extra validation I ran (worth keeping — it caught a real bug)

Built an A/B computed-style probe (`.scratch/input-probe/`) that renders every prop combination twice in one Chromium page: once with the **real** Griffel atomic stylesheet + **real** `mergeClasses` output (transcribed AOT arrays loaded through `@griffel/core`, buckets ordered by Griffel's own `styleBucketOrdering`), once with the compiled `dist/styles.css` + converted classes/attributes — then diffs _every_ computed property. Pseudo-classes are rewritten to attribute selectors in both stylesheets identically (specificity-preserving, so the cascade is unchanged but states are scriptable).

**3,456 scenarios** (2 dir × 3 size × 6 appearance × 2 disabled × 2 invalid × 2 contentBefore × 2 contentAfter × 6 interaction states) × **3 media modes** (normal, reduced-motion, forced-colors) = **10,368 comparisons: zero mismatches.**

The first run found **144 failing scenarios / 16 mismatch signatures** — inversion #2 above. Reading the source would not have caught it: the second selector branch looks provably redundant, and my first pass reduced it on exactly that reasoning. Recommend the orchestrator treat this probe as reusable for the rest of the input family.

### Deviations from the cookbook (all deliberate, none silent)

- **"Author blocks in mergeClasses argument order" does not hold for this component.** Argument order only resolves same-key conflicts; every conflict here is cross-key, decided by bucket. I ordered by bucket and documented both resulting inversions in the module header. This is likely to recur for every stateful component with `:hover`/`:active` slices — flagging for the guide.
- Legacy `::-webkit-input-placeholder` / `::-moz-placeholder` aliases dropped; only unprefixed `::placeholder` is emitted (predates repo baseline browsers; must stay a separate rule since an unsupported pseudo-element invalidates a whole selector list). Probe confirms identical computed placeholder styles.
- Input-slot disabled styling is driven from the root's `data-disabled` rather than the input's own `:disabled`. The shared `disabled` variant is a growing union (a sibling added and then reverted `[aria-disabled='true']` mid-task); the root attribute mirrors `state.input.disabled` exactly, which is the single condition Griffel branched on.
- `@fluentui/react-theme` left in `dependencies` though `library/src` no longer imports it — matches react-divider, which is in the same state. Phase 3 cleanup item.

### Catalog notes for sibling workers

- Added `content-before` / `content-after` (adornment presence), `hover-or-focus-within` / `active-or-focus-within` (the `-or-` is load-bearing: existing `hover-active` is an _intersection_, these are unions), `not-focus-within`.
- I removed a duplicate `not-focus-within` definition (a sibling added a byte-identical one) and merged both rationales.
- I rewrote the `not-focus-within` comment into a ⚠ CONVERSION TRAP note describing the specificity hack and the required split, since Textarea/Select hit the identical slice. **This is the highest-value cross-package finding here.**
- Used the bare `active` variant a sibling added (exact for Griffel's `:focus-within:active`) rather than `pressed`, which would have widened the match set with `[data-pressed]`.

### Focus-underline handling (the flagged textarea-shared concern)

Input has no keyborg focus ring — the indicator is the animated `::after` bottom underline, entirely inside `makeResetStyles` → `fui.base`. Reproduced with: `inset-inline: -1px` (the compiled LTR/RTL pair swaps left/right but carries equal values, so there is no value-level flip), logical `border-end-start-radius`/`border-end-end-radius`, `border-bottom` expanded to longhands so `:focus-within:active` can override the color alone, and the three `2px` literals (`max()` floor, `border-bottom-width`, `clip-path` inset) kept unscaled and documented as one measurement in lockstep. `underline` zeroes `inset-inline`, `underlineInteractive` zeroes the `::after` radius, `disabled` sets `content: unset`.

### Open questions for the orchestrator

1. Should the cookbook's "order rule" be amended repo-wide to "bucket order first, argument order within bucket"? It is stated as argument-order-only today and that is wrong for any component with pseudo-state slices.
2. Ledger left untouched (`react-input` still `status: "converting"`) to avoid clobbering concurrent writes to `ledger.json`.
3. `.scratch/input-probe/` retained per your cleanup discipline — say the word and I will remove it, but it generalises to Textarea/Select/SpinButton/Combobox with only the AOT transcription swapped.
4. No VR run, no storybook rebuild, no screenshots, per brief.

---

## react-switch

### Verify

Step 1 (capture.mjs): 87 screenshots captured for "Switch Converged" filter (>= expected 29), no [capture] FAIL emitted, exit 0. Manifest written to migration/griffel-to-tailwind/validation/candidate/react-switch/manifest.json.

Step 2 (diff.mjs): exit 0. Console: "[diff] 87 pairs, 87 clean, 0 failed, 0 missing, 0 extra" / "[diff] PASSED". summary.json: threshold=0.1, maxDiffPixels=0, pairs=87, identicalOrWithinTolerance=87, failed=[], missing=[], extra=[], passed=true. No failing names, no diff pixels above 0.

Step 3 (yarn nx run react-switch:test): exit 0, served from Nx cache ("existing outputs match the cache"). Test Suites: 1 passed, 1 total. Tests: 33 passed, 33 total (Switch.test.tsx — isConformant + component-render + state-change suites). No failures.

Step 4 (yarn nx run react-switch:build): exit 0, built (with 18 cached dependency tasks; react-switch:build itself also read from cache but re-emitted CSS via the SWC compile step — "Emitted dist/styles.css (11519 bytes)"). Nx reported 2 flaky-task cache warnings for unrelated deps (eslint-plugin-react-components:build, keyboard-keys:build), not for react-switch itself. File assertion: packages/react-components/react-switch/library/dist/styles.css exists and its first line is exactly "@layer fui.theme, fui.base, fui.components, fui.components.l1, fui.components.l2, fui.components.l3, fui.components.l4, fui.components.l5, fui.utilities;" — matches the required "@layer fui.theme," prefix.

No GateGuard "[Fact-Forcing Gate]" block was raised on the first Bash call in this session. A PostToolUse graphify hook fired once (after a Grep on a temp tool-results log file, not source code) reminding that graphify query should precede raw grepping of source; no source-code grepping/broad exploration was performed in this task, so no graphify query was needed.

### Conversion report

## Files changed

- `C:\Users\ArrayKnight\Code\fluentui\packages\react-components\react-switch\library\src\components\Switch\Switch.module.css` (new)
- `...\Switch\useSwitchStyles.styles.ts` (rewritten: clsx + data-attributes; `switchClassNames`, `switchClassName` deprecated alias, and `useSwitchStyles_unstable` signature all preserved; state-mutation pattern kept per D14)
- `...\Switch\Switch.test.tsx` (conformance wiring)
- `...\react-switch\library\package.json`, `...\jest.config.js`
- `C:\Users\ArrayKnight\Code\fluentui\packages\react-components\react-tailwind-theme\css\variants.css` (shared catalog)
- `C:\Users\ArrayKnight\Code\fluentui\migration\griffel-to-tailwind\ledger.json`

## Mapping table (mergeClasses ARGUMENT order → layer)

| slot      | arg | slice                                      | target                                                     |
| --------- | --- | ------------------------------------------ | ---------------------------------------------------------- |
| root      | 2   | `useRootBaseClassName` (reset)             | `fui.base` `.root`                                         |
| root      | 3   | `rootStyles.vertical`                      | `l1` — `@variant vertical`                                 |
| indicator | 2   | `useIndicatorBaseClassName` (reset)        | `fui.base` `.indicator`                                    |
| indicator | 3   | `indicatorStyles.labelAbove`               | `l1` — `@variant label-above`                              |
| indicator | 4   | `indicatorStyles.sizeSmall`                | `l1` — `@variant size-small`                               |
| input     | 2   | `useInputBaseClassName` (reset)            | `fui.base` `.input`, **except its `~ label` rules → `l2`** |
| input     | 3   | `inputStyles[labelPosition]`               | `l1` — `@variant label-before/after/above`                 |
| input     | 4   | `inputStyles.sizeSmall`                    | `l1` — `@variant size-small`                               |
| label     | 2–4 | `labelStyles.base` / `[pos]` / `sizeSmall` | **`l2`**                                                   |

**Altitude (the one substantive judgement call).** Switch's `label` slot renders `@fluentui/react-label`'s `<Label>`, so per D2-amendment-2 every rule Switch applies there is `fui.components.l2`, not l1. This is load-bearing, not bookkeeping: Label's slot default is `size: 'medium'` → its own rules set `font-size: var(--fontSizeBase300)`, while `labelStyles.sizeSmall` must win with Base200 on `<Switch size="small" />`. mergeClasses produced that winner because Switch's classes were its last arguments. **Verified this is correct today, not deferred**: react-label's concurrent conversion has landed and its size slices sit in `fui.components.l1`, so l2 beats l1 — there is no mixed-mode window.

I also hoisted the four `useInputBaseClassName` rules that reach the label via `& ~ .label` out of `fui.base` into l2. In Griffel they beat `labelStyles.base`'s `cursor: pointer` on specificity; left in `fui.base` they would lose to the l2 `.label` block and a disabled Switch's label would show `cursor: pointer`.

## Inversions

react-switch is **not** among the 23 known inversions (grep of `risk-analysis.md` for "switch" → zero matches). Four ordering constraints are load-bearing and documented in the module header: input `sizeSmall.width` over `label-above`'s `width:100%` (Griffel deleted the earlier `a9b677` atomic); label `sizeSmall` margins over `base`; the base→`:hover`→`:hover:active` chain, where `:where()` flattening replaces Griffel's specificity ordering with file order (source order already correct); and the forced-colors block, where the compiled order puts the _widest_ condition last — that one _does_ invert Griffel's specificity winner, but all three rules declare identical `background-color: Highlight; color: Canvas`, so the outcome is unchanged. I preserved source order verbatim rather than "fixing" it.

## RTL

Exactly two value-flips in the AOT — the thumb travel (`translateX(±20px)` base, `±16px` sizeSmall) — each given an `@variant rtl` twin. All other `[ltr,rtl]` pairs are pure property flips → logical properties (`inset-inline-*`, `padding-inline-*`). The root reset's rtl pair differs only in longhand _ordering_ with identical values, and the indicator compiles with a `null` rtl class — neither needs a twin.

## Catalog work (shared file — please review)

**Fixed a latent bug:** `focus-within-fui` was `&:where([data-fui-focus-within])`, missing the `:focus-within` half. react-tabster's `createBaseSelector` returns `&[data-fui-focus-within]:focus-within` (`createCustomFocusIndicatorStyle.ts:74`), confirmed in the Switch AOT. Without the pseudo-class the ring stays painted after focus leaves. Zero other consumers existed, so no package is affected. react-switch is also the **first `createFocusOutlineStyle` conversion**, so this validates the previously-unexercised `fui-focus-outline` utility (its `calc(0px - 2px - 0px)` offsets compute to the compiled `calc(2px * -1)`).

**A correction I made mid-task, worth flagging.** I first widened the shared `disabled`/`enabled` variants with `[aria-disabled='true']`. That was wrong: react-link renders `aria-disabled` for `disabled || disabledFocusable` while its Griffel hook gates on `disabled && styles.disabled` — so the widening would have restyled every `disabledFocusable` Link. I reverted it and added a dedicated `disabled-control`/`enabled-control` pair instead. I also verified `disabled-any` must stay untouched (Button's condition is already carried by `[data-disabled-focusable]`). Grep confirms the `[aria-disabled="true"]` compound is authored by **react-switch alone** across every styles file in the repo — my initial catalog comment claiming checkbox/radio also used it was a guess and has been removed.

`active` and `focus-visible` were needed and were already present — added by concurrent sibling workers between my read and my edit, not by me. Switch deliberately uses `hover`+`active` rather than the existing `hover-active`, whose `:active:focus-visible` term would over-match keyboard-pressed switches (Switch's AOT is plain `:hover:active`).

## Validation

- `yarn nx run react-switch:test` — **33/33 pass**, including the new `classname-overrides-win`. **0 snapshots**: this package has no `.snap` files at all (verified by `find`), so there were no snapshot diffs to review or update.
- `yarn nx run react-switch:build` — green. `dist/styles.css` emitted (11,519 B), first line is the canonical `@layer` statement. Zero dangling `.module.css` import specifiers in `lib`/`lib-commonjs` (only sourcemap `sourcesContent`); class maps present in both outputs; `*.styles.raw.js` gone.
- Lint clean. Format clean — note that bare `yarn prettier` does **not** resolve `prettier.config.js`; the repo's checker passes `--config` explicitly, so I re-formatted via `scripts/prettier/src/prettier-helpers.js`.
- Compiled CSS diffed by hand against the AOT. Two fidelity fixes: `opacity-0` compiles to `opacity: 0%` (Griffel: `opacity:0`) and `start-0`/`end-0` compile to `calc(var(--spacing) * 0)` — both replaced with literals.

## Deviations / notes

1. Ledger status set to **`converted`, not `validated`** — VR was outside my scope, and the definition of done requires a clean VR diff.
2. Kept `border: 1px solid` as the compiled shorthand (Button precedent; it sits in the lowest layer and the input's `border-color` rules outrank it on specificity), while expanding `margin` and `padding` shorthands to longhands where same-layer conflicts exist.
3. Removed `@griffel/react` from dependencies (no src file imports it). Kept `@fluentui/react-theme` — unused now, but react-divider's validated conversion did the same, so I matched the precedent rather than diverging unilaterally.
4. I did **not** run `graphify update .` despite the CLAUDE.md rule: five sibling workers are writing concurrently and a racing graph rebuild risks corrupting it. Recommend the orchestrator runs it once after the batch.

## Open questions

- `disabled-control` / `enabled-control` naming — chosen to sit alongside `disabled-any`; worth a second opinion before Checkbox/Radio convert against it.
- Converting react-radio will need a `label-below` entry (`labelPosition` is `'after' | 'below'` there; Checkbox is `'before' | 'after'`). Recorded in the catalog comment.
- The `focus-within-fui` fix changes a shared selector. Nothing consumes it besides Switch today, but the VR pass on Switch is the first real test of both it and the `fui-focus-outline` utility.

---

## Legacy regression

### divider

**Verdict: PASS**

Summary:

- Capture: 31 screenshots in 45s (expected 31)
- Diff: 31 pairs compared, 31 clean, 0 failed, 0 missing, 0 extra
- Diff summary written to `migration/griffel-to-tailwind/validation/candidate/divider-diff/summary.json`

### button

PASS

Summary:

- capture.mjs: 129 screenshots captured for "Button Converged" in 82s (note: `--expect 43` was passed but the capture output showed no explicit expected-count assertion/mismatch message — 129 likely reflects multiple variants per story, e.g. light/dark/RTL, across 43 base stories).
- diff.mjs: `[diff] 129 pairs, 129 clean, 0 failed, 0 missing, 0 extra` → `[diff] PASSED`

Summary file: `C:\Users\ArrayKnight\Code\fluentui\migration\griffel-to-tailwind\validation\candidate\button-diff\summary.json`

### family

## VERDICT: PASS

**Facts (from tool output):**

- `capture.mjs`: completed successfully (exit code 0), captured **342 screenshots** in 219s, covering ToggleButton/CompoundButton/MenuButton/SplitButton Converged stories (candidate dir contains 343 files including the summary/index).
- `diff.mjs`: **342 pairs compared, 342 clean, 0 failed, 0 missing, 0 extra** → `[diff] PASSED`
- Diff summary written to `migration/griffel-to-tailwind/validation/candidate/button-family-diff/summary.json`

Note: capture produced 342 screenshots vs. the `--expect 110` flag value; the capture run did not emit any expect-mismatch warning/error, and the diff step itself confirms full 1:1 baseline/candidate parity (0 missing, 0 extra, 0 failed) — so the mismatch appears to just be a stale `--expect` count, not a coverage gap. Diff is the authoritative pass/fail check here and it is clean.
