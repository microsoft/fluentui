# Named groups — design

_Written 2026-07-28. Every claim below is either a citation to a read file (path:line) or the
output of a probe run against this repo's installed toolchain (tailwindcss 4.3.3,
`@tailwindcss/postcss` 4.3.3, `postcss-modules`). Probe scripts: `.scratch/group-probe.js`,
`.scratch/global-fix-probe.js`, `.scratch/fc-probe.js`._

**Why this exists (user, verbatim):**

> "I want you to implement the named groups on all components. It's not just about flatter
> styling structure. It also makes it so that a component that is a child of another component
> can style itself based on the state of that parent, which is a huge feature when dealing with
> CSS modules and class names that are hashed."

That second sentence is the requirement. A CSS-Modules class is hashed
(`fuicm-Switch-module__indicator--ivKK`), so it is unaddressable from any _other_ module. A
named group is an **unhashed, global marker** that any module in any package can select
through. Flatter authoring is a side effect; cross-component state reading is the feature.

**Perf is settled and is not a motivation.** `metrics/perf-eval/variants/SUMMARY.md` §1 measured
the `named-group` leg at 11.585 ms against the control's 11.605 ms (−0.2%, inside a 0.63 ms IQR).
§7: "The expectation that it would not perform better than the current solution is **confirmed**."
It also recalculated 12,000 elements vs. 11,000 for every other leg, because moving state onto the
root widens invalidation. Named groups buy a **capability**, at a small measured invalidation cost.

---

## 1. What nyt-games actually does

### 1.1 The marker

A literal, unhashed string, always the **first** `clsx` argument, on the component's **root**
element — the same element that carries the hashed root class and the `data-*` state attributes.

```tsx
// src/components/button/index.tsx:25-33
className={clsx(
  'group/button',
  styles.button,
  styles[color],
  styles[shape],
  styles[variant],
  className,
)}
data-size={size}
```

Identical shape at `src/components/card/index.tsx:25` (`'group/card'`),
`src/components/badge/index.tsx:25` (`'group/badge'`), `src/components/link/index.tsx:27`
(`'group/link'`).

### 1.2 How the name is chosen

**The group name is the component's own name, lowercase, as the codebase spells it.** Verified
exhaustively — `reports/nyt-games-conventions.md` §8d records the complete census:

```
group/badge   group/button   group/card   group/link         ← src/components/<name>/
group/disclosure  group/field  group/word  group/letter      ← app-level components
```

Three further facts from that census, each load-bearing:

- **Every group is named. There is no bare `group` anywhere in the repo.** Verified independently:
  a grep for `group` in `src/**/*.tsx` excluding `group/` and RAC's `*Group` components returns
  zero hits.
- **No namespace prefix.** nyt-games is an application, so `group/button` cannot collide with
  anyone. (§2.1 below is where this stops being true for us.)
- **Not every component gets one.** `Icon` has no group (`icon/index.tsx:25` is
  `clsx(styles.icon, className)`) — it has no state and nothing nests inside it.

Groups nest by component hierarchy, three deep, each level named for its own element:
`group/field` → `group/word` → `group/letter`
(`src/app/(games)/lexekin/_components/word/control.tsx:146,148,159`).

### 1.3 How a child reads the parent

Always the block form `@variant group-<variant>/<name> { … }` inside the child's own
`.module.css`. Never a class prefix in JSX.

The cross-**component** case — the one the user is asking for — is
`src/app/_components/sidenav/sidenav.module.css:259-311`. `.bar` is Sidenav's own element; the
group belongs to `@/components/button`, a different module in a different directory:

```css
/* sidenav.module.css:285-311 — .bar styles itself from Button's state */
@variant group-hover/button {
  @apply flood-quaternary-inverse;
}

@variant group-pressed/button {
  @variant first { translate: -50% -50%; rotate: 45deg; … }
  @variant nth-2 { opacity: 0; … }
  @variant last  { translate: -50% -50%; rotate: -45deg; … }
}
```

Without the group marker this is unwritable: `button.module.css`'s `.button` is hashed and
`sidenav.module.css` cannot name it.

### 1.4 Mirroring — state put on the group element _for the children_

`game-card.module.css:11-57` styles `.media` off twelve `group-game-*/card` variants. The
`data-game` attribute that drives them is written by the **consumer**, onto `<Card>`, which is
where `group/card` lives (`game-card/index.tsx:34` → `card/index.tsx:25` spreads `...rest`).
`.card` itself never reads `data-game`. The attribute is on the group element **solely so
descendants can read it**.

Same at `sidenav/games.tsx:53-55, 79-81`: `className={clsx('group/disclosure', styles.disclosure)}`
plus `data-game={game.id}`, consumed only by `.disclosureHeading`
(`sidenav.module.css:44-210`).

**This is the precedent for §3.** State is hoisted to the group element when a child needs it,
even when the group element has no use for it.

### 1.5 Coexistence with CSS-Modules hashing

`reports/nyt-games-conventions.md` §8d, last paragraph, and §1's PostCSS section:

> Since `group/x` is a literal string in JSX and the accelint PostCSS plugin `:global()`-wraps
> the compiled selector, the two sides match across the CSS-Modules hashing boundary. **This
> plugin is mandatory for the pattern to work at all.**

nyt-games runs `@accelint/postcss-tailwind-css-modules@1.1.0` after `@tailwindcss/postcss`.
Its job is exactly this: find `group/…` / `peer/…` in generated selectors inside `*.module.css`
and wrap them in `:global(…)`.

**We do not have this plugin, and we have no `postcss.config.*` at all.** §2.4 is the fix.

---

## 2. The Fluent dialect

### 2.1 Group name: `group/fui-<ComponentName>`

**Rule: the group name is the component's root static class, verbatim.**

```
'group/' + <component>ClassNames.root
```

| nyt-games rule                        | Fluent application            |
| ------------------------------------- | ----------------------------- |
| group name = the component's own name | `fui-Switch`                  |
| …as the codebase spells it            | PascalCase, `fui-` namespaced |
| result                                | `group/fui-Switch`            |

Every v9 component already publishes exactly this identity. `useSwitchStyles.styles.ts:22-27`:

```ts
export const switchClassNames: SlotClassNames<SwitchSlots> = {
  root: 'fui-Switch',
  indicator: 'fui-Switch__indicator',
  input: 'fui-Switch__input',
  label: 'fui-Switch__label',
};
```

Three reasons this is the right adaptation rather than a bare `group/switch`:

1. **nyt-games' rule is "the component's own name"; `fui-Switch` _is_ Fluent's spelling of it.**
   The `fui-` prefix is not a decoration we are adding — it is part of every component's name
   throughout v9 (71 distinct `fui-*` root class names declared across the 33 converted packages;
   a handful belong to still-Griffel siblings such as `fui-ToggleButton`, which get markers when
   they convert — see §6.2).
2. **Namespace is mandatory here and optional there.** nyt-games is an application. Fluent is a
   library that ships into consumer apps that may themselves use Tailwind. Tailwind group names
   are a flat global namespace — a Fluent `group/button` and a consumer's own `group/button`
   would be the same selector, and Fluent's rules would fire on the consumer's element. The
   brief's condition ("adapted with the fui namespace only if nyt-games convention implies a
   namespace") is met: nyt-games' convention is _use the component's name_, and Fluent's
   component names are namespaced.
3. **One source of truth, mechanically checkable.** `group/fui-Switch` is derivable from
   `switchClassNames.root` with no mapping table, so a conformance test can assert it
   (§4.3).

**Authored as a literal string, not a template.** `clsx('group/fui-Switch', …)`, matching
nyt-games and keeping the token greppable and sortable by `prettier-plugin-tailwindcss`. The
conformance test is what keeps the literal and `classNames.root` from drifting.

**Precise rule: the OUTERMOST slot's static class, which is `root` for 32 of the 33 packages.**
`react-tooltip` is the exception — `tooltipClassNames` declares no `root` at all, only
`content: 'fui-Tooltip__content'` (`useTooltipStyles.styles.ts:22-24`), because Tooltip renders
into a portal and the content element _is_ its outermost node (it is also what carries
`data-open`). Its marker is therefore `group/fui-Tooltip__content`. State the rule as "outermost
slot" so the conformance matcher (§4.3) covers this without a special case.

Probe evidence that `fui-Switch` is a legal Tailwind group name (`.scratch/group-probe.js`):

```css
.thumb:is(:where(.group\/fui-Switch):where([data-checked], :checked) *) {
  color: red;
}
```

### 2.2 Which element carries it

**The root slot, first `clsx` argument, on every converted component.** Exactly nyt-games'
position.

```ts
state.root.className = clsx(
  'group/fui-Switch', // ← NEW: named group marker (unhashed, global)
  switchClassNames.root, // static class (conformance contract)
  styles.root, // hashed module class
  state.root.className, // consumer override, always last
);
```

Non-root slots get **no** group marker. Two reasons:

- **Nesting is already free.** nyt-games needed a hand-built three-level nest
  (`field`/`word`/`letter`) because those are one component. Fluent's hierarchy is already
  separate components with separate roots: `fui-Accordion` > `fui-AccordionItem` >
  `fui-AccordionHeader` > `fui-AccordionPanel`. Marking each root gives the nest for free.
- **A group cannot style itself.** The compiled selector is `.child:is(:where(.group…) *)` — the
  descendant combinator `*` excludes the group element itself. Adding `group/fui-Switch__input`
  would let the input's _descendants_ read the input's state, which is not what anyone wants.
  When the interactive element is not the root (Switch's `<input>`), the answer is to **mirror**
  the state up to the root (§3), not to add a second group.

`FluentProvider` (`fui-FluentProvider`) is the one judgment call: it is a converted package with
a root class but it is a context boundary, not a component with state. **Include it** — a
`group-rtl/fui-FluentProvider` or theme-scoped read is a plausible future need and the marker is
inert until referenced.

### 2.3 Catalog additions required: **none**

This is the surprising result, and it is measured, not assumed.

Tailwind v4 composes `group-*` with **any** `@custom-variant` written in the canonical
`&:where(…)` shape. Our catalog
(`packages/react-components/react-tailwind-theme/css/variants.css`) is written that way for
every entry except one. Probe (`.scratch/group-probe.js`, tailwind-only leg) compiled all of
these from the existing catalog with zero additions:

| Authored                            | Compiled                                                                                                        |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `group-checked/fui-Switch`          | `.thumb:is(:where(.group\/fui-Switch):where([data-checked], :checked) *)`                                       |
| `group-not-checked/fui-Switch`      | `.thumb:is(:where(.group\/fui-Switch):where(:not([data-checked], :checked)) *)`                                 |
| `group-size-small/fui-Switch`       | `.thumb:is(:where(.group\/fui-Switch):where([data-size='small']) *)`                                            |
| `group-disabled-control/fui-Switch` | `.thumb:is(:where(.group\/fui-Switch):where([disabled], [data-disabled], :disabled, [aria-disabled='true']) *)` |
| `group-hover/fui-Switch`            | `.thumb:is(:where(.group\/fui-Switch):where(:hover) *)`                                                         |
| `group-focus-within/fui-Switch`     | `.thumb:is(:where(.group\/fui-Switch):where(:focus-within) *)`                                                  |
| `group-rtl/fui-Switch`              | `.rtlCheck:is(:where(.group\/fui-Switch):where(:dir(rtl)) *)`                                                   |

This is exactly why `variants.css:1-8` insists every entry be `:where()`-wrapped, and why
`reports/nyt-games-conventions.md` §4 lists "Composability with `group-*`" as consequence #2 of
that decision. The catalog was already built for this.

**The one exception — `forced-colors`.** It is an at-rule variant
(`variants.css:360-364`, `@media (forced-colors: active) { @slot; }`), not a selector variant, so
there is no element for `group-*` to scope. Tailwind fails **loudly**, not silently:

```
Error: Cannot use `@variant` with unknown variant: group-forced-colors/fui-Switch
```

Both nesting orders work instead, verified in `.scratch/fc-probe.js`, and both compile to the
same output:

```css
/* either of these */
@variant forced-colors { @variant group-checked/fui-Switch { color: Highlight; } }
@variant group-checked/fui-Switch { @variant forced-colors { color: Canvas; } }
/* ⇒ */
@media (forced-colors: active) {
  .x:is(:where(.group\/fui-Switch):where([data-checked], :checked) *) { … }
}
```

**Documentation-only catalog change:** add a header note to `variants.css` stating (a) every
selector variant composes under `group-*/<name>` for free, (b) `forced-colors` must be the outer
wrapper, and (c) new variants must keep the `&:where(…)` shape or they silently stop composing.
No new `@custom-variant` lines. If a future mirrored state has no variant yet, it is added there
as an ordinary entry and becomes group-composable automatically.

### 2.4 ⚠ BLOCKER — the marker is hashed today, silently

**This must land before any component change, or the entire feature is a no-op that no test
catches.**

`postcss-modules` scopes _every_ class selector in the file. Probe
(`.scratch/group-probe.js`, second leg, with the repo's real
`tailwindcss() → postcssModules()` chain):

```css
/* what the build produces today */
.fuicm-probe__thumb--xxxx: is(: where(.fuicm-probe__group\/fui-Switch--XXXX): where([data-checked], : checked) *);
```

The marker is hashed. The JSX writes the literal `group/fui-Switch`. They never match. **No
error, no warning — the rules simply never apply.** VR would pass, because nothing changed
visually; the feature would just not exist.

Three pipelines compile CSS Modules and two of them need the fix:

| #   | Pipeline                                                                | CSS-Modules impl                                | Needs fix |
| --- | ----------------------------------------------------------------------- | ----------------------------------------------- | --------- |
| 1   | `tools/workspace-plugin/src/executors/build/lib/css-modules.ts:184-197` | `postcss([tailwindcss(), postcssModules({…})])` | **yes**   |
| 2   | `apps/vr-tests-react-components/.storybook/main.js:38-55`               | `css-loader` `modules.localIdentName`           | **yes**   |
| 3   | `scripts/jest/src/css-modules/proxy.js`                                 | Proxy — jest never evaluates CSS                | no        |

**Recommended fix — a ~15-line local PostCSS plugin, no new dependency.** Verified working
(`.scratch/global-fix-probe.js`):

```js
/** `.group\/name` / `.peer\/name` — the escaped slash is what Tailwind emits. */
const GROUP_OR_PEER = /\.((?:group|peer)\\\/[A-Za-z0-9_-]+)/g;

const globalizeGroupMarkers = {
  postcssPlugin: 'fui-globalize-group-markers',
  Rule(rule) {
    if (!GROUP_OR_PEER.test(rule.selector)) return;
    GROUP_OR_PEER.lastIndex = 0;
    rule.selector = rule.selector.replace(GROUP_OR_PEER, (_m, cls) => `:global(.${cls})`);
  },
};
```

Inserted **between** `tailwindcss()` and `postcssModules()` in pipeline 1, and appended to
`postcssOptions.plugins` in `tailwindPostcssLoader` for pipeline 2 (webpack runs loaders
right-to-left, so postcss-loader already runs before css-loader — `main.js:38-55`). Probe output
with the plugin in place:

```css
.fuicm-probe__thumb--XXXX:is(:where(.group\/fui-Switch):where([data-checked], :checked) *) { color: red; }
classMap: {"thumb":"fuicm-probe__thumb--XXXX"}      ← no `group/…` key: postcss-modules ignores :global
```

Marker unhashed, module class still scoped, class map unpolluted.

**Alternative considered and rejected:** adopt `@accelint/postcss-tailwind-css-modules` (what
nyt-games uses). Same behaviour, but adds a third-party runtime dependency to the build of a
Microsoft-shipped library for 15 lines of regex, and pipeline 2 would need it wired separately
anyway. Prefer the local plugin; keep the accelint plugin as the documented prior art.

**Guardrail:** the plugin should `logger.warn` (build) if it finds a `group/…` marker in JSX with
no matching `:global` rewrite, and a unit test should assert the compiled selector for one real
module contains the literal `.group\/fui-` and not `fuicm-…group`. Without a guardrail this
failure mode is invisible.

### 2.5 Authoring rules for module files

Consolidated for the CONVERSION_GUIDE section (§5.2). All verified by probe.

1. **Self-state uses the plain variant.** `@variant hover { … }` on the root, never
   `group-hover/self` — a group cannot match itself (`:is(… *)`).
2. **Descendant depth is unlimited.** The combinator is `*`, so a slot three levels down reads
   the root's state.
3. **`forced-colors` goes outside.** `@variant forced-colors { @variant group-X/name { … } }`.
4. **Cross-package reads must go in `fui.components.l2` or higher.** Same altitude rule as
   D2 amendment 2 (`Switch.module.css:48-59`): styling _over_ another component's hook output is
   l2. A module reading another component's group state is doing exactly that.
5. **Intersections nest.** `@variant group-hover/fui-Switch { @variant group-disabled-control/fui-Switch { … } }`
   compiles to a chained `:is(… *):is(… *)` (verified, `.scratch/global-fix-probe.js`).
6. **Pseudo-class states need no mirroring.** `:hover`, `:active`, `:focus-within`,
   `:focus-visible`, `:dir(rtl)` on the root are true whenever they are true of the subtree, so
   `group-hover/…`, `group-focus-within/…`, `group-rtl/…` work with zero JS change. Only
   React-owned state that lives on a non-root element needs §3.

---

## 3. States to MIRROR onto the group element

Nothing here is required to keep today's rendering correct — the 34-package conversion is
already faithful. Mirroring exists **only to make the capability meaningful**: a state that is
invisible at the group element cannot be read by a child.

**The pattern already exists in-tree.** `react-checkbox` mirrors precisely this
(`useCheckboxStyles.styles.ts:73-77`), even though the real state lives on its hidden `<input>`:

```ts
root['data-checked'] = checked === true || undefined;
root['data-indeterminate'] = checked === 'mixed' || undefined;
root['data-disabled'] = disabled || undefined;
```

`|| undefined` is mandatory — the catalog's variants are attribute-**presence** selectors, so
`data-checked="false"` would falsely match. Same rule as
`reports/nyt-games-conventions.md` §3 Rule D (`value || null`).

### Tier 1 — required (primary state, currently invisible at the root)

| Package        | Mirror to root                  | Where it lives today                      | Variant (exists)                             |
| -------------- | ------------------------------- | ----------------------------------------- | -------------------------------------------- |
| `react-switch` | `data-checked`, `data-disabled` | `<input>` native `:checked` / `:disabled` | `checked`, `not-checked`, `disabled-control` |
| `react-radio`  | `data-checked`, `data-disabled` | `<input>` native `:checked` / `:disabled` | same                                         |

Switch's root today carries only `data-orientation`, `data-size`, `data-label-position`
(`useSwitchStyles.styles.ts:70-72`). Its **entire** checked/disabled rule set is anchored on
`.input` and reaches the indicator through sibling combinators (`Switch.module.css:209-345`).
A child component — or a consumer's icon inside the label — cannot see any of it.

Radio stamps `data-orientation` / `data-label-position` on the root and `data-empty` on the
indicator (`useRadioStyles.styles.ts:71-74`); checked/disabled are likewise input-only.

These two are the exact gap the user described, and Checkbox is the worked precedent.

### Tier 2 — recommended (secondary state, cheap, plausible consumers)

| Package                                                             | Mirror to root            | Rationale                                                                                                                                                                           |
| ------------------------------------------------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `react-accordion` (`AccordionItem`)                                 | `data-open`               | Header + Panel are separate components inside the item; "panel restyles when item is open" is the canonical accordion request. `open` variant exists.                               |
| `react-input`, `react-select`, `react-textarea`, `react-spinbutton` | `data-focused` (optional) | `:focus-within` already works through the group with no JS. Add only if a consumer needs the React-owned flag (SearchBox's distinction, `variants.css:219-238`). **Default: skip.** |

### Tier 0 — nothing to do (state already visible at the root)

Verified by reading each hook's data-attribute writes:

| Package                                                                                                                                                                                                     | Already on root                                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `react-checkbox`                                                                                                                                                                                            | `data-checked`, `data-indeterminate`, `data-disabled`, `data-size`, `data-label-position`                     |
| `react-card`                                                                                                                                                                                                | `data-selected`, `data-disabled`, `data-interactive`, `data-orientation`, `data-size`                         |
| `react-button`                                                                                                                                                                                              | `data-disabled`, `data-disabled-focusable`, `data-icon-only`, `data-icon-position`, `data-empty`, `data-size` |
| `react-accordion` (`AccordionHeader`)                                                                                                                                                                       | `data-disabled`, `data-size`, `data-expand-icon-position`, `data-inline`, `data-icon`                         |
| `react-tree` (`TreeItem`)                                                                                                                                                                                   | `aria-expanded` — the `expanded` variant already matches `[aria-expanded='true']` (`variants.css:31`)         |
| `react-list` (`ListItem`)                                                                                                                                                                                   | `data-interactive`, `data-disabled`                                                                           |
| `react-tooltip`, `react-infolabel`                                                                                                                                                                          | `data-open`                                                                                                   |
| `react-breadcrumb`                                                                                                                                                                                          | `data-current`                                                                                                |
| `react-search`                                                                                                                                                                                              | `data-focused`, `data-disabled`                                                                               |
| `react-input`/`select`/`textarea`/`spinbutton`                                                                                                                                                              | `data-disabled`, `data-invalid`, `data-size`                                                                  |
| `react-message-bar`                                                                                                                                                                                         | `data-intent`, `data-layout`, `data-has-actions`                                                              |
| `react-progress`                                                                                                                                                                                            | `data-indeterminate`, `data-thickness`                                                                        |
| `react-avatar`                                                                                                                                                                                              | `data-active`, `data-active-appearance`, `data-size`                                                          |
| `react-divider`                                                                                                                                                                                             | `data-orientation`, `data-inset`, `data-align-content`, `data-empty`                                          |
| `react-badge`, `react-persona`, `react-rating`, `react-tags`, `react-text`, `react-toolbar`, `react-spinner`, `react-skeleton`, `react-field`, `react-label`, `react-link`, `react-image`, `react-provider` | scale/look attrs only, or no state                                                                            |

### Cost of mirroring — do not skip this

`metrics/perf-eval/variants/SUMMARY.md` §2 and §7: the `named-group` leg recalculated **12,000
elements vs. 11,000** for every other leg, "because the static `fui-g-switch` class and
`data-checked` both land on the root, widening what the toggle invalidates." Wall-clock impact
was inside noise (−0.2%), but the invalidation widening is real and scales with subtree size.

**Therefore: mirror Tier 1 unconditionally (it is the feature), Tier 2 on request, Tier 0
never.** Do not mirror "for symmetry".

---

## 4. Blast radius — all 34 converted packages

Source: `ledger.json` (`status: validated`), plus measured counts over
`packages/react-components/*/library/src`.

**Totals: 33 component packages + `react-tailwind-theme`. 67 styles hooks, 65 CSS modules, 42
snapshot files (41 containing `class=`).**

### 4.1 Per-package worklist

`hooks` = `*.styles.ts` importing `clsx` (each needs one `clsx` argument added per root it
owns). `snaps` = committed `.snap` files that will need `-u`.

| #   | Package              | hooks | modules | snaps | Group markers to add                                                                                          | Data mirrors                                               | Notes                                                                                                                                                                                                                                                                                                                                                                      |
| --- | -------------------- | ----: | ------: | ----: | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | react-accordion      |     4 |       2 |     4 | `fui-Accordion`, `fui-AccordionItem`, `fui-AccordionHeader`, `fui-AccordionPanel`                             | **Tier 2** `data-open` on `AccordionItem`                  | Item/Header/Panel are the strongest nesting case in the set                                                                                                                                                                                                                                                                                                                |
| 2   | react-avatar         |     3 |       3 |     0 | `fui-Avatar`, `fui-AvatarGroup`, `fui-AvatarGroupItem`                                                        | —                                                          | `AvatarGroupPopover` still Griffel; skip                                                                                                                                                                                                                                                                                                                                   |
| 3   | react-badge          |     3 |       3 |     3 | `fui-Badge`, `fui-CounterBadge`, `fui-PresenceBadge`                                                          | —                                                          | PresenceBadge uses `!important` ×7 — marker is inert, no interaction                                                                                                                                                                                                                                                                                                       |
| 4   | react-breadcrumb     |     4 |       4 |     0 | `fui-Breadcrumb`, `fui-BreadcrumbItem`, `fui-BreadcrumbButton`, `fui-BreadcrumbDivider`                       | —                                                          | `data-current` already on root                                                                                                                                                                                                                                                                                                                                             |
| 5   | react-button         |     1 |       1 |     0 | `fui-Button`                                                                                                  | —                                                          | Siblings (`ToggleButton`/`Compound`/`Menu`/`Split`) are still Griffel — **do not** add markers to them yet                                                                                                                                                                                                                                                                 |
| 6   | react-card           |     4 |       4 |     4 | `fui-Card`, `fui-CardHeader`, `fui-CardFooter`, `fui-CardPreview`                                             | —                                                          | Full state already on root; best zero-cost demo of the feature                                                                                                                                                                                                                                                                                                             |
| 7   | react-checkbox       |     1 |       1 |     1 | `fui-Checkbox`                                                                                                | — (already mirrors)                                        | **Reference implementation** for Tier 1                                                                                                                                                                                                                                                                                                                                    |
| 8   | react-divider        |     1 |       1 |     1 | `fui-Divider`                                                                                                 | —                                                          |                                                                                                                                                                                                                                                                                                                                                                            |
| 9   | react-field          |     1 |       1 |     0 | `fui-Field`                                                                                                   | —                                                          | Field wraps arbitrary controls — a natural group consumer                                                                                                                                                                                                                                                                                                                  |
| 10  | react-image          |     1 |       1 |     1 | `fui-Image`                                                                                                   | —                                                          | Zero data attrs by design; marker still added                                                                                                                                                                                                                                                                                                                              |
| 11  | react-infolabel      |     2 |       2 |     0 | `fui-InfoLabel`, `fui-InfoButton`                                                                             | —                                                          | `info` slot stays Griffel (whitelisted); no marker there                                                                                                                                                                                                                                                                                                                   |
| 12  | react-input          |     1 |       1 |     1 | `fui-Input`                                                                                                   | Tier 2 (skip by default)                                   |                                                                                                                                                                                                                                                                                                                                                                            |
| 13  | react-label          |     1 |       1 |     1 | `fui-Label`                                                                                                   | —                                                          |                                                                                                                                                                                                                                                                                                                                                                            |
| 14  | react-link           |     1 |       1 |     1 | `fui-Link`                                                                                                    | —                                                          | `disabled` gate is narrower than `aria-disabled` — see `variants.css:299-319`; do not widen                                                                                                                                                                                                                                                                                |
| 15  | react-list           |     2 |       2 |     2 | `fui-List`, `fui-ListItem`                                                                                    | —                                                          |                                                                                                                                                                                                                                                                                                                                                                            |
| 16  | react-message-bar    |     5 |       4 |     5 | `fui-MessageBar`, `fui-MessageBarBody`, `fui-MessageBarTitle`, `fui-MessageBarActions`, `fui-MessageBarGroup` | —                                                          | Highest snapshot count after Toolbar                                                                                                                                                                                                                                                                                                                                       |
| 17  | react-persona        |     1 |       1 |     0 | `fui-Persona`                                                                                                 | —                                                          |                                                                                                                                                                                                                                                                                                                                                                            |
| 18  | react-progress       |     1 |       1 |     0 | `fui-ProgressBar`                                                                                             | —                                                          |                                                                                                                                                                                                                                                                                                                                                                            |
| 19  | react-provider       |     1 |       1 |     1 | `fui-FluentProvider`                                                                                          | —                                                          | Context boundary; marker inert until used. Snapshot tests include whole-HTML-string snaps (`FluentProvider-node/-hydrate`) — see §4.2                                                                                                                                                                                                                                      |
| 20  | react-radio          |     2 |       2 |     0 | `fui-Radio`, `fui-RadioGroup`                                                                                 | **Tier 1** `data-checked`, `data-disabled` on `Radio` root |                                                                                                                                                                                                                                                                                                                                                                            |
| 21  | react-rating         |     3 |       3 |     0 | `fui-Rating`, `fui-RatingDisplay`, `fui-RatingItem`                                                           | —                                                          |                                                                                                                                                                                                                                                                                                                                                                            |
| 22  | react-search         |     1 |       1 |     1 | `fui-SearchBox`                                                                                               | —                                                          | `data-focused` already on root                                                                                                                                                                                                                                                                                                                                             |
| 23  | react-select         |     1 |       1 |     1 | `fui-Select`                                                                                                  | Tier 2 (skip)                                              |                                                                                                                                                                                                                                                                                                                                                                            |
| 24  | react-skeleton       |     2 |       2 |     2 | `fui-Skeleton`, `fui-SkeletonItem`                                                                            | —                                                          |                                                                                                                                                                                                                                                                                                                                                                            |
| 25  | react-spinbutton     |     1 |       1 |     0 | `fui-SpinButton`                                                                                              | Tier 2 (skip)                                              |                                                                                                                                                                                                                                                                                                                                                                            |
| 26  | react-spinner        |     1 |       1 |     0 | `fui-Spinner`                                                                                                 | —                                                          |                                                                                                                                                                                                                                                                                                                                                                            |
| 27  | react-switch         |     1 |       1 |     0 | `fui-Switch`                                                                                                  | **Tier 1** `data-checked`, `data-disabled` on root         | **The user's worked example.** Perf leg already modelled it                                                                                                                                                                                                                                                                                                                |
| 28  | react-tags           |     5 |       5 |     0 | `fui-Tag`, `fui-TagGroup`, `fui-InteractionTag`, `fui-InteractionTagPrimary`, `fui-InteractionTagSecondary`   | —                                                          | `react-tag-picker` delegates here — its jest config needs the css-modules serializer when tags classes reach its snaps (ledger note)                                                                                                                                                                                                                                       |
| 29  | react-text           |     1 |       2 |     0 | `fui-Text` (+ presets share the hook)                                                                         | —                                                          | Presets reuse `fui-Text`; one marker                                                                                                                                                                                                                                                                                                                                       |
| 30  | react-textarea       |     1 |       1 |     1 | `fui-Textarea`                                                                                                | Tier 2 (skip)                                              |                                                                                                                                                                                                                                                                                                                                                                            |
| 31  | react-toolbar        |     4 |       4 |     7 | `fui-Toolbar`, `fui-ToolbarGroup`, `fui-ToolbarDivider`, `fui-ToolbarButton`                                  | —                                                          | **Highest snapshot count (7).** Toggle/Radio button hooks stay Griffel — no markers there                                                                                                                                                                                                                                                                                  |
| 32  | react-tooltip        |     1 |       1 |     0 | `fui-Tooltip__content` ⚠                                                                                      | —                                                          | **Exception:** `tooltipClassNames` has NO `root` — only `content: 'fui-Tooltip__content'` (`useTooltipStyles.styles.ts:22-24`). The content slot IS Tooltip's outermost element and carries `data-open`, so the marker goes there: `group/fui-Tooltip__content`. The §4.3 conformance matcher must key off the component's outermost slot, not literally `classNames.root` |
| 33  | react-tree           |     5 |       5 |     5 | `fui-Tree`, `fui-FlatTree`, `fui-TreeItem`, `fui-TreeItemLayout`, `fui-TreeItemPersonaLayout`                 | —                                                          | `aria-expanded` on TreeItem root already satisfies `expanded`                                                                                                                                                                                                                                                                                                              |
| 34  | react-tailwind-theme |     — |       — |     — | —                                                                                                             | —                                                          | **Doc-only** header note in `variants.css` (§2.3). Zero `@custom-variant` additions                                                                                                                                                                                                                                                                                        |

### 4.2 What actually changes, by file class

**A. Styles hooks (67 files).** One added `clsx` argument per owned root:

```diff
-state.root.className = clsx(switchClassNames.root, styles.root, state.root.className);
+state.root.className = clsx('group/fui-Switch', switchClassNames.root, styles.root, state.root.className);
```

Plus, for Tier 1 packages only, two lines in the root data-attribute block and two entries in the
`…RootDataAttributes` type. Mechanical; no logic change.

**B. Root `data-*` mirrors.** 2 packages (Switch, Radio) × 2 attributes = **4 new attribute
writes** for Tier 1. Tier 2 adds 1 (Accordion `data-open`) if taken.

**C. Snapshots — 42 files, all need `-u`.** This is unavoidable and is the largest mechanical
cost.

`scripts/jest/src/css-modules/serializer.js` strips **only** `fuicm-`-prefixed tokens
(`GENERATED_CLASS_PREFIX = 'fuicm-'`, and `GENERATED_CLASS_TOKEN` is anchored on it). The group
marker is deliberately _not_ prefixed — that is the whole point — so **`group/fui-Switch` will
appear verbatim in every snapshot**, exactly as `fui-Switch` does today:

```
class="group/fui-Switch fui-Switch"
```

**This is correct and should be kept.** The marker is public API (it is in the consumer's DOM and
consumers may target it), so it belongs in the snapshot the same way `fui-Switch` does. Do **not**
extend the serializer to strip it — that would hide a public contract.

Watch item: `react-provider`'s `FluentProvider-node.test.tsx` / `-hydrate.test.tsx` snapshot whole
HTML _document strings_; the serializer's header documents that it wins over
`@griffel/jest-serializer` for those. Adding a marker to `fui-FluentProvider` puts a new token in
those two snaps. Expected, but review the diff rather than blind-`-u`.

**D. Build infrastructure — 2 files, and they gate everything (§2.4).**
`tools/workspace-plugin/src/executors/build/lib/css-modules.ts` and
`apps/vr-tests-react-components/.storybook/main.js`.

**E. Conformance.** See §4.3.

### 4.3 Conformance and VR expectations

**VR must stay 34/34, and the change is pixel-inert by construction.**

Adding `group/fui-X` to a `className` and `data-checked` to a root adds a class and an attribute
that **no stylesheet currently selects**. `.group\/fui-Switch` appears in no compiled rule until a
module authors a `group-*/…` variant. `[data-checked]` on the Switch root matches no existing
selector — every Switch checked rule is anchored on `.input` (`Switch.module.css:209-345`).

Precedent for exactly this being pixel-inert: `ledger.json` react-button — "Charts snapshots: +593
additive `data-*` lines, verified zero removals" with VR 129/129 clean.

Expectations:

- **VR: 34/34, zero tolerance, zero fix rounds.** Any VR diff means a marker or mirror
  accidentally matched a live selector — investigate, do not baseline.
- **Jest: 42 snapshot files updated, additions only.** Verify with
  `git diff --stat` + a check that the diff contains no `-` lines other than the paired
  `class="…"` rewrites. Same audit react-button used.
- **Conformance — add one matcher.** For every converted component assert that the outermost
  slot's `className` contains the literal `` `group/${<that slot's static class>}` `` — i.e.
  `group/fui-Switch` on `root`, and `group/fui-Tooltip__content` on Tooltip's `content`. Phrasing
  it as "outermost slot" rather than "root" is what keeps Tooltip from needing a special case.
  This is what keeps the literal string honest and catches a copy-paste
  (`clsx('group/fui-Switch', breadcrumbClassNames.root, …)`). Natural home: alongside the existing
  `mergeClasses`-replacement work tracked as D9 / `react-conformance-griffel`.
- **New build test.** Assert one real compiled module contains `.group\/fui-` and not
  `fuicm-…group` (§2.4 guardrail). Without it, a future PostCSS refactor silently kills the
  feature.

### 4.4 Suggested sequencing

1. **Infrastructure** (§2.4) — the two PostCSS chains + guardrail test. **Blocks everything.**
2. **`variants.css` header note** (§2.3) — doc-only.
3. **Pilot: `react-switch`** — marker + Tier 1 mirrors + one real cross-component rule proving a
   child reads `group-checked/fui-Switch`. Run full VR. This is the user's example and the perf
   leg already modelled it.
4. **Fan out the marker** across the remaining 32 packages — pure `clsx` edits, parallelisable per
   package, `-u` snapshots per package.
5. **`react-radio`** Tier 1 mirrors; **`react-accordion`** Tier 2 if wanted.
6. Conformance matcher; ledger + DECISIONS update.

---

## 5. Proposed text (do NOT apply from here — for review)

### 5.1 `DECISIONS.md` — D15

> ### D15 — Named groups: every converted component root carries `group/fui-<Name>`
>
> **Decision.** Every converted component stamps an unhashed, global Tailwind group marker
> `group/<static class of the outermost slot>` (e.g. `group/fui-Switch`) as the FIRST argument of
> that slot's `clsx(…)`, immediately before the static `fui-*` class. No other slot carries a
> marker. The outermost slot is `root` for 32 of the 33 converted packages; `react-tooltip` has no
> `root` slot at all and uses `content` (`group/fui-Tooltip__content`).
>
> **Why.** A CSS-Modules class is hashed and therefore unaddressable from any other module. The
> group marker is the only global handle by which one component's module can style an element
> based on an ancestor component's state — the capability nyt-games uses at
> `sidenav.module.css:285-311`, where Sidenav's `.bar` reads `group-hover/button` and
> `group-pressed/button` from a Button in a different package. Fluent has no equivalent today.
>
> **Not for performance.** `metrics/perf-eval/variants/SUMMARY.md` §7 measured the named-group
> shape at −0.2% against the current selectors (inside a 0.63 ms IQR) and recalculating 1,000
> more elements. This is a capability decision with a small, accepted invalidation cost.
>
> **Naming.** `group/` + the component's root static class, verbatim. nyt-games' rule is "the
> group name is the component's own name as the codebase spells it"
> (`reports/nyt-games-conventions.md` §8d); Fluent spells component identity as `fui-<PascalName>`.
> The `fui-` namespace is additionally mandatory here and optional there: Fluent ships into
> consumer apps that may use Tailwind, and group names are a flat global namespace, so a bare
> `group/button` would collide with a consumer's own. Derivability from `classNames.root` makes
> the name conformance-checkable.
>
> **Mirroring.** State a child must read has to be visible ON the group element. Where a
> component's primary state lives on a non-root element it is mirrored to the root as a presence
> `data-*` attribute written `value || undefined`, following `react-checkbox`
> (`useCheckboxStyles.styles.ts:73-77`) and nyt-games' `data-game`-on-`group/card`
> (`game-card/index.tsx:34`). Required for `react-switch` and `react-radio`
> (`checked`, `disabled` — both `<input>`-only today). Mirroring widens invalidation, so it is
> added only where a real state is otherwise unreadable, never for symmetry.
>
> **Variant catalog: no additions.** Tailwind v4 composes `group-*` with any `@custom-variant`
> written `&:where(…)`, which D2 already mandates for zero-specificity reasons. Verified against
> tailwindcss 4.3.3 for `checked`, `not-checked`, `size-small`, `disabled-control`, `hover`,
> `focus-within`, `rtl`. The sole exception is `forced-colors`, an at-rule variant:
> `group-forced-colors/x` is a hard build error, and `@variant forced-colors { @variant group-x/y }`
> is the required form. Any future variant must keep the `&:where(…)` shape or it silently stops
> composing.
>
> **Build prerequisite (blocking).** `postcss-modules` and `css-loader` both hash the marker,
> silently — the compiled selector becomes `.fuicm-…group\/fui-Switch--XXXX`, which the DOM never
> matches, with no error. A local PostCSS plugin that `:global()`-wraps `.group\/…` / `.peer\/…`
> selector segments runs between Tailwind and CSS Modules in
> `tools/workspace-plugin/src/executors/build/lib/css-modules.ts` and in the VR storybook's
> `postcssOptions.plugins`. nyt-games solves this with
> `@accelint/postcss-tailwind-css-modules@1.1.0`; a 15-line local plugin is preferred over a new
> third-party build dependency. A build test asserts the literal `.group\/fui-` survives.
>
> **Snapshots.** The marker is public DOM surface and is deliberately NOT `fuicm-`-prefixed, so
> the jest serializer does not strip it and it appears in snapshots beside `fui-*`. 42 snapshot
> files update, additively. Do not extend the serializer to hide it.
>
> **Pixel-inert.** Class and attribute additions that no current selector matches. VR stays 34/34
> at zero tolerance; any diff is a bug, not a baseline.

### 5.2 `CONVERSION_GUIDE.md` — new section

> ## §N — Named groups
>
> ### N.1 Stamp the marker
>
> Every component root gets an unhashed group marker as the FIRST `clsx` argument:
>
> ```ts
> state.root.className = clsx(
>   'group/fui-Switch', // named group marker — literal, unhashed, global
>   switchClassNames.root, // static class (conformance contract)
>   styles.root, // hashed CSS-Modules class
>   state.root.className, // consumer override — always last
> );
> ```
>
> The name is always `'group/' + <the outermost slot's static class>`, written as a literal
> (greppable, sortable, and asserted by conformance). That is `classNames.root` for every
> component except `react-tooltip`, which has no `root` slot and uses
> `group/fui-Tooltip__content`. No other slot gets a marker: sub-components already have their own
> roots, and a group cannot style itself.
>
> ### N.2 Read a parent's state
>
> Inside the CHILD's module, at altitude `fui.components.l2` or higher (you are styling over
> another component's output — see D2 amendment 2):
>
> ```css
> @layer fui.components.l2 {
>   .thumb {
>     @variant group-checked/fui-Switch {
>       transform: translateX(calc(20px * var(--base-scale)));
>     }
>     @variant group-hover/fui-Switch {
>       @variant group-disabled-control/fui-Switch {
>         color: var(--colorNeutralForegroundDisabled);
>       }
>     }
>   }
> }
> ```
>
> Any catalog variant composes: `group-<variant>/<name>`. Compiles to
> `.thumb:is(:where(.group\/fui-Switch):where(<matcher>) *)`.
>
> ### N.3 Four rules that bite
>
> 1. **Self-state uses the plain variant.** `@variant hover`, never `group-hover/self` — the
>    compiled `:is(… *)` excludes the group element itself.
> 2. **`forced-colors` must be the OUTER wrapper.** `group-forced-colors/x` is a hard build error
>    (`Cannot use @variant with unknown variant`). Write
>    `@variant forced-colors { @variant group-x/y { … } }`.
> 3. **Pseudo-class state needs no mirroring.** `:hover`, `:active`, `:focus-within`,
>    `:focus-visible`, `:dir(rtl)` are true of the root whenever true of the subtree.
> 4. **React state on a non-root element must be mirrored** to the root as a presence attribute
>    written `value || undefined` (never `|| false` — variants are presence selectors). See
>    `react-checkbox` for the reference shape. Mirror only what a child genuinely needs;
>    every mirrored attribute widens invalidation.
>
> ### N.4 New variants
>
> Add to `react-tailwind-theme/css/variants.css` only, in the canonical `&:where(…)` form. That
> shape is what makes it group-composable — an ancestor-form variant (`:where([x]) &`) or an
> at-rule variant will not compose.

---

## 6. Open items

1. **`group/fui-FluentProvider`** — included as inert surface. If the team would rather not put a
   Tailwind-flavoured token on the provider root (it is the most-consumed class in v9), drop it;
   nothing depends on it.
2. **Unconverted siblings.** `ToggleButton` / `CompoundButton` / `MenuButton` / `SplitButton`
   (still Griffel) and `AvatarGroupPopover` get markers when they convert, not now.
3. **`peer/…`** — the sibling analogue. The §2.4 plugin already handles it. No component needs it
   today; the regex covers it so the infrastructure does not need revisiting.
4. **Unmeasured.** Nobody has yet measured the invalidation cost of Tier 1 mirroring on a real
   Switch page (the perf leg modelled a synthetic equivalent). Worth one run of the existing
   harness after the pilot.
