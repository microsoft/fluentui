# Conversion Guide (Worker Cookbook)

Read `reports/DECISIONS.md` first — this guide implements those decisions. Read
`reports/nyt-games-conventions.md` for the authoring dialect. When this guide and a
research report disagree with the actual code, the code wins — report the discrepancy.

**Worked example (pilot-validated, 31/31 VR pixel-clean at zero tolerance):**
`packages/react-components/react-divider/library/src/components/Divider/` —
`Divider.module.css` + `useDividerStyles.styles.ts`. Copy its patterns: the in-file
mergeClasses→layer mapping comment, the repeated `@layer` statement, the
data-attribute typing, the `'use client'` suppression form, jest wiring.

## Per-package conversion recipe

For each component in `packages/react-components/<pkg>/library/src/components/<X>/`:

### 1. Read and map the Griffel styles

Open `use<X>Styles.styles.ts`. Build a mapping table before writing any CSS:

| makeStyles slice       | mergeClasses position | → target                                            |
| ---------------------- | --------------------- | --------------------------------------------------- |
| `makeResetStyles` base | first                 | `@layer fui.base` (levelless — loses to all levels) |
| every other slice      | in argument order     | `@layer fui.components.l1`, blocks in that order    |

**Order rule (critical):** within a level, the winner between equal-specificity rules is
**in-file source order** (all selectors are `:where()`-flat). Author the `fui.components.l1`
blocks in `mergeClasses` **argument order**, not source-declaration order — when two
slices set the same property, the later argument's rule must appear later in the file.
The risk report lists 23 known inversions where argument order contradicts declaration
order — check whether your component is one of them (`reports/risk-analysis.md`). Because
winners are encoded in file position, never reorder blocks during refactors without
re-running VR.

**Altitude rule (critical, D2 amendments):** `fui.components.l1` expresses ONE
component's own cascade. Styles your component applies to elements whose base styles come
from ANOTHER component's hook (composition: Menu over its buttons, ToggleButton over
Button's root, SplitButton over children) go to **`fui.components.l2`** — never to l1,
where the winner would be decided by stylesheet load order. `l3`–`l5` are consumer space
(app-global, page, bespoke); never author into them from library code. Rules written
directly into a parent layer (`fui.components`) beat all its sublayers (probe-verified) —
library code never does this.

**Read the compiled AOT output first:** `lib-commonjs/**/*.styles.js` (build the package
once on the pre-conversion commit if absent) contains the compiled atomics with explicit
`[ltr, rtl]` class pairs. It turns RTL mapping from inference into a lookup and settles
value-normalization questions (e.g. stray-semicolon literals) definitively. Reproduce the
COMPILED values, not your reading of the source.

### 2. Author `<X>.module.css`

```css
@reference '#theme';

@layer fui.base {
  .root { /* makeResetStyles content */ }
}

@layer fui.components.l1 {
  .root {
    @apply flex items-center;                 /* Tailwind utilities where 1:1 */
    font-family: var(--fontFamilyBase);       /* tokens stay literal var() */

    &::before { … }

    @variant vertical { … }                   /* data-orientation-driven states */
    @variant disabled { … }
  }
}

@layer fui.components.l1 {
  .brand { color: var(--colorBrandForeground1); }
  .subtle { … }
}
```

Dialect rules (from nyt-games + Fluent adaptations):

- First line always `@reference '#theme';` — confirmed working via the package
  `imports` field (`"#theme": "@fluentui/react-tailwind-theme/css/index.css"`, copy
  react-divider's package.json entry). Tailwind's own resolver handles it.
- **Repeat the full `@layer fui.theme, fui.base, fui.components, fui.components.l1, fui.components.l2, fui.components.l3, fui.components.l4, fui.components.l5, fui.utilities;`
  statement at the top of every module** (after `@reference`). `@reference` emits
  nothing, so without it first-appearance order decides layer ranking per-document —
  a load-order hazard. Re-declaring an identical order is a no-op (CSS Cascade 5),
  so repetition is safe and makes each module self-sufficient.
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
- Boolean-ish state pairs: prefer ONE presence attribute plus a `:where(:not(...))`
  complement variant (e.g. `childless` / `with-children`) over two attributes.

### 3. Rewrite `use<X>Styles.styles.ts`

- Keep the file name, export names, and `'use client'`. The repo's
  `enforce-use-client` lint rule now flags the directive as unnecessary — suppress with
  a TRAILING `eslint-disable-line` (a leading block pushes the directive off line 1 of
  emitted output) plus the rationale comment; copy react-divider's form verbatim.
  Dropping directives is a single Phase 3 sweep, not a per-conversion change.
- Set data-attributes on the slot via a local `<X>RootDataAttributes` type cast —
  public `.types.ts` files stay untouched. Presence flags are written `flag || undefined`
  (React omits `undefined`; `false` would render `data-x="false"` and still match
  `[data-x]`).
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
4. **VR blind spots:** enumerate prop combinations no VR story exercises (compare the
   component's prop matrix against its stories) and verify each with a computed-style
   probe against the built storybook (the pilot's vertical+childless path was invisible
   to all 31 screenshots). Include the probe results in your report.
5. Report back (structured): files changed, mapping table, inversions encountered,
   data-attributes added, diffs adjudicated, blind-spot probes, anything that didn't
   fit this cookbook.

## Toolchain traps (already wired in the VR storybook; relevant if you touch configs)

- The theme layer must be EMITTED once per document for `--base-scale` to exist:
  `@import '@fluentui/react-tailwind-theme' source(none);` (271 B). Without it every
  numeric spacing utility silently computes to **0px** (`@reference` emits nothing).
  Never omit `source(none)` — omitting it scans the theme package and dumps ~16 KB of
  auto-detected utilities into `@layer utilities`, which outranks all `fui.*` layers.
- postcss-loader@4 must receive the Tailwind plugin **already invoked**:
  `plugins: [require('@tailwindcss/postcss')()]` — the string / `[name, opts]` forms
  hand PostCSS an uninvoked creator and fail cryptically.
- Storybook's implicit `.css` rule has no `modules` option and would swallow
  `.module.css` as global CSS (empty class map) — narrow it with `exclude`, never
  replace it; keep `griffelRule` until Phase 3.

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
