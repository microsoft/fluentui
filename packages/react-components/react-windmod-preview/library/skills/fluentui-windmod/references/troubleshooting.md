# Troubleshooting

Keyed on the symptom. Each entry gives the cause and the fix.

## "My override is not applying"

The most common problem, and almost always one of four things.

**Cause 1 — the override is inside an `@layer`.**
Unlayered author CSS beats layered author CSS regardless of selector weight. Putting your rule in a
layer forfeits the contest you win by default, and if your layer was declared before `fui.utilities` it
loses to Tailwind's utilities too.

```css
/* ❌ */
@layer app {
  .cta {
    background: rebeccapurple;
  }
}
/* ✅ */
.cta {
  background: rebeccapurple;
}
```

**Cause 2 — the rule is layered and you never wrote `@layer`.**
This is Cause 1 with nothing to find in your own file, which is why it survives the first fix and is the
version that actually reaches a bug report. `@layer components { … }` is ordinary Tailwind idiom that
predates windmod in most codebases; some frameworks and bundler CSS pipelines also wrap imported global
stylesheets in a layer of their own.

```css
/* ❌ a house convention, not a windmod decision — and it still loses */
@layer components {
  .cta {
    background: rebeccapurple;
  }
}
```

Fix: unlayer the rule, or declare your own layer after `fui.utilities`:

```css
@layer fui.theme, fui.base, fui.components, fui.utilities, app;
```

**How to tell Cause 1 from Cause 2 in ten seconds.** Do not reason about it — look. DevTools' Styles
pane labels every matched rule with the layer it landed in (unlayered rules carry no label) and strikes
through the declarations that lost. If your rule shows a layer name you did not write, it is Cause 2. If
it is unlayered and still struck through, the winner is another unlayered rule of yours and this is an
ordinary specificity question, not a windmod one.

**A note on import order, because it is the usual suspect and it is usually innocent here.** Loading
`@fluentui/react-tailwind-theme-preview/styles.css` first is genuinely required — without it the
components' `var()` references resolve to nothing — and first-appearance order settles how _your_ named
layers sort against `fui.*`. But it cannot break a plain unlayered override: unlayered author CSS
outranks every layer in the origin regardless of which sheet loaded first. If your rule is unlayered and
not applying, import order is not the reason. Keep looking.

**Cause 3 — the selector targets something that is not public.**
A hashed ident (`fuicm-button-icon-a1b2c3`), a Griffel-era class (`.fui-Button`, `.fui-Button__icon`),
or a structural position (`.fui-button > span:nth-child(2)`).

Fix: target `.fui-<component>`, a published `data-*`, or a class you added. Reach internals through
group variants.

**Cause 4 — you are inside the library.**
Package styles are all layered. The consumer override model does not apply; see
[authoring-conventions.md](authoring-conventions.md).

## "`document.querySelector` throws on a class-name constant"

**Cause:** `xClassNames.root` is the space-separated **pair** `"fui-button group/fui-button"`, not a
single class. `'.' + pair` is an invalid selector.

**Fix:** query the identity class. Use the constant only in `className`.

```tsx
document.querySelectorAll('.fui-button'); // ✅
document.querySelectorAll('.' + buttonClassNames.root); // ❌
```

## "A `group-…/fui-x` class does nothing"

**Cause 1:** the variant does not exist under that name. Check both catalogs — see
[variant-catalog.md](variant-catalog.md).

**Cause 2:** your Tailwind build has not been given the catalogs, so the class compiled to nothing.

**Fix:** import both into your Tailwind entry stylesheet:

```css
@import '@fluentui/react-tailwind-theme-preview/css/variants.css';
@import '@fluentui/react-windmod-preview/variants.css';
```

**Cause 3:** you used a numeric size variant. `size-16` reads as a Tailwind utility and is deliberately
not in the catalog. Numeric `data-size` is coerced instead:
`calc(attr(data-size type(<number>)) * 1px)`.

**Cause 4:** the state is on a native input, not on the root. Use the sibling form —
`peer-checked/fui-switch:` — not the group form.

## "A Tailwind class fails the build" (`text-red-500`, `rounded-lg`, `shadow-md`)

**Cause:** the theme sets `--color-*`, `--font-*`, `--text-*`, `--font-weight-*`, `--tracking-*`,
`--leading-*`, `--radius-*`, `--shadow-*` and more to `initial`, deliberately, so a value outside the
Fluent system fails loudly instead of diverging silently.

**Fix:** use a Fluent token — `text-neutral-foreground-1`, `rounded-medium`, `shadow-16`. See
[tokens-and-scale.md](tokens-and-scale.md). Structural utilities (flex, grid, positioning) still work.

## "Nothing is styled at all"

**Cause 1:** `@fluentui/react-tailwind-theme-preview/styles.css` is not imported. The components' `var()`
references resolve to nothing.

**Cause 2:** CommonJS or an SSR setup that drops the ESM side-effect import of the component
chunks.

**Fix:** import `@fluentui/react-windmod-preview/styles.css` explicitly — the aggregate carrying
the root sheet and every component in one file.

## "Borders and shadows are missing, or the wrong component wins"

**Cause:** `@fluentui/react-windmod-preview/base.css` is not loaded. Component CSS ships per
component; the root sheet carries the two things that cannot live in a chunk — the `@property`
registrations that give Tailwind's `--tw-*` variables their initial values (missing ⇒ borders,
shadows and rings lose their values), and the cascade-layer order (missing ⇒ layers resolve in
whatever order chunks happened to load, so a composed component can lose to its own base).

A development build logs a warning naming this. It looks for the layer-order declaration rather
than a specific stylesheet URL, so it does not false-positive when `base.css` is `@import`ed into
the app's own root stylesheet.

**Fix:** load it once, ahead of everything else:

```js
import '@fluentui/react-windmod-preview/base.css';
```

or at the top of the app's own root stylesheet:

```css
@import '@fluentui/react-windmod-preview/base.css';
```

Loading `@fluentui/react-windmod-preview/styles.css` instead also fixes it — it inlines the root
sheet.

## "Everything is the wrong size"

**Cause:** the app sets a non-16px root font size. `--base-scale` is `calc(1rem / 16px)`, and spacing,
control heights, radii and the whole type ramp ride it — so the entire UI rescales coherently, away from
Griffel's fixed pixels.

**Fix:** keep `html { font-size: 16px }` for Griffel parity, or accept the rescale deliberately. Do not
try to correct it on a provider — `--base-scale` is declared at the **document root** and an override
has to go there too.

## "Overriding a spacing token changes nothing"

**Cause:** Tailwind's `--spacing-*` namespace resolves at compile time, so `var(--spacingHorizontalM)`
is `calc(var(--spacing) * 12)` in the compiled output. There is no live reference to redeclare.

**Fix:** use `--base-scale` at the document root for density, or set the property you want directly on
your own unlayered class. Colour, typography and stroke tokens _are_ live and do respond.

## "`Tooltip` / `Popover` renders in the corner of the page"

**Cause:** the browser does not support CSS anchor positioning. The headless positioning layer uses it
with no `@supports` guard, no feature detection, no polyfill and no floating-ui fallback. As of today
that means Firefox and Safari, and the failure is total on those engines.

**Fix:** polyfill CSS anchor positioning, or keep `Tooltip` and `Popover` on
`@fluentui/react-components` — Griffel containers compose over windmod children without trouble.

## "A popover surface picked up styling from an ancestor"

**Cause:** the surface is rendered inline and promoted to the native top layer, so it inherits from its
DOM position — `letter-spacing`, `text-transform`, `font-variant`, a wrapper's `color`. A Griffel
portalled surface saw none of that.

**Fix:** set those properties explicitly on the surface. Related: a trigger outside every
`FluentProvider` renders its surface with the **document root's** theme; wrap the trigger in a provider
to control it.

## "An animation stopped working"

**Cause:** the theme ships a global `prefers-reduced-motion` floor — one **unlayered** rule setting 1ms
durations and delays on `*`, `*::before`, `*::after`, with `animation-iteration-count: 1`.

**Fix:** the floor is unlayered but **selector-less**, so any rule of yours with a class in it already
outranks it. Re-declare the duration from unlayered CSS or inline. There is no `!important` to fight.

```css
.loading-pulse {
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
}
```

## "`transitionend` is firing for elements I never styled"

**Cause:** under `prefers-reduced-motion: reduce`, the floor's bare `*` selector leaves
`transition-property` at `all`, so every element in the document carries a 1ms transition on every
animatable property.

**Fix:** do not key logic on a `transitionend` arriving only for elements you styled. Filter on the
target, or on `propertyName`.

## "A snapshot test broke after migrating"

Likely one of:

- **computed `box-shadow`** — Tailwind's shadow and ring utilities prepend fully transparent layers, so
  the string is longer. `shadow-none` computes to five transparent layers, not `none`. Same painted
  result.
- **`aria-modal`** — a focus-trapping popover surface no longer carries it; the native `<dialog>` opened
  with `showModal()` conveys modality via `dialog:modal`.
- **`AvatarGroup` overflow button** — carries `aria-haspopup="true"` where Griffel carries a
  `data-tabster` focus-restorer.
- **`InfoButton` trigger** — carries `aria-haspopup="true"` always and `aria-details` while open.
- **`role="navigation"` on `NavDrawer`** — it is on the drawer **body**, not the root.
- **class names** — lower-case (`fui-button`), no per-slot classes, hashed internals.

## "A component behaves differently from its Griffel twin"

Check [griffel-deltas.md](griffel-deltas.md) first — there are fifty-nine documented differences and this
is very likely one of them. The high-traffic ones: closed `Accordion` panels stay mounted (state
persists), a local prop beats a context value, `Field` does not push `size` into its control,
`TagGroup` does not restore focus after a dismiss, `Card` selection is not focus-aware.

## "Styles collide in a jest test"

**Cause:** the test-ident generator drops the component token, so a composed component's locals collide
with its composee's as strings (a composed `Field`'s `.root` equals `Label`'s `.root`). The built idents
differ; only the jest ones collide.

**Fix:** disambiguate structurally in tests, never by bare class-name equality.

## "`useCssVarValue` returns a `calc()` string"

**Cause:** the theme leaves its knobs unregistered (no `@property`), so a custom property's computed
value is the token stream with `var()` substituted and `calc()` **not** evaluated. Spacing, text, stroke
and `--base-scale` all read this way (47 of 472 tokens).

**Fix:** the hook is for colour and other literal tokens. For a resolved length, read a real property
with `getComputedStyle`, not the token. See [css-var-values.md](css-var-values.md).

## "`useCssVarValue` returns the fallback in a unit test"

**Cause:** jsdom's `getComputedStyle` resolves custom properties set as **inline styles** but does not
cascade them from stylesheets.

**Fix:** set the variable with `element.style.setProperty('--x', '…')` in the test.
