# Setup

Installing windmod, loading its root stylesheets and theme files, and — if you run Tailwind yourself —
wiring your own build against its variant catalogs.

## Install

```sh
npm install @fluentui/react-windmod-preview @fluentui/react-tailwind-theme-preview
```

Both packages are required. The theme package carries the type ramp, spacing scale, cascade-layer
declaration and the seven theme classes — **one file per theme**, none of them loaded by default; the
component package carries the components and their compiled CSS.

## How component CSS is delivered

**Per component.** Each component's generated class map side-effect-imports its own compiled
stylesheet (`dist/css/components/Button/Button.css`), so a bundler ships exactly the components the app
uses. Nothing has to be configured for this — importing `Button` pulls `Button.css` and nothing else.
The package declares `"sideEffects": ["**/*.css"]`, which is what keeps bundlers from tree-shaking
those imports away.

What is NOT per component is a small root stylesheet that every chunk depends on. That has to be
loaded once, ahead of everything else.

## The root stylesheets

Two base sheets, plus one file per theme the app ships.

### Mode 1 — direct

The app imports them itself, in the entry module or as `<link>` elements at the top of the head.

```js
// Once per document, BEFORE your own CSS.
// The theme-less base (7.7 KB / 2.2 KB gzip): preflight, token registrations, spacing scale,
// type ramp, reduced-motion floor, layer order. No colours.
import '@fluentui/react-tailwind-theme-preview/base.css';

// One per theme the app ships (23.4 KB / ~3.8 KB gzip each). There is NO default.
import '@fluentui/react-tailwind-theme-preview/themes/web-dark.css';

// windmod's root sheet (3.8 KB / 805 B gzip): the cascade-layer order plus the global @property
// registrations that every component chunk assumes. The components themselves arrive automatically.
import '@fluentui/react-windmod-preview/base.css';
```

Stems are the theme class names without their `fui-theme-` prefix: `web-light`, `web-dark`,
`teams-light`, `teams-dark`, `teams-high-contrast`, `teams-light-v21`, `teams-dark-v21`.

`@fluentui/react-tailwind-theme-preview/styles.css` bundles the base and all seven into one file.
It still bakes no default — a theme class is still applied by hand — so it saves imports, not
steps, and costs 15.4 KB gzip against 5.9 KB for base + one theme.

### Mode 2 — composed into the app's own root stylesheet

When the app already has a root stylesheet, `@import` them at the **top** of it. The app's sheet loads
first in the document, so ours transitively precedes everything.

```css
/* app/src/root.css — the first stylesheet the document loads */
@import '@fluentui/react-tailwind-theme-preview/base.css';
@import '@fluentui/react-tailwind-theme-preview/themes/web-light.css';
@import '@fluentui/react-windmod-preview/base.css';

/* the app's own globals, custom theme class, Tailwind entry, … */
```

An `@import`ed sheet is treated as if written at the import site, so the layer order declaration inside
`base.css` still executes at the very top. `base.css` is plain CSS — no Tailwind syntax, no CSS-Modules
syntax — so it works as a bundler import, a `<link href>`, or a raw `@import` identically. This mode is
also the natural home for a custom theme: declare it after the imports above and it wins normally.

**Order is load-bearing for three reasons.**

1. Nothing renders correctly without the theme base — the components' `var()` references resolve to
   nothing — and nothing is coloured without a theme file _and_ its class.
2. The root sheets are the **sole declared owners** of the cascade-layer order; component chunks carry
   layer _blocks_ only. **Cascade layer order is first-appearance**, so a component chunk that reaches
   the document before the root sheet defines the order itself, inverting inter-component precedence
   (a `ToggleButton` chunk ahead of a `Button` chunk puts `fui.components.l2` below
   `fui.components.l1`, and `ToggleButton` loses contested properties to the `Button` it builds on).
   There is no per-chunk fallback by design — one owner of the order declaration is a package
   contract, and loading the root sheet first is how it is honoured.
3. `base.css` carries the `@property` registrations that give Tailwind's `--tw-*` variables their
   initial values. Without it, borders and shadows lose their values on every component.

A development build warns once per document if no layer-order declaration is found, and distinguishes
the two ways to get there — root sheet never loaded, or loaded after a component chunk — naming the
fix for each. A second warning fires when no theme reaches a provider, whether because the theme
file was never imported or because its class was never applied. Both read computed values off real
elements rather than looking for a stylesheet URL, so Mode 2 does not trip either.

### Fallback — one file

`@fluentui/react-windmod-preview/styles.css` still exists and still contains everything: the root sheet
plus all 133 components. Loading it alone is a complete setup and `base.css` is then unnecessary. Use
it for CommonJS/SSR, a `<link>`-only pipeline, or whenever one file beats letting the bundler collect
chunks.

## The provider

```tsx
import { Button } from '@fluentui/react-windmod-preview/button';
import { FluentProvider, webDarkThemeClassName } from '@fluentui/react-windmod-preview/provider';

export const App = () => (
  <FluentProvider theme={webDarkThemeClassName}>
    <Button appearance="primary">Save</Button>
  </FluentProvider>
);
```

`theme` takes a **class name string**, not a Griffel theme object — but it is equally required.
Griffel makes you `import { webDarkTheme }` and pass it, and leaves tokens unset without one; here
you import `themes/web-dark.css` and pass its class. Same two steps, same absence of a default.

Any string works, so a custom theme is a class of your own that redeclares the token custom
properties:

```tsx
<FluentProvider theme="my-brand-theme">…</FluentProvider>
```

```css
.my-brand-theme {
  --color-brand-background: #6b21a8;
  --color-brand-background-hover: #7e22ce;
  /* … the rest of the token set you are changing */
}
```

A theme class is custom properties only, so it may be applied to **any** element — you do not need a
provider to scope a theme, though you do need one for the base typography and background. With no
baked default, a custom class that declares the full token set is a standalone theme; one that
declares only overrides is applied alongside a shipped class
(`theme="fui-theme-web-light my-brand-theme"`) and wins by source order in the shared `fui.theme`
layer.

### The provider is a real element and it paints

It renders a `div` carrying base typography, text colour and
`background-color: var(--color-neutral-background-1)`.

- **Layout.** A provider inside your own flex or grid container becomes the flex/grid item — its
  children do not. Griffel's provider has always been a real div, so an app migrating from
  `@fluentui/react-components` already accounts for this.
- **Paint.** A provider dropped onto a coloured surface repaints it. Pass
  `className` with `background: transparent` if that is not what you want.

`targetDocument` and `dir` are supported. `customStyleHooks_unstable`, `overrides_unstable` and
`applyStylesToPortals` are not.

## Family imports

**There is no root barrel** — `@fluentui/react-windmod-preview` exports nothing. Every component comes
from its **family** subpath, kebab-case, and the families are the ones
`@fluentui/react-headless-components-preview` already uses. A family exports every part of that family:

```tsx
import { Button } from '@fluentui/react-windmod-preview/button';
import { Card, CardHeader, CardPreview } from '@fluentui/react-windmod-preview/card';
import { Dialog, DialogSurface, DialogTitle, DialogActions } from '@fluentui/react-windmod-preview/dialog';
```

**52 family subpaths** carry components. The ones whose name is not simply the component's own:
`CardHeader`/`CardFooter`/`CardPreview` → `./card` · `Tab` → `./tab-list` · `Radio` → `./radio-group` ·
`Option`/`OptionGroup`/`Listbox` → `./combobox` · `InfoButton` → `./info-label` ·
`ColorArea`/`ColorSlider`/`AlphaSlider` → `./color-picker` ·
`ColorSwatch`/`EmptySwatch`/`ImageSwatch`/`SwatchPickerRow` → `./swatch-picker` ·
`InlineDrawer`/`OverlayDrawer` and every `Drawer*` part → `./drawer` · every `Nav*` **and** every
`NavDrawer*` part → `./nav` · `Toaster` → `./toast` · `FluentProvider` → `./provider` (with the theme
class names) · every `Menu*`, `Toolbar*`, `TagPicker*`, `TeachingPopover*`, `MessageBar*`,
`Breadcrumb*`, `Accordion*`, `AvatarGroup*`, `InteractionTag*`, `Popover*` and `Skeleton*` part → its
family root.

Family JS tree-shakes; family CSS comes along, by design.

Subpaths that export no component:

| Subpath               | What it is                                       |
| --------------------- | ------------------------------------------------ |
| `./positioning`       | the headless positioning primitives, re-exported |
| `./use-css-var-value` | `useCssVarValue` / `invalidateCssVars`           |

Non-JavaScript subpaths:

| Subpath          | What it is                                                    |
| ---------------- | ------------------------------------------------------------- |
| `./base.css`     | the root stylesheet — layer order + `@property` registrations |
| `./styles.css`   | the batteries-included monolith                               |
| `./css/*`        | the individual per-component chunks                           |
| `./variants.css` | the component-specific variant catalog, for your own Tailwind |

## Plain-CSS consumers: no setup at all

If you are not running Tailwind, you need nothing beyond the two stylesheet imports. Your CSS is
unlayered and beats every `fui.*` layer by default:

```css
.my-brand-button {
  background-color: rebeccapurple;
}
```

That is the whole override story. See [overriding.md](overriding.md).

## Tailwind consumers

### Make your own utilities beat Fluent's

Cascade layer order is first-appearance, so declare the `fui` family **before** importing Tailwind:

```css
@layer fui.theme, fui.base, fui.components, fui.utilities;
@import 'tailwindcss';
```

Without that line, Tailwind's own layers are declared first and `fui.utilities` outranks them.
Copy the list exactly — layer order is first-appearance, so omitting or reordering a name here
would let the theme sheet's own statement introduce it in a different position than every
component chunk was compiled against. (Tailwind's preflight ships inside `fui.base`, at its
head, so it needs no name of its own.)

### Compose against windmod's states

To write `group-disabled/fui-button:…` in your own Tailwind, your build has to know those variants
exist. Both catalogs are shipped source and importable:

```css
/* your Tailwind entry stylesheet */
@layer fui.theme, fui.base, fui.components, fui.utilities;
@import 'tailwindcss';

/* the generic vocabulary — state, structure, positioning, size */
@import '@fluentui/react-tailwind-theme-preview/css/variants.css';

/* the component-specific vocabulary — appearance-*, intent-*, … */
@import '@fluentui/react-windmod-preview/variants.css';
```

Both files are pure `@custom-variant` declarations and emit no CSS of their own.

> **Verify this recipe against your bundler before relying on it.** The exports resolve
> (`./variants.css` and `./css/*` are both declared, and both files are in their packages' `files`
> arrays), but the import order and whether your Tailwind entry is processed by the same PostCSS pass
> as your app CSS is build-specific. If a variant compiles to nothing, this is the first thing to
> check.

### The token layer, if you want Fluent tokens in your own utilities

`@fluentui/react-tailwind-theme-preview` (the bare specifier) resolves to `css/index.css` — Tailwind
**source**, not plain CSS. It is the reference target the library's own modules use, and it is
deliberately unlike an app Tailwind setup:

- **preflight ships, at the head of `fui.base`** — Tailwind's preflight is imported as the first
  content of `fui.base` (the same placement Tailwind itself gives it), so every component rule —
  the library's and yours — outranks it, and the rest of the layer's element resets beat it by
  source order; components author over a normalized base instead of inheriting UA quirks
- tokens register via `@theme inline`, so `var(--token)` substitutes into each utility and values stay
  per-element custom properties
- Tailwind's default palette, type ramp, radii and shadows are set to `initial`

Note that `css/index.css` is theme-less, like the emitted `base.css` it compiles to — referencing it
registers every token NAME but gives none of them a value. A Tailwind build that also wants the
values imports the theme sources it needs alongside.

Individual layers are available at `@fluentui/react-tailwind-theme-preview/css/*` — `index.css`,
`tokens.css`, `themes/<name>.css`, `themes.css` (the all-seven aggregate), `variants.css`,
`utilities.css` — for advanced setups.

Only `base.css`, `themes/*.css`, `styles.css` and `theme-class-names` are consumable **without** a
Tailwind toolchain.

## What the layers are for

```css
@layer fui.theme, fui.base, fui.components, fui.components.l1, fui.components.l2,
  fui.components.l3, fui.components.l4, fui.components.l5, fui.utilities;
```

`fui.base` opens with Tailwind's preflight, followed by the theme's global element resets (the
headless icon defaults). Every component rule — and any rule of yours, layered above or unlayered —
outranks the reset; within the layer the resets that follow preflight beat it by source order.

The theme package's README describes `l3`–`l5` as available for app-global, per-page and one-off
overrides that should still lose to your unlayered CSS.

> **`fui.components.l3` is not free:** two component modules author into it (`SplitButton`, and
> `ToolbarToggleButton` over `ToggleButton` over `Button`). `l4` and `l5` are unused. Treat `l4`/`l5`
> as the safe consumer levels, and prefer plain unlayered CSS, which needs no coordination at all.
