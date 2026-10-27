---
name: griffel-to-css-modules
description: 'Port Fluent UI v9 Griffel component styles to layered CSS Modules. Use when migrating makeStyles or makeResetStyles, adding useComponentStyles.css-module.ts alternatives, composing state classes with CSS nesting, copying CSS to lib and lib-commonjs, or verifying styling parity.'
argument-hint: '<component or package>'
---

# Port Griffel styles to CSS Modules

## Scope

Create a CSS Modules alternative without rewriting component state or rendering.
Use `react-button` as the worked example. Preserve the original Griffel modules
for comparison and for consumers that still select Griffel.

Before editing, establish whether the user wants:

- Opt-in alternatives selected by bundler resolution.
- Direct component imports for local experimentation.

Do not accidentally publish a default-style change while describing the feature
as opt-in. Exported style hooks and component-internal imports are separate
surfaces; check both when deciding how consumers select an implementation.

## 1. Inventory the implementation

1. Inspect the resolved Nx project configuration:
   `yarn nx show project <project> --json`.
2. Read the component's style hook, state types, render function, composition
   hooks, stories, and tests.
3. Enumerate slots and independent state values: appearance, size, shape,
   disabled, disabledFocusable, iconOnly, checked, expanded, and accessibility
   flags. Include supported defaults.
4. Trace style inheritance and composed children. CompoundButton, MenuButton,
   and ToggleButton reuse Button styles; SplitButton renders Button and
   MenuButton children.
5. Record hover, active, focus, forced-colors, reduced-motion, RTL, and browser
   fixes. Match observed behavior, not assumptions about what a rule should do.

## 2. Create the stylesheet and hook

Place `<Component>.module.css` and `use<Component>Styles.css-module.ts` beside
the existing `use<Component>Styles.styles.ts`.

Wrap rules in `@layer fluentui`. Reference the theme's CSS custom properties,
for example `var(--colorNeutralForeground1)` and `var(--spacingHorizontalM)`.
Do not hardcode colors, spacing, or typography. Derive missing dimensions from
existing tokens only when the calculation preserves the original metrics.
System colors such as `Highlight` and `GrayText` are needed for forced colors.
Preserve fixed accessibility sizing constraints rather than substituting mutable
spacing tokens: SplitButton's adjacent pointer target has a 24 CSS pixel minimum.
This is a target-size requirement, not a spacing value.

Name CSS state classes after prop values (including hyphenated values), and
index the CSS Module directly. Do not add TypeScript class maps, switch
statements, or appearance/color combination lookups. Apply each independent
state class once to the root; let CSS combine it with slot and pseudo-element
selectors instead of selecting separate per-slot state classes in TypeScript.

The hook selects independent state classes:

```ts
state.root.className = mergeClasses(
  componentClassNames.root,
  styles.root,
  styles[appearance],
  styles[size],
  styles[shape],
  icon && styles.withIcon,
  (disabled || disabledFocusable) && styles.disabled,
  iconOnly && styles.iconOnly,
  state.root.className,
);
```

Only map state dimensions the component actually styles. Preserve stable
`fui-*` slot class names and put the existing slot className last. Do not create
classes such as `disabledPrimary`, `focusSmall`, or `iconOnlyLarge`.

Put combinations in CSS instead:

```css
@layer fluentui {
  .disabled:where(.outline, .subtle, .transparent) {
    &,
    &:hover,
    &:hover:active,
    &:active:focus-visible {
      background-color: var(--colorTransparentBackground);
    }
  }

  .small {
    .icon {
      --fui-Button__icon--spacing: var(--spacingHorizontalXS);
    }
  }

  .circular[data-fui-focus-visible] {
    border-radius: var(--borderRadiusCircular);
  }
}
```

For example, Avatar uses `styles[color]` on its root for both the initials/icon
palette and the ring, rather than separate `colorClassMap` and
`ringColorClassMap` objects:

```css
@layer fluentui {
  :where(.dark-red) > .iconInitials {
    color: var(--colorPaletteDarkRedForeground2);
    background-color: var(--colorPaletteDarkRedBackground2);
  }

  .ring:where(.dark-red)::before {
    border-color: var(--colorPaletteDarkRedBorderActive);
  }
}
```

Likewise, put `styles[state.badge.size ?? 'medium']` on the Avatar root when a
badge exists and define `.tiny`, `.extra-small`, `.small`, `.medium`, `.large`,
and `.extra-large` there for the cutout variables. Avatar's numeric size is a
separate state dimension; keep its `size16`/`size20`/... classes distinct from
badge size. If two dimensions share prop values, use a consistent prefix and
direct template-literal indexing rather than a lookup table.

Use direct-child slot selectors where appropriate so outer component state
does not restyle nested instances. Preserve the original specificity when
moving state from slots to the root; `:where(.dark-red) > .iconInitials` has
the same specificity as a single slot class.

Use `:where()` for state qualifiers when they should not increase specificity.
Keep hover and active selectors separate where grouping them with `:is()` would
change specificity. CSS class-list order does not determine the cascade.

## 3. Preserve composition and the cascade

- Import the base CSS Module hook before the derived stylesheet, so base
  stylesheet evaluation precedes derived styles.
- Reuse the base hook; do not duplicate its styles.
- Check descendant specificity. A base `.large .icon` rule can beat a derived
  `.icon` rule regardless of source order.
- Keep source-order precedence for size, shape, icon-only, disabled, checked,
  and focus combinations. Griffel's atomic merge behavior does not translate
  automatically to ordinary CSS.
- Check media ordering across inherited stylesheets. A derived normal-color rule
  can accidentally override the base stylesheet's forced-colors rule. Where the
  original inherits its high-contrast colors, restrict the derived color override
  to `@media (forced-colors: none)` instead of duplicating high-contrast styles.
  Do not remove border metrics or selected-background semantics indiscriminately.
- Retain Tabster's `[data-fui-focus-visible]` selector; `:focus-visible` alone is
  not an equivalent replacement.
- Use logical margins, borders, and corner radii to preserve Griffel's RTL
  transformations. Check directional layouts in both directions.
- Use `:global(.fui-Icon-filled)` and `:global(.fui-Icon-regular)` when targeting
  public icon classes, not locally scoped copies.
- Keep the stylesheet layered. Use headless/CSS-styled icons and import their
  defaults into the same layer:
  `@import url('@fluentui/react-icons/headless/styles.css') layer(fluentui);`.
  Unlayered icon visibility rules otherwise beat layered component rules.
- Respect the repository's client-boundary and immutability lint rules. A pure
  style function may not need `'use client'`; a hook composing another hook
  can require it.

## 4. Ship the CSS assets

SWC transpiles the TypeScript hook, not its imported stylesheet. Configure
the existing Nx build executor's `assets` option to copy `**/*.module.css`
from the package source root into both `lib` and `lib-commonjs`, preserving
subdirectories. See
[the Button build configuration](../../../packages/react-components/react-button/library/project.json).

Keep CSS side effects in package metadata, for example:
`"sideEffects": ["**/*.css"]`. Preserve any other existing side-effect entries.
Keep both output directories in the build target's declared outputs.

Build the package and verify every source CSS Module has an identical file
beside its emitted hook in both outputs. Checking only the build exit code
does not prove that imported stylesheets were copied.

## 5. Select the implementation

For opt-in consumers, use a narrowly scoped bundler replacement from
`use<Component>Styles.styles.js` to `use<Component>Styles.css-module.js`.
Published imports can include explicit `.js` extensions, so merely adding
`.css-module.js` to extension priority is insufficient.

Include composed components and shared base hooks in the replacement. Verify
that the loader emits a default class-name map, includes package CSS under
node_modules, and retains CSS during production tree shaking. Process the same
alternative consistently for client and server builds.

Only switch component-internal imports directly when requested. Leave the
original Griffel hooks intact.

## 6. Validate before expanding the migration

1. Add hook unit tests for state-to-class mapping, defaults, optional slots,
   inherited styles, and preservation of caller class names.
   Assert that shared state classes are on the root, not copied to each slot,
   and that no handwritten class maps or combined-state lookups remain.
   If component source directly imports CSS Modules, configure Jest to transform
   those imports into deterministic class-name maps. This supports behavioral
   tests without pretending that JSDOM evaluates the stylesheet.
2. Run focused tests, lint, type-check, and the build through Nx.
3. Verify actual emitted CSS assets in both module formats.
4. Use a real-browser fixture test for computed-style and screenshot parity.
   JSDOM cannot validate nesting, layers, layout, pseudo-state, or media queries.
5. Render identical fixtures with each implementation in isolated pages or
   frames. Use the same theme, icon implementation, viewport, and fonts.
   Wait for fonts and style transitions to settle before comparing values;
   sampling two transitions at different times produces misleading differences.
   Check for Griffel insertion-order dependencies. For this button-family port,
   the agreed baseline registers Button's base styles before derived components.
   Accessible checked subtle ToggleButton icon colors otherwise depend on mount
   order. Do not silently pick a baseline or fix such pre-existing behavior;
   obtain a decision and record the chosen order.
6. Enumerate finite prop combinations and relevant interactions, including
   checked/accessibility and expanded/disabled combinations. Cover light/dark,
   RTL, real forced colors, keyboard focus, hover, active, and reduced motion.
7. Compare root and slot styles, glyph visibility, directional borders, and
   geometry exactly. Include pseudo-elements where used. Identify scenario,
   slot, property, and both values in failures. Do not mask unexplained
   differences with tolerances or by deleting assertions.
8. Test Firefox-specific fixes in Firefox before claiming cross-browser parity.
9. Keep reusable regression tests in the repository; report temporary browser
   checks as such, not as an existing CI gate.

Update directly related documentation and keep at most one Beachball change
file per published package in the PR. Do not include unrelated worktree edits.
