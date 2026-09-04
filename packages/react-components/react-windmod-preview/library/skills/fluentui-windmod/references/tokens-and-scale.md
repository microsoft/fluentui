# Tokens, sizing and the density knob

Read this when picking a token, when layout is the wrong size, or when `--base-scale` comes up.

## The rule

**Never hardcode a palette value.** Use the kebab-case Fluent theme tokens. The theme drops Tailwind's
default palette, type ramp, radii and shadows entirely — `--color-*`, `--font-*`, `--text-*`,
`--font-weight-*`, `--tracking-*`, `--leading-*`, `--radius-*`, `--shadow-*`, `--inset-shadow-*`,
`--drop-shadow-*`, `--blur-*` and `--animate-*` are all set to `initial` — so a stray `text-red-500` or
`rounded-lg` **fails the build** rather than silently diverging from Fluent. Structural utilities (flex,
grid, positioning, sizing) remain.

Two ways to reach a token, both valid:

```css
/* utility form */
@apply rounded-medium bg-neutral-background-1 text-neutral-foreground-1;

/* custom-property form, for anything a utility cannot spell */
box-shadow: 0 0 0 2px var(--color-stroke-focus-2) inset;
```

Tokens register through `@theme inline`, which substitutes `var(--token)` into each utility — so values
stay per-element custom properties and continue to respond to theme scoping. (A non-inline `@theme`
alias would freeze resolution at `:root`.)

## Colour

| Family                                                                                           | Shape                                                                                                                      |
| ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `--color-neutral-background-1…8`                                                                 | plus `-hover`, `-pressed`, `-selected`, `-disabled`, `-static`, `-inverted`, `-alpha`                                      |
| `--color-neutral-foreground-1…5`                                                                 | plus `-hover`, `-pressed`, `-selected`, `-static`, `-disabled`, `-inverted`, and the `-brand-*` and `-link-*` sub-families |
| `--color-neutral-card-background`                                                                | plus `-hover`, `-pressed`, `-selected`, `-disabled`                                                                        |
| `--color-neutral-stroke-*`                                                                       | the stroke family                                                                                                          |
| `--color-brand-background`                                                                       | plus `-2`, `-3-static`, `-4-static`, `-hover`, `-pressed`, `-selected`, `-inverted*`, `-static`                            |
| `--color-brand-foreground-1`, `-2`, `-link`, `-inverted`, `-on-light`                            | each with state suffixes                                                                                                   |
| `--color-brand-stroke-1`, `-2`                                                                   | plus `-contrast`, `-hover`, `-pressed`                                                                                     |
| `--color-compound-brand-background\|foreground-1\|stroke`                                        | plus `-hover`, `-pressed`                                                                                                  |
| `--color-status-*`                                                                               | success / warning / danger / severe families                                                                               |
| `--color-stroke-focus-1`, `-2`                                                                   | the focus indicator colours                                                                                                |
| `--color-background-overlay`, `--color-scrollbar-*`, `--color-subtle-*`, `--color-transparent-*` |                                                                                                                            |
| `--color-palette-*`                                                                              | the raw ramp — prefer a semantic token above                                                                               |

Utility prefixes are the Tailwind ones: `bg-neutral-background-1`, `text-neutral-foreground-1`,
`border-neutral-stroke-1`.

**Picking a colour token** — the same four questions each time:

1. **Purpose** — background (`bg-`), foreground (`text-`), or stroke (`border-`)?
2. **Family** — neutral, brand, compound-brand, or status?
3. **Emphasis** — the numeric step (`-1` is the most prominent surface / strongest text)
4. **State** — resting, `-hover`, `-pressed`, `-selected`, `-disabled`

> "I need the background of a secondary button in its pressed state"
> → purpose: background → family: neutral → step: 1 → state: pressed
> → `--color-neutral-background-1-pressed` / `bg-neutral-background-1-pressed`

When matching a Griffel component, read the Griffel source for the token it names rather than guessing
from the rendered colour.

## Typography

```
--text-base-100 … --text-base-600          font sizes
--text-hero-700 … --text-hero-1000
leading-<n>                                 n / 100, for ANY bare integer n — pure arithmetic
leading-<a>/<b>                             exact ratio a/b, for a value n/100 can't express
--text-icon-12|16|20|24|28|32|48            glyph sizes
--font-base | --font-monospace | --font-numeric
--font-weight-regular|medium|semibold|bold
```

**Font size keeps a base/hero split; line height does not — and line height is not a token at
all.** There is no `--leading-*` token registry: `leading-*` is a functional `@utility` in
`css/index.css` that compiles a class straight into a `line-height` declaration, with no backing
custom property and nothing to look up.

- **`leading-<n>`** — any bare integer `n`, compiles to `calc(n / 100)`. `leading-140` is `1.4`;
  `leading-83` is `0.83`; `leading-200` is `2`. There is no fixed vocabulary and no
  `leading-base-300` implying "the line height that goes with `text-base-300`" — pick whichever
  integer gives the ratio you actually want on the element you're styling, the same way you'd pick
  a spacing value. `--value(integer)` rejects zero-padded spellings at compile time — `leading-083`
  silently compiles to nothing; use `leading-83`.
- **`leading-<a>/<b>`** — an exact ratio, for a value two hundredths-of-a-ratio digits can't
  express: `leading-20/14` is exactly `20/14` (`1.428571…`), not the `1.43` that `leading-143`
  would give. Reach for this only when the exact fraction matters — the corpus's repeating ratios
  (`20/14`, `16/12`, `20/12`, and the like) use this form.
- **Bracket/paren forms pass through as explicit opt-outs** — `leading-[1.5]`, `leading-(--my-var)`
  — Tailwind's own arbitrary-value handling for the `leading` root, untouched by this package's
  `@utility`, since it claims only the bare-integer and `a/b` shapes. Neither form is used in this
  library's own corpus (this corpus authors only `leading-<int>` / `leading-<int>/<nonzero int>`)
  — they exist for consuming applications.
- **`leading-none` is not part of the vocabulary.** It is a real Tailwind static utility
  (`line-height: 1`) and still compiles — nothing in this package's setup suppresses it — but it
  reads as "no line-height" rather than "ratio 1", so this corpus never authors it. Use
  `leading-100`.

A leading value is a **unitless ratio**, so it is not a length: it multiplies the element's own
font-size, descendants inherit the ratio rather than a px box, and a JS read wanting a length must
multiply the value back out by the element's own computed font-size — see the authoring rule in
authoring-conventions.md for how a site picks its ratio against its OWN font-size, and
`css-var-values.md` / `useCssVarValue`'s doc comment for why a leading ratio specifically cannot be
read back through a custom-property hook (there is no custom property to read).

The icon glyph family has no Fluent token equivalent — the sizes come from the icon set itself, so they
are registered by the theme rather than generated from Fluent's token set.

## Spacing

```
--spacing-horizontal-none|xxs|xs|s|s-nudge|m|m-nudge|l|xl|xxl|xxxl
--spacing-vertical-none|xxs|xs|s|s-nudge|m|m-nudge|l|xl|xxl|xxxl
--spacing-thin|thick|thicker|thickest        stroke widths
```

Utility form: `px-horizontal-m`, `py-vertical-s`, `border-(length:--spacing-thin)`.

A **numeric axis** also exists — `p-12`, `gap-8` — reading as px and computing through `--base-scale`.
Both forms share the one density knob. Prefer the named Fluent steps; the numeric axis is for values the
named scale does not carry.

## Radius, shadow, motion, stacking

```
--radius-none|small|medium|large|x-large|circular
--radius-2-x-large … --radius-6-x-large
--shadow-2|4|8|16|28|64                      each with a -brand twin
--transition-duration-ultra-fast|faster|fast|normal|gentle|slow|slower|ultra-slow
                                             = 50, 100, 150, 200, 250, 300, 400, 500 ms
                                             utility form: duration-faster
--ease-linear | --ease-easy-ease | --ease-easy-ease-max
--ease-accelerate-min|mid|max | --ease-decelerate-min|mid|max
--z-index-background|content|overlay|popup|messages|floating|priority|debug
```

Two custom utilities the theme adds on top: `fui-focus-outline` and `fui-focus-ring`.

## The density knob

```css
--base-scale: calc(1rem / 16px * var(--fui-scale, 1));
--spacing: calc(1px * var(--base-scale));
--text-base-300: calc(14px * var(--base-scale));
--radius-medium: calc(4px * var(--base-scale));
```

Griffel writes literal pixels. windmod puts **spacing, control heights, radii, shadows and the whole
type ramp** on one knob. (`--radius-none` is 0 and `--radius-circular` is the 10000px fully-round
sentinel the browser clamps to half the box — neither meaningfully scales, so both stay literal.)

- At a 16px root font size the two libraries are identical. That is the parity condition, and it is what
  the pixel gate verifies.
- Change `html { font-size: … }` and the whole windmod UI scales coherently, where Griffel's would only
  move its text. That is an improvement, but it is a **difference**: an app with a non-16px root font
  size will see windmod controls larger or smaller than the Griffel ones they replace.
- **`--base-scale` and everything derived from it are declared at the document root.** A raw custom-property
  override has to go there too — setting `--base-scale` on a provider or a subtree does nothing, because
  descendants inherit the already-substituted token stream. To scale ONE subtree, use the `ScaleRegion`
  component (`/provider` export): it stamps the theme package's `.fui-scale-region` class, which is grouped
  into the `:root, :host` invariant emission so every scale-riding formula re-substitutes at the region, and
  it sets the region's `--fui-scale` factor from `data-fui-scale` via typed attr(). Factors are absolute —
  nested regions replace, never compound.

A handful of literals stay fixed by design where Griffel is also fixed: stroke widths (borders must not
thin with layout density) and a few 1px nudges.

## What responds at runtime, and what does not

| Token family             | Runtime override?            |
| ------------------------ | ---------------------------- |
| colour                   | ✅ live `var()` reference    |
| typography               | ✅ live                      |
| stroke / radius / shadow | ✅ live                      |
| **spacing**              | ❌ **inlined at build time** |

Tailwind's `--spacing-*` namespace resolves at compile time, so a rule that reads
`var(--spacingHorizontalM)` in Griffel reads `calc(var(--spacing) * 12)` in windmod. Redeclaring a
Fluent _spacing_ token at runtime therefore moves nothing.

For density, use `--base-scale` at the document root. For a one-off, set the property you actually want
on your own unlayered class.

## Custom themes

A theme is a CSS class that redeclares token custom properties. `FluentProvider`'s `theme` accepts any
string:

```css
.my-brand-theme {
  --color-brand-background: #6b21a8;
  --color-brand-background-hover: #7e22ce;
  --color-brand-background-pressed: #581c87;
  --color-compound-brand-background: #6b21a8;
}
```

```tsx
<FluentProvider theme="my-brand-theme">…</FluentProvider>
```

The seven shipped themes are exactly this — generated classes carrying custom properties only, which is
why a theme class can be applied to any element, not just a provider. The `:root, :host` defaults are
web light.

**A partial theme is the normal case.** You redeclare the handful of tokens you are actually changing;
every token you leave out inherits from the theme stacked above, by ordinary cascade. There is no
"complete theme" checklist to satisfy — a four-token brand class layered over `webLightThemeClassName`
is a legitimate theme.

**Write it as plain global CSS.** `theme` takes a literal class-name string, so a CSS-Modules class
would arrive hashed and select nothing.

**To theme one part of a page, nest a second `FluentProvider` around it** with the inner `theme`. Tokens
are inherited custom properties, so the inner provider redeclares them for its subtree and the rest of
the app keeps the outer theme. A bare `<div className={themeClass}>` moves the tokens too, but only the
provider paints the base background and typography — and, being a real element, the provider becomes the
flex or grid item in your layout.

Do not port a Griffel theme object; there is nothing to pass it to.

## Computed-value gotchas

- **`box-shadow` strings are longer.** Tailwind's shadow and ring utilities prepend fully transparent
  layers, so `getComputedStyle(el).boxShadow` returns more than Griffel's `var(--shadow4)` — same
  painted result. `shadow-none` computes to five transparent layers rather than the literal `none`.
  Snapshot tests asserting on computed `box-shadow` need updating; nothing about the rendering does.
- **Opacity modifiers mix in oklab.** Tailwind's default interpolation space is oklab, so a translucent
  colour computes as `oklab(… / 0.3)` where Griffel writes `color-mix(in srgb, … )`. Verified to cost
  nothing in pixels on the surfaces it appears on.
- **`text-align` is logical.** The provider sets `text-align: start` where Griffel compiles a
  `left`/`right` pair. Identical whenever an element's direction matches the provider's; the one
  divergence is a `dir`-flipped subtree inside a provider of the opposite direction, where windmod
  follows the subtree (correct i18n) and Griffel stays physically left.
