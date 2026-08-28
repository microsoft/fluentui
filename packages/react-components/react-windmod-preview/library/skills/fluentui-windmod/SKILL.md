---
name: fluentui-windmod
description: Use when styling, theming or overriding Fluent UI components from @fluentui/react-windmod-preview or @fluentui/react-tailwind-theme-preview, when authoring or verifying component styles inside those packages, or when users say "style this Fluent component", "override the button styles", "theme this app", "switch to dark theme", "restyle windmod", "fui-button", "group variant", "cascade layer", or when working with .module.css files in a windmod project or migrating an app off @fluentui/react-components and Griffel. Provides the override model (cascade layers, not props), the public class and data-attribute surface, the variant catalog, theme class names, the base-scale density knob, and the authoring and verification conventions used inside the library itself.
license: MIT
metadata:
  author: fluentui
  version: '0.1.0'
  library: '@fluentui/react-windmod-preview'
  library_version: '0.1.0'
---

# Fluent windmod

Expert knowledge for styling with `@fluentui/react-windmod-preview` — the Fluent v9 visual contract
rebuilt on **Tailwind v4 + CSS Modules** instead of Griffel. Styles are compiled at build time. There
is no runtime style injection, no `makeStyles`, and no `@griffel/react` in the dependency graph.

Two audiences, one skill:

- **Consumer** — using, extending and overriding windmod styles in an application. Start at
  [The override model](#the-override-model).
- **Contributor** — authoring component styles inside the library. Load
  [references/authoring-conventions.md](references/authoring-conventions.md); nothing else here
  licenses a change to a `*.module.css` in the package.

## NEVER Do When Styling with windmod

- **NEVER wrap your overrides in `@layer`** — every package style lives inside a `fui.*` cascade
  layer, and unlayered CSS beats layered CSS regardless of selector weight. Your plain
  `.my-button { background-color: rebeccapurple; }` already wins. Putting it in a layer forfeits the
  contest you win by default.
- **NEVER use `!important` to beat a component style** — there is nothing to beat. If a rule is not
  applying, the cause is a layer mistake (see above) or the wrong selector, not specificity. Reach
  for `!important` and you will also outrank the reduced-motion floor, which you do not want.
- **NEVER use `classNames.root` in a selector** — `buttonClassNames.root` is the space-separated
  **pair** `"fui-button group/fui-button"`. It goes in `className`. `document.querySelector('.' + buttonClassNames.root)`
  is an invalid selector. Query the identity class instead: `.fui-button`.
- **NEVER use PascalCase Fluent class names** — Griffel's `.fui-Button` is `.fui-button` here, and
  there are no per-slot public classes at all. Griffel's `fui-Button__icon` has no equivalent.
- **NEVER target a component's internals by class** — every slot below the root carries a hashed
  ident of the shape `fuicm-<component>-<slot>-<hash>` that changes when the source changes. Reach
  internals through the root's group variants and the published `data-*` attributes instead.
- **NEVER declare a `group` of your own just to use a group variant** — the marker `group/fui-<component>`
  is already on the root. `group-disabled/fui-button:line-through` works with no configuration. Adding
  your own `group/name` is allowed, but only to disambiguate nested instances of the same component.
- **NEVER pass a theme object to `FluentProvider`** — `theme` takes a **class name string**
  (`webDarkThemeClassName`), not Griffel's JS theme object. The custom properties are already in the
  stylesheet.
- **NEVER reach for `useCustomStyleHook_unstable`, `overrides_unstable` or `customStyleHooks_unstable`** —
  none of them exist in windmod, on any component. Restyle through CSS; cascade layers make that the
  easier path anyway.
- **NEVER override a Fluent _spacing_ token at runtime and expect layout to move** — Tailwind's
  `--spacing-*` namespace resolves at compile time, so `var(--spacingHorizontalM)` in Griffel is
  `calc(var(--spacing) * 12)` here. Colour, typography and stroke tokens are still live `var()`
  references and do respond. Use `--base-scale` for density.
- **NEVER set `--base-scale` on a provider or a subtree** — it and every scale derived from it are
  declared at the document root. An override has to go there too.
- **NEVER hardcode a palette value** — use the kebab-case Fluent theme tokens
  (`var(--color-neutral-foreground-1)`, `bg-neutral-background-1`). The theme drops Tailwind's default
  palette entirely, so a stray `text-red-500` fails the build rather than silently diverging.
- **NEVER author a `@custom-variant` in a component module** — the catalog is exactly two files. See
  [The variant catalog](#the-variant-catalog).
- **NEVER assume `Tooltip` or `Popover` position correctly on Firefox or Safari** — the headless
  positioning layer uses native CSS anchor positioning with no `@supports` guard, no feature
  detection and no polyfill. On an engine without it the surface renders unpositioned at the viewport
  origin.
- **NEVER assume a windmod component is a drop-in for its Griffel twin without checking the delta
  list** — there are fifty-six deliberate differences. The ones that bite while styling are in
  [references/griffel-deltas.md](references/griffel-deltas.md).

## Before You Style, Ask

### Placement

- **Does this belong in my own CSS, or in a slot's `className`?** Both work and both win — slot
  `className` merges last on every slot, and your own stylesheet is unlayered. Use `className` for a
  one-instance tweak; use a stylesheet class for anything reused.
- **Am I about to write a descendant selector into a component?** Prefer a group variant on the child
  you actually control. Descendant selectors into hashed idents will break.

### Targeting

- **Is there a `data-*` attribute for this state?** Component roots publish their look props and state
  as data attributes (`data-appearance`, `data-size`, `data-open`, `data-placement`, `data-intent`, …).
  Select on those, not on inferred structure.
- **Is the state on the root or on a slot?** Group variants read the **root**. If the state lives on a
  native input (checked, for example) the input carries `peer/fui-<component>` and the sibling form
  `peer-checked/fui-<component>` applies.
- **Do I need a variant that does not exist?** Check both catalogs before inventing a selector —
  ninety-five generic entries plus the component-specific file.

### Theming

- **Am I writing a light/dark branch by hand?** Do not. Apply a theme class and let the tokens move.
- **Am I building a custom theme?** Write a CSS class that redeclares the token custom properties and
  pass its name: `<FluentProvider theme="my-brand-theme">`. `theme` accepts any string.

### Density and scale

- **Does my app set a non-16px root font size?** Then windmod controls will be larger or smaller than
  the Griffel ones they replace — the whole UI scales, not just the type. Keep the root at 16px to
  stay pixel-aligned with Griffel, or accept the coherent rescale deliberately.

### Setup

- **Is `@fluentui/react-tailwind-theme-preview/styles.css` imported, once, before my own CSS?**
  Nothing renders correctly without it, and its position fixes how any layers of _yours_ sort against
  `fui.*`. It does not affect an unlayered rule, which wins either way.
- **Is this a CommonJS or SSR build?** Then import `@fluentui/react-windmod-preview/styles.css`
  explicitly; only ESM gets it as a side effect.

## Setup Requirements

**CRITICAL: two stylesheets and one provider. Missing any of them produces symptoms that read as
styling bugs.**

```sh
npm install @fluentui/react-windmod-preview @fluentui/react-tailwind-theme-preview
```

```js
// Once per document, BEFORE your own CSS.
// Palette, type ramp, spacing scale, the seven theme classes, and the fui.* layer order.
import '@fluentui/react-tailwind-theme-preview/styles.css';

// The component styles. ESM consumers get this automatically as a side effect of importing any
// component; CommonJS and some SSR setups need it explicitly.
import '@fluentui/react-windmod-preview/styles.css';
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

**Why the order matters.** The theme stylesheet declares the cascade-layer family, and layer order is
first-appearance. It is load-bearing for exactly two things: nothing resolves without the theme sheet,
because the components' `var()` references have nothing to read; and if _you_ declare layers of your
own, whichever sheet appeared first fixes their order against `fui.*`. It does **not** decide whether a
plain unlayered rule of yours wins. Unlayered author CSS outranks every layer in the author origin no
matter which sheet loaded first, so an override that is genuinely unlayered cannot be broken by import
order.

**`FluentProvider` is a real element and it paints.** It renders a `div` carrying base typography, text
colour and `background-color: var(--color-neutral-background-1)`. If you wrap children in a provider
inside your own flex or grid container, the provider becomes the flex/grid item, not the children. If
you drop one onto a coloured surface it repaints that surface — set `background: transparent` via
`className` if that is not what you want.

**If you use Tailwind yourself**, declare the `fui` layers before importing Tailwind so your own
utilities beat Fluent component styles:

```css
@layer fui.theme, fui.base, fui.components, fui.utilities;
@import 'tailwindcss';
```

Only `styles.css` and `theme-class-names` are consumable without a Tailwind toolchain. Everything
about authoring your own Tailwind against windmod's variants is in
[references/setup.md](references/setup.md).

## How to Use

This skill uses **progressive disclosure**. Work from the patterns below; load a reference only on its
trigger.

**Installing, configuring, or wiring your own Tailwind build against windmod:**

- **MANDATORY**: Load [references/setup.md](references/setup.md) when the user says "set up windmod",
  "install", "configure Tailwind", "import the theme", or hits a build error naming `#theme`,
  `@custom-variant`, or an unresolved token.
- **Do NOT Load**: griffel-deltas.md, css-var-values.md, authoring-conventions.md.

**Overriding, extending or restyling a component in an app:**

- **MANDATORY**: Load [references/overriding.md](references/overriding.md) when restyling a component,
  targeting a slot, or when an override "is not applying". [assets/example-override.css](assets/example-override.css)
  and [assets/example-override.tsx](assets/example-override.tsx) are the worked version of it, with the
  anti-patterns written beside the correct ones.
- **Do NOT Load**: authoring-conventions.md (that is for changes inside the package), setup.md unless
  the stylesheets are in question.

**Choosing a variant, or selecting on component state:**

- **MANDATORY**: Load [references/variant-catalog.md](references/variant-catalog.md) when composing
  `group-<variant>/fui-<component>` classes, when unsure whether a variant exists, or when adding one.
- **Do NOT Load**: setup.md unless the catalog is not resolving at all.

**Choosing a token, or reasoning about sizing and density:**

- **MANDATORY**: Load [references/tokens-and-scale.md](references/tokens-and-scale.md) when picking a
  colour/typography/radius token, when layout is the wrong size, or when `--base-scale` comes up.
- **Do NOT Load**: variant-catalog.md unless also selecting on state.

**Theming — switching themes, theming part of a page, or building a custom one:**

- **MANDATORY**: Load [references/tokens-and-scale.md](references/tokens-and-scale.md), whose "Custom
  themes" section is the whole story: what a theme class is, why a partial one is fine, and how nesting
  a provider scopes a theme to a subtree. [Theming](#theming) above has the short version.
- **Do NOT Load**: overriding.md — a theme moves tokens, which is a different move from overriding a
  rule, and its theming paragraph only repeats what you already have.

**Porting an app off `@fluentui/react-components`, or explaining a behaviour difference:**

- **MANDATORY**: Load [references/griffel-deltas.md](references/griffel-deltas.md) when the user is
  migrating, when a snapshot or computed-style test broke, or when a component behaves differently
  from the Griffel one.
- **Do NOT Load**: authoring-conventions.md.

**Reading a resolved token value in JavaScript:**

- **MANDATORY**: Load [references/css-var-values.md](references/css-var-values.md) when the task needs
  a token's computed value at runtime (canvas, measurement, a third-party widget to theme).
- **Do NOT Load**: anything else.

**Changing styles INSIDE the package (`packages/react-components/react-windmod-preview`), or
verifying one — VR scenes, mutation tables, probes, pixel allowances:**

- **MANDATORY**: Load [references/authoring-conventions.md](references/authoring-conventions.md)
  completely. The authoring rules are strict and violations are rejected, and the same file carries
  the verification protocol: what the pixel gate actually asserts, what a pixel allowance requires,
  and the probe and mutation-table rules that keep a "measured" claim honest.
- **Do NOT Load**: overriding.md — the consumer override model does not apply inside the library.

**Diagnosing a style that will not apply:**

- **MANDATORY**: Load [references/troubleshooting.md](references/troubleshooting.md).

## The override model

**Cascade layers, not props.** Every package style lives inside a `fui.*` layer. Your CSS is
unlayered, and unlayered author CSS outranks every layered declaration regardless of selector weight.
Overriding a component is a one-class rule with no `!important` and no specificity arms race.

```css
/* wins over the component's own layered rules */
.my-brand-button {
  background-color: rebeccapurple;
}
```

```tsx
<Button className="my-brand-button">Continue</Button>
```

The declared layer order, which the theme package owns:

```css
@layer fui.theme, fui.base, fui.components, fui.components.l1, fui.components.l2, fui.components.l3,
  fui.components.l4, fui.components.l5, fui.utilities;
```

- `fui.components.l1` — leaf components (Button, Label, Input)
- `fui.components.l2` — compositions over them (ToggleButton over Button)
- `fui.components.l3+` — deeper compositions
- `fui.utilities` — Tailwind's utility layer; beats component styles, still loses to your unlayered CSS

**Slot `className` merges last.** Every slot re-stacks its class list with the component's own classes
first and your incoming `className` last, so your declaration wins at equal specificity:

```tsx
<Button icon={{ className: 'text-red-500' }}>Delete</Button>
```

Full worked patterns — per-slot overrides, confining a selector to a subtree, when to use a layer
deliberately — in [references/overriding.md](references/overriding.md). Scoping a _theme_ to a subtree
is a different mechanism and lives under [Theming](#theming).

**When the task turns on what a component already does** — "drop the hover elevation", "match the
current focus ring" — read that component's own `src/components/<Name>/<Name>.module.css`. It is shipped
source, it is short, and it is the only authority on the current state; the references here teach the
override mechanism, not per-component behaviour. Confirming that the thing you are removing exists beats
writing a defensive rule that quietly does nothing.

## The public class surface

Each component root carries **two** classes and nothing else that is public:

```tsx
import { buttonClassNames } from '@fluentui/react-windmod-preview/button';

buttonClassNames.root; // "fui-button group/fui-button"
```

- `fui-button` — the identity class. Safe for your CSS and for `querySelector`, no escaping needed.
- `group/fui-button` — Tailwind's real named-group class, unchanged.

```tsx
document.querySelectorAll('.fui-button'); // ✅
document.querySelectorAll('.' + buttonClassNames.root); // ❌ invalid selector — it is a pair
```

The class-name records expose **one public key**, almost always `root`. The single exception is
`avatarGroupPopoverClassNames`, whose key is `triggerButton` — that component renders no root element of
its own. Internals use hashed idents and `data-*` state attributes.

## Targeting internals with group variants

A child inside a component targets the component's state directly, with no group declaration of your
own:

```tsx
<Button disabled>
  <span className="group-disabled/fui-button:line-through">Send</span>
</Button>
```

The general form is `group-<variant>/fui-<component>`, where `<variant>` is any entry in the variant
catalog. Because every catalog entry is authored `&:where([data-…])`, Tailwind rewrites each one into
its group form automatically — every variant composes.

Component roots publish their look props and state as data attributes. Button, for example, stamps
`data-appearance`, `data-size` and `data-empty` from the styles hook, on top of the
`data-disabled` / `data-disabled-focusable` / `data-icon-only` / `data-icon-position` the headless hook
already stamps.

Presence-style attributes are **presence-based**: select `[data-open]`, never `[data-open='true']`.
Enumerated ones select on the value: `[data-size='small']`.

For a native input inside a composite control, the input carries `peer/fui-<component>` and the sibling
form applies: `peer-checked/fui-switch:…`.

## The variant catalog

The catalog is exactly **two files**, both shipped, both importable:

| File                                                      | Vocabulary                                                                                                                          |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `@fluentui/react-tailwind-theme-preview/css/variants.css` | generic — state, structure, positioning/orientation, size. Meaningful without knowing any component's API. 95 entries.              |
| `@fluentui/react-windmod-preview/variants.css`            | component-specific — component API values (`appearance-*`, `intent-*`, `text-position-*`, glyph variants), sectioned per component. |

Every entry is the canonical flat form:

```css
@custom-variant disabled (&:where([disabled], [data-disabled], :disabled));
@custom-variant appearance-primary (&:where([data-appearance='primary']));
@custom-variant intent-error (&:where([data-intent='error']));
```

Two rules that follow from that shape:

- **No union entries.** Comma-separate at the call site — `@variant hover, focus { … }` compiles to one
  nested rule per variant.
- **No numeric `size-*` variants** — they collide with Tailwind's own utilities.

To compose your own Tailwind against windmod's states, `@import` the two catalogs into your Tailwind
entry stylesheet. See [references/variant-catalog.md](references/variant-catalog.md) for the full
vocabulary and the import recipe.

## Theming

Seven themes ship as class names, plus a record and a type:

```tsx
import { themeClassNames, type ThemeClassName } from '@fluentui/react-windmod-preview/fluent-provider';

export const pickTheme = (dark: boolean): ThemeClassName =>
  dark ? themeClassNames.webDarkTheme : themeClassNames.webLightTheme;
```

`webLightThemeClassName`, `webDarkThemeClassName`, `teamsLightThemeClassName`,
`teamsDarkThemeClassName`, `teamsHighContrastThemeClassName`, `teamsLightV21ThemeClassName`,
`teamsDarkV21ThemeClassName`.

**A custom theme is a CSS class that redeclares the token custom properties.** `theme` accepts any
string, so your own class name works — in plain global CSS, since a CSS-Modules class would arrive
hashed. Redeclare only the tokens you are changing; the rest inherit. Do not port a Griffel theme object
— there is nothing to pass it to. Details in
[references/tokens-and-scale.md](references/tokens-and-scale.md).

**To theme part of a page, nest a second provider.** Tokens are inherited custom properties, so the
inner provider redeclares them for its subtree and the rest of the app keeps the outer theme.

```tsx
<FluentProvider theme={webLightThemeClassName}>
  <main>{content}</main>
  <FluentProvider theme={webDarkThemeClassName} className="telemetry-rail">
    <TelemetryRail />
  </FluentProvider>
</FluentProvider>
```

Remember the provider is a real element: the inner one becomes the flex or grid item in your layout, not
the rail's children.

**Anchored surfaces inherit from their DOM position.** `Tooltip`, `Popover` and the `AvatarGroup`
overflow surface are rendered inline and promoted to the native top layer, so they inherit theme
variables — and any other inherited property — from where they are written, not from a portal root.
A trigger outside every provider renders its surface with the document root's theme. Wrap the trigger
in a `FluentProvider` to control it.

## Imports and subpaths

The root barrel exports everything. Every component also has a kebab-case subpath, which is the
recommended route for tree-shaking-sensitive apps. **A component subpath exports only that
component**:

```tsx
import { Button } from '@fluentui/react-windmod-preview/button';
import { Card } from '@fluentui/react-windmod-preview/card';
import { CardHeader } from '@fluentui/react-windmod-preview/card-header'; // not from ./card
```

`./dialog` is the single exception among component subpaths: `Dialog` and its six parts share one.

Non-component subpaths: `./styles.css`, `./variants.css`, `./use-css-var-value`, `./positioning`, and
`./fluent-provider` — which is the mixed one, exporting `FluentProvider` alongside the seven theme
class-name constants, the `themeClassNames` record and the `ThemeClassName` type.

## Reading token values in JavaScript

When a token's resolved value is needed at runtime — canvas, measurement, theming a third-party widget:

```tsx
import { useCssVarValue } from '@fluentui/react-windmod-preview/use-css-var-value';

const ref = React.useRef<HTMLDivElement>(null);
const fg = useCssVarValue('--color-neutral-foreground-1', ref, { fallback: '#242424' });
const { bg, radius } = useCssVarValue({ bg: '--color-neutral-background-1', radius: '--border-radius-medium' }, ref);
```

The read happens at the element's DOM position, so cascade, inheritance and theme scoping all apply.
Values are cached and re-read on invalidation. `invalidateCssVars()` from the same subpath is the
escape hatch for changes the observers cannot see. Details in
[references/css-var-values.md](references/css-var-values.md).

## Common Issues

### Issue: my override is not applying

**Cause 1:** the override is inside an `@layer`. Layered CSS loses to unlayered CSS, and it loses to
`fui.utilities` too if the layer was declared earlier.

**Fix:** take it out of the layer.

**Cause 2:** the rule is layered without your having written `@layer` around it. `@layer components { … }`
is ordinary Tailwind idiom, and some frameworks and bundler CSS pipelines wrap imported global
stylesheets in a layer of their own. This is Cause 1 with nothing to see in your file, which is why it
outlives the first fix.

**Fix:** look before theorising. DevTools' Styles pane labels each rule with the layer it landed in and
strikes through whatever lost, so one glance tells you which cause you actually have. Then unlayer the
rule, or move your layer after `fui.utilities` in the declaration.

**Cause 3:** the selector targets a hashed ident or a Griffel-era class name (`.fui-Button`,
`.fui-Button__icon`).

**Fix:** target `.fui-button` and reach internals through group variants and `data-*`.

### Issue: `document.querySelector` throws on a class-name constant

**Cause:** `xClassNames.root` is a space-separated pair, not a single class.

**Fix:** query `.fui-<component>` directly. Use the constant only in `className`.

### The rest, in one line each

Symptom, cause, and where the worked answer is. Every one of these is written out in
[references/troubleshooting.md](references/troubleshooting.md), which also covers the symptoms that only
show up in tests.

| Symptom                                        | Cause                                                                                              | Fix                                                                                   |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| a `group-…/fui-x` class does nothing           | the name is in neither catalog, or your Tailwind build was never given the catalogs                | `@import` both catalogs — [setup.md](references/setup.md)                             |
| everything is the wrong size                   | a non-16px root font size; `--base-scale` is `calc(1rem / 16px)` and the whole UI rides it         | keep `html { font-size: 16px }`, or accept the rescale — never patch it on a provider |
| overriding a spacing token changes nothing     | Tailwind's `--spacing-*` resolves at compile time, so there is no live `var()` to move             | use `--base-scale` for density, or set the property directly                          |
| `Tooltip`/`Popover` renders in the page corner | no CSS anchor positioning in that engine, and no fallback anywhere in the positioning layer        | polyfill it, or keep those two on `@fluentui/react-components`                        |
| an animation stopped working                   | the theme's global `prefers-reduced-motion` floor — unlayered, 1ms, `animation-iteration-count: 1` | it is selector-less, so any rule of yours with a class already outranks it            |
| a Tailwind class fails the build               | the theme sets Tailwind's own palette, ramp, radii and shadows to `initial`, deliberately          | use a Fluent token — [tokens-and-scale.md](references/tokens-and-scale.md)            |
| a snapshot broke after migrating               | computed `box-shadow` strings, `aria-modal`, lower-case class names                                | [griffel-deltas.md](references/griffel-deltas.md)                                     |

## Important Notes

- **Tailwind's default theme is removed.** The theme sets `--color-*`, `--font-*`, `--text-*`,
  `--radius-*`, `--shadow-*` and more to `initial`. A stray `text-red-500` or `rounded-lg` fails the
  build rather than diverging from Fluent. Structural utilities (flex, grid, positioning) remain.
- **No preflight.** The theme ships no global reset — a component library must not. Utilities reach
  you only inlined through the components' own `@apply`, unless you run Tailwind yourself.
- **The DOM and the props are Griffel's.** Element structure, slot names, roles and ARIA match, because
  both libraries render through the same headless renderers. Props are the headless props plus the same
  look props with the same defaults.
- **A local prop beats a context value.** Where Griffel lets a container's context win even over an
  explicit prop, windmod gives the local prop priority and falls back to context. Callbacks compose
  (context first, then local), `className` concatenates with yours last, `style` spreads the same way.
- **Computed style strings differ without any visual difference.** Tailwind's shadow and ring utilities
  prepend fully transparent layers, so `getComputedStyle(el).boxShadow` returns a longer string than
  Griffel's. Snapshot tests asserting on computed `box-shadow` need updating; nothing about the
  rendering does.
- **Windmod containers for windmod children.** A windmod component reads the _windmod_ context, and
  only a windmod container publishes it. A windmod `Tag` inside a _headless_ `TagGroup` falls back to
  its own defaults. Griffel containers around windmod children work fine.
- **The parity contract is pixel-exact at 16px**, verified per component against the Griffel twin with
  pixelmatch at threshold 0 — zero non-antialiasing differences, with the matcher's antialiasing
  classifier absorbing sub-perceptual rasterization noise, and computed-style parity passes catching
  what pixel counting cannot. The deliberate differences are enumerated, not incidental — see
  [references/griffel-deltas.md](references/griffel-deltas.md).
- **This is a preview package.** It tracks `@fluentui/react-headless-components-preview`, which is
  itself in preview. APIs may change without notice; coverage is limited to what the headless package
  ships. Not production-ready.
