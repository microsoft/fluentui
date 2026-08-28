# Setup

Installing windmod, loading its two stylesheets, and — if you run Tailwind yourself — wiring your own
build against its variant catalogs.

## Install

```sh
npm install @fluentui/react-windmod-preview @fluentui/react-tailwind-theme-preview
```

Both packages are required. The theme package carries the palette, type ramp, spacing scale, the seven
theme classes and the cascade-layer declaration; the component package carries the components and their
compiled CSS.

## The two stylesheets

```js
// Once per document, BEFORE your own CSS.
import '@fluentui/react-tailwind-theme-preview/styles.css';

// The component styles. ESM consumers get this automatically as a side effect of importing any
// component; CommonJS and some SSR setups need it explicitly.
import '@fluentui/react-windmod-preview/styles.css';
```

**Order is load-bearing for two reasons.**

1. Nothing renders correctly without the theme sheet — the components' `var()` references resolve to
   nothing.
2. The theme sheet declares the cascade-layer family, and **cascade layer order is first-appearance**.
   A sheet that arrives after CSS of yours that already named layers establishes a different order than
   the one documented here. Note the scope of that: it decides how _your_ named layers sort against
   `fui.*`. It has no bearing on a plain unlayered rule, which outranks every layer in the origin
   whatever the load order — so import order is never the reason an unlayered override fails.

The windmod package declares `"sideEffects": ["**/*.css"]`, so bundlers keep the automatic ESM import.

## The provider

```tsx
import { Button, FluentProvider, webDarkThemeClassName } from '@fluentui/react-windmod-preview';

export const App = () => (
  <FluentProvider theme={webDarkThemeClassName}>
    <Button appearance="primary">Save</Button>
  </FluentProvider>
);
```

`theme` takes a **class name string**, not a Griffel theme object. Any string works, so a custom theme
is a class of your own that redeclares the token custom properties:

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
provider to scope a theme, though you do need one for the base typography and background.

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

## Subpath imports

The root barrel exports everything. Component subpaths are kebab-case and **single-component**:

```tsx
import { Button } from '@fluentui/react-windmod-preview/button';
import { Card } from '@fluentui/react-windmod-preview/card';
import { CardHeader } from '@fluentui/react-windmod-preview/card-header'; // NOT from ./card
```

`./dialog` is the single exception — `Dialog` and its six parts (`DialogTrigger`, `DialogSurface`,
`DialogBody`, `DialogHeader`, `DialogTitle`, `DialogActions`) share one subpath:

```tsx
import { Dialog, DialogSurface, DialogTitle, DialogActions } from '@fluentui/react-windmod-preview/dialog';
```

Every other family — `Drawer`, `Menu`, `Toast`, `Nav`, `TagPicker`, `TeachingPopover` — is one subpath
per component. There are 145 of them.

Non-component subpaths:

| Subpath               | What it is                                                    |
| --------------------- | ------------------------------------------------------------- |
| `./styles.css`        | the compiled component stylesheet                             |
| `./variants.css`      | the component-specific variant catalog, for your own Tailwind |
| `./use-css-var-value` | `useCssVarValue` / `invalidateCssVars`                        |
| `./positioning`       | the headless positioning primitives, re-exported              |

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

- **no preflight** — a component library must not ship global resets
- tokens register via `@theme inline`, so `var(--token)` substitutes into each utility and values stay
  per-element custom properties
- Tailwind's default palette, type ramp, radii and shadows are set to `initial`

Individual layers are available at `@fluentui/react-tailwind-theme-preview/css/*` — `index.css`,
`tokens.css`, `variants.css`, `utilities.css`, `themes.css` — for advanced setups.

Only `styles.css` and `theme-class-names` are consumable **without** a Tailwind toolchain.

## What the layers are for

```css
@layer fui.theme, fui.base, fui.components, fui.components.l1, fui.components.l2, fui.components.l3,
  fui.components.l4, fui.components.l5, fui.utilities;
```

The theme package's README describes `l3`–`l5` as available for app-global, per-page and one-off
overrides that should still lose to your unlayered CSS.

> **Caveat, verified in the current tree:** `fui.components.l3` is no longer empty — four component
> modules author into it (deeper compositions such as ToolbarToggleButton over ToggleButton over
> Button). `l4` and `l5` are still unused. Treat `l4`/`l5` as the safe consumer levels, and prefer
> plain unlayered CSS, which needs no coordination at all.
