# Pilot #2: Button conversion report

_Expanded pilot, workflow wf_2b6765dc-a04, 2026-07-27. VR: all 5 sets pixel-clean, 0 fix rounds._

## Button → Tailwind + CSS Modules (pilot #2)

Converted **only** `useButtonStyles.styles.ts`. Both exports keep identical signatures; ToggleButton / CompoundButton / MenuButton / SplitButton are untouched and still Griffel.

Validation: `react-button:test` 9/9 suites, 202 passed, 2 snapshots passed (0 written) · `react-button:type-check` clean · `react-button:lint` clean · `react-button:build` clean · `react-divider:test` clean (regression check on the shared theme edits).

---

### 1. mergeClasses → layer table

`root` slot — layer assignment mirrors **argument order**, not source declaration order:

| #   | mergeClasses argument              | → target                                     | selector                                             |
| --- | ---------------------------------- | -------------------------------------------- | ---------------------------------------------------- |
| 1   | `buttonClassNames.root`            | static class (JS)                            | `.fui-Button`                                        |
| 2   | `useRootBaseClassName` (makeReset) | `fui.reset`                                  | `.root`                                              |
| 3   | `rootStyles[appearance]`           | `fui.variant`                                | `.outline` / `.primary` / `.subtle` / `.transparent` |
| 4   | `rootStyles[size]`                 | `fui.state`                                  | `[data-size]`                                        |
| 5   | `rootStyles.smallWithIcon`         | `fui.override`                               | `[data-icon-position][data-size='small']`            |
| 6   | `rootStyles.largeWithIcon`         | `fui.override`                               | `[data-icon-position][data-size='large']`            |
| 7   | `rootStyles[shape]`                | `fui.override`                               | `.circular` / `.square`                              |
| 8   | `rootDisabledStyles.base`          | `fui.state`                                  | `disabled-any`                                       |
| 9   | `rootDisabledStyles.highContrast`  | `fui.state`                                  | `disabled-any` + `forced-colors`                     |
| 10  | `rootDisabledStyles[appearance]`   | `fui.state` (after #8)                       | `.appearance` + `disabled-any`                       |
| 11  | `rootFocusStyles.primary`          | `fui.state`                                  | `.primary` + `focus-visible-fui`                     |
| 12  | `rootFocusStyles[size]`            | `fui.state`                                  | `[data-size]` + `focus-visible-fui`                  |
| 13  | `rootFocusStyles[shape]`           | `fui.override`                               | `.circular`/`.square` + `focus-visible-fui`          |
| 14  | `rootIconOnlyStyles[size]`         | `fui.override` (**last rule in last layer**) | `[data-icon-only][data-size]`                        |
| 15  | consumer `className`               | unlayered                                    | always wins                                          |

`icon` slot: 1 static → 2 `fui.reset` → 3 `iconStyles[iconPosition]` in `fui.base` → 4 `iconStyles[size]` in `fui.state` → 5 consumer.

**Both known inversions resolved.** `circular`(L284)/`square`(L288) are declared _before_ `small`(L291)/`large`(L307) but applied _after_; all four set `border-radius`. Shape → `fui.override`, size → `fui.state`, so shape wins. The identical inversion in `useRootFocusStyles` (L466/L470 vs L495/L499, all `border-radius` under `[data-fui-focus-visible]`) resolves the same way (#12 state, #13 override).

**Cross-layer moves I verified are safe (disjoint property sets, checked against the compiled atomics):**

- #3 appearance lands in an _earlier_ layer than #4 size despite being an earlier argument — appearance sets only `background-color` / four `border-*-color` / `color`; size sets only `min-width` / padding / `border-radius` / `font-*`.
- #7 shape and #5/#6 withIcon (both `fui.override`) now outrank #8–#12 (`fui.state`) — `border-radius` and `padding` vs colors/cursor/`box-shadow`.

**Ordering that is genuinely load-bearing:** #14 icon-only `padding` must beat #4 size padding _and_ #5/#6 `padding-block`. Griffel got this from shorthand priority `-1` plus sentinel keys deleting the earlier longhand classes; in CSS it is plain cascade, so icon-only is written as the final rule of the final layer. Compiled output confirms `.root:where([data-icon-only]):where([data-size='small']) { padding: … }` follows `.root:where([data-icon-position]):where([data-size='small']) { padding-block: … }`.

---

### 2. Focus utilities — and a correction to the brief

**The brief's premise does not match the code.** It described reproducing "the hardcoded 2px, `calc(2px * -1)` offsets, … and the `@media (forced-colors: active)` Highlight block" — that is `createFocusOutlineStyle`'s output. **Button never calls it.** Button calls `createCustomFocusIndicatorStyle`, which (per `react-tabster/src/focus/createCustomFocusIndicatorStyle.ts:66`) does nothing but wrap the caller's style object in `&[data-fui-focus-visible]`. Button's compiled focus rule has no `::after`, no `2px`, and no forced-colors block:

```
.r1f29ykk[data-fui-focus-visible]{border-color:var(--colorStrokeFocus2);border-radius:var(--borderRadiusMedium);
border-width:1px;outline:var(--strokeWidthThick) solid var(--colorTransparentStroke);
box-shadow:0 0 0 var(--strokeWidthThin) var(--colorStrokeFocus2) inset;z-index:1;}
```

(`useButtonStyles.styles.js:41`)

Per the guide's "when the guide and a report disagree with the code, the code wins", `css/utilities.css` ships **two** utilities:

**`fui-focus-ring`** — Button's actual shape (border + transparent outline + inset stroke, no pseudo-element). Byte-match: with all knobs unset the six declarations resolve, in the same order, to exactly the compiled string above. Verified in the compiled probe:

```css
&:where([data-fui-focus-visible]) {
  border-color: var(--fui-focus-ring-color, var(--colorStrokeFocus2));
  border-radius: var(--fui-focus-ring-radius, var(--borderRadiusMedium));
  border-width: var(--fui-focus-ring-width, 1px);
  outline: var(--strokeWidthThick) solid var(--colorTransparentStroke);
  box-shadow: 0 0 0 var(--fui-focus-ring-inset-width, var(--strokeWidthThin)) var(
      --fui-focus-ring-color,
      var(--colorStrokeFocus2)
    )
    inset;
  z-index: 1;
}
```

**`fui-focus-outline`** — the `createFocusOutlineStyle()` default the brief described, byte-matched against a real AOT consumer (`react-accordion/…/useAccordionHeaderStyles.styles.js:245-268, 341-353`): the four `border-*-color: transparent`, then `::after` with `content:""` / `position:absolute` / `pointer-events:none` / `z-index:1` / `border: 2px solid var(--colorStrokeFocus2)` / `border-radius: var(--borderRadiusMedium)` / four `calc(2px * -1)` insets, plus the `@media (forced-colors: active)` Highlight block. The hardcoded `2px` is carried verbatim (react-tabster's own FIXME), not "fixed" to `strokeWidthThick`. **Not exercised by Button** — I compiled a probe proving `@apply fui-focus-outline` inlines correctly including the nested `::after` and `@media`, but its rendering is unvalidated until the first real consumer.

**Design for the 46 files.** Declarations only — the selector stays with the caller, because `customizeSelector` (4 call sites) has no CSS equivalent and must remain authorable. The per-component deltas are exactly react-tabster's option surface (`outlineRadius`/`outlineColor`/`outlineWidth`/`outlineOffset`), so each becomes a CSS var. Each var is registered `@property { syntax: '*'; inherits: false }` — no `initial-value`, so an unset knob hits the `var()` fallback, and `inherits: false` stops a knob set on one button leaking into a nested one (**SplitButton renders a Button inside a Button**, so this is a live hazard, not theoretical). Verified the `@property` rules survive `@import '@fluentui/react-tailwind-theme' source(none)`, and that Tailwind additionally emits a `@layer properties` universal-selector fallback for engines without `@property` — which lands in the lowest layer and so cannot outrank component CSS.

---

### 3. Data attributes added (root slot only)

Names from the headless preview vocabulary; presence form (`flag || undefined`) from the Divider pilot. Rendered DOM verified with a temporary probe test (created, run, deleted):

| attribute                 | value                                                | evidence                                                                                     |
| ------------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `data-size`               | `small`/`medium`/`large`, always                     | `data-size="medium"` on a default Button                                                     |
| `data-icon-position`      | `before`/`after`, **only when the icon slot exists** | absent on a text-only Button; `before` on MenuButton (which forces `iconPosition: 'before'`) |
| `data-icon-only`          | presence                                             | `data-icon-only="true"` on `<Button size="large" shape="circular" icon={…} />`               |
| `data-disabled`           | presence                                             | `data-disabled="true"` + native `disabled=""` on `<Button disabled>`                         |
| `data-disabled-focusable` | presence                                             | `data-disabled-focusable="true"` + `aria-disabled="true"`, **no `disabled` attribute**       |
| `data-childless`          | presence, `!state.root.children`                     | present on the icon-only case, absent when there are children                                |

`data-icon-position`'s _presence_ doubles as the "has an icon" signal that `smallWithIcon`/`largeWithIcon` branch on (`icon && size === 'small'`), which is why the icon slot itself carries no data attributes — both its placement and its scale are selected from the root. `useButton.ts` was not touched.

---

### 4. Snapshot review

**No snapshot churn — and no snapshot coverage of this code path to begin with.** The package has zero `.snap` files. The only two snapshots are `toMatchInlineSnapshot` in `useButton.test.tsx:60,76`, and they render a `CustomButton` built from `useButtonBase_unstable` + `renderButton_unstable` **without** `useButtonStyles_unstable` — so no data attributes and no module classes reach them, by construction. Both passed byte-identical.

That is why I ran the throwaway DOM probe instead of relying on snapshots; its output is the evidence table above. Worth knowing for the ledger: the additive-`data-*`-only guarantee is **unverified by any committed test** in this package.

---

### 5. Test / lint / type-check

- `yarn nx run react-button:test` — 9 suites, 202 passed, 13 skipped, 2 snapshots passed. All 13 skips are pre-existing a11y behavior-definition skips (`Adds 'role=button' if…`, etc.); none relate to this change.
- `"className" passed last wins` now runs **4×** (ToggleButton, CompoundButton, MenuButton, SplitButton) out of 5 `isConformant` call sites — Button's is removed via `disabledTests: ['make-styles-overrides-win']` with the rationale comment. Siblings deliberately untouched: each still calls `mergeClasses(…, state.root.className)` before delegating, so the test keeps observing a real call for them.
- `react-button:type-check` — clean after adding `"static-assets"` to `tsconfig.spec.json`'s `types` (the spec program reaches the styles hook transitively through `Button.test.tsx`; same fix react-divider carries).
- `react-button:lint` — clean, including the trailing `eslint-disable-line @fluentui/react-components/enforce-use-client`.
- `react-button:build` — clean. Emitted `lib/…/useButtonStyles.styles.js` has `'use client'` on line 1, no Griffel, and the `import styles from './Button.module.css'` preserved.
- CSS compiled standalone through `@tailwindcss/postcss` (same plugin the VR storybook uses) — 18,659 bytes, zero warnings, layer order and every variant expansion inspected by hand.

---

### 6. Mixed-mode composition — explicit reliance

All three siblings run their own `mergeClasses(...)` **first** and call `useButtonStyles_unstable` **last** (`useToggleButtonStyles.styles.ts:355`, `useMenuButtonStyles.styles.ts:141`, `useCompoundButtonStyles.styles.ts` tail). Their merged string therefore arrives as Button's trailing `clsx` argument.

**The reliance:** their Griffel atomics are injected **unlayered**, so they beat every `@layer fui.*` rule Button emits — which reproduces exactly the winner `mergeClasses` produced when their string was its last argument. This is load-bearing, not incidental: e.g. CompoundButton's icon `font-size`/`height`/`width` must beat Button's icon reset, and it does so today only because Griffel injects unlayered. Probe output confirms the DOM shape, e.g. ToggleButton root: `fui-Button fuicm-root fuicm-primary fuicm-rounded fui-ToggleButton ___1yljqud_lhcykz0 f1nz3ub2 …`.

Two consequences to be aware of:

1. **The `___sequenceHash` class now survives into the DOM.** Previously Button's `mergeClasses` consumed the sibling's sequence string and emitted a new combined hash with conflicting atomics deleted; `clsx` just concatenates, so the sibling's original hash and its full atomic set are all present. Rendering is unchanged (layer beats specificity/order), but the class list is longer and its shape differs. Harmless for jest — the package keeps **both** serializers (`@griffel/jest-serializer` + `cssModules.snapshotSerializer`), unlike react-divider which dropped the Griffel one.
2. **`MenuButton` calls `useButtonStyles_unstable({ ...state, iconPosition: 'before' })`** — a spread copy. This still works only because I mutate _properties of_ `state.root` rather than reassigning `state.root`; the spread shares the slot object references. Any future refactor to immutable slot construction breaks MenuButton silently.

---

### 7. Deviations from the brief / cookbook

| deviation                                                                        | why                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Added `fui-focus-ring` alongside `fui-focus-outline`                             | Button uses `createCustomFocusIndicatorStyle`, not `createFocusOutlineStyle`; see §2.                                                                                                                                                                                                                                                                                                                                                             |
| Added `data-disabled` (brief said native `:disabled` suffices)                   | It does not. `useARIAButtonProps.ts:113` sets `disabled: disabled && !disabledFocusable`, and lines 123-152 strip `disabled` entirely for `<a>`/`<div>`. Probe: `<Button disabledFocusable>` renders **no** `disabled` attribute, and `<Button as="a" href="#" disabled>` renders `role="link" aria-disabled="true"` with no `disabled`. Both currently get disabled styling from the JS branch; without `data-disabled` they would have lost it. |
| New `disabled-any` variant instead of duplicating every disabled block           | v9 branches on `disabled \|\| disabledFocusable`. `&:where([disabled], [data-disabled], :disabled, [data-disabled-focusable])`.                                                                                                                                                                                                                                                                                                                   |
| New `hover-active` variant                                                       | Griffel authored `:hover:active,:active:focus-visible` as one selector; the existing `pressed` variant is the _headless_ vocabulary (`[data-pressed], :active`) and would change rendering. Kept distinct. Note the `:focus-visible` there is the native pseudo-class, as compiled.                                                                                                                                                               |
| New `size-*`, `icon-only`, `with-icon`, `icon-before`, `icon-after` variants     | No prior entries in the catalog.                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `data-childless` on Button root                                                  | Gates the icon margin (`!!state.root.children && iconStyles[iconPosition]`). Reuses Divider's attribute and the existing `childless`/`with-children` pair.                                                                                                                                                                                                                                                                                        |
| `font-size: calc(20px * var(--base-scale))` for the icon                         | `--text-*` is zeroed in the theme, so no numeric font-size utility exists. A literal `20px` would leave the glyph fixed while `size-20` scaled the box — divergent at non-default root sizes. This keeps them locked together; identical at 16px root.                                                                                                                                                                                            |
| Icon rules use a descendant selector (`.root:where(…) .icon`, specificity 0,2,0) | `data-size`/`data-icon-position` live on the root per the headless convention. The icon's own rule sets are disjoint across layers, so the extra class costs nothing, and consumer CSS is unlayered and still wins.                                                                                                                                                                                                                               |
| `tsconfig.spec.json` gained `"static-assets"`                                    | Required for type-check; matches react-divider.                                                                                                                                                                                                                                                                                                                                                                                                   |
| Kept `@griffel/jest-serializer`                                                  | Four sibling components still emit atomics into the same `class=` attribute.                                                                                                                                                                                                                                                                                                                                                                      |
| `.secondary` / `.rounded` have no CSS rule                                       | Their Griffel slices are `{}`. `styles.secondary`/`styles.rounded` are `undefined` and `clsx` drops them, matching Griffel's empty class string. (The jest proxy returns `fuicm-secondary` for any key, so those appear in probe output — a test-only artifact the serializer strips.)                                                                                                                                                            |

**Not done, per instructions:** no storybook rebuild, no screenshots, no `validation/baseline/**` changes, no commit. No beachball change file (react-divider's pilot has none either).

**One correction to a documented expectation:** D10 says `*.styles.raw.js` "is deleted by conversion". It is not — `lib/components/Button/useButtonStyles.styles.raw.js` is still emitted (2,619 B, now just the converted source), exactly as react-divider still emits `useDividerStyles.styles.raw.js`. The build's `Processing griffel AOT with babel: 5 files` also did **not** drop: the babel pass globs `*.styles.ts` by filename regardless of Griffel content, so this package's AOT count stays at 5 until the four siblings convert. Both are metric-reporting corrections, not defects.

**Scratch artifacts** (gitignored, left in place per your cleanup rule): `C:\Users\ArrayKnight\Code\fluentui\.scratch\compile-button-css.js` (the PostCSS/Tailwind compile probe — reusable for every future conversion), plus its compiled outputs and the `@apply fui-focus-outline` probe. Say the word and I'll clear them.

## Open questions

- FOCUS-RING BRIEF vs CODE: the brief specified reproducing `createFocusOutlineStyle`'s compiled output (::after ring, hardcoded 2px, `calc(2px * -1)` offsets, forced-colors Highlight block). Button does NOT use that helper — it uses `createCustomFocusIndicatorStyle` with a bespoke option object, and its compiled output has no pseudo-element at all. I shipped BOTH utilities: `fui-focus-ring` (Button's actual shape, validated) and `fui-focus-outline` (the createFocusOutlineStyle default, byte-matched to react-accordion's AOT but exercised by nothing yet). Confirm you want the unexercised `fui-focus-outline` to ship now rather than land with the first component that actually uses it.
- `fui-focus-outline` collapses the two `getOutlinePosition()` branches into one expression: `calc(0px - var(--fui-focus-outline-width, 2px) - var(--fui-focus-outline-offset, 0px))`. Computed value is identical to the compiled `calc(2px * -1)` in the no-offset case, but the declaration text differs. If you want literal text parity for a future diff-based audit, say so and I'll split it into two utilities instead.
- I added `data-disabled` (not in the brief's four-attribute list) because the brief's "native `:disabled` covers disabled" is false for two shipped code paths — see the probe evidence in the report. Confirm that's the resolution you want rather than, say, a `:where(:disabled, [aria-disabled='true'])` variant.
- `data-childless` is now on every Button root (Divider precedent) purely to gate the icon margin. If you'd rather not add a second children-presence attribute to the Button family, the alternative is stamping `data-icon-position` on the icon slot ONLY when the root has children — one fewer attribute, but the attribute then lies about a childless button's icon placement.
- New custom variants `size-small`/`size-medium`/`size-large` share a token prefix with Tailwind's `size-*` utility namespace. It compiles cleanly today (variants and utilities are separate registries) but it is a name I would rename now rather than after 46 files adopt it, if you dislike the collision risk.
- No beachball change file was written (react-divider's pilot has none either, and the brief says do not commit). Flagging in case the PR gate needs one.
- VR capture was explicitly out of scope, so nothing here is pixel-validated. The highest-value VR targets are: circular/square × small/large (both `border-radius` inversions), icon-only × all three sizes (the padding-shorthand-beats-longhand chain), and primary + focus-visible (the three-stop `box-shadow`).
