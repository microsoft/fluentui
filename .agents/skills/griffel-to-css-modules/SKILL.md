---
name: griffel-to-css-modules
description: 'Create or synchronize layered CSS Modules alternatives for any Fluent UI v9 component in this repo. Use when porting makeStyles or makeResetStyles, adding .styles.css.ts hooks, maintaining CSS/Griffel parity, or validating CSS asset builds and bundler selection.'
argument-hint: '<component or package>'
---

# Port Griffel styles to CSS Modules

## Scope

This is an internal migration and maintenance skill for all v9 packages in this
monorepo, not a general-purpose external codemod. Create or update CSS Modules
alternatives without rewriting component state or rendering. Preserve original
Griffel modules while both implementations are supported.

Default to opt-in alternatives selected by bundler resolution. Change default
component imports or remove Griffel only when explicitly requested. Exported
style hooks and component-internal imports are separate surfaces; check both.
For synchronization, inspect the Griffel diff and apply it to the existing CSS
alternative rather than creating a second hook or re-porting unrelated rules.

Use these existing ports as references, not proof of complete parity:

- Button family: base/derived styles, icon visibility, disabledFocusable, checked.
- Avatar family: numeric sizes, color palettes, badge cutouts, rootless popovers.
- Badge family: appearance/color combinations, inherited forced-colors behavior.
- Card: selectable/interactive focus and hidden checkbox.
- Tab: indicators, orientation, reserved content space, and helper exports.
- FluentProvider and Portal: theme/direction classes and non-slot style helpers.

An alternative may still call a Griffel helper. Record such remaining dependencies;
do not describe that component or package as Griffel-free.

## 1. Inventory the implementation

1. Inspect the resolved Nx project configuration:
   `yarn nx show project <project> --json`.
2. Read the component's style hook, state types, render function, composition
   hooks, stories, and tests. Inventory every style-module export and its callers,
   including class-name constants, CSS variables, size hooks, focus/animation
   helpers, and non-slot utilities. Keep signatures, return shapes, and behavior.
3. Enumerate slots and independent state values: appearance, size, shape,
   disabled, disabledFocusable, iconOnly, checked, expanded, and accessibility
   flags. Include supported defaults.
4. Trace style inheritance and composed children. CompoundButton, MenuButton,
   and ToggleButton reuse Button styles; SplitButton renders Button and
   MenuButton children. Check provider/portal styles outside the component's DOM
   subtree. Never introduce a dependency between component packages to share styles.
5. Record hover, active, focus, forced-colors, reduced-motion, RTL, and browser
   fixes. Match observed behavior, not assumptions about what a rule should do.

## 2. Create the stylesheet and hook

Place `<Component>.module.css` and `use<Component>Styles.styles.css.ts` beside
the existing `use<Component>Styles.styles.ts`. Keep the original module's export
names so the resolver can substitute the entire module. For a differently named
helper, retain the stem: `usePortalMountNodeStyles.styles.css.ts`.

Wrap rules in `@layer fluentui`. Reference the theme's CSS custom properties,
for example `var(--colorNeutralForeground1)` and `var(--spacingHorizontalM)`.
Do not hardcode colors, spacing, or typography. Derive missing dimensions from
existing tokens only when the calculation preserves the original metrics.
System colors such as `Highlight` and `GrayText` are needed for forced colors.
Translate both `makeStyles` and `makeResetStyles`: preserve reset semantics,
inherited values, pseudo-elements, keyframes, media/supports queries, and custom
properties. Do not copy opaque generated Griffel class names into CSS.
Preserve fixed accessibility sizing constraints rather than substituting mutable
spacing tokens: SplitButton's adjacent pointer target has a 24 CSS pixel minimum.
This is a target-size requirement, not a spacing value.

Name CSS state classes after prop values (including hyphenated values), and
index the CSS Module directly. Do not add internal TypeScript class maps, switch
statements, or appearance/color combination lookups. Apply independent state
classes to the owning DOM slot (normally root); let CSS combine them with slot
and pseudo-element selectors instead of selecting per-slot state combinations.
AvatarGroupPopover has no DOM root: its trigger owns the relevant state classes.
Portaled content needs classes on its own DOM subtree, not ancestor selectors.

Use `clsx` for ordinary CSS Module classes, not Griffel's atomic `mergeClasses`.
Reuse the package's existing `clsx` dependency, or add it to runtime dependencies
using the workspace version and update the lockfile. Retain `mergeClasses` only
where remaining Griffel atomic styles still require its conflict resolution.

```ts
import { clsx } from 'clsx';

state.root.className = clsx(
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

Only map state dimensions the component actually styles; use defaults from the
state hook rather than inventing new ones. Preserve stable `fui-*` slot class
names and put the existing slot className last. Guard optional slots before
assignment. Avoid unnecessary casts: the shared `*.module.css` declaration in
`typings/static-assets` supports string indexing. Do not create classes such as
`disabledPrimary`, `focusSmall`, or `iconOnlyLarge`.

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
An existing exported map-returning API such as Avatar's `useAvatarSizes` must
still return the promised size map; this compatibility surface is not a reason
to introduce internal maps for other state dimensions.

Use direct-child slot selectors where appropriate so outer component state
does not restyle nested instances. Preserve the original specificity when
moving state from slots to the root; `:where(.dark-red) > .iconInitials` has
the same specificity as a single slot class.

Use `:where()` for state qualifiers when they should not increase specificity.
Keep hover and active selectors separate where grouping them with `:is()` would
change specificity. CSS class-list order does not determine the cascade.

## 3. Preserve composition and the cascade

- Import the base CSS Module hook before the derived stylesheet, so base
  stylesheet evaluation precedes derived styles. Within a package, explicitly
  import its `.styles.css` alternative rather than relying on a consumer alias.
- Reuse the base hook; do not duplicate its styles.
- Preserve the original base/derived call order and public helper contracts.
  Do not alias a partial helper to the full style hook: Tab's button, content,
  and indicator exports must not start mutating unrelated slots or rerun animation.
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
- Use logical properties to preserve Griffel's RTL transformations:
  `margin-inline-start`, `padding-inline-end`, `border-inline-start-width`,
  `inset-inline-start`, `border-start-start-radius`, and `border-end-end-radius`.
  Corner radii use start/end block and inline terms, not `border-inline-end-radius`.
  Direction-sensitive transforms, gradients, and keyframes may still need explicit
  `[dir]` rules; preserve intentionally physical values. Check both directions.
- Use `:global(.fui-Icon-filled)` and `:global(.fui-Icon-regular)` when targeting
  public icon classes, not locally scoped copies.
- Keep the stylesheet layered. Use headless/CSS-styled icons and import their
  defaults into the same layer:
  `@import url('@fluentui/react-icons/headless/styles.css') layer(fluentui);`.
  Unlayered icon visibility rules otherwise beat layered component rules.
- Respect the repository's client-boundary and immutability lint rules. A pure
  style function may not need `'use client'`; a hook composing another hook
  can require it. Do not add hooks, memoization, DOM access, or blanket lint
  suppressions merely to assemble class names.
- Preserve FluentProvider's `themeClassName` and direction classes and Portal's
  theme/caller classes. Keep theme injection, custom style hooks, and portal
  inheritance intact; CSS selection must not rewrite provider behavior.

## 4. Ship the CSS assets

SWC transpiles the TypeScript hook, not its imported stylesheet. For `vNext`
projects, the workspace build executor automatically copies source `**/*.css`
beside every configured module output when package metadata declares CSS side
effects. Set `"sideEffects": ["**/*.css"]` in the package's `package.json`,
preserving other existing side-effect entries. Prefer this narrow entry over
`true` so JavaScript can still be tree-shaken.

**Do not add CSS `assets` or duplicate `outputs` to individual `project.json`
files.** Existing v9 projects already get `lib`/`lib-commonjs` (and, where enabled,
`lib-amd`) outputs from the workspace plugin. Custom non-CSS assets stay in place.
The executor uses existing package metadata rather than scanning CSS during
project-graph construction. See the
[workspace plugin's CSS build contract](../../../tools/workspace-plugin/README.md#css-assets-in-v9-builds).

Build the package and verify every source CSS file has an identical file
beside its emitted hook in every configured output. Checking only the build exit code
does not prove that imported stylesheets were copied.

## 5. Select the implementation

For opt-in consumers, use a narrowly scoped bundler replacement from
`use<Component>Styles.styles.js` to `use<Component>Styles.styles.css.js`.
Published imports can include explicit `.js` extensions, so merely adding
`.css.ts` to extension priority is insufficient. Webpack's `extensionAlias`
needs separate mappings for extensionless source stems and built imports:

```js
config.resolve.extensionAlias = {
  ...config.resolve.extensionAlias,
  '.styles': ['.styles.css.ts', '.styles.ts'],
  '.styles.js': ['.styles.css.js', '.styles.js'],
};
```

Keep selection opt-in and disabled by default, using a shared configuration
helper like `configureReactIcons` rather than unconditional global aliases.
Confirm the actual resolved module in both source Storybook and built-package
fixtures. A successful build alone does not establish that the alternative ran.

Include composed components and shared base hooks in the replacement. Verify
that the loader emits a default class-name map, includes package CSS under
node_modules, and retains CSS during production tree shaking. Process the same
alternative consistently for client and server builds.

Only switch component-internal imports directly when requested. Leave the
original Griffel hooks intact.

For eventual Griffel removal, first migrate every reachable style dependency,
including animated indicators, focus helpers, portals, provider resets, and
icon styles. Then, in a separately authorized default switch, wire direct CSS
imports and public exports, remove the fallback resolver and Griffel-only build
processing/dependencies where unused, and retain CSS copying and side effects.
Do not make the CSS implementation depend on the Griffel original for constants
or helper exports: preserve or extract neutral contracts within the package.

## 6. Validate before expanding the migration

1. Add hook unit tests for state-to-class mapping, defaults, optional slots,
   inherited styles, and preservation of caller class names.
   Assert that shared state classes are on their owning DOM slot, not copied to each slot,
   and that no handwritten class maps or combined-state lookups remain.
   Import the `.styles.css` hook explicitly; unchanged component tests normally
   still exercise Griffel. Mock CSS Modules with deterministic class-name maps
   (see FluentProvider's CSS hook tests), or use the repository's configured CSS
   transformer. Test partial helper exports independently, not only the full hook.
   These tests do not establish browser styling parity.
2. Run focused tests, lint, type-check, and the build through Nx:
   `yarn nx run <project>:test --runInBand`,
   `yarn nx run <project>:lint`,
   `yarn nx run <project>:type-check`,
   `yarn nx run <project>:build`.
   Check resolved target names first; do not invent targets or skip dependencies
   without ensuring required outputs exist.
3. Verify actual emitted CSS assets in both module formats.
4. Use a real-browser fixture test for computed-style and screenshot parity.
   JSDOM cannot validate nesting, layers, layout, pseudo-state, or media queries.
5. Render identical fixtures with each implementation in isolated pages or
   frames. Use the same theme, icon implementation, viewport, and fonts.
   Wait for fonts and style transitions to settle before comparing values;
   sampling two transitions at different times produces misleading differences.
   Check for Griffel insertion-order dependencies using base-first and
   derived-first mount orders. Button/ToggleButton checked subtle icon colors
   are a known example. Do not generalize a prototype's chosen order into a
   repository-wide baseline. Obtain a decision for ambiguous behavior and
   record the chosen baseline without silently fixing the original.
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
10. Before broad rollout or a default switch, run the full relevant Storybook/VRT
    coverage with CSS selection actually enabled, plus the Griffel baseline.
    Existing default VRT results do not prove CSS parity. Include SSR and React
    compatibility checks for hook or client-boundary changes. Keep this expensive
    alternate build out of the default VRT path until its CI design is agreed.

Update directly related documentation and keep at most one Beachball change
file per published package in the PR. Do not include unrelated worktree edits.
Report which components/helpers remain partial, which selectors were exercised,
and which browser/SSR/VRT checks were not run. Expand to more components only
after the current migration's gaps are explicit; never claim all-v9 readiness
from the initial ports alone.

### Shared positioning arrows

CSS alternatives import the class map from
`@fluentui/react-positioning/arrow.module.css` (the opt-in, layered `Arrow.module.css`
asset), then combine its `arrow` class with their local arrow class. This avoids
copying placement/pseudo-element rules between Tooltip and Popover and leaves
the default positioning entry point free of stylesheet imports. Configure the
same CSS Modules loader for this package asset as for component modules.

Consumers set `--fui-positioning-arrow-height` to `1.414 * arrowHeight` and
`--fui-positioning-arrow-offset` to `-0.707 * arrowHeight`, matching
`createArrowHeightStyles` exactly. Optional `--fui-positioning-arrow-border-width`,
`--fui-positioning-arrow-border-style`, and `--fui-positioning-arrow-border-color`
match `createArrowStyles` options. Placement selectors and rotation stay physical
in RTL. The Griffel helpers and their signatures remain unchanged; this CSS-only
contract is an alternative, not a replacement returning Griffel style objects.
