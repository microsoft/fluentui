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
pixel-for-pixel at a **zero-difference** threshold. The side-by-side scene list is maintained alongside
the package and grows with it: **91 scenes, 73 of them at strict zero.** The remaining eighteen carry an
explicit, individually ratified pixel allowance, each one recorded on its scene with the control that
bounds it. They are enumerated in
[Where the pixels are allowed to differ](#where-the-pixels-are-allowed-to-differ).

Worth stating precisely what that threshold asserts, because it is the number everything else in this
guide rests on. The comparison runs pixelmatch at threshold 0 with its antialiasing classifier on, so
**zero means zero non-antialiasing differences**: sub-perceptual rasterization noise along glyph and
border edges is absorbed, and every other difference — a moved edge, a changed colour, a missing shadow
— counts. The eighteen allowances are counted under that same rule, which is why each one still had to
be measured, decomposed and bounded by a control. Pixel counting is also not the only gate: per-component
computed-style parity passes compare the resolved CSS directly, catching the class of divergence that
paints identically and behaves differently.

> **Preview.** This package tracks `@fluentui/react-headless-components-preview`, which is itself in
> preview. APIs may change without notice and coverage is limited to the components the headless package
> ships. Not production-ready.

## Installation and imports

```sh
npm install @fluentui/react-windmod-preview @fluentui/react-tailwind-theme-preview
```

Component CSS is delivered **per component**: each component's class map side-effect-imports its
own compiled stylesheet, so a bundler ships exactly the components you use and nothing else. That
leaves the root stylesheets to load by hand, once per document, ahead of everything else — two
small base sheets, plus one file per theme you ship.

**Themes work exactly like Griffel's.** Griffel makes you `import { webLightTheme }` and pass it to
the provider; there is no default, and without one every token is unset. windmod is that same
contract expressed in CSS: import the theme's stylesheet, then apply its class. You pay for the
themes you ship and no others.

#### Mode 1 — direct

Import them in your entry module, or link them at the top of the document head.

```js
// The theme-less base: preflight, token registrations, the spacing scale, the type ramp, the
// reduced-motion floor, the cascade-layer order. 7.7 KB raw, 2.2 KB gzipped. No colours — that is
// the next line.
import '@fluentui/react-tailwind-theme-preview/base.css';

// One import per theme you ship. 23.4 KB raw, ~3.8 KB gzipped each.
import '@fluentui/react-tailwind-theme-preview/themes/web-light.css';

// windmod's root sheet: the cascade-layer order and the global custom-property registrations that
// every component chunk assumes. 3.8 KB raw, 805 bytes gzipped. Components arrive automatically.
import '@fluentui/react-windmod-preview/base.css';
```

Then apply the theme's class — usually once, on the provider at the root of the app:

```tsx
import { FluentProvider, webLightThemeClassName } from '@fluentui/react-windmod-preview/provider';

<FluentProvider theme={webLightThemeClassName}>
  <App />
</FluentProvider>;
```

The class can equally sit on `<html>` or any other ancestor — custom properties cascade, and a
provider with no `theme` prop inherits whatever encloses it. A development build warns once per
document when no theme reaches a provider; Griffel has no such diagnostic, which is why forgetting
it there reads as a component bug rather than a missing import.

The seven shipped themes, their subpaths, and their class constants:

| import                                                          | class                           | constant                          |
| --------------------------------------------------------------- | ------------------------------- | --------------------------------- |
| `…/react-tailwind-theme-preview/themes/web-light.css`           | `fui-theme-web-light`           | `webLightThemeClassName`          |
| `…/react-tailwind-theme-preview/themes/web-dark.css`            | `fui-theme-web-dark`            | `webDarkThemeClassName`           |
| `…/react-tailwind-theme-preview/themes/teams-light.css`         | `fui-theme-teams-light`         | `teamsLightThemeClassName`        |
| `…/react-tailwind-theme-preview/themes/teams-dark.css`          | `fui-theme-teams-dark`          | `teamsDarkThemeClassName`         |
| `…/react-tailwind-theme-preview/themes/teams-high-contrast.css` | `fui-theme-teams-high-contrast` | `teamsHighContrastThemeClassName` |
| `…/react-tailwind-theme-preview/themes/teams-light-v21.css`     | `fui-theme-teams-light-v21`     | `teamsLightV21ThemeClassName`     |
| `…/react-tailwind-theme-preview/themes/teams-dark-v21.css`      | `fui-theme-teams-dark-v21`      | `teamsDarkV21ThemeClassName`      |

An app offering a light/dark toggle imports two of them and swaps the class:

```tsx
import '@fluentui/react-tailwind-theme-preview/themes/web-light.css';
import '@fluentui/react-tailwind-theme-preview/themes/web-dark.css';
import {
  FluentProvider,
  webDarkThemeClassName,
  webLightThemeClassName,
} from '@fluentui/react-windmod-preview/provider';

<FluentProvider theme={dark ? webDarkThemeClassName : webLightThemeClassName}>
  <App />
</FluentProvider>;
```

#### Mode 2 — composed into your own root stylesheet

If you already have a root stylesheet — global styles, a custom theme, your own Tailwind entry —
`@import` ours at the **top** of it. Your root sheet is what loads first in the document, which
transitively guarantees ours precedes everything.

```css
/* app/src/root.css — the first stylesheet the document loads */
@import '@fluentui/react-tailwind-theme-preview/base.css';
@import '@fluentui/react-tailwind-theme-preview/themes/web-light.css';
@import '@fluentui/react-windmod-preview/base.css';

/* your own global styles, your custom theme class, your Tailwind entry, … */
.my-brand-theme {
  --color-brand-background: #6b21a8;
}
```

A custom theme is just one more class in this sheet — and with no baked default, it starts from a
clean slate rather than from web light. A class that redeclares the full token set is a complete
theme on its own; a class layered over a shipped theme (`<FluentProvider theme="fui-theme-web-light
my-brand-theme">`) overrides only the tokens it names, because it comes later in the same
`fui.theme` layer.

This works because an `@import`ed sheet is treated as if written at the import site, so the layer
order declaration inside `base.css` still executes at the very top of your sheet. `base.css` is
plain CSS — no Tailwind syntax, no CSS-Modules syntax — so it is equally valid as a bundler
import, a `<link href>`, or a raw `@import`.

#### Why the order matters

Cascade layers are established in **first-use order**, and the root stylesheet is the single
declared owner of the `fui.*` layer order — component chunks contain layer _blocks_ only. So if a
component chunk reaches the document before the root stylesheet, that chunk defines the order
instead, and inter-component precedence inverts: a `ToggleButton` chunk arriving first puts
`fui.components.l2` _below_ `fui.components.l1`, and `ToggleButton` then loses contested
properties to the `Button` it builds on.

Loading the root stylesheet first is therefore a requirement, not a recommendation. A development
build warns once per document when no order declaration is found, and distinguishes the two ways
to get there — root stylesheet never loaded, or loaded after a component chunk.

#### Fallback — the batteries-included monolith

`./styles.css` is still published and still contains everything: the root sheet plus every
component, in one file. Loading it alone is a complete, correct setup, and `base.css` is then not
needed. Use it where the class maps do not deliver chunks for you: **CommonJS** consumers (those
class maps carry no `require` — node cannot parse CSS), **SSR** setups that load CSS out of band, and
`<link>`-only pipelines with no module graph.

> **Do not add it on top of ESM component imports.** It is not an opt-out from per-component
> delivery — the class maps still import their chunks, so you ship the whole sheet _and_ the chunks
> again. Measured on a Button-only app: 35,358 gzip that way, against 2,277 gzip importing
> `base.css` instead. If your bundler resolves the components, `base.css` is the right root sheet.

```js
import '@fluentui/react-tailwind-theme-preview/styles.css'; // base + all seven themes
import '@fluentui/react-windmod-preview/styles.css'; // instead of base.css
```

The theme package publishes its own monolith on the same terms: `./styles.css` is its base sheet
plus all seven themes, 163 KB raw / 15.4 KB gzipped against 31 KB / 5.9 KB for base + one theme.
It still bakes no default — a theme class still has to be applied — so it buys one import, not one
fewer step. Reach for it only when you genuinely offer every theme, or when a `<link>`-only
pipeline makes counting files worse than counting bytes.

Then rewrite the imports. **The names do not change; the paths do.** windmod ships no root barrel, so
one `@fluentui/react-components` import becomes one import per _family_ — the same grouping the headless
package uses:

```diff
-import { Button, FluentProvider, Tooltip, webDarkTheme } from '@fluentui/react-components';
+import { Button } from '@fluentui/react-windmod-preview/button';
+import { FluentProvider, webDarkThemeClassName } from '@fluentui/react-windmod-preview/provider';
+import { Tooltip } from '@fluentui/react-windmod-preview/tooltip';
```

```tsx
import { Button } from '@fluentui/react-windmod-preview/button';
import { FluentProvider, webDarkThemeClassName } from '@fluentui/react-windmod-preview/provider';
import { Tooltip } from '@fluentui/react-windmod-preview/tooltip';

export const App = () => (
  <FluentProvider theme={webDarkThemeClassName}>
    <Tooltip content="Save the document" relationship="label">
      <Button appearance="primary">Save</Button>
    </Tooltip>
  </FluentProvider>
);
```

A family import is one line no matter how many of its parts you use, so a `Dialog` or `Menu` migration is
usually a _shorter_ import block than the Griffel original:

```diff
-import { Dialog, DialogSurface, DialogTitle, DialogBody, DialogActions } from '@fluentui/react-components';
+import { Dialog, DialogSurface, DialogTitle, DialogBody, DialogActions } from '@fluentui/react-windmod-preview/dialog';
```

### The family map

**There is no root barrel.** `@fluentui/react-windmod-preview` exports nothing — every component is
imported from its **family** subpath. The families are the ones
[`@fluentui/react-headless-components-preview`](https://www.npmjs.com/package/@fluentui/react-headless-components-preview)
already uses, so the two layers have the same shape: whatever `.../react-headless-components-preview/menu`
gives you the hooks for, `.../react-windmod-preview/menu` gives you the styled components for.

A family is the unit you actually build with. Implementing a menu means `Menu`, `MenuTrigger`,
`MenuPopover`, `MenuList` and `MenuItem` — five imports from one subpath, one line:

```tsx
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-windmod-preview/menu';
import { Button } from '@fluentui/react-windmod-preview/button';
import { CardHeader, CardPreview } from '@fluentui/react-windmod-preview/card';
```

**What this costs and what it saves.** A family barrel's **JavaScript still tree-shakes**: import one
component and its unused siblings' code is dropped (measured — importing only `MenuItem` from `./menu`
retains 6 windmod modules against 36 for the whole family). Its **CSS comes along**, because each class
map side-effect-imports its own chunk and the family barrel keeps the family's chunks reachable. That is
intentional: families are used together, and the cost is bounded by the family rather than by the suite.
If you need one component from a large family and nothing else, the CSS you pay for is that family's,
not the library's.

**52 family subpaths** carry components. All are kebab-case, and all but `./use-css-var-value` match a
headless subpath one-for-one.

| Subpath              | Components                                                                                                                                                                                                                                                                                                                                                                         |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `./accordion`        | Accordion, AccordionHeader, AccordionItem, AccordionPanel                                                                                                                                                                                                                                                                                                                          |
| `./avatar`           | Avatar                                                                                                                                                                                                                                                                                                                                                                             |
| `./avatar-group`     | AvatarGroup, AvatarGroupItem, AvatarGroupPopover                                                                                                                                                                                                                                                                                                                                   |
| `./badge`            | Badge                                                                                                                                                                                                                                                                                                                                                                              |
| `./breadcrumb`       | Breadcrumb, BreadcrumbButton, BreadcrumbDivider, BreadcrumbItem                                                                                                                                                                                                                                                                                                                    |
| `./button`           | Button                                                                                                                                                                                                                                                                                                                                                                             |
| `./card`             | Card, CardFooter, CardHeader, CardPreview                                                                                                                                                                                                                                                                                                                                          |
| `./checkbox`         | Checkbox                                                                                                                                                                                                                                                                                                                                                                           |
| `./color-picker`     | ColorPicker, AlphaSlider, ColorArea, ColorSlider                                                                                                                                                                                                                                                                                                                                   |
| `./combobox`         | Combobox, Listbox, Option, OptionGroup                                                                                                                                                                                                                                                                                                                                             |
| `./compound-button`  | CompoundButton                                                                                                                                                                                                                                                                                                                                                                     |
| `./dialog`           | Dialog, DialogSurface, DialogTrigger, DialogHeader, DialogTitle, DialogBody, DialogActions                                                                                                                                                                                                                                                                                         |
| `./divider`          | Divider                                                                                                                                                                                                                                                                                                                                                                            |
| `./drawer`           | Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerHeaderNavigation, DrawerHeaderTitle, InlineDrawer, OverlayDrawer                                                                                                                                                                                                                                                             |
| `./dropdown`         | Dropdown                                                                                                                                                                                                                                                                                                                                                                           |
| `./field`            | Field                                                                                                                                                                                                                                                                                                                                                                              |
| `./image`            | Image                                                                                                                                                                                                                                                                                                                                                                              |
| `./info-label`       | InfoLabel, InfoButton                                                                                                                                                                                                                                                                                                                                                              |
| `./input`            | Input                                                                                                                                                                                                                                                                                                                                                                              |
| `./interaction-tag`  | InteractionTag, InteractionTagPrimary, InteractionTagSecondary                                                                                                                                                                                                                                                                                                                     |
| `./label`            | Label                                                                                                                                                                                                                                                                                                                                                                              |
| `./link`             | Link                                                                                                                                                                                                                                                                                                                                                                               |
| `./menu`             | Menu, MenuDivider, MenuGroup, MenuGroupHeader, MenuItem, MenuItemContextProvider, MenuItemCheckbox, MenuItemLink, MenuItemRadio, MenuItemSwitch, MenuList, MenuPopover, MenuSplitGroup, MenuTrigger                                                                                                                                                                                |
| `./menu-button`      | MenuButton                                                                                                                                                                                                                                                                                                                                                                         |
| `./message-bar`      | MessageBar, MessageBarActions, MessageBarBody, MessageBarTitle                                                                                                                                                                                                                                                                                                                     |
| `./nav`              | Nav, NavCategory, NavCategoryItem, NavDivider, NavDrawer, NavDrawerBody, NavDrawerFooter, NavDrawerHeader, NavItem, NavSectionHeader, NavSubItem, NavSubItemGroup                                                                                                                                                                                                                  |
| `./persona`          | Persona                                                                                                                                                                                                                                                                                                                                                                            |
| `./popover`          | Popover, PopoverSurface, PopoverTrigger                                                                                                                                                                                                                                                                                                                                            |
| `./progress-bar`     | ProgressBar                                                                                                                                                                                                                                                                                                                                                                        |
| `./provider`         | FluentProvider                                                                                                                                                                                                                                                                                                                                                                     |
| `./radio-group`      | RadioGroup, Radio                                                                                                                                                                                                                                                                                                                                                                  |
| `./rating`           | Rating, RatingItem                                                                                                                                                                                                                                                                                                                                                                 |
| `./rating-display`   | RatingDisplay                                                                                                                                                                                                                                                                                                                                                                      |
| `./search-box`       | SearchBox                                                                                                                                                                                                                                                                                                                                                                          |
| `./select`           | Select                                                                                                                                                                                                                                                                                                                                                                             |
| `./skeleton`         | Skeleton, SkeletonItem                                                                                                                                                                                                                                                                                                                                                             |
| `./slider`           | Slider                                                                                                                                                                                                                                                                                                                                                                             |
| `./spin-button`      | SpinButton                                                                                                                                                                                                                                                                                                                                                                         |
| `./spinner`          | Spinner                                                                                                                                                                                                                                                                                                                                                                            |
| `./split-button`     | SplitButton                                                                                                                                                                                                                                                                                                                                                                        |
| `./swatch-picker`    | SwatchPicker, ColorSwatch, EmptySwatch, ImageSwatch, SwatchPickerRow                                                                                                                                                                                                                                                                                                               |
| `./switch`           | Switch                                                                                                                                                                                                                                                                                                                                                                             |
| `./tab-list`         | TabList, Tab                                                                                                                                                                                                                                                                                                                                                                       |
| `./tag`              | Tag                                                                                                                                                                                                                                                                                                                                                                                |
| `./tag-group`        | TagGroup                                                                                                                                                                                                                                                                                                                                                                           |
| `./tag-picker`       | TagPicker, TagPickerButton, TagPickerControl, TagPickerGroup, TagPickerInput, TagPickerList, TagPickerOption, TagPickerOptionGroup                                                                                                                                                                                                                                                 |
| `./teaching-popover` | TeachingPopover, TeachingPopoverBody, TeachingPopoverCarousel, TeachingPopoverCarouselCard, TeachingPopoverCarouselFooter, TeachingPopoverCarouselFooterButton, TeachingPopoverCarouselNav, TeachingPopoverCarouselNavButton, TeachingPopoverCarouselPageCount, TeachingPopoverFooter, TeachingPopoverHeader, TeachingPopoverSurface, TeachingPopoverTitle, TeachingPopoverTrigger |
| `./textarea`         | Textarea                                                                                                                                                                                                                                                                                                                                                                           |
| `./toast`            | Toast, ToastBody, ToastFooter, ToastTitle, Toaster                                                                                                                                                                                                                                                                                                                                 |
| `./toggle-button`    | ToggleButton                                                                                                                                                                                                                                                                                                                                                                       |
| `./toolbar`          | Toolbar, ToolbarButton, ToolbarDivider, ToolbarGroup, ToolbarRadioButton, ToolbarRadioGroup, ToolbarToggleButton                                                                                                                                                                                                                                                                   |
| `./tooltip`          | Tooltip                                                                                                                                                                                                                                                                                                                                                                            |

`FluentProvider` lives at `./provider` rather than `./fluent-provider` because that is where headless
puts its `Provider` — the family is "the provider", and windmod's is the themed one. The subpath also
carries the theme class names, so the provider and its themes come from one import.

Two subpaths export no component:

| Subpath               | What it is                                                                                                                                     |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `./positioning`       | the headless positioning primitives (`usePositioning`, `resolvePositioningShorthand`, …), re-exported — windmod adds no styling layer here     |
| `./use-css-var-value` | `useCssVarValue` / `invalidateCssVars` — read a token's resolved value off an element, with caching. windmod-only; headless has no counterpart |

Five more subpaths are not JavaScript at all:

| Subpath          | What it is                                                                                                                                                                                                |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `./base.css`     | the root stylesheet — cascade-layer order + global custom-property registrations; load it head-of-document ([above](#installation-and-imports))                                                           |
| `./styles.css`   | the batteries-included monolith — the root sheet plus all 131 component chunks in one file                                                                                                                |
| `./css/*`        | the individual component chunks (`./css/components/Button/Button.css`, …). Your bundler reaches these through the class maps; the key exists for SSR/CommonJS pipelines that want to collect them by hand |
| `./variants.css` | the component-specific variant catalog, so your own Tailwind CSS can compose against windmod's states                                                                                                     |
| `./package.json` | —                                                                                                                                                                                                         |

If you were importing from an internal Fluent package directly (`@fluentui/react-button`,
`@fluentui/react-overflow`, …), note that `@fluentui/no-restricted-imports` blocks that route; the family
subpath is the sanctioned entry point here.

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
  [delta 23](#23-a-local-prop-beats-a-context-value).)
- **TabList's animated indicator**, ported mechanism-for-mechanism: measured rects → custom properties →
  CSS transition.
- **Slot `className` merging.** Your class lands last on every slot, as it does today.

## What differs deliberately

Fifty-nine differences, each one a decision rather than a defect.

### Setup and API surface

#### 1. `theme` is a CSS class name, not a theme object

Griffel's provider takes a JS theme object and writes CSS custom properties at runtime. windmod's applies a
class; the variables are already in the stylesheet.

The two steps are the same as Griffel's — import the theme, hand it to the provider — with a CSS
import standing in for the JS one. Passing a theme is equally **required** in both: neither has a
default, and neither renders correct colours without one.

```diff
-import { FluentProvider, webDarkTheme } from '@fluentui/react-components';
-<FluentProvider theme={webDarkTheme}>
+import '@fluentui/react-tailwind-theme-preview/themes/web-dark.css';
+import { FluentProvider, webDarkThemeClassName } from '@fluentui/react-windmod-preview/provider';
+<FluentProvider theme={webDarkThemeClassName}>
```

All seven themes ship as class names —`webLightThemeClassName`, `webDarkThemeClassName`,
`teamsLightThemeClassName`, `teamsDarkThemeClassName`, `teamsHighContrastThemeClassName`,
`teamsLightV21ThemeClassName`, `teamsDarkV21ThemeClassName` — plus a `themeClassNames` record and a
`ThemeClassName` type:

```tsx
import { themeClassNames, type ThemeClassName } from '@fluentui/react-windmod-preview/provider';

export const pickTheme = (dark: boolean): ThemeClassName =>
  dark ? themeClassNames.webDarkTheme : themeClassNames.webLightTheme;
```

Each name has a matching stylesheet subpath — `themeClassNames.webDarkTheme` is the class in
`…/themes/web-dark.css` — so importing the right file is mechanical: kebab-case the theme name
without its `Theme` suffix.

**If you built a custom theme** by passing a modified theme object, port it to a CSS class that redeclares
the token custom properties. `theme` accepts any string, so your own class name works:
`<FluentProvider theme="my-brand-theme">`. With no baked default, a class that declares the whole
token set needs no shipped theme file at all; one that declares a few overrides is applied
alongside a shipped class (`theme="fui-theme-web-light my-brand-theme"`) and wins by source order
within the shared `fui.theme` layer.

#### 2. The theme is a separate, required import — one file per theme

`@fluentui/react-tailwind-theme-preview/base.css` carries the preflight
([delta 58](#58-tailwinds-preflight-ships--in-the-lowest-layer)), the type ramp, the spacing scale
and the token registrations; each `…/themes/<name>.css` carries one theme's palette. Nothing renders
correctly without the base, and nothing is _coloured_ without a theme file plus its class.

This is the same shape as Griffel, where the theme is a separate JS import you pass to the
provider — only the cost model changes with it. Griffel's themes are JS objects, so an app that
imports one ships one; the CSS equivalent has to be per-file for that to stay true, which is what
these subpaths are. Importing web light alone is 31 KB raw / 5.9 KB gzipped against the 163 KB /
15.4 KB of all seven.

Load them before your own CSS so your rules stay unlayered
(see [delta 10](#10-cascade-layers-replace-specificity-juggling)).

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

#### 6. There is no root barrel — every import names a family

`import { Button } from '@fluentui/react-windmod-preview'` does not resolve. Components come from their
family subpath, matching the headless package's own grouping: see [the family map](#the-family-map). The
exported names are unchanged, so a migration is a path rewrite, not an API rewrite — and a codemod-able
one, since the family of every name is fixed.

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

Translucent colours are the other case. Where Griffel spells an alpha mix as `color-mix(in srgb, …)`,
windmod writes Tailwind's slash modifier — `bg-(--token)/30` — which compiles to `color-mix(in oklab, …)`,
oklab being Tailwind's default interpolation space and the one the modern web has settled on. These are
**alpha-only** mixes: the same colour on both sides, only its opacity changing, so premultiplied
interpolation lands on the same painted result whichever space names it. Only the serialization differs —
`oklab(… / 0.3)` against `color(srgb … / 0.3)` — which a computed-style diff of the two libraries will
show. [Delta 55](#55-unselected-carousel-dots-are-mixed-in-oklab-not-srgb) prints the two side by side on
the one component where they are worth reading.

Griffel pairs each such mix with an `@supports not (color-mix(…))` fallback. **windmod deliberately carries
none.** `color-mix()` shipped in every engine in early 2023, comfortably inside the CSS anchor positioning
floor this package already requires
([delta 27](#27-anchored-components-require-css-anchor-positioning--with-no-fallback)) — a browser that
cannot mix two colours cannot position an anchored surface either, so the fallback would only ever run on
an engine that has already failed elsewhere.

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

`Toolbar`, `TabList`, `TagGroup` and `SwatchPicker` publish the `focusgroup` attribute where Griffel
emits a `data-tabster` mover configuration. Behaviour is broadly equivalent but not identical, and
`focusgroup` needs browser support or a polyfill. This is the headless layer's choice; windmod passes it
through.

`Nav` is the exception: it publishes no `focusgroup` at all, so its rows are reached with **Tab**, one stop
per row, where Griffel's tabster mover makes the whole nav a single tab stop with arrow keys moving between
rows. A keyboard user tabbing past a long navigation therefore passes through every row instead of skipping
the block in one press. This too is the headless layer's choice; windmod passes it through.

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

#### 22. `prefers-reduced-motion` is suppressed globally, not per component

Griffel suppresses motion piecemeal: `react-motion` swaps every presence atom for a 1ms one when the
preference is set, and about a dozen components additionally author their own
`@media (prefers-reduced-motion: reduce)` CSS. Motion that neither path covers keeps running.

windmod suppresses once, in the theme. `@fluentui/react-tailwind-theme-preview` ships one rule and one
deliberate exception to it; no windmod component authors a duration override of its own:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    transition-duration: 1ms;
    transition-delay: 1ms;
    animation-duration: 1ms;
    animation-delay: 1ms;
    animation-iteration-count: 1;
  }

  /* Essential motion, exempt on purpose — see below. */
  .fui-spinner > span {
    animation-duration: 1.8s;
    animation-iteration-count: infinite;
  }
}
```

The rule is **unlayered**, not `!important`. Layers are compared before specificity, so an unlayered
declaration outranks everything in `fui.components.*` (see
[delta 10](#10-cascade-layers-replace-specificity-juggling)) while your own unlayered CSS and your inline
styles still beat it. If one motion has to survive the preference in your app, re-declare its duration
from unlayered CSS or inline — there is no `!important` to fight.

**Where the two libraries visibly differ.** Measured under emulated `prefers-reduced-motion: reduce`:
the Spinner's rotation is the only thing in windmod that computes a duration above 1ms, while Griffel
still moves in these places.

| Motion                                      | Griffel under `reduce`                 | windmod under `reduce` |
| ------------------------------------------- | -------------------------------------- | ---------------------- |
| `ProgressBar` determinate `width`           | tweens over 0.3s on every value change | jumps                  |
| `AccordionHeader` chevron                   | rotates over 0.2s                      | jumps                  |
| `Nav` row background (hover, selection)     | 0.1s                                   | instant                |
| `NavItem` selection indicator and icon swap | 0.1s keyframes                         | instant                |

The `Spinner` is not in that table, and the exception in the rule above is why.

It closes one gap in the other direction too: the `NavCategoryItem` chevron used to keep its 0.15s
rotation under the preference, where Griffel's equivalent was already suppressed. It no longer does.

**The `Spinner` keeps spinning — deliberately.** A loading indicator that does not move stops being a
loading indicator, so the Spinner's rotation is the one motion carved out of the floor, at Griffel's own
under-reduce value: **1.8s, linear, infinite** — slower than the 1.5s it runs at without the preference,
never stopped. Measured under `reduce`, both libraries report the identical animation on the ring
(`duration 1800ms, iterations Infinity, running`). Only the rotation is exempt; the Spinner's tail still
takes the floor and rests as the static full-ring conic its own rule swaps in, which is what Griffel's
tail does too (Griffel pins it at `animation-iteration-count: 0`).

Infinite animations are otherwise the class to watch. `animation-iteration-count: 1` means the
`SkeletonItem` shimmer and the indeterminate `ProgressBar` pulse each run exactly one 1ms pass and then
render their un-animated state — a flat block and a static full-width bar. Both match Griffel, which
suppresses both as well.

If you have your own essential motion, the same escape hatch is open to you: the floor is unlayered but
selector-less, so any rule of your own with a class in it already outranks it.

One consequence of the bare `*`: `transition-property` defaults to `all`, so under the preference every
element in the document — yours included, styled by Fluent or not — carries a 1ms transition on every
animatable property. It is imperceptible, but `transitionend` now fires where it previously would not.
Do not key logic on a `transitionend` arriving only for elements you styled.

### Composition and context

#### 23. A local prop beats a context value

Where Griffel spells `size = contextSize ?? 32` (context wins even over an explicit prop), windmod's merge
helper gives the **local prop** priority and falls back to context. Callbacks compose rather than replace
(context first, then local), `className` concatenates with yours last, and `style` spreads the same way.

Concretely: an `Avatar` with an explicit `size` inside a container publishing a different size keeps its own
size under windmod and takes the container's under Griffel. If you were relying on a container to override
explicit sizes, remove the explicit prop.

#### 24. `Field` does not push `size` into its control

`Field` sizes its own `Label` and layout but does not propagate `size` to the control it wraps.
`aria-invalid` and `required` do propagate. Measured cost of the gap: 8px of control height and 2px of font
size at both `small` and `large`.

Pass `size` to both:

```tsx
<Field label="Name" size="small">
  <Input size="small" />
</Field>
```

#### 25. A nested `Field` renders its label with the outer Field's orientation and size

Griffel does not. Avoid nesting `Field`s, or set the inner label's props explicitly.

#### 26. `Card` selection is not focus-aware

Griffel builds a focus-aware predicate so that clicking a focusable element _inside_ a selectable card does
not toggle the card. The headless surface exposes `shouldRestrictTriggerAction` but supplies no default, so
a windmod selectable `Card` toggles on any inner click. Supply the predicate yourself if the card contains
interactive content.

Relatedly, `focusMode` and the tabster groupper are absent by construction: a windmod `Card` is never
focusable by itself and never traps Tab.

### Browser and network behaviour

#### 27. Anchored components require CSS anchor positioning — with no fallback

The headless positioning layer uses native CSS anchor positioning (`anchor-name`, `position-area`,
`position-try-fallbacks`). There is **no** `@supports` guard, no feature detection, no polyfill and no
floating-ui fallback path anywhere in it.

**On a browser without CSS anchor positioning the surface renders unpositioned at the viewport origin.** As
of today that means Firefox and Safari. `Tooltip` and `Popover` are the anchored components this package
ships, so the exposure is bounded to them, but it is total on those engines. The measured displacement for
an unpositioned Popover surface is dx −1016.953, dy −419 from its trigger.

If you must support them, either polyfill CSS anchor positioning, or keep `Tooltip` and `Popover` on
`@fluentui/react-components` — both compose over windmod children without trouble.

#### 28. `Tooltip`'s arrow sits differently on corner placements

Griffel's floating-ui centres the arrow on the target; CSS anchor positioning pins it near the edge. On the
aligned corner placements (`above-start`, `below-end`, and their siblings) the arrow is displaced by
roughly **−36.6px / +35.0px** relative to Griffel. Surfaces also land on fractional device pixels where
floating-ui writes integer transforms, a 0.047–0.375px offset that shifts glyph rasterization.

Both CSS routes to close the arrow gap (`anchor-center`, an `anchor-size()` clamp) were measured and
neither works. Edge-centred placements (`above`, `below`, `before`, `after`) are unaffected. This is the
mechanism behind four of the eighteen ratified pixel allowances — see
[Where the pixels are allowed to differ](#where-the-pixels-are-allowed-to-differ).

#### 29. The `AlphaSlider` checkerboard is inlined — it works offline

Griffel fetches the transparency checkerboard from a CDN. windmod embeds the same 94-byte PNG as a `data:`
URI in its stylesheet, byte-for-byte identical to the asset Griffel downloads.

Consequence: on an **offline, air-gapped or CSP-restricted origin the windmod `AlphaSlider` paints its
checkerboard and the Griffel one does not**, and windmod issues no network request for it at all. A
deliberate improvement; listed here because it is a behavioural difference you may be measuring.

### AvatarGroup

#### 30. The overflow button's ARIA is different

It carries `aria-haspopup="true"`; Griffel's carries a `data-tabster` focus-restorer instead. The accessible
name (`View more people.`) and `aria-expanded` are identical on both. A snapshot test pinning the button's
attributes needs updating.

#### 31. A consumer's own trigger-button children are honoured

Griffel overwrites `triggerButton.children` with its glyph whenever `indicator="icon"`, discarding whatever
the consumer passed. windmod follows the library-wide default-glyph rule: the glyph is a fallback, and
consumer children always win. `triggerButton={{ children: null }}` falls back to the glyph on both
libraries, so only a non-nullish value diverges.

#### 32. The overflow popover no longer traps focus by default

Griffel's `AvatarGroupPopover` set `trapFocus: true`. The headless surface forwards `trapFocus` but leaves
it unset, and windmod does not add a default, because turning it on switches the native `<dialog>` from
`popover="auto"` to `showModal()` and makes the rest of the page inert. Pass `trapFocus` explicitly to
restore the old behaviour.

#### 33. `AvatarGroupItem` no longer reads the provider direction

Griffel's item calls `useFluent()` and merges a second class set under RTL; windmod's pie geometry is
direction-aware in CSS. Behaviour is identical inside a provider; outside one, windmod follows the
document's actual `dir` while Griffel falls back to `ltr`.

#### 34. The overflow popover's arrow is off-centre on aligned placements

`withArrow` is forwarded and not defaulted on either library, so no arrow renders out of the box. If you
opt in on an aligned placement (`above-start`, `below-end`, `before-top`, `after-bottom`), the arrow's
cross-axis position sits a fixed 8px from the aligned edge rather than centred on the trigger, because CSS
anchor positioning has no equivalent of floating-ui's arrow middleware — the same mechanism as
[delta 28](#28-tooltips-arrow-sits-differently-on-corner-placements). Centred placements are pixel-exact.

### Popover surfaces

These four apply to every component built on `PopoverSurface` — `Popover`, `Tooltip` and the
`AvatarGroup` overflow popover.

#### 35. A focus-trapping surface carries no `aria-modal`

Griffel sets `aria-modal` when `trapFocus` is on. The headless surface is a native `<dialog>` opened with
`showModal()`, and `dialog:modal` already conveys modality to assistive technology, so no attribute is
written. An assertion pinning `aria-modal` needs updating; the announced modality is unchanged.

#### 36. There is no enter motion

Griffel fades and slides its surface in (`appear: true`). The headless surface ships no motion slot and
windmod adds none, so the surface appears at its final position immediately. Nothing about the resting
render differs.

#### 37. A surface outside every provider reads the document root's theme

The surface is rendered inline and promoted to the top layer, so it inherits theme variables from its
position in the DOM. A trigger that sits outside every `FluentProvider` therefore renders its surface with
the document root's theme. Griffel's portalled surface has the same fallback for a different reason — it
derives its theme from React context. Wrap the trigger in a `FluentProvider` to control the surface's
theme.

#### 38. The surface inherits arbitrary CSS from its DOM ancestors

Because the surface stays where it is written, any inherited property set on an element between the
provider and the trigger — `letter-spacing`, `text-transform`, `font-variant`, a `color` on a wrapper —
reaches it. Griffel's portalled surface sees none of it; only the theme class travels with the portal. If
you relied on a portal isolating the surface from an ancestor's inherited styles, set those properties
explicitly on the surface.

### Component defaults

#### 39. `TagPicker` resolves an unrecognised `size` to a `medium` tag, where Griffel resolves `extra-small`

A `TagPicker`'s `size` selects the size of the `Tag`s in its group: `medium` → `extra-small`,
`large` → `small`, `extra-large` → `medium`. The three listed values map identically in both
libraries. They differ only in the fallback: windmod's returns `medium` — windmod `Tag`'s own
unresolved size — where Griffel's returns `extra-small`, so the windmod tag family has one
unresolved-size answer rather than two.

`TagPickerProps['size']` is a closed union, so TypeScript cannot reach this branch. It decides only
what a JavaScript caller passing an unlisted value gets: a 32px-tall tag under windmod against a
20px one under Griffel. Pass one of the three documented sizes and the two libraries agree exactly.

### `InfoLabel` and `InfoButton`

#### 40. `InfoButton` has no `inline` prop, and its popover is always in the top layer

Griffel's `InfoButton` took an `inline` prop (default `true`) choosing between rendering the popover inline
and portaling it. The headless surface is always promoted into the browser's native top layer, so there is
no inline/portal switch to make and the prop is not re-added. Everything [delta 27](#27-anchored-components-require-css-anchor-positioning--with-no-fallback)
says about anchored components applies here unchanged, and so does [delta 28](#28-tooltips-arrow-sits-differently-on-corner-placements):
`InfoButton`'s **default** placement is `above-start`, an aligned one, so the arrow displacement is the
out-of-the-box appearance rather than an edge case. Because the trigger is a 24px button — narrower than
twice the arrow's inset from the surface edge — floating-ui compensates by translating the whole surface
(measured 1px at `size="medium"`, 3px at `size="large"`) where CSS anchor positioning pins the surface edge
to the trigger edge. Centred placements (`above`, `below`, `before`, `after`) are pixel-exact.

#### 41. `InfoButton` moves focus to the popover, and closes when focus leaves to nothing

Two behaviours come from the headless hook, not from the styled layer:

- **Opening the popover focuses the surface**, so a screen reader reads the info before anything else.
  Griffel leaves focus on the button.
- **The popover closes when focus leaves to nothing** — a window blur, or a click on the page background.
  Griffel keeps it open in that case.

The trigger's ARIA is also richer: it carries `aria-haspopup="true"` always and `aria-details` pointing at
the surface while open, where Griffel carries neither and relies on tabster's focus restorer. Nothing is
lost — the `aria-labelledby` pairing of the label and the button is identical on both — but a snapshot test
pinning the button's attributes needs updating.

#### 42. `<InfoButton children={null}>` renders the default glyph

Across windmod, a slot's default content is restored with a `??` fallback, which fires on `null` as well as
`undefined`. `<InfoButton>{null}</InfoButton>` therefore renders the info glyph where Griffel renders
nothing. Any other value — a string, an element, a fragment — wins over the default on both libraries. To
render a button with no glyph, pass an empty element rather than `null`.

### Teaching and guidance

#### 43. `TeachingPopover` no longer traps focus by default

Griffel's `TeachingPopover` sets `trapFocus: true` by default, "because the default TeachingPopover view
has buttons/carousel". The headless component does not, so the surface is a light-dismissable
`popover="auto"` rather than a modal dialog, and its role is `group` rather than `dialog`. Nothing moves
visually — the trap adds `aria-modal` and a tabster configuration and paints nothing.

Pass `trapFocus` explicitly to restore the old default.

#### 44. `TeachingPopoverFooter`'s buttons are slots again, and only one of them closes

The headless base hook drops the `primary` and `secondary` Button slots and takes buttons as children of
the root instead. windmod restores both slots on the windmod `Button`, exactly as Griffel has them —
including the brand role inversion (on a brand surface the emphasis moves to `secondary`) and the
auto-close handler, which is wired to the `secondary` where there is one and to the `primary` otherwise,
never to both.

Consequence for code written against the headless footer: **children still win.** A footer given its own
children renders them and ignores the two slots, so a headless-shaped call site keeps working unchanged.

One state-shape difference goes with the slots: Griffel's footer state lists the slot components on
`state.components` (`{ root, primary: Button, secondary: Button }`), while windmod's keeps the headless
state's `{ root: 'div' }` and carries the resolved `primary`/`secondary` slots on the state itself. Nothing
renders differently — `components` is `@deprecated` in `@fluentui/react-utilities` and no windmod render
function reads it — but code that introspects `state.components` to discover the footer's slot elements
will not find them there.

#### 45. `TeachingPopoverCarouselFooter` has no `initialStepText` or `finalStepText`

The carousel now ships — `TeachingPopoverCarousel` and its six family members each have a windmod component
and a subpath. Its one breaking API change is here: Griffel's footer takes `initialStepText` and
`finalStepText` as **required** footer props and feeds them into each nav button's `altText` default. The
headless footer this component composes drops both, and windmod does not restore them. Trailing-step text is
supplied per button instead, as the `altText` the headless slot type already declares:

```tsx
// Griffel
<TeachingPopoverCarouselFooter initialStepText="Close" finalStepText="Done" />

// windmod
<TeachingPopoverCarouselFooter
  previous={{ navType: 'prev', altText: 'Close' }}
  next={{ navType: 'next', altText: 'Done' }}
/>
```

Neither half of the port fails silently. `altText` and `navType` are both **required** on the slot — exactly
as Griffel's own footer-button props declare them — so a port that drops the text does not compile; and
`initialStepText` / `finalStepText` are absent from windmod's footer props type, so passing them is a type
error rather than an accepted no-op.

The rest of the family's deltas are grouped under [the teaching carousel](#the-teaching-carousel) below.

#### 46. A `Combobox` or `Dropdown` listbox is not clamped to the space around the trigger

Griffel passes `autoSize: true` to floating-ui, which shrinks the listbox to whatever room is left between
the trigger and the viewport edge and scrolls the remainder. The headless positioning layer has no
`autoSize` — nothing reads it, and since the `positioning` prop was narrowed to the props the layer actually
honours, the key is no longer even accepted. A listbox with more options than fit below the trigger
therefore flips to `above` (the fallback positions still apply) and, failing that, extends past the viewport
edge rather than shrinking. Cap it yourself when the option count is unbounded:

```tsx
<Combobox listbox={{ style: { maxHeight: '20rem', overflowY: 'auto' } }} />
```

### Two places windmod renders more correctly than Griffel

Both were found by the forced-colors survey and are invisible to every VR scene. In each case matching
Griffel exactly would have meant importing a defect, so windmod keeps the correct rendering. Listed here
so a pixel-diffing migration audit is not surprised by them.

#### 47. A current `BreadcrumbButton` keeps its hover and press styling

Griffel's cascade lets a later rule beat the current-item styling it evidently intends: under forced
colors the current breadcrumb's hover and press states lose their system colours, and in normal mode its
press state loses too (16 cells measured). windmod's layer order applies the current-item styling as
written, so a pressed current breadcrumb looks the way the design intends. Matching Griffel would have
required deliberately making a windmod rule lose in normal mode as well. No action needed.

#### 48. Pressing a `Card` styles the card, not its descendants

Griffel's compiled interaction selector is `.card:hover, .card :active` — the space before `:active` is a
stray descendant combinator, so the pressed styling matches active _descendants_ instead of the pressed
card (8 forced-colors cells measured). windmod authors `:active` on the card itself. Copying Griffel
would have imported the typo; it is filed upstream instead. A windmod `Card` therefore shows a pressed
state where a Griffel `Card` shows none.

### NavDrawer

#### 49. The navigation landmark sits on the drawer body, not the drawer root

Griffel's `NavDrawer` stamps `role="navigation"` on the drawer root; the headless render puts it on
the `NavDrawerBody`, and windmod inherits the headless placement. The landmark is announced either
way and its contents are identical — but assistive technology reports it on a different element, and
a selector or test targeting `[role="navigation"]` finds the body rather than the root. The package's
own test suite pins the headless placement so a future upstream move is caught.

#### 50. `NavDrawer` has no `tabbable` prop

Griffel adds `tabbable` on `NavDrawerProps` and feeds it to `useArrowNavigationGroup` in the body.
The headless state omits the prop and its context helper pins the value `false`, so windmod cannot
forward what never arrives. With Nav's move to Tab-per-row navigation (see
[delta 15](#15-arrow-key-navigation-comes-from-focusgroup-not-tabster)) the prop's original role has
narrowed; consumers who set `tabbable` today should verify their keyboard order against the headless
model.

### The teaching carousel

The carousel family ships as of this release. Its one breaking prop change is
[delta 45](#45-teachingpopovercarouselfooter-has-no-initialsteptext-or-finalsteptext); the rest of the
family's differences are below. Two of them are places windmod renders or behaves more correctly than
Griffel, kept rather than matched, and marked as such.

#### 51. Every carousel dot is in the tab order

Griffel's `TeachingPopoverCarouselNav` wires tabster arrow navigation over the dots and marks the selected
one as the group's default focusable, so the whole nav is a single tab stop and the arrow keys move between
dots. The headless nav ships neither, and windmod inherits that: each dot is its own tab stop and the arrow
keys do nothing. Nothing paints differently — this is keyboard order only. It is the same headless move
that [delta 15](#15-arrow-key-navigation-comes-from-focusgroup-not-tabster) records for `Nav`.

#### 52. `layout="offset"` right-alignment reaches only the footer's own children

Griffel's compiled selector for the offset footer's right-aligned region is a **descendant** combinator, so
it also catches nested first children — the first dot of a `TeachingPopoverCarouselNav` placed inside the
footer picks up the alignment along with the footer's own first child. windmod authors a direct-child
selector, which is what the rule evidently intends. Reproducing Griffel here would have meant importing the
combinator; it is filed upstream instead. A footer whose layout depends on the wider match will need the
alignment stated on the nested element.

#### 53. `appearance={undefined}` on a carousel footer button no longer clobbers the derived appearance

`TeachingPopoverCarouselFooterButton` derives its `appearance` from the surrounding surface's appearance and
its own `navType`. Griffel spreads the consumer's props over that derived value (`{appearance: derived,
...props}`), so an **explicit** `appearance={undefined}` overwrites it and the button falls back to
`secondary`. windmod resolves `appearance ?? derived`, which fires on `undefined` and keeps the derived
value. Only an explicit-undefined call site is affected; passing a real appearance overrides on both
libraries, and passing nothing derives on both. **windmod is the more correct of the two here**, and the
behaviour matches how windmod treats every other look prop.

#### 54. `disabledFocusable` on a carousel footer button actually blocks the click

Griffel's carousel footer button renders on the base root and discards the ARIA button layer, so a
`disabledFocusable` button stays focusable — as intended — but still fires its `onClick`. windmod composes
through the windmod `Button`, which keeps `useARIAButtonProps`' guarded handler, so the click is blocked
while focus is retained. **windmod is the more correct of the two here.** A call site that relied on the
handler firing on a `disabledFocusable` nav button will stop receiving it.

#### 55. Unselected carousel dots are mixed in oklab, not sRGB

The unselected dot is the component's one translucent colour. Griffel authors it as
`color-mix(in srgb, …)`; windmod authors it with Tailwind's opacity modifier, which compiles to
`color-mix(in oklab, …)` — oklab is Tailwind's default interpolation space, and windmod does not fight it.
[Delta 12](#12-some-computed-style-strings-differ-without-any-visual-difference) states the rule; this is
the one component where the numbers are worth printing. The two computed values differ in serialization on
the two unselected dots and are identical on the two selected ones:

| dot                 | windmod (oklab)                                   | Griffel (`in srgb`)                             |
| ------------------- | ------------------------------------------------- | ----------------------------------------------- |
| neutral, unselected | `oklab(0.526287 -0.0470482 -0.141687 / 0.3)`      | `color(srgb 0.0588235 0.423529 0.741176 / 0.3)` |
| brand, unselected   | `oklab(0.999994 0.0000455678 0.0000200868 / 0.3)` | `color(srgb 1 1 1 / 0.3)`                       |
| neutral, selected   | `rgb(15, 108, 189)`                               | `rgb(15, 108, 189)` — identical                 |
| brand, selected     | `rgb(255, 255, 255)`                              | `rgb(255, 255, 255)` — identical                |

**This costs nothing in pixels.** The two LTR carousel scenes reach strict zero under `--disable-gpu`, so
at 30% over the surfaces this family paints on the two mixes rasterize the same; no pixel allowance was
needed or granted for the colour. (The RTL scene's residual 6 px under the flag is a harness settle-pass
artifact, not a colour term — see the table below.) It is recorded here because a computed-style diff of
the two libraries will show the two rows above, and because it is a divergence windmod authored
deliberately rather than one it inherited.

Griffel also carries an `@supports not (color-mix(…))` fallback; windmod deliberately carries none.
Tailwind emits an opaque `background-color` outside its own `@supports` guard, which is unreachable inside
windmod's documented browser floor. Measured with the guard's contents removed from the live stylesheet,
that emission paints the neutral dot `rgb(15, 108, 189)` and the brand dot `rgb(255, 255, 255)`, both fully
opaque — identical on the neutral dot to what windmod paints with no fallback at all, and closer to the
intended look on the brand dot. Griffel's own fallback paints **both** dots `rgb(15, 108, 189)` at 30%, so
its brand dot comes out brand blue rather than white; that is a bug in it. So on a browser without
`color-mix` windmod loses the 30% dimming that Griffel's fallback keeps, and Griffel keeps the dimming on
the wrong hue.

#### 56. The footer button's brand press styling is authored to Griffel's measured rendering

Where a Griffel declaration on this family is defeated by Griffel's own `mergeClasses` ordering and never
paints, windmod omits it rather than reviving it — otherwise windmod would paint a button Griffel never
paints. That is a parity decision, not a divergence, with one exception worth stating.

The pressed background of a `previous` button on a **brand** surface has no stable value in Griffel: two
atomic rules paint it at equal specificity with different selector keys, so both survive `mergeClasses` and
document insertion order decides. In the composed component — the only arrangement a consumer can render —
Griffel's later Button-outline rule wins and the surface shows through (`rgba(0, 0, 0, 0)`). windmod authors
that value. Take a Griffel measurement of this cell from an isolated harness rather than from a real
`TeachingPopover` and you will read `rgb(12, 59, 94)` instead, from the same Griffel build.

### Icon slots

#### 57. Fluent icons are the styled contract — a bring-your-own `<svg>` is not restyled

Where Griffel shapes a slot's glyph with an `& svg` selector, windmod selects `[data-fui-icon]` — the
attribute every `@fluentui/react-icons` icon stamps (SVG icons an empty value, font icons `"font"`). For
any Fluent icon, bundled or not, the two are identical; a font icon additionally picks up the slot's glyph
sizing that an svg-type selector never reached. The divergence is an arbitrary `<svg>` a consumer passes
into an icon slot (an `Input` `contentBefore`, an `Option` `checkIcon`, …): Griffel would restyle it,
windmod leaves it alone. Stamp `data-fui-icon` on it to opt in.

### The base sheet and the type ramp

#### 58. Tailwind's preflight ships — in the lowest layer

The theme package includes Tailwind's preflight. This is a deliberate divergence from Griffel's
posture: `@fluentui/react-components` ships no global reset and renders over whatever element
defaults the document brings; windmod authors every component over a normalized base instead.

The guarantee that makes it safe is the layer. Preflight lives in `fui.preflight`, the **first** name
in the `@layer` order statement — below `fui.theme`, `fui.base` and every component layer — so every
authored rule in both packages outranks it by construction, and your own unlayered CSS beats it the
same way it beats everything else in the library. Nothing else is ever authored into that layer.

What to check when migrating: the reset is document-global, exactly like the preflight of a Tailwind
app — element defaults (heading sizes, list markers and margins, button font, `fieldset`/`legend`,
table borders) are normalized everywhere the theme sheet loads, not only under the provider. Re-check
any markup of your own that relied on UA default styling, inside the provider especially; markup you
style yourself is unaffected, because any rule you author outranks the reset.

#### 59. Leading tokens are unitless ratios, not lengths

Griffel's line-height tokens are px strings — `tokens.lineHeightBase300` is `'20px'`. windmod's
`--leading-*` tokens are the same ramp expressed as unitless ratios of their paired font-size:
`--leading-base-300` is `calc(20 / 14)`, `--leading-base-400` is `1.375`, and so on down the ramp —
always the ramp's line-height px over its paired font-size px. Because the ratios are theme-invariant,
they are declared once in `./base.css` rather than per theme.

Rendered boxes do not move: every windmod rule that sets a `leading-*` sets an authored font-size on
the same element, so the ratio multiplies exactly the font-size the old length encoded (verified with
an element-keyed probe across all 91 scenes — zero rect changes).

Two things do change:

- **Inheritance.** A length line-height inherits as that computed length; a number inherits as a
  ratio and recomputes against every descendant's own font-size. A descendant of a windmod element
  that sets only `font-size` and counted on inheriting Griffel's fixed px line box now gets
  `font-size × ratio` instead.
- **Reading the token.** `getComputedStyle(el).getPropertyValue('--leading-base-300')` — or
  `useCssVarValue` — no longer returns a length. Multiply by the paired font-size token to get one:
  `calc(var(--text-base-300) * var(--leading-base-300))` is the windmod spelling of Griffel's
  `lineHeightBase300`.

## Where the pixels are allowed to differ

The parity gate is strict zero: pixelmatch at threshold 0, with the antialiasing classifier absorbing
sub-perceptual rasterization noise. One differing pixel that is not classified as antialiasing fails the
scene. Seventy-three of the ninety-one scenes hold that unconditionally. The remaining eighteen carry a
numeric ceiling — counted under the same rule — recorded on the scene itself, each granted individually
and each recorded with the control that bounds it. **No allowance is a tolerance band** — every one names a specific mechanism, and a diff that does
not decompose the documented way fails the scene even when it sits under the ceiling. All eighteen are
below.

Four of the eighteen are known to be pure GPU rasterization: re-run with `--disable-gpu` and they are
strict zero, which is the strongest statement in the table — the CSS is exactly correct. The rest split
into genuine geometry (survives software rasterization) and rows where the no-GPU mode is itself the
noisier one and the GPU gate stays authoritative.

The **Decision** column is the identifier the allowance was ratified under; rows sharing one were granted
together, as a single class on a single body of evidence.

| Scene(s)                                              | Ceiling          | Decision | Mechanism                                                                                                                                                                                                                                                                                                                                                                                                                                    | Under `--disable-gpu`                                                                                                                                                  |
| ----------------------------------------------------- | ---------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `teaching-popover`                                    | 21093            | P        | GPU rasterization of the UA-mandated `position: fixed` top-layer surface. No CSS component at all.                                                                                                                                                                                                                                                                                                                                           | **0 — completely compliant**                                                                                                                                           |
| `teaching-popover-carousel`                           | 18386            | Q6       | The same top-layer compositing texture as `teaching-popover`, over the larger carousel surface. No CSS component: the promoted Griffel-vs-Griffel identity control reads 0 in both raster modes.                                                                                                                                                                                                                                             | **0 — completely compliant** (proven ×5)                                                                                                                               |
| `teaching-popover-carousel-brand`                     | 17816            | Q6       | Same class and same procedure as the row above, on the brand surface.                                                                                                                                                                                                                                                                                                                                                                        | **0 — completely compliant** (proven ×5)                                                                                                                               |
| `teaching-popover-carousel-rtl`                       | 18386            | Q6       | Same class as the two rows above. Geometry is byte-identical — a full-precision rect walk reads 0 — after the `PopoverSurface` 1/64 px RTL arrow fix that shipped with this cycle.                                                                                                                                                                                                                                                           | 6 — a settle-pass harness artifact, not windmod: `getAnimations().cancel()` de-promotes only the Griffel side, and a Griffel-vs-Griffel control bounds it at exactly 6 |
| `toast-inverted`                                      | 8                | J        | A 1-ULP blend split in _Griffel's own_ bimodal rasterization of the inverted error glyph; windmod is byte-stable on Griffel's majority face.                                                                                                                                                                                                                                                                                                 | **0 — completely compliant**                                                                                                                                           |
| `teaching-popover-placements`                         | 8883             | P        | 5824 px of the arrow displacement of [delta 28](#28-tooltips-arrow-sits-differently-on-corner-placements) plus 3059 px of the same top-layer rasterization as `teaching-popover`.                                                                                                                                                                                                                                                            | 5824 — the predicted arrow share survives                                                                                                                              |
| `info-label-open`                                     | 8545             | O        | Whole-assembly translation, dx=1 at `medium` and dx=3 at `large`; the surface bands are byte-identical once shifted.                                                                                                                                                                                                                                                                                                                         | 8107 — persists (positioning, not compositing)                                                                                                                         |
| `tooltip`                                             | 8164             | G        | Sub-pixel glyph displacement (six cells) plus the `above-start`/`below-end` arrow displacement of [delta 28](#28-tooltips-arrow-sits-differently-on-corner-placements).                                                                                                                                                                                                                                                                      | 4219 — both mechanisms survive                                                                                                                                         |
| `popover`                                             | 6551             | G        | 1274 px arrow paint ([delta 28](#28-tooltips-arrow-sits-differently-on-corner-placements)'s mechanism) + 3398 px of its shadow derivative + 1949 px of fixed-vs-absolute drop-shadow rasterization.                                                                                                                                                                                                                                          | 4366 — arrow and fringe survive                                                                                                                                        |
| `dialog-scroll`                                       | 1335             | H        | A 2px scroller-height delta: windmod's grid tracks resolve inside the content box where Griffel's separate scroller overflows its parent by the border. Structurally unclosable.                                                                                                                                                                                                                                                             | 1335 — persists in full, 0% GPU component                                                                                                                              |
| `tag-picker-open-ltr` / `-rtl`, `-width-ltr` / `-rtl` | 19 / 2 / 57 / 44 | N        | Coverage-gamma anti-aliasing: Chrome blends windmod's native top-layer listbox linearly while Griffel's inline surface takes the gamma path. A Griffel-vs-Griffel control reproduces windmod pixel-identically on 3 of the 4 scenes.                                                                                                                                                                                                         | Regresses to 9348/9348/4673/4673 — **GPU gate authoritative**                                                                                                          |
| `menu`, `menu-rtl`                                    | 413 / 412        | I        | The same top-layer compositing class as the TagPicker rows. Both ceilings cover measured bimodal GPU modes (`menu` 403–413, `menu-rtl` 402–412).                                                                                                                                                                                                                                                                                             | Both rows are bimodal under the flag and carry no no-GPU expectation. **GPU gate authoritative**                                                                       |
| `menu-sequel`, `menu-sequel-rtl`                      | 462 / 460        | Q5       | The same top-layer GPU-compositing class as the `menu` rows, over the larger menu the scene opens: shadow quantisation at the surface edges plus switch-thumb anti-aliasing, on byte-identical rects (138 px from the plain menu items, 322 px from the split-group cells). Promoting Griffel's own menu popover onto that compositing path reproduces the gate exactly — overlap 460/460, nothing on either side alone, in both directions. | No no-GPU expectation, as on the `menu` rows: software rasterization is bimodal for this family. **GPU gate authoritative**                                            |

**Why `--disable-gpu` is not simply a cleaner baseline.** Software rasterization does not put the two
surfaces back on the same path — it puts them on a _different pair_ of paths. Shipped-green strict-zero
control scenes (`combobox-open-ltr`, `dropdown-open-ltr`, …) measure 8964 under the flag with a
byte-identical diff signature to the TagPicker and Menu rows, which is exactly how those rows are known to
be harness noise rather than a windmod defect. A no-GPU number is also never the GPU number minus a
component: both captures move, by roughly 43 000 px each.

**None of this is consumer-visible.** Every row is a sub-pixel or few-pixel rendering artifact on one
scene; the two libraries agree on layout, colour and type everywhere in the table. It is recorded here
because a team taking the package on deserves to know precisely which pixels were signed off and on what
evidence, and because a VR harness pointed at this package will reproduce these numbers.

## What is not shipped

windmod reskins what the headless package ships and invents nothing. These have no windmod component:

| Not shipped                                                                                                        | Why                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Text` and the typography components, `Table`/`DataGrid`, `Tree`, the standalone `Carousel`, `Virtualizer`, `List` | no headless counterpart (the teaching-popover carousel is a different component and does ship — see [the teaching carousel](#the-teaching-carousel)) |
| `MessageBarGroup`                                                                                                  | no headless counterpart, and no visual contract to reskin (see [delta 21](#21-messagebar-has-no-group-animation-and-does-not-announce))              |
| `Overflow` and family                                                                                              | **scoped out permanently** — see below                                                                                                               |
| `Persona`'s `presence` slot and `presenceOnly` prop                                                                | the headless surface omits both; a windmod `Persona` cannot render a presence badge                                                                  |

All of these compose over windmod components without a shim: they are Griffel-styled containers around
windmod-styled children, and nothing in either library's CSS fights the other.

### `Overflow` will never be ported, and needs no migration step

Keep importing it from `@fluentui/react-components`:

```tsx
import { Overflow, OverflowItem, useOverflowMenu } from '@fluentui/react-components';
import { Button } from '@fluentui/react-windmod-preview/button';
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
- **A `MenuSplitGroup` whose two halves are different elements loses its seam styling.** The group selects
  its halves positionally with `:nth-of-type`, which counts by ELEMENT TYPE — so a `MenuItemLink` action
  half (an `<a>`) beside a `MenuItem` trigger half (a `<div>`) makes each half the _first_ of its own type.
  The zeroed inner radii, the leading padding and the 1px divider all stop applying, and both halves take
  `flex: 1` instead of only the first. Griffel's selector has the same shape and misfires identically, so
  both libraries render this the same wrong way. Keep both halves on the same element type.

### Mixing windmod with `@fluentui/react-components`

Griffel containers around windmod children work. The reverse — a windmod child inside a _headless_ (unstyled)
container — has gaps, because a windmod component reads the **windmod** context and only a windmod container
publishes it:

- A windmod `Tag` inside a headless `TagGroup` or `TagPickerGroup` falls back to `filled` / `medium`.
- A windmod `InteractionTagPrimary` or `InteractionTagSecondary` inside a headless `InteractionTag` falls
  back to `filled` / `rounded` / `medium`.
- A windmod `NavItem` inside a headless `Nav` gets `density: 'medium'` regardless of the Nav's props.

Use windmod containers for windmod children, and the values propagate normally.
