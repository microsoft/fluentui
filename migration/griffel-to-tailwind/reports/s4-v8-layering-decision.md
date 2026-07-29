# S4 adjudication — `react-migration-v8-v9`: layered CSS against v8's unlayered merge-styles

**Date:** 2026-07-29
**Branch:** `styling/tailwind-css-modules`
**Gates:** batch S4 (specials-triage §8). No editor opens on this package until this document is settled.
**Authority:** `reports/specials-triage.md` §4 B1 · `reports/DECISIONS.md` D2 (+ amendments 3, 4, 5), D7-revision, D11, D12, D15/D16.
**Depends on:** S0 (landed — shared storybook css-modules/Tailwind wiring, `.storybook/main.js:71-72`, `.storybook/preview.js:4`).

**Verdict: option (a) — convert, with a per-file layered/unlayered split.**
Not (b): "no real conflicts" is true only for same-element rules and false for the four
descendant rules. Not (c): the mechanism _is_ preservable, and preserving it costs four
unlayered rules in one file.

---

## 1. What the triage said, and what the code says

The triage's framing (§4 B1) was:

> v8 merge-styles injects its rules **unlayered** at runtime into the same document. A converted
> module class living at `fui.components.l1` would _lose_ every collision against v8's unlayered
> output.

The mechanism is correct — it is D2 amendment 5, CDP-proven there against react-button. What the
triage did not establish is **where the collisions actually are**. Read against the tree, the
package's exposure is much narrower and much more specific than "every collision", and the
narrowing is what makes option (a) cheap.

### 1.1 The complete v8 surface that reaches a shim-styled element

Only two sources, both enumerated:

| #   | Source                                                  | Where it is built                                                                                                                                       | Where it lands                                                 |
| --- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| A   | `getChildrenGapStyles` — in-package v8 `IStyle` objects | `Stack/stackUtils.ts:124-186`; run through `classNamesFunction<IStackProps, StackShimStyles>()` declared at `StackShim.tsx:23`, invoked at `:61-65`     | `StackShim.tsx:155` (root), `:162` (inner)                     |
| B   | the consumer's v8 `styles` prop                         | `CheckboxShim.tsx:17` destructures `styles: stylesV8`; `:19` `getClassNames(stylesV8)` with `classNamesFunction({ useStaticStyles: false })` (`:12-14`) | `CheckboxShim.tsx:43` (label), `:52` (root), `:53` (indicator) |

**`StackItemShim` has no v8 runtime at all.** `StackItemShim.tsx:5` is
`import type { IStackItemProps } from '@fluentui/react'` — type-only. No `classNamesFunction`, no
`mergeStyleSets`, nothing that emits merge-styles CSS. Its whole file converts as ordinary
cookbook work.

The three Button shims, `MenuShim`, and the Theme shims carry **no styles files** (verified: the
package's only `*.styles.ts` are the three under adjudication).

### 1.2 Same-element property conflicts: there are none

Root element — `StackShim.tsx:152-157`
`mergeClasses(stackClassNames.root, ...stackStyles, childrenGapClassName.root, className)`:

- Griffel side writes `display`, `flex-direction`, `flex-wrap`, `width`, `height`, `box-sizing`
  (`StackShim.styles.ts:6-12`, `:22-45`) plus `flex-grow` / `align-items` / `justify-content`
  (`:63-141`).
- v8 side (`stackUtils.ts:135-160`) writes **nothing on the element itself** — all four branches
  are `> *:not(:first-child)` / `> *:not(:last-child)` rules setting `margin-left` or `margin-top`.

Disjoint. Zero overlap.

Inner element — `StackShim.tsx:159-163`:

- Griffel `styles.inner` (`:46-57`) writes `display`, `flex-direction`, `flex-wrap`, `box-sizing`,
  `max-width`; `styles.innerWidth` (`:58-60`) writes `width`.
- v8 `getChildrenGapStyles().inner` (`stackUtils.ts:161-184`) writes the four `margin-*` longhands,
  **`width`**, `height`, and two `> *` rules.

`width` is the only candidate — **and it cannot occur**. `styles.innerWidth` is pushed only under
`(!tokens || !tokens.childrenGap)` (`StackShim.tsx:78`), while `childrenGapClassName` is computed
only under `if (tokens.childrenGap)` (`:60-66`). The two classes are mutually exclusive by an
explicit JS guard, not by cascade luck. `height` is likewise not a conflict: the Griffel `height`
values live on `styles.wrap` / `styles.verticalFill`, which are **root** classes (`:70`, `:72`),
while v8's `height` is on **inner**.

So option (b)'s claim — "convert normally, no real conflicts exist" — is **provably true for every
rule whose subject is the Stack's own root or inner element.** That is 21 of the shim's 25 rules.

### 1.3 The four rules that do conflict, and why they are worse than the triage thought

The exposure is not same-element. It is `StackShim`'s four **descendant** rules, whose subject
elements are _arbitrary children the consumer supplied_:

| Rule                                        | Source                                  | Subject                 |
| ------------------------------------------- | --------------------------------------- | ----------------------- |
| `> * { text-overflow: ellipsis }`           | `StackShim.styles.ts:13-15` (in `root`) | any direct child        |
| `> *:not(.ms-StackItem) { flex-shrink: 1 }` | `:18-20` (in `root`)                    | any non-StackItem child |
| `> *:not(.ms-StackItem) { flex-shrink: 1 }` | `:54-56` (in `inner`)                   | any non-StackItem child |
| `> *:not(.ms-StackItem) { flex-shrink: 0 }` | `:37-39` (in `disableShrink`)           | any non-StackItem child |

This package's entire reason to exist is hybrid v8/v9 trees, so those children are _routinely v8
components styled by unlayered merge-styles_. That is not hypothetical — the package's own story
does it twice:

```
stories/src/Stack/index.stories.tsx
  :4    import { Checkbox, Dropdown, DropdownMenuItemType, Stack, TextField } from '@fluentui/react';
  …     <StackShim …>
          <StackItemShim …>Stack Item</StackItemShim>
          …
          <Checkbox label="checkbox 1" className={stackItemShimStyles} />   ← v8 Checkbox, direct child
          <Checkbox label="checkbox 2" className={stackItemShimStyles} />
        </StackShim>
```

And the properties genuinely collide in shipped v8. Measured against the installed
`@fluentui/react` (not reasoned):

- `node_modules/@fluentui/react/lib/components/Checkbox/Checkbox.styles.js:192` declares
  `flexShrink: 0` on the `checkbox` slot.
- **13** files under `node_modules/@fluentui/react/lib/components/*/*.styles.js` declare
  `flexShrink` (BaseButton, Checkbox, CommandBar, DetailsRow, DocumentCardPreview, GroupHeader,
  MessageBar, OverflowSet, Panel, SearchBox, Slider, Stack, TextField).
- **20** declare `textOverflow` (ActivityItem, Breadcrumb, ColorPicker, ComboBox, DatePicker,
  DetailsColumn, DetailsHeader, DetailsRow, DocumentCardActivity, DocumentCardLocation,
  DocumentCardPreview, Dropdown, GroupHeader, Link, MessageBar, Nav, SearchBox, SpinButton, Stack,
  Text).

#### The inversion, stated precisely

|                      | selector                                           | layer               | specificity | winner                                                                |
| -------------------- | -------------------------------------------------- | ------------------- | ----------- | --------------------------------------------------------------------- |
| **today (Griffel)**  | `.fXXXX > *:not(.ms-StackItem)`                    | _(none)_            | 0-2-0       | **Stack** — same origin, higher specificity                           |
|                      | `.css-42` (v8 slot)                                | _(none)_            | 0-1-0       |                                                                       |
| **naive conversion** | `.fuicm-stack-shim-root-…  > *:not(.ms-StackItem)` | `fui.components.l1` | 0-2-0       |                                                                       |
|                      | `.css-42` (v8 slot)                                | _(none)_            | 0-1-0       | **v8** — unlayered beats every layer, before specificity is consulted |

This is the identical shape D2 amendment 5 recorded for `bundleIcon()` and react-button, where the
counterfactual was verified with `CSS.getMatchedStylesForNode`: the layered rule was appended
**last** in the document and still lost, because file position cannot beat layer origin. No amount
of specificity rescues a rule inside `@layer fui.components.l1`.

#### The shim is a port of the thing it must match

`StackShim.styles.ts:13-20` is not an invention — it is a transcription of v8's own Stack, which
emits the identical selector shape, unlayered:

```js
// node_modules/@fluentui/react/lib/components/Stack/Stack.styles.js
:28-30   var childStyles = { textOverflow: 'ellipsis' };
:31      var childSelector = '> ' + (enableScopedSelectors ? '.' + GlobalClassNames.child : '*');
:33-36   // flexShrink styles are applied by the StackItem
         _a[childSelector + ':not(.' + StackItemGlobalClassNames.root + ')'] = { flexShrink: 0 };
```

Keeping these four rules unlayered is therefore **fidelity to the component being shimmed**, not an
exemption carved out of the layer system. The shim already lives in v8's specificity regime because
Griffel is unlayered too; conversion must not move it.

### 1.4 CheckboxShim: layers get the answer right for free

`CheckboxShim.tsx:52`:

```ts
className={mergeClasses(stylesV9.root, 'ms-Checkbox', className, styles.root)}
```

`styles.root` is v8 merge-styles built from the **consumer's** `ICheckboxStyles` and is deliberately
last, so it wins today via Griffel's per-property atomic deletion. After conversion it is unlayered
merge-styles against a layered module class — **it still wins**, by D2's core contract ("consumer
CSS, including unlayered v8 merge-styles, beats layered Fluent CSS"). The intent survives at zero
cost and needs no unlayered block. Same for `:43` (label) and `:53` (indicator).

The one thing `Checkbox.styles.ts` declares is `display: flex` (`:6-8`), and it must beat
`@fluentui/react-checkbox`'s own root, which carries `@apply relative inline-flex max-w-fit …` in
`@layer fui.base` (`react-checkbox/library/src/components/Checkbox/Checkbox.module.css:124-127`).
Any component level beats `fui.base`, so this is satisfied — see §2.3 for the correct altitude.

---

## 2. Decision and per-file specification

### 2.0 Why not (c)

Leaving three files on Griffel would be the only place in the repo where a _shipped, non-deprecated_
package keeps `@griffel/react` as a runtime dependency after the migration
(`library/package.json:23`). It also keeps this package inside the Griffel AOT build step (D10's
`grep 'Processing griffel AOT'` metric never reaches 0), keeps its `*.styles.raw.js` artifacts, and
permanently blocks the D1 packaging flip. All of that to avoid four unlayered rules that the
cookbook already has a sanctioned dialect for. (c) is rejected.

The react-icons precedent in D2 amendment 5 is the exact template: _permanent_ unlayered treatment
for a styling system that will never convert. `@fluentui/react` v8 qualifies on the same terms and
by the same wording — D11 already records "compat packages convert last, given v8 interop"; this
decision converts them, it does not exempt them.

### 2.1 `Stack/StackShim.styles.ts` → `StackShim.module.css`

**Layered — `@layer fui.components.l1`**, blocks written in `mergeClasses` argument order
(D2 amendment 3: within a level, winner order is in-file source order):

| Local                  | From       | Notes                                                                                                                                                                                             |
| ---------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.root`                | `:6-12`    | `display/flex-direction/flex-wrap/width/height/box-sizing` **only** — its two `> *` rules move out (§2.2)                                                                                         |
| `.horizontal`          | `:22-24`   |                                                                                                                                                                                                   |
| `.vertical-fill`       | `:25-27`   |                                                                                                                                                                                                   |
| `.reversed-vertical`   | `:28-30`   |                                                                                                                                                                                                   |
| `.reversed-horizontal` | `:31-33`   |                                                                                                                                                                                                   |
| `.disable-shrink`      | `:34-40`   | the _class_ is emitted here but carries no layered declarations — its only rule is a descendant rule (§2.2). Emit `.disable-shrink {}` in the layered block so the local exists in the class map. |
| `.wrap`                | `:41-45`   |                                                                                                                                                                                                   |
| `.inner`               | `:46-51`   | `display/flex-direction/flex-wrap/box-sizing/max-width` only                                                                                                                                      |
| `.inner-width`         | `:58-60`   |                                                                                                                                                                                                   |
| `.grow-*`              | `:63-85`   | `useFlexGrowStyles`, 7 locals (`inherit/initial/revert/unset/1/2/3`)                                                                                                                              |
| `.align-items-*`       | `:87-113`  | `useFlexAlignItemsStyles`, 8 locals                                                                                                                                                               |
| `.justify-content-*`   | `:115-141` | `useFlexJustifyContentStyles`, 8 locals                                                                                                                                                           |

Locals are lowercase-kebab (D15.3); the three flex hooks keep their string keys (`'1'`,
`'space-between'`, …) because `StackShim.tsx:124,134-138,144-148` indexes them by prop value —
`styles['space-between']`, not a renamed local. **The key strings are load-bearing runtime lookups;
do not rename them.**

**Unlayered — one block at the bottom of the file, in `mergeClasses` argument order:**

```css
/* UNLAYERED — D2 amendment 5.
   Subjects are arbitrary consumer children. In a hybrid v8/v9 tree those are routinely
   v8 components whose merge-styles CSS is unlayered; a layered rule here would lose the
   flex-shrink / text-overflow ties it wins today on specificity (0-2-0 vs 0-1-0).
   Permanent, not transitional: v8 will never convert.
   ORDERING: .disable-shrink must come last — StackShim.tsx pushes styles.root at :70 and
   styles.disableShrink at :129, and unlayered blocks have only file position to encode that.
   DO NOT WRAP IN :where() — the 0-2-0 specificity is the whole mechanism. */

.root > * {
  text-overflow: ellipsis;
} /* was :13-15 */
.root > *:not(:global(.ms-StackItem)) {
  flex-shrink: 1;
} /* was :18-20 */
.inner > *:not(:global(.ms-StackItem)) {
  flex-shrink: 1;
} /* was :54-56 */
.disable-shrink > *:not(:global(.ms-StackItem)) {
  flex-shrink: 0;
} /* was :37-39 */
```

Three constraints, each of which silently breaks the feature if missed:

1. **`:not(:global(.ms-StackItem))`, not `:not(.ms-StackItem)`.** `ms-StackItem` is
   `StackItemShim`'s literal static (`StackItemShim.tsx:16-18`). Left bare, `postcss-modules` /
   `css-loader` hash it and the exclusion silently stops matching — the same class of invisible
   failure D15.4 documented for group markers.
2. **No `:where()`.** This is the one authoring site in the migration where D2's blanket
   `:where()` rule is deliberately suspended, because the rules are unlayered and specificity is
   the only arbiter left.
3. **`.root`/`.inner` order is free** (they never co-occur on one element — `StackShim.tsx:70`
   picks `wrap ? styles.wrap : styles.root`, and `.inner` is on a different node); **`.disable-shrink`
   is not** and must be written after `.root`.

### 2.2 `Stack/StackItemShim.styles.ts` → `StackItemShim.module.css`

**Fully layered, `@layer fui.components.l1`.** No v8 involvement (§1.1). Ordinary cookbook
conversion; blocks in the push order of `StackItemShim.tsx:28-47`:

`.root` (`:6-9`) → `.align-self-*` (`:18-37`, 6 locals) → `.vertical-fill` (`:13-15`) →
`.order-*` (`:87-121`, 11 locals) → `.grow-*` (`:39-61`, 7) → `.shrink-*` (`:63-85`, 7) →
`.disable-shrink` (`:10-12`).

That order is not the source order — it is the argument order, and it is what makes
`.vertical-fill`'s `height:100%` beat `.root`'s `height:auto`, and `.disable-shrink`'s
`flex-shrink:0` beat `shrink-1`. Same string-key caveat as §2.1 for the four indexed hooks.

**Carry-forward constraint for S6 / D16:** the literal `'ms-StackItem'` at `StackItemShim.tsx:17`
must keep being rendered. It is not a `fui-*` BEM static, so D16.1's removal sweep does not cover
it — but a future reader sweeping "legacy static classes" would delete it and silently break §2.1's
three `:not()` exclusions. Record it in the module header and in the D16 inventory as **retained**.

### 2.3 `Checkbox/Checkbox.styles.ts` → `Checkbox.module.css`

One local, one declaration, **`@layer fui.components.l2`** — not `l1`:

```css
@layer fui.components.l2 {
  /* Subject is @fluentui/react-checkbox's root — another converted component's hook output.
     D2 amendment 2: "anything applied over another component's hook output → l2".
     Beats react-checkbox's own `@apply … inline-flex` in @layer fui.base
     (react-checkbox/.../Checkbox.module.css:124-127), which is the tie mergeClasses
     resolves today at CheckboxShim.tsx:52.
     The consumer's v8 `styles.root` (CheckboxShim.tsx:19,52) stays unlayered merge-styles
     and keeps winning over this — which is the shim's intent and needs no extra work. */
  .root {
    display: flex;
  }
}
```

`react-checkbox` already ships an `l2` block for the same reason (`Checkbox.module.css:332`), so
this is a precedent-following assignment, not a new pattern.

`CheckboxShim.tsx` composition changes only in the composer: `mergeClasses` → `clsx`, argument
order unchanged (`:43`, `:52`, `:53`). Per D7-revision, argument order carries no cascade meaning
after conversion — but it is read once here to derive the assignments above, then the mechanism is
gone.

### 2.4 Packaging (D1)

`library/package.json` currently has `"sideEffects": false` (`:9`) and an `exports` map with **no**
`./styles.css` entry — the same shape every converted package had to fix. Apply the standard flip:

```json
"sideEffects": ["**/*.css"],
"exports": { ".": { … }, "./styles.css": "./dist/styles.css", "./package.json": "./package.json" }
```

Reference: `react-checkbox/library/package.json`. Drop `@griffel/react` from `dependencies`
(`:23`); `@fluentui/react` (`:19`) obviously stays — it is the thing being shimmed.

---

## 3. Validation

**No VR baselines exist.** A grep of `apps/vr-tests-react-components/src` for `Shim` or
`migration-v8-v9` returns zero story files. This batch cannot be pixel-gated, so it runs the batch-5
probe protocol (`react-nav` / `react-menu-grid-preview` precedent) plus the package's own
integration tests.

1. **`test-rit--17--test` / `test-rit--19--test`** (`library/project.json:14-30`) — real v8/v9
   co-rendering under React 17 and 19. These are the natural gate for this batch and the only
   automated check that exercises the interop the decision is about.
2. **`CheckboxShim.test.tsx`** + the package's jest suite.
3. **CDP probe, and it must be the counterfactual form.** Build the package storybook (S0's shared
   wiring reaches it via `rootMain`), open `Migration Shims/V8/StackShim` → `Playground`, and run
   `CSS.getMatchedStylesForNode` on the two v8 `<Checkbox>` children of `<StackShim>`. Assert the
   winning `flex-shrink` declaration comes from the shim's unlayered rule. Then A/B it: re-declare
   the identical selector inside `@layer fui.components.l1`, append it **last**, delete the
   unlayered copy from the CSSOM, and confirm the v8 slot class wins — the same method that made
   D2 amendment 5 evidence rather than argument. Record both readouts here.
   _Reading note carried from D2 am.5:_ record `selectorText` before recursing into `cssRules` —
   Chrome exposes an empty `cssRules` on every `CSSStyleRule`, and a walker that tests it first
   reports zero matches.
4. **Compile-time assertions**, because every failure in §2.1 is invisible at runtime:
   - the compiled `StackShim.module.css` contains `.ms-StackItem` **unhashed** (i.e. `:global()`
     survived) — mirror `css-modules.spec.ts`'s existing group-marker assertion;
   - the compiled unlayered block contains no `:where(`;
   - the four descendant rules appear outside any `@layer` at-rule.
5. **D2 am.5 standing gate:** grep the new modules for `fui-Icon-filled` (expected: zero hits here,
   but the grep is mandated on every conversion).
6. **Staleness guard:** the capture/probe must run on a cache-miss build. The D2 am.5 postmortem
   applies in full — a probe read from a replayed bundle proves nothing.

---

## 4. Recorded consequences

- **Permanent unlayered surface.** Four rules in `StackShim.module.css` will never move into a
  layer, because `@fluentui/react` will never convert. This joins `@fluentui/react-icons` as the
  second permanent entry in D2 amendment 5's scope table; every other unlayered block in the repo
  is transitional. State this in the PR.
- **Consumer-visible semantics are unchanged.** Both directions of the v8 seam resolve to the same
  winner as today: v8-consumer-styles-beat-shim (CheckboxShim) via unlayered-beats-layered, and
  shim-beats-v8-child (StackShim descendants) via same-origin specificity in an unlayered block.
- **A refactor hazard worth naming.** If a later reader "tidies" the unlayered block into the layer
  system, or adds `:where()` to it, or drops the `:global()` around `ms-StackItem`, the failure is
  silent — no error, no VR diff (there are no baselines), just v8 children losing their
  `flex-shrink`/`text-overflow` in hybrid apps. §3.4's compile-time assertions exist specifically
  because this is not observable any other way.
