# Authoring conventions (contributors)

**Load this only when changing styles INSIDE `packages/react-components/react-windmod-preview`.** The
consumer override model does not apply here — inside the library everything is layered, and these rules
are what keep the cascade predictable.

`Button` and `Tooltip` are the reference implementations. Read them first and copy their patterns
exactly.

**Where things are.** This file is long; jump to what you need.

| Section                                                                           | Read it when                                                                                  |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [Composition](#composition)                                                       | wiring a component's hook, look props and context                                             |
| [Re-slotting one component into another](#re-slotting-one-component-into-another) | one component becomes another's slot `elementType`                                            |
| [The styles hook](#the-styles-hook)                                               | writing or changing a `use<Name>Styles.ts`                                                    |
| [Markers](#markers) · [Data attributes](#data-attributes)                         | class-name records, group/peer markers, `data-*` stamps                                       |
| [CSS authoring](#css-authoring)                                                   | touching any `*.module.css` — layers, blocks, tokens                                          |
| [Code style](#code-style) · [Comments policy](#comments-policy)                   | before review                                                                                 |
| [Definition of done](#definition-of-done)                                         | deciding whether the change is finished                                                       |
| [Verification](#verification)                                                     | the pixel gate, allowances, mutation tables, probes                                           |
| [Scope](#scope)                                                                   | deciding whether the feature is windmod's to add at all                                       |
| [failure-modes.md](failure-modes.md)                                              | before calling any style change done — the recurring defect classes and their detection greps |

## Composition

A styled component is: headless hook + local look-props + styles hook + headless render.

```tsx
export const Button: ForwardRefComponent<ButtonProps> = React.forwardRef((props, ref) => {
  const context = useButtonContext();
  const { appearance = 'secondary', shape = 'rounded', size = 'medium', ...rest } = mergeContextProps(context, props);
  const state = useButton(rest, ref);
  const styled = useButtonStyles({ ...state, appearance, shape, size });

  return renderButton(styled);
});
```

Look props (`appearance`/`shape`/`size`/…) live in the windmod layer with defaults matching Griffel's.
Everything else passes through to the headless hook untouched. Context is merged **before**
destructuring, so a container supplies the default while an explicit prop still wins.

Every hook call is its own statement-level `const`, in call order — `context`, `state`, `styled`,
`contextValues` — never nested inside an object literal or a call argument. Hooks are ordered
effects under the rules of hooks, and that unconditional order has to be readable as a sequence of
statements rather than reconstructed from an expression tree. The `ForwardRefComponent<Props>`
annotation on the const types both parameters and the emitted declaration on its own; no trailing
cast and no inline parameter annotations.

## Re-slotting one component into another

A windmod component may be another's slot `elementType` wherever Griffel does the same — `Field`
swapping the windmod `Label` into `components.label`, `NavDrawer` re-binding its root onto `Drawer`.
The swap has **two channels, and both must move together.**

```tsx
// ✅ both channels
return {
  ...headless,
  components: { ...headless.components, root: Drawer as NavDrawerState['components']['root'] },
  root: slot.always(headless.root, { elementType: Drawer }),
};

// ❌ elementType only — reverts in dev and jest, passes in production
return { ...headless, root: slot.always(headless.root, { elementType: Drawer }) };
```

**Why.** `assertSlots` is not a dev-only warning. It iterates `state.components` and **writes the
declared element type back** onto any mismatched slot before it warns
(`react-utilities/src/compose/assertSlots.ts:64`). A
swap that moves `elementType` without moving the matching `components` entry is therefore silently
reverted under `NODE_ENV !== 'production'` — including in every jest test — while shipping correctly
to consumers. The bug is invisible exactly where you would look for it.

Earlier swaps survived without the second channel only because their base hooks declare
`components: { root: 'div' }` alone; `assertSlots` short-circuits on `undefined` slots. Do not read
those as precedent.

**Read `TagPickerList.tsx:20-28` before implementing** — it is the exact root-slot precedent, moving
both channels with a comment stating the same mechanism. `SplitButton.tsx:32-42` precedents the
enumerate-all-slots form; use the literal `components: { root: … }` when the headless slots type
declares exactly one slot, since it never _reads_ `components` and so needs no `no-deprecated`
disable.

`slot.always` is immutable: it builds a fresh object and overwrites the element-type symbol the
headless hook set, while `resolveShorthand` returns an object value unchanged, so nothing of the
headless slot is lost and the render-function symbol survives the spread.

## The styles hook

**Immutable — returns a NEW state object. Never mutate.**

```ts
export const buttonClassNames: { root: string } = {
  root: componentMarkers('button'),
};

export const useButtonStyles = (state: ButtonState): ButtonState => {
  const { appearance, shape, size } = state;

  const root: ButtonState['root'] & ButtonRootDataAttributes = {
    ...state.root,
    'data-appearance': appearance,
    'data-size': size,
    'data-empty': !state.root.children || undefined,
    className: clsx(buttonClassNames.root, styles.root, styles[appearance], styles[shape], state.root.className),
  };

  return {
    ...state,
    root,
    icon: slotClasses(state.icon, styles.icon),
  };
};
```

- **Note what is _not_ in that `clsx` call.** `appearance` and `shape` each contribute a class per
  value; `size` is destructured, stamped as `data-size`, and then never composed. Sizes are almost
  always attribute-driven — one `.root` block with `@variant size-*` nested inside it — so do not go
  looking for a `styles.extraLarge` sibling class, and do not add one. Adding a size means adding a
  `@variant` block to the existing `.root` (and to `.icon` where the glyph scales), not a new module
  class. The same holds for any look prop whose values differ only in measurements.
- Named `use<Component>Styles.ts`. The filename must **not** contain a `.styles.` segment (Griffel's AOT
  glob would pick it up).
- A styles hook that composes another component's styles hook must carry `'use client';` —
  enforce-use-client fires on custom-hook calls.
- Class composition is always
  `clsx(componentMarkers('<component>'), styles.root, state.root.className)` — consumer className last.
- Slots go through `slotClasses(slot, ...classes)`, which returns a falsy slot unchanged rather than
  materialising it. An optional slot the headless hook declined to build must stay absent.

## Markers

`utils/groupMarker.ts` is the only public class pair, and owns the ordering constraint:

```ts
componentMarkers(name); // `fui-${name} group/fui-${name}`
peerMarker(name); // `peer/fui-${name}`
```

`fui-<name>` must be **first**: jsdom's nwsapi builds its `:scope` polyfill (and therefore `:has()`)
from `classList[0]` run through the unescaped global `escape()`, which mishandles `/` and throws.

`peerMarker` goes on **native input slots only** — where real pseudo-class state lives. Never on the
root of a composite control: a consumer's `peer-checked/fui-x` would silently match a root that is
never `:checked`.

## Data attributes

The styles hook stamps `data-*` for anything CSS must select on. Presence semantics:

- JSX value is `true` when on — `X || undefined`, or `cond ? true : undefined`
- `undefined` removes the attribute from rendering
- never `? '' : undefined`

CSS selectors stay **presence-based** (`[data-x]`, never `[data-x='true']`) unless targeting a specific
value (`data-size`, `data-color`, …).

Headless already stamps its own state attributes — do not duplicate them. Headless-stamped attrs keep
the headless library's own `''` spelling; that is theirs, not ours.

### Subtree token knobs: the grouped-selector mechanism

A `:root`-declared token cannot be re-tuned mid-tree by overriding an input variable — descendants
inherit the already-substituted stream; a formula responds to a local knob only where its declaration
re-applies. The sanctioned shape (ScaleRegion is the precedent) is theme-owned: the knob's completion
class is **grouped into the invariant emission's selector** (`:root, :host, .fui-scale-region` — same
declarations, one more selector, a computed no-op at the root), and the knob value is derived from a
data attribute on the same element via typed attr() coercion
(`--fui-scale: attr(data-fui-scale type(<number>), 1)` — the same coercion `data-size` uses, see
[variant-catalog.md](variant-catalog.md)). Attribute-derived knobs are absolute per element: nested
regions replace the factor, never compound it. The component stamps the class, the attribute, and the
ambient theme class (theme-owned formulas re-substitute only where the theme class re-applies).

## CSS authoring

### Layers

- **All** component styles live in `fui.components.l<level>`.
- Tailwind's preflight ships at the **head of `fui.base`** — the first content of that layer, so
  every component rule outranks it by layer order and the theme's other element resets beat it by
  source order (or, for the zero-specificity icon defaults, by the theme's own guard rule).
  Components depend on that reset: a declaration that only restates a preflight value —
  `box-border`, `m-0`/`p-0` on an element the universal rule already zeroes, `border-current`
  beside `border-none`, `font-*: inherit` on a form control — is dead and is not authored. A zero
  or inherit is authored only where it undoes an author rule (see the restated-reset row in
  [failure-modes.md](failure-modes.md)).
- `fui.base` belongs to the theme, for the preflight and global element resets **only**. Components
  never author into it.
- **The level is assigned per RULE, not per file.** A rule styling the component's own DOM — its root,
  its plain-element slots — is a base style and sits at `l1`, no matter what the rest of the file does.
  A rule that overrides ANOTHER component's styles (a slot rendering a windmod Label, Button,
  Listbox, …) sits one level above the overridden rules — `l2` over an `l1` base, `l3` over an `l2`
  one. Layer order carries the override, **never** cross-file source order. Never park a rule higher
  than the rule it overrides requires; wholesale-levelling a file grows the stack for nothing
  (Field's root is a plain div and sits at `l1` even though its label block, overriding the windmod
  Label, sits at `l2`).
- **One `@layer` block per level per `module.css`** — a mixed file carries at most one block for each
  level it uses. Same-element rules must share a level so block order keeps arbitrating between them;
  only rules for disjoint elements may sit at different levels.
- **Never** write an `@layer` ORDER statement anywhere except the theme package, which is its sole
  owner.

Layer assignments are conventions, not hard rules: the library claims as deep as composition requires,
and the declared stack may expand if headroom is needed.

#### The ladder is unconditional — and that is the trap

Griffel resolves a composition by **sheet order _and_ selector specificity**, and the two frequently
disagree. windmod resolves it by layer alone: every declaration an `l2` module authors beats the `l1`
base it composes over, in every state, regardless of weight.

So a rule that Griffel writes but never applies **must not be ported**:

- `AvatarGroup` — Griffel merges its focus indicator unconditionally, and that `[data-fui-focus-visible]`
  selector (0,2,0) outranks the pie bucket (0,1,0). Porting the pie bucket alone left a pie overflow
  trigger with **no focus ring at all**. Its `forced-colors` block is the mirror image: a bare class
  (0,1,0) that Griffel's hover bucket (0,2,0) beats, so authored last in a layer it painted
  `CanvasText` where Griffel paints the hover colour.
- The `TeachingPopover` carousel footer — Griffel's brand buckets author the narrow `:hover:active`
  while windmod's `hover-active` variant is the wide `:hover:active, :active:focus-visible`. At
  `:active:focus-visible` Griffel paints the plain Button appearance and a verbatim port paints brand
  blue over it.

**`!important` inverts the whole ladder.** An important declaration in a lower layer beats a normal
one in a higher layer, so a single `!important` anywhere in a base turns the ladder upside down and
forces every override above it to escalate too. The library carries none, by design.

### Author what Griffel computes, never what Griffel writes

The parity target is the **computed** style of the Griffel twin. Source is a lead, not the answer;
where they disagree, the browser is right.

- `NavDrawerFooter` — Griffel writes a **five-value** `padding` shorthand. Five values are invalid at
  computed-value time, so the property resolves to its initial value and the footer computes
  `0px 0px 0px 0px`, wiping `DrawerFooter`'s reset rather than replacing it. windmod authors the zero,
  because that is what ships. ✅ measure → author `0`; ❌ read the source → author the intended values
  → guaranteed VR diff.
- Dead declarations are common: `Dropdown`'s and `Combobox`'s icon `fontSize` is overridden by all
  three size buckets, so windmod authors the three bucket values and nothing else.

Where a plan cannot predict the winner, a browser probe on the **Griffel side only**, reading
`getComputedStyle` across the full state cross-product, is the binding measurement — and it blocks the
module. Force `:hover` / `:active` through CDP `CSS.forcePseudoState`, and when a state is a _pair_
(`:active:focus-visible`) verify the pair actually latched before trusting the row. Record the dead
declarations you skipped; a reviewer must be able to see the omission was deliberate.

### One block per class

Each module class is authored **exactly once** — resting look first inside the block, then its variants
nested in cascade order. A class never appears as two sibling blocks. Cascade _between_ classes is
carried by block order within the layer; every catalog variant is `:where()`-flat, so equal specificity
is guaranteed and source order decides.

```css
@reference '#theme';

@layer fui.components.l1 {
  .root {
    @apply …;

    transition-property: background, border, color;

    @variant hover {
      @apply …;
    }
    @variant hover-active {
      @apply …;
    }
    @variant size-small {
      @apply …;
    }
    @variant disabled, disabled-focusable {
      @apply …;
      @variant hover {
        @apply …;
      }
    }
    @variant focus-visible {
      @apply fui-focus-ring;
    }
  }
}
```

Every module opens with `@reference '#theme'` — one line, resolved through `library/package.json`'s
`"imports"."#theme"`, which points at `library/src/theme.css`, which composes the theme package's
catalog with the package's own variants file.

### Children are styled directly, never through nested descendant selectors

Every slot gets its own module class with its own top-level block, and parent state reaches it via group
variants:

```css
.required {
  @variant group-disabled/fui-label { … }
}
```

Nested `& .child` selectors inside a root state block are allowed **only** when the target has no module
class at all (raw icon glyph elements). A local class inside `:not()` is an exclusion filter, not a
target, and satisfies the rule. Where Tailwind lacks a combinator primitive, a plain CSS sibling
selector in the module is the sanctioned escape hatch.

### Tailwind-max

Use utilities for everything feasible, including `border-(length:--spacing-thin)`, `rotate-(--var)`,
`size-(--var)`, `me-(--var)`, `border-[Highlight]` (system colours), `forced-color-adjust-none`. Only
complex `var()`-fallback chains, clip-paths and multi-drop-shadows stay as raw CSS declarations.

**No arbitrary-property utilities.** A utility that is _entirely_ a square-bracketed `property:value`
pair — `[text-align:unset]`, `[grid-area:content]` — is banned; write the plain declaration instead. The
compiled output is identical and the bracket form only obscures. Arbitrary **values** on a real utility
prefix (`border-[Highlight]`, `text-[length:…]`) remain fine.

### Naming

Module.css local class names are **kebab-case** (`.ring-thicker`, `.shadow-16`), never camelCase — the
DOM shows kebab. The class-map generator aliases each kebab key to its camelCase form, so styles hooks
keep idiomatic dot access (`styles.ringThicker`). Hooks and tests never use bracket-string access.

### Variants

The catalog is two files and **variants are never defined in a component module** — see
[variant-catalog.md](variant-catalog.md) for the canonical form, the split test, and the minimality
rules. If a needed variant is missing, add it in `&:where([data-…])` form to whichever catalog it
belongs to, one selector per entry.

### Pseudo-elements: `content` comes free

Tailwind's `before`/`after` variants already emit `content: var(--tw-content)` into the rule they
open, and `dist/base.css` registers `@property --tw-content { syntax: "*"; inherits: false;
initial-value: "" }`. A `content-['']` inside such a block therefore writes `--tw-content` the value
it already holds. **Never author `content-['']` merely to make a pseudo-element exist** — the variant
did that. Drop it and the rule keeps its injected `content`, resolving to `""` off the initial value.

```css
/* ❌ redundant — the variant already supplies `content: var(--tw-content)`, initial-value "" */
@variant after {
  @apply absolute inset-0 content-[''];
}

/* ✅ */
@variant after {
  @apply absolute inset-0;
}
```

**The exception class — an explicit `content` is required whenever it changes the default:**

- **A different value.** `content-['_']` (MessageBarTitle's literal space), `content-['·_']`
  (RatingDisplay's separator), `content: unset` (Input `.disabled`, suppressing the focus underline).
- **Suppression, then restoration — the load-bearing pair.** A block writes `content-none` to keep a
  pseudo-element out of the box tree, and a later block writes `content-['']` to put it back.
  `--tw-content: none` lands **on the same pseudo-element**, so it outranks the `@property` initial
  value and the restoring `content-['']` is doing real work — deleting it leaves the element
  unpainted. `Avatar.module.css` is the canonical case (`.root` neutralises both pseudo-elements;
  `.ring` and `.shadow` each set theirs back), and `Tab.module.css` repeats the shape for its pending
  and selection indicators. Both carry a header comment saying so; keep it with the code.
- **A raw `&::before` / `&::after` selector.** No variant, so no injection, so the `content` is the
  only one there. Used when the variant's automatic `content` would itself be the bug — see
  `Radio.module.css`, whose indicator dot would otherwise render in every state.

`Divider.module.css`'s header comment is the canonical statement of the mechanism; read it before
adding a `content` anywhere.

### Tokens

Kebab-case theme tokens only. Never hardcode a palette value — compare against the Griffel source to
find the right token.

### Line-height never rides without font-size

- **Leading is ONE generic value-named ratio ramp — no font-size pairing implied** (AR2). A label
  is the ratio itself (`leading-140` is `1.4`, `leading-143` is `calc(20 / 14)`), never a step index
  — there is no "the leading that goes with `text-base-300`" the way there was under the old
  `leading-base-300` naming. Pick the `--leading-*` value that gives the line box you want.
- Never author a `leading-*` without a `text-*` on the same element regardless — a leading value is
  still a unitless ratio, so authored alone it multiplies whatever font-size inheritance delivers and
  the line box drifts off the ramp. Compute the ratio against the element's OWN authored font-size
  and pick (or add) the `--leading-*` label matching that ratio. `leading-000` is the one exemption —
  zero computes the same against any font-size (Spinner's root, matching Griffel's bare
  `lineHeight: 0`).
- If no existing label matches the ratio a site needs, spell it as the self-documenting fraction
  `leading-[calc(target/ownFontSize)]` in the same rule as the font-size — this is a deliberate
  escape hatch, not a dead end: `.scratch/windmod-loop/leading-ramp/census.mjs` FAILS LOUDLY on any
  `leading-*` form whose ratio matches no label in the shared ramp, so an arbitrary bracket form
  forces a ruling (either an existing label was missed, or the ratio is genuinely new and gets
  promoted into the shared ramp — label = 3-digit truncation of `ratio * 100`, collision-checked).
  Do not leave a shipped module authoring a bracket ratio the census would flag.
- Native interactive elements (`button`, `input`, `select`, `textarea`) author their `text-*` step
  even when nothing in the box visibly depends on it. Preflight resets them to `font: inherit`, so
  the component declares its metrics rather than riding the surrounding context — `Tab.module.css`
  and `InfoButton.module.css` roots are the precedent.

### Transition-property parity

Spell `transition-property` **exactly as the Griffel source authors it** — shorthands and order
verbatim, e.g. Button's `background, border, color` — never an expanded longhand list. Computed
`transition-property` preserves the author's spelling, so expansion is a real computed-value divergence
and also narrows behaviour (Griffel's `border` would animate width and style changes; a longhand list
would not). Verify per module with a computed-style equality check.

### Identical variant bodies: delete before collapsing

Sibling `@variant` blocks with identical bodies collapse to a comma list — `@variant hover,
hover-active { … }` compiles to one nested rule per member in list order, byte-identical to the
separate blocks, with per-member specificity (never a `:is()` wrap). Collapse only CONSECUTIVE
siblings: hoisting a block across an intervening sibling that touches any of the same properties
reorders the cascade.

Before collapsing, test the null hypothesis: a nested `hover`/`hover-active`/`focus` arm that only
re-asserts declarations its parent state block already carries is usually DEAD — every catalog
variant is `:where()`-flat, so the parent base (later in source than the interaction blocks it
outranks) already wins on order alone. Delete such arms rather than collapsing them, and prove the
deletion with a computed-style A/B across the pseudo-state × forced-colors matrix. The identity
custom variant (`@custom-variant self (&)`) that would let a base join a comma list compiles
safely, but no shipped site has needed it — a re-assertion arm that measures redundant is deleted
instead.

### Icon variants

Glyph styling never uses a raw `svg` type selector. Every `@fluentui/react-icons` icon stamps
`data-fui-icon` (SVG icons: empty string; font icons: `"font"`), so the generic `icon` variant
(`(& > :where([data-fui-icon]))`) selects any direct-child Fluent glyph regardless of bundling —
it is the spelling for shaping a single glyph (`display`, `text-icon-*`, `flex-none`):

```css
.icon {
  @variant icon {
    @apply block;
  }
}
```

Note it matches font icons too, and it does NOT match a consumer's arbitrary `<svg>` — that
behavioural delta vs Griffel's `& svg` is documented in MIGRATION.md (stamp `data-fui-icon` to
opt in).

The filled/regular glyph swap selects on `data-fui-icon-variant`, stamped by the headless
`bundleIcon` on each of the two sibling glyphs it renders directly inside the slot element. The
`icon-filled` / `icon-regular` variants are direct-child selectors applied to the class that owns
the glyphs — no descendant wrapper:

```css
.icon {
  @variant group-hover/fui-button {
    @variant icon-filled {
      @apply inline;
    }

    @variant icon-regular {
      @apply hidden;
    }
  }
}
```

Copy `Button.module.css`. Two constraints:

- **State-guard placement.** A group-state guard wraps the icon variants from the OWNING class's
  block, and that class must be a **descendant** of the group root. On a block anchored on the group
  root itself the compiled group check fails silently — verify with a computed-style probe before
  anchoring a guarded swap on a root class.
- **Direct-child reach.** `icon`, `icon-filled` and `icon-regular` reach only glyphs that are
  direct children of the anchor. Where the glyphs sit deeper (InteractionTagPrimary anchors on root
  appearance classes while the glyphs live inside the tag icon slot), use the glyph-self spellings
  `variant-filled` / `variant-regular` inside a `& *` wrapper — the one remaining permitted
  nested-selector form for glyphs. Never widen a catalog variant to descendant reach for such a
  site. A consumer who wraps their icon in an extra element takes the glyphs out of direct-child
  reach by design.

## Code style

- **No nested ternaries.** Never chain `? :`. A single non-nested ternary is fine.
- **Bucket ladders are condition-key lookups.** Three or more mutually exclusive branches selecting a
  class become an object literal keyed by each condition coerced to `1`/`0`, indexed by `1`. The `+()`
  is load-bearing: TS rejects a bare boolean computed key (TS2464). Two-branch selections are a plain
  ternary, not a lookup.

  ```ts
  // ✅ every range written in full, so the keys partition the domain
  const textClass = (size: AvatarSize) =>
    ({
      [+(size <= 24)]: styles.text100,
      [+(size > 24 && size <= 28)]: styles.text200,
      [+(size > 28)]: styles.text300,
    })[1];
  ```

  ```ts
  // ❌ cumulative boundaries and an implied else
  const textClass = (size: AvatarSize) =>
    ({
      [+(size <= 24)]: styles.text100,
      [+(size <= 28)]: styles.text200, // overlaps the first key — at size 20 BOTH are 1 and the
    })[1]; // later one silently wins; and sizes above 28 fall out as undefined
  ```

  Two gotchas, both fatal and both silent:
  - **Mutual exclusivity.** Unlike an if-return chain, no branch shadows a later one — every key is
    evaluated. Two true conditions both write key `1` and the last one wins. Spell out both bounds of
    every range (`size > 24 && size <= 28`), never the cumulative `size <= 28` an if-chain allowed.
  - **Explicit final bucket.** There is no `else`. The last bucket needs its own condition, and every
    member of an enum domain needs its own key — including the ones whose value is `undefined`. Miss
    one and the lookup returns `undefined` at runtime while TS still types it `string`.

  An intentionally class-less bucket is written out with an `undefined` value and a comment saying why
  (`useAvatarStyles`' 32–40 base bucket). TS then types the helper `string | undefined` on its own —
  no `satisfies` or return annotation is needed to keep the lookup honest.

- **Component shape**: a value used exactly once earns no intermediate const — destructure `props`
  directly in the parameter list when the body never references `props` itself, and pass the state object
  literal inline into the styles hook. A value used twice or more stays a named const. **Hook calls are
  the named exception**: a hook's result is always a top-of-body const, even when used once, and a hook
  call never sits inside an object literal or a call argument (`useXStyles({ ...useX(rest, ref) })`,
  `renderX(useXStyles(state))`, `mergeContextProps(useXContext(), props)` are all the banned shape). The
  names are fixed — `state` for the headless hook, `styled` for the styles hook, `contextValues` for the
  context-values hook, `context` for a context read; `base` when a derived `state` object follows.
- Match the existing files exactly: import order, `type Props`, forwardRef pattern, and the **family
  barrel** (`src/<family>.ts` re-exports the windmod component plus the headless building blocks for
  that family). `library/src/index.ts` stays `export {}` — there is no root barrel.
- Adding a component means adding its exports to its family's `src/<family>.ts`. That is the whole
  registration: `nx sync` derives the export map from `src/*.ts`, and `generate-api` follows it. A
  component in a **new** family adds one `src/<family>.ts` file; nothing else is hand-edited.
- `isConformant` reads the component→family map straight out of `src/*.ts`, so a component added to the
  wrong family (or to none) fails its `has-top-level-file` assertion rather than checking a wrong subpath.

## Comments policy

- Comments are **standalone statements**. Never reference decisions, reviews, or "we chose".
- State only constraints the code cannot show. No "what the next line does", no provenance.
- Minimal: fewer comments than code, no duplication across files — one canonical location, others may
  reference it by file ("see useButtonStyles").

## Definition of done

1. A VR scene added: shared `<X>VrScene.tsx` in `stories/src/vr/`, rendered by both a windmod and a
   Griffel story, re-exported from `vr/index.stories.tsx`, with a scene entry appended to the harness's
   `scenes.json`.
2. The gates script fully green — build, type-check, lint and test for both packages, then a static
   storybook build and the pixel diff against Griffel.

## Verification

**Where these rules live, and where the runner does not.** The VR scenes are checked in —
`stories/src/vr/` carries a `<Name>VrScene.tsx` plus its Griffel and windmod story pair per component,
and that is what a runner captures. The pixel-diff runner itself is **not** in this package: no
`pixelmatch` reference, no `scenes.json`, no gate script exists under
`packages/react-components/react-windmod-preview`. The recorded numbers and the allowance rows in
`library/MIGRATION.md` come from a harness pointed at this package from outside it.

So do not spend a cycle hunting for a command that is not there. What you can run here are the four
nx targets — `build`, `type-check`, `lint`, `test` — plus `generate-api`. Everything below is the
standard the parity work is held to and the protocol for reporting it honestly; treat a claim you cannot
currently reproduce as exactly that, and say so rather than implying a gate you did not run.

### The pixel gate

**Zero means zero, under a stated rule.** The runner diffs the two captures with pixelmatch at
threshold 0 and the default `includeAA: false`, so a scene passes at zero when it has **no
non-antialiasing differences** — pixelmatch's antialiasing classifier absorbs sub-perceptual
rasterization noise along edges. That is the gate, and it is the number to quote; it is not "no bytes
differ". The computed-style parity passes are what catch the class of divergence pixel counting
cannot see, which is why both run.

There is no tolerance band on top of it. If a diff is genuinely impossible to close, document it and
stop — never loosen the threshold.

### The allowance protocol

A scene may carry an explicit `allowedStrictDiff` only under all four of these:

1. **A control first.** A reproducing control — Griffel-vs-Griffel, or self-vs-self — must bound the
   residue as browser noise. Build the control _before_ proposing the allowance, not to justify one
   already written.
2. **An identity control is the strong form.** Force the reference's own compositing conditions onto
   itself and diff that against the gate's reference capture. When it reproduces the residue
   pixel-for-pixel (full overlap, zero control-only and zero gate-only pixels) the CSS is proven
   exactly correct and the diff is pure rasterization.
3. **Decomposed, not just bounded.** Every allowance names a specific mechanism and a pixel count per
   mechanism. A diff that does not decompose the documented way fails the scene **even when it sits
   under the ceiling**. An allowance is never a tolerance band.
4. **No self-granting.** Ratification is a reviewer's call, never the implementer's — measure,
   decompose and recommend. Raising a ceiling to make one's own cycle pass is the failure this rule
   exists to prevent. A residue with no bounding control, or one exceeding its control, is a real
   diff: stop the cycle.

A `--disable-gpu` re-run is evidence, not a cleaner baseline. Some scenes get **noisier** without the
GPU; where they do, the GPU number stays authoritative and the no-GPU row is recorded as what it is.
A no-GPU number is never the GPU number minus a component.

If a plan flags a specific cell as an open risk, confirm that cell is actually in the captured set
before trusting a zero — a band that omits the flagged cell cannot adjudicate the risk it raised.

### Mutation testing — name the harness per row

**Spec quality bar: mutation-tested.** Deleting any class from a `clsx` call, breaking any stamped
attribute, or mutating pass-through state must each fail at least one test — verified by **running**
the mutation, not by reading the tests. Every D1 glyph consumer additionally carries a frozen-state
test through the shared test-only `testing/freezeState.ts` helper.

Two honesty rules make the table mean something:

- **Every row names its harness** — `jest`, `browser probe`, or `VR`. A CSS-only mutation has no
  possible jest guard, and a table that files it under jest is claiming coverage that does not exist.
  ❌ "M18 — fails the spec" when the change is invisible to jsdom. ✅ "M18 — `browser probe`; computed
  `min-width` reverts to 96px".
- **Assert the green baseline first, and label the unkillable.** A row that cannot fail by
  construction (a no-op mutation, a declaration with no observable effect) is recorded as
  **unkillable by construction** with the reason. Quietly dropping it inflates the kill rate.

### Probe hygiene

- **Browser-behaviour claims are measured**, never asserted from byte inspection of source or compiled
  CSS. Every claim labelled "measured" must point at a probe artifact that exists — script _and_
  recorded output. Citing a run that was never recorded is fabrication even when the conclusion turns
  out to be true.
- **Never trust a piped exit code.** A pipeline's status is the _last_ command's, so
  `nx run …:build | tail` reports `tail`'s success and hides a failed pre-task — once leaving a stale
  `dist/` that polluted a CSS diff with ~22 phantom removals. Check per-step exit codes, or the
  harness's `report.json`, never the tail. The same trap has bitten builds and sweeps alike.
- **Prettier reads `.gitignore` as an ignore path.** A plain `prettier --check` on anything under
  `.scratch/` therefore passes _without reading the file_. Probe runs need `--ignore-path <empty
file>`. And a formatting verdict on a probe copy never transfers to the shipped module: the Tailwind
  plugin sorts against the resolved entry stylesheet, and a probe's `@reference` line differs by
  construction. Check the **shipped** `module.css`.
- **Calibrate ident-hash probes** against a shipped component's real `lib/**/*.module.css.js` hash
  before trusting a prediction. The digest seeds on the path relative to `library/src` (no `src/`
  prefix). Enumerate module files **recursively** — a one-level glob silently misses nested pair
  components — and count `@keyframes` names, which postcss-modules scopes as locals too.
- **Type probes resolve through built `.d.ts`.** A tsconfig without explicit `paths` resolves
  `@fluentui/*` through `node_modules` symlinks to each package's build output, so a source-type edit
  is **inert** until that package (and any re-exporting package) rebuilds. State the resolution mode
  in the artifact. Related: `@ts-expect-error` inside a multi-line JSX comment does not suppress —
  pins must be single-line.
- `generate-api` replays a stale nx cache after a subpath is added. Run it with `--skip-nx-cache` and
  verify the new `etc/<component>.api.md` was actually emitted.

### The jest ident hazard

`generateTestIdent` drops the component token, so under jest a composed component's local class names
collide with its composee's **as strings** — `Field`'s `.root` and `Label`'s `.root` compare equal —
while the real built idents differ. Bare class-name equality is therefore not a test.

```tsx
// ❌ passes for the wrong reason under jest
expect(field.className).toContain(labelStyles.root);

// ✅ structural, or by count
expect(field.querySelectorAll(`.${styles.root}`)).toHaveLength(2);
```

Every re-slot composition must disambiguate **structurally** — by element, by marker pair, by
occurrence count — never by a bare class-name comparison.

## Scope

Replicate **only** what the headless component ships. Do not invent props or features the Griffel
component has but headless lacks; do not add speculative abstractions.

**The generic catalog is vocabulary, not permission.** `variants.css` defines `size-huge` and
`size-full` because _some_ component needs them; that a variant name resolves says nothing about whether
the component in front of you may adopt it. Before adding a value to any look-prop union, read the prop's
type on the Griffel twin in `packages/react-components/react-<name>` — if Griffel's `size` stops at
`extra-large`, so does windmod's, however available `size-huge` looks. This is the easiest way to write
a change that compiles, renders, passes review-by-eyeball, and is still out of scope.

Check the value does not already exist before planning to add it. Sizes and appearances arrived with
their components rather than one at a time, so the union in `<Name>.types.ts` is the fastest answer to
"is this already here", and it is a cheaper read than the CSS.
