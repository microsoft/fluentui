# Overriding and extending windmod styles

The consumer override model. Read this when restyling a component, targeting a slot, or when an
override "is not applying".

## The mechanism: cascade layers

Every package style lives inside a `fui.*` cascade layer. **Unlayered author CSS beats layered author
CSS regardless of selector weight.** Your stylesheet is unlayered, so it wins — with a single class,
no `!important`, no specificity arms race.

```css
/* wins over the component's own layered rules */
.my-brand-button {
  background-color: rebeccapurple;
}
```

```tsx
<Button className="my-brand-button">Continue</Button>
```

This is the whole story for most overrides. The corollary is the one thing to remember:

```css
/* ❌ now loses — you forfeited the contest you win by default */
@layer app {
  .my-brand-button {
    background-color: rebeccapurple;
  }
}
```

### The declared order

```css
@layer fui.theme, fui.base, fui.components, fui.components.l1, fui.components.l2,
  fui.components.l3, fui.components.l4, fui.components.l5, fui.utilities;
```

`fui.utilities` (Tailwind's utility layer) beats component styles and still loses to your unlayered
CSS. If you run Tailwind yourself and want _your_ utilities to beat Fluent's, declare the family before
importing Tailwind — see [setup.md](setup.md).

Use a `fui.components.l4` / `l5` layer deliberately only when you want your override to lose to your
own unlayered CSS — app-global defaults that a page-level rule should still be able to beat.

## Route 1: your own class

Best for anything reused. Target the identity class, or your own class on the component.

```css
/* on the identity class — every Button in the app */
.fui-button {
  letter-spacing: 0.01em;
}

/* a selector confined to a subtree — for scoping a *theme* to one, nest a provider instead */
.marketing-surface .fui-button {
  border-radius: 999px;
}

/* on a class you add — one component */
.cta-button {
  background-color: rebeccapurple;
  color: white;
}
```

```tsx
<Button className="cta-button">Continue</Button>
```

Selecting on published state is safe and stable:

```css
.fui-message-bar[data-intent='error'] {
  border-inline-start-width: 4px;
}
.fui-button[data-size='small'] {
  text-transform: uppercase;
}
.fui-popover-surface[data-open] {
  box-shadow: var(--shadow-28);
}
```

Presence attributes select **bare** — `[data-open]`, never `[data-open='true']`. Enumerated attributes
select on their value.

## Route 2: slot `className`

Every slot re-stacks its class list with the component's own classes first and your incoming
`className` last, so your declaration wins at equal specificity.

```tsx
<Button icon={{ className: 'text-red-500' }}>Delete</Button>
<Field label={{ className: 'uppercase tracking-wide' }}>…</Field>
<Combobox listbox={{ style: { maxHeight: '20rem', overflowY: 'auto' } }} />
```

This is the only sanctioned route to a slot. There is no `classNames` prop, and no per-slot public
class.

## Route 3: group variants, from a child you control

A child inside a component targets the component's state directly, with no group declaration of your
own — the marker `group/fui-<component>` is already on the root.

```tsx
<Button disabled>
  <span className="group-disabled/fui-button:line-through">Send</span>
</Button>

<Popover>
  <PopoverTrigger>
    <Button icon={<ChevronDown className="group-open/fui-popover:rotate-180" />} />
  </PopoverTrigger>
</Popover>
```

The general form is `group-<variant>/fui-<component>`, where `<variant>` is any entry in either
catalog. Every catalog entry is authored `&:where([data-…])`, which is what makes them all
group-composable — see [variant-catalog.md](variant-catalog.md).

You may add your own `group/name` via `className` to disambiguate nested instances of the same
component, but you are never required to:

```tsx
<Card className="group/outer">
  <Card>
    <span className="group-hover/outer:opacity-50" />
  </Card>
</Card>
```

For a native input inside a composite control, the input slot carries `peer/fui-<component>` and the
sibling form applies: `peer-checked/fui-switch:…`.

## What you must not target

```css
/* ❌ hashed idents — regenerated whenever the source changes */
.fuicm-button-icon-a1b2c3 { … }

/* ❌ Griffel-era class names — windmod's are lower-case, and slot classes do not exist */
.fui-Button { … }
.fui-Button__icon { … }

/* ❌ structural selectors — slot order is an implementation detail */
.fui-button > span:nth-child(2) { … }
```

Every slot below the root carries a hashed ident of the form `fuicm-<component>-<local>-<hex6>`. The
hash seeds on the source file path and the local class name, so it changes on any rename. It is never a
stable target.

`xClassNames.root` is the space-separated **pair** `"fui-button group/fui-button"`. It goes in
`className`. Using it in a selector throws:

```tsx
document.querySelectorAll('.fui-button'); // ✅
document.querySelectorAll('.' + buttonClassNames.root); // ❌ invalid selector
```

## Escape hatches that do not exist

Griffel's per-component style-hook overrides have no windmod counterpart, on any component:

- `useCustomStyleHook_unstable`
- `customStyleHooks_unstable` on the provider
- `overrides_unstable`
- `applyStylesToPortals`

Restyle through CSS. Cascade layers make that the easier path anyway — this is the trade windmod makes
deliberately.

## Overriding motion

The theme ships one global `prefers-reduced-motion` floor:

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

  .fui-spinner > span {
    animation-duration: 1.8s;
    animation-iteration-count: infinite;
  }
}
```

It is **unlayered and selector-less** rather than `!important`. Layers are compared before specificity,
so a bare `*` outranks everything in `fui.components.*` — while any rule of yours with a class in it
already outranks the floor:

```css
/* ✅ your essential motion survives the preference */
.loading-pulse {
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
}
```

Two consequences worth knowing:

- `animation-iteration-count: 1` stops infinite animations after one 1ms pass, so a `SkeletonItem`
  shimmer and an indeterminate `ProgressBar` render their static state. Griffel suppresses both too.
- The bare `*` means `transition-property` defaults to `all`, so under the preference **every** element
  in the document carries a 1ms transition on every animatable property. It is imperceptible, but
  `transitionend` now fires where it previously would not. Do not key logic on a `transitionend`
  arriving only for elements you styled.

## Theming vs overriding

Prefer moving a token over overriding a rule. A token change propagates to every component that uses
it; a rule override applies to one.

```css
/* ✅ one declaration, every brand surface follows */
.my-brand-theme {
  --color-brand-background: #6b21a8;
  --color-brand-background-hover: #7e22ce;
  --color-brand-background-pressed: #581c87;
}
```

```tsx
<FluentProvider theme="my-brand-theme">…</FluentProvider>
```

Colour, typography and stroke tokens are live `var()` references and respond at runtime. **Spacing
tokens do not** — Tailwind's `--spacing-*` namespace resolves at compile time. Use `--base-scale` at the
document root for density. See [tokens-and-scale.md](tokens-and-scale.md).

## Checklist before shipping an override

- [ ] The rule is unlayered (or deliberately in `fui.components.l4`/`l5`) — and checked in DevTools, not
      assumed. A house `@layer components { … }` or a framework that layers imported global CSS puts you
      in a layer you never wrote.
- [ ] The theme stylesheet is imported, and imported first. It has to be there for `var()` to resolve at
      all, and its position fixes how any layers of _yours_ sort against `fui.*` — though it cannot
      decide whether an unlayered rule wins, which it always does.
- [ ] The selector targets `.fui-<component>`, a published `data-*`, or a class you added — never a
      hashed ident or structural position.
- [ ] A token change was considered first.
- [ ] No `!important`.
- [ ] If it animates: it has a class, so it survives the reduced-motion floor by intent rather than by
      accident.
