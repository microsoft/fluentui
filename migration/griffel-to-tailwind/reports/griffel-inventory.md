# Research: griffel-inventory

_Generated 2026-07-26 by research workflow wf_7f8b1226-35f (research agents; verify against source before acting on stale claims)._

## Summary

Griffel is used across 58 of 87 packages/react-components subpackages (243 _.styles.ts/.tsx files under _/library/src), concentrated in react-text (18 files), react-table (17), react-nav (16), react-migration-v0-v9 (14), react-teaching-popover and react-menu (12 each). Aggregate API usage across those packages: 2,376 `tokens.` references, 758 `mergeClasses` calls, 602 `makeStyles` calls, 237 `shorthands.` calls, 204 `makeResetStyles` calls, and 120 `createCustomFocusIndicatorStyle`/`createFocusOutlineStyle` calls. 29 packages have zero \*.styles.ts files, but one of those (react-tabster) is a false negative for "needs no conversion" — it declares `@griffel/react` as a direct dependency and defines the two focus-indicator style-generator functions consumed 120 times across 44 files elsewhere. At least 8 components compute CSS custom properties or inline styles from JS at runtime (Slider progress/direction, ColorArea/ColorSlider/AlphaSlider drag position, Tab's animated selection indicator via measured DOM rects, TagPickerControl's ResizeObserver-driven aside width, react-positioning's matchTargetSize/maxSize/slide-direction middlewares, migration-v0-v9 Attachment progress bar) — these resist static CSS Module extraction and need a runtime CSS-variable strategy under Tailwind. `@fluentui/react-icons` (imported by Button etc.) is an external npm dependency (v2.0.311) that lives outside this repo checkout — it does use Griffel internally (precompiled `__styles` calls) but its source is not part of packages/react-components and cannot be converted from this repo; the unrelated legacy `react-icons-mdl2` package uses `@microsoft/load-themed-styles`, not Griffel.

## Key facts

- 243 total _.styles.ts/_.styles.tsx files under packages/react-components/_/library/src, verified by `find packages/react-components -path "_/library/src/_" -type f \( -name "_.styles.ts" -o -name "\*.styles.tsx" \) | wc -l`
- 87 subpackages exist under packages/react-components (find -maxdepth 1 -type d, minus the parent dir itself)
- makeStyles: 602 occurrences / 211 files; makeResetStyles: 204/74; mergeClasses: 758/234; shorthands.: 237/45; createCustomFocusIndicatorStyle|createFocusOutlineStyle: 120/44; tokens.: 2376/154 (all via Grep count mode scoped to packages/react-components/**/library/src/**/\*.{ts,tsx})
- 29 packages have zero \*.styles.ts files (full list in report); of these, react-tabster is a false negative for 'no conversion needed' — its package.json declares @griffel/react ^1.5.32 and packages/react-components/react-tabster/src/focus/{createCustomFocusIndicatorStyle,createFocusOutlineStyle}.ts define Griffel-based focus-ring generators used 120 times across 44 files
- react-aria's only Griffel reference is in a .cy.tsx test file (useActiveDescendant.cy.tsx), not production code — genuinely convertible/no-op for styling
- react-conformance-griffel (0 library/src, 0 styles files) is a Jest-matcher package (src/matchers/, src/overridesWin.ts) used by component test suites to assert Griffel class-override behavior — a hidden test-infra dependency, not a styling one
- packages/react-components/react-button/library/src/components/Button/useButtonStyles.styles.ts (607 lines) uses 2 makeResetStyles + 5 makeStyles slices and mergeClasses to combine base/appearance/shape/size/disabled/focus/icon-position classes keyed by state.appearance/size/shape/disabled/iconPosition
- packages/react-components/react-avatar/library/src/components/Avatar/useAvatarStyles.styles.ts (623 lines) builds an imperative rootClasses array from numeric size-bucket branching (size<=24, <=28, ... <=96) plus enum checks on active/activeAppearance/shape/color, using --fui-Avatar-\* CSS vars keyed by discrete size/badge buckets (not continuous runtime values)
- packages/react-components/react-table/library/src/components/Table/useTableStyles.styles.ts (57 lines) is the simplest read: single boolean state.noNativeElements picks between table-layout and flex-layout root classes via one mergeClasses call
- Confirmed runtime-value (JS-computed) styling in: react-slider useSliderState.tsx (--fui-Slider--direction/--progress), react-color-picker useColorArea.ts lines 161-166 (--fui-AreaX/Y--progress, thumb/main color from tinycolor), react-tabs useTabAnimatedIndicator.styles.ts (state.root.style = measured getBoundingClientRect offset/scale via requestAnimationFrame), react-tag-picker useTagPickerControl.tsx line 80 (ResizeObserver + style.setProperty for aside width) and useTagPickerInput.tsx lines 182-191 (input.style.setProperty width stretch), react-positioning usePositioningSlideDirection.ts lines 65-66 and middleware/matchTargetSize.ts line 20 and middleware/maxSize.ts lines 54-62 (all style.setProperty from measured geometry), react-migration-v0-v9 Attachment.tsx line 47 (style={{width: `${progress}%`}}), react-table useTableColumnSizing.tsx line 37 (getColumnStyles returns React.CSSProperties from live resize state)
- @fluentui/react-icons is NOT source-present in this repo checkout — it's an external npm dependency (node_modules/@fluentui/react-icons/package.json version 2.0.311, dependencies: @griffel/react ^1.0.0) whose lib/utils/createFluentIcon.js and bundleIcon.styles.js use precompiled Griffel `__styles` output (mergeClasses + useRootStyles) — out of scope for direct conversion from this repo
- packages/react-icons-mdl2/package.json has no Griffel dependency at all (uses @fluentui/react-icon-provider, @microsoft/load-themed-styles) — unrelated legacy v8 icon package

## Risks

- react-tabster's Griffel-based focus-indicator helpers (createCustomFocusIndicatorStyle/createFocusOutlineStyle) are consumed 120 times across 44 component styles files — this shared utility must be redesigned as a Tailwind/CSS-Module equivalent before or alongside per-component conversion, otherwise 44 files break simultaneously
- At least 8 components/hooks compute CSS custom properties or inline styles from live runtime values (drag position, ResizeObserver, getBoundingClientRect, requestAnimationFrame) — Slider, ColorArea/ColorSlider/AlphaSlider, Tab's animated indicator, TagPickerControl, react-positioning's matchTargetSize/maxSize/slide-direction, migration-v0-v9 Attachment. These cannot be pre-compiled into static Tailwind classes and need an explicit runtime CSS-variable strategy carried over from the current approach
- @fluentui/react-icons lives in a separate repository/package not checked out here — any migration plan that assumes all Griffel usage is convertible from this repo will miss this external dependency; coordination with that package's maintainers (or a vendoring decision) is required since Button/Avatar/etc. rely on its iconFilledClassName/iconRegularClassName and Griffel-driven display toggling
- react-conformance-griffel is a test-infrastructure package (Jest matchers), not a component package — component test suites using its matchers will need rewriting when Griffel's class-override semantics disappear, a cost not captured by counting styles files alone
- The zero-styles-file heuristic under-counts true Griffel dependencies: react-tabster proves that a package can have 0 \*.styles.ts files yet still require Griffel-aware migration work; the migration ledger should verify each '0-count' package individually rather than assuming no-op status from file count alone

## Full report

## Commands used (all from C:/Users/ArrayKnight/Code/fluentui)

Package count: `find packages/react-components -maxdepth 1 -type d | wc -l` → 88 (includes the `react-components/` dir itself → 87 real subpackages)

Per-package styles-file count:

```
for d in packages/react-components/*/; do
  pkg=$(basename "$d")
  if [ -d "${d}library/src" ]; then
    count=$(find "${d}library/src" -type f \( -name "*.styles.ts" -o -name "*.styles.tsx" \) | wc -l)
  else
    count=0
  fi
  echo "$pkg,$count"
done
```

Grand total check: `find packages/react-components -path "*/library/src/*" -type f \( -name "*.styles.ts" -o -name "*.styles.tsx" \) | wc -l` → **243** (matches sum of table below)

## 1. Styles-file count per package (packages/react-components/\*/library/src)

| Package                 | Styles files | Package                 | Styles files | Package                                 | Styles files |
| ----------------------- | ------------ | ----------------------- | ------------ | --------------------------------------- | ------------ |
| react-text              | 18           | react-color-picker      | 4            | react-datepicker-compat                 | 1            |
| react-table             | 17           | react-card              | 4            | react-checkbox                          | 1            |
| react-nav               | 16           | react-breadcrumb        | 4            | **0-count packages (29):**              |              |
| react-migration-v0-v9   | 14           | react-avatar            | 4            | theme-designer                          | 0            |
| react-teaching-popover  | 12           | react-accordion         | 4            | recipes                                 | 0            |
| react-menu              | 12           | react-tabs              | 3            | react-utilities-compat                  | 0            |
| react-drawer            | 10           | react-rating            | 3            | react-utilities                         | 0            |
| react-carousel          | 10           | react-migration-v8-v9   | 3            | react-theme-sass                        | 0            |
| react-toast             | 8            | react-badge             | 3            | react-theme                             | 0            |
| react-tag-picker        | 7            | react-skeleton          | 2            | react-tabster                           | 0            |
| react-calendar-compat   | 7            | react-radio             | 2            | react-storybook-addon-export-to-sandbox | 0            |
| react-toolbar           | 6            | react-list              | 2            | react-storybook-addon                   | 0            |
| react-menu-grid-preview | 6            | react-infolabel         | 2            | react-shared-contexts                   | 0            |
| react-dialog            | 6            | react-tooltip           | 1            | react-portal-compat-context             | 0            |
| react-tree              | 5            | react-timepicker-compat | 1            | react-portal-compat                     | 0            |
| react-tags              | 5            | react-textarea          | 1            | react-motion-components-preview         | 0            |
| react-swatch-picker     | 5            | react-switch            | 1            | react-motion                            | 0            |
| react-message-bar       | 5            | react-spinner           | 1            | react-jsx-runtime                       | 0            |
| react-combobox          | 5            | react-spinbutton        | 1            | react-icons-compat                      | 0            |
| react-button            | 5            | react-slider            | 1            | react-headless-components-preview       | 0            |
|                         |              | react-select            | 1            | react-context-selector                  | 0            |
|                         |              | react-search            | 1            | react-conformance-griffel               | 0            |
|                         |              | react-provider          | 1            | react-components                        | 0            |
|                         |              | react-progress          | 1            | react-colorpicker-compat                | 0            |
|                         |              | react-positioning       | 1            | react-aria                              | 0            |
|                         |              | react-portal            | 1            | priority-overflow                       | 0            |
|                         |              | react-popover           | 1            | keyboard-keys                           | 0            |
|                         |              | react-persona           | 1            | global-context                          | 0            |
|                         |              | react-overflow          | 1            | eslint-plugin-react-components          | 0            |
|                         |              | react-link              | 1            | deprecated                              | 0            |
|                         |              | react-label             | 1            | component-selector-preview              | 0            |
|                         |              | react-input             | 1            | babel-preset-storybook-full-source      | 0            |
|                         |              | react-image             | 1            | babel-preset-global-context             | 0            |
|                         |              | react-field             | 1            |                                         |              |
|                         |              | react-divider           | 1            |                                         |              |

## 2. Griffel API usage counts (grep across packages/react-components/**/library/src/**/\*.{ts,tsx})

| Pattern                                                        | Total occurrences | Files matched |
| -------------------------------------------------------------- | ----------------- | ------------- |
| `makeStyles` (word-bounded)                                    | 602               | 211           |
| `makeResetStyles`                                              | 204               | 74            |
| `mergeClasses`                                                 | 758               | 234           |
| `shorthands.`                                                  | 237               | 45            |
| `createCustomFocusIndicatorStyle` \| `createFocusOutlineStyle` | 120               | 44            |
| `tokens.`                                                      | 2,376             | 154           |

Highest single-file `tokens.` users: `react-avatar/.../useAvatarStyles.styles.ts` (129 — dominated by the 33-color palette table), `react-tabs/.../useTabStyles.styles.ts` (144), `react-button/.../useButtonStyles.styles.ts` (94), `react-card/.../useCardStyles.styles.ts` (70), `react-spinbutton/.../useSpinButtonStyles.styles.ts` (70).

Repo-wide (not scoped to react-components), `@griffel/react` is imported by 251 files under `**/library/src/**` and 283 files under `**/src/**` (adds `theme-designer`, `recipes` doc-example files) — command: `Grep pattern:"@griffel/react" glob:"**/library/src/**/*.{ts,tsx}"`.

## 3. Packages with ZERO styles files

Full list of 29 (table above, right column). Caveats found by deeper grep (`Grep pattern:"@griffel/react"` scoped per-package directory):

- **react-tabster** (0 styles files) — **NOT actually Griffel-free**. `package.json` declares `"@griffel/react": "^1.5.32"` as a direct dependency (`packages/react-components/react-tabster/package.json`). Its `src/focus/createCustomFocusIndicatorStyle.ts` and `src/focus/createFocusOutlineStyle.ts` import `@griffel/react` and are the shared focus-ring style generators invoked 120 times across 44 component styles files (item #2 above). This package must be part of the migration, just not via a `.styles.ts` file.
- **react-aria** (0 styles files) — Griffel appears only in one Cypress test file (`react-aria/library/src/activedescendant/useActiveDescendant.cy.tsx`), not production code. Confirmed Griffel-free for conversion purposes.
- **react-conformance-griffel** — despite the name, this is a Jest-matcher/test-conformance helper package (`src/matchers/`, `src/overridesWin.ts`) used by component test suites to assert Griffel class-override behavior. It has no `library/src` and no styles files, but every component's conformance test suite that imports its matchers will need rework when Griffel is removed — a hidden test-infrastructure dependency, not a styling one.
- Confirmed genuinely Griffel-free (no `@griffel/react` import anywhere in source, only referenced in a `package.json` line if at all): react-colorpicker-compat, react-portal-compat, react-portal-compat-context, react-utilities-compat, react-context-selector, keyboard-keys, priority-overflow, react-jsx-runtime, react-icons-compat, react-motion, react-motion-components-preview, react-shared-contexts, react-theme, react-utilities.
- react-components (the barrel/meta package, `src/index.ts`, 2,223 lines) is a pure re-export surface with no source styling of its own.

## 4. Three representative styles files read in full

**`packages/react-components/react-button/library/src/components/Button/useButtonStyles.styles.ts`** (607 lines)

- Imports `shorthands, makeStyles, makeResetStyles, mergeClasses` from `@griffel/react`, `tokens` from `@fluentui/react-theme`, `createCustomFocusIndicatorStyle` from `@fluentui/react-tabster`.
- Structure: `useRootBaseClassName`/`useIconBaseClassName` via `makeResetStyles` (base, non-overridable styles) + five separate `makeStyles` slices: `useRootStyles` (appearance/shape/size variant keys: outline/primary/secondary/subtle/transparent, circular/rounded/square, small/medium/large), `useRootDisabledStyles`, `useRootFocusStyles`, `useRootIconOnlyStyles`, `useIconStyles` (icon position before/after).
- `buttonClassNames: SlotClassNames<ButtonSlots>` maps each slot to a fixed `fui-Button`/`fui-Button__icon` public class name.
- In `useButtonStyles_unstable(state)`: destructures `state` (`appearance, disabled, disabledFocusable, icon, iconOnly, iconPosition, shape, size`) and builds `state.root.className` via a single `mergeClasses(...)` call chaining the base class, then conditionally-selected variant classes indexed by state value (`rootStyles[appearance]`, `rootStyles[size]`, boolean-gated additions like `icon && size === 'small' && rootStyles.smallWithIcon`), disabled-state classes, focus classes, icon-only-size classes, and finally the incoming `state.root.className` (to let consumer overrides win last). Same pattern repeated for `state.icon.className`. Uses a runtime CSS var only for icon-spacing (`--fui-Button__icon--spacing`), set via static `makeStyles`/`makeResetStyles` keys, not from JS.

**`packages/react-components/react-avatar/library/src/components/Avatar/useAvatarStyles.styles.ts`** (623 lines)

- Defines a local `vars` map of `--fui-Avatar-*` CSS custom properties (badgeRadius, badgeGap, badgeAlign, ringWidth) referenced inside `makeResetStyles`/`makeStyles` blocks via `var(...)` and set as static enum-keyed values (e.g. `tiny`/`small`/`medium`/`large` badge-size buckets), not from arbitrary runtime numbers.
- Six `makeStyles` calls: `useStyles` (text-size buckets, square-radius buckets, ring/shadow pseudo-element toggles, badge alignment/cutout, badge-size buckets, icon-size buckets), `useSizeStyles` (14 discrete pixel sizes 16–128), `useColorStyles`/`useRingColorStyles` (33 palette colors each, generated from `tokens.colorPalette*`).
- `useAvatarStyles_unstable(state)` builds an array `rootClasses` imperatively (`.push(...)`) driven by numeric-bucket branching on `size` (`size <= 24`, `<= 28`, `<= 40`... mapped to discrete text/square/ring/shadow classes) plus boolean/enum checks on `active`, `activeAppearance`, `shape`, then joins with `mergeClasses(avatarClassNames.root, ...rootClasses, state.root.className)`. Separate `mergeClasses` calls apply slot classes to `state.badge`, `state.image`, `state.initials`, `state.icon`, each re-using the shared `colorStyles[color]`/`styles.badgeCutout` lookups.

**`packages/react-components/react-table/library/src/components/Table/useTableStyles.styles.ts`** (57 lines — simplest of the three)

- Three tiny `makeStyles` calls: `useTableLayoutStyles` (`display:'table'`), `useFlexLayoutStyles` (`display:'block'`), `useStyles` (root `borderCollapse`/`backgroundColor`).
- `useTableStyles_unstable(state)` picks between the table-layout and flex-layout root class based on the boolean `state.noNativeElements`, merged via a single `mergeClasses(tableClassName, styles.root, state.noNativeElements ? layoutStyles.flex.root : layoutStyles.table.root, state.root.className)`. (Richer state-driven table slots such as `TableRow`/`TableHeaderCell`/`DataGridRow` exist elsewhere in the package with `tokens.` counts of 9–19 but were not read in full for this task.)

## 5. Runtime-value styling (resists static CSS extraction)

Grep commands: `Grep pattern:"style:\s*\{"`, `Grep pattern:"\.setProperty\("`, `Grep pattern:"'--fui-|\"--fui-|`--fui-"`, `Grep pattern:"style=\{\{"`all scoped to`packages/react-components/**/library/src/**/\*.{ts,tsx}`.

Confirmed genuine runtime-value cases (file : mechanism):

- `react-slider/library/src/components/Slider/useSliderState.tsx` — sets `--fui-Slider--direction` and `--fui-Slider--progress` inline from `state.vertical`/`dir`/computed `valuePercent`; `useSliderStyles.styles.ts` consumes them via `var(...)` in gradient/clamp calc expressions. Confirmed live in `Slider.test.tsx.snap` (`style="--fui-Slider--direction: 90deg; --fui-Slider--progress: 50%;"`).
- `react-color-picker/library/src/components/ColorArea/useColorArea.ts` (lines 161–166) — builds `rootVariables` object setting `--fui-AreaX--progress`, `--fui-AreaY--progress` (from `saturation`/`value`), `--fui-Area__thumb--color` and `--fui-Area--main-color` (from `tinycolor(hsvColor)` conversions) — fully continuous, drag-driven values. Sibling components `ColorSlider`, `AlphaSlider` follow the same pattern (all three matched the `--fui-` grep).
- `react-tabs/library/src/components/Tab/useTabAnimatedIndicator.styles.ts` (full file read) — measures sibling tab DOM rects with `getBoundingClientRect()` inside `calculateTabRect`, computes `offset`/`scale` via `React.useState`, and directly assigns `state.root.style = { ...rootCssVars, ...state.root.style }` where `rootCssVars` sets `--fui-Tab__indicator--offset`/`--fui-Tab__indicator--scale` from the measured values — driven by `requestAnimationFrame` (`useAnimationFrame`), a textbook case that cannot be statically extracted.
- `react-tag-picker/library/src/components/TagPickerControl/useTagPickerControl.tsx` (line 80) — `innerRef.current?.style.setProperty(tagPickerControlAsideWidthToken, \`${entry.contentRect.width}px\`)`inside a`ResizeObserver`callback;`TagPickerControl.types.ts`types the CSS var directly onto`React.CSSProperties`.
- `react-tag-picker/library/src/components/TagPickerInput/useTagPickerInput.tsx` (lines 182–191) — `input.style.setProperty(tagPickerInputCSSRules.width, '100%')` / `input.style.removeProperty(...)` to stretch an autosizing input.
- `react-positioning/library/src/usePositioningSlideDirection.ts` (lines 65–66) — `element.style.setProperty(POSITIONING_SLIDE_DIRECTION_VAR_X/_Y, \`${x}px\`)`from computed placement geometry, plus a`CSS.registerProperty` call for animatable custom properties.
- `react-positioning/library/src/middleware/matchTargetSize.ts` (line 20) and `middleware/maxSize.ts` (lines 54–62) — Floating-UI middlewares that `setProperty` width/max-size/overflow directly on the floating element style from measured `referenceRect`/`availableSize`.
- `react-migration-v0-v9/library/src/components/Attachment/Attachment.tsx` (line 47) — `style={{ width: \`${progress}%\` }}`JSX inline style from a numeric`progress` prop.
- `react-tree/library/src/components/TreeItemChevron.tsx` (lines 17–20) — `style={{ ...expandIconInlineStyles[expandIconRotation], transition: ... }}` — a lookup-table inline style keyed by a small enum (0/90/180/270), a milder case (finite lookup, not continuous).
- `react-table/library/src/hooks/useTableColumnSizing.tsx` (line 37) — `getColumnStyles(column, dragging): React.CSSProperties` returns inline width styles from live column-resize state.

Weaker/false-positive matches worth noting: `useCheckboxStyles.styles.ts`, `useRadioStyles.styles.ts`, `useMenuItemStyles.styles.ts`, etc. matched the `style:\s*\{` grep only because they call `createFocusOutlineStyle({ style: {}, selector: ... })` — a Griffel helper's parameter name, not a runtime style. `react-card`'s `--fui-Card--size`/`--fui-Card--border-radius` vars are enum-bucket driven (small/medium/large), not JS-computed continuous values.

## 6. react-icons / icon styling

- `@fluentui/react-icons` (imported by Button, etc. as `iconFilledClassName`/`iconRegularClassName`) is **not present as source in this repo checkout** — no `packages/react-icons` or `packages/react-components/react-icons` directory exists (`find . -maxdepth 4 -type d -iname "*icons*"` only surfaces `font-icons-mdl2`, `react-file-type-icons`, `react-icons-mdl2`, `react-icons-mdl2-branded`, and `react-components/react-icons-compat`). It is consumed purely as an installed npm dependency: `node_modules/@fluentui/react-icons/package.json` → version `2.0.311`, `"dependencies": { "@griffel/react": "^1.0.0", "tslib": "^2.1.0" }`.
- It **does use Griffel**, but pre-compiled: `node_modules/@fluentui/react-icons/lib/utils/createFluentIcon.js` calls `mergeClasses(iconState.className, styles.root)` where `styles = useRootStyles()` comes from `createFluentIcon.styles.js`, which is Griffel's AOT macro output (`import { __styles } from "@griffel/react"; export const useRootStyles = __styles({ root: { "B8gzw0y": "f1dd5bof" } }, { m: [...] })`) — a forced-colors-mode `forced-color-adjust` rule. `bundleIcon.styles.js` similarly compiles a `visible`/`root` (`display:none`/`display:inline`) pair used for filled/regular icon swapping.
- Because this package's source lives outside the fluentui monorepo checkout (published separately from a different repo, e.g. fluentui-system-icons), it is **out of scope for direct conversion from this repo** — the migration ledger should track it as an external dependency to coordinate with separately, not as a package to convert here.
- The legacy `react-icons-mdl2` package (`packages/react-icons-mdl2/package.json`) has **no Griffel dependency** at all — its `dependencies` are `@fluentui/react-icon-provider`, `@fluentui/set-version`, `@fluentui/utilities`, `@microsoft/load-themed-styles`, `tslib` — it uses the classic v8 themed-styles mechanism, unrelated to this migration's Griffel→Tailwind scope.
