# CSS Modules parity

Private Cypress suite that renders the Griffel and CSS Modules versions of every v9 component inside the same Griffel
application, then compares computed root, slot and pseudo-element styles. It simulates apps that still use Griffel
(`makeStyles` overrides, custom style hooks, wrapper components, plain CSS class names) while adopting CSS Modules
components.

It is a separate project because specs import packages (for example `react-migration-*`, `react-timepicker-compat`)
that depend on `@fluentui/react-components`, which would create a dependency cycle there.

## Running

```sh
yarn nx run css-modules-parity:e2e
yarn nx run css-modules-parity:e2e --spec=e2e/Forms.cy.tsx
yarn nx run css-modules-parity:e2e:local # interactive runner

# Several runs in parallel: give each a distinct port and disable source watching.
cd apps/css-modules-parity
FUI_CYPRESS_NO_WATCH=1 WEBPACK_DEV_SERVER_PORT=24001 yarn run -T cypress run --component --spec e2e/Core.cy.tsx
```

Do not run the suite while editing CSS without `FUI_CYPRESS_NO_WATCH=1`; watch rebuilds stall the run.

Retries are disabled (`retries.runMode: 0`), because a parity sample must be deterministic. The one exception is
`Lazy.cy.tsx` (`runModeRetries`): the first lazily loaded test of each component only passes on a retry, see the TODO
there. CI runs the suite as the sharded `css-modules-parity` job in
[`.github/workflows/pr.yml`](../../.github/workflows/pr.yml), once per environment axis (default, `FUI_PARITY_DIR=rtl`,
`FUI_PARITY_SHADOW_DOM=1`, `FUI_PARITY_FORCED_COLORS=1` with `FUI_PARITY_THEME=teamsHighContrast`, and
`FUI_PARITY_THEME=webDark`), so a new spec file must be added to a shard. `Lazy.cy.tsx` has its own shard: in CI its
settle waits on CSS transitions that stay pending for seconds (about 30 minutes for the spec; locally under a minute).

Environment axes, combinable with every mode below:

| Variable                     | Effect                                                                                        |
| ---------------------------- | --------------------------------------------------------------------------------------------- |
| `FUI_PARITY_DIR=rtl`         | Renders the app right-to-left; app styles resolve in the same direction.                      |
| `FUI_PARITY_FORCED_COLORS=1` | Emulates `forced-colors: active` (asserted before every test).                                |
| `FUI_PARITY_SHADOW_DOM=1`    | Renders the app in a shadow root with Griffel's Shadow DOM renderer; plain CSS is copied in.  |
| `FUI_PARITY_LAYER=1`         | Wraps every Fluent CSS Modules stylesheet in `@layer fluent` (default mode only), see below.  |
| `FUI_PARITY_THEME=<name>`    | App theme: `webLight` (default), `webDark`, `teamsLight`, `teamsDark` or `teamsHighContrast`. |

Dedicated specs:

- [`Lazy.cy.tsx`](./e2e/Lazy.cy.tsx): CSS Modules components load in chunks after the app inserted its Griffel styles
  (the harness avoids the `@fluentui/react-components` barrel for this). The Griffel baseline renders eagerly: Griffel's
  own result depends on insertion order, a lazily rendered Griffel component wins ties against app rules.
- [`AppGlobalStyles.cy.tsx`](./e2e/AppGlobalStyles.cy.tsx): core components under a global reset stylesheet loaded
  first (element and universal selectors, like normalize or Tailwind preflight) and with app `makeResetStyles()`
  classes, alone and merged with `makeStyles()` overrides.
- [`CustomStyleHooks.cy.tsx`](./e2e/CustomStyleHooks.cy.tsx): custom style hooks that prepend their class, pick classes
  from component state, or come from a nested `FluentProvider` with another theme.
- [`app-patterns/`](./e2e/app-patterns): app styling run in the `app pattern` scenario (`ComponentSpec.useAppPattern`).
  A pattern hook returns the app's class name, props and surrounding markup, and can toggle app state (`toggles`, for
  example a selection), after which every state is sampled again. [`patternMatrix()`](./e2e/app-patterns/matrix.tsx)
  crosses components with patterns.
  - `SegmentedToggle`: a toggle reduced from a production app; keep such patterns close to their source.
  - `Shorthands`: one override per CSS shorthand family (`padding*`, `margin*`, `border*`, `outline`, `gap`, `flex`,
    `overflow`, `textDecoration`).
  - `Selectors`: attribute selectors, `:not()`, `:is()`, `:where()`, `:focus`, `:focus-visible`,
    `[data-fui-focus-visible]`, parent `:hover`, Fluent slot class descendants, `::before`/`::after`.
  - `AtRules`: overrides inside `@media`, `@supports`, `@container` and `@layer`.
  - `VariantOverrides`: sizes, shapes, icon-only and checked variants with stateful, slot and every-state overrides.
  - `DisabledOverrides`: `disabled`/`disabledFocusable` variants with `:disabled`, `[aria-disabled]`, `[disabled]` and
    class overrides.
  - `HeadlessIcons`: `bundleIcon` and headless icons with app rules showing/hiding the filled and regular icons and
    rotating a `flipInRtl` icon.
  - `GlobalClassSelectors`: an app CSS Module targeting `:global(.fui-*)` classes, inserted after and before Fluent's
    CSS, with and without `!important`.
  - `ForcedColorsOverrides`: app forced colors overrides of equal specificity (now beaten by component forced colors
    rules) and with `&&&` (still win; `&&` compiles to a single class).
  - `PhysicalOverridesRtl`: physical padding, margin and border overrides, `[dir="rtl"] &` rules, portals into mount
    nodes without `dir`, and nested providers in the other direction.
  - `SpecificityBoosters`: `&&` (a single class in Griffel) and `&&&` (a doubled class) boosters combined with a custom
    style hook and an app class name.
  - `ExternalTokenTheme`: a provider without a theme, tokens from an external stylesheet switched at runtime, local token
    overrides and a nested light region in a dark one.
  - `SurfaceOverrides`: app sizes, `overflow` and `z-index` on Popover, Menu and Tooltip surfaces with positioning
    options (`fallbackPositions`, `coverTarget`, `autoSize`, `mountNode`).
  - `ComponentVariables`: app-set component CSS variables (`--fui-Slider__*`, `--fui-Checkbox__indicator--*`,
    `--fui-Button__icon--spacing`, `--fui-Card--*`) against component state rules redefining them.
  - Component specs use the same mechanism for state changes: `Tab animated indicator` (`Navigation.cy.tsx`) selects
    the sampled tab when the app toggles, so the selection indicator slides from the previous tab.
- [`Positioning.cy.tsx`](./e2e/Positioning.cy.tsx): Popover, Menu, Tooltip, Combobox and Dropdown listboxes, InfoLabel
  and TeachingPopover across positions and alignments and positioning options, and drawers, each in a fixed-size stage
  that bounds Floating UI, so positions don't depend on the page.
- [`SSR.cy.tsx`](./e2e/SSR.cy.tsx) (Griffel buckets mode only): renders on the server in a Web Worker (no DOM, same
  bundle so class names match), injects the HTML and `renderToStyleElements()` output, compares both implementations
  before and after `hydrateRoot()`, and fails on hydration errors or style changes caused by hydration.

## How it works

- The bundler resolves every `.styles` import to its `.styles.css` alternative where one exists. Explicit
  `.styles.ts` imports keep the original Griffel hooks; [`griffel()`](./e2e/harness.tsx) recomposes a component
  from its state hook, Griffel style hook and render function to produce the baseline.
- Each `e2e/<Group>.cy.tsx` registers components with `describeParity`. Every component is rendered in base,
  stateful, slot, layout, custom style hook, wrapper and plain CSS scenarios ([app styles](./e2e/ParityApp.module.css),
  [Griffel app styles](./e2e/useParityAppStyles.styles.ts)) and sampled at rest, hover, pressed and keyboard focus.
  Components that move focus on mount (modal dialogs, drawers, menus) keep it in the last mounted copy, so at rest and
  hover focus is mirrored into the sampled copy first.
- Besides computed properties, the layout size (`box width`/`box height`, from `offsetWidth`/`offsetHeight`, so
  transforms and running animations don't affect it) of the root, its parent and sampled slots is compared, so layout differences such as a wrapper growing with the component's min-content width are reported.
- Specs with `geometry` also compare a positioned surface's placement (`data-popper-placement`), position and size
  relative to its trigger and its arrow's offset (rounded to 1/100 px); `positioned: false` covers CSS-laid-out
  surfaces such as drawers.
- Computed values that are equivalent but spelled differently are normalized: `text-align: start`/`end` by direction,
  generated keyframes names. Pseudo-elements without `content` compare only `content`, infinite animations skip the
  properties they animate, and properties set inline by component code (Floating UI) are skipped.
- Failures name the scenario, slot, property and both values. No numeric tolerances are applied.

A Griffel hook that composes another package's style hook (`useToggleButtonStyles_unstable` from
`@fluentui/react-button`) would receive its CSS alternative through the package index, and so would a hook imported
through a relative index module (`useCheckmarkStyles_unstable` from `../../selectable/index`);
[`griffelStyleImportsLoader`](./griffel-baseline/griffelStyleImportsLoader.js) redirects both to the Griffel hooks. [`GriffelBaseStyles`](./e2e/GriffelBaseStyles.tsx) inserts the Griffel Button and ToggleButton styles before
anything else renders: Griffel orders rules with different selectors and equal specificity by insertion, and in an app
(and in the CSS Modules import order) these base components come first. Components that render a sibling component
through an index file still receive its CSS alternative. Specs work
around this locally: they swap in Griffel child components, rebuild presets or shims from source, or (in
`FeedbackAndCompat`) re-instantiate webpack modules with Griffel hooks. Transitions that ignore reduced motion are
disabled where they would make sampling nondeterministic.

## Known differences

Tolerated only for values the app declared (and colors inherited from them):

- A plain CSS class name now beats component styles of equal specificity. App stylesheets were inserted before
  Griffel's runtime styles, so they used to lose; it still loses to a later-inserted Griffel rule of equal
  specificity (for example, from a custom style hook).
- An app's state rule now also applies in later interaction states. Griffel sorts app and component rules together
  into state buckets, so a component `:active` rule beat an app `:hover` or `:focus-within` rule of equal specificity
  (for example, Link and Checkbox pressed colors, Input pressed/focused border colors). Apps that restyle `:hover`
  should also declare the pressed and focused values they want.
- An app rule without a pseudo-class now beats a component state rule of equal specificity, for example
  `&[data-position="first"]` (one class plus an attribute) against a component `:hover` rule. Griffel put the app rule
  in its default bucket, before the component's `:hover` bucket ([`SegmentedToggle`](./e2e/app-patterns/SegmentedToggle.cy.tsx)).
- An app `makeResetStyles()` class now beats component styles. Griffel puts reset styles in its first bucket, so
  component styles of equal specificity won; CSS Modules component styles are an earlier stylesheet. Layout sizes that
  follow the app's padding and radius are tolerated too.
- A custom style hook that prepends its class (`mergeClasses(hookClass, state.root.className)`) now wins. In Griffel
  the component classes merged after it won every conflict; CSS Modules classes aren't atomic, so `mergeClasses()`
  argument order can't decide between them.

Composed components follow production Griffel, even where its result looks unintended: Griffel merges Button's
atomic appearance, disabled and checked classes after a wrapper's own styles, so a Hamburger, CarouselButton or
TeachingPopoverCarouselFooterButton keeps Button's colors for every appearance that sets them, and the CSS Modules ports
only apply the wrapper's colors where Griffel does.

Forced colors: Griffel sorted `@media` rules after all other rules, so a component's `@media (forced-colors: active)`
rule beat an app override of equal specificity without the media query. CSS Modules component rules are an earlier
stylesheet, so every component forced colors rule comes last in its stylesheet with one more type selector
(`.root:not(html):hover`). That wins ties, as Griffel's order did, but still loses to the component's own state rules
with one more class (`.root:hover:active`), as in Griffel; a doubled class would beat them. In forced colors, an
app override of a component inside any at-rule (`@media (forced-colors: active)`, `@media (min-width)`, `@container`:
Griffel ordered all of them by insertion, so the app's rule won) now needs more specificity for each state it
overrides, for example Griffel's `&&&` (`'&&&'`, `'&&&:hover'`, …). Griffel compiles `&&` to a single class, so `&&`
adds no specificity.

Direction: Griffel resolves direction from React context (`TextDirectionProvider`, set by `FluentProvider`), CSS from
the DOM (`:dir()`, logical properties). They differ only where the DOM direction differs from the context, for example
a Portal `mountNode` with its own `dir` other than the provider's; such content now follows its DOM direction. Component
direction rules use `:dir(rtl)`, which follows the nearest `dir` (each `FluentProvider` sets one), not `[dir='rtl']`
ancestors, which would also match above a nested provider in the other direction.

Some specs declare further, component-specific `knownDifferences` (for example, inherited backgrounds in plain CSS
scenarios), each with an explanation.

## Prototype: Griffel bucket ordering for CSS Modules

Opt-in modes that remove the known differences by ordering Fluent CSS Modules rules like Griffel orders component
styles. Known differences are not tolerated in these modes.

```sh
# Runtime: Fluent CSS Modules rules are inserted next to Griffel's runtime stylesheets.
FUI_PARITY_GRIFFEL_BUCKETS=1 yarn nx run css-modules-parity:e2e
# Build-time: Griffel styles are extracted, Fluent CSS Modules rules are sorted into Griffel's extracted stylesheet.
FUI_PARITY_EXTRACTION=1 yarn nx run css-modules-parity:e2e
```

- [`postcssGriffelBuckets`](./griffel-buckets/postcssGriffelBuckets.ts) annotates every rule of a Fluent stylesheet
  with Griffel's extraction markers (`/** @griffel:css-start [bucket] {"p":priority} **/`): the style bucket Griffel
  would use (by the selector's first pseudo-class) and a priority below Griffel's own (`-2.5`), so app rules of the same
  bucket win like the last class in `mergeClasses()`. It reads only the stylesheet: what can't be derived from the CSS
  comes from the `@griffel-buckets` directive at its top, for example
  `/* @griffel-buckets reset: .root, .icon; logical: padding-inline-start */`. Classes ported from `makeResetStyles()`
  go to the reset buckets (`r`/`s`), and so do the variant classes listed in `defaults:` (styles the Griffel reset class
  contained, such as a Button's `secondary`, `medium` and `rounded` styles); listed logical longhands get `-0.5`, as Griffel's physical shorthands don't remove
  them. The directive ships in the published `.module.css` files unchanged. The `fluentui/griffel-buckets` stylelint
  rule ([`tools/stylelint-rules`](../../tools/stylelint-rules/README.md)) keeps it in sync with the Griffel sources.
- Runtime: [`griffelBucketsStyleLoader`](./griffel-buckets/griffelBucketsStyleLoader.js) replaces `style-loader`;
  [`registerCSSModule()`](./griffel-buckets/registerCSSModule.ts) only registers the annotated rules in a global
  registry (`Symbol.for('@fluentui/css-modules-registry')`). Every `FluentProvider` inserts them with its Griffel
  renderer (`useFluentProviderCSSModules`), like Griffel inserts styles: into the renderer's target document (iframes,
  Shadow DOM), during render on the server (`renderToStyleElements()`), and again when lazily loaded chunks register
  more stylesheets. Their fractional priorities make Griffel position its own bucket stylesheets right after them; no
  Griffel change is needed.
- Extraction: `@griffel/webpack-plugin` already moves every extracted CSS module with these markers into its
  `griffel` chunk and sorts all rules by bucket, media query and priority; no Griffel change is needed with webpack.

Limitations: Griffel's `mergeClasses()` removes longhand classes overridden by a later shorthand class, which static CSS
can't express per app declaration. The priorities above follow the common case (apps overriding with `padding`,
`margin`, `border`, `inset`); an app overriding a component's `padding-inline-start` with `paddingInline` still loses.
Rspack identifies Griffel's CSS by its virtual loader instead of the markers, so extraction there needs a Griffel change.
Griffel's Shadow DOM renderer inserts every rule at the top of its stylesheet (`insertRule()` without an index), which
reverses CSS Modules source order; the harness appends rules instead, `@griffel/shadow-dom` needs the same fix.

Remaining differences (all specs, nothing tolerated):

- Custom style hooks that prepend their class: no bucket or priority reproduces `mergeClasses()` argument order
  between an app class and component classes.
- Tab and TabList (extraction only): the Griffel baseline itself differs from runtime Griffel, because extraction keeps
  shared atomic classes at their first occurrence, which reorders `padding` and `paddingBlock` (both priority `-1`).

## Cascade layer (`FUI_PARITY_LAYER=1`)

Wraps Fluent CSS Modules stylesheets in `@layer fluent { ... }`, as the experimental layered packages do. Unlayered
styles beat layered ones whatever their specificity, so this axis shows what a layer changes for apps:

- Global reset CSS: every core component differs (icon margins, colors, borders and sizes come from the reset).
- App overrides: an app's base declaration now also wins in hover, pressed and focus, because component state rules
  can't beat it (base-only, slot, layout, custom style hook and wrapper scenarios).

The axis is expected to fail; it isn't a mode the components should pass.

## Not covered

Published-package asset copying, production builds, SSR with streaming or a real server, iframes, CSP enforcement and
browsers other than the Cypress default.

Component states not compared:

- `SafeZoneArea` and the Portal mount node class (`usePortalMountNodeStyles`): see their `GAP:` entries in
  [`parity-exemptions.json`](./checks/parity-exemptions.json).
- Combobox and Dropdown `open`: their trigger styles don't depend on it; the open listbox is compared in
  `Positioning.cy.tsx` and through `TimePickerListbox` (`FeedbackAndCompat.cy.tsx`).
- `readOnly` is compared for Input, Textarea, SpinButton, Combobox and TimePicker, but no style hook reads it (native
  Select and Dropdown's button have no read-only state).
- OverlayDrawer backdrops nested in a Dialog (`treatBackdropAsNested`) or kept mounted while closed.

## Coverage

`yarn nx run css-modules-parity:test` fails when a `*.styles.css.ts` hook has neither a parity spec importing its
`.styles.ts` baseline nor an entry in `checks/parity-exemptions.json`. Entries prefixed `GAP:` are known missing specs;
remove the entry when its spec lands (a stale entry fails the check).
