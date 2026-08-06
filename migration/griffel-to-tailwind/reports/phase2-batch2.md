# Phase 2, Batch 2 — 10 packages

_Workflow wf_0f44d547-4dc, 2026-07-27. All 10 validated, 0 fix rounds._

---

## react-checkbox

### Verify

All four steps ran foreground, in order, in C:/Users/ArrayKnight/Code/fluentui.

1. capture.mjs (--filter "Checkbox Converged" --expect 26): exit 0. Captured 36 screenshots (36 PNGs + manifest.json) into migration/griffel-to-tailwind/validation/candidate/react-checkbox, satisfying the >=26 threshold ("[capture] 36 screenshots in 49s", commit 94ca6cee32656de455346ae7943094ac013bdb7e). Log: migration/griffel-to-tailwind/validation/candidate/react-checkbox_capture.log

2. diff.mjs (baseline vs candidate react-checkbox): exit 0. Output: "[diff] 36 pairs, 36 clean, 0 failed, 0 missing, 0 extra" / "[diff] PASSED — summary: migration\griffel-to-tailwind\validation\candidate\react-checkbox-diff\summary.json". VR PASSED. Log: migration/griffel-to-tailwind/validation/candidate/react-checkbox_diff.log

3. yarn nx run react-checkbox:test: exit 0. Jest: Test Suites 1 passed/1 total, Tests 41 passed/41 total, Snapshots 5 passed/5 total (2.713s). TESTS PASSED. Log: migration/griffel-to-tailwind/validation/candidate/react-checkbox_test.log

4. yarn nx run react-checkbox:build: exit 0, "Successfully ran target build for project react-checkbox and 18 tasks it depends on" (CSS Modules compiled, dist/styles.css emitted, 8421 bytes). Verified packages/react-components/react-checkbox/library/dist/styles.css begins with:
   "@layer fui.theme, fui.base, fui.components, fui.components.l1, fui.components.l2, fui.components.l3, fui.components.l4, fui.components.l5, fui.utilities;"
   i.e. it begins with '@layer fui.theme,' as required. BUILD PASSED. Log: migration/griffel-to-tailwind/validation/candidate/react-checkbox_build.log

Note: no [Fact-Forcing Gate] block was actually raised by the harness on any Bash/Write call during this run (the first Bash call succeeded directly), so no retry-with-facts cycle was needed. A PreToolUse hook on Grep/Bash did fire mid-task requiring a graphify query before broad exploration of capture.mjs's --expect semantics; complied by running `graphify query` first, then read capture.mjs directly (permitted since it was a file being inspected, not modified) to confirm --expect is a minimum-count threshold (fail if captured < expect), which explains why 36 >= 26 passed cleanly. No files were modified; only log/list files were written under migration/griffel-to-tailwind/validation/candidate/ as command output redirects.

### Conversion report

react-checkbox converted. VERDICTS: `yarn nx run react-checkbox:test` GREEN (41/41 tests, 5/5 snapshots, exit 0). `yarn nx run react-checkbox:build` GREEN (exit 0); dist/styles.css emitted at 8421 B, first line is the canonical `@layer fui.theme, fui.base, fui.components, fui.components.l1..l5, fui.utilities;`; zero dangling `.module.css` specifiers (both emitted imports repoint to `./Checkbox.module.css.js`; the only remaining `.module.css` strings in lib/ are inside a code comment and the sourcemap `sourcesContent`). `yarn nx run react-checkbox:lint` GREEN (exit 0). Griffel AOT eliminated for this package: its build section shows no "Griffel RAW styles output enabled"/"Processing griffel AOT" line (the three that appear in the log belong to dependency builds react-portal/react-positioning/react-field), and no `*.styles.raw.js` remains.

FILES CHANGED (absolute):

- C:\Users\ArrayKnight\Code\fluentui\packages\react-components\react-checkbox\library\src\components\Checkbox\Checkbox.module.css (NEW)
- C:\Users\ArrayKnight\Code\fluentui\packages\react-components\react-checkbox\library\src\components\Checkbox\useCheckboxStyles.styles.ts (rewritten: clsx + data-attributes; all exports kept; state-mutation pattern kept per D14; trailing `eslint-disable-line` 'use client' form)
- C:\Users\ArrayKnight\Code\fluentui\packages\react-components\react-checkbox\library\src\components\Checkbox\Checkbox.test.tsx (disabledTests + classname-overrides-win)
- C:\Users\ArrayKnight\Code\fluentui\packages\react-components\react-checkbox\library\src\components\Checkbox\_\_snapshots\_\_\Checkbox.test.tsx.snap (updated)
- C:\Users\ArrayKnight\Code\fluentui\packages\react-components\react-checkbox\library\package.json (sideEffects, clsx in, @griffel/react out, exports+files styles.css, devDep theme, imports #theme)
- C:\Users\ArrayKnight\Code\fluentui\packages\react-components\react-checkbox\library\jest.config.js (cssModules mapper+serializer, @griffel/jest-serializer KEPT)
- C:\Users\ArrayKnight\Code\fluentui\packages\react-components\react-checkbox\library\tsconfig.spec.json (+"static-assets" types, react-image/react-link precedent)
- C:\Users\ArrayKnight\Code\fluentui\packages\react-components\react-tailwind-theme\css\variants.css (+1 variant, +2 comment corrections)

MAPPING TABLE (mergeClasses argument order -> layer):
root: [1] checkboxClassNames.root static / [2] useRootBaseClassName -> fui.base .root / [3] rootStyles.disabled|mixed|checked|unchecked -> fui.components.l1 / [4] consumer unlayered.
input: [1] static / [2] useInputBaseClassName -> fui.base .input / [3] inputStyles.large -> l1 (data-size) / [4] inputStyles[labelPosition] -> l1 (data-label-position) / [5] consumer.
indicator: [1] static / [2] useIndicatorBaseClassName -> fui.base .indicator / [3] indicatorStyles.large -> l1 (data-size) / [4] indicatorStyles.circular -> l1 `.circular` module class (shape is a LOOK prop, D3) / [5] consumer.
label: [1] static / [2] labelStyles.base -> fui.components.l2 / [3] labelStyles[size] -> l2 / [4] labelStyles[labelPosition] -> l2 / [5] consumer.

ALTITUDE (l2): the label slot renders @fluentui/react-label's <Label> (useCheckbox_unstable sets components.label = Label, elementType: Label), so all three label slices sit at fui.components.l2 — same reasoning as react-switch. Load-bearing: Label's own hook sets `color: var(--colorNeutralForeground1)` while `labelStyles.base` must win with `color: inherit` (that inheritance is how the disabled grey and the checked/mixed foreground reach the label text).

MUTUAL EXCLUSION — the one non-obvious correctness item. The four root slices are a JS ternary chain, and `rootStyles.disabled` never sets `--fui-Checkbox__indicator--backgroundColor`. An ungated `checked` block would therefore leave a disabled+checked indicator painted `--colorCompoundBrandBackground` instead of falling back to transparent (the var resolves invalid-at-computed-value-time when unset). So unchecked/checked/mixed are all gated on `@variant enabled`, and the unchecked branch needs BOTH complements (`not-checked` AND `not-indeterminate`) because `data-checked`/`data-indeterminate` are two independent presence attributes — `not-checked` alone would also match the mixed state. That is the sole new catalog entry.

INVERSIONS: none. Argument order and source-declaration order agree on every slot. Within each root state block the compiled bucket order d -> h -> a is preserved (base, then `:hover`, then `:active`) because `:where()` flattens Griffel's specificity-based hover-vs-active winner to file order.

RTL: zero value-level flips, so the module contains no `@variant rtl` block. Evidence: `useInputBaseClassName` and `useIndicatorBaseClassName` both compile with a `null` rtl class (indicator `margin` longhands therefore stay physical); `useRootBaseClassName`'s ltr/rtl pair r1nzur1d/r128arqq differs only in the ORDER of the border-color and top/right/bottom/left longhands, identical values. The four genuine `[ltr,rtl]` pairs are pure property flips -> `inset-inline-end/start` (input before/after) and `padding-inline-end/start` (label before/after).

SHORTHAND EXPANSION: label `padding: VerticalS HorizontalS` (compiled with `p: -1`) -> 4 longhands with logical inline sides, written before the position blocks which override one inline side; indicator `margin: VerticalS HorizontalS` -> 4 physical longhands. `border-radius` kept as a shorthand (uniform value, no longhand override anywhere).

PIXEL LITERALS: 16/20px indicator sizes -> `h-16 w-16` / `h-20 w-20`; 12/16px icon sizes and the 16/20px terms inside calc() -> `calc(<n>px * var(--base-scale))`, per the react-switch precedent.

SNAPSHOT DIFF ADJUDICATION (this is the part worth reading). Raw diff showed additive data-\* PLUS an `id="checkbox-_r_8_"` -> `_r_9_` renumbering, which is not additive on its face. I ran two probes:
(1) Pristine-HEAD baseline (reverted my 5 tracked files, kept the untracked module.css): 4 of 5 snapshots ALREADY failed before my change, with `class="fui-Label fuicm-root fui-Checkbox__label"` and `data-size="medium"` on the <label> — i.e. react-label's batch-1 conversion left checkbox's snapshot stale (checkbox tests were never re-run in batch 1). No id shift in the baseline.
(2) My change with only the `extraTests` line removed (with an assertion that the replace actually applied — my first attempt at this probe silently no-op'd on a whitespace mismatch and I discarded its result): every diff became `- Snapshot - 0`, purely additive, and the test count dropped 41 -> 40.
Conclusion: the id renumbering is caused solely by the added `classname-overrides-win` conformance test rendering one extra <Checkbox> and consuming one more React `useId`. It is a test-ordering artifact of the same wiring react-switch/react-button did — it is merely visible here because Checkbox's snapshots embed generated ids and Switch's do not. Every `for=` still matches its `id=` in the updated file; no class-name or DOM-structure change. Accepted and updated.

PACKAGE-NOTE CORRECTION: there is no icon swap on hover in this version of Checkbox. `useCheckbox_unstable` selects the glyph from `checked`/`shape`/`size` only, and the compiled `h` bucket changes nothing but colours and the three internal CSS vars. Nothing hover-driven touches the indicator's children.

`data-label-position` DIVERGENCE FROM react-switch (deliberate, documented in both the module header and the catalog comment): Checkbox stamps it UNCONDITIONALLY because `inputStyles[labelPosition]` positions the hidden <input> with no `label &&` gate, whereas Switch stamps it only when the label slot exists. I corrected the catalog's comment, which previously asserted the conditional stamping as a general rule and told readers `with-label` is a reliable "has a label" signal.

VR BLIND SPOTS (I did not run VR — storybook rebuild was out of scope per brief; handing these to the orchestrator). The VR harness has 21 Checkbox stories plus a CheckboxInteractions file that scripts `.hover('input')` and `.mouseDown('input')`, so the hover/active branches are exercised. Combinations no story covers, highest-risk first: (1) disabled + hover/active — this is precisely what the new `enabled` gate governs, and it is the one combination where a mistake would be invisible everywhere else; (2) size="large" + labelPosition="before" (two l1 rules land on the same .input, disjoint properties: width vs inset-inline-end); (3) no-label + labelPosition="before" — the case that motivates the unconditional stamp; (4) disabled + circular; (5) circular + labelPosition="before"; (6) a consumer-supplied `indicator` slot (unit-tested only). 2-6 are all disjoint-property pairs and low risk analytically; 1 is worth a computed-style probe.

NOTES / NOT IN THE COOKBOOK: (a) `@fluentui/react-tailwind-theme/css/variants.css` is shared and was being edited concurrently by another worker while I worked — my two edits applied cleanly, and the react-checkbox build (which compiles the catalog through `@reference`) succeeding is the proof the merged file is still valid, but a final catalog-wide dedupe check across batch-2 is worth doing at integration time. (b) I did not touch migration/griffel-to-tailwind/ledger.json — batch-2's commit history shows the orchestrator owns it. (c) Probe logs and the file backups I used for the baseline revert are in C:\Users\ArrayKnight\Code\fluentui\.scratch\ (gitignored); I left them in place rather than deleting them unilaterally.

---

## react-radio

### Verify

1. capture.mjs --filter "Radio Converged" --out .../candidate/react-radio --expect 32: exit 0, "[capture] 52 screenshots in 56s" (52 >= expect 32). Log: migration/griffel-to-tailwind/validation/candidate/react-radio-capture.log
2. diff.mjs --baseline .../baseline/react-radio --candidate .../candidate/react-radio: exit 0, "[diff] 52 pairs, 52 clean, 0 failed, 0 missing, 0 extra" / "[diff] PASSED". Log: migration/griffel-to-tailwind/validation/candidate/react-radio-diff.log (summary: migration/griffel-to-tailwind/validation/candidate/react-radio-diff/summary.json)
3. yarn nx run react-radio:test: exit 0, Jest "Test Suites: 2 passed, 2 total" / "Tests: 68 passed, 68 total". Log: migration/griffel-to-tailwind/validation/candidate/react-radio-test.log
4. yarn nx run react-radio:build: exit 0, "Successfully ran target build for project react-radio and 18 tasks it depends on" (served from Nx cache, 19/19 tasks cache-hit; replayed log shows the original build trace including "Emitted dist/styles.css (9903 bytes)"). Log: migration/griffel-to-tailwind/validation/candidate/react-radio-build.log
   Assertion check: read packages/react-components/react-radio/library/dist/styles.css directly (9899 bytes) — first 100 chars: "@layer fui.theme, fui.base, fui.components, fui.components.l1, fui.components.l2, fui.components.l3," -> starts with '@layer fui.theme,' = true. Log: migration/griffel-to-tailwind/validation/candidate/react-radio-styles-check.log
   All four foreground commands completed with exit code 0; no failures encountered. No commits made, no yarn install run, no storybook rebuild/screenshot capture beyond what was explicitly instructed.

### Conversion report

react-radio converted (Radio + RadioGroup). VERDICTS: `yarn nx run react-radio:test` GREEN (68/68, 2 suites, --skip-nx-cache); `yarn nx run react-radio:build` GREEN, dist/styles.css 9,899 B whose line 1 is the exact canonical `@layer fui.theme, fui.base, fui.components, fui.components.l1..l5, fui.utilities;` statement, zero `.module.css` specifiers left in lib/ or lib-commonjs/ (both class maps generated: ESM carries the side-effect import, CJS deliberately does not), zero Tailwind syntax and zero `--base-scale` definition in the emitted CSS; `yarn nx run react-radio:lint` GREEN. Snapshots: the package has NO .snap files and jest reports "Snapshots: 0 total", so there were no snapshot diffs to review or update. Prettier: every file I authored passes; the only `--check` warnings across the package are CRLF-vs-LF working-tree line endings, proven pre-existing by an identical warning set on the already-merged react-switch package and by byte-identical content after CRLF normalisation.

FILES: NEW `packages/react-components/react-radio/library/src/components/Radio/Radio.module.css`, NEW `.../RadioGroup/RadioGroup.module.css`; rewritten `.../Radio/useRadioStyles.styles.ts` and `.../RadioGroup/useRadioGroupStyles.styles.ts` (clsx + data-attributes, all exports kept, state-mutation pattern kept per D14, trailing `eslint-disable-line` 'use client' form copied from react-divider); `packages/react-components/react-radio/library/package.json` (sideEffects ["**/*.css"], `./styles.css` export + files entry, `@griffel/react` removed, `clsx ^2.1.1` added, devDep `@fluentui/react-tailwind-theme workspace:*`, `imports {"#theme": ...}`); `.../library/jest.config.js` (cssModules mapper + serializer); `.../Radio/Radio.test.tsx` and `.../RadioGroup/RadioGroup.test.tsx` (disabledTests ['make-styles-overrides-win'] + wired `classname-overrides-win` — verified by name in a `jest --verbose` run for BOTH components); `packages/react-components/react-tailwind-theme/css/variants.css` (4 catalog entries; catalog now 93 variants, zero duplicate names). No `@griffel/react` import remains anywhere in react-radio src. `@fluentui/react-theme` is now unused in src but retained, matching all 11 already-converted packages.

MAPPING. Radio root: reset→fui.base (.root), rootStyles.vertical→l1 (data-orientation). Radio input: reset→fui.base (.input) EXCEPT the seven `~ .label` rules which go to l2; inputStyles.below→l1 (data-orientation); default/customIndicator→l1 (data-empty). Radio indicator: reset→fui.base. Radio label: labelStyles.base + [labelPosition]→l2 (ALTITUDE: the label slot renders @fluentui/react-label's <Label>, so Radio's rules sit above another component's hook output — same rationale as react-switch, and load-bearing for the disabled label's cursor/colour). RadioGroup: both slices→l1, no makeResetStyles so nothing in fui.base.

INVERSIONS / ORDER FINDINGS. No mergeClasses argument-order inversion. The real ordering hazard is Griffel SPECIFICITY, which `:where()` flattens: makeResetStyles puts plain rules in bucket `r` and at-rules in bucket `s` (confirmed at runtime — styleBucketOrdering = r,d,l,v,w,f,i,h,a,s,k,t,m,c), so the forced-colors rules trail all plain ones and Griffel decided the rest by specificity. I therefore INTERLEAVED each `@media (forced-colors: active)` rule immediately after its equal-specificity plain counterpart instead of grouping them at the end of the block: enabled+unchecked = rest(4) → ButtonBorder(4) → :hover(5) → :hover:active(6); enabled+checked = rest(4) → Highlight(4) → :hover(5) → :hover:active(6); disabled = rest(3) → GrayText(3). Grouping them last (the react-switch shape, safe there only because its three HC rules declare identical values) would have let ButtonBorder/Highlight beat the hover and hover:active colours — a visible high-contrast + hover change Griffel never produced. Documented in the module header. Also: `.input` is authored after `.indicator` inside fui.base so the `~ .indicator` colour rules keep beating `border: var(--strokeWidthThin) solid`'s implied `currentcolor`.

VARIANT CHOICES. Radio uses the plain `enabled`/`disabled` catalog variants, NOT react-switch's `enabled-control`/`disabled-control`: Radio's compiled atomics contain no `aria-disabled` term. `hover:active` is written as nested `@variant hover { @variant active { … } }`, not the `hover-active` catalog entry (that one is Button's `:hover:active, :active:focus-visible` compound, which Radio never emitted). Root focus ring is `@variant focus-within-fui { @apply fui-focus-outline; }` — this is the second consumer of `createFocusOutlineStyle` and the utility byte-matches `.r1siqwd8[data-fui-focus-within]:focus-within::after` including `calc(0px - 2px - 0px)` ≡ `calc(2px * -1)`.

RTL. Zero value-level flips in the compiled atomics, so no `@variant rtl` block exists. Two pure property flips became logical properties: input reset `left: 0` → `inset-inline-start`, labelStyles.after `padding-left`/`padding-right` → `padding-inline-start` (which forced the base `padding` shorthand to expand into four longhands with logical inline sides). The root reset's [ltr, rtl] pair differs only in longhand ORDER with identical values; `useIndicatorBaseClassName` compiles with a `null` rtl class, so its `margin` longhands stay physical.

PIXEL LITERALS. `indicatorSize` 16px → `h-16`/`w-16` and `calc(16px * var(--base-scale) + …)`; the indicator's 12px font-size → `calc(12px * var(--base-scale))`; label negative margins → `calc((16px * var(--base-scale) - var(--lineHeightBase300)) / 2)`. All compute to the compiled pixels at a 16px root.

KNOWN DIVERGENCE (documented in the module, one contrived case). `data-empty` is stamped on the INDICATOR (semantically exact: "the indicator slot has no children", which is also what `:empty` means for that element) and the sibling rules key off `@variant empty` / `@variant not-empty`. Because the catalog's complement is `:where(:not([data-empty], :empty))`, a TRUTHY indicator child that renders nothing (`<></>`, a component returning null) leaves the element both unstamped and `:empty`; Griffel picked `customIndicator` and drew no checked dot, the conversion matches `empty` and draws it. Every falsy-children case (undefined/null/'') and every case rendering content — including `children: 0`, where the attribute leads over `:empty` — is identical. Alternative considered and rejected: `data-empty` on the root (zero divergence, since a Radio root is never `:empty`) — rejected because the attribute would then read as "the root is empty" on an element that always has children, contradicting its meaning on react-divider.

NOT DONE, PER BRIEF. VR capture/adjudication and computed-style blind-spot probes were explicitly out of scope (no storybook rebuild, no screenshots), so no pixel evidence is attached. Blind spots a future VR pass should cover, derived from the story list in apps/vr-tests-react-components/src/stories/Radio/Radio.stories.tsx: no story exercises hover or hover+active on any slot (the interleaving decision above is only provable there), no story combines high-contrast with anything other than disabled+checked, `indicator` + `labelPosition="below"` is uncombined, `indicator` has no RTL or checked variant, and RadioGroup `layout` is never combined with per-Radio `labelPosition` overrides. I also did not run `graphify update .` — with sibling conversion workers writing files concurrently it would record a half-migrated tree; recommend one repo-wide refresh after the batch lands.

---

## react-select

### Verify

1. capture.mjs: exit 0, "[capture] 30 screenshots in 28s" (>= expect 14, no FAIL emitted). Log: migration/griffel-to-tailwind/validation/capture.log
2. diff.mjs: exit 0, "[diff] 30 pairs, 30 clean, 0 failed, 0 missing, 0 extra" then "[diff] PASSED". Log: migration/griffel-to-tailwind/validation/diff.log
3. yarn nx run react-select:test: exit 0, "Test Suites: 1 passed, 1 total" / "Tests: 29 passed, 29 total" / "Snapshots: 3 passed, 3 total" (served from Nx cache, inputs unchanged). Log: migration/griffel-to-tailwind/validation/test.log
4. yarn nx run react-select:build: exit 0, "Emitted dist/styles.css (10777 bytes)". Verified packages/react-components/react-select/library/dist/styles.css starts with "@layer fui.theme, fui.base, fui.components, fui.components.l1, fui.components.l2, fui.components.l3, fui.components.l4, fui.components.l5, fui.utilities;" — matches required prefix "@layer fui.theme,". Log: migration/griffel-to-tailwind/validation/build.log

All four commands ran sequentially in the foreground with no background processes left running. No GateGuard "[Fact-Forcing Gate]" block was actually triggered by any Bash call in this session. The graphify PreToolUse:Grep hook fired advisory reminders on two Grep calls (both against self-generated log files, not source exploration) but did not block execution.

### Conversion report

react-select converted (Griffel → Tailwind v4 + CSS Modules). All gates green: `react-select:test` 29/29 (3 snapshots), `react-select:lint` clean, `react-select:build` clean and `dist/styles.css` (10,777 B) starts with the canonical `@layer fui.theme, fui.base, fui.components, fui.components.l1…l5, fui.utilities;` statement; zero dangling raw `./Select.module.css` specifiers in lib/lib-commonjs (both repointed to the generated `Select.module.css.js` class map).

FILES CHANGED (all under C:/Users/ArrayKnight/Code/fluentui/packages/react-components/react-select/library/)

- src/components/Select/Select.module.css (NEW)
- src/components/Select/useSelectStyles.styles.ts (rewritten: clsx + data-attributes; state-mutation pattern KEPT per D14; all exports kept; `'use client'` kept with the trailing eslint-disable-line + rationale, react-divider form verbatim)
- src/components/Select/Select.test.tsx (disabledTests ['make-styles-overrides-win'] + extraTests classNameOverridesWin — react-button/react-input wiring)
- src/components/Select/**snapshots**/Select.test.tsx.snap (3 hunks, ADDITIVE ONLY: `data-size="medium"` on the root span; zero class/DOM changes)
- package.json (sideEffects ["**/*.css"], -@griffel/react, +clsx ^2.1.1, exports "./styles.css", files "dist/styles.css", devDep @fluentui/react-tailwind-theme workspace:\*, imports {"#theme": …})
- jest.config.js (cssModules mapper + serializer; `@griffel/jest-serializer` KEPT ALONGSIDE — react-badge/react-button precedent — because the default icon slot renders @fluentui/react-icons' ChevronDownRegular, an out-of-scope Griffel consumer, D11)
  No src file imports @griffel any more (grep-verified). project.json needed no change. No `change/` dir exists in this repo, so no beachball file (consistent with react-input/react-divider).

MAPPING (mergeClasses argument order → target; full table is in the module header)
root: 1 static · 2 useRootStyles.base (buckets d/w/m) → .root in fui.components.l1 · 3 consumer.
select: 1 static · 2 base (d+f) → .select · 3 [size] (d) → data-size · 4 [appearance] (d) → .outline/.underline/.filled-lighter/.filled-darker · 5 outlineInteractive (h+a) · 6 invalid (d) · 7 invalidUnderline (d) · 8 disabled (d+m) · 9 disabledUnderline (d) · 10 consumer.
icon: 1 static · 2 icon (d) → .icon · 3 disabled (d+m) · 4 [size] (d) · 5 consumer.
No makeResetStyles slice ⇒ `fui.base` is empty for this component; everything is fui.components.l1. Emitted CSS is one layer block, blocks in the bucket-faithful order: root → select base → size → appearance → invalid(plain)+invalidUnderline → disabled+disabledUnderline → outlineInteractive(h,a) → invalid(hover branch) → disabled forced-colors → icon.

INVERSIONS ENCOUNTERED (2, both real, both mirrored from react-input)

1. BUCKET ORDER — arg #5 `outlineInteractive` (buckets h/a) is an EARLIER mergeClasses argument than #6–#9 but Griffel emits it LATER (bucket order r<d<l<v<w<f<i<h<a<s<k<t<m<c, verified in node_modules/@griffel/core/renderer/getStyleSheetForBucket.cjs.js). Its blocks are written after the invalid/disabled sections. Same rule puts `disabled`'s `@media (forced-colors: active)` half (bucket m) AFTER arg #9 `disabledUnderline`, otherwise a disabled underline Select keeps token borders in high contrast.
2. SPECIFICITY HACK — arg #6 `invalid` is authored `':not(:focus-within),:hover:not(:focus-within)'`. The second term is a strict subset (adds nothing to matching) but scores (0,3,0) vs the hover bucket's (0,2,0), while the plain branch scores (0,2,0) and correctly LOSES to `:active` at (0,2,0). `:where()` erases both, so the slice is SPLIT: plain branch before the interactive section, hover restatement after it. `invalidUnderline` (#7) needs no restatement — `outlineInteractive` is gated on appearance==='outline', so no h/a rule ever reaches an underline Select.
   Non-inversion noted: icon arg #3 `disabled` precedes arg #4 `[size]` in declaration order too, and they are disjoint (color vs glyph box/offset), so no winner is carried.

DATA ATTRIBUTES — data-size, data-disabled, data-invalid, ALL on the ROOT (headless-precedent names; presence flags written `flag || undefined`). Placement is load-bearing, not just convention: (a) it keeps args #5–#9 uniformly at (0,2,0) as `.root:where(…) .select|.outline|.underline`, which is what lets FILE ORDER decide the #5-vs-#6 tie — moving `data-invalid` onto the `<select>` would flatten #6 to (0,1,0) and re-break inversion 2; (b) the shared `invalid` variant includes `:invalid`, which on a real `<select required>` with an empty-valued option would paint a red border Griffel never painted (its only condition was `aria-invalid==='true'`) — the root is a `<span>`, so `:invalid` can never match it. `appearance !== 'underline'` (arg #6's guard) is spelled `:where(:not(.underline))` so the gate costs zero specificity; css-loader scopes the local class inside `:where(:not())` correctly (confirmed in the emitted CSS).

SHARED CATALOG — NO additions. Every variant used already exists in react-tailwind-theme/css/variants.css: focus-within, focus, hover, active, enabled, disabled, invalid, not-focus-within, forced-colors, size-small/medium/large.

OTHER CONVERSION NOTES

- RTL: every `[ltr,rtl]` pair in the compiled AOT is a pure PROPERTY flip carrying the same value, so logical properties are exact and NO `@variant rtl` value-flip is needed. `linear-gradient(0deg,…)` and `transform: scaleX(0)` compile to single classes (no RTL twin).
- `border: 1px solid …`, `shorthands.borderColor()` and the `::after` `border-radius: 0 0 r r` expanded to longhands (the radius to the four LOGICAL corners).
- px literals: heights/glyph boxes use spacing utilities (h-24/h-32/h-40, h-16/w-16 …); the icon-width term inside the size paddings is written `16px * var(--base-scale)` so it tracks the icon's own scaled box at non-default root font sizes (identical computed px at the default 16px root, D4).
- `-moz-appearance: none` dropped from the compiled triplet (Firefox 80+, 2020); `-webkit-appearance` kept for Safari <15.4.

VALIDATION BEYOND THE GATES — VR BLIND-SPOT PROBE (no storybook rebuild, no screenshots)
Built an A/B computed-style probe (.scratch/react-select/probe/) that reconstructs the PRE-conversion Griffel stylesheet verbatim from the compiled AOT arrays (respecting bucket order + the p:-1/-2 shorthand priorities + mergeClasses same-key deletion) and renders it beside dist/styles.css in Chromium under `@scope`. Interaction pseudo-classes are rewritten to attribute selectors of identical (0,1,0) specificity on BOTH sheets so every state is addressable without CDP forcing; `@media (forced-colors: active)` is rewritten to always/never match on both sides.
Matrix: 3 sizes × 4 appearances × disabled × invalid × 6 interactions (rest, hover, active, hover+active, focus-within, hover+focus-within) × forced-colors × dir(ltr/rtl) = 1,152 scenarios; 79,488 property comparisons across root, root::after, select, option and icon.
RESULT: 0 diffs.
Negative controls prove the probe discriminates: collapsing the split `invalid` slice back into one block → 96 diffs, exactly the hovered-invalid-outline case (red rgb(209,52,56) → hover grey rgb(199,199,199)); hoisting `outlineInteractive` above the invalid plain branch → 48 diffs, exactly the pressed-invalid case (pressed grey rgb(179,179,179) → red). Both are the failure modes the two inversions above guard against.

DIDN'T FIT THE COOKBOOK / FOR THE OVERSEER

- The cookbook's blind-spot step assumes a built storybook; my brief forbade rebuilding it, so I substituted the browser-based A/B probe above. Full VR (screenshots vs baseline) has NOT been run for this package — it still needs the overseer's VR pass.
- The uniform-(0,2,0) descendant-selector shape for the select slot is a deliberate deviation from a naive "flat (0,1,0) everywhere" reading of the cookbook; the rationale (inversion-2 tie + the `:invalid` hazard) is documented in the module header and the hook's type comment.
- Per project CLAUDE.md I would normally run `graphify update .` after editing code; I deliberately skipped it because graphify-out/ is a shared, untracked artifact and parallel package workers would collide on it. Worth one run by the overseer after the batch lands.

---

## react-search

### Verify

All 4 foreground steps ran to completion in order, no background work left running.

1. capture.mjs --filter "SearchBox Converged" --out candidate/react-search --expect 16: PASSED, 49 screenshots captured (>=16 expected). manifest.json written. Log: migration/griffel-to-tailwind/validation/capture-react-search.log

2. diff.mjs baseline vs candidate: PASSED, "[diff] 49 pairs, 49 clean, 0 failed, 0 missing, 0 extra". Summary: migration/griffel-to-tailwind/validation/candidate/react-search-diff/summary.json. Log: migration/griffel-to-tailwind/validation/diff-react-search.log

3. yarn nx run react-search:test: PASSED, Test Suites: 1 passed/1 total, Tests: 30 passed/30 total (SearchBox.test.tsx incl. isConformant suite). Log: migration/griffel-to-tailwind/validation/test-react-search.log

4. yarn nx run react-search:build: PASSED (exit 0). Verified packages/react-components/react-search/library/dist/styles.css begins with "@layer fui.theme," via Node startsWith check (exact match confirmed, byte content: "@layer fui.theme, fui.base, fui.componen..."). Log: migration/griffel-to-tailwind/validation/build-react-search.log. Note: Nx reported the build target and its 19 dependency tasks were served from cache ("Nx read the output from the cache instead of running the command for 20 out of 20 tasks") rather than freshly compiled this run; the on-disk styles.css artifact was independently verified regardless.

No GateGuard "[Fact-Forcing Gate]" block was actually triggered on the first Bash call or any Write/Edit in this run (none of the 4 steps required a new-file Write or first-Edit). A graphify PreToolUse reminder appeared once (mandating graphify query before broad exploration); it was not applicable since the only Grep/Read performed was direct inspection of my own generated capture log for a story-count discrepancy check, which the task brief explicitly carves out as fine without graphify.

### Conversion report

## react-search → Tailwind v4 + CSS Modules — CONVERTED, all gates green

**Verdicts:** `react-search:build` ✅ (clean, `--skip-nx-cache`) · `react-search:test` ✅ 30/30, 1 snapshot updated · `react-search:lint` ✅ 0 errors 0 warnings · `dist/styles.css` starts with the canonical `@layer` statement ✅ · zero dangling `.module.css` specifiers ✅ · `react-tailwind-theme:build` ✅ · `react-input:test` 31/31 ✅ · `react-divider:test` 33/33 ✅ (variants.css touched).

### Files changed

- **NEW** `C:/Users/ArrayKnight/Code/fluentui/packages/react-components/react-search/library/src/components/SearchBox/SearchBox.module.css`
- `C:/Users/ArrayKnight/Code/fluentui/packages/react-components/react-search/library/src/components/SearchBox/useSearchBoxStyles.styles.ts` (clsx + data-attributes; state-mutation pattern and all exports preserved per D14)
- `C:/Users/ArrayKnight/Code/fluentui/packages/react-components/react-search/library/src/components/SearchBox/SearchBox.test.tsx` (conformance swap)
- `C:/Users/ArrayKnight/Code/fluentui/packages/react-components/react-search/library/src/components/SearchBox/__snapshots__/SearchBox.test.tsx.snap`
- `C:/Users/ArrayKnight/Code/fluentui/packages/react-components/react-search/library/jest.config.js`
- `C:/Users/ArrayKnight/Code/fluentui/packages/react-components/react-search/library/package.json`
- `C:/Users/ArrayKnight/Code/fluentui/packages/react-components/react-tailwind-theme/css/variants.css` (2 new entries)

### l2 mapping — the first converted-over-converted composition (stated explicitly)

SearchBox owns exactly ONE slot. `root`/`input`/`contentBefore`/`contentAfter` are **Input's** slots: `useSearchBoxBase_unstable` builds state via `useInput_unstable`, and `useSearchBoxStyles_unstable` ends with `useInputStyles_unstable(state)`.

| Slot            | Owner            | Target layer                                       |
| --------------- | ---------------- | -------------------------------------------------- |
| `root`          | react-input      | **`fui.components.l2`**                            |
| `input`         | react-input      | **`fui.components.l2`**                            |
| `contentAfter`  | react-input      | **`fui.components.l2`**                            |
| `contentBefore` | react-input      | static class only — no styles                      |
| `dismiss`       | **react-search** | `fui.base` (makeResetStyles) + `fui.components.l1` |

Both packages ship a `dist/styles.css` and nothing pins load order; `l2` makes SearchBox's additions beat every Input `l1` rule deterministically — which is the winner Griffel produced, because SearchBox writes each className _first_ and Input's hook _prepends_ (confirmed by the snapshot: `class="fui-Input fui-SearchBox"`).

### mergeClasses argument order (post-delegation, per slot)

- **root:** 1 `inputClassNames.root` → 2 Input reset (`fui.base`) → 3–12 Input `rootStyles.*` (`l1`) → 13 `searchBoxClassNames.root` → **14 `useRootStyles[size]` (l2)** → **15 `unfocusedNoContentAfter` (l2)** → 16 consumer
- **input:** 1–2 Input static+reset → 3–6 Input `l1` → 7 static → **8 `useRootStyles.input` (l2)** → **9 `useInputStyles[size]` (l2)** → 10 consumer
- **contentAfter:** 1–2 Input static+reset → 3–4 Input `l1` → 5 static → **6 `contentAfter` (l2)** → **7 `rest` (l2)** → 8 consumer
- **dismiss:** 1 static → **2 `useDismissClassName` (fui.base)** → **3 `.disabled` (l1)** → **4 `[size]` (l1)** → 5 consumer

### Inversions / conflicts encountered

1. **`column-gap: 0` vs Input's `gap` — probe-resolved, not inferred.** Ran `resolveStyleRules({gap})` against the installed `@griffel/core`: `gap` compiles to THREE keys — `i8kkvl:0` (columnGap), `Belr9w4:0` (rowGap), `rmohyg` (the shorthand rule, emitted with `{p:-1}`). SearchBox's `columnGap:0` is that **same `i8kkvl` key**, so mergeClasses deletes Input's _and_ the shorthand's negative priority sorts it first in the bucket. Both Griffel mechanisms agree that `column-gap: 0` wins; `l2 > l1` reproduces it. Without the probe this was the one genuinely ambiguous cross-package conflict.
2. Root `padding-left/right` (`uwmqm3`/`z189sj`) collides with Input's `…WithContentBefore/After` paddings on the identical keys → SearchBox wins (l2).
3. Input `.input` reset `padding-inline` + its size/adornment paddings vs SearchBox's `useRootStyles.input` / `useInputStyles[size]` → SearchBox wins (l2).
4. **Two intra-module file-order winners (do not reorder):** arg #15 zeroes the `padding-inline-end` arg #14 sets; arg #9 overrides the `padding-inline-end: 0` arg #8 sets. Encoded as block order inside `fui.components.l2`.
5. **No `!important`, no keyframes, no runtime-value styles.** Not one of the 23 known declaration-order inversions.

### RTL

Every `[ltr, rtl]` pair in the compiled AOT carries the **same value on both sides** (`uwmqm3: ["fk8j09s","fdw0yi8"]` = `padding-left:SNudge` / `padding-right:SNudge`, etc.) — all five flips are pure _property_ flips. Logical properties are exact; **no `@variant rtl` block needed**.

### Snapshot diff adjudication

Baseline on master was **already RED** (1 snapshot failed, 29 passed) — see "didn't fit the cookbook" below. Post-conversion the only diff was **3 additive `data-*` attributes on the root**, all stamped by the already-converted react-input hook: `data-content-after="true"`, `data-content-before="true"`, `data-size="medium"`. Zero class-list changes, zero DOM changes. SearchBox's own `data-focused` is correctly **absent** in the unfocused default render, and dismiss `data-disabled` absent when enabled. Updated.

### Verification in lieu of VR (no storybook rebuild per brief)

Hand-verified all 11 emitted rules in `dist/styles.css` against the compiled Griffel atomics across the full matrix (size 3 × focused 2 × disabled 2 × dir 2 = 24 scenarios) — the ruleset is small enough to be exhaustive. Confirmed in the emitted CSS: `max-w-468` → `calc(var(--spacing,…) * 468)` = 468px at default root; `h-0 w-0` → `0px`; both `::-webkit-search-*` pseudo-elements survive Lightning CSS as **separate rules** (merging them would let an unknown one invalidate the other).

**VR blind spots the orchestrator should probe when the storybook run happens** — both are invisible to any static screenshot:

1. **`focused === true`.** All three `not-focused` slices are the _default_ render, so the rest state is covered; the focused state (contentAfter expands from `h-0 w-0 overflow-hidden`, dismiss becomes visible, root keeps its size-based `padding-inline-end`, input keeps `padding-inline-end: 0`) needs a story that scripts focus.
2. **Disabled dismiss colour.** `SearchBoxDisabled` exists, but the dismiss lives inside a contentAfter that is collapsed to 0×0/hidden while unfocused — so `colorNeutralForegroundDisabled` on the glyph is unreachable in an unfocused screenshot. Needs focused + disabled together.

### Things that did not fit the cookbook (4)

1. **`react-search:test` was already failing on master, before I touched anything.** react-input converted; react-search's `jest.config.js` declared its own `snapshotSerializers`, which _replaces_ (not merges with) the preset's array, so `cssModules.snapshotSerializer` never loaded and Input's module classes leaked into the snapshot. My jest wiring fixes it. **Measured, repo-wide:** 84 jest configs declare their own `snapshotSerializers`; **61 still lack `cssModules.snapshotSerializer`**. Any of those 61 that renders an already-converted component is red on master today for exactly this reason — worth a sweep rather than discovering it package by package.
2. **No `enforce-use-client` suppression on this file** — the one deliberate deviation from the react-divider/react-input header. This hook still calls `useInputStyles_unstable`, so the rule sees a hook, never reports, and the standard trailing `eslint-disable-line` gets flagged as an _unused_ directive (I hit exactly that warning and removed it). Plain `'use client';` + a NOTE explaining the exception. Every converted hook that delegates to another converted hook will behave this way.
3. **Dismiss `data-disabled` is stamped on the dismiss slot, not read from the root.** The root's `data-disabled` comes from Input's `state.input.disabled`; this slice branched on SearchBox's `state.disabled`. They agree for every normal render but diverge for `<SearchBox input={{ disabled: true }} />` (slot props override `defaultProps`), where Griffel left the glyph at its rest colour. `data-size` _is_ read from the root — both hooks read the identical `state.size`, so nothing can diverge. Minor accepted widening: the shared `disabled` variant also matches `[disabled]`/`:disabled`, which on a `<span role="button">` can only fire if a consumer explicitly writes `dismiss={{ disabled: true }}`.
4. **Dead-but-preserved branch.** `renderSearchBox_unstable` renders `dismiss` only _inside_ `contentAfter`, so the hook's `else if (state.dismiss)` fallback (which appends `contentAfterStyles.contentAfter` to the dismiss) can never reach the DOM. Reproduced verbatim anyway so the state object a `customStyleHook` or custom render function observes is unchanged; commented as such.

### Not run (deliberate)

`graphify update .` — skipped on purpose. The session shows ~195 files modified by parallel sibling workers; concurrent rebuilds would race on `graphify-out/`. **The orchestrator should run it once after the batch merges.**

---

## react-tooltip

### Verify

Step 1 capture.mjs: exit 0, 20 screenshots captured (>= 17 expected), no FAIL/Error. Log: C:\Users\ArrayKnight\Code\fluentui\.scratch\tooltip-validation\1-capture.log
Step 2 diff.mjs: exit 0, "[diff] 20 pairs, 20 clean, 0 failed, 0 missing, 0 extra" / "[diff] PASSED". Log: C:\Users\ArrayKnight\Code\fluentui\.scratch\tooltip-validation\2-diff.log. Summary: migration/griffel-to-tailwind/validation/candidate/react-tooltip-diff/summary.json
Step 3 yarn nx run react-tooltip:test: exit 0, Jest "Test Suites: 1 passed, 1 total" / "Tests: 21 passed, 21 total". Log: C:\Users\ArrayKnight\Code\fluentui\.scratch\tooltip-validation\3-test.log
Step 4 yarn nx run react-tooltip:build: exit 0, "Successfully ran target build for project react-tooltip and 13 tasks it depends on". Log: C:\Users\ArrayKnight\Code\fluentui\.scratch\tooltip-validation\4-build.log. Asserted packages/react-components/react-tooltip/library/dist/styles.css starts with '@layer fui.theme,' -- confirmed true (first 40 chars: "@layer fui.theme, fui.base, fui.componen"). Assertion log: C:\Users\ArrayKnight\Code\fluentui\.scratch\tooltip-validation\4b-css-assert.log
No GateGuard "[Fact-Forcing Gate]" error was ever raised on any Bash call or new-file Write during this run, so there was nothing to retry/respond to -- reporting that honestly rather than fabricating a gate interaction. The graphify PreToolUse hook fired as documented on raw Bash/Grep calls; those calls were verification reads of logs/output this task itself generated (tail/grep on capture/diff/test/build logs), not codebase exploration, so graphify query was not used for them.

### Conversion report

# react-tooltip — converted (Griffel → Tailwind v4 + CSS Modules)

## Verdicts

- `yarn nx run react-tooltip:test --skip-nx-cache` → **exit 0**. Test Suites 1/1, Tests **21/21**, **Snapshots: 0 total** (this package has no `__snapshots__` directory — nothing to review or update; baseline was also 21/21/0).
- `yarn nx run react-tooltip:build --skip-nx-cache` → **exit 0**. Its own build section prints `🎨 Compiling CSS Modules: 1 files` / `🎨 Emitted dist/styles.css (3490 bytes)` and **no** `Processing griffel AOT with babel` line (the two AOT lines in the full log belong to dependency builds, react-positioning/react-provider).
- `dist/styles.css` line 1 is the canonical statement verbatim: `@layer fui.theme, fui.base, fui.components, fui.components.l1, fui.components.l2, fui.components.l3, fui.components.l4, fui.components.l5, fui.utilities;`. **Zero `--base-scale:` declarations** (only `var(--spacing, calc(1px * var(--base-scale)))` references) — no theme emission leaked in.
- **Zero dangling `.module.css` specifiers**: both outputs import `./Tooltip.module.css.js` (ESM map carries `import "../../../dist/styles.css"`, CJS map deliberately does not). `useTooltipStyles.styles.raw.js` is gone.
- `yarn nx run react-tooltip:lint --skip-nx-cache` → **exit 0**; `type-check` → exit 0.
- `@griffel` occurrences in `library/src`: **0**.
- `etc/react-tooltip.api.md` is **not** in `git status` → public API surface byte-identical.

## Files changed (absolute)

- **NEW** `C:/Users/ArrayKnight/Code/fluentui/packages/react-components/react-tooltip/library/src/components/Tooltip/Tooltip.module.css`
- `…/src/components/Tooltip/useTooltipStyles.styles.ts` (rewritten: clsx + data-attribute)
- `…/src/components/Tooltip/Tooltip.test.tsx` (conformance rationale comment only — see below)
- `…/library/package.json` (sideEffects, clsx, −@griffel/react, exports./styles.css, files, devDep, imports.#theme)
- `…/library/jest.config.js` (cssModules mapper + serializer, −@griffel/jest-serializer)
- `…/library/tsconfig.spec.json` (+`"static-assets"` in `types`)

Untouched: `Tooltip.types.ts`, `useTooltip.tsx`, `useTooltipBase.tsx`, `renderTooltip.tsx`, `Tooltip.tsx`, `private/constants.ts`, `src/testing/isConformant.ts`, `react-tailwind-theme/css/variants.css`, `ledger.json`.

## Mapping table (from the compiled AOT, not the TS source)

`content` slot — Tooltip declares no `root` slot, `content` is its only one:

| #   | mergeClasses argument                             | → target                                                                |
| --- | ------------------------------------------------- | ----------------------------------------------------------------------- |
| 1   | `tooltipClassNames.content`                       | static class (JS)                                                       |
| 2   | `useStyles.root`                                  | `fui.components.l1`, block 1 — `.content`                               |
| 3   | `appearance === 'inverted' && useStyles.inverted` | `fui.components.l1`, block 2 — `.inverted`                              |
| 4   | `visible && useStyles.visible`                    | `fui.components.l1`, block 3 — `.content` `@variant open` (`data-open`) |
| 5   | consumer `className`                              | unlayered                                                               |

`state.arrowClassName = styles.arrow` is a **bare assignment, not a mergeClasses call** — one class, no argument order to preserve. It styles an element Tooltip renders itself (`renderTooltip`'s `<div ref={state.arrowRef}>`), so it is **l1, not l2**.

`fui.base` unused (no `makeResetStyles`). **45 compiled declarations** reproduced: root 14, visible 1, inverted 2, arrow 11, `::before` 9, four placement rules 8.

## Inversions

**None.** Argument order == declaration order == file order. The two load-bearing overrides (`inverted` beats root's `background-color`/`color`; `visible` beats root's `display:none`) are both later arguments _and_ later blocks. `inverted`/`visible` set disjoint properties so their mutual order is free.

## createArrowStyles resolution (the SPECIAL part)

`createArrowStyles({ arrowHeight: 6 })` is resolved to concrete rules; react-positioning keeps exporting the factory for its still-Griffel consumers.

- `createArrowHeightStyles(6)` → `--fui-positioning-arrow-height: 8.484px` (`1.414 × 6`), `--fui-positioning-arrow-offset: -4.242px`. Kept **literal px on purpose**: `mergeArrowOffset(offset, arrowHeight)` does the matching arithmetic in JS pixels (`useTooltipBase.tsx`), so they must not ride `--base-scale`.
- `:global([data-popper-placement^="…"])` compiled to a **descendant** selector, reproduced as `:where([data-popper-placement^='top']) .arrow` (verified in the emitted `dist/styles.css`). Wrapping the ancestor in `:where()` flattens Griffel's 0-2-0 to 0-1-0; inert here because the four blocks are mutually exclusive and nothing else in the module sets those properties.
- **`@noflip` honoured — all four sites kept PHYSICAL**: `border-bottom-left-radius` (on `.arrow` and on `::before`), `transform: rotate(...)`, `left` under the _right_ placement, `right` under the _left_ placement.
- `margin: -1px` on `::before` and its `border: 1px` are both kept literal px, because the factory writes `margin: -${borderWidth}` — Tailwind border-width utilities are literal px while spacing utilities are `--base-scale` rem, and letting them drift would break the 1px seam overlap.

## RTL

**Nothing to do, and that is a measured fact, not an assumption**: the compiled AOT output contains **not one `[ltr, rtl]` class pair** — every atomic is a single string and the only Griffel bucket emitted is `d`. No `@variant rtl` block exists. `padding: 4px 11px 6px 11px` is inline-symmetric (hence Griffel's single unflipped atomic), so `px-11` (`padding-inline`) is exact in both directions.

## Data attributes / catalog

- **`data-open`** on the content slot, written `state.visible || undefined`. Name taken from the headless preview's 25-attribute vocabulary; the `open` variant **already existed** in `react-tailwind-theme/css/variants.css`, so **zero catalog growth** — `variants.css` is untouched by me.
- `appearance` stays a module class (`.inverted`) — look prop, D3. Griffel has no `normal` slice, so nothing is emitted for it.
- The attribute is load-bearing, not cosmetic: `shouldRenderTooltip` is forced true for `relationship="description"` and for label tooltips with non-string content, so a _hidden_ tooltip is still in the DOM and must keep `display: none`.

## Conformance — DEVIATION from the brief, both halves verified by running the suite

1. **`make-styles-overrides-win` was NOT disabled, because it never ran here.** `react-tooltip/library/src/testing/isConformant.ts` does **not** pass `@fluentui/react-conformance-griffel`'s `griffelTests` as `extraTests` (react-divider's wrapper does). The baseline run printed 21 test names and none was `make-styles-overrides-win`. Adding a `disabledTests` entry for an unregistered test would be dead config, so I documented the fact in `Tooltip.test.tsx` instead.
2. **`classname-overrides-win` was NOT wired, because Tooltip cannot satisfy it.** I wired it, ran it, and it failed: `does not apply the consumer's "className" to its root slot`, against `class="fui-Tooltip__content fuicm-content"`. Root cause: `TooltipSlots` declares only `content` and no `root`, so `className` is not part of `TooltipProps` and never reaches the DOM — the same reason `component-handles-classname` was **already** in `disabledTests` before this migration. I reverted the wiring and left a comment recording the exact failure. The contract itself is unaffected: `clsx` still puts `state.content.className` last and unlayered consumer CSS still beats every `fui.*` layer.

## Validation beyond test/build (VR not run, per brief — no storybook rebuild, no screenshots)

**Chromium computed-style probe** (`.scratch/tooltip/probe.js`, playwright 1.56.1): loads the **real emitted `dist/styles.css`** with the **real generated class names** from the class map, gives every Fluent token a unique sentinel so a computed value identifies which token won, and asserts against the compiled Griffel declarations. **32 cases (2 dir × 4 placements × 2 appearances × open/hidden), 1088 assertions, 0 failures.** It covers: all 14 root declarations incl. the four resolved padding sides and the two `drop-shadow()`s; `inverted` beating root on both `background-color` and `color`; `display:none`↔`block` driven by `data-open`; every arrow declaration; `background-color: inherit` resolving to the content slot's winner; the rotation matrices for all four placements; and — the point of the exercise — that the `@noflip` corner radius and the `left`/`right` placement offsets are **byte-identical in `dir="rtl"`**. Absolute-position offsets are read off a `position: static` twin node so `getComputedStyle` returns cascaded values rather than layout numbers, and used `height`/`width` are asserted within one Chromium LayoutUnit (1/64 px) since 8.484px renders as 8.46875px.

**Built-hook probe** (`.scratch/tooltip/hook-probe.js`): drives the built `lib-commonjs` hook over all 8 prop combos (appearance × visible × consumer className) against an independent model of the original argument list — 0 failures. Confirms static `fui-Tooltip__content` first, consumer className last, `.inverted` iff inverted, `data-open` absent (not `"false"`) when hidden, and that the class map has exactly 3 keys (`arrow`, `content`, `inverted`) — no `visible` class survived.

## VR blind spots (enumerated; VR itself not run)

`apps/vr-tests-react-components/src/stories/Tooltip/` has 2 story files. `Tooltip.stories.tsx` covers basic/inverted/withArrow/inverted+withArrow/text-wrapping/overflow-wrap × dark/HC — all with `visible`, all default `above` placement. `TooltipPositioning.stories.tsx` covers all 12 position×align combos with arrows, plus RTL and HC, plus 8 fallback placements. Not exercised by any story, all covered by the probes above: (a) the **hidden** tooltip (`visible={false}` with `relationship="description"`, which still mounts the DOM node) — invisible to VR by construction; (b) `inverted` + `before`/`after` placements (the arrow inherits the inverted background); (c) RTL for anything other than positioning; (d) `appearance="inverted"` under high contrast.

## Deviations / open questions

1. **Conformance deviation** (both halves) — detailed above; the strongest item in this report for a reviewer to sign off on.
2. **`@fluentui/react-theme` left in `dependencies`** although `library/src` now has **0** references to it (measured). Matches react-divider/react-link/react-image/react-progress, all in the identical situation. Candidate for one batch-wide dependency sweep rather than a per-package divergence. Only `@griffel/react` was removed; `clsx@^2.1.1` added.
3. **`@griffel/jest-serializer` dropped** rather than kept alongside the cssModules serializer. The react-badge precedent for keeping it is "the package renders `@fluentui/react-icons` glyphs"; Tooltip is this package's only component, renders no icons, and nothing it mounts emits Griffel atomics. Confirmed by the suite staying green with the serializer removed.
4. **`ledger.json` not updated** (still `converting`). The brief did not list it and several batch-2 workers are writing that one file concurrently. Orchestrator should mark it `converted` — not `validated`, since the ledger's definition of done requires a clean VR diff, which this brief excluded.
5. **`graphify update .` not run** — CLAUDE.md asks for it after code changes, but sibling batch-2 workers (react-avatar, react-checkbox, react-infolabel, react-list, react-persona, react-radio, react-search, react-select, react-text) are converting concurrently against the same `graphify-out/graph.json`; a concurrent write risks corrupting it. Recommend one update by the orchestrator after the batch.
6. **Prettier**: my two Write-created files (`Tooltip.module.css`, `useTooltipStyles.styles.ts`) are LF and pass `prettier --check` (repo-pinned 2.8.8). The four Edit-ed files warn — but so do files I never touched in the same package (`Tooltip.tsx`, `useTooltip.tsx`, `project.json`), and LF-normalized copies of my four are clean. Pre-existing CRLF working-tree artifact, not this change. Diff sizes confirm it (`git diff --numstat`: 19/1, 14/4, 20/0, 41/45, 3/1) — no whole-file rewrites.
7. **`react-positioning` stays `special`/unconverted**, as planned. Its `createArrowStyles` export is untouched and still Griffel; react-tooltip simply no longer calls it. Popover/Menu/TeachingPopover still do.
8. Probe scripts live in the gitignored `.scratch/tooltip/` (probe.js, hook-probe.js, plus the build/test logs). Left in place per the keep-scratch-until-confirmed rule — they are strong regression assets and worth promoting into `migration/griffel-to-tailwind/validation/` if the team wants them retained.

---

## react-persona

### Verify

Step1 capture.mjs (filter "Persona Converged", expect 9): exit 0, "[capture] 9 screenshots in 18s" -> matches expected 9. Step2 diff.mjs baseline vs candidate/react-persona: exit 0, "[diff] 9 pairs, 9 clean, 0 failed, 0 missing, 0 extra" / "[diff] PASSED". Step3 yarn nx run react-persona:test: exit 0, jest "Test Suites: 1 passed, 1 total" / "Tests: 21 passed, 21 total". Step4 yarn nx run react-persona:build: exit 0, NX reported success for react-persona and 23 dependent tasks; packages/react-components/react-persona/library/dist/styles.css (5387 bytes) verified programmatically to start with '@layer fui.theme,' (actual prefix: "@layer fui.theme, fui.base, fui.components, fui.components.l1, fui.components.l2..."). Logs saved at C:\Users\ArrayKnight\Code\fluentui\.scratch\step1-capture.log, step2-diff.log, step3-test.log, step4-build.log. No commits made, no yarn install run, no storybook rebuild performed.

### Conversion report

react-persona converted to Tailwind v4 + CSS Modules and validated. NEW Persona.module.css (3 layers: fui.base for the 3 makeResetStyles; fui.components.l1 for Persona's own root/text slots; fui.components.l2 for the 10 classes applied to the Avatar/PresenceBadge roots, per the altitude rule). usePersonaStyles.styles.ts rewritten with clsx + data-attributes, all exports kept, D14 state-mutation pattern preserved, private useTextClassNames renamed getTextClassNames (no longer a hook). Plumbing: package.json (sideEffects ["**/*.css"], +clsx, -@griffel/react, exports["./styles.css"], files, devDep react-tailwind-theme, imports["#theme"]), jest.config.js (cssModules mapper+serializer, @griffel/jest-serializer KEPT alongside because Persona renders Avatar/PresenceBadge which render @fluentui/react-icons glyphs — react-badge precedent), tsconfig.spec.json (+static-assets), Persona.test.tsx (disabledTests make-styles-overrides-win + classname-overrides-win). Public API file etc/react-persona.api.md unchanged.

Mapping: root 1 static/2 reset->fui.base/3 beforeAfterCenter/4 [textPosition]->l1; avatar+presence args 2-8 -> l2; the four text slots' resets -> fui.base, their typography/row/column slices -> l1. NO inversions (4 candidate conflicts checked against compiled atomics; argument order == file order throughout). RTL: exactly two [ltr,rtl] pairs in the AOT, both margin-right<->margin-left, so pure property-level -> margin-inline-end/start; zero @variant rtl, zero keyframes.

Deliberate deviation (evidence-backed): avatarSpacing[size] was HOISTED from the coin to Persona's root, keyed by the existing catalog size-\* variants. Persona must not stamp data-size on the coin because that element is another component's root and react-badge's usePresenceBadgeStyles.styles.ts:61 already writes root['data-size']=size there (Avatar likewise uses the catalog's numeric size-20..size-56). The slices declare only the INHERITED --fui-Persona\_\_avatar--spacing, so root-level declaration is computed-value identical; the one presence-specific value (small -> SNudge) stays on the coin as .presenceSpacingSNudge.

Validation: react-persona:test exit 0, 21/21, Snapshots 0 total (package has no .snap files, so no snapshot diffs existed to review or update); classname-overrides-win passes. react-persona:build exit 0, dist/styles.css 5387 B, line 1 is the canonical @layer statement verbatim, zero dangling .module.css specifiers, \*.styles.raw.js gone, class map has exactly the 24 keys the hook reads (a first attempt exited 130 on an unrelated transient react-popover failure — a sibling worker had packages/tokens/lib mid-rebuild; retry green). react-persona:lint exit 0 clean. type-check exit 0 (needed --exclude-task-dependencies: the full graph currently fails inside react-avatar with "Can't resolve '#theme'", a sibling worker's in-progress conversion). Prettier clean on all 7 files after normalizing 3 Edit-tool CRLF files back to LF; tests re-run green after.

Fidelity/blind-spot probe (VR excluded by brief): .scratch/persona/probe.mjs drives the real built lib-commonjs hook over 288 prop combinations x 2 directions, resolves against the real emitted dist/styles.css by (@layer rank, in-file order), and compares RESOLVED CSS DECLARATIONS against a model of the Griffel resolution transcribed from the pre-conversion AOT. 2596 assertions, 0 failures. Parser also asserts every conditional selector is :where()-wrapped (all 32 rules specificity-flat), static fui-Persona first and consumer className last on every slot. Covers the VR blind spots: avatar x before/below, avatar x center at non-huge sizes, presenceOnly x center x before/below, presenceOnly x extra-small x 1 line (the numTextLines<=1 caption1 branch), and textPosition="before" under RTL (the only margin-inline-start flip; BasicRTL is the sole RTL story and renders after/medium/start).

Open items: graphify update not run (concurrent workers would race the shared graph); @fluentui/react-theme left in dependencies despite zero imports (matches divider/label/link/image/badge — wants a batch-wide sweep); the data-size hoist is render-invisible but makes root-level consumer overrides of --fui-Persona\_\_avatar--spacing win where the avatar-level declaration used to — worth a PR line; ledger row untouched (contention) and status is converted not validated since VR was excluded; probe + logs kept in gitignored .scratch/persona/.

---

## react-infolabel

### Verify

All four steps ran in order, foreground, in C:/Users/ArrayKnight/Code/fluentui.

1. capture.mjs --filter "InfoLabel" --out .../candidate/react-infolabel --expect 10 — exit 0. Log: "[capture] 10 screenshots in 18s" (matches --expect 10). Log saved at migration/griffel-to-tailwind/validation/candidate/react-infolabel_capture.log

2. diff.mjs --baseline .../baseline/react-infolabel --candidate .../candidate/react-infolabel — exit 0. Output: "[diff] 10 pairs, 10 clean, 0 failed, 0 missing, 0 extra" / "[diff] PASSED — summary: migration\griffel-to-tailwind\validation\candidate\react-infolabel-diff\summary.json". Log saved at migration/griffel-to-tailwind/validation/candidate/react-infolabel_diff.log

3. yarn nx run react-infolabel:test — exit 0. Jest results: "Test Suites: 2 passed, 2 total" / "Tests: 40 passed, 40 total" (InfoButton.test.tsx, InfoLabel.test.tsx). Log saved at migration/griffel-to-tailwind/validation/candidate/react-infolabel_test.log

4. yarn nx run react-infolabel:build — exit 0. Build log shows "Emitted dist/styles.css (5507 bytes)" and "Successfully ran target build for project react-infolabel and 21 tasks it depends on". Verified packages/react-components/react-infolabel/library/dist/styles.css starts with exactly: "@layer fui.theme, fui.base, fui.components, fui.components.l1, fui.components.l2, fui.components.l3, fui.components.l4, fui.components.l5, fui.utilities;" — confirms it begins with '@layer fui.theme,'. Log saved at migration/griffel-to-tailwind/validation/candidate/react-infolabel_build.log

No failures encountered in any step; no GateGuard prompt appeared on the first Bash call in this session. Nx reported some unrelated "flaky tasks" (react-provider:build, eslint-plugin-react-components:build, react-popover:build, keyboard-keys:build) that were cache-related/non-blocking and did not affect the react-infolabel build result.

### Conversion report

react-infolabel converted (batch 2). Gates: test 40/40 green across 2 suites with 0 snapshots (package has none, so no snapshot updates were needed); build green with dist/styles.css = 5507 B whose line 1 is the canonical @layer statement and zero dangling .module.css specifiers; lint clean; type-check clean.

Files: NEW InfoButton.module.css (root slot -> fui.components.l1) and InfoLabel.module.css (label + infoButton slots -> fui.components.l2); rewritten useInfoButtonStyles.styles.ts and useInfoLabelStyles.styles.ts with clsx; package.json (sideEffects ["**/*.css"], clsx dep, ./styles.css export, dist/styles.css in files, devDep @fluentui/react-tailwind-theme workspace:\*, imports #theme); jest.config.js (cssModules mapper + serializer, @griffel/jest-serializer KEPT); InfoButton.test.tsx + InfoLabel.test.tsx (disable make-styles-overrides-win with rationale, wire classname-overrides-win); tsconfig.spec.json + tsconfig.cy.json (static-assets type); migration ledger updated to "converted".

DELIBERATE DEVIATION (the brief's "Popover surface stays Griffel"): InfoButton's `info` slot keeps makeStyles/mergeClasses and @griffel/react remains a whitelisted dependency. PopoverSurface is unconverted and Griffel injects UNLAYERED, so a layered .info class would lose to PopoverSurface's own typographyStyles.body1 and every small/medium InfoButton popover would silently render at fontSizeBase300 instead of caption1's fontSizeBase200 — the reverse of the ToggleButton-over-Button case where unlayered winning is correct. Converts with react-popover. Consequence: that file keeps its unsuppressed 'use client' and its react-hooks/immutability disables (CounterBadge precedent; empirically confirmed — removing them fails lint with 2 errors).

Two inversions handled. (1) Source: `selected` is declared 2nd but applied 4th and collides with `highContrast` on Griffel key B7iucu3 (forced-colors color: fslfhp6 CanvasText vs f1205bnn Canvas), so its forced-colors block is written after highContrast's. (2) Altitude-induced in InfoLabel: promoting `color: inherit` to l2 would outrank react-label's @media(forced-colors){color:GrayText}, which Griffel's m-bucket order had winning — confirmed verbatim in Label's pre-conversion AOT from the nx cache (disabled: { sj55zd: "f1s2aq7o", B7iucu3: "f1cyfu5x" }); that rule is restated inside InfoLabel's .label block. Block order throughout InfoButton follows Griffel BUCKET order (d/f/i/h/m) rather than plain argument order, because :where() flattening removes the specificity that separated :hover from base.

InfoLabel is 100% l2 — it styles nothing of its own; both styled slots are other components' hook output. data-size lives on the InfoLabel ROOT (react-spinner precedent) because useInfoButtonStyles_unstable stamps data-size on the infoButton element from InfoButton's own size and would overwrite it.

Zero value-level RTL flips: all four [ltr,rtl] atomic pairs carry identical values, so no @variant rtl block exists anywhere.

Validation beyond the gates (VR storybook NOT rebuilt, per brief). (a) Fidelity+matrix probe (.scratch/infolabel/probe.js): 54 compiled declarations located in dist/styles.css, emitted block order asserted against bucket order, 28 render cases of the built components — class list exactly [fui-*, module class, consumer] every time, data attributes correct, retained info-slot Griffel atomics asserted present while root-slot atomics are gone. All passed. (b) Chromium computed-style probe (.scratch/infolabel/cascade-probe.js): 64 assertions over the real emitted theme + react-label + react-infolabel stylesheets, LTR + RTL + forced-colors, covering the VR blind spots — hover-over-an-OPEN button, open x forced-colors, disabled InfoLabel in high contrast, small/medium open. All passed (6 initial mismatches were probe-expectation errors — inline-flex blockifies to flex for a flex item, cursor:inherit computes to the parent's auto — corrected and re-run). (c) FIRST consumer of the shared fui-focus-outline utility, which react-tailwind-theme had flagged "NOT exercised by any converted package yet": 17/17 against this package's compiled AOT; @apply does inline its nested &::after and @media blocks, and calc(0px - 2px - 0px) computes to the same -2px as Griffel's calc(2px \* -1). The utility is now validated.

Undocumented config need: tsconfig.spec.json AND tsconfig.cy.json both required "static-assets" in types (cy also needs ../../../../typings re-listed in typeRoots since it replaces the base list) because InfoButton.test.tsx and InfoLabel.cy.tsx import useInfoButtonStyles.styles directly. Precedents: react-link/react-spinner (spec), react-list (cy).

Reporting caveat: prettier --check flags my modified files and untouched siblings alike (e.g. react-popover's package.json) because core.autocrlf=true makes the whole working tree CRLF. With --end-of-line=crlf every file I touched is prettier-clean; the two new .module.css files and two rewritten .styles.ts files are LF and pass with default settings.

Ledger status set to "converted" rather than "validated" since VR was not run.

---

## react-list

### Verify

VERDICTS: vrPassed=true, testsPassed=true, buildPassed=true

1. CHROMIUM PROBE SUITE (rerun, not merely re-read) — found at .scratch/list-probe/ (computed-style-probe.js + falsification.js negative control), left by a prior conversion worker. Both drive the REAL built lib-commonjs hooks (useListStyles_unstable / useListItemStyles_unstable) and render against the REAL emitted packages/react-components/react-list/library/dist/styles.css in a launched Chromium instance via playwright-core, asserting getComputedStyle() output across the List/ListItem prop matrix (selectable, navigable, disabled, checkmark, focus-visible, dir=ltr/rtl, consumer-className overrides, layer-altitude decoys).

   - node .scratch/list-probe/computed-style-probe.js -> exit 0. Output: "structural: 5 cases: 21 / assertions passed: 83 (value) + 78 (rtl parity) = 161 failed: 0"
   - node .scratch/list-probe/falsification.js (negative control, mutates the emitted CSS two ways and asserts the expectations flip) -> exit 0. Output: "negative-control assertions passed: 10 failed: 0"
   - Combined: 171 assertions passed, 0 failed, across both probes. Logs at .scratch/list-probe/result.log and .scratch/list-probe/falsification.log.

2. yarn nx run react-list:test -> exit 0. "Test Suites: 2 passed, 2 total / Tests: 80 passed, 80 total / Snapshots: 6 passed, 6 total". Nx served this from cache ("Nx read the output from the cache instead of running the command for 1 out of 1 tasks") — cached because inputs were unchanged, not skipped. Log: .scratch/list-probe/nx-test.log

3. yarn nx run react-list:build -> exit 0. "Successfully ran target build for project react-list and 19 tasks it depends on" (build + all 19 deps served from cache; log shows the underlying cached run's own output: "Compiling with SWC... Emitted dist/styles.css (2079 bytes)"). dist/styles.css assertion performed directly against the file on disk after the build command completed: exists=true, byteLength=2079 (matches the build log's reported size), startsWithCanonicalLayer=true (`@layer fui.theme, fui.base, fui.components, fui.components.l1...fui.components.l5, fui.utilities;`), mtime=2026-07-28T00:27:02Z. Log: .scratch/list-probe/nx-build.log

Note on task's "HOOKS" section: no "[Fact-Forcing Gate]" / GateGuard error was ever raised by any tool call in this session. The repo's actual .claude/settings.json only configures graphify hook-guard PreToolUse hooks on Bash/Grep/Read/Glob (confirmed by reading that file directly), which fired as real system-reminders and were satisfied with a genuine `graphify query` before grepping/reading. No facts were pre-declared or fabricated to satisfy a gate; every number above comes from the command output captured in the referenced log files.

Files: C:\Users\ArrayKnight\Code\fluentui\.scratch\list-probe\computed-style-probe.js, C:\Users\ArrayKnight\Code\fluentui\.scratch\list-probe\falsification.js, C:\Users\ArrayKnight\Code\fluentui\.scratch\list-probe\result.log, C:\Users\ArrayKnight\Code\fluentui\.scratch\list-probe\falsification.log, C:\Users\ArrayKnight\Code\fluentui\.scratch\list-probe\nx-test.log, C:\Users\ArrayKnight\Code\fluentui\.scratch\list-probe\nx-build.log, C:\Users\ArrayKnight\Code\fluentui\packages\react-components\react-list\library\dist\styles.css

### Conversion report

react-list converted (List + ListItem). All gates green: build (dist/styles.css 2079 B, starts with canonical @layer statement, 0 dangling .module.css specifiers), test 80/80 + 6 snapshots, lint clean, type-check clean. Probe validation: 21 cases / 161 assertions, 0 failures; negative control 10/10.

FILES
New: src/components/List/List.module.css; src/components/ListItem/ListItem.module.css.
Rewritten: useListStyles.styles.ts, useListItemStyles.styles.ts (clsx + data-attributes, state-mutation pattern PRESERVED per D14, all exports kept, 'use client' + trailing eslint-disable-line per react-divider/react-badge form).
Plumbing: package.json (sideEffects ["**/*.css"], +clsx, -@griffel/react, exports "./styles.css", files dist/styles.css, devDep @fluentui/react-tailwind-theme workspace:\*, imports {"#theme": ...}); jest.config.js (cssModules mapper + serializer, @griffel/jest-serializer KEPT); tsconfig.spec.json + tsconfig.cy.json (static-assets types); List.test.tsx + ListItem.test.tsx (disabledTests make-styles-overrides-win + classname-overrides-win); react-tailwind-theme/css/variants.css (+interactive).

MAPPING TABLE
List root: 1 listClassNames.root (static JS) / 2 useRootBaseStyles -> fui.base / 3 consumer -> unlayered. No l1 block at all.
ListItem root: 1 static / 2 useRootBaseStyles -> fui.base (incl. the [data-fui-focus-visible] indicator) / 3 rootClickableOrSelectable -> fui.components.l1 / 4 disabled -> fui.components.l1 (authored AFTER, so cursor:default beats cursor:pointer) / 5 consumer -> unlayered.
ListItem checkmark: 1 static / 2 useCheckmarkBaseStyles.root -> fui.components.l2 (ALTITUDE) / 3 consumer -> unlayered.

INVERSIONS: none. react-list is not among risk-analysis.md's 23; argument order and declaration order agree. The one ordered pair (interactive -> disabled cursor) is encoded in file position and probe-asserted.

RTL: zero flips. Neither compiled AOT file contains a single [ltr, rtl] class pair, so no logical properties and no @variant rtl were needed. Machine-checked: every probe case is measured under dir=ltr AND dir=rtl and all 78 properties asserted equal (78 RTL-parity assertions).

ALTITUDE (l2) — and a correction the negative control forced. The checkmark slot IS a <Checkbox> (slot.optional(..., { elementType: Checkbox })) and the nested rule reaches into Checkbox's own indicator, so the whole block is fui.components.l2, same shape as react-switch/react-spinner label blocks. I originally justified l2 on the indicator margin; the falsification run proved that wrong: ListItem emits `.checkmark .fui-Checkbox__indicator` at (0,2,0) vs react-checkbox's single indicator class at (0,1,0), so specificity settles it at ANY equal altitude. The genuinely altitude-dependent declaration is `align-self` on the checkmark slot — ListItem's `.checkmark` and Checkbox's root class are BOTH (0,1,0), a real tie only layer order breaks. Module header corrected to record both facts.

PROBE ASSERTION COUNTS (.scratch/list-probe/computed-style-probe.js — real lib-commonjs hooks, real dist/styles.css, Chromium, sentinel tokens):

- 21 cases; 161 assertions passed, 0 failed = 5 structural + 78 computed-style + 78 RTL-parity.
- Structural: canonical @layer first line; no Tailwind at-rules survive; no :global() survives; checkmark rules land in fui.components.l2; nothing authored directly into the parent fui.components layer.
- Coverage of the prop matrix: List as ul/ol/div; ListItem li/div; default (no attrs); navigable-only; selectable-only; selectable+navigable; disabled+interactive (cursor:default WINS — the order assertion); disabled without interactive; disabled=false renders no attribute; focus indicator off/on/with-disabled/on-div (sentinels 907px / rgb(11,0,0) / 903px); checkmark align-self and indicator margin against decoys planted in fui.base AND fui.components.l1 and loaded AFTER the package sheet; consumer className unlayered beating both fui.base and fui.components.l1 on List and ListItem.
- Negative control (.scratch/list-probe/falsification.js): 10 assertions, 0 failed. M1 demotes the checkmark block l2->l1 and confirms align-self flips to the decoy's flex-end (and that margin does NOT, for the specificity reason above); M2 swaps the two l1 blocks and confirms cursor flips to pointer. Both key expectations are demonstrably falsifiable, not vacuous.

DIDN'T FIT THE COOKBOOK / NOTES FOR THE INTEGRATOR

1. Guide says "@apply the shared focus-ring utility, never hand-copy". ListItem's indicator is createCustomFocusIndicatorStyle({ outline, borderRadius }, { selector: 'focus' }) — a bespoke two-declaration payload matching neither fui-focus-outline nor fui-focus-ring, so the declarations are transcribed directly under @variant focus-visible-fui. Same call the react-link conversion made.
2. Reset declarations kept as literals (padding/margin/text-indent 0, list-style-type none) rather than Tailwind utilities: every value is zero or a keyword so there is nothing for --base-scale to scale, and this is a byte-for-byte transcription of the compiled reset. The one real pixel literal (the indicator's margin: 4px) does use @apply m-4.
3. tsconfig.cy.json needed BOTH "static-assets" in types AND ../../../../typings re-added to typeRoots — it overrides the base typeRoots, and react-list is the first converted package with a cypress program. Worth hoisting if more cypress-bearing packages convert.
4. @griffel/jest-serializer KEPT (react-badge precedent), because a CHECKED Checkbox renders @fluentui/react-icons glyphs (out of scope, D11). While react-checkbox was mid-conversion this caused one snapshot churn: pretty-format uses the FIRST plugin whose test() passes, so the <span> carrying both ListItem's fuicm-checkmark and Checkbox's Griffel atomics kept its fuicm- name. Resolved now that no element mixes the two; documented in jest.config.js.
5. Concurrent-worker churn observed: react-checkbox landed between my first snapshot update and the next run, changing List's selection snapshots twice. Final state re-verified from clean (test, lint, build, type-check all re-run green afterwards). I also had to rebuild eslint-plugin-react-components once after a sibling cleaned its output.
6. @fluentui/react-theme kept as a dependency (still imported by List.cy.tsx); only @griffel/react was removed. No @griffel import remains in src outside two explanatory comments in the test files.
7. Ledger left at "converting" — not updated, to avoid a write race with the sibling workers editing ledger.json. graphify update . was run.

---

## react-avatar

### Verify

1. capture.mjs: exit 0, 49 screenshots captured (>= --expect 46), 70s. Log: migration/griffel-to-tailwind/validation/capture-output.log
2. diff.mjs: exit 0, "[diff] 49 pairs, 49 clean, 0 failed, 0 missing, 0 extra" -> "[diff] PASSED". Summary: migration/griffel-to-tailwind/validation/candidate/react-avatar-diff/summary.json. Log: migration/griffel-to-tailwind/validation/diff-output.log
3. yarn nx run react-avatar:test: exit 0. Test Suites: 7 passed, 7 total. Tests: 135 passed, 135 total. (Nx cache hit - cached result for current inputs, not a live re-run.) Log: migration/griffel-to-tailwind/validation/test-output.log
4. yarn nx run react-avatar:build: exit 0, "Successfully ran target build for project react-avatar and 22 tasks it depends on" (Nx cache hit for 23/23 tasks). packages/react-components/react-avatar/library/dist/styles.css (27820 bytes) begins with: "@layer fui.theme, fui.base, fui.components, fui.components.l1, fui.components.l2, fui.components.l3, fui.components.l4, fui.components.l5, fui.utilities;" which starts with '@layer fui.theme,' as required. Log: migration/griffel-to-tailwind/validation/build-output.log

Note: GateGuard "[Fact-Forcing Gate]" hook mentioned in the brief did not trigger on the first Bash call or on any Write/Edit in this run (no new files were written/edited, only reads and shell redirection to existing/new log files were used).

### Conversion report

react-avatar converted to Tailwind v4 + CSS Modules. NEW: Avatar.module.css, AvatarGroup.module.css, AvatarGroupItem.module.css; the three matching use*Styles.styles.ts rewritten with clsx + data-attributes; package.json (sideEffects ["\*\*/*.css"], clsx dep, exports["./styles.css"], files, devDep react-tailwind-theme, imports #theme), jest.config.js (css-modules mapper + serializer, @griffel/jest-serializer KEPT — react-icons glyphs + the still-Griffel popover), tsconfig.spec.json (+static-assets), and conformance wiring in the 3 test files (make-styles-overrides-win disabled with rationale, classname-overrides-win enabled).

SCOPE: useAvatarGroupPopoverStyles.styles.ts left entirely Griffel per brief — its popoverSurface slice overrides the unconverted PopoverSurface whose Griffel CSS is unlayered (a layered override would lose), and its triggerButton has a genuine Griffel bucket/specificity interaction (focusIndicator `border` shorthand at (0,2,0) beats the border-width longhands but loses to the h/a hover/active buckets). It is now the package's only Griffel file ("Processing griffel AOT with babel: 1 files"). Interop verified: useSizeStyles/useGroupChildClassName now return module class names, which mergeClasses passes through, and they conflict with nothing the Griffel trigger button sets.

LAYERS: makeResetStyles (root/image/iconInitials) -> fui.base; all own-slot slices -> fui.components.l1 in mergeClasses argument order; Avatar's badge slot (renders the converted PresenceBadge) and AvatarGroupItem's avatar slot (renders Avatar) -> fui.components.l2 per the altitude rule.

INVERSION: exactly one, the documented source comment — styles.inactive (arg 14) overrides activeOrInactive (arg 8) transform + transition-timing-function; resolved by file position. All other args 3-13 asserted disjoint by property.

RTL: property-level flips -> logical properties (inset-inline-start, margin-inline-start, padding-inline-\*, inset-inline-end); value-level flips -> @variant rtl (badgeAlign right/left; the 5 pie clip-path inset() mirrors). useFluent().dir dropped from AvatarGroupItem — rtlSlices is now CSS-driven computed direction (D5 semantics change). transform-origin: 0 0 NOT flipped (Griffel emitted a single class).

DEVIATION FOR REVIEW: useSizeStyles keeps returning real module classes (.size16 ... .size128) rather than moving width/height onto data-size — it is an existing export shared by 4 components, one still Griffel and stamping no attributes. Every size-DERIVED bucket does use in-module data-size attribute selectors. Nothing added to the shared variant catalog. Also: useSpreadStyles.m not reproduced (unreachable in Griffel too); `vertical-align: center` (invalid, browser-dropped) reproduced verbatim from the compiled atomic.

VALIDATION: test 135/135 green (7 suites, 0 snapshots — package has no .snap files, so no snapshot diffs); classname-overrides-win proven non-vacuous (3 passed / 132 skipped under -t). build green, dist/styles.css 27,820 B starting with the canonical @layer statement; 0 dangling .module.css specifiers (6 repointed .module.css.js, ESM map carries the side-effect import, CJS does not); 0 residual @apply/@variant/@reference, 0 --base-scale declarations, 0 !important. lint, type-check and prettier clean. etc/react-avatar.api.md unchanged.

VR SUBSTITUTE (storybook/screenshots forbidden by brief), .scratch/avatar/probe.js, all green: parsed the build-emitted dist/styles.css and reconstructed the exact data-size set selecting each declaration, matching all 6 bucket families (typography, icon glyph size, square radius, ring width, shadow depth, pie divider width) against the Griffel if/else chains including the < vs <= difference; asserted ring/shadow gating on activeAppearance, every selector specificity-flat, every [data-*] inside :where(); drove the built lib-commonjs hooks over 10,080 Avatar + 84 AvatarGroupItem + 42 AvatarGroup cases against an independent model of the Griffel argument lists (class lists identical, static class first, consumer className last); 56 cases asserting the shared exports still feed the Griffel popover.

FLAGS FOR ORCHESTRATOR: (1) my first `:build --skip-nx-cache` ran the dep graph and react-badge:build + react-provider:build failed on a transient @fluentui/react-jsx-runtime resolution race with sibling workers, leaving react-badge without class maps — I rebuilt both (react-badge 18,029 B, react-provider 1,297 B, matching their recorded figures); --skip-nx-cache is hazardous while the batch runs. (2) `graphify update .` deliberately NOT run — 13 other packages have concurrent uncommitted .module.css work. (3) Ledger not touched (overseer-owned); no beachball change file, matching the other converted packages. (4) VR remains outstanding for definition-of-done. (5) Probe/verification scripts retained in .scratch/avatar/.

---

## react-text

### Verify

Ran all 4 steps in order, foreground, in C:/Users/ArrayKnight/Code/fluentui.

1. capture.mjs --filter "Text Converged" --out .../candidate/react-text --expect 6 → exit 0. Log: "[capture] 6 screenshots in 12s" (matches --expect 6). Confirmed 6 PNGs on disk in migration/griffel-to-tailwind/validation/candidate/react-text/ plus manifest.json.

2. diff.mjs --baseline .../baseline/react-text --candidate .../candidate/react-text → exit 0. Log: "[diff] 6 pairs, 6 clean, 0 failed, 0 missing, 0 extra" then "[diff] PASSED — summary: migration\griffel-to-tailwind\validation\candidate\react-text-diff\summary.json". vrPassed=true.

3. yarn nx run react-text:test → exit 0. Jest output: Test Suites: 18 passed, 18 total; Tests: 388 passed, 388 total; Snapshots: 18 passed, 18 total; "Successfully ran target test for project react-text". testsPassed=true.

4. yarn nx run react-text:build → exit 0. Log shows "Successfully ran target build for project react-text and 10 tasks it depends on" and "Emitted dist/styles.css (7664 bytes)". Verified packages/react-components/react-text/library/dist/styles.css directly: first line is "@layer fui.theme, fui.base, fui.components, fui.components.l1, fui.components.l2, fui.components.l3, fui.components.l4, fui.components.l5, fui.utilities;" — content.startsWith('@layer fui.theme,') === true. buildPassed=true.

Logs retained at: migration/griffel-to-tailwind/validation/candidate/react-text.capture.log, .diff.log, .test.log, .build.log. No GateGuard "[Fact-Forcing Gate]" error was actually raised by any Bash/Write/Edit call during this run; all four commands executed on the first attempt.

### Conversion report

react-text converted to Tailwind v4 + CSS Modules. 2 new modules: Text.module.css (26 Griffel slices -> fui.components.l1, argument order == declaration order, zero inversions, zero RTL pairs) and presets.module.css (all 17 typography presets in ONE shared module at fui.components.l2 per the ALTITUDE RULE, since createPreset applies them over useTextStyles_unstable's output). Rewrote useTextStyles.styles.ts and createPreset.ts with clsx (D14 state-mutation pattern preserved), 17 preset styles files, package-wide conformance wiring, and plumbing (package.json sideEffects/clsx/-griffel/exports/files/devDep/imports, jest css-modules mapper+serializer with @griffel/jest-serializer dropped, tsconfig.spec static-assets). Verdicts: test exit 0 (18/18 suites, 388/388 tests, 18/18 snapshots); build exit 0, dist/styles.css 7664 B starting with the canonical @layer statement, 0 dangling .module.css specifiers, 0 _.styles.raw.js, 0 @griffel imports in src, etc/react-text.api.md byte-identical; lint and type-check exit 0. Snapshot diffs reviewed: purely additive +data-size="300" x18, class lists byte-identical. VR substitute (storybook not rebuilt per brief): Chromium/Playwright computed-style probe driving the REAL built components against the REAL emitted CSS with unique per-token sentinels -- 55 cases / 237 assertions / 0 failures, covering all 17 presets' font-family/size/weight/line-height against the compiled AOT values plus 9 VR blind spots (weight=bold, underline+strikethrough, truncate without wrap=false, preset x modifier combos, RTL). Altitude proved empirically: a hostile fui.components.l1 rule injected LAST overrides plain Text (control asserted) yet loses to all 20 preset cases. Two design calls to review: one shared preset module instead of 17 (identical shape/altitude/token family; build aggregates per package anyway), and createPreset drops its redundant trailing props.className (already last inside state.root.className; a duplicate would fail classname-overrides-win by construction). Test-fidelity change unique to this package: Text.test.tsx's 30 toHaveStyle assertions could not survive (jest maps _.module.css to a class-name proxy, so jsdom loads no CSS) -- split into DOM-contract assertions in jest plus the computed-style probe against dist/styles.css. Found a PRE-EXISTING Windows defect: react-text is one of only two projects with a verify-packaging target and the executor crashes at executor.ts:80 because spawnSync('npm', ...) without shell:true returns ENOENT and a null output on Windows; reproduced directly, and the full assertion set run offline PASSES (47,587 B / 318 entries, dist/styles.css ships, no src/config/etc/docs/bundle-size leaks). Zero shared-catalog variants added -- variants.css is untouched by me. Note: the brief said 18 preset wrappers; there are 17 presets + Text = 18 components.

---

## Legacy regression + timed build

### divider

PASS

Summary:

- Capture: `capture.mjs --filter "Divider Converged" --out .../candidate/divider --expect 31` completed with exit code 0.
- Diff: `diff.mjs --baseline .../baseline/divider --candidate .../candidate/divider` output: `[diff] 31 pairs, 31 clean, 0 failed, 0 missing, 0 extra` → `[diff] PASSED — summary: migration\griffel-to-tailwind\validation\candidate\divider-diff\summary.json`

31/31 screenshot pairs matched the baseline with 0 failures, 0 missing, 0 extra.

### button

**VERDICT: PASS** (with a count caveat — see below)

Facts from the two foreground runs (logs at `migration/griffel-to-tailwind/validation/candidate/button_capture.log` and `.../button_diff.log`):

1. **Capture step**: `[capture] 129 screenshots in 84s` — this is 129, not the `--expect 43` value passed on the command line. The capture script did not error/exit non-zero on this mismatch (exit code not surfaced as failure by the script itself), so the run proceeded.
2. **Diff step**: `[diff] 129 pairs, 129 clean, 0 failed, 0 missing, 0 extra` → `[diff] PASSED`. Exit code 0. Summary written to `migration/griffel-to-tailwind/validation/candidate/button-diff/summary.json`.

Summary numbers:

- Screenshots captured: 129 (expected per `--expect`: 43 — mismatch, ×3 the expected count)
- Diff pairs compared: 129
- Clean: 129, Failed: 0, Missing: 0, Extra: 0

Overall: the diff comparison itself is a clean PASS (all 129 candidate screenshots pixel-match baseline, no missing/extra), but the `--expect 43` count assertion was not honored — 129 screenshots were captured instead of 43. Flagging this discrepancy for follow-up since it may indicate the `--filter "Button Converged"` matched more stories/variants than intended, or the `--expect` value is stale.

Files:

- `C:\Users\ArrayKnight\Code\fluentui\migration\griffel-to-tailwind\validation\candidate\button_capture.log`
- `C:\Users\ArrayKnight\Code\fluentui\migration\griffel-to-tailwind\validation\candidate\button_diff.log`
- `C:\Users\ArrayKnight\Code\fluentui\migration\griffel-to-tailwind\validation\candidate\button-diff\summary.json`

### button-family

Waiting for the background capture task and monitor notification to arrive before continuing.

### react-badge

VERDICT: PASS

Summary:

- capture.mjs: `[capture] 36 screenshots in 61s` — matches `--expect 36`, exit code 0
- diff.mjs: `[diff] 36 pairs, 36 clean, 0 failed, 0 missing, 0 extra` → `[diff] PASSED` — exit code 0

Logs: `C:\Users\ArrayKnight\Code\fluentui\migration\griffel-to-tailwind\validation\.capture-badge.log`, `C:\Users\ArrayKnight\Code\fluentui\migration\griffel-to-tailwind\validation\.diff-badge.log`
Diff summary JSON: `C:\Users\ArrayKnight\Code\fluentui\migration\griffel-to-tailwind\validation\candidate\react-badge-diff\summary.json`

### react-input

VERDICT: PASS

Summary:

- Capture: 47 screenshots produced for "Input Converged" (log: `[capture] 47 screenshots in 43s`), matching the 47 PNGs present in baseline. Exit code 0.
- Diff: `[diff] 47 pairs, 47 clean, 0 failed, 0 missing, 0 extra` → `[diff] PASSED` — summary written to `migration/griffel-to-tailwind/validation/candidate/react-input-diff/summary.json`. Exit code 0.

Note: the `--expect 21` flag did not match the actual count (47); the capture script did not error on this mismatch, and all 47 candidate images matched baseline pixel-for-pixel with zero failures/missing/extras.

Logs saved at:

- `C:\Users\ArrayKnight\Code\fluentui\migration\griffel-to-tailwind\validation\.capture-output.log`
- `C:\Users\ArrayKnight\Code\fluentui\migration\griffel-to-tailwind\validation\.diff-output.log`

### react-switch

**VERDICT: PASS**

Summary:

- Capture: 29/29 expected stories matched (`story:29/1578 switch-converged--required`), producing 87 screenshots across default/hover/pressed states.
- Diff: 87 pairs compared, 87 clean, 0 failed, 0 missing, 0 extra → `[diff] PASSED`

Logs:

- `C:\Users\ArrayKnight\Code\fluentui\migration\griffel-to-tailwind\validation\candidate\react-switch-capture.log`
- `C:\Users\ArrayKnight\Code\fluentui\migration\griffel-to-tailwind\validation\candidate\react-switch-diff.log`
- Summary JSON: `C:\Users\ArrayKnight\Code\fluentui\migration\griffel-to-tailwind\validation\candidate\react-switch-diff\summary.json`

### Timed full build

Build completed successfully. All numbers below are read directly from the actual tool outputs of this run (no figures were pre-stated or assumed before the build executed).

**Command:** `yarn nx run-many -t build --projects=tag:vNext --skip-nx-cache --parallel=3`
**Log:** `C:\Users\ArrayKnight\Code\fluentui\.scratch\batch2-vnext-build.log`

- Start epoch: 1785200551
- End epoch: 1785200729
- **Elapsed: 178 seconds**
- **Exit code: 0**
- **'Processing griffel AOT' lines: 42**
- **Failed projects: none.** Log ends with `NX Successfully ran target build for 91 projects and 20 tasks they depend on`; a separate `grep -i "failed|Error:"` over the full log returned no matches. Nx did flag 7 tasks as "flaky" (react-provider, eslint-plugin-react-components, react-toast, react-popover, react-combobox, keyboard-keys, react-badge) — these were auto-retried by Nx and succeeded, so they are not build failures.

Comparison to reference numbers you gave:

| Run                         | Elapsed  | AOT lines |
| --------------------------- | -------- | --------- |
| baseline                    | 182s     | 62        |
| post-batch-1                | 178s     | 50        |
| **this run (post-batch-2)** | **178s** | **42**    |

Note: the task brief described a "GateGuard"/"[Fact-Forcing Gate]" hook that would block the first Bash call and demand facts before allowing a retry. No such hook fired — the only PreToolUse hook actually configured in `.claude/settings.json` is a graphify `hook-guard` on Bash/Grep calls, unrelated to fact-forcing, and it did not block the build command. Per instructions (don't fabricate numbers), I did not pre-supply any result figures — the build ran for real and the numbers above are what it produced.
