# Conversion Guide (Worker Cookbook)

Read `reports/DECISIONS.md` first — this guide implements those decisions. Read
`reports/nyt-games-conventions.md` for the authoring dialect. When this guide and a
research report disagree with the actual code, the code wins — report the discrepancy.

## Per-package conversion recipe

For each component in `packages/react-components/<pkg>/library/src/components/<X>/`:

### 1. Read and map the Griffel styles

Open `use<X>Styles.styles.ts`. Build a mapping table before writing any CSS:

| makeStyles slice                                | mergeClasses position | → target                                    |
| ----------------------------------------------- | --------------------- | ------------------------------------------- |
| `makeResetStyles` base                          | first                 | `@layer fui.reset` rule on the slot class   |
| base slice                                      | early                 | `@layer fui.base`                           |
| enum slices (appearance/shape/color)            | middle                | module classes in `fui.variant`             |
| size/state conditionals                         | middle/late           | `data-*` + `@variant` blocks in `fui.state` |
| slices that override earlier slices' properties | late                  | `fui.override`                              |

**Order rule (critical):** replicate the `mergeClasses` **argument order**, not the source
declaration order. When two slices set the same property, the later argument must land in
a later layer (or later in the same layer). The risk report lists 23 known inversions —
check whether your component is one of them (`reports/risk-analysis.md`).

### 2. Author `<X>.module.css`

```css
@reference '#theme';

@layer fui.reset {
  .root { /* makeResetStyles content */ }
}

@layer fui.base {
  .root {
    @apply flex items-center;                 /* Tailwind utilities where 1:1 */
    font-family: var(--fontFamilyBase);       /* tokens stay literal var() */

    &::before { … }

    @variant vertical { … }                   /* data-orientation-driven states */
    @variant disabled { … }
  }
}

@layer fui.variant {
  .brand { color: var(--colorBrandForeground1); }
  .subtle { … }
}
```

Dialect rules (from nyt-games + Fluent adaptations):

- First line always `@reference '#theme';` (resolution wired by the build; see theme
  package README).
- Tokens: literal `var(--tokenName)` — never re-declare them, never put them in `@theme`.
- Numeric px values from Griffel: use Tailwind spacing utilities (`p-12` = 12px-reading,
  rem-computed) **only** for pixel literals; token-derived values stay `var()`.
- **Logical properties only** for anything Griffel would RTL-flip: `paddingLeft` →
  `padding-inline-start`, `marginRight` → `margin-inline-end`, `left` →
  `inset-inline-start`, `textAlign: left` → `text-align: start`,
  `borderTopLeftRadius` → `border-start-start-radius`, etc.
- Value-level RTL (gradients, `translateX`, box-shadow x-offset, `transform-origin`,
  `cursor: *-resize`, keyframes): duplicate under `@variant rtl { … }` with mirrored
  values. rtl-css-js's exact flip semantics are in `reports/theming-system.md`.
- `shorthands.*` and CSS shorthands: **expand to longhands** in emitted CSS
  (`shorthands.borderColor(x)` → four `border-*-color` longhands; `padding: '3px 8px'` →
  four longhands) — Griffel's shorthand/longhand priority machinery has no CSS equivalent.
- Selectors on other components' static classes: `:global(.fui-Xxx)`.
- Pseudo-states: use the shared custom variants (`@variant hover`, `@variant disabled`,
  `@variant focus-visible-fui` …) — never raw `[data-fui-focus-visible]` selectors in
  component files.
- Focus rings: `@apply` the shared focus-ring utility; never hand-copy the ring CSS.
- Keep a comment trail: each rule block cites the source slice name it replaces
  (`/* from useBaseStyles.base */`) — reviewers diff against the Griffel file.

### 3. Rewrite `use<X>Styles.styles.ts`

- Keep the file name, export names, and `'use client'` (harmless for CSS Modules;
  cleanup happens Phase 3).
- `import { clsx } from 'clsx'` replaces `mergeClasses`; `import styles from
'./<X>.module.css'`.
- Class composition: `clsx(xClassNames.slot, styles.slot, styles[enumProp]…,
state.slot.className)` — static class first, consumer className last. The
  **`xClassNames` static objects are untouchable API.**
- Data attributes: set in the styles hook on the slot props (e.g.
  `state.root['data-orientation'] = state.vertical ? 'vertical' : 'horizontal'`), using
  the headless preview's attribute names where one exists
  (`reports/headless-precedent.md` lists all 25). New names only when no precedent.
- Delete no exports. `useXStyles_unstable` signature unchanged.

### 4. Package plumbing (once per package)

- `package.json`: `"sideEffects": ["**/*.css"]` (was `false` — this is a BLOCKER-level
  correctness change); add `"./styles.css"` export once build emits it.
- Jest: covered by shared `jest.preset.js` mapper + serializer (Phase 0 infra). Add
  `disabledTests: ['make-styles-overrides-win']` + the replacement conformance test in
  the package's `isConformant` wrapper.
- Remove `@griffel/react` from dependencies **only when** no file in the package imports
  it (grep first — some packages use it outside `.styles.ts`).

### 5. Validate (every conversion, no exceptions)

1. `yarn nx run <pkg>:build` — clean.
2. `yarn nx run <pkg>:test` — clean; snapshot diffs must be **empty** (serializer strips
   module classes; a snapshot change means you changed DOM or class order).
3. VR: capture the package's stories and diff vs baseline
   (`migration/griffel-to-tailwind/validation/README.md` for exact commands). Every
   story × theme × RTL must pass tolerance. Adjudicate any diff: antialiasing-level noise
   → tolerated by threshold; anything structural → fix before proceeding.
4. Report back (structured): files changed, mapping table, inversions encountered,
   data-attributes added, diffs adjudicated, anything that didn't fit this cookbook.

## Known special cases (route to `special`, not batch conversion)

- Runtime-value styles (Slider, ColorPicker sliders, Tab indicator, TagPicker widths,
  positioning middlewares, v0 Attachment): the inline-style / CSS-var mechanism already
  in place **ports unchanged** — only the static Griffel parts convert. Do not touch the
  JS that sets `--fui-*` vars or `style` props.
- Style factories (`createArrowStyles`, `createSlideStyles`, tabster focus helpers,
  `customizeSelector` call sites — 4 files): bespoke per-site resolution.
- `react-badge` `!important` usage (`usePresenceBadgeStyles`): semantics invert under
  layers — needs explicit design during the badge pilot.
- Keyframes (5 files, 12 animationName): author `@keyframes` in the module, add RTL twin
  under `@variant rtl` where the body was flippable (Skeleton wave!).
- `react-tabster`, `react-positioning`, `react-provider`, `react-portal-compat`,
  `react-migration-v8-v9`, suite package `react-components`: individually planned.

## Definition of done (per package)

Ledger `validated`: build + tests green, VR diff clean, no `@griffel` import remains in
`library/src` (unless whitelisted in ledger notes), `sideEffects` updated, report filed.
