# Research: headless-precedent

_Generated 2026-07-26 by research workflow wf_7f8b1226-35f (research agents; verify against source before acting on stale claims)._

## Summary

packages/react-components/react-headless-components-preview is a real, actively-developed (74 commits, v0.2.3, 48 subpath exports) in-repo precedent that pairs unstyled headless wrappers around the EXISTING styled components' base hooks (use*Base_unstable / render*\_unstable re-exported from packages like react-checkbox) with a from-scratch demo CSS-Modules layer. Its tokens.css is NOT the real Fluent v9 design-token set -- it is a bespoke monochrome-plus-magenta demo skin built for Storybook, so it cannot be reused as-is for a Fluent-theme-preserving migration. It proves the identical-behavior/ARIA thesis in prose only; there is no side-by-side headless-vs-styled visual comparison story anywhere in the package. Its docs explicitly show Tailwind as a first-class supported styling approach and ship a Tailwind v4 CodeSandbox export template. The styled (Griffel) components already expose data-fui-focus-visible/data-fui-focus-within (via react-tabster) and aria-_/native pseudo-classes as style hooks, but do NOT expose state as data-_ attributes since Griffel computes class names in JS -- the headless layer is what adds roughly 25 distinct data-\* attributes purely for CSS Modules/Tailwind attribute-selector targeting.

## Key facts

- Package is real and active: 74 commits (`git log --oneline -- packages/react-components/react-headless-components-preview | wc -l`), CHANGELOG.md v0.0.4→v0.2.3, dated through 'Mon, 29 Jun 2026', citing real PR numbers.
- 47 component directories in library/src/components, 48 package.json subpath exports, 46 story folders, 47 stories/src/\*_/_.module.css files, 815 .ts/.tsx files in library/src (all counted via find/grep, commands shown in report).
- library/README.md explicitly warns: 'This package is in preview and not production-ready... For most teams, @fluentui/react-components remains the recommended default.'
- Architecture: headless components import `use*Base_unstable` and `render*_unstable` DIRECTLY from the existing STYLED packages (e.g. `renderCheckbox.tsx`: `export { renderCheckbox_unstable as renderCheckbox } from '@fluentui/react-checkbox'`) -- they are thin wrappers, not reimplementations.
- stories/.storybook/tokens.css is a bespoke 'monochrome + magenta' demo design language (--bg, --accent #9b1f5a, --brand, pill radii) explicitly derived from a design Figma file for this demo -- NOT the real Fluent v9 design-token set (which uses names like colorNeutralForeground1, colorCompoundBrandBackground, confirmed in react-checkbox/library/src/components/Checkbox/useCheckboxStyles.styles.ts).
- CSS Modules wiring: stories/.storybook/css-modules-webpack.js sets css-loader `modules: {auto:true, localIdentName:'[name]__[local]--[hash:base64:5]'}` on Storybook's built-in .css$ rule -- standard CSS Modules, no Tailwind/PostCSS anywhere in the stories build.
- No side-by-side headless-vs-styled visual comparison exists anywhere in the package: only 2 files import from '@fluentui/react-components' and both are type-only imports (verified via grep). The 'identical' claim in docs (Accessibility.mdx) is scoped to keyboard behavior only, not visuals.
- Tailwind IS already an officially documented styling path: GettingStarted.mdx shows CSS Modules / Tailwind / styled-components as three co-equal examples, and apps/public-docsite-v9-headless/.storybook/tailwind-sandbox-template.js ships a live Tailwind v4 + @tailwindcss/vite CodeSandbox export template.
- Styled (Griffel) components already expose: aria-\* attributes (per Accessibility.mdx's ARIA pattern table), data-fui-focus-visible/data-fui-focus-within/data-keyboard-nav (defined in react-tabster/src/focus/constants.ts), and inline CSS custom properties like --fui-Slider--progress (react-slider/library/src/components/Slider/Slider.constants.ts, confirmed in Slider.test.tsx.snap).
- Styled components do NOT expose checked/disabled/etc. as data-\* attributes -- confirmed `grep -n 'data-' react-checkbox/.../useCheckbox.tsx` returns zero matches; state is communicated purely via Griffel's JS-computed mergeClasses branching.
- The headless layer ADDS 25 distinct data-\* attribute names on the root slot across the library (enumerated via grep of every `state.<slot>['data-...']` assignment): data-at-bound, data-checked, data-collapsible, data-current, data-disabled, data-disabled-focusable, data-dismissible, data-expand-icon-position, data-focused, data-has-actions, data-has-secondary-action, data-icon-only, data-icon-position, data-intent, data-label-position, data-layout, data-multiple, data-open, data-orientation, data-position, data-scroll-state, data-selected, data-spin-state, data-validate-state, data-vertical. data-disabled-focusable alone appears in 21 files.
- Headless Divider has no internal line DOM node -- the visual line comes from ::before/::after on .divider (confirmed in stories/src/Divider/divider.module.css comment and body), a documented CSS-only technique to replicate a Griffel-rendered element.

## Risks

- tokens.css from this precedent is a different design language than real Fluent tokens; reusing its tier names/values instead of porting actual @fluentui/react-theme token names would break the 'preserve the Fluent theme' requirement of the real migration.
- No pixel-parity evidence exists anywhere in this precedent (no side-by-side stories, no visual regression tests found in the files read) -- the 'looks identical without Griffel' thesis for the real migration cannot be sourced from this package's test/story assets and will need net-new visual verification.
- Migration must add ~25 data-\* attributes (root-slot only, per current grep) to every styled component's state hook before any CSS Modules/Tailwind selector can replace Griffel's JS-computed class branching -- this is nontrivial surface area across many packages (react-button, react-menu, react-tabs, react-tags, etc.), not a mechanical CSS-only change.
- The 25-attribute list was derived only from the headless preview's current component set (47 components); components NOT yet ported to the headless preview (if any exist in the full @fluentui/react-components surface) have not been checked here for what data-attributes they would need -- this list may be incomplete relative to the full v9 component catalog.
- This precedent's own CSS Modules only exercise a narrow set of selector patterns (adjacent-sibling + pseudo-class + one attribute selector, plus ::before/::after) across the two files read in full (Checkbox, Divider); broader component types (Menu popover positioning, Combobox, DataGrid/Table) were not read in equivalent CSS depth and may require patterns not yet precedented here.
- The stories/README.md's own naming convention is not perfectly uniform (kebab-case filenames mostly, but interactionTag.module.css/tagGroup.module.css break the pattern) -- a Tailwind + CSS Modules migration convention should be decided explicitly rather than assumed consistent from this precedent.

## Full report

## 1. What the package establishes

**Location & scale.** `packages/react-components/react-headless-components-preview/{library,stories}`. This is a real, shipping package: `library/CHANGELOG.md` runs v0.0.4 through v0.2.3 with dated entries (latest "Mon, 29 Jun 2026") citing real PR numbers (#35931-#36441 range, consistent with `git log` on master). `git log --oneline -- packages/react-components/react-headless-components-preview | wc -l` = 74 commits. `library/README.md` carries an explicit banner:

> **This package is in preview and not production-ready.** APIs may change without notice... This package exposes unstyled, headless Fluent UI v9 primitives for teams building custom design systems. For most teams, `@fluentui/react-components` remains the recommended default.

**Component count (verified via `find`/`grep`, not estimated):**

- `find library/src/components -maxdepth 1 -mindepth 1 -type d | wc -l` = **47** component directories in the library.
- `grep -cE '^\s{4}"\./[a-z-]+": \{' library/package.json` = **48** subpath exports (`./accordion`, `./avatar`, ... `./tooltip`; full list read directly from `library/package.json`).
- `find stories/src -maxdepth 1 -mindepth 1 -type d | wc -l` = **46** story folders.
- `find stories/src -iname "*.module.css" | wc -l` = **47** CSS Module files (one per component, `find` output enumerated in full above, e.g. `stories/src/Checkbox/checkbox.module.css`, `stories/src/Menu/menu.module.css`, `stories/src/Divider/divider.module.css`, etc.)
- `find library/src -name "*.ts*" | wc -l` = **815** TypeScript/TSX files in the library.

**Styling contract.** Per `stories/README.md` (repo-relative `packages/react-components/react-headless-components-preview/stories/README.md`, lines 1-9): "the headless components stay unstyled in `library/`, all visual concerns live in CSS Modules, and the stories pull both together." Section 7 (verification checklist before PR) explicitly bans inline styles, Tailwind, and Griffel in the stories layer itself (line 155-156): "No inline styles, no Tailwind, no Griffel -- only CSS Modules + the headless component." This is a policy for the _demo story layer only_; the top-level docsite (`apps/public-docsite-v9-headless/src/GettingStarted.mdx`) explicitly endorses Tailwind as a valid consumer-side styling choice (see §4 below).

**Architecture mechanism (verified via Checkbox, generalizes across components):**

- `library/src/components/Checkbox/Checkbox.tsx` calls `useCheckbox(props, ref)` then `renderCheckbox(state)`.
- `library/src/components/Checkbox/renderCheckbox.tsx`: `export { renderCheckbox_unstable as renderCheckbox } from '@fluentui/react-checkbox';` -- the render function is imported **directly from the styled package**, not reimplemented.
- `library/src/components/Checkbox/useCheckbox.ts`: calls `useCheckboxBase_unstable(props, ref)` -- also imported from `@fluentui/react-checkbox` -- then manually stamps `state.root['data-disabled']` and `state.root['data-checked']` via a `stringifyDataAttribute` utility.
- Confirmed in the styled package itself (`packages/react-components/react-checkbox/library/src/components/Checkbox/index.ts` and `useCheckbox.tsx`): `useCheckboxBase_unstable` and `renderCheckbox_unstable` are exported from the SAME file/package that also exports the styled `useCheckbox_unstable` (which wraps the base hook) and `useCheckboxStyles_unstable` (the Griffel styling hook). I.e., Microsoft already factored each component into (a) a headless "Base" state-builder hook, (b) a headless render function, and (c) a separate Griffel styling hook -- the headless preview package is a thin consumer of (a)+(b) that skips (c) and adds a couple of `data-*` attributes.
- `library/src/utils/stringifyDataAttribute.ts`: `true` → `''` (attribute present, valueless), `false`/`undefined` → `undefined` (attribute absent), else `String(value)`.

## 2. CSS Modules structure vs. a Tailwind @apply approach

**Webpack wiring** (`stories/.storybook/css-modules-webpack.js`): finds Storybook's built-in `\\.css$` rule and sets `modules: { auto: true, localIdentName: '[name]__[local]--[hash:base64:5]' }` on css-loader. Standard CSS Modules auto-detection (`*.module.css` suffix), debuggable hashed class names -- no PostCSS/Tailwind toolchain involved anywhere in this package.

**Naming/organization conventions** (from `stories/README.md` §1, §8, and file listing):

- One `.module.css` per component, colocated: `stories/src/<Component>/<name>.module.css` (kebab-case filenames, e.g. `menu-button.module.css`, `info-label.module.css`, `spin-button.module.css`; a few PascalCase-derived like `interactionTag.module.css`, `tagGroup.module.css` -- naming is not perfectly uniform).
- Every value must resolve through a `var(--…)` token from `.storybook/tokens.css` -- no hardcoded colors/sizes (§2, §7 checklist: "Search the diff for raw `#` and `rgb(` to confirm").
- Class-selector patterns lean on native CSS rather than JS-computed variants: e.g. `checkbox.module.css` targets `.input:checked + .indicator`, `.input:focus-visible + .indicator`, `.input:disabled + .indicator` (real pseudo-classes on a visually-hidden native `<input>`), plus one custom attribute selector `.row[data-disabled]` for the headless-added attribute. `divider.module.css` uses `::before`/`::after` generated content because "Headless Divider has no internal line element" (comment at top of file, matching the gotcha documented in `stories/README.md` §6).
- No BEM, no `:global`, no nesting beyond adjacent-sibling/pseudo-class combinators observed in the two files read in full (Checkbox, Divider).

**Contrast with a Tailwind `@apply` approach:** this precedent uses raw CSS Modules with `var(--token)` references and combinator/pseudo-class selectors (`.input:checked + .indicator`), which maps cleanly onto Tailwind's arbitrary-value and state-variant syntax (`peer-checked:`, `peer-focus-visible:`, `data-[disabled]:`) but is NOT itself using Tailwind's utility-class or `@apply` model anywhere -- there is no `@apply`, no `tailwind.config`, no utility class in the entire `stories/src` tree (confirmed by the CSS-Modules-only webpack wiring and the explicit "no Tailwind" rule in stories/README.md §7). The only place Tailwind actually appears in this whole surface is the **consumer-facing docsite's CodeSandbox export template** (`apps/public-docsite-v9-headless/.storybook/tailwind-sandbox-template.js`), which injects `tailwindcss: '^4.0.0'` and `@tailwindcss/vite: '^4.0.0'` as devDependencies and rewrites `src/index.css` to `@import "tailwindcss";` -- i.e., Tailwind v4 is already the sandboxed \"try it with Tailwind\" experience Microsoft ships, using the Vite plugin, not PostCSS.

**Naming/layering consistency the fluentui→Tailwind migration should note:** the token tier naming in this precedent's `tokens.css` (Surface/Line/Ink/Accent/Brand/Status/Elevation/Radius/Stroke/Spacing/Type/Motion, documented in `stories/README.md` §4) is a DIFFERENT vocabulary than Fluent's real design tokens (`colorNeutralForeground1`, `colorBrandBackground`, `spacingHorizontalS`, etc., seen in `packages/react-components/react-checkbox/library/src/components/Checkbox/useCheckboxStyles.styles.ts`). If the real migration must preserve the Fluent theme as CSS custom properties, this precedent's `tokens.css` tier system is not the source of truth to port -- the real Fluent `@fluentui/react-theme` token names are.

## 3. Does it prove \"identical without Griffel\" visually?

**No side-by-side story exists.** Searched every story file for imports of the real styled package: `grep -rl "@fluentui/react-components'" stories/src | wc -l` = 2 hits, both are **type-only** imports (`import type { JSXElement } from '@fluentui/react-components'` in `Popover/PopoverNested.stories.tsx`; `import type { TagValue } from '@fluentui/react-components'` in `Tags/TagGroup/TagGroupSelect.stories.tsx`) -- neither renders an actual styled component next to its headless counterpart. Every `index.stories.tsx` (e.g. `stories/src/Button/index.stories.tsx`, read in full) imports only the headless component from `@fluentui/react-headless-components-preview/button`.

The claim of parity is asserted in prose, not demonstrated visually: `apps/public-docsite-v9-headless/src/Accessibility.mdx` line 49 states "Each component's keyboard behavior is identical to its styled counterpart in `@fluentui/react-components`" -- scoped explicitly to _keyboard behavior_, not visual rendering. Nowhere in the package is there a claim or test asserting pixel parity; the whole premise of the package is the opposite -- ship _a_ look (the demo skin), not _the_ Fluent look. `HeadlessDocsPage.tsx`'s `Disclaimer` component (lines 62-71) reinforces this: "the CSS shown in these stories is provided purely as a demonstration of one possible look."

## 4. Roadmap / motivation signals

`apps/public-docsite-v9-headless/src/Introduction.mdx` (full file read) is the clearest statement of intent:

- "Fluent UI Headless provides accessible, interactive React components without opinionated styling. Perfect for teams building custom design systems, maintaining brand consistency, or integrating with existing design frameworks."
- Feature copy explicitly names Tailwind as a supported target: "Use CSS-in-JS, CSS modules, Tailwind, or any styling approach without conflicts or overrides."
- "Perfect for" section lists: custom design systems, multi-brand apps, enterprise WCAG needs, minimalist bundles ("Only ship the styles you use. No unused CSS framework bloat"), design-first teams, micro-frontends.

`apps/public-docsite-v9-headless/src/GettingStarted.mdx` (full file read) shows three parallel "Style with your framework" code samples -- CSS Modules, **Tailwind** (`className="rounded-md px-4 py-3 focus-visible:outline..."`), and styled-components -- presented as co-equal options, confirming Tailwind is an officially documented, first-class styling path for this package today, not a hypothetical.

`apps/public-docsite-v9-headless/.storybook/tailwind-sandbox-template.js` operationalizes this: the "Open in Sandbox" feature (built via the real, recently-landed `react-storybook-addon-export-to-sandbox` package -- see repo's most recent commit `78ea7c4de6 feat(react-storybook-addon-export-to-sandbox)...`) can scaffold a live Tailwind v4 + Vite sandbox pre-wired with `@tailwindcss/vite`.

`CHANGELOG.md` shows steady feature velocity by named Microsoft engineers (dmytrokirpa@microsoft.com, viktorgenaev@microsoft.com, martinhochel@microsoft.com, vgenaev@gmail.com) adding components (MenuButton, Overflow, Tags, TeachingPopover, Toast) and fixing subpath-export completeness through mid-2026 -- this reads as an active, resourced internal initiative, not an abandoned experiment.

No document found (Introduction.mdx, GettingStarted.mdx, Accessibility.mdx, library/README.md, CHANGELOG.md, or any \*Description.md) states a firm intention to replace Griffel repo-wide or gives a dated roadmap milestone; the framing throughout is "headless as an alternative for teams who want to build their own design system," with the styled `@fluentui/react-components` repeatedly called the recommended default for most teams.

## 5. State-communication mechanisms: existing vs. must-add

**Already present in styled (Griffel) components today**, usable as CSS targets without modification:

1. **`aria-*` attributes** -- rendered by the shared base hooks (e.g. `role="checkbox"`, `aria-checked`, `aria-pressed`, `aria-expanded`, `aria-selected`, `aria-disabled`) per `apps/public-docsite-v9-headless/src/Accessibility.mdx`'s ARIA-pattern table (Button/Link, Checkbox, Radio Group, Switch, Accordion, Dialog, Tooltip, Tabs, Menu/Popover all listed with their pattern + key attributes).
2. **`data-fui-focus-visible` / `data-fui-focus-within`** -- defined in `packages/react-components/react-tabster/src/focus/constants.ts` (`FOCUS_VISIBLE_ATTR = 'data-fui-focus-visible'`, `FOCUS_WITHIN_ATTR = 'data-fui-focus-within'`) and `data-keyboard-nav` (`KEYBOARD_NAV_ATTRIBUTE`) -- these are stamped onto the DOM by Tabster's focus-visible polyfill logic today, independent of Griffel, and are real, already-shipping style hooks.
3. **Inline CSS custom properties set via `state.root.style`** -- e.g. `packages/react-components/react-slider/library/src/components/Slider/Slider.constants.ts` defines `sliderProgressVar: '--fui-Slider--progress'`; confirmed rendered in `Slider.test.tsx.snap` as `style="--fui-Slider--direction: 90deg; --fui-Slider--progress: 50%;"`. This is a third, already-existing bridge mechanism for continuous/computed values (thumb position) that CSS Modules/Tailwind can consume via `var()` without any new plumbing.
4. **Native pseudo-classes** on real form elements -- Checkbox/Switch/Radio/Slider position a real `<input>` with `opacity:0` over a visual indicator, so `:checked`, `:disabled`, `:focus-visible` already work natively (documented in `stories/README.md` §6 "Hidden-input pattern" and verified in `checkbox.module.css`).

**Data-attributes the headless layer ADDS (do not exist on the styled Griffel components today)** -- verified by grepping every `state.<slot>['data-...']` assignment across `library/src/components` (`grep -rohE "state\\.[a-zA-Z]+\\['data-[a-zA-Z-]+'\\]" ... | sort -u`), all found on the `root` slot only (no non-root-slot data-attribute assignments were found by the same grep filtered for non-root slots):

```
data-at-bound, data-checked, data-collapsible, data-current, data-disabled,
data-disabled-focusable, data-dismissible, data-expand-icon-position,
data-focused, data-has-actions, data-has-secondary-action, data-icon-only,
data-icon-position, data-intent, data-label-position, data-layout,
data-multiple, data-open, data-orientation, data-position, data-scroll-state,
data-selected, data-spin-state, data-validate-state, data-vertical
```

25 distinct attribute names, spread across 21 files that reference `data-disabled-focusable` alone (`grep -rl "data-disabled-focusable" library/src | wc -l` = 21), confirming this pattern recurs across many components (Button, Link, MenuButton, Switch, and others), not just Checkbox. Per `stories/README.md` §6: "`data-disabled` vs `data-disabled-focusable`. The headless components emit both. Style them the same; the difference is keyboard reachability, not visual" -- and per `Accessibility.mdx` line 37: "headless components set `aria-disabled=\"true\"` while keeping the element keyboard-accessible. Style both `:disabled` pseudo-classes and `[aria-disabled=\"true\"]` states."

**Direct confirmation the styled package itself lacks these hooks:** `grep -n "data-" packages/react-components/react-checkbox/library/src/components/Checkbox/useCheckbox.tsx` returned **zero matches** -- the styled Checkbox's own state-builder hook sets no `data-*` attributes at all; state is expressed purely as JS-computed Griffel class names (`useCheckboxStyles_unstable`, read in full: branches on `disabled`/`checked === 'mixed'`/`checked` to pick `rootStyles.disabled|mixed|checked|unchecked`). This is the crux of the migration gap: **CSS Modules/Tailwind cannot target component state via class-name branching done in JS; the migration must add the same `data-*` attribute-stamping pattern the headless preview already established** (25 attribute names enumerated above) to every styled component's state hook, then rewrite each `use*Styles_unstable` Griffel hook as attribute/pseudo-class selectors in a co-located `.module.css` (or Tailwind data-variant classes) instead of `mergeClasses`/`makeStyles` branches.
