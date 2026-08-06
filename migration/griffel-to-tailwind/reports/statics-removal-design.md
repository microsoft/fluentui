# Statics-removal design (D15.7 follow-on phase)

Status: DESIGN ONLY — nothing in `packages/`, `DECISIONS.md` or `validation/` is touched by this
document. Everything below is grounded in greps/reads of the working tree on branch
`styling/tailwind-css-modules` at `d712b3c8fb`, measured 2026-07-28.

**Scope.** The 34 packages the ledger marks `validated`
(`migration/griffel-to-tailwind/ledger.json`): 33 component packages plus
`react-tailwind-theme` (0 style files, no statics — it appears only in the worklist as a
variant-catalog change).

**Contract being implemented** (DECISIONS.md D15.7, user-confirmed): all published BEM statics
(`fui-X`, `fui-X__slot`) are removed from converted packages. The public styling contract
becomes slot `className` props + `group/fui-<kebab>` as the sole public identity class + `data-*`
state variants + the layer system. No public class-name targeting of component internals.

**Blocking constraint** (D15.1 / D15.7): the group marker must NEVER be `classList[0]`. nwsapi's
`:scope` polyfill synthesises its anchor from `escape(element.classList[0])`, and the `/` in
`group/fui-<kebab>` survives that escaping, producing an invalid selector production
(`div#a.group,,fui-list-item…`) and a render-time `AggregateError` under jsdom. Today the static
class is what keeps the marker off position 0. Removing statics naively re-breaks this
**everywhere at once**.

---

## 0. Executive numbers

| Quantity                                                               | Count                                          |
| ---------------------------------------------------------------------- | ---------------------------------------------- |
| Converted packages in scope                                            | 34 (33 with statics)                           |
| Distinct static class strings owned by converted packages              | **184** (71 root, 113 `__` sub-slot)           |
| Exported `*ClassNames` constants (api-extractor reports, 33 files)     | **87**                                         |
| `state.<slot>.className = clsx(…)` sites in converted packages         | 171 (163 carry a static)                       |
| …of those still `mergeClasses(…)` (Griffel remnants)                   | 20, in 11 style hooks                          |
| Group-marker sites                                                     | **65**                                         |
| — Class A: marker + an unconditional `styles.*` → reorder only         | **59**                                         |
| — Class B: marker with NO unconditional module class → needs new token | **6**                                          |
| Truly static-only sub-slots (assignment becomes a no-op)               | **6**                                          |
| In-repo CSS selector sites targeting a converted static                | **39** rules across **9** `*.module.css` files |
| `isConformant()` call sites in converted packages                      | **83**                                         |
| — passing `has-static-classnames` testOptions                          | 32                                             |
| — already disabling `component-has-static-classnames-object`           | 10                                             |
| Test files with inline `class="fui-…"` assertions (converted pkgs)     | **25**                                         |
| Snapshot files containing a converted static                           | **67** (883 token occurrences)                 |
| — inside converted packages                                            | 41 files / 158 tokens                          |
| — inside UNCONVERTED packages (charts, carousel, table, …)             | 26 files / 725 tokens                          |
| Runtime (non-test) code reading a converted static                     | **3 sites**                                    |

---

## 1. FULL inventory

### 1a. Cross-package / cross-component CSS selectors in `*.module.css`

39 rule-level selector occurrences across 9 module files. `fui-Icon-filled` / `fui-Icon-regular`
(12 occurrences in Button, 4 in BreadcrumbButton, 6 in InfoButton, 6 in InteractionTagPrimary) are
**out of scope**: those classes belong to `@fluentui/react-icons`, not to a converted package, and
are unaffected by this phase.

| File                                                                               | Lines                                            | Selector                                                                                | Owner of the targeted class                                 | Relationship                                   |
| ---------------------------------------------------------------------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------- |
| `packages/react-components/react-card/library/src/components/Card/Card.module.css` | 790, 791                                         | `& > :global(.fui-CardHeader)`, `& > :global(.fui-CardFooter)`                          | react-card                                                  | cross-**component**, same package              |
| ”                                                                                  | 802, 827                                         | `& > :global(.fui-CardPreview)`                                                         | react-card                                                  | cross-component                                |
| ”                                                                                  | 818, 819                                         | `& > :global(.fui-CardHeader:last-of-type)`, `…fui-CardFooter:last-of-type`             | react-card                                                  | cross-component + structural pseudo            |
| ”                                                                                  | (in the same two `@variant` blocks)              | `& > :global(:not([aria-hidden='true']).fui-CardPreview:first-of-type / :last-of-type)` | react-card                                                  | cross-component + `:not()` + structural pseudo |
| ”                                                                                  | 838                                              | `& > :global(.fui-Card__floatingAction + .fui-CardPreview)`                             | react-card (own **sub-slot** + sibling component)           | mixed                                          |
| ”                                                                                  | 858                                              | `& :global(.fui-Text)`                                                                  | **react-text**                                              | cross-**package**                              |
| ”                                                                                  | 875–878                                          | `&:where(:hover) :global(.fui-CardPreview)` … `.fui-CardFooter`                         | react-card                                                  | cross-component, forced-colors                 |
| ”                                                                                  | 891, 892                                         | `& :global(.fui-CardPreview)`, `& :global(.fui-CardFooter)`                             | react-card                                                  | cross-component, forced-colors                 |
| `…/react-card/…/CardFooter/CardFooter.module.css`                                  | 87, 88                                           | `& :global(.fui-Button)`, `& :global(.fui-Link)`                                        | **react-button**, **react-link**                            | cross-package, forced-colors                   |
| `…/react-card/…/CardHeader/CardHeader.module.css`                                  | 169, 170                                         | `& :global(.fui-Button)`, `& :global(.fui-Link)`                                        | **react-button**, **react-link**                            | cross-package, forced-colors                   |
| `…/react-list/…/ListItem/ListItem.module.css`                                      | 139                                              | `.checkmark & :global(.fui-Checkbox__indicator)`                                        | **react-checkbox** (`indicator` SUB-SLOT)                   | cross-package sub-slot                         |
| `…/react-toolbar/…/ToolbarButton/ToolbarButton.module.css`                         | 79                                               | `& :global(.fui-Button__icon)`                                                          | **react-button** (`icon` SUB-SLOT)                          | cross-package sub-slot                         |
| `…/react-breadcrumb/…/BreadcrumbButton/BreadcrumbButton.module.css`                | 224, 234                                         | `& :global(.fui-Button__icon)`                                                          | **react-button** (`icon` SUB-SLOT)                          | cross-package sub-slot                         |
| ”                                                                                  | 342                                              | `.root:global(.fui-BreadcrumbButton)`                                                   | react-breadcrumb (**own root**)                             | **specificity compound in an UNLAYERED rule**  |
| `…/react-button/…/Button/Button.module.css`                                        | 324, 340, 349, 357, 485, 503, 522, 536, 555, 568 | `& :global(.fui-Button__icon)`                                                          | react-button (own sub-slot)                                 | intra-component                                |
| `…/react-spinbutton/…/SpinButton/SpinButton.module.css`                            | 363, 677, 706, 741                               | `&:global(.fui-SpinButton__button_active)`                                              | react-spinbutton (own **internal, unexported** state class) | intra-component                                |
| `…/react-tree/…/TreeItem/TreeItem.module.css`                                      | 166, 167                                         | `& > :global(.fui-TreeItemLayout)`, `& > :global(.fui-TreeItemPersonaLayout)`           | react-tree                                                  | cross-component, same package                  |

Comment-only references (no rule impact, but they must be rewritten so the file headers stay
truthful): `Card.module.css:26,30,31,34,61,62,75,76,77`; `CardPreview.module.css:36`;
`Button.module.css:49,322,338,817`; `BreadcrumbButton.module.css:38,189,211,330,335`;
`ToolbarButton.module.css:23,46,50`; `ListItem.module.css:50,61,132`;
`SpinButton.module.css:45,100,721`; `SearchBox.module.css:40`; `CardFooter.module.css:33,39`;
`CardHeader.module.css:52,55`.

### 1b. Conformance suite

`packages/react-conformance/src/defaultTests.tsx` — three tests break, one survives, one needs a
re-read.

| Test id                                                                                        | Lines   | Behaviour today                                                                                                  | After statics removal                                                                                                                                                                                                               |
| ---------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `component-has-static-classnames-object` → _"has static classnames exported at top-level"_     | 240–263 | `require(<pkg>/src/index)[<name>ClassNames]` must be truthy                                                      | **FAILS** for every converted package if the export is deleted. Survives if the export is retained (§3).                                                                                                                            |
| ” → _"has static classnames in correct format"_                                                | 265–288 | asserts `classNames[k] === 'fui-<Component>'` for `root`, `'fui-<Component>__<k>'` otherwise                     | **FAILS** under any repoint of the constants; the format is hard-coded, `componentClassName = \`${prefix}-${componentName}\`` at L244–245                                                                                           |
| ” → _"has static classnames in rendered component"_                                            | 290–332 | every value must be `rootEl.classList.contains(v)` or `rootEl.querySelector('.'+v)` (portal fallback at 316–320) | **FAILS** — the classes are no longer rendered                                                                                                                                                                                      |
| `component-handles-classname`                                                                  | 195–208 | consumer `className` must appear in the root classList                                                           | **PASSES unchanged** — consumer className stays last in every `clsx`                                                                                                                                                                |
| `component-preserves-default-classname`                                                        | 211–235 | renders twice; every class from the default render must survive a `className` prop                               | **PASSES**, and gets _stronger_: the defaults become `fuicm-…` + `group/fui-…` and both must survive. Note `classListToStrings` is a plain `classList` iteration, so `group/fui-x` is one token and `toContain` matches it exactly. |
| `classNameOverridesWin` (`classNameOverridesWin.tsx:131`, `classNameOverridesWin.test.tsx:41`) | —       | doc-comment + fixture reference `fui-Badge` in an illustrative class string                                      | Cosmetic; update the example strings so they read `fuicm-badge-root-… group/fui-badge …`                                                                                                                                            |

Disable/opt-in surface already present in converted packages (these are the files the sweep edits):

- **83** `isConformant()` call sites across the 33 packages.
- **32** of them pass `testOptions['has-static-classnames']` (variant props, `expectedClassNames`
  overrides, `getPortalElement`) — e.g.
  `react-infolabel/…/InfoButton/InfoButton.test.tsx`, `react-persona/…/Persona.test.tsx`,
  `react-card/…/Card.test.tsx`, `react-avatar/…/Avatar.test.tsx` and
  `…/AvatarGroupPopover.test.tsx`, `react-button/…/MenuButton.test.tsx`,
  `react-tree/…/TreeItem*.test.tsx` (3), `react-search/…/SearchBox.test.tsx`,
  `react-breadcrumb/…/BreadcrumbItem.test.tsx` + `…/BreadcrumbButton.test.tsx`.
- **10** already list `'component-has-static-classnames-object'` in `disabledTests`:
  `react-infolabel/InfoButton:60`, `react-message-bar/MessageBarActions:14`,
  `react-rating/RatingItem:16`, `react-toolbar/{ToolbarButton:18, ToolbarDivider:17,
ToolbarGroup:17, ToolbarRadioButton:13, ToolbarRadioGroup:15, ToolbarToggleButton:11}`,
  `react-tree/TreeItem:26`.

**What replaces the three broken tests.** Add one default test to
`packages/react-conformance/src/defaultTests.tsx`, `component-has-group-marker`, plus a
`testOptions['has-group-marker']` escape hatch:

```ts
/** Component's outermost slot carries exactly one unhashed `group/fui-<kebab>` marker,
 *  and that marker is never classList[0] (nwsapi :scope — DECISIONS.md D15.1). */
'component-has-group-marker': (testInfo: IsConformantOptions) => {
  const expected = testInfo.testOptions?.['has-group-marker']?.marker
    ?? `group/fui-${kebab(testInfo.displayName)}`;

  it('stamps its named group marker (component-has-group-marker)', () => { … });

  it('never emits the marker as classList[0] (component-has-group-marker)', () => {
    const el = getTargetElement(testInfo, render(<Component {...requiredProps} />), 'className');
    expect(el.classList[0]).not.toMatch(/^(group|peer)\//);
  });
},
```

The second assertion is the machine-checkable form of the D15.1 invariant and is why it belongs in
the shared suite rather than in per-package tests: it fires on all 83 call sites for free and
catches any future reordering regression, including in packages converted after this phase.
`component-has-static-classnames-object` is then **deleted outright** (not merely disabled) —
leaving it in the default set with 33 packages opting out is a worse signal than removing a rule
the design has retired. Packages that still ship statics (the 19 `needs-conversion` + 11 `special`
packages) keep it via an **explicit opt-in** `extraTests` entry re-exported from
`react-conformance` as `hasStaticClassNames`, so their coverage is not silently dropped.

### 1c. Runtime code reading class names

Only three non-test sites in the whole repo read a converted package's static at runtime. All
three are load-bearing.

1. **`packages/react-components/react-card/library/src/components/CardPreview/useCardPreview.ts:54`**

   ```ts
   const img = previewRef.current.parentNode.querySelector<HTMLImageElement>(`.fui-CardPreview > img`);
   ```

   A live DOM query. Deleting `fui-CardPreview` silently returns `null` — no type error, no test
   failure unless a test covers this path. **Highest-severity single item in this phase.**

2. **`packages/react-components/react-portal-compat/src/PortalCompatProvider.tsx:10`**

   ```ts
   const CLASS_NAME_REGEX = new RegExp(`([^\\s]*${fluentProviderClassNames.root}\\w+)`, 'g');
   ```

   Extracts the runtime theme class for v8 interop. Note the regex requires `\w+` **after** the
   literal, so it matches `fui-FluentProvider3` but **not** the bare `fui-FluentProvider` static —
   verified by inspection of the pattern. The bare static is therefore safe to stop rendering; the
   **constant is not safe to delete**, because it is the seed.

3. **`packages/react-components/react-provider/library/src/components/FluentProvider/useFluentProviderThemeStyleTag.ts:58`**

   ```ts
   const styleTagId = useId(fluentProviderClassNames.root);
   ```

   This is where `fui-FluentProvider<n>` — the class hosting all 459 `--token` custom properties —
   is minted. `fluentProviderClassNames.root` has a **second, non-styling role** as an identity
   prefix. It is the single strongest argument against deleting the exports (§3).

Out of scope (unconverted packages inspecting their **own** statics, unaffected by this phase):
`react-menu/library/src/utils/useValidateNesting.ts:26–34,62` and
`react-menu-grid-preview/library/src/utils/useValidateNesting.ts:35,43`.

### 1d. `xClassNames` export consumers, in-repo

Cross-package imports of a **converted** package's classNames export — the complete set:

| Consumer                                                                                                    | Line     | Import                                                       | Use                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `packages/react-components/react-portal-compat/src/PortalCompatProvider.tsx`                                | 4, 10    | `fluentProviderClassNames` from `@fluentui/react-components` | regex seed (§1c.2)                                                                                                        |
| `packages/react-components/react-migration-v0-v9/library/src/components/Spinner/SpinnerMigration.mixins.ts` | 2, 8     | `labelClassNames` from `@fluentui/react-components`          | Griffel mixin ``[`& .${labelClassNames.root}`]`` — an **unconverted package selecting a converted package's root static** |
| `packages/react-components/react-migration-v0-v9/…/SpinnerMigration.mixins.test.ts`                         | 23       | —                                                            | asserts the emitted `'& .fui-Label'` key                                                                                  |
| `apps/vr-tests-react-components/src/stories/SpinButton/SpinButtonInteractions.stories.tsx`                  | 4, 20–34 | `spinButtonClassNames` from `@fluentui/react-spinbutton`     | 6 Storybook interaction selectors (`incrementButton`, `decrementButton`)                                                  |
| `apps/vr-tests-react-components/src/stories/Spinner.stories.tsx`                                            | 3, 13    | `spinnerClassNames` from `@fluentui/react-spinner`           | ``[`& .${spinnerClassNames.spinner}, & .${spinnerClassNames.spinnerTail}`]`` in a story-local Griffel style               |
| `apps/rit-tests-v9/src/react-19/components/Tooltip.cy.tsx`                                                  | 13, 42   | `tooltipClassNames` from `@fluentui/react-tooltip`           | `cy.get(\`.${tooltipClassNames.content}\`)`                                                                               |
| `packages/react-components/react-tree/library/src/components/Tree/Tree.cy.tsx`                              | 8        | `treeItemLayoutClassNames` from `@fluentui/react-tree`       | own package, cypress selector                                                                                             |

Not in scope but structurally identical (both packages unconverted, listed so the pattern is not
mistaken for an omission): `react-dialog/src/testing/selectors.ts:1`
(`dialogSurfaceClassNames`, `dialogTitleClassNames`), `react-tag-picker/…/useTagPicker.ts:13`
(`optionClassNames` from react-combobox), `apps/vr-tests-react-components/…/Table/TableSubtleSelection.stories.tsx:3`
(`tableHeaderClassNames`).

Declaration surface: **87** `*ClassNames:` lines across the 33 `library/etc/*.api.md` reports
(largest: react-text 18, react-button 5, react-message-bar 5, react-tags 5, react-tree 5), all
re-exported through `packages/react-components/react-components/src/index.ts` (193
`ClassNames`-bearing lines).

### 1e. VR story / cypress selectors

| File                                                                                       | Lines                                  | Selector                                                                                                                                                                        | Status                                        |
| ------------------------------------------------------------------------------------------ | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `apps/vr-tests-react-components/src/stories/Link/utils.tsx`                                | 41, 44, 45, 47, 48, 50, 56, 58, 60     | literal `'.fui-Link'` — `.hover/.focus/.mouseDown/.mouseUp` plus two `executeScript` calls that set/remove `data-fui-focus-visible` via `getElementsByClassName('fui-Link')[0]` | **breaks**                                    |
| `apps/vr-tests-react-components/src/stories/SpinButton/SpinButtonInteractions.stories.tsx` | 20–34                                  | `` `.${spinButtonClassNames.incrementButton}` `` ×3, `decrementButton` ×3                                                                                                       | breaks iff the export is deleted              |
| `apps/vr-tests-react-components/src/stories/Spinner.stories.tsx`                           | 13                                     | `` `& .${spinnerClassNames.spinner}` ``                                                                                                                                         | breaks iff the export is deleted              |
| `apps/rit-tests-v9/src/react-19/components/Tooltip.cy.tsx`                                 | 42                                     | ``cy.get(`.${tooltipClassNames.content}`)``                                                                                                                                     | breaks iff the export is deleted              |
| `packages/react-components/react-list/library/src/components/List/List.cy.tsx`             | 176                                    | `` `[data-test="list-item-${i}"] .fui-Checkbox__indicator > svg` ``                                                                                                             | **breaks** — cross-package sub-slot           |
| ”                                                                                          | 423, 435, 449, 450, 489, 507, 525, 526 | `cy.get('.fui-List')`                                                                                                                                                           | **breaks**                                    |
| `apps/vr-tests-react-components/src/stories/DataGrid/DataGridSubtle*.stories.tsx`          | 20, 22 (×2 files)                      | `.fui-DataGridHeader > .fui-DataGridRow`                                                                                                                                        | **out of scope** — react-table is unconverted |

### 1f. Jest snapshot blast radius

**67 snapshot files, 883 static-class token occurrences.** The split is the important part:

- **41 files / 158 tokens inside converted packages** — expected churn, regenerate with `-u`.
  Heaviest: `react-list/List` 31, `react-divider/Divider` 25, `react-checkbox/Checkbox` 23,
  `react-search/SearchBox` 9, `react-select/Select` 9, `react-toolbar` (7 files) 10,
  `react-card` (4 files) 10, `react-tree` (5 files) 9, `react-accordion` (4 files) 7.
- **26 files / 725 tokens inside UNCONVERTED packages** — these are dependents whose committed
  DOM contains a converted component. `packages/charts/react-charts` alone accounts for **695
  tokens across 16 snapshot files** (Legends 102, GaugeChart 92, AreaChart 88, LineChart 58,
  VerticalBarChart 56, DonutChart 45, HorizontalBarChartWithAxis 39, GanttChart 37,
  VerticalStackedBarChart 37, DeclarativeChartRTL 36, GroupedVerticalBarChart 30, HeatMapChart 30,
  VegaDeclarativeChart 23, HorizontalBarChart 11, SankeyChart 9, ScatterChart 2). Also
  `react-carousel` 14 (4 files), `react-datepicker-compat` 6, `react-teaching-popover` 5 (3 files),
  `react-table` 3, `react-migration-v0-v9` 2.

Plus **25 test files with inline `class="fui-…"` assertions** in converted packages that are hand
written, not `-u`-regenerable:
`react-breadcrumb/{Breadcrumb, BreadcrumbButton, BreadcrumbDivider, BreadcrumbItem}.test.tsx`,
`react-provider/{FluentProvider-hydrate, FluentProvider-node}.test.tsx`,
`react-text/Text.test.tsx` + 17 preset tests, `react-tooltip/Tooltip.test.tsx`.

`scripts/jest/src/css-modules/serializer.js` needs **no change**: it strips `fuicm-*` and
deliberately preserves `group/fui-*` (documented at its lines 5, 14). Post-removal a converted
snapshot reads `class="group/fui-divider"` after `fuicm-*` stripping — which is precisely the
public contract, and is why the serializer must keep its current behaviour.

### 1g. Unconverted packages selecting converted statics

Two real edges (everything else in unconverted packages targets their own statics):

1. `react-migration-v0-v9/…/Spinner/SpinnerMigration.mixins.ts:8` — Griffel mixin selecting
   `.fui-Label` (react-label, converted). Test at `SpinnerMigration.mixins.test.ts:23`.
2. `react-migration-v0-v9/…/List/{List,ListItem}/use*Styles.styles.ts:8,10` — declares
   `root: 'fui-List'` / `root: 'fui-ListItem'`, i.e. a **static-class-name collision** with
   react-list. These are that package's OWN statics (it is unconverted, so they stay), but they
   mean a `.fui-List` selector today matches two unrelated components. This is independent
   evidence for the D15.7 direction and must be called out when react-list's static disappears:
   any consumer whose `.fui-List` rule "still works" post-removal is matching the v0-v9 migration
   shim, not react-list.

The 725-token chart snapshot mass in §1f is the other, larger unconverted-package surface — but it
is passive (rendered DOM), not selectors.

---

## 2. Per-edge resolution spec

### 2.0 The three resolution mechanisms, and when each applies

| Mechanism                                        | Applies when                                                                                                                   | Cost                                          |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| **M1 — group marker** (`:global(.group\/fui-x)`) | the target is a **component root** rendered as a _child_ by the consumer, so the styling package never holds its slot object   | free; the marker already exists               |
| **M2 — JS slot-className composition**           | the target is a **sub-slot** of a component the styling package **renders itself** (it owns the slot object or the slot props) | one extra module class; no new public surface |
| **M3 — owning-package data attribute**           | M2 impossible: sub-slot of a component rendered as a consumer-supplied child                                                   | adds public DOM surface — **last resort**     |

M1 is a straight substitution for root-level selectors, because a root's marker is exactly as
addressable as its static was. M2 is preferred for every sub-slot: it converts a _public_ coupling
into a _private_ one and is the only mechanism that leaves zero global handle on component
internals, which is the whole point of D15.7. M3 is not used anywhere in this phase — every
sub-slot edge in the repo resolves to M2 (worked below).

**Structural pseudo-classes survive M1 unchanged.** `:first-of-type` / `:last-of-type` /
`:not([aria-hidden='true'])` are element-relative, not class-relative, so
`:global(:not([aria-hidden='true']).group\/fui-card-preview:first-of-type)` selects exactly what
`…​.fui-CardPreview:first-of-type` selected.

**Specificity is preserved by construction.** Both the static and the marker are single class
selectors, so every rewritten selector keeps its 0-_n_-0 score. The one place this matters
outside the layer system is BreadcrumbButton's unlayered rule (§2.4).

### 2.1 react-card — worked spec (the largest single edge)

Card is 14 of the 39 selector sites and mixes all three relationship kinds.

**Card.module.css — M1 throughout.** CardHeader / CardFooter / CardPreview are sibling
_components_ that a consumer composes as `children`; `useCardStyles_unstable` never sees their slot
objects, so M2 is structurally unavailable. Substitute marker for static:

```css
/* L790–791 */
& > :global(.group\/fui-card-header),
& > :global(.group\/fui-card-footer) { flex-shrink: 0; }

/* L802 / L827 */
& > :global(.group\/fui-card-preview) { … }

/* L818–819 */
& > :global(.group\/fui-card-header:last-of-type),
& > :global(.group\/fui-card-footer:last-of-type) { flex-grow: 1; }

/* the tabster-aware pair, unchanged in shape */
& > :global(:not([aria-hidden='true']).group\/fui-card-preview:first-of-type) { … }
```

**L838 — the mixed case.** `& > :global(.fui-Card__floatingAction + .fui-CardPreview)` compounds
Card's OWN sub-slot with a sibling component. The sub-slot half becomes a **local**, because
`useCardStyles.styles.ts:147–150` already writes `styles['floating-action']` onto that slot and
`Card.module.css:763` already declares `.floating-action`:

```css
& > :global(.group\/fui-card-preview) {
  .floating-action + & {
    margin-top: calc(var(--fui-Card--size) * -1);
  }
}
```

or, flattened, `& > .floating-action + :global(.group\/fui-card-preview)`. Either form keeps one
local + one global and stays 0-2-0 within the same layer. **This is the model for every
"own-sub-slot compounded with a foreign root" selector**: the own half goes local (hashed), the
foreign half goes marker.

**L858 — cross-package, M1.** `& :global(.fui-Text)` → `& :global(.group\/fui-text)`. Note this
also picks up every Text **preset** (`<Body1>`, `<Title2>`, …) because presets share
`group/fui-text` (§2.7) — which is the same set `.fui-Text` matched, since `useTextStyles_unstable`
runs for presets too. No behaviour change.

**L875–878, 891–892 — forced-colors, M1.** Straight substitution.

**CardFooter.module.css L87–88 and CardHeader.module.css L169–170 — cross-package, M1.**
`:global(.fui-Button)` → `:global(.group\/fui-button)`; `:global(.fui-Link)` →
`:global(.group\/fui-link)`. These target _consumer-supplied_ Button/Link children, so M2 is
impossible; M1 is correct and sufficient. Both rules already sit at `fui.components.l2`, so the
layer, not specificity, keeps them winning.

**`useCardPreview.ts:54` — runtime, M1.**

```ts
const img = previewRef.current.parentNode.querySelector<HTMLImageElement>(':scope > .group\\/fui-card-preview > img');
```

Two notes. (i) The double backslash is required — `/` must be CSS-escaped in a selector string.
(ii) `:scope` here is on `parentNode`, and this file runs in jsdom under test; combined with
D15.1 this is a _second_, independent reason the marker must not be `classList[0]`. The safer
rewrite, and the recommendation, is to drop the class query entirely and use the ref Card already
has: `previewRef.current.querySelector('img')` scoped to the preview element itself, if the
element identity permits — the sweep should read the surrounding 20 lines and prefer the ref form.

### 2.2 react-list → react-checkbox `indicator` — worked spec (**M2**)

`ListItem.module.css:139` styles `.checkmark :global(.fui-Checkbox__indicator)` — a sub-slot of
another package. The `indicator` element has, after removal, **no global handle whatsoever**: it
carries only Checkbox's hashed `fuicm-checkbox-indicator-…`. M1 cannot reach it (a group marker
lives on the Checkbox _root_, and `group-*` compiles to a descendant selector
`.child:is(:where(.group…) *)` — which would work, see below).

Two viable resolutions; **M2 is chosen**.

**M2 (chosen).** `useListItem.tsx:207–216` builds the checkmark slot itself via
`slot.optional(props.checkmark, { …, elementType: Checkbox })`. ListItem therefore controls the
props handed to `<Checkbox>` and can pass an `indicator` slot override:

```ts
// useListItemStyles.styles.ts
if (state.checkmark) {
  state.checkmark.className = clsx(styles.checkmark, state.checkmark.className);
  state.checkmark.indicator = slot.always(state.checkmark.indicator, {
    defaultProps: { className: styles['checkmark-indicator'] },
    elementType: 'div',
  });
}
```

```css
/* ListItem.module.css */
@layer fui.components.l2 {
  .checkmark-indicator {
    @apply mx-horizontal-xs my-vertical-xs;
  }
}
```

Why this and not the marker form: it removes the coupling instead of renaming it. The rule stops
depending on react-checkbox's internal DOM shape entirely, and the l2 altitude still beats
Checkbox's own l1 indicator rules. The one thing the implementer must get right is **merging**
rather than replacing a consumer-supplied `indicator` slot — hence `slot.always(...)` with
`defaultProps`, not a raw assignment. Add a regression test asserting that a consumer's
`checkmark={{ indicator: { className: 'x' } }}` keeps `x`.

**Rejected alternative (M1-via-group).** `& :global(.group\/fui-checkbox) .indicator-ish` does not
work, because there is no `.indicator-ish` — the indicator has no addressable class from
ListItem's module. A `group-*` variant authored _in Checkbox's_ module could style it, but that
inverts ownership: react-checkbox would carry a rule that only ListItem wants.

**`List.cy.tsx:176`** (`.fui-Checkbox__indicator > svg`) is the test-side twin of the same
coupling. It becomes `[data-test="list-item-N"] .group\\/fui-checkbox svg` — or better, a
`data-testid` on ListItem's own checkmark slot. Prefer the latter; a cypress selector reaching into
another package's internals is the same anti-pattern in a different file.

### 2.3 react-toolbar → react-button `icon` — worked spec (**M2**)

`ToolbarButton.module.css:79` styles `& :global(.fui-Button__icon)` inside a
`@variant vertical` block hanging off the root's `data-orientation`.

`useToolbarButtonStyles.styles.ts` renders react-button's own `<Button>` and **holds
`state.icon`** — the same slot object `useButtonStyles_unstable` will decorate a moment later. M2
is therefore trivial. The `vertical` state lives on the root, which already carries
`group/fui-toolbar-button`, so the icon rule reads it through a group variant:

```ts
// useToolbarButtonStyles.styles.ts, BEFORE the useButtonStyles_unstable(state) call
state.root.className = clsx(styles.root, 'group/fui-toolbar-button', state.root.className);
if (state.icon) {
  state.icon.className = clsx(styles.icon, state.icon.className);
}
useButtonStyles_unstable(state);
```

```css
/* ToolbarButton.module.css */
@layer fui.components.l2 {
  .root {
    @variant vertical {
      @apply flex-col;
    }
  }

  .icon {
    @variant group-vertical/fui-toolbar-button {
      font-size: calc(24px * var(--base-scale));
      margin-top: 0;
      margin-right: 0;
      margin-bottom: 0;
      margin-left: 0;
    }
  }
}
```

This is exactly the capability D15.1 was created for — a module styling an element from an
**ancestor** component's state — and it needs no catalog addition: `vertical` is
`&:where([data-orientation='vertical'])` (`react-tailwind-theme/css/variants.css:45`), the
canonical `&:where(…)` shape D15.5 requires for `group-*` composition. Altitude is unchanged
(`fui.components.l2` over Button's `l1`/`fui.base`), so the winner is decided exactly as the file
header documents today. `state.icon` is optional, hence the guard.

### 2.4 react-breadcrumb — worked spec (two distinct problems)

**(a) `BreadcrumbButton.module.css:224,234` — react-button `icon` sub-slot, M2.** Identical shape
to §2.3: `useBreadcrumbButtonStyles.styles.ts` calls `useButtonStyles_unstable` and holds
`state.icon` (see its L114–119, which today deliberately writes _no_ class to that slot). The two
rules are `@variant size-*`-scoped off the root, so they become
`@variant group-size-small/fui-breadcrumb-button` etc. on a new `.icon` local.

**(b) `BreadcrumbButton.module.css:342` — the specificity compound. This is the one place where
naive removal changes rendered pixels.** The rule is **unlayered** by design (the file header at
L320–341 explains why: it competes with react-button's own unlayered `fui-Icon-filled` /
`fui-Icon-regular` swaps, which `@layer` cannot arbitrate). `.root:global(.fui-BreadcrumbButton)`
scores 0-3-0 against Button's 0-2-0 — deliberately, to restore the winner Griffel's `mergeClasses`
argument order used to guarantee. Delete the static and it drops to 0-2-0: a **tie**, decided by
cross-stylesheet load order, i.e. undefined.

Resolution — compound with the marker instead, which the hook always writes:

```css
.root:global(.group\/fui-breadcrumb-button) { … }
```

Same 0-3-0. This is the general rule for the sweep: **a static used as a specificity boost on the
component's own root becomes the marker, never nothing.** Grep gate: `\.[a-z-]+:global\(\.fui-`
must return zero hits at the end of the phase.

### 2.5 react-tree — M1

`TreeItem.module.css:166–167` targets `> .fui-TreeItemLayout` / `> .fui-TreeItemPersonaLayout`.
Same package, but the layouts are _children_ the consumer composes, so M1:
`& > :global(.group\/fui-tree-item-layout)`, `& > :global(.group\/fui-tree-item-persona-layout)`.
Both markers exist (`useTreeItemLayoutStyles.styles.ts:86`,
`useTreeItemPersonaLayoutStyles.styles.ts:83`).

### 2.6 react-button and react-spinbutton — intra-component

**`Button.module.css` ×10 `:global(.fui-Button__icon)` — M2.** `useButtonStyles_unstable` owns
`state.icon` (it already writes `buttonClassNames.icon` + `styles.icon` there,
`useButtonStyles.styles.ts:103`). Every one of the ten rules is root-state-scoped
(`@variant size-*`, `@variant icon-only`, …), so they move onto `.icon` with
`@variant group-<state>/fui-button`. This is the largest mechanical sub-task in the phase and the
one most likely to produce VR diffs, because ten rules move from a descendant selector to a
group-scoped one; run it as its own commit.

**`SpinButton.module.css` ×4 `.fui-SpinButton__button_active` — becomes a data attribute.**
`spinButtonExtraClassNames.buttonActive` (`useSpinButtonStyles.styles.ts:36`, applied conditionally
at L114/L122) is **not exported** — grep of `src/index.ts`, `SpinButton/index.ts` and
`etc/react-spinbutton.api.md` returns only `spinButtonClassNames`. It is an internal, JS-driven
state marker that outlives `:active`, so it is not expressible natively and D15.6's "data
attributes as a fallback where native cannot reach" applies exactly. Convert to
`data-spin-active` on the increment/decrement button slots and select it with an existing-shape
`&:where([data-spin-active])`. It carries a `fui-` prefix today, and after this phase a `fui-`
prefixed class in rendered DOM should mean "public identity" — leaving an internal one behind
would be the only counterexample in the repo.

### 2.7 react-text presets — an accepted contract loss, flagged for the decision record

`createPreset.ts:47` composes `clsx(className /* 'fui-Body1' */, styles.root, state.root.className)`.
After removal it is `clsx(styles.root, state.root.className)` — lead token is the preset's own
hashed `fuicm-…`, so D15.1 is satisfied automatically, and the preset's l2 rules are unaffected.

But 17 identity classes disappear with no marker replacing them: presets share `group/fui-text`
(deliberately — `useTextStyles.styles.ts:66`: "a `<Body1>` IS a `<Text>`"). A consumer can no
longer distinguish `<Body1>` from `<Text>` by class. **Recommendation: accept the loss, do not mint
17 new markers.** Rationale: presets are a typography shorthand for `<Text font=… size=… weight=…>`,
they carry no state a descendant could need to read, and 17 extra global tokens in a flat namespace
buys nothing D15.1 says a marker is for. This must be stated explicitly in D16 because it is the
only place in the phase where public identity is _lost_ rather than _renamed_.

### 2.8 react-provider — the one retained static-shaped class

`fui-FluentProvider<n>` (runtime, `useId`-derived) is **not** a BEM static and stays. The bare
`fui-FluentProvider` static is removed from the rendered class string. `fluentProviderClassNames`
the **constant** is retained (§3) because it seeds both the `useId` prefix
(`useFluentProviderThemeStyleTag.ts:58`) and portal-compat's regex
(`PortalCompatProvider.tsx:10`).

Composition after removal — note the lead is `state.themeClassName`, not `styles.root`:

```ts
state.root.className = clsx(
  state.themeClassName, // `fui-FluentProvider<n>` — always present, selector-safe
  styles.root,
  'group/fui-fluent-provider',
  state.root.className,
);
```

D15.1 is satisfied by `themeClassName`. If a future change ever makes `themeClassName` optional,
`styles.root` must move to the front — record that as a comment at the call site.

### 2.9 The remaining consumers

| Site                                                                                                                                             | Resolution                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `react-migration-v0-v9/…/SpinnerMigration.mixins.ts:8`                                                                                           | ``[`& .${labelClassNames.root}`]`` → `'& .group\\/fui-label'`. The package is Griffel; a literal string key is fine. Update `SpinnerMigration.mixins.test.ts:23` to match. Do **not** re-point via the retained constant — the mixin should read the marker, which is the public contract now.                                                                                           |
| `apps/vr-tests-react-components/…/Link/utils.tsx` (9 sites)                                                                                      | `'.fui-Link'` → `'.group\\/fui-link'`; the two `getElementsByClassName('fui-Link')[0]` calls become `querySelector('.group\\/fui-link')`, since `getElementsByClassName` takes a token, not a selector, and `group/fui-link` **is** a valid single token — either form works, prefer `querySelector` for symmetry with the `.hover()` selectors.                                         |
| `apps/vr-tests-react-components/…/SpinButtonInteractions.stories.tsx` (6), `…/Spinner.stories.tsx` (1), `apps/rit-tests-v9/…/Tooltip.cy.tsx` (1) | Compile fine under the retained-constant policy (§3) but would then select nothing. Re-point to markers/`data-*`: SpinButton's increment/decrement need a handle — use the `data-spin-active`-adjacent attributes or add `data-testid`s. Tooltip's `content` is the marker-bearing slot (D15.1: Tooltip's marker rides `content`), so `cy.get('.group\\/fui-tooltip')` is a direct swap. |
| `react-list/…/List.cy.tsx` (9)                                                                                                                   | `.fui-List` → `.group\\/fui-list`; the indicator selector per §2.2.                                                                                                                                                                                                                                                                                                                      |
| `react-tree/…/Tree.cy.tsx:8`                                                                                                                     | `treeItemLayoutClassNames.root` → `'.group\\/fui-tree-item-layout'`.                                                                                                                                                                                                                                                                                                                     |
| `packages/charts` + 5 other unconverted packages, 26 snapshot files                                                                              | No selectors — passive DOM only. `jest -u` after the sweep; the diff is pure token removal. Coordinate as one commit per package so a chart reviewer sees only chart churn.                                                                                                                                                                                                              |

---

## 3. Export policy for the `*ClassNames` constants

Three options were considered against the 87 exported constants.

**(A) Delete the exports.** Cleanest signal; breaks `react-portal-compat` (which needs
`fluentProviderClassNames.root` as a regex seed) and `useFluentProviderThemeStyleTag` (which needs
it as a `useId` prefix); produces 87 removals in the api-extractor reports, i.e. an unambiguous
major-version API break for every converted package; gives external consumers a compile error with
no migration hint.

**(B) Deprecated stubs holding the old strings.** `@deprecated` JSDoc, values unchanged. Consumers
keep compiling _and_ keep silently selecting nothing — the worst failure mode available, because
the breakage moves from build time to visual regression in the consumer's app.

**(C) — RECOMMENDED — retain the exports, re-point `root` to the marker, and delete the sub-slot
keys.**

```ts
/**
 * Public identity classes for Button.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * (the Tailwind named-group marker, DECISIONS.md D15.1) — usable as a selector and as a
 * `group-*` variant target. Per-slot keys were removed in <release>; there is no public
 * class-name handle on component internals.
 */
export const buttonClassNames: { root: string } = {
  root: 'group/fui-button',
};
```

Why (C):

- **It keeps the two non-styling uses alive.** `fluentProviderClassNames.root` stays a valid
  `useId` seed and regex seed. Under (A) both need bespoke replacement constants invented for the
  occasion; under (C) they are untouched — with one caveat, below.
- **It converts a silent failure into a loud one where it matters.** Sub-slot keys _disappear_, so
  `buttonClassNames.icon` is a TypeScript error (`Property 'icon' does not exist`) at the exact
  line that would otherwise have silently stopped matching. That is the diagnostic (B) throws away.
- **The one key that survives keeps working.** A consumer's `.${buttonClassNames.root}` selector
  continues to select the right element, because the marker _is_ the root's identity class now.
  `document.querySelector('.' + buttonClassNames.root)` needs no escaping (it is a class-token
  concatenation into a selector — the `/` is not special in a class _token_, but it **is** in a
  _selector_, so this exact expression breaks; see the caveat).
- **The api.md diff is legible.** 87 constants stay; their **types** narrow from
  `SlotClassNames<XSlots>` to `{ root: string }`, which reads in review as "the slot surface was
  removed" rather than "87 exports vanished".

**Caveats the implementation must handle, both real:**

1. **Selector escaping.** `'.' + 'group/fui-button'` is an _invalid selector_. Any consumer (and
   the 4 in-repo VR/cypress call sites) doing `` `.${x.root}` `` needs `.group\\/fui-button`. Ship
   a companion helper next to the constants and use it everywhere in-repo:

   ```ts
   /** CSS.escape-equivalent for the marker token, usable in a selector string. */
   export const fuiSelector = (identityClass: string) => '.' + identityClass.replace('/', '\\/');
   ```

   Document it in the deprecation JSDoc; it is the difference between (C) working and (C) being a
   trap.

2. **TS consumer impact, precisely.** `SlotClassNames<S>` is `Record<keyof S, string>`
   (`react-utilities/src/compose/types.ts:257`). Narrowing to `{ root: string }` means: reads of
   `.root` compile unchanged; reads of any other key become a compile error; `Object.values(x)` and
   `Object.keys(x)` still compile but return one entry (a silent behaviour change — call it out in
   the changelog); anything typed `SlotClassNames<ButtonSlots>` explicitly stops assigning. That is
   the intended blast pattern: loud on internals, quiet on root.

**Version framing.** This is a breaking change under any option. (C) minimises the _number_ of
consumers who must act (root-selector users: zero code change beyond escaping) while guaranteeing
the ones who must act _find out at build time_.

**Conformance interaction.** `component-has-static-classnames-object` asserts the exact
`fui-<Component>` / `fui-<Component>__<slot>` format (`defaultTests.tsx:265–288`), so (C) fails it
just as (A) does. The test is deleted and replaced per §1b regardless of export policy — the two
decisions are independent.

---

## 4. Composition shape after removal, per slot type

The invariant to preserve, stated as the sweep will check it:

> **Every emitted class string whose tokens include a `group/…` or `peer/…` marker must have a
> non-marker, selector-safe token at index 0.**

### 4a. Styled root (marker + unconditional module class) — **59 sites**

Reorder only. Marker moves from argument 2 to argument 3.

```ts
// BEFORE
state.root.className = clsx(buttonClassNames.root, 'group/fui-button', styles.root, …, state.root.className);
// AFTER
state.root.className = clsx(styles.root, 'group/fui-button', appearance && styles[appearance], …, state.root.className);
```

`styles.root` is unconditional and `clsx` never drops it, so index 0 is always the hashed class.
Argument order carries no cascade meaning (D2: `@layer` decides every tie), so this is
semantically inert — the same reasoning D15.1's amendment already used to justify moving the
marker one slot right.

### 4b. Styled root with only CONDITIONAL module classes, or none — **6 sites (Class B)**

These are the slots D15.7 warned about: _"If a slot would genuinely emit the marker alone, that
slot needs a leading selector-safe token added before the sweep lands, not after."_

| Site                                                                        | Current args (after the static)                                                               | Why unsafe                                                                |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `react-accordion/…/Accordion/useAccordionStyles.styles.ts:28`               | marker, `state.root.className`                                                                | no module class at all (file is still Griffel)                            |
| `react-accordion/…/AccordionItem/useAccordionItemStyles.styles.ts:29`       | marker, `state.root.className`                                                                | same                                                                      |
| `react-breadcrumb/…/Breadcrumb/useBreadcrumbStyles.styles.ts:47`            | marker, `state.root.className`                                                                | root has no styles by design (see its L44–46)                             |
| `react-message-bar/…/MessageBarGroup/useMessageBarGroupStyles.styles.ts:31` | marker, `state.root.className`                                                                | no module class (still Griffel)                                           |
| `react-badge/…/CounterBadge/useCounterBadgeStyles.styles.ts:54`             | marker, `state.dot && styles.dot`, `!children && !dot && styles.hide`, `state.root.className` | **both** module classes are conditional; the default render emits neither |
| `react-skeleton/…/Skeleton/useSkeletonStyles.styles.ts:50`                  | marker, `state.root.as === 'span' && styles['block-styling']`, `state.root.className`         | conditional; `as` defaults to `div`                                       |

**Resolution: mint an empty `.root {}` local in the module and place it first.** Not a sentinel
string, not a reordering trick:

```css
/* Breadcrumb.module.css */
@layer fui.components.l1 {
  /* Identity-only local. Breadcrumb's root has no declarations of its own; this class exists
     so the root always emits a selector-safe leading token ahead of the group marker
     (DECISIONS.md D15.1 / D16). Do not delete because it looks empty. */
  .root {
  }
}
```

```ts
state.root.className = clsx(styles.root, 'group/fui-breadcrumb', state.root.className);
```

Why an empty local rather than the alternatives:

- **It is uniform.** All 65 marker sites then read `clsx(styles.root, 'group/fui-x', …)`, one
  shape, greppable, and the codemod for the other 59 applies unchanged.
- **It costs one class token and zero CSS rules.** `postcss-modules` emits the name into the class
  map even with an empty body; the compiled stylesheet gains nothing (an empty rule is dropped by
  the minifier, and the class map is what the JS reads).
- **It is future-proof.** The moment any of these six roots gains a declaration, the local is
  already there.
- Rejected: reusing `state.root.className` as the lead (it is the _consumer's_ class and may be
  absent); rejected: emitting a second literal like `'fui-identity'` (a new global token, i.e. the
  thing this phase removes); rejected: making the marker safe by renaming it (breaks D15.8's public
  snapshot contract, and was already rejected in D15.1).

**Guardrail.** Add an assertion to the existing
`tools/workspace-plugin/src/executors/build/lib/css-modules.spec.ts` harness — it already compiles
a real module through the real chain — plus the runtime conformance assertion in §1b. Two layers,
because the failure is a jsdom-only throw and will not show up in VR.

Note four of the six (Accordion, AccordionItem, MessageBarGroup, and — via `mergeClasses` —
several others) live in files that are **still Griffel**. Those must gain a `.module.css` first, so
they either convert as part of this phase or the empty-local trick is spelled with a Griffel
`makeStyles({ root: {} })` class. Prefer the former; see §5.

### 4c. Styled sub-slot (static + module class) — **73 sites**

Drop the static; nothing else changes. Sub-slots carry no marker, so D15.1 is not in play and the
hashed class becomes index 0.

```ts
state.icon.className = clsx(styles.icon, state.icon.className);
```

Four of these have only **conditional** module classes and so may emit the consumer class alone —
harmless (no marker present), but the sweep should not "fix" them:
`react-avatar/…/AvatarGroupItem:90` (`state.avatar`), `react-persona/…/Persona:{138,157,166}`.

### 4d. Unstyled slot (static was the ONLY library token) — **6 sites**

| Site                                                                                                | Current                                                                    |
| --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `react-badge/…/CounterBadge/useCounterBadgeStyles.styles.ts:64`                                     | `clsx(counterBadgeClassNames.icon, state.icon.className)`                  |
| `react-divider/…/Divider/useDividerStyles.styles.ts:75`                                             | `clsx(dividerClassNames.wrapper, state.wrapper.className)`                 |
| `react-search/…/SearchBox/useSearchBoxStyles.styles.ts:117`                                         | `clsx(searchBoxClassNames.contentBefore, state.contentBefore.className)`   |
| `react-tree/…/TreeItemPersonaLayout/useTreeItemPersonaLayoutStyles.styles.ts:131`                   | `clsx(treeItemPersonaLayoutClassNames.selector, state.selector.className)` |
| `react-button/…/MenuButton/useMenuButtonStyles.styles.ts:114` (`state.root`), `:123` (`state.icon`) | static + conditional-only Griffel classes                                  |

**Rule: delete the assignment entirely** (and the enclosing `if (state.x)` when it becomes empty).
The remaining expression is `clsx(state.x.className)`, which is an identity on the consumer's own
string; keeping it is dead code that implies the hook styles a slot it does not. MenuButton's two
are conditional rather than empty — keep those, just drop the static.

This is also the answer to _"what happens on slots that have a marker but no module class"_ in its
degenerate form: **no slot may end up emitting a marker as its only token, and no slot may keep an
assignment that emits nothing.** §4b covers the first; §4d the second.

### 4e. Summary table

| Slot type                                   | Count | Leading token after removal | Action                                                                                                |
| ------------------------------------------- | ----- | --------------------------- | ----------------------------------------------------------------------------------------------------- |
| Root, marker + unconditional `styles.*`     | 59    | `fuicm-…`                   | reorder marker to position 2                                                                          |
| Root, marker, no unconditional module class | 6     | _(none today)_              | **add empty `.root {}` local**, then reorder                                                          |
| Sub-slot, static + module class             | 73    | `fuicm-…`                   | drop static                                                                                           |
| Sub-slot, static + conditional module class | 4     | consumer class or none      | drop static                                                                                           |
| Sub-slot, static only                       | 6     | —                           | **delete the assignment**                                                                             |
| Already static-free                         | 6     | `fuicm-…` / n-a             | none (`react-toolbar` ×4, `react-breadcrumb/BreadcrumbButton icon`, `react-search/SearchBox dismiss`) |
| Text presets via `createPreset`             | 17    | preset `fuicm-…`            | drop `className` argument, delete the 17 constants                                                    |

---

## 5. Per-package worklist

Sizing key: **S** ≤ 1 h, **M** ≤ 3 h, **L** ≤ 6 h, **XL** > 6 h (includes VR re-baseline risk).
"Statics" = distinct class strings owned. "Griffel" = style hooks still importing
`@griffel/react`, which must gain a module before §4b applies.

### 5a. Converted packages (34)

| Package              | Statics       | ClassNames exports | Marker sites (A/B) | Griffel hooks                     | Cross-pkg edges                    | Snapshot files | Size   | Notes                                                                                                     |
| -------------------- | ------------- | ------------------ | ------------------ | --------------------------------- | ---------------------------------- | -------------- | ------ | --------------------------------------------------------------------------------------------------------- |
| react-card           | 12            | 4                  | 4 / 0              | 0                                 | 14 selectors (§2.1) + 1 runtime    | 4              | **XL** | largest CSS edge; `useCardPreview.ts` runtime query                                                       |
| react-button         | 14            | 5                  | 1 / 0              | 4 (Compound, Menu, Split, Toggle) | 10 own-icon selectors (§2.6)       | 0              | **XL** | 4 unconverted hooks; 10 rules move to `group-*`                                                           |
| react-toolbar        | 2             | 2                  | 4 / 0              | 2 (RadioButton, ToggleButton)     | 1 (§2.3)                           | 7              | **L**  | 6 tests already disable the static test                                                                   |
| react-tree           | 19            | 5                  | 5 / 0              | 0                                 | 2 (§2.5)                           | 5              | **L**  | 19 statics is the largest sub-slot set                                                                    |
| react-tags           | 14            | 5                  | 5 / 0              | 0                                 | 0                                  | 0              | **L**  | pure mechanical, high volume                                                                              |
| react-avatar         | 14            | 4                  | 3 / 0              | 1 (AvatarGroupPopover)            | 0                                  | 0              | **L**  | popover hook still Griffel                                                                                |
| react-breadcrumb     | 6             | 4                  | 3 / **1**          | 0                                 | 3 (§2.4) + 4 inline-snapshot tests | 0              | **L**  | **unlayered specificity compound** — pixel risk                                                           |
| react-list           | 3             | 2                  | 2 / 0              | 0                                 | 1 (§2.2) + 9 cypress               | 2              | **L**  | the M2 reference case; `List.cy.tsx`                                                                      |
| react-text           | 3 + 17 preset | 18                 | 1 / 0              | 0                                 | 0                                  | 0              | **L**  | 18 exports, 18 inline-snapshot tests, §2.7 decision                                                       |
| react-message-bar    | 8             | 5                  | 4 / **1**          | 1 (MessageBarGroup)               | 0                                  | 5              | **M**  | Class B + Griffel in the same hook                                                                        |
| react-accordion      | 7             | 4                  | 2 / **2**          | 2 (Accordion, AccordionItem)      | 0                                  | 4              | **M**  | both Class B sites are Griffel                                                                            |
| react-badge          | 6             | 3                  | 2 / **1**          | 0                                 | 0                                  | 3              | **M**  | CounterBadge Class B + unstyled `icon` slot                                                               |
| react-search         | 5             | 1                  | 1 / 0              | 0                                 | 0                                  | 1              | **M**  | unstyled `contentBefore`; VR story selectors                                                              |
| react-persona        | 7             | 1                  | 1 / 0              | 0                                 | 0                                  | 0              | **M**  | 3 conditional-only sub-slots                                                                              |
| react-infolabel      | 6             | 2                  | 2 / 0              | 1 (InfoButton)                    | 0                                  | 0              | **M**  |                                                                                                           |
| react-spinbutton     | 5             | 1                  | 1 / 0              | 0                                 | 4 own (§2.6)                       | 0              | **M**  | internal state class → `data-spin-active`; VR story                                                       |
| react-provider       | 1             | 1                  | 1 / 0              | 0                                 | 2 runtime consumers                | 1              | **M**  | §2.8; 2 inline-snapshot tests                                                                             |
| react-rating         | 9             | 3                  | 3 / 0              | 0                                 | 0                                  | 0              | **M**  |                                                                                                           |
| react-skeleton       | 2             | 2                  | 1 / **1**          | 0                                 | 0                                  | 2              | **S**  | Skeleton Class B                                                                                          |
| react-checkbox       | 4             | 1                  | 1 / 0              | 0                                 | 0 (target of §2.2)                 | 1              | **S**  |                                                                                                           |
| react-divider        | 2             | 1                  | 1 / 0              | 0                                 | 0                                  | 1              | **S**  | unstyled `wrapper` slot                                                                                   |
| react-input          | 4             | 1                  | 1 / 0              | 0                                 | 0                                  | 1              | **S**  |                                                                                                           |
| react-label          | 2             | 1                  | 1 / 0              | 0                                 | 0 (target of migration-v0-v9)      | 1              | **S**  |                                                                                                           |
| react-link           | 1             | 1                  | 1 / 0              | 0                                 | 0 (target of Card)                 | 1              | **S**  | 9 VR selectors in `Link/utils.tsx`                                                                        |
| react-select         | 3             | 1                  | 1 / 0              | 0                                 | 0                                  | 1              | **S**  |                                                                                                           |
| react-switch         | 4             | 1                  | 1 / 0              | 0                                 | 0                                  | 0              | **S**  |                                                                                                           |
| react-radio          | 5             | 2                  | 1 / 0              | 0                                 | 0                                  | 0              | **S**  |                                                                                                           |
| react-field          | 5             | 1                  | 1 / 0              | 0                                 | 0                                  | 0              | **S**  | declares its statics with **backticks**, not single quotes — any codemod keyed on `'fui-` misses all five |
| react-image          | 1             | 1                  | 1 / 0              | 0                                 | 0                                  | 1              | **S**  |                                                                                                           |
| react-progress       | 2             | 1                  | 1 / 0              | 0                                 | 0                                  | 0              | **S**  |                                                                                                           |
| react-spinner        | 4             | 1                  | 1 / 0              | 0                                 | 0                                  | 0              | **S**  | VR story uses `spinnerClassNames`                                                                         |
| react-textarea       | 2             | 1                  | 1 / 0              | 0                                 | 0                                  | 1              | **S**  |                                                                                                           |
| react-tooltip        | 1             | 1                  | 1 / 0              | 0                                 | 0                                  | 0              | **S**  | marker rides `content`; rit-tests cypress selector                                                        |
| react-tailwind-theme | 0             | 0                  | 0                  | 0                                 | 0                                  | 0              | **S**  | only if §2.6 needs a variant (it does not)                                                                |

Totals: **XL 2, L 7, M 9, S 16.**

### 5b. Affected dependents and shared infrastructure

| Target                                                  | Work                                                                                                                                                                                                                                       | Size                              |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- |
| `packages/react-conformance`                            | delete `component-has-static-classnames-object`; add `component-has-group-marker` (2 assertions) + `hasStaticClassNames` opt-in export; update `classNameOverridesWin.tsx:131` / `.test.tsx:41` example strings; regenerate its own api.md | **L**                             |
| `packages/charts/react-charts`                          | `jest -u` only — 16 snapshot files, 695 tokens, zero selectors                                                                                                                                                                             | **M** (review volume, not effort) |
| `packages/react-components/react-carousel`              | `jest -u`, 4 files / 14 tokens                                                                                                                                                                                                             | **S**                             |
| `packages/react-components/react-table`                 | `jest -u`, 1 file / 3 tokens                                                                                                                                                                                                               | **S**                             |
| `packages/react-components/react-teaching-popover`      | `jest -u`, 3 files / 5 tokens                                                                                                                                                                                                              | **S**                             |
| `packages/react-components/react-datepicker-compat`     | `jest -u`, 1 file / 6 tokens                                                                                                                                                                                                               | **S**                             |
| `packages/react-components/react-migration-v0-v9`       | mixin selector + its test (§2.9); `jest -u` 2 files; document the `fui-List` / `fui-ListItem` collision (§1g.2)                                                                                                                            | **M**                             |
| `packages/react-components/react-portal-compat`         | verify only — regex is seed-driven and the seed is retained; add a comment pinning the `\w+`-suffix reasoning; its 8 snapshot strings are runtime theme classes, unaffected                                                                | **S**                             |
| `packages/react-components/react-components` (umbrella) | re-export surface follows §3 automatically; regenerate api.md ×2                                                                                                                                                                           | **S**                             |
| `apps/vr-tests-react-components`                        | `Link/utils.tsx` (9), `SpinButtonInteractions.stories.tsx` (6), `Spinner.stories.tsx` (1)                                                                                                                                                  | **M**                             |
| `apps/rit-tests-v9`                                     | `Tooltip.cy.tsx:42`                                                                                                                                                                                                                        | **S**                             |
| `migration/griffel-to-tailwind/CONVERSION_GUIDE.md`     | §3b rewrite + new §3d (§6b below)                                                                                                                                                                                                          | **M**                             |
| Full-repo `jest -u` + VR 34/34 re-baseline              | the marker becomes visible where a static used to lead; snapshots change but **VR must stay pixel-identical**                                                                                                                              | **L**                             |

### 5c. Recommended ordering

1. **Infrastructure first, behind no flag:** react-conformance (§1b) and the `fuiSelector` helper
   (§3). Nothing else can land green without them.
2. **Class B pre-work (6 sites, §4b)** — mint the empty `.root {}` locals and reorder markers
   **while the statics are still present**. This is pixel-inert, independently reviewable, and
   makes every subsequent package a pure deletion. Convert the 4 blocking Griffel hooks
   (Accordion, AccordionItem, MessageBarGroup, plus whichever of react-button's four you need)
   here, not later.
3. **The 16 S packages** — mechanical, batchable ~4 at a time.
4. **The 9 M packages.**
5. **react-breadcrumb** on its own (unlayered specificity, §2.4b) with a dedicated VR run.
6. **react-list, react-toolbar** (the two M2 reference cases, §2.2/§2.3) — land these before the
   XLs so the pattern is proven.
7. **react-card, react-button** (XL).
8. **react-text** (§2.7 needs the D16 clause landed first).
9. **Dependents + repo-wide `-u` + VR re-baseline**, single commit per dependent package.

---

## 6. Draft decision-record text

### 6a. Draft D16 (for `reports/DECISIONS.md`, to be appended after D15)

> ## D16 — BEM statics removed; the group marker is the sole public identity class
>
> Executes the end-state contract recorded in D15.7. Inventory and per-edge specs:
> `reports/statics-removal-design.md`.
>
> ### D16.1 — What is removed
>
> All 184 `fui-X` / `fui-X__slot` strings owned by the 34 converted packages stop being rendered.
> The public styling contract is: **per-slot `className` props** (typed overrides) +
> **`group/fui-<component-kebab>` as the sole public identity class** + **`data-*` state variants**
>
> - **the `@layer fui.*` system**. There is no public class-name handle on component internals.
>
> **One exception, and it is not a BEM static.** `react-provider` keeps rendering
> `fui-FluentProvider<useId>` — the runtime class hosting the 459 `--token` custom properties. The
> bare `fui-FluentProvider` static is removed; the runtime theme class is not a slot class and is
> load-bearing for `react-portal-compat`'s v8 interop.
>
> ### D16.2 — The D15.1 invariant, restated as the sweep's acceptance criterion
>
> > **Every emitted class string containing a `group/…` or `peer/…` token must have a non-marker,
> > selector-safe token at index 0.**
>
> Before this phase the static class satisfied it incidentally. It is now satisfied **explicitly**
> by the hashed CSS-Modules class, which is always present and always selector-safe. All 65
> marker-bearing `clsx()` calls read:
>
> ```ts
> clsx(styles.root, 'group/fui-<kebab>', …conditional module classes…, state.root.className)
> ```
>
> **Six roots had no unconditional module class** and could not satisfy this by reordering alone —
> Accordion, AccordionItem, Breadcrumb, MessageBarGroup, CounterBadge, Skeleton. Each receives an
> **empty identity-only `.root {}` local** in its module, added _before_ the statics were removed.
> The rule for all future work: a slot that would emit the marker alone gets a leading
> selector-safe token added first; the marker is never promoted to `classList[0]` on the grounds
> that it is now the only identity class. Enforced twice — by
> `component-has-group-marker` in `react-conformance` (asserts
> `classList[0]` does not match `/^(group|peer)\//`, on all 83 call sites) and by the compile-time
> assertion in `tools/workspace-plugin/…/css-modules.spec.ts`. Both are required, because the
> failure is a jsdom-only render-time throw that VR cannot see.
>
> ### D16.3 — Cross-package styling: markers for roots, JS slot composition for sub-slots
>
> A rule in package A that styles an element owned by package B resolves one of two ways, and the
> choice is determined by whether A holds B's slot object:
>
> - **Root of a component A does not render** (a consumer-composed child) → select
>   `:global(.group\/fui-<b>)`. Structural pseudo-classes and `:not()` compose unchanged, and
>   specificity is preserved (class-for-class).
> - **Sub-slot of a component A renders itself** → **compose the class in JS through the wrapping
>   hook**, then read the owner's state via a `group-*` variant. This removes the coupling rather
>   than renaming it: no global handle on B's internals survives.
>
> Worked cases: `react-toolbar` ToolbarButton passes its own `icon` class into Button's slot and
> styles it with `@variant group-vertical/fui-toolbar-button`; `react-breadcrumb` BreadcrumbButton
> does the same for Button's icon; `react-list` ListItem passes an `indicator` slot override into
> the Checkbox it constructs in `useListItem.tsx`. **No package gained a `data-*` attribute to
> expose a sub-slot.** That mechanism is documented as available and was not needed.
>
> `react-spinbutton`'s internal `fui-SpinButton__button_active` — never exported — becomes
> `data-spin-active`, so that after this phase a `fui-`-prefixed class in rendered DOM means
> "public identity" without exception.
>
> ### D16.4 — Specificity compounds must become marker compounds
>
> `BreadcrumbButton.module.css` compounds its own static onto its module class
> (`.root:global(.fui-BreadcrumbButton)`) inside an **unlayered** rule, to win a 0-2-0 tie against
> react-button's unlayered icon-swap rules that `@layer` cannot arbitrate. Deleting the static
> silently drops it to a tie decided by stylesheet load order. It compounds the **marker** instead
> (`.root:global(.group\/fui-breadcrumb-button)`), same 0-3-0. Gate: `\.[a-z-]+:global\(\.fui-`
> must have zero hits.
>
> ### D16.5 — Export policy: constants retained, `root` re-pointed, slot keys removed
>
> The 87 `*ClassNames` exports are **kept**, their type narrowed from `SlotClassNames<XSlots>` to
> `{ root: string }`, and `root` re-pointed to the group marker.
>
> Deleting them was rejected because `fluentProviderClassNames.root` has two non-styling roles —
> the `useId` prefix that mints the theme class
> (`useFluentProviderThemeStyleTag.ts:58`) and the seed of `react-portal-compat`'s extraction regex
> (`PortalCompatProvider.tsx:10`). Deprecated stubs holding the _old strings_ were rejected as the
> worst option available: consumers keep compiling and silently select nothing, moving the breakage
> from build time into their visual regressions.
>
> Removing the slot keys is what makes the policy honest: `buttonClassNames.icon` becomes a
> TypeScript error on the exact line that would otherwise have gone quiet. `buttonClassNames.root`
> keeps selecting the right element.
>
> **Escaping is part of the contract.** `'.' + 'group/fui-button'` is an invalid _selector_ (the
> token itself is fine). Packages export `fuiSelector(identityClass)` alongside the constants and
> every in-repo selector site uses it. Consumers doing `` `.${x.root}` `` must adopt it — this is
> the one migration step the type system cannot force, so it leads the changelog entry.
>
> ### D16.6 — Conformance
>
> `component-has-static-classnames-object` is **deleted** from the default set, not disabled: its
> three sub-tests hard-code the `fui-<Component>__<slot>` format
> (`defaultTests.tsx:244–245, 265–288`) and would fail under any policy. It is re-exported as an
> opt-in `extraTests` entry, `hasStaticClassNames`, which the 19 `needs-conversion` and 11
> `special` packages take, so their coverage is preserved rather than dropped.
> `component-has-group-marker` replaces it for converted packages.
>
> `component-handles-classname` and `component-preserves-default-classname` are unaffected and get
> stronger — the defaults they protect are now `fuicm-…` + the marker.
>
> ### D16.7 — Text presets: an accepted loss of public identity
>
> The 17 typography presets share `group/fui-text` (a `<Body1>` IS a `<Text>`), so removing
> `fui-Body1` … `fui-Title3` leaves them with **no** public identity class. Accepted, deliberately:
> presets are a shorthand for `<Text font size weight>`, they hold no state a descendant could read,
> and 17 new tokens in Tailwind's flat global group namespace would buy nothing D15.1 says a marker
> is for. This is the only place in the phase where public identity is lost rather than renamed,
> and it is recorded here so it is never mistaken for an oversight.
>
> ### D16.8 — Snapshots and VR
>
> 67 snapshot files change (883 tokens): 41 inside converted packages, 26 inside dependents —
> `packages/charts/react-charts` alone is 16 files / 695 tokens, all passive rendered DOM with no
> selectors. 25 further test files carry hand-written inline `class="fui-…"` assertions and are not
> `-u`-regenerable (react-text 18, react-breadcrumb 4, react-provider 2, react-tooltip 1).
>
> `scripts/jest/src/css-modules/serializer.js` is **unchanged**: it strips `fuicm-*` and preserves
> `group/fui-*` by design (D15.8). A converted snapshot after this phase reads
> `class="group/fui-divider"` — the public contract, exactly.
>
> **VR stays 34/34 at zero tolerance. Every rewritten selector is class-for-class and
> layer-for-layer identical, so any pixel diff is a bug, not a baseline** — with one named
> exception to watch: react-button's ten icon rules move from a descendant selector to a
> `group-*`-scoped one (D16.3), which is the only structural selector change in the phase.

### 6b. Cookbook amendments (`migration/griffel-to-tailwind/CONVERSION_GUIDE.md`)

**§3b "Named groups (DECISIONS D15)", L261–361 — rewrite the canonical snippet.** Every example
currently shows `clsx(xClassNames.root, 'group/fui-x', styles.root, …)`. Replace with:

```ts
state.root.className = clsx(
  styles.root,            // ALWAYS first — hashed, unconditional, selector-safe (D16.2)
  'group/fui-<kebab>',    // marker — never index 0
  …conditional module classes…,
  state.root.className,   // consumer override — always last
);
```

Add the failure note: _"If the root has no unconditional `styles._`, add an empty
`.root {}` local to the module before writing this call. Do not lead with the marker."\*

**§3c — no change** (casing rules are unaffected).

**New §3d "Styling another package's element".** The M1/M2/M3 decision table from §2.0 above, the
ToolbarButton `group-*` worked example from §2.3, the ListItem `slot.always(...)` worked example
from §2.2, and the flat rule: _root → marker; sub-slot → JS slot composition; data attribute only
when the wrapping component does not render the slot (no case in-repo)._

**§1 "Read and map the Griffel styles", L17–49 — add a step.** _"Record every
``[`& .${xClassNames.slot}`]`` selector in the source. Under D16 these do not survive as
selectors: root-targeting ones become group markers, sub-slot ones become JS slot composition.
Decide which before authoring the module."_

**§428 "Known special cases" — add three entries:** a root with no unconditional module class
(§4b); a slot whose only library token is the static (delete the assignment, §4d); an **unlayered**
rule that compounds the static for specificity (compound the marker, §2.4b).

**§443 "Definition of done" — add four gates:**

1. `grep -rnE "['\"\`]fui-" src/`returns nothing outside a retained identity constant. **Match all
three quote characters** —`react-field` declares its five statics with backticks
(`useFieldStyles.styles.ts:22–28`), and a single-quote-only scan reports it as having none.
2. `grep -rn ":global(\.fui-" src/` returns nothing (excluding `fui-Icon-*`, owned by
   `@fluentui/react-icons`).
3. `grep -rEn "\.[a-z-]+:global\(\.fui-" src/` returns nothing.
4. Every marker-bearing `clsx()` has an unconditional `styles.*` as its first argument.

---

## 7. Residual risks

| Risk                                                            | Where                                                | Mitigation                                                                                                  |
| --------------------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Marker reaches `classList[0]` on a slot missed by the census    | any future slot, not just the 6 found                | conformance assertion on `classList[0]` (§1b) runs on all 83 call sites, including packages converted later |
| `useCardPreview.ts` query silently returns `null`               | react-card runtime                                   | §2.1; add a test that asserts the `img` is found before touching the selector                               |
| BreadcrumbButton icon swap becomes load-order dependent         | unlayered rule, §2.4b                                | marker compound restores 0-3-0; verify with a VR run that loads the two stylesheets in both orders          |
| `` `.${x.root}` `` in consumer code becomes an invalid selector | external consumers, 4 in-repo sites                  | `fuiSelector` helper + changelog lead (§3)                                                                  |
| `Object.keys(buttonClassNames)` silently returns 1 entry        | external consumers                                   | changelog; the type narrows so most call sites error first                                                  |
| react-button's 10 icon rules change selector _shape_            | react-button, §2.6                                   | the only structural change in the phase — isolate as its own commit with a dedicated VR run                 |
| Consumers whose `.fui-List` rule "still works"                  | react-list vs react-migration-v0-v9 collision, §1g.2 | call out in the changelog: post-removal `.fui-List` matches the v0-v9 shim only                             |
