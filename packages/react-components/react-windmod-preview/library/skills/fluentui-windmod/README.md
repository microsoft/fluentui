# Fluent windmod

Agent skill for styling with `@fluentui/react-windmod-preview` and
`@fluentui/react-tailwind-theme-preview` — the Fluent UI v9 visual contract rebuilt on Tailwind v4 +
CSS Modules instead of Griffel.

Covers the override model (cascade layers, not style props), the public class and data-attribute
surface, the variant catalog, theme classes, the `--base-scale` density knob, and the authoring
conventions used inside the library itself.

## Installation

The skill ships inside the package. Point your agent at it:

```markdown
<!-- in CLAUDE.md -->

When styling Fluent UI components, read
node_modules/@fluentui/react-windmod-preview/skills/fluentui-windmod/SKILL.md first.
```

Or link it into your project's skill directory:

```sh
mkdir -p .claude/skills
ln -s ../../node_modules/@fluentui/react-windmod-preview/skills/fluentui-windmod .claude/skills/fluentui-windmod
```

Both routes are opt-in by design. No npm package can install an agent skill into your project
automatically, and one that tried would be writing into your agent's configuration without asking.
Shipping the skill in the tarball buys the thing that matters instead: it is versioned with the code
it documents, so `npm update` moves the guidance with the API rather than leaving a hand-copied guide
to rot.

> **Preview.** This package is not published yet, and the skill tracks it.

## Usage

The skill activates when working with components imported from `@fluentui/react-windmod-preview`, when
editing `.module.css` files in a windmod project, or when migrating an app off
`@fluentui/react-components`.

**Example prompts that trigger it:**

```
Style this Button with the Fluent design tokens
Override the card background for our brand
Why isn't my CSS overriding this component?
Switch the app to the dark theme
Port this page from @fluentui/react-components to windmod
Make the icon strike through when the button is disabled
```

## What's Included

- **SKILL.md** — the rules: prohibitions, decision tests, the override model, the public class surface,
  and the reference loading map
- **AGENTS.md** — quick reference: class surface, layer stack, variant vocabulary, token namespaces,
  theme classes, subpaths, and a Griffel→windmod conversion table
- **references/**
  - `setup.md` — install, the two stylesheets, the provider, Tailwind wiring
  - `overriding.md` — the three override routes, what not to target, motion overrides
  - `variant-catalog.md` — the full generic and component-specific vocabulary
  - `tokens-and-scale.md` — token families, the density knob, what responds at runtime
  - `griffel-deltas.md` — the differences that change how you style, test or debug
  - `css-var-values.md` — `useCssVarValue` / `invalidateCssVars`
  - `authoring-conventions.md` — contributor rules for changing styles inside the package
  - `troubleshooting.md` — symptom-keyed fixes
- **assets/** — a worked consumer override, correct patterns with the anti-patterns beside them

## Key Concepts

### Cascade layers, not style props

Every package style lives inside a `fui.*` cascade layer. Your CSS is unlayered, and unlayered CSS beats
layered CSS regardless of selector weight. Overriding a component is a one-class rule — no
`!important`, no specificity arms race. The corollary: **do not wrap your overrides in `@layer`.**

There is no `useCustomStyleHook_unstable`, no `classNames` prop, and no `overrides_unstable`.

### A two-class public surface

Each component root carries `fui-button` (the identity class — safe for CSS and `querySelector`) and
`group/fui-button` (Tailwind's named-group class). Everything below the root is a hashed ident and a
`data-*` attribute. `buttonClassNames.root` is the **pair**, for `className`, never for a selector.

### Group variants reach internals

```tsx
<Button disabled>
  <span className="group-disabled/fui-button:line-through">Send</span>
</Button>
```

No group declaration of your own is needed — the marker is already on the root.

### Theming is a class

`theme` on `FluentProvider` takes a class name string, not a Griffel theme object. A custom theme is a
CSS class that redeclares the token custom properties.

### One density knob

`--base-scale: calc(1rem / 16px * var(--fui-scale, 1))` drives spacing, control heights, radii and the
whole type ramp. At a 16px root font size windmod is pixel-identical to Griffel — that is the parity
condition. `ScaleRegion` (from `/provider`) multiplies the factor for one subtree; steps are absolute
and nested regions replace, never compound.

## Examples

**Brand override**

```css
/* app.css — unlayered, so it wins */
.cta-button {
  background-color: var(--color-brand-background);
  color: var(--color-neutral-foreground-inverted);
}

.cta-button:hover {
  background-color: var(--color-brand-background-hover);
}
```

```tsx
import { Button } from '@fluentui/react-windmod-preview/button';

export const Cta = () => <Button className="cta-button">Get started</Button>;
```

**Custom theme**

```css
.my-brand-theme {
  --color-brand-background: #6b21a8;
  --color-brand-background-hover: #7e22ce;
  --color-brand-background-pressed: #581c87;
}
```

```tsx
<FluentProvider theme="my-brand-theme">…</FluentProvider>
```

## Requirements

- `@fluentui/react-windmod-preview` and `@fluentui/react-tailwind-theme-preview` installed
- Both stylesheets loaded, theme first
- Tailwind v4 only if you want to author your own utilities against windmod's variants — plain-CSS
  consumers need no toolchain

## Learn More

- [SKILL.md](SKILL.md) — the full rule set
- [AGENTS.md](AGENTS.md) — quick reference
- [references/](references/) — detailed catalogs and guides
- The package's own `MIGRATION.md` — all fifty-nine deliberate differences from
  `@fluentui/react-components`

## Preview

This package tracks `@fluentui/react-headless-components-preview`, which is itself in preview. APIs may
change without notice and coverage is limited to what the headless package ships. Not production-ready.
