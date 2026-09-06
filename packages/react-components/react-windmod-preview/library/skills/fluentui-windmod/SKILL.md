---
name: fluentui-windmod
description: Use when styling, theming or overriding Fluent UI components from @fluentui/react-windmod-preview or @fluentui/react-tailwind-theme-preview, when authoring or verifying component styles inside those packages, or when users say "style this Fluent component", "override the button styles", "theme this app", "switch to dark theme", "restyle windmod", "fui-button", "group variant", "cascade layer", "line-height", "leading", "density", "ScaleRegion", "base-scale", or when working with .module.css files in a windmod project or migrating an app off @fluentui/react-components and Griffel. Provides the override model (cascade layers, not props), the public class and data-attribute surface, the variant catalog, theme class names, the base-scale density knob, and the authoring and verification conventions used inside the library itself.
license: MIT
metadata:
  author: fluentui
  version: '0.1.0'
  library: '@fluentui/react-windmod-preview'
  library_version: '0.1.0'
  type: core
sources:
  - 'microsoft/fluentui:packages/react-components/react-windmod-preview/library/MIGRATION.md'
  - 'microsoft/fluentui:packages/react-components/react-windmod-preview/library/src/variants.css'
  - 'microsoft/fluentui:packages/react-components/react-windmod-preview/library/src/components/*/*.module.css'
  - 'microsoft/fluentui:packages/react-components/react-tailwind-theme-preview/css/*.css'
  - 'microsoft/fluentui:packages/react-components/react-tailwind-theme-preview/scripts/generate-tokens-css.js'
---

# Fluent windmod

`@fluentui/react-windmod-preview` is the Fluent v9 visual contract rebuilt on **Tailwind v4 + CSS
Modules** over `@fluentui/react-headless-components-preview`: compiled at build time, no runtime style
injection, no Griffel, pixel-identical to `@fluentui/react-components` at a 16px root. This file is the
map — the model in one screen, the rules that must not be broken, and which reference answers which
task. Load a reference only on its trigger; each one is self-contained.

## The model

- **Overrides are cascade layers, not props.** Every package style lives in a `fui.*` layer. Your CSS
  is unlayered, and unlayered author CSS beats every layer regardless of selector weight — one class,
  no `!important`. Slot `className` merges last, so it wins at equal specificity too.
- **The public surface is two classes and data attributes.** A root carries `fui-<component>` (the
  identity class, safe for CSS and `querySelector`) and `group/fui-<component>` (Tailwind's named
  group). Everything below the root is a hashed ident; look-props and state are `data-*` on the root.
- **State is reached through the variant catalog.** `group-<variant>/fui-<component>:…` on any child,
  `peer-<variant>/fui-<component>:…` beside a native input. The catalog is exactly two shipped files —
  generic (`@fluentui/react-tailwind-theme-preview/css/variants.css`) and component-specific
  (`@fluentui/react-windmod-preview/variants.css`).
- **A theme is a class name.** `<FluentProvider theme={webDarkThemeClassName}>`; a custom theme is a
  global CSS class that redeclares token custom properties; a nested provider themes a subtree.
- **Tokens are the kebab-case Fluent tokens, and Tailwind's defaults are gone.** `bg-neutral-background-1`,
  `var(--color-neutral-foreground-1)`; `text-red-500` fails the build. Spacing resolves at compile time;
  colour, typography and stroke stay live `var()` references.
- **Density is one knob.** `--base-scale` at the document root scales spacing, sizes, radii, shadows
  and the type ramp together; `<ScaleRegion scale={1.25}>` (from `./provider`) scales one subtree.
  Leading is arithmetic, not a token: `leading-<n>` is `n/100`, `leading-<a>/<b>` the exact ratio.

## Never

- **NEVER wrap overrides in `@layer`** — it forfeits the win unlayered CSS has by default.
- **NEVER use `!important`** — there is nothing to beat, and it would also outrank the reduced-motion floor.
- **NEVER put `xClassNames.root` in a selector** — it is the pair `"fui-button group/fui-button"`; query `.fui-button`.
- **NEVER use Griffel's PascalCase classes** (`.fui-Button`, `.fui-Button__icon`) — lower-case root only, no slot classes.
- **NEVER target internals by class** — hashed idents change with the source; use group variants and `data-*`.
- **NEVER declare your own `group` to use a group variant** — the marker is already on the root.
- **NEVER pass a theme object to `FluentProvider`** — `theme` is a class-name string.
- **NEVER reach for `useCustomStyleHook_unstable`, `overrides_unstable` or `customStyleHooks_unstable`** — none exist.
- **NEVER override a spacing token at runtime and expect layout to move** — it is compile-time; use `--base-scale`.
- **NEVER set `--base-scale` on a provider or subtree** — inert mid-tree; `ScaleRegion` is the mechanism.
- **NEVER hardcode a palette value** — use a Fluent token.
- **NEVER author `leading-*` without `text-*` on the same element** — a bare ratio multiplies whatever is inherited (`leading-0` exempt).
- **NEVER author a `@custom-variant` in a component module** — the two catalog files are the whole vocabulary.
- **NEVER assume `Tooltip`/`Popover` position on Firefox or Safari** — native anchor positioning, no fallback.
- **NEVER assume drop-in parity with the Griffel twin** — sixty-three deliberate deltas are documented.

## Setup — two stylesheets, one provider

Missing any of these produces symptoms that read as styling bugs.

```sh
npm install @fluentui/react-windmod-preview @fluentui/react-tailwind-theme-preview
```

```js
// Once per document, before your own CSS: the theme-less base (tokens, layer order, preflight) …
import '@fluentui/react-tailwind-theme-preview/base.css';
// … one file per theme you ship — there is no default …
import '@fluentui/react-tailwind-theme-preview/themes/web-dark.css';
// … then windmod's root sheet. Component CSS arrives per component with each family import.
import '@fluentui/react-windmod-preview/base.css';
```

```tsx
import { Button } from '@fluentui/react-windmod-preview/button';
import { FluentProvider, webDarkThemeClassName } from '@fluentui/react-windmod-preview/provider';

export const App = () => (
  <FluentProvider theme={webDarkThemeClassName}>
    <Button appearance="primary">Save</Button>
  </FluentProvider>
);
```

There is no root barrel: every component comes from its kebab-case family subpath. CommonJS and SSR
builds import `@fluentui/react-windmod-preview/styles.css` (root sheet plus every component) instead
of `base.css`. If you run Tailwind yourself, declare the `fui` layers before `@import 'tailwindcss'`.
`FluentProvider` is a real `div` that paints its background — it becomes the flex or grid item, not its
children.

## Which reference to load

| When the task is…                                                                                                                                                                                 | Load                                                                                                                                                                                                             | Do not load                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| installing, import order, the provider, wiring your own Tailwind or CSS Modules (`@reference`, group/peer markers, class sorting), or a build error naming `#theme`, `@custom-variant` or a token | [references/setup.md](references/setup.md)                                                                                                                                                                       | griffel-deltas, authoring-conventions |
| restyling or extending a component, targeting a slot, or an override that "is not applying"                                                                                                       | [references/overriding.md](references/overriding.md); the worked version with anti-patterns beside the fixes is [assets/example-override.css](assets/example-override.css) + [.tsx](assets/example-override.tsx) | authoring-conventions                 |
| composing `group-…/fui-…` or `peer-…/fui-…`, checking whether a variant exists, or adding one                                                                                                     | [references/variant-catalog.md](references/variant-catalog.md)                                                                                                                                                   | —                                     |
| picking a colour/typography/radius token, choosing a line-height, layout the wrong size, `--base-scale` or `ScaleRegion`                                                                          | [references/tokens-and-scale.md](references/tokens-and-scale.md)                                                                                                                                                 | —                                     |
| switching a theme, theming part of a page, or building a custom theme                                                                                                                             | [references/tokens-and-scale.md](references/tokens-and-scale.md) § Custom themes                                                                                                                                 | overriding                            |
| porting an app off `@fluentui/react-components`, a snapshot or computed-style test that broke, or a component behaving differently                                                                | [references/griffel-deltas.md](references/griffel-deltas.md); the full sixty-three are in the package's `MIGRATION.md`                                                                                           | authoring-conventions                 |
| reading a token's resolved value in JavaScript (canvas, measurement, a third-party widget)                                                                                                        | [references/css-var-values.md](references/css-var-values.md)                                                                                                                                                     | everything else                       |
| changing or verifying styles **inside** `packages/react-components/react-windmod-preview` — module authoring, VR, probes, allowances                                                              | [references/authoring-conventions.md](references/authoring-conventions.md) in full, then [references/failure-modes.md](references/failure-modes.md) against the diff before calling it done                      | overriding                            |
| a style that will not apply, or a symptom that only shows up in tests                                                                                                                             | [references/troubleshooting.md](references/troubleshooting.md)                                                                                                                                                   | —                                     |

**When the task turns on what a component already does** — "drop the hover elevation", "match the
current focus ring" — read that component's own `src/components/<Name>/<Name>.module.css`. It is shipped,
short, and the only authority on current behaviour; the references teach mechanisms, not per-component
state.

This is a preview package tracking `@fluentui/react-headless-components-preview`, itself in preview:
APIs may change without notice and coverage is limited to what the headless package ships.
