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
- Non-spacing tokens: literal `var(--tokenName)` in modules — never re-declare their VALUES.
  (They ARE registered as `@theme inline` REFERENCES in react-tailwind-theme/css/tokens.css
  for consumer utility names — that registration is generated, not hand-authored, and does
  not change the module authoring rule. Spacing and stroke widths follow their own rule below.)
- **Spacing — Fluent tokens FIRST, numeric only as fallback** (D4 amendment, dual spacing).
  Two scales are registered and they are ONE scaling system (both compute through
  `--base-scale`, so `p-horizontal-m` and `p-12` emit the same length):

  1. **Named (default).** Every `spacingHorizontal*` / `spacingVertical*` token has a
     utility: `p-horizontal-m`, `px-horizontal-m`, `ps-horizontal-s-nudge`,
     `py-vertical-s`, `gap-vertical-s`, `mt-vertical-xxs`, … Use these whenever the
     Griffel source read a spacing token **or** its px literal matches a step below.
  2. **Numeric (fallback).** `p-12`, `gap-8`, `w-64` — reserved for px values that match
     **no** spacing step (`p-3`, `w-320`, …).

  `--spacing-*` is axis-agnostic, so `py-horizontal-m` compiles. Pick the axis that matches
  the property: **horizontal** tokens for inline-axis properties (`padding-inline*`,
  `margin-inline*`, `column-gap`, `inset-inline*`, `width`), **vertical** for block-axis
  (`padding-block*`, `margin-block*`, `row-gap`, `inset-block*`, `height`).

  | Step   | utility suffix | px  | Step | utility suffix | px  |
  | ------ | -------------- | --- | ---- | -------------- | --- |
  | None   | `none`         | 0   | M    | `m`            | 12  |
  | XXS    | `xxs`          | 2   | L    | `l`            | 16  |
  | XS     | `xs`           | 4   | XL   | `xl`           | 20  |
  | SNudge | `s-nudge`      | 6   | XXL  | `xxl`          | 24  |
  | S      | `s`            | 8   | XXXL | `xxxl`         | 32  |
  | MNudge | `m-nudge`      | 10  |      |                |     |

  **Raw `var(--spacingHorizontal*)` / `var(--spacingVertical*)` is FORBIDDEN in component
  modules** (including the `px-(--spacingHorizontalM)` arbitrary form). It still compiles,
  but it is the one authoring form that does NOT scale with `--base-scale`, so it silently
  diverges from every other spacing value on the page.

- **Stroke widths — same namespace, same prohibition** (D4 amendment addendum). The 4
  `strokeWidth*` tokens are registered under `--spacing-*` too, as `thin` / `thick` /
  `thicker` / `thickest` (1/2/3/4px through `--base-scale`), so they are part of the ONE
  spacing system described above.

  | Token                 | utility suffix | variable             | px  |
  | --------------------- | -------------- | -------------------- | --- |
  | `strokeWidthThin`     | `thin`         | `--spacing-thin`     | 1   |
  | `strokeWidthThick`    | `thick`        | `--spacing-thick`    | 2   |
  | `strokeWidthThicker`  | `thicker`      | `--spacing-thicker`  | 3   |
  | `strokeWidthThickest` | `thickest`     | `--spacing-thickest` | 4   |

  **Which form to use depends on the property**, because only some Tailwind families read the
  spacing namespace. This is probe-measured (DECISIONS D4 addendum has the full table), not a
  judgement call:

  1. **Spacing-powered properties → the utility.** `padding-*`, `margin-*`, `gap`, `width`,
     `height`, `min/max-w`, `size`, `inset-*`, `flex-basis`, `translate-*`, `scroll-m/p-*`,
     `text-indent`, `line-height`. Write `pb-thin`, `h-thick`, `gap-thicker`, `w-thickest`.
  2. **NOT spacing-powered → direct `var(--spacing-thin …)`.** `border-*-width`,
     `outline-width`, `outline-offset`, ring/`divide-*` widths, `text-underline-offset`,
     `text-decoration-thickness`, `box-shadow` spread values, `clip-path`, and any
     `--fui-*` custom-property assignment. **`border-thin` does not exist and never will** —
     v4 border widths are a fixed bare-number px progression (`border-2` compiles to a literal
     `border-width: 2px`), not a theme lookup, and the only width namespace that exists,
     `--stroke-width-*`, drives SVG `stroke-width`.

     These four are the ONLY token registrations that also emit a real custom property
     (`@layer fui.theme { :root, :host { --spacing-thin: … } }` in the generated tokens.css,
     shipped once per document via the theme's `dist/styles.css`), which is exactly what makes
     the direct reference legal. Do NOT try this with any other token's `--spacing-*`-style
     name — nothing else is emitted.

  3. **Utility wanted on a non-consuming property** → the by-name arbitrary form against the
     emitted variable: `border-(length:--spacing-thin)`, `outline-(length:--spacing-thick)`,
     `decoration-(length:--spacing-thicker)`, `underline-offset-(length:--spacing-thin)`.

  **Raw `var(--strokeWidth*)` is FORBIDDEN in component modules**, including
  `border-(length:--strokeWidthThin)` (the form earlier notes recommended). Same reason as
  spacing: it is the one form that does not scale with `--base-scale`.

  Spacing and stroke widths are the ONLY namespaces with this prohibition — literal
  `var(--tokenName)` stays correct for colors, radii, shadows, type, curves, durations and
  z-index.

  > Exception, unchanged: the focus-ring CSS keeps its hardcoded `2px` (D6 — a known upstream
  > FIXME; "fixing" it to a stroke width changes rendering).

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
- **Rules that style elements owned by an EXTERNAL or unconverted Griffel package must be
  UNLAYERED** (D2 amendment). Griffel injects its atomics with no `@layer`, and in the CSS
  cascade an unlayered normal author declaration beats **every** `@layer` — that comparison
  happens BEFORE specificity is consulted. So a converted rule sitting in
  `@layer fui.components.l1` can never override a Griffel atomic on the same property, no
  matter how much more specific it is. D2's "unlayered beats layered" holds when an
  unconverted component styles a converted one; it INVERTS the moment a converted component
  reaches into an unconverted one's elements, and that direction is a silent runtime bug.

  **`@fluentui/react-icons` above all.** `bundleIcon()` renders two `<svg>`s and toggles
  them with unlayered atomics — `.fjseox{display:none}` / `.f1w7gpdv{display:inline}`
  (`node_modules/@fluentui/react-icons/lib/utils/bundleIcon.styles.js`). Any converted
  `:global(.fui-Icon-filled)` / `:global(.fui-Icon-regular)` `display` rule left inside a
  layer loses at 0-2-0 to `.fjseox`'s 0-1-0 and the glyph never swaps. **Grep every module
  you convert for `fui-Icon-filled`.**

  Scope: this is **permanent** for `@fluentui/react-icons` (D11 keeps it on Griffel — it is
  not in the conversion scope), and **transitional** for in-repo packages that simply have
  not converted yet (react-popover's `PopoverSurface`, etc.); when the owning package
  converts, the rule can move back into the layer that mirrors its mergeClasses argument.
  Rules that style the component's OWN elements — including its own `:global(.fui-X__slot)`
  static classes — stay layered; nothing unlayered competes for those.

  **Template:** `packages/react-components/react-infolabel/library/src/components/InfoButton/InfoButton.module.css`
  — one unlayered block at the BOTTOM of the file under the heading comment "The icon swap
  must be UNLAYERED", with the CDP matched-rules evidence written into that comment, and a
  pointer comment left in each layered block the rules were lifted out of.
  `packages/react-components/react-button/library/src/components/Button/Button.module.css`
  is the same pattern at larger scale (6 pairs across 3 slices).

  **Ordering inside the unlayered block is load-bearing.** Everything there flattens to the
  same specificity (`@variant` compounds are `:where()`), and the classes involved sit on the
  same element, so file position is the only tiebreak — lay the blocks out in mergeClasses
  ARGUMENT order (Button: appearance swaps `#3` first, `rootDisabledStyles` swap-backs `#8`
  last), exactly as you would inside a layer.

- Pseudo-states: use the shared custom variants (`@variant hover`, `@variant disabled`,
  `@variant focus-visible-fui` …) — never raw `[data-fui-focus-visible]` selectors in
  component files.
- Focus rings: `@apply` the shared focus-ring utility; never hand-copy the ring CSS.
- Keep a comment trail: each rule block cites the source slice name it replaces
  (`/* from useBaseStyles.base */`) — reviewers diff against the Griffel file.
  These citations (and any mergeClasses mentions in hook comments) are TRANSITIONAL
  review aids — the Phase 3 documentation audit (RUNBOOK) decides their fate once the
  mechanism they reference is gone.
- **Scale-prop rule (batch-1 lesson):** small ENUM scales (small/medium/large…) get
  catalog variants; dense NUMERIC scales (SkeletonItem 8–128) use direct
  `&:where([data-size='16'])` attribute selectors in the module — the catalog rule
  bans variant DEFINITIONS in modules, not attribute selectors. Do not add
  single-consumer numeric variants to the shared catalog (skeleton's 21 entries are
  grandfathered pending cleanup).
- Boolean-ish state pairs: prefer ONE presence attribute plus a `:where(:not(...))`
  complement variant (e.g. `empty` / `not-empty`) over two attributes.

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
- **Keep the state-mutation pattern during conversion** (`state.root.className = …`,
  attribute assignment) even though it violates React immutability norms — the
  mixed-mode sibling seam and customStyleHooks contract depend on the shared object.
  Its removal is a committed, single Phase 3 sweep (DECISIONS D14); do NOT convert
  individual hooks to immutable returns.

### 3b. Named groups (DECISIONS D15)

#### Stamp the marker

The component's OUTERMOST slot gets an unhashed group marker as the SECOND `clsx` argument,
immediately AFTER that slot's static class:

```ts
state.root.className = clsx(
  switchClassNames.root, // static class (conformance contract) — stays FIRST
  'group/fui-switch', // named group marker — literal, unhashed, GLOBAL
  styles.root, // hashed CSS-Modules class
  state.root.className, // consumer override — always last
);
```

**Invariant: the marker must NEVER be the first class token in the emitted string.** This is a
hard requirement, not a style preference — see the "why" below. Argument order carries no
cascade meaning in this system (the `@layer` order decides every tie), so position is otherwise
free; spend that freedom on keeping the marker off index 0.

The name is `'group/fui-' + <the component's own name, lowercase-kebab>` —
`group/fui-switch`, `group/fui-message-bar`, `group/fui-accordion-header`. Written as a
LITERAL, not a template: greppable, sortable by `prettier-plugin-tailwindcss`, and asserted
by conformance. Same alphabet as the generated idents and the module locals, so nothing in
the generated class surface is mixed-case.

That is the `root` slot for every converted package except `react-tooltip`, which declares
no `root` at all (it portals; its `content` element is its outermost node). Its marker is
still named for the component — `group/fui-tooltip`, not `group/fui-tooltip__content`.

**No other slot gets a marker.** Sub-components already have their own roots, so the
hierarchy nests for free, and a group cannot style itself: the compiled selector is
`.child:is(:where(.group…) *)` and the descendant combinator excludes the group element.

#### Why the marker must not be `classList[0]`

jsdom has no native `:scope` support and polyfills it through nwsapi. nwsapi's `makeref()`
rewrites a `:scope`-bearing selector into a concrete reference by building an id/class anchor
from the element — and it reaches for `escape(element.classList[0])`. The `/` in
`group/fui-<kebab>` survives that escaping unchanged, so the generated anchor is spliced into
an invalid selector (e.g. `div#a.group,,fui-list-item…`), and the whole query throws. Any test
or consumer app that renders a converted component under jsdom and evaluates a `:scope`
selector against it takes a render-time `AggregateError`.

This is not theoretical: it is exactly what broke react-list's composite-navigation tests
(4 failures, all render-time throws, no snapshot involved), and react-tree carried the same
latent shape. Real browsers implement `:scope` natively and are unaffected — which is why this
only ever surfaced in the jsdom test tier.

Keeping any ordinary static class at index 0 defuses it completely: nwsapi anchors on a
selector-safe token and never sees the `/`.

**Do not "fix" this by escaping the marker or by patching the serializer.** The marker's literal
form is the public contract (D15.8); the cheap, total fix is positional.

#### Read a parent's state

Inside the CHILD's module, at altitude `fui.components.l2` or higher — you are styling over
another component's output, same rule as D2 amendment 2:

```css
@layer fui.components.l2 {
  .thumb {
    @variant group-checked/fui-switch {
      transform: translateX(calc(20px * var(--base-scale)));
    }
    @variant group-hover/fui-switch {
      @variant group-disabled-control/fui-switch {
        color: var(--colorNeutralForegroundDisabled);
      }
    }
  }
}
```

Any catalog variant composes as `group-<variant>/<name>`, compiling to
`.thumb:is(:where(.group\/fui-switch):where(<matcher>) *)`. Descendant depth is unlimited.

#### Four rules that bite

1. **Self-state uses the plain variant.** `@variant hover`, never `group-hover/self` — the
   compiled `:is(… *)` excludes the group element itself.
2. **`forced-colors` must be the OUTER wrapper.** `group-forced-colors/x` is a hard build
   error (`Cannot use @variant with unknown variant`) because it is an at-rule variant with
   no element to scope. Write `@variant forced-colors { @variant group-x/y { … } }`.
3. **Pseudo-class state needs no mirroring.** `:hover`, `:active`, `:focus-within`,
   `:focus-visible`, `:dir(rtl)` are true of the root whenever they are true of the subtree,
   so `group-hover/…`, `group-focus-within/…`, `group-rtl/…` work with zero JS change.
4. **React state on a NON-root element must be mirrored** to the root as a presence
   attribute written `value || undefined` — never `|| false`, the variants are presence
   selectors. Reference shape: `react-checkbox`. Mirror only what a child genuinely needs;
   every mirrored attribute widens invalidation. Note the known gap for uncontrolled
   Switch/Radio in D15.6 before relying on `data-checked`.

#### New variants

Add to `react-tailwind-theme/css/variants.css` only, in the canonical `&:where(…)` form.
That shape is what makes a variant group-composable — an ancestor-form variant
(`:where([x]) &`) or an at-rule variant will not compose.

### 3c. Class-name casing (DECISIONS D15.2 / D15.3)

Module-local class names are **lowercase-kebab**: `.non-zero-determinate`, referenced as
`styles['non-zero-determinate']`. Generated idents are
`fuicm-<component-kebab>-<local>-<hex6>`, all lowercase, produced by the one shared helper
`scripts/css-modules/ident.js` for all three pipelines (package build, VR storybook, jest).
Never hand-write a `localIdentName`/`generateScopedName` in a config — import the helper.

The `fuicm-` prefix is a hard contract with the jest snapshot serializer. The `group/fui-*`
marker is deliberately NOT prefixed and therefore NOT stripped: it is public DOM surface and
belongs in the snapshot beside `fui-*`.

### 4. Package plumbing (once per package)

- `package.json`: `"sideEffects": ["**/*.css"]` (was `false` — this is a BLOCKER-level
  correctness change); add `"./styles.css": "./dist/styles.css"` to `exports` and
  `"dist/styles.css"` to `files` (precedent: `@fluentui/react-storybook-addon`). All three
  are manual, one-time, per-package edits — nothing else about CSS packaging is.
- CSS emission itself is **automatic** (Phase 1.5, `workspace-plugin:build`): any package
  with `src/**/*.module.css` gets its modules compiled to an aggregated `dist/styles.css`
  (canonical `@layer` statement prepended verbatim) plus a generated
  `<Name>.module.css.js` class map in every module output, with the emitted
  `'./<Name>.module.css'` specifiers repointed at it. Do not hand-write class maps, do not
  import `dist/styles.css` from component source, and do not add the theme emission to a
  component package — the ESM class map carries the side-effect import, the CJS one
  deliberately does not (node cannot require CSS).
- The theme root artifact is built separately:
  `node packages/react-components/react-tailwind-theme/build.js` (also wired as that
  package's `build` script, so `^build` runs it). Consumers import it once per document.
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
   probe against the built storybook (the pilot's vertical+empty path was invisible
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
