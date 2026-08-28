# Differences from `@fluentui/react-components`

The package's `MIGRATION.md` enumerates **fifty-six** deliberate differences in full. This is the
routing layer: the ones that change how you style, test or debug, grouped by what they break. Load the
full document from
`node_modules/@fluentui/react-windmod-preview/MIGRATION.md` when a specific delta needs its detail.

## What is identical

Start here, because it is most of the surface:

- **The DOM** — element structure, slot names, `role`s and ARIA wiring, because both libraries render
  through the same headless renderers.
- **The props** — the headless props plus the same look props Griffel takes (`appearance`, `shape`,
  `size`, `orientation`, …) with the same defaults.
- **The pixels**, at a 16px root font size. Rest-state rendering is byte-identical across the shipped
  matrix, including forced-colors rules, RTL and the icon glyph swaps, verified at a strict-zero pixel
  threshold.
- **Slot `className` merging** — your class lands last on every slot.
- **Context behaviour** — components read their own contexts the way Griffel's do (`ButtonContext`,
  `LinkContext`, `AvatarContext`, `FieldContext`, …).

## Setup and API

| #   | Delta                                                          | What to do                                                                                                                        |
| --- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `theme` is a **class name**, not a theme object                | `theme={webDarkThemeClassName}`. Port a custom theme object to a CSS class.                                                       |
| 2   | The theme stylesheet is a separate, required import            | `import '@fluentui/react-tailwind-theme-preview/styles.css'` before your own CSS.                                                 |
| 3   | The provider is a real element **and it paints**               | It is the flex/grid item, not its children; it repaints coloured surfaces. `background: transparent` via `className` if unwanted. |
| 4   | No `useCustomStyleHook_unstable`                               | Restyle through CSS.                                                                                                              |
| 5   | Public classes are lower-case; `classNames.root` is a **pair** | `.fui-button`, not `.fui-Button`. No per-slot classes at all.                                                                     |
| 6   | No root barrel — every import names a family                   | `CardHeader` from `'…/card'`, `MenuItem` from `'…/menu'`. Names unchanged; paths change.                                          |
| 7   | `Input`/`Textarea` drop the deprecated shadow appearances      | Map `filled-*-shadow` to its non-shadow twin.                                                                                     |
| 8   | `required` renders no asterisk on `Checkbox`/`Switch`          | Wrap in a `Field` with `required` if you need the `*`. The attribute still reaches the input.                                     |

## The styling model

| #   | Delta                                                                  | What to do                                                                                     |
| --- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| 9   | Everything scales with the root font size                              | Keep `html { font-size: 16px }` for Griffel parity. `--base-scale` lives at the document root. |
| 10  | **Cascade layers replace specificity juggling**                        | Your unlayered one-class rule wins. Do **not** wrap overrides in `@layer`.                     |
| 11  | Spacing tokens are inlined at build time                               | Runtime spacing-token overrides do nothing. Use `--base-scale`, or set the property directly.  |
| 12  | Some computed style strings differ with no visual difference           | Update snapshot tests asserting on computed `box-shadow`.                                      |
| 13  | Text alignment is logical, not physical                                | Only diverges in a `dir`-flipped subtree inside an opposite-direction provider.                |
| 22  | **`prefers-reduced-motion` is suppressed globally**, not per component | One unlayered floor rule. Your classed rules already outrank it.                               |

Delta 22 in detail, because it changes behaviour you may be measuring. The floor sets 1ms durations and
delays on `*`, `*::before`, `*::after` plus `animation-iteration-count: 1`, with one carve-out: the
Spinner's rotation stays at **1.8s, linear, infinite** — Griffel's own under-reduce value, because a
loading indicator that does not move stops being one.

Measured differences under emulated `reduce`:

| Motion                                    | Griffel           | windmod |
| ----------------------------------------- | ----------------- | ------- |
| `ProgressBar` determinate width           | tweens over 0.3s  | jumps   |
| `AccordionHeader` chevron                 | rotates over 0.2s | jumps   |
| `Nav` row background                      | 0.1s              | instant |
| `NavItem` selection indicator + icon swap | 0.1s keyframes    | instant |

And the one consequence to guard against: the bare `*` means `transition-property` defaults to `all`,
so under the preference **every** element carries a 1ms transition. `transitionend` now fires where it
previously would not. Do not key logic on a `transitionend` arriving only for elements you styled.

## Focus and keyboard

| #   | Delta                                                                      | What to do                                                                                                                                                           |
| --- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 14  | Focus rings follow the browser (`:focus-visible`), not keyborg             | Two edges where native is more generous: keyboard-then-click keeps the ring; click-then-arrow shows it. Neither is a defect. Update visual tests that capture focus. |
| 15  | Arrow-key navigation comes from `focusgroup`, not tabster                  | Needs browser support or a polyfill. **`Nav` publishes none** — one Tab stop per row instead of one for the whole nav.                                               |
| 16  | `Accordion`'s `navigation` and `BreadcrumbButton`'s `focusMode` do nothing | Absent from the headless surface; TypeScript rejects them.                                                                                                           |
| 17  | `TagGroup` does not restore focus after dismiss                            | Move focus yourself in `onDismiss` before the tag unmounts.                                                                                                          |

## Motion and mounting

| #   | Delta                                                                                  | What to do                                                                                                                                                                     |
| --- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 18  | `Accordion` has no collapse animation                                                  | —                                                                                                                                                                              |
| 19  | **`Accordion` keeps closed panels mounted — state persists**                           | React state, uncontrolled inputs, scroll position and timers survive close/open. If you relied on unmount to reset a form, reset explicitly or key children on the open state. |
| 20  | `Nav` has no collapse motion, and an open sub-item group **clips** rather than scrolls | Add `overflow-y: auto` yourself if you height-constrain a `NavSubItemGroup`.                                                                                                   |
| 21  | `MessageBar` has no group animation and does not `announce()`                          | `MessageBarGroup` is not shipped. Announce yourself, or nest in a Griffel provider.                                                                                            |
| 36  | Popover surfaces have no enter motion                                                  | Resting render is unchanged.                                                                                                                                                   |

## Anchoring and the top layer

These are the ones most likely to surprise a styling change.

| #   | Delta                                                                    | What to do                                                                                                                                                                                                          |
| --- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 27  | **Anchored components require CSS anchor positioning, with no fallback** | No `@supports` guard, no polyfill, no floating-ui path. On Firefox and Safari today the surface renders unpositioned at the viewport origin. Polyfill, or keep `Tooltip`/`Popover` on `@fluentui/react-components`. |
| 28  | `Tooltip`'s arrow sits differently on corner placements                  | ~−36.6px / +35.0px on aligned placements. Edge-centred placements are unaffected.                                                                                                                                   |
| 37  | A surface outside every provider reads the **document root's** theme     | It is rendered inline and promoted to the top layer, so it inherits from its DOM position. Wrap the trigger in a `FluentProvider`.                                                                                  |
| 38  | **The surface inherits arbitrary CSS from its DOM ancestors**            | `letter-spacing`, `text-transform`, `font-variant`, a wrapper's `color` — all reach it, where a Griffel portal saw none of it. Set those properties explicitly on the surface if you relied on portal isolation.    |
| 35  | A focus-trapping surface carries no `aria-modal`                         | `dialog:modal` already conveys modality. Update assertions.                                                                                                                                                         |
| 40  | `InfoButton` has no `inline` prop; its popover is always top-layer       | Its default placement is aligned, so delta 28's arrow displacement is the out-of-the-box appearance.                                                                                                                |

## Composition and context

| #   | Delta                                                                           | What to do                                                                                                                                                                                                          |
| --- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 23  | **A local prop beats a context value**                                          | Griffel lets context win even over an explicit prop. If you relied on a container overriding explicit sizes, remove the explicit prop. Callbacks compose (context first), `className` concatenates with yours last. |
| 24  | `Field` does not push `size` into its control                                   | Pass `size` to both. Measured gap: 8px control height, 2px font size.                                                                                                                                               |
| 25  | A nested `Field` renders its label with the outer Field's orientation and size  | Avoid nesting, or set the inner label explicitly.                                                                                                                                                                   |
| 26  | `Card` selection is not focus-aware                                             | Supply `shouldRestrictTriggerAction` yourself if the card contains interactive content.                                                                                                                             |
| 46  | `Combobox`/`Dropdown` listboxes are not clamped to the space around the trigger | `<Combobox listbox={{ style: { maxHeight: '20rem', overflowY: 'auto' } }} />`                                                                                                                                       |

## Places windmod renders _more correctly_ than Griffel

Kept rather than matched, because copying would have imported a defect. Listed so a pixel-diffing audit
is not surprised.

- **47** — a current `BreadcrumbButton` keeps its hover and press styling (Griffel's cascade lets a later
  rule beat the current-item styling it evidently intends).
- **48** — pressing a `Card` styles the card, not its descendants (Griffel's compiled selector is
  `.card:hover, .card :active` — a stray descendant combinator).
- **52** — `layout="offset"` right-alignment reaches only the footer's own children (Griffel's is a
  descendant combinator).
- **53** — `appearance={undefined}` on a carousel footer button no longer clobbers the derived appearance.
- **54** — `disabledFocusable` on a carousel footer button actually blocks the click.

## What is not shipped

| Not shipped                                                                                         | Why                                                                                               |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `Text` and the typography components, `Table`/`DataGrid`, `Tree`, `Carousel`, `Virtualizer`, `List` | no headless counterpart                                                                           |
| `MessageBarGroup`                                                                                   | no headless counterpart, no visual contract to reskin                                             |
| `Overflow` and family                                                                               | **scoped out permanently** — it is renderless, and a component with no skin has nothing to reskin |
| `Persona`'s `presence` slot and `presenceOnly` prop                                                 | the headless surface omits both                                                                   |

All of them compose over windmod components without a shim — Griffel-styled containers around
windmod-styled children, and neither library's CSS fights the other. Keep importing them from
`@fluentui/react-components`:

```tsx
import { Overflow, OverflowItem, useOverflowMenu } from '@fluentui/react-components';
import { Button } from '@fluentui/react-windmod-preview/button';
```

`Overflow`'s whole family ships two token-free declarations —
`[data-overflowing] { display: none }` and `[data-overflow-menu] { flex-shrink: 0 }` — which is exactly
why they are as correct over windmod-styled items as over Griffel-styled ones. The cascade win is
structural: the component's own `display: inline-flex` is layered, and those two rules are unlayered.

## Mixing the two libraries

- **Griffel container around windmod children** — works.
- **Headless (unstyled) container around windmod children** — has gaps. A windmod component reads the
  _windmod_ context and only a windmod container publishes it. A windmod `Tag` inside a headless
  `TagGroup` falls back to `filled`/`medium`; a windmod `NavItem` inside a headless `Nav` gets
  `density: 'medium'` regardless.

Use windmod containers for windmod children.

## Known issues affecting both libraries

Shared upstream code, so windmod is at exact parity. Consumer-actionable, not caused by migrating:

- `InteractionTagPrimary` silently loses selection when you pass `onClick` (the base hook spreads
  `...props` after its own merged handler — `onClick={undefined}` loses both).
- `BreadcrumbButton`'s `as` prop is mis-parsed — any truthy `as` yields an `<a>`. Set `href`, omit `as`.
- `SwatchPicker` and `SwatchPickerRow` discard a consumer `style`. Use `className`.
- A vertical `AlphaSlider` reports a horizontal orientation to assistive technology.
- `ColorArea`'s progress custom properties cannot be overridden by a consumer (the two slider hooks
  spread consumer-wins; `ColorArea` spreads hook-wins).
- `SpinButton`'s held-mouse spin does not report its spin state.
- A disabled `ColorSwatch` loses its 1px border on hover.
- A `MenuSplitGroup` whose halves are different element types loses its seam styling (`:nth-of-type`
  counts by element type). Keep both halves on the same element type.
