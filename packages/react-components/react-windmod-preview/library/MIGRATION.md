# Migrating from `@fluentui/react-components` to `@fluentui/react-windmod-preview`

This guide is for an engineer (or an agent) moving an app off the Griffel-styled Fluent v9 suite and onto
windmod. It covers what stays the same, every place the two libraries deliberately part ways, and what is
not in the package yet.

## What windmod is

windmod is the Fluent v9 visual contract rebuilt on **Tailwind v4 + CSS Modules** instead of Griffel. Each
component composes the same headless hooks Fluent's own components use
(`useX` → `useXStyles` → `renderX`) with CSS compiled at build time. There is no runtime style injection,
no `@griffel/react` in the dependency graph, and no `makeStyles` to migrate.

The goal is a drop-in reskin, not a redesign. Components render the same DOM and take the same props as
their Griffel counterparts, and every shipped component is compared against its Griffel twin
pixel-for-pixel at a **zero-difference** threshold — 41 side-by-side scenes, one exception, documented
under [Tooltip](#27-tooltips-arrow-sits-differently-on-corner-placements).

> **Preview.** This package tracks `@fluentui/react-headless-components-preview`, which is itself in
> preview. APIs may change without notice and coverage is limited to the components the headless package
> ships. Not production-ready.

## Installation and imports

```sh
npm install @fluentui/react-windmod-preview @fluentui/react-tailwind-theme-preview
```

Two stylesheets, both loaded once per document:

```js
// The theme: palette, type ramp, spacing scale, and the seven theme classes. Load it before your own CSS.
import '@fluentui/react-tailwind-theme-preview/styles.css';

// The component styles. ESM consumers get this automatically as a side effect of importing any
// component; CommonJS and some SSR setups need it explicitly.
import '@fluentui/react-windmod-preview/styles.css';
```

Then swap the import specifier:

```diff
-import { Button, FluentProvider, Tooltip, webDarkTheme } from '@fluentui/react-components';
+import { Button, FluentProvider, Tooltip, webDarkThemeClassName } from '@fluentui/react-windmod-preview';
```

```tsx
import { Button, FluentProvider, Tooltip, webDarkThemeClassName } from '@fluentui/react-windmod-preview';

export const App = () => (
  <FluentProvider theme={webDarkThemeClassName}>
    <Tooltip content="Save the document" relationship="label">
      <Button appearance="primary">Save</Button>
    </Tooltip>
  </FluentProvider>
);
```

### The subpath map

The root barrel `@fluentui/react-windmod-preview` exports everything. Every component also has its own
subpath, which is the recommended route for tree-shaking-sensitive apps. **A component subpath exports only
that component** — there are no family barrels, so `CardHeader` comes from `./card-header`, not `./card`.

```tsx
import { Button } from '@fluentui/react-windmod-preview/button';
import { Card } from '@fluentui/react-windmod-preview/card';
import { CardHeader } from '@fluentui/react-windmod-preview/card-header';
import { CardPreview } from '@fluentui/react-windmod-preview/card-preview';
```

85 component subpaths ship, all kebab-case:

| Family        | Subpaths                                                                                                                                        |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Accordion     | `./accordion` `./accordion-header` `./accordion-item` `./accordion-panel`                                                                       |
| Breadcrumb    | `./breadcrumb` `./breadcrumb-button` `./breadcrumb-divider` `./breadcrumb-item`                                                                 |
| Buttons       | `./button` `./compound-button` `./menu-button` `./split-button` `./toggle-button`                                                               |
| Card          | `./card` `./card-footer` `./card-header` `./card-preview`                                                                                       |
| Color picking | `./color-picker` `./color-area` `./color-slider` `./alpha-slider` `./color-swatch`                                                              |
| Swatches      | `./swatch-picker` `./swatch-picker-row` `./empty-swatch` `./image-swatch`                                                                       |
| Form controls | `./checkbox` `./input` `./radio` `./radio-group` `./search-box` `./select` `./slider` `./spin-button` `./switch` `./textarea`                   |
| Field & label | `./field` `./label`                                                                                                                             |
| Messaging     | `./message-bar` `./message-bar-actions` `./message-bar-body` `./message-bar-title`                                                              |
| Nav           | `./nav` `./nav-category` `./nav-category-item` `./nav-divider` `./nav-item` `./nav-section-header` `./nav-sub-item` `./nav-sub-item-group`      |
| People        | `./avatar` `./avatar-group` `./avatar-group-item` `./avatar-group-popover` `./persona`                                                          |
| Popover       | `./popover` `./popover-surface` `./popover-trigger`                                                                                             |
| Rating        | `./rating` `./rating-display` `./rating-item`                                                                                                   |
| Skeleton      | `./skeleton` `./skeleton-item`                                                                                                                  |
| Tabs          | `./tab` `./tab-list`                                                                                                                            |
| Tags          | `./tag` `./tag-group` `./interaction-tag` `./interaction-tag-primary` `./interaction-tag-secondary`                                             |
| Toolbar       | `./toolbar` `./toolbar-button` `./toolbar-divider` `./toolbar-group` `./toolbar-radio-button` `./toolbar-radio-group` `./toolbar-toggle-button` |
| Content       | `./badge` `./divider` `./image` `./link` `./progress-bar` `./spinner` `./tooltip`                                                               |
| Provider      | `./fluent-provider`                                                                                                                             |

Three non-component subpaths:

| Subpath          | What it is                                                                                            |
| ---------------- | ----------------------------------------------------------------------------------------------------- |
| `./styles.css`   | the compiled component stylesheet                                                                     |
| `./variants.css` | the component-specific variant catalog, so your own Tailwind CSS can compose against windmod's states |
| `./package.json` | —                                                                                                     |

If you were importing from an internal Fluent package directly (`@fluentui/react-button`,
`@fluentui/react-overflow`, …), note that `@fluentui/no-restricted-imports` blocks that route; the barrel
or the component subpath is the sanctioned entry point either way.

## What is identical

- **The DOM.** Element structure, slot names, `role`s and ARIA wiring match Griffel's, because both
  libraries render through the same headless renderers.
- **The props.** Every component's props are the headless props plus the same look props Griffel takes
  (`appearance`, `shape`, `size`, `orientation`, …) with the same defaults. `ButtonProps`, `FieldProps`,
  `TooltipProps` and the rest are assignable from your existing call sites unless listed under
  [What differs deliberately](#what-differs-deliberately).
- **The pixels**, at the default 16px root font size. Rest-state rendering is byte-identical across the
  shipped matrix, including high-contrast (forced-colors) rules, RTL, and the icon glyph swaps.
- **Context behaviour.** Components read their own contexts the way Griffel's do: `ButtonContext`,
  `LinkContext`, `AvatarContext`, `TagGroupContext`, `InteractionTagContext`, `FieldContext`. A `Button`
  inside `MessageBarActions`, a `Tag` inside a `TagGroup`, an `Avatar` inside a `Persona` all pick up the
  container's `size`/`appearance` without being told. (One merge rule differs — see
  [delta 22](#22-a-local-prop-beats-a-context-value).)
- **TabList's animated indicator**, ported mechanism-for-mechanism: measured rects → custom properties →
  CSS transition.
- **Slot `className` merging.** Your class lands last on every slot, as it does today.

## What differs deliberately

Thirty-seven differences, each one a decision rather than a defect.

### Setup and API surface

#### 1. `theme` is a CSS class name, not a theme object

Griffel's provider takes a JS theme object and writes CSS custom properties at runtime. windmod's applies a
class; the variables are already in the stylesheet.

```diff
-import { FluentProvider, webDarkTheme } from '@fluentui/react-components';
-<FluentProvider theme={webDarkTheme}>
+import { FluentProvider, webDarkThemeClassName } from '@fluentui/react-windmod-preview';
+<FluentProvider theme={webDarkThemeClassName}>
```

All seven themes ship as class names —`webLightThemeClassName`, `webDarkThemeClassName`,
`teamsLightThemeClassName`, `teamsDarkThemeClassName`, `teamsHighContrastThemeClassName`,
`teamsLightV21ThemeClassName`, `teamsDarkV21ThemeClassName` — plus a `themeClassNames` record and a
`ThemeClassName` type:

```tsx
import { themeClassNames, type ThemeClassName } from '@fluentui/react-windmod-preview/fluent-provider';

export const pickTheme = (dark: boolean): ThemeClassName =>
  dark ? themeClassNames.webDarkTheme : themeClassNames.webLightTheme;
```

**If you built a custom theme** by passing a modified theme object, port it to a CSS class that redeclares
the token custom properties. `theme` accepts any string, so your own class name works:
`<FluentProvider theme="my-brand-theme">`.

#### 2. The theme stylesheet is a separate, required import

`@fluentui/react-tailwind-theme-preview/styles.css` carries the palette, type ramp, spacing scale and the
theme classes. Nothing renders correctly without it. Load it before your own CSS so your rules stay
unlayered (see [delta 10](#10-cascade-layers-replace-specificity-juggling)).

#### 3. The provider is a real element, and it paints

`FluentProvider` renders a `div` carrying the base typography, text colour and
`background-color: var(--color-neutral-background-1)`. Two consequences:

- **Layout.** If you wrap children in a provider _inside your own flex or grid container_, the provider is
  now the single flex/grid item, not the children. Griffel's provider has always been a real div, so an app
  migrating from `@fluentui/react-components` already accounts for this — but an app migrating from an
  earlier windmod preview does not.
- **Paint.** A provider dropped onto a coloured surface repaints that surface. Set `background: transparent`
  via `className` if that is not what you want.

`targetDocument` and `dir` are supported. `customStyleHooks_unstable`, `overrides_unstable` and
`applyStylesToPortals` are not.

#### 4. There is no `useCustomStyleHook_unstable`

Griffel's per-component style-hook override escape hatch has no windmod counterpart, on any component.
Restyle through CSS instead — [delta 10](#10-cascade-layers-replace-specificity-juggling) explains why that
is now the easier path.

#### 5. Public class names are lower-case, and `classNames.root` is a pair

Each component root carries **two** public classes: `fui-button` (the identity class — safe for your CSS
and for `querySelector`, no escaping needed) and `group/fui-button` (Tailwind's named-group class).
Everything else is a hashed ident.

```diff
-.fui-Button { /* Griffel */ }
+.fui-button { /* windmod */ }
```

The exported `buttonClassNames.root` is the whole **space-separated pair**, not a single class. Use it in
`className`, not in a selector:

```tsx
import { buttonClassNames } from '@fluentui/react-windmod-preview/button';

buttonClassNames.root; // "fui-button group/fui-button"
document.querySelectorAll('.fui-button'); // ✅
document.querySelectorAll('.' + buttonClassNames.root); // ❌ invalid selector
```

The class-name records expose `root` only. Griffel's per-slot entries (`fui-Button__icon` and friends) have
no equivalent: internal slots use hashed idents and `data-*` state attributes (`data-open`, `data-size`,
`data-placement`, `data-appearance`, …). Target slots through the group variants instead:

```tsx
<Button disabled>
  <span className="group-disabled/fui-button:line-through">Send</span>
</Button>
```

No `group` name declaration is required — the marker is already on the root. You may still add your own
`group/name` via `className` to disambiguate nested instances.

#### 6. Component subpaths are single-component

See [the subpath map](#the-subpath-map). `import { CardHeader } from '.../card'` does not resolve.

#### 7. `Input` and `Textarea` drop the deprecated shadow appearances

`InputAppearance` is `'outline' | 'underline' | 'filled-darker' | 'filled-lighter'` and
`TextareaAppearance` is `'outline' | 'filled-darker' | 'filled-lighter'`. Griffel's deprecated
`filled-darker-shadow` and `filled-lighter-shadow` are not shipped. Map them to their non-shadow twins.

#### 8. `required` renders no asterisk on `Checkbox` and `Switch`

The headless controls ship no asterisk element, and windmod does not invent one. The `required` attribute
still reaches the native input, so validation and assistive-technology behaviour are unchanged; only the
visual `*` is missing. If you need it, wrap the control in a `Field` with `required`, whose `Label` does
render one.

### The styling model

#### 9. Everything scales with the root font size

Griffel writes literal pixels. windmod puts spacing, control heights, radii and the whole type ramp on a
single density knob:

```css
--base-scale: calc(1rem / 16px);
--spacing: calc(1px * var(--base-scale));
--text-base-300: calc(14px * var(--base-scale));
```

At the default 16px root font size the two libraries are identical — that is the parity condition. Change
`html { font-size: … }` and the whole windmod UI scales coherently where Griffel's would only move its
text. This is an improvement, but it _is_ a difference: if your app sets a non-16px root font size, expect
windmod controls to be larger or smaller than the Griffel ones they replace. Keep the root font size at
16px to keep the two libraries pixel-aligned; `--base-scale` and the scales derived from it are declared at
the document root, so any override has to go there too, not on a provider or a subtree.

A handful of literals stay fixed by design where Griffel is also fixed (stroke widths, a few 1px nudges).

#### 10. Cascade layers replace specificity juggling

Every package style lives inside a `fui.*` cascade layer. Your CSS is unlayered, and **unlayered CSS beats
layered CSS regardless of selector weight**. Overriding a component is now a one-class rule with no
`!important` and no specificity arms race:

```css
/* wins over the component's own layered rules */
.my-brand-button {
  background-color: rebeccapurple;
}
```

```tsx
<Button className="my-brand-button">Continue</Button>
```

The corollary: **do not wrap your overrides in a `@layer`**, or you will lose the contest you used to win.

#### 11. Spacing tokens are inlined at build time

Tailwind's `--spacing-*` namespace resolves at compile time, so a rule that reads
`var(--spacingHorizontalM)` in Griffel reads `calc(var(--spacing) * 12)` in windmod. Redeclaring a Fluent
_spacing_ token at runtime therefore does not move windmod's layout. Colour, typography and stroke tokens
are still live `var()` references and can be overridden at runtime as before; use `--base-scale` for
density.

#### 12. Some computed style strings differ without any visual difference

Tailwind's shadow and ring utilities prepend fully transparent layers, so
`getComputedStyle(el).boxShadow` returns a longer string than Griffel's `var(--shadow4)` — same painted
result. `shadow-none` likewise computes to five transparent layers rather than the literal `none`. Snapshot
tests that assert on computed `box-shadow` strings need updating; nothing about the rendering does.

#### 13. Text alignment is logical, not physical

The provider sets `text-align: start` where Griffel compiles a `left`/`right` pair. Identical whenever an
element's direction matches the provider's. The one divergence is a `dir`-flipped subtree inside a provider
of the opposite direction: windmod follows the subtree (correct i18n behaviour), Griffel stays physically
left.

### Focus and keyboard

#### 14. Focus rings follow the browser, not keyborg

Griffel gates focus rings on keyborg, a script that stamps a `data-fui-focus-visible` attribute during
**Tab** navigation. windmod uses the browser's own `:focus-visible` / `:has(:focus-visible)`. Measured
equivalent for non-text controls, with two edges where the native heuristic is more generous:

- **Keyboard, then click.** Focus a control with Tab, then click it: the ring persists under windmod and
  disappears under Griffel.
- **Click, then arrow key.** Click a radio or slider, then press an arrow: the ring appears under windmod
  and does not under Griffel.

Text-editable controls (`Input`, `Textarea`, `SearchBox`) ring on click on both libraries. Neither edge is a
defect; both are native `:focus-visible` semantics. No action needed unless you have visual tests that
capture focus.

#### 15. Arrow-key navigation comes from `focusgroup`, not tabster

`Toolbar`, `TabList`, `Nav`, `TagGroup` and `SwatchPicker` publish the `focusgroup` attribute where Griffel
emits a `data-tabster` mover configuration. Behaviour is broadly equivalent but not identical, and
`focusgroup` needs browser support or a polyfill. This is the headless layer's choice; windmod passes it
through.

#### 16. `Accordion`'s `navigation` and `BreadcrumbButton`'s `focusMode` do nothing

Both props are absent from the headless surface, so TypeScript rejects them. Arrow-key navigation inside an
Accordion or a Breadcrumb is simply not present. If a JS caller passes `navigation="circular"` anyway, it
lands on the DOM as an unknown attribute rather than being interpreted.

#### 17. `TagGroup` does not restore focus after a dismiss

Griffel moves focus to the neighbouring tag when the focused tag is dismissed. The headless base hook has
no such wrapper, so focus drops to the document. Handle it in your `onDismiss` if the interaction matters:
move focus yourself before the tag unmounts.

### Motion and mounting

#### 18. `Accordion` has no collapse animation

The headless panel drops the presence wrapper that carried Griffel's 200ms height + opacity collapse.
Panels open and close instantly.

#### 19. `Accordion` keeps closed panels mounted — state persists

Griffel unmounts a closed panel. windmod hides it (`display: none`, plus `inert` and `tabIndex=-1` from the
headless layer). **A closed panel's React state, uncontrolled input values, scroll position and running
timers all survive a close/open cycle**, where Griffel would have thrown them away.

This is usually what people want, but it is a real behavioural change: if you relied on unmount to reset a
form inside a panel, reset it explicitly, or key the panel's children on the open state.

#### 20. `Nav` has no category collapse motion, and an open sub-item group clips

Opening a category is instantaneous. Griffel's collapse motion leaves an open `NavSubItemGroup` at
`overflow-y: auto`; windmod's stays `overflow: hidden`. In every unconstrained case the group is
content-sized and the two are indistinguishable. **If you height-constrain a `NavSubItemGroup`, Griffel
gives you a scrolling box and windmod gives you a clipping one.** Add `overflow-y: auto` yourself if you
constrain the height.

#### 21. `MessageBar` has no group animation and does not announce

- `MessageBarGroup` is not shipped: the headless package has none, and Griffel's has no visual contract to
  reskin. A windmod `MessageBar` cannot be animated into or out of a group, and placing one inside a
  Griffel `MessageBarGroup` will not wire up the motion ref either.
- A windmod `MessageBar` does not call `announce()` — windmod's provider supplies no announce context, so
  the call is a no-op. Nest windmod inside a Griffel `FluentProvider` if you need the live region, or
  announce yourself.

### Composition and context

#### 22. A local prop beats a context value

Where Griffel spells `size = contextSize ?? 32` (context wins even over an explicit prop), windmod's merge
helper gives the **local prop** priority and falls back to context. Callbacks compose rather than replace
(context first, then local), `className` concatenates with yours last, and `style` spreads the same way.

Concretely: an `Avatar` with an explicit `size` inside a container publishing a different size keeps its own
size under windmod and takes the container's under Griffel. If you were relying on a container to override
explicit sizes, remove the explicit prop.

#### 23. `Field` does not push `size` into its control

`Field` sizes its own `Label` and layout but does not propagate `size` to the control it wraps.
`aria-invalid` and `required` do propagate. Measured cost of the gap: 8px of control height and 2px of font
size at both `small` and `large`.

Pass `size` to both:

```tsx
<Field label="Name" size="small">
  <Input size="small" />
</Field>
```

#### 24. A nested `Field` renders its label with the outer Field's orientation and size

Griffel does not. Avoid nesting `Field`s, or set the inner label's props explicitly.

#### 25. `Card` selection is not focus-aware

Griffel builds a focus-aware predicate so that clicking a focusable element _inside_ a selectable card does
not toggle the card. The headless surface exposes `shouldRestrictTriggerAction` but supplies no default, so
a windmod selectable `Card` toggles on any inner click. Supply the predicate yourself if the card contains
interactive content.

Relatedly, `focusMode` and the tabster groupper are absent by construction: a windmod `Card` is never
focusable by itself and never traps Tab.

### Browser and network behaviour

#### 26. Anchored components require CSS anchor positioning — with no fallback

The headless positioning layer uses native CSS anchor positioning (`anchor-name`, `position-area`,
`position-try-fallbacks`). There is **no** `@supports` guard, no feature detection, no polyfill and no
floating-ui fallback path anywhere in it.

**On a browser without CSS anchor positioning the surface renders unpositioned at the viewport origin.** As
of today that means Firefox and Safari. `Tooltip` and `Popover` are the anchored components this package
ships, so the exposure is bounded to them, but it is total on those engines. The measured displacement for
an unpositioned Popover surface is dx −1016.953, dy −419 from its trigger.

If you must support them, either polyfill CSS anchor positioning, or keep `Tooltip` and `Popover` on
`@fluentui/react-components` — both compose over windmod children without trouble.

#### 27. `Tooltip`'s arrow sits differently on corner placements

Griffel's floating-ui centres the arrow on the target; CSS anchor positioning pins it near the edge. On the
aligned corner placements (`above-start`, `below-end`, and their siblings) the arrow is displaced by
roughly **−36.6px / +35.0px** relative to Griffel. Surfaces also land on fractional device pixels where
floating-ui writes integer transforms, a 0.047–0.375px offset that shifts glyph rasterization.

Both CSS routes to close the arrow gap (`anchor-center`, an `anchor-size()` clamp) were measured and
neither works. Edge-centred placements (`above`, `below`, `before`, `after`) are unaffected. This is the one
component with a non-zero pixel allowance in the parity gate.

#### 28. The `AlphaSlider` checkerboard is inlined — it works offline

Griffel fetches the transparency checkerboard from a CDN. windmod embeds the same 94-byte PNG as a `data:`
URI in its stylesheet, byte-for-byte identical to the asset Griffel downloads.

Consequence: on an **offline, air-gapped or CSP-restricted origin the windmod `AlphaSlider` paints its
checkerboard and the Griffel one does not**, and windmod issues no network request for it at all. A
deliberate improvement; listed here because it is a behavioural difference you may be measuring.

### AvatarGroup

#### 29. The overflow button's ARIA is different

It carries `aria-haspopup="true"`; Griffel's carries a `data-tabster` focus-restorer instead. The accessible
name (`View more people.`) and `aria-expanded` are identical on both. A snapshot test pinning the button's
attributes needs updating.

#### 30. A consumer's own trigger-button children are honoured

Griffel overwrites `triggerButton.children` with its glyph whenever `indicator="icon"`, discarding whatever
the consumer passed. windmod follows the library-wide default-glyph rule: the glyph is a fallback, and
consumer children always win. `triggerButton={{ children: null }}` falls back to the glyph on both
libraries, so only a non-nullish value diverges.

#### 31. The overflow popover no longer traps focus by default

Griffel's `AvatarGroupPopover` set `trapFocus: true`. The headless surface forwards `trapFocus` but leaves
it unset, and windmod does not add a default, because turning it on switches the native `<dialog>` from
`popover="auto"` to `showModal()` and makes the rest of the page inert. Pass `trapFocus` explicitly to
restore the old behaviour.

#### 32. `AvatarGroupItem` no longer reads the provider direction

Griffel's item calls `useFluent()` and merges a second class set under RTL; windmod's pie geometry is
direction-aware in CSS. Behaviour is identical inside a provider; outside one, windmod follows the
document's actual `dir` while Griffel falls back to `ltr`.

#### 33. The overflow popover's arrow is off-centre on aligned placements

`withArrow` is forwarded and not defaulted on either library, so no arrow renders out of the box. If you
opt in on an aligned placement (`above-start`, `below-end`, `before-top`, `after-bottom`), the arrow's
cross-axis position sits a fixed 8px from the aligned edge rather than centred on the trigger, because CSS
anchor positioning has no equivalent of floating-ui's arrow middleware — the same mechanism as
[delta 27](#27-tooltips-arrow-sits-differently-on-corner-placements). Centred placements are pixel-exact.

### Popover surfaces

These four apply to every component built on `PopoverSurface` — `Popover`, `Tooltip` and the
`AvatarGroup` overflow popover.

#### 34. A focus-trapping surface carries no `aria-modal`

Griffel sets `aria-modal` when `trapFocus` is on. The headless surface is a native `<dialog>` opened with
`showModal()`, and `dialog:modal` already conveys modality to assistive technology, so no attribute is
written. An assertion pinning `aria-modal` needs updating; the announced modality is unchanged.

#### 35. There is no enter motion

Griffel fades and slides its surface in (`appear: true`). The headless surface ships no motion slot and
windmod adds none, so the surface appears at its final position immediately. Nothing about the resting
render differs.

#### 36. A surface outside every provider reads the document root's theme

The surface is rendered inline and promoted to the top layer, so it inherits theme variables from its
position in the DOM. A trigger that sits outside every `FluentProvider` therefore renders its surface with
the document root's theme. Griffel's portalled surface has the same fallback for a different reason — it
derives its theme from React context. Wrap the trigger in a `FluentProvider` to control the surface's
theme.

#### 37. The surface inherits arbitrary CSS from its DOM ancestors

Because the surface stays where it is written, any inherited property set on an element between the
provider and the trigger — `letter-spacing`, `text-transform`, `font-variant`, a `color` on a wrapper —
reaches it. Griffel's portalled surface sees none of it; only the theme class travels with the portal. If
you relied on a portal isolating the surface from an ancestor's inherited styles, set those properties
explicitly on the surface.

## What is not shipped

windmod reskins what the headless package ships and invents nothing. These have no windmod component:

| Not shipped                                                                                         | Why                                                                                                                                     |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `Menu` and family                                                                                   | headless ships it, windmod has not reskinned it yet; keep it on `@fluentui/react-components`                                            |
| `Dialog`, `Drawer`                                                                                  | as above                                                                                                                                |
| `Combobox`, `Dropdown`, `Option`, `OptionGroup`                                                     | as above                                                                                                                                |
| `TagPicker` and family                                                                              | as above                                                                                                                                |
| `TeachingPopover`, `Toast`/`Toaster`, `InfoLabel`                                                   | as above                                                                                                                                |
| `Text` and the typography components, `Table`/`DataGrid`, `Tree`, `Carousel`, `Virtualizer`, `List` | no headless counterpart                                                                                                                 |
| `MessageBarGroup`                                                                                   | no headless counterpart, and no visual contract to reskin (see [delta 21](#21-messagebar-has-no-group-animation-and-does-not-announce)) |
| `Overflow` and family                                                                               | **scoped out permanently** — see below                                                                                                  |
| `Persona`'s `presence` slot and `presenceOnly` prop                                                 | the headless surface omits both; a windmod `Persona` cannot render a presence badge                                                     |

All of these compose over windmod components without a shim: they are Griffel-styled containers around
windmod-styled children, and nothing in either library's CSS fights the other.

### `Overflow` will never be ported, and needs no migration step

Keep importing it from `@fluentui/react-components`:

```tsx
import { Overflow, OverflowItem, useOverflowMenu } from '@fluentui/react-components';
import { Button } from '@fluentui/react-windmod-preview';
```

`Overflow` is renderless. It emits no element of its own — it clones its single child, drives the
priority-overflow engine over that child's subtree, and stamps `data-overflowing`, `data-overflow-item`,
`data-overflow-menu`, `data-overflow-divider` and `data-overflow-group`. A windmod port reskins a headless
component, and a component with no skin has nothing to reskin.

The whole Griffel `Overflow` family ships **two** CSS declarations, both token-free and theme-free:

```css
[data-overflowing] {
  display: none;
}
[data-overflow-menu] {
  flex-shrink: 0;
}
```

Neither says anything about how the items _look_, which is exactly why they are as correct over
windmod-styled items as over Griffel-styled ones. This was measured, not assumed: eight windmod `Button`s
driven across eight container widths, the count of items the engine marked `data-overflowing` equalling the
count the browser actually gave `display: none` at every width, the `+N` trigger appearing with the right
count, no horizontal spill, and full reversal on widening. The cascade win is structural — the component's
own `display: inline-flex` is layered and `[data-overflowing] { display: none }` is unlayered.

The README's **Overflow** section carries the full worked example, including the Griffel-free
`@fluentui/react-headless-components-preview/overflow` route and the two declarations you must supply
yourself if you take it.

## Known issues that affect both libraries

These live in shared upstream code, so windmod is at exact parity with `@fluentui/react-components` on each
one. They are listed because they are consumer-actionable, not because migrating causes them.

- **`InteractionTagPrimary` silently loses selection when you pass `onClick`.** The base hook spreads
  `...props` _after_ its own merged `onClick`, so your handler **replaces** the selection call instead of
  composing with it. Worse, `onClick={undefined}` — what forwarding an optional prop produces — loses both
  the consumer call and the selection. Work around it by calling the selection yourself, or by never
  forwarding an `onClick` that may be `undefined`.
- **`BreadcrumbButton`'s `as` prop is mis-parsed.** The element type resolves as
  `as ?? href ? 'a' : 'button'`, which parses as `(as ?? href) ? 'a' : 'button'` — so any truthy `as`
  (including `as="button"`) yields an `<a>`, and the `as` value itself is never used. Set `href` to get an
  anchor and omit `as`.
- **`SwatchPicker` and `SwatchPickerRow` discard a consumer `style`.** Both base hooks destructure `style`
  out of props and never re-apply it. Use `className` instead.
- **A vertical `AlphaSlider` reports a horizontal orientation to assistive technology.** Its base hook omits
  `role="group"` on the root and `min` / `max` / `tabIndex` / `aria-orientation` on the input, all of which
  the sibling `ColorSlider` sets. Supply them through the slots if you ship a vertical alpha slider.
- **A consumer cannot override `ColorArea`'s progress custom properties.** The two slider hooks spread
  `{...hookVariables, ...style}` (consumer wins) while `ColorArea` spreads them the other way round (hook
  wins), so `--fui-Slider--progress` is overridable and `--fui-AreaX--progress` is not.
- **`SpinButton`'s held-mouse spin does not report its spin state.** The mouse path writes to an internal
  field that is never exposed, so a pressed look driven by that state never applies while the pointer is
  held. Keyboard-held spins are unaffected.
- **A disabled `ColorSwatch` loses its 1px border on hover.** The hover reset is not undone by the disabled
  rule, so the swatch outline disappears under the cursor while `cursor: not-allowed` still shows.
  Reproduced faithfully from Griffel.

### Mixing windmod with `@fluentui/react-components`

Griffel containers around windmod children work. The reverse — a windmod child inside a _headless_ (unstyled)
container — has gaps, because a windmod component reads the **windmod** context and only a windmod container
publishes it:

- A windmod `Tag` inside a headless `TagGroup` or `TagPickerGroup` falls back to `filled` / `medium`.
- A windmod `InteractionTagPrimary` or `InteractionTagSecondary` inside a headless `InteractionTag` falls
  back to `filled` / `rounded` / `medium`.
- A windmod `NavItem` inside a headless `Nav` gets `density: 'medium'` regardless of the Nav's props.

Use windmod containers for windmod children, and the values propagate normally.
