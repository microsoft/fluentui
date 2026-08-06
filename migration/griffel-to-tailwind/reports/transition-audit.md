# Transition inventory + tightening spec

_Written 2026-07-28. Inventory is a complete grep of `transition` over
`packages/react-components/*/library/src/**/*.module.css` plus the matching Griffel sources
recovered from `git show master:…`. No re-measurement: perf facts are cited from
`metrics/perf-eval/variants/SUMMARY.md`._

**Why this exists (user, verbatim):**

> "for the transition, I would like to know if it is because someone has some very lazily
> applied, like, transition all. We wanna make sure that we only ever transition properties that
> are actually changing in individual transition properties, and never using transition all."

---

## 0. The `transition: all` answer

**No. There is no `transition: all` — and never was — anywhere in the Griffel→Tailwind migration
scope. Not in a single converted CSS module, and not in a single v9 Griffel styles file.**

Searched with `grep -rniE "transition(-property)?\s*:\s*['\"]?all\b|transitionProperty\s*:\s*['\"]all"`
over every `.ts` / `.tsx` / `.css` / `.js` under `packages/`, excluding `node_modules`, `lib/`,
`dist/`. Every hit is outside the migration:

| Location                                                                                                                    | Hits | In scope?                                                                               |
| --------------------------------------------------------------------------------------------------------------------------- | ---: | --------------------------------------------------------------------------------------- |
| `packages/react/src/components/Toggle/Toggle.styles.ts:89,182` — `transition: 'all 0.1s ease'`                              |    2 | **No** — v8 merge-styles                                                                |
| `packages/react/src/components/ChoiceGroup/ChoiceGroupOption/ChoiceGroupOption.styles.ts:331` — `transitionProperty: 'all'` |    1 | **No** — v8 merge-styles                                                                |
| `packages/fluent2-theme/src/componentStyles/Check.styles.ts:18,70` — `transition: 'all ease-in-out 200ms'`                  |    2 | **No** — v8 theme shim                                                                  |
| `packages/web-components/src/{progress-bar,slider}/*.styles.ts` — `transition: all …`                                       |    2 | **No** — web components, separate stack                                                 |
| `packages/react-components/react-headless-components-preview/stories/src/Toast/toast.module.css:195,234,265,304,344`        |    5 | **No** — demo _stories_, never Griffel, `no-styles` in `ledger.json`, not one of the 34 |

**Converted library modules: zero.** Every one uses the `transition-*` longhand form
(`transition-property` / `-duration` / `-timing-function` / `-delay`) — the `transition`
shorthand does not appear either. There is also no `@apply transition-…` / `duration-…` /
`ease-…` Tailwind utility in any converted module (verified separately).

**So the scenario-E cliff is not laziness.** The declared transitions are byte-identical to
Griffel's — `SUMMARY.md` §6 confirms this independently, and `git show master:` on all eight
sources confirms it declaration by declaration.

### What the real defect is

Not `all`, but its smaller cousin: **shorthand property NAMES inside `transition-property`.**

Per CSS Transitions L1, a shorthand in `transition-property` expands to _all_ of its longhand
sub-properties. So:

```css
transition-property: background, border, color; /* Button root, Switch indicator */
```

is not 3 properties. It is **21**:

| Declared     | Expands to                                                                                                                                                             | Count |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----: |
| `background` | `background-image`, `background-position`, `background-size`, `background-repeat`, `background-origin`, `background-clip`, `background-attachment`, `background-color` |     8 |
| `border`     | `border-{top,right,bottom,left}-{width,style,color}`                                                                                                                   |    12 |
| `color`      | `color`                                                                                                                                                                |     1 |

Of those 21, **6 actually change** on Button and Switch (§2). The other 15 are along for the ride
on every state change, on every instance.

This matters because `SUMMARY.md` §5 attributes essentially the entire scenario-E cost to
transition processing: removing all `transition-*` declarations takes the 100-Switch toggle from
**11.4 ms → 2.110 ms (−81.8%)**, and §6 pins **8.990 ms of the AFTER bundle's 11.535 ms (77.9%)**
on transitions. §8 records that _why_ the same declared transitions cost 4.4× more on the migrated
stylesheet than on Griffel's is still unexplained.

> **Honest scoping.** Tightening does **not** explain or fix that unexplained 4.4× ratio — both
> legs declare the same 21 longhands, so the ratio is orthogonal. What tightening attacks is the
> **absolute magnitude**, which is what actually costs milliseconds: it cuts the declared
> transitioned-longhand set on the two hottest elements in the library by 71%. **The size of that
> win is unmeasured.** §5 gives the repro.

---

## 1. Complete inventory

**14 `transition-property` declarations, across 8 modules, in 8 packages.** All 34 converted
packages were swept; the other 26 declare no transitions at all.

`Griffel source` is the `master` original, recovered per file. Every one is byte-identical to the
converted module — the conversion introduced no transition changes.

| #   | Module                                           | Site (selector)                        | Declared `transition-property` | Longhands | Griffel source (`master`)           | Class               |
| --- | ------------------------------------------------ | -------------------------------------- | ------------------------------ | --------: | ----------------------------------- | ------------------- |
| 1   | `react-avatar/.../Avatar.module.css:105`         | `.root::before, .root::after`          | `margin, opacity`              |         5 | `useAvatarStyles.styles.ts:47`      | exact-fit shorthand |
| 2   | `react-avatar/.../Avatar.module.css:360`         | `.root:where([data-active])`           | `transform, opacity`           |         2 | `useAvatarStyles.styles.ts:126`     | **already tight**   |
| 3   | `react-button/.../Button.module.css:102`         | `.root` (fui.base reset)               | `background, border, color`    |    **21** | `useButtonStyles.styles.ts:74`      | **over-broad**      |
| 4   | `react-input/.../Input.module.css:162`           | `.root::after` (focus OUT)             | `transform`                    |         1 | `useInputStyles.styles.ts:88`       | already tight       |
| 5   | `react-input/.../Input.module.css:178`           | `.root:focus-within::after` (focus IN) | `transform`                    |         1 | `useInputStyles.styles.ts:100`      | already tight       |
| 6   | `react-progress/.../ProgressBar.module.css:147`  | `.nonZeroDeterminate`                  | `width`                        |         1 | `useProgressBarStyles.styles.ts:62` | already tight       |
| 7   | `react-select/.../Select.module.css:157`         | `.root::after` (focus OUT)             | `transform`                    |         1 | `useSelectStyles.styles.ts:85`      | already tight       |
| 8   | `react-select/.../Select.module.css:171`         | `.root:focus-within::after`            | `transform`                    |         1 | `useSelectStyles.styles.ts:97`      | already tight       |
| 9   | `react-spinbutton/.../SpinButton.module.css:227` | `.root::after` (focus OUT)             | `transform`                    |         1 | `useSpinButtonStyles.styles.ts:90`  | already tight       |
| 10  | `react-spinbutton/.../SpinButton.module.css:243` | `.root:focus-within::after`            | `transform`                    |         1 | `useSpinButtonStyles.styles.ts:103` | already tight       |
| 11  | `react-switch/.../Switch.module.css:162`         | `.indicator` (fui.base reset)          | `background, border, color`    |    **21** | `useSwitchStyles.styles.ts:60`      | **over-broad**      |
| 12  | `react-switch/.../Switch.module.css:180`         | `.indicator > *` (thumb)               | `transform`                    |         1 | `useSwitchStyles.styles.ts:77`      | already tight       |
| 13  | `react-textarea/.../Textarea.module.css:225`     | `.root::after` (focus OUT)             | `transform`                    |         1 | `useTextareaStyles.styles.ts:65`    | already tight       |
| 14  | `react-textarea/.../Textarea.module.css:243`     | `.root:focus-within::after`            | `transform`                    |         1 | `useTextareaStyles.styles.ts:77`    | already tight       |

**Declared longhand total: 59.** Two sites (#3, #11) carry **42 of them — 71%**.

Classification summary:

- `transition: all` — **0**
- `transition` shorthand — **0**
- **Over-broad shorthand lists — 2 sites** (Button root, Switch indicator), both
  `background, border, color`
- Exact-fit shorthand — 1 site (Avatar `margin`; see §2.1, do not expand)
- Already tight — 11 sites

Note also 4 `transition-timing-function`-only overrides in Avatar
(`Avatar.module.css:584, 590`) and 10 `transition-duration: 0.01ms` reduced-motion overrides.
Those carry no property list but **§2.1 makes 590 a hard dependency** of any Avatar change.

Out of scope: `react-skeleton` uses `animation-*` + `@keyframes`, not transitions. Unconverted
Griffel packages that will need this treatment on conversion:
`react-menu` (`background, border, color`), `react-nav` (`background` ×2), `react-combobox`,
`react-tabs`, `react-table`, `react-tag-picker` (all `transform`/`opacity`, already tight),
`react-migration-v0-v9` (`transition: 'width 0.2s'`).

---

## 2. Per-module tightening spec

Method for each site: read every rule that can change the element's computed style while the
transition is live, list the properties that actually change, and write that list as longhands.

### 2.1 `react-avatar` — **NO CHANGE. Do not expand.** ⚠

**Site #1** — `Avatar.module.css:105-111`, on `.root::before` (the ring) and `.root::after` (the
shadow):

```css
transition-property: margin, opacity;
transition-timing-function: var(--curveEasyEaseMax), var(--curveLinear);
transition-duration: var(--durationUltraSlow), var(--durationSlower);
```

What changes: `.root:where([data-active='inactive'])` sets `margin: 0` and `opacity: 0` on both
pseudo-elements (`Avatar.module.css:586-591`), against the reset's
`margin: calc(-2 * var(--fui-Avatar-ringWidth, 0px))` and implicit `opacity: 1`.

`margin` expands to exactly `margin-top`, `margin-right`, `margin-bottom`, `margin-left` — **all
four change, with identical timing.** The shorthand is exact-fit: expanding it removes nothing.

**And expanding it is actively dangerous.** `transition-duration` and `transition-timing-function`
are _positional lists_ matched against the expanded property list. Going `margin` → 4 longhands
makes the property list 5 entries, so both value lists must go 2 → 5 entries:

```css
/* if you expand — BOTH of these must change, in TWO places */
transition-property: margin-top, margin-right, margin-bottom, margin-left, opacity;
transition-timing-function:
  var(--curveEasyEaseMax), var(--curveEasyEaseMax), var(--curveEasyEaseMax), var(--curveEasyEaseMax), var(--curveLinear);
transition-duration:
  var(--durationUltraSlow), var(--durationUltraSlow), var(--durationUltraSlow), var(--durationUltraSlow),
  var(--durationSlower);
```

Leave a 2-entry list against a 5-entry property list and CSS **cycles** it: `margin-top` gets
`curveEasyEaseMax`, `margin-right` gets `curveLinear`, `margin-bottom` gets `curveEasyEaseMax`
again… The ring animation silently desynchronises. There is no error and VR would very likely miss
it (the end states are identical; only the interpolation differs).

The second place is `Avatar.module.css:590`, inside `.root:where([data-active='inactive'])`, which
restates `transition-timing-function: var(--curveDecelerateMin), var(--curveLinear)` for the same
two pseudo-elements. It would need the same 2 → 5 expansion.
(`Avatar.module.css:584` is on `.root` itself, which transitions `transform, opacity` — 2 entries,
correct, leave alone.)

**Verdict: zero benefit, real regression risk in two coupled places. Keep `margin`.** This is the
one place the "never shorthands" rule should not be applied literally — see §3.

**Site #2** — `Avatar.module.css:360`, `transform, opacity` on `.root:where([data-active])`. Both
are true longhands and both change (`transform: perspective(1px)` → `scale(0.875)`, `opacity` → `0.8`
at `Avatar.module.css:582-583`). **Already tight.**

### 2.2 `react-button` — **TIGHTEN. 21 → 6 longhands (−71%).**

**Site #3** — `Button.module.css:101-103`, on `.root` in `@layer fui.base`.

Every rule that can change `.root`'s computed style while the transition is live:

| Source                                                                   | Properties set                                                       |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| `:105-111` `@variant hover`                                              | `background-color`, `border-color`, `color`, `cursor`                |
| `:113-119` `@variant hover-active`                                       | `background-color`, `border-color`, `color`, `outline-style`         |
| `:126-144` `@variant forced-colors` × `focus` / `hover` / `hover-active` | `background-color`, `border-color`, `color`, `forced-color-adjust`   |
| `:218+` appearance slices (`outline`/`primary`/`subtle`/`transparent`)   | `background-color`, `color`, and the four `border-*-color` longhands |

**Changes:** `background-color`, `border-top-color`, `border-right-color`, `border-bottom-color`,
`border-left-color`, `color`.

**Does not change:** all 7 non-color `background-*` longhands, all 4 `border-*-width`, all 4
`border-*-style`. Verified: `border` / `border-width` / `border-style` / `background-image` /
`background-position` / `background-size` appear exactly **once** in the whole file — line 91,
`border: var(--spacing-thin) solid var(--colorNeutralStroke1)`, in the base reset. No state or
appearance slice ever changes them.

`cursor`, `outline-style`, `forced-color-adjust` change but are **not** in the transition list
today and are not being added — `cursor` and `forced-color-adjust` are not animatable, and
`outline-style` is discrete and Griffel never transitioned it. No behaviour change.

```css
/* Button.module.css:101-103 — REPLACE */
    transition-duration: var(--durationFaster);
-   transition-property: background, border, color;
+   /*
+    * Longhands only. The Griffel source declared `background, border, color`, which expands to
+    * 21 longhands; only these 6 ever change (base `border: <w> solid <c>` at :91 is the only
+    * border-width/style declaration in the file and no state slice touches it).
+    */
+   transition-property: background-color, border-top-color, border-right-color, border-bottom-color,
+     border-left-color, color;
    transition-timing-function: var(--curveEasyEase);
```

`transition-duration` and `transition-timing-function` are **single-valued**, so they apply to
every entry — no list-alignment hazard here. This is why Button and Switch are safe to expand and
Avatar is not.

### 2.3 `react-switch` — **TIGHTEN. 21 → 6 longhands (−71%).**

**Site #11** — `Switch.module.css:160-166`, on `.indicator` in `@layer fui.base`.

The indicator is styled entirely through sibling selectors from `.input`
(`Switch.module.css:209-345`). Every property those rules set:

| Source                                                                     | Properties set on `.indicator`              |
| -------------------------------------------------------------------------- | ------------------------------------------- |
| `:228-231` `disabled-control`                                              | `color`                                     |
| `:234-256` `enabled-control` × `not-checked` (+ `hover`, `hover`×`active`) | `color`, `border-color`                     |
| `:258-281` `enabled-control` × `checked` (+ `hover`, `hover`×`active`)     | `background-color`, `color`, `border-color` |
| `:284-301` `disabled-control` × `not-checked` / × `checked`                | `border-color`, `background-color`          |
| `:303-345` `forced-colors` branches                                        | `background-color`, `color`, `border-color` |

**Changes:** `background-color`, the four `border-*-color`, `color` — identical set to Button.

**Does not change:** the reset's `border: 1px solid` (`:149`) is the only border-width/style
declaration; `border-radius`, `height`, `width` change only with `data-size`
(`:376-382`), which is a prop change, not a transitioned state, and was not in Griffel's list
either.

```css
/* Switch.module.css:160-162 — REPLACE */
    transition-duration: var(--durationNormal);
    transition-timing-function: var(--curveEasyEase);
-   transition-property: background, border, color;
+   /*
+    * Longhands only. `background, border, color` expands to 21; only these 6 change — every
+    * `.input ~ .indicator` rule below sets background-color / border-color / color and nothing
+    * else. The reset's `border: 1px solid` (:149) is never re-declared.
+    */
+   transition-property: background-color, border-top-color, border-right-color, border-bottom-color,
+     border-left-color, color;
```

**Site #12** — `Switch.module.css:178-180`, `transition-property: transform` on `.indicator > *`
(the thumb). Only `transform` changes (`translateX(±20px)` / `±16px`,
`Switch.module.css:211, 219, 430, 440`). **Already tight, leave alone.**

> Cross-reference: this is the exact element the perf experiment instrumented.
> `SUMMARY.md` §5 `diag-no-universal` shows the `> *` selector costs nothing, and
> `diag-literal-transform` shows the `calc(20px * var(--base-scale))` indirection costs ~1 ms of
> the ~9 ms. Site #11's over-broad list is the untested remainder.

### 2.4 `react-input` / `react-select` / `react-spinbutton` / `react-textarea` — **NO CHANGE.**

Sites #4, #5, #7, #8, #9, #10, #13, #14 — eight declarations, one identical pattern: the focus
underline `::after`, `transition-property: transform`, animating `scaleX(0)` ⇄ `scaleX(1)`.

**Already tight. Leave alone.**

**⚠ Flag — a property that changes and is deliberately NOT transitioned. Do not "fix" it.**
On three of the four, `:focus-within:active` changes the underline's `border-bottom-color` to
`--colorCompoundBrandStrokePressed` — `Input.module.css:191`, `Textarea.module.css:256`,
`SpinButton.module.css:256` — and `border-bottom-color` is **not** in the transition list, so it
snaps. (`react-select` has no pressed-stroke rule at all: `grep -n CompoundBrandStrokePressed
Select.module.css` returns nothing, so its underline colour never changes.)

That is Griffel's behaviour, byte for byte (`useInputStyles.styles.ts:88` declares only
`transform`). Adding `border-bottom-color` would introduce an animation that does not exist today
and would fail VR at zero tolerance. **The list is intentionally narrower than the set of changing
properties. Keep it that way.**

Second note: `transition-delay: var(--curveAccelerateMid)` is a _curve_ token used as a _delay_ —
a latent bug in the v9 source, reproduced verbatim on purpose and annotated in every module
(`Input.module.css:165`, `Select.module.css:154-156`, `Textarea.module.css:222-224`,
`SpinButton.module.css:230`). **Out of scope for this work.** Fixing it changes visible timing and
needs its own decision.

### 2.5 `react-progress` — **NO CHANGE.**

Site #6 — `ProgressBar.module.css:145-150`, `.nonZeroDeterminate`,
`transition-property: width`. `width` is a true longhand and is the animated property (driven from
an inline style by the `value` prop). **Already tight.**

`width` is layout-bound and therefore not compositor-friendly, but that is the component's
intended animation, matches Griffel exactly, and changing it is a design decision, not a
tightening. Out of scope.

---

## 3. The rule this establishes

The user's rule stated precisely:

> **A shorthand in `transition-property` is a defect exactly when it expands to longhands that do
> not change.**

| Declared          | Expands to | Actually change | Verdict                                                                  |
| ----------------- | ---------: | --------------: | ------------------------------------------------------------------------ |
| `all`             | everything |             few | **Banned outright.** Zero occurrences today; keep it that way.           |
| `background`      |          8 |               1 | **Defect** — 7 dead. Write `background-color`.                           |
| `border`          |         12 |               4 | **Defect** — 8 dead. Write the 4 `border-*-color`.                       |
| `margin` (Avatar) |          4 |               4 | **Exact fit.** Expanding is zero-gain and breaks positional lists. Keep. |

**Two guardrails for the CONVERSION_GUIDE:**

1. **`transition-property: all` is banned.** Lintable: no converted module may contain it.
2. **A shorthand is permitted only when every longhand it expands to genuinely changes, AND the
   `transition-duration` / `-timing-function` / `-delay` values are single-valued or the
   positional lists are expanded to match.** In practice: prefer longhands; `margin`-in-Avatar is
   the documented exception.

A third, mechanical guard worth adding: **if `transition-property` has _n_ entries after shorthand
expansion, any multi-valued `transition-duration` / `-timing-function` / `-delay` on the same
element must have _n_ entries.** This is the Avatar trap (§2.1) and it is silent.

---

## 4. Worklist

**2 declaration sites, 2 packages, 2 files. 59 → 29 declared longhands (−51%), and −71% on the two
hottest elements in the library.**

| #   | Package        | File:line               | Edit                                                               | Longhands | Risk                                                                                                                   | Est.    |
| --- | -------------- | ----------------------- | ------------------------------------------------------------------ | --------- | ---------------------------------------------------------------------------------------------------------------------- | ------- |
| 1   | `react-button` | `Button.module.css:102` | Replace `background, border, color` with the 6 longhands + comment | 21 → 6    | **Low.** Single-valued duration/timing — no list hazard. Verified no border-width/style/background-image state change. | ~10 min |
| 2   | `react-switch` | `Switch.module.css:162` | Same replacement + comment                                         | 21 → 6    | **Low.** Same reasoning; state rules verified exhaustively (`:209-345`).                                               | ~10 min |

**Explicit no-ops** (recorded so nobody "finishes the job" later and regresses):

| Package                                                             | Site                         | Why not                                                                                                                                               |
| ------------------------------------------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `react-avatar`                                                      | `Avatar.module.css:105`      | `margin` is exact-fit; expanding forces a 2→5 positional-list rewrite in two coupled places (`:106-107`, `:590`) for zero gain. **§2.1.**             |
| `react-avatar`                                                      | `Avatar.module.css:360`      | `transform, opacity` — already longhands.                                                                                                             |
| `react-input`, `react-select`, `react-spinbutton`, `react-textarea` | 8 × `::after`                | `transform` — already tight. On Input/Textarea/SpinButton `border-bottom-color` changes but is deliberately untransitioned; **do not add**. **§2.4.** |
| `react-progress`                                                    | `ProgressBar.module.css:147` | `width` — already tight.                                                                                                                              |
| `react-switch`                                                      | `Switch.module.css:180`      | `transform` — already tight.                                                                                                                          |

### Validation

- **VR: 34/34 at zero tolerance.** Both edits remove properties from a transition list; end states
  are unchanged, so every VR frame (which screenshots settled states) must be pixel-identical. Any
  diff means a property that _does_ change was dropped — investigate, do not baseline.
- **Not covered by VR:** the _interpolation_ itself. Neither edit changes any interpolated
  property's start or end value, so this is low risk, but a manual hover/toggle pass on
  Button and Switch is worth 5 minutes.
- **Unit/snapshot: no change.** These are CSS-only edits inside existing declarations; no class
  names, no attributes, no `dist/styles.css` structural change.
- **Byte check:** `dist/styles.css` for both packages should differ only in the two
  `transition-property` values.

### Measuring the win (currently unmeasured)

The harness exists and already brackets this exact cost. From `SUMMARY.md` §9:

```sh
cd .scratch/perf-eval/variants
node build-css.mjs && node build-diag-css.mjs
(cd harness && node ../../../../node_modules/vite/bin/vite.js build)
node prepare.mjs
node run.mjs --pass=equivalence,timing,trace --reps=3
node before-check.mjs
node report.mjs
```

`build-css.mjs` reads the shipped `react-switch/library/dist/styles.css` and writes transformed
copies, so a `diag-tight-transition` leg — identical to `current` except site #11's 6-longhand
list — drops straight in beside the existing `diag-no-transition` leg. That gives the real number
between `current` (11.605 ms) and `diag-no-transition` (2.110 ms), and would also be the first
real datapoint on §8's open question of why the migrated stylesheet's transitions cost 4.4× more
than Griffel's for the same declared animation.
