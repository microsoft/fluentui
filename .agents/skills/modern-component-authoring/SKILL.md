---
name: modern-component-authoring
description: 'Author or port styled Fluent UI components in @fluentui/react-modern-components-preview by composing headless primitives, adding visual props and CSS Module styles, porting stable v9 stories, wiring subpath exports, tests, API reports, emitted CSS assets, and bundle-size coverage. Use when asked to add, port, implement, or update a modern component or modern preview component.'
argument-hint: <ComponentName>
allowed-tools: Bash Read Write Edit Grep Glob
---

# Author a Modern Component

Author **$ARGUMENTS** in:

- `packages/react-components/react-modern-components-preview/library`
- `packages/react-components/react-modern-components-preview/stories`

Modern components add Fluent visual design to behavior and accessibility owned
by `@fluentui/react-headless-components-preview`. They use CSS Modules and
stable `data-*` selectors rather than Griffel component styles.

If `$ARGUMENTS` is empty or is not a PascalCase component name, ask for a valid
component name before editing.

## Responsibilities

Keep ownership boundaries explicit:

- **Headless package:** behavior, accessibility, semantic slots, interaction
  state, contexts, render structure, and behavior-oriented `data-*` attributes.
- **Modern package:** visual props and defaults, visual-state `data-*`
  attributes, CSS Modules, static Fluent class names, motion composition, and
  styled stories.
- **Stable v9 package:** visual and documentation parity reference. Do not use
  its main component hook as the modern behavior implementation.

Use the `headless-component` skill first when the required headless primitive or
base API does not exist. Do not duplicate missing behavior in the modern layer.

## Preflight

Before editing:

1. Search the modern package for an existing implementation or family member.
2. Inspect these three references:
   - nearest modern component, normally `library/src/components/Button/`
   - matching headless subpath and implementation
   - matching stable v9 component styles, tests, stories, and API
3. Verify the headless subpath exports the required component types, state hook,
   renderer, context hooks, and compound slots.
4. Inventory parity requirements:
   - public visual props and defaults
   - slots and root ref type
   - stable static class names
   - visual variants and selectors
   - forced-colors and reduced-motion behavior
   - stable stories, docs, icons, and supporting components
5. Name one cheap check that can falsify the planned composition, usually a
   focused component test or the stories type-check.

Do not edit until the controlling headless API and visual state contract are
known.

## File Structure

For a component named `ComponentName` with subpath `component-name`:

```text
library/src/components/ComponentName/
  ComponentName.module.css
  ComponentName.test.tsx
  ComponentName.tsx
  ComponentName.types.ts
  index.ts
  renderComponentName.tsx
  useComponentName.ts
  useComponentNameStyles.styles.ts

library/src/component-name.ts

stories/src/ComponentName/
  ComponentNameDescription.md
  ComponentNameDefault.stories.tsx
  index.stories.tsx
  ...matching stable v9 stories and docs
```

Use `.ts` instead of `.tsx` for a renderer re-export when no JSX is present.

## Implementation

### Component

The component stays thin and uses stable, unsuffixed modern API names:

```tsx
'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

export const ComponentName: ForwardRefComponent<ComponentNameProps> = React.forwardRef((props, ref) => {
  const state = useComponentName(props, ref);
  useComponentNameStyles(state);
  return renderComponentName(state);
});

ComponentName.displayName = 'ComponentName';
```

- Use the exact root element ref type from the headless component.
- Add `'use client';` to component and hook modules that call hooks.
- Do not add `'use client';` to a plain style function that only mutates slot
  class names.
- Never use `React.FC`.

### Types and Visual State

Extend headless props and state instead of stable styled component types:

```ts
import type {
  ComponentNameProps as ComponentNameBaseProps,
  ComponentNameState as ComponentNameBaseState,
} from '@fluentui/react-headless-components-preview/component-name';
export type { ComponentNameSlots } from '@fluentui/react-headless-components-preview/component-name';

export type ComponentNameProps = ComponentNameBaseProps & {
  appearance?: 'default' | 'primary';
  size?: 'small' | 'medium' | 'large';
};

export type ComponentNameState = ComponentNameBaseState & {
  appearance: NonNullable<ComponentNameProps['appearance']>;
  size: NonNullable<ComponentNameProps['size']>;
  root: ComponentNameBaseState['root'] & {
    'data-appearance': NonNullable<ComponentNameProps['appearance']>;
    'data-size': NonNullable<ComponentNameProps['size']>;
  };
};
```

- Add only visual props owned by the styled layer.
- Preserve exact stable v9 unions and documented defaults unless the modern
  design intentionally differs.
- Reuse headless slots and behavior state. Do not redefine them structurally.
- Type every visual `data-*` attribute on the state.

### State Hook

Delegate behavior to the matching headless hook and add visual defaults after
separating visual props:

```ts
'use client';

import { useComponentName as useComponentNameBase } from '@fluentui/react-headless-components-preview/component-name';

export const useComponentName = (props: ComponentNameProps, ref: React.Ref<HTMLElement>): ComponentNameState => {
  const { appearance = 'default', size = 'medium', ...rest } = props;
  const state = useComponentNameBase(rest, ref);

  return {
    ...state,
    root: {
      ...state.root,
      'data-appearance': appearance,
      'data-size': size,
    },
    appearance,
    size,
  };
};
```

- Use headless context hooks for inherited defaults such as button size.
- Preserve headless-reserved attributes and state.
- Do not reimplement ARIA, keyboard, focus, controlled state, or slot logic.
- For compound components, compose the matching headless compound hook and
  preserve its renderer/context structure.

### Renderer

Re-export the headless renderer when its slot structure is correct:

```ts
export { renderComponentName } from '@fluentui/react-headless-components-preview/component-name';
```

Write a modern renderer only when visual composition requires additional
styled-only DOM. Prove that need against the stable and headless renderers first.

### Motion Composition

Motion is visual composition owned by the modern layer. Treat presence motion
slots like other modern slots even when the headless primitive does not expose
them:

- define the public slot with `PresenceMotionSlotProps` and the matching motion
  component params
- resolve it with `presenceMotionSlot` in the modern state hook
- wrap the headless semantic element in the modern renderer without moving open
  state, focus, keyboard, or ARIA behavior out of headless
- use `MotionRefForwarder` and merge `useMotionForwardedRef()` into the styled
  surface root when the animated child is a compound component
- preserve stable defaults for `visible`, `appear`, and `unmountOnExit`; passing
  `null` must disable animation while preserving unmount behavior
- coordinate headless `unmountOnClose` with presence ownership so the semantic
  child remains available for exit motion
- add runtime dependencies on `@fluentui/react-motion` and
  `@fluentui/react-motion-components-preview` through the workspace package
  manager

Do not add a decorative backdrop element merely to imitate a stable motion slot.
For native `<dialog>`, the backdrop is `::backdrop`; preserve native semantics
unless there is an approved interaction design for a separate backdrop.

## Styling

### Class Application

Use CSS Modules with `clsx` and stable Fluent class names:

```ts
import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import styles from './ComponentName.module.css';

export const componentNameClassNames: SlotClassNames<ComponentNameSlots> = {
  root: 'fui-ComponentName',
  icon: 'fui-ComponentName__icon',
};

export const useComponentNameStyles = (state: ComponentNameState): ComponentNameState => {
  state.root.className = clsx(componentNameClassNames.root, styles.root, state.root.className);

  if (state.icon) {
    state.icon.className = clsx(componentNameClassNames.icon, styles.icon, state.icon.className);
  }

  return state;
};
```

Always keep the consumer class name last. Do not use Griffel in library source.

### CSS Translation

Translate stable v9 Griffel styles into CSS without changing behavior:

- `tokens.foo` becomes `var(--foo)`.
- use only Fluent token custom properties or component-local `--fui-*` custom
  properties; package Stylelint rejects unknown custom properties.
- do not use literal colors, including named colors, hex values, or color
  functions. Forced-colors system colors are the exception.
- visual variant classes become root `data-*` selectors.
- slot descendant selectors use local module classes.
- external stable classes use `:global(...)`.
- preserve pseudo-classes, pseudo-elements, media queries, forced colors,
  reduced motion, and selector ordering.
- preserve layout constants from the stable implementation when no token exists.
- use logical properties and values. Prefer `inline-size`, `block-size`,
  `inset-*`, `margin-*`, `padding-*`, and logical border properties over their
  physical equivalents so components work in both LTR and RTL layouts.
- transition only the properties that change. Prefer `background-color` and
  `border-color` over broad `background` and `border` transition properties.
- do not invent visual values or approximate omitted variants.

### CSS Structure and Specificity

Use native CSS nesting to keep state and slot rules with their owning class.
The package emits CSS Modules without transpiling them, so author standards-based
nesting supported by the package browser baseline.

- keep one primary block for each local class when practical; avoid reopening
  the same selector throughout a file.
- nest root state selectors with `&`, for example `&[data-size='small']` and
  `&:hover`.
- use `:is()` to combine selectors that intentionally have the same specificity
  and declarations, such as equivalent interaction states or mutually exclusive
  `data-*` values.
- use `:where()` only when the grouped selector should contribute zero
  specificity, typically for shared defaults that later variants must override.
- use reverse nesting such as `.root[data-disabled] &` when a slot owns the
  declarations but its styling depends on root state.
- preserve cascade order from lower specificity and base states to more specific
  variants and overrides. Do not use `:where()` merely to make a specificity
  lint error disappear.
- keep selectors within the configured complexity limits: no IDs, type or
  universal selectors; at most one combinator, two compound selectors, and
  specificity no greater than `0,6,0`.
- `no-descending-specificity` remains enabled. Its documented
  `selectors-within-list` exception exists for mutually exclusive component
  state lists; do not add broad disables or inline suppressions.
- keep explicit token matrices flat when nesting would add indentation without
  removing duplication or clarifying ownership.

Example:

```css
.root {
  color: var(--colorNeutralForeground1);
  background-color: var(--colorNeutralBackground1);

  &:where([data-appearance='subtle'], [data-appearance='transparent']) {
    border-color: transparent;
  }

  &:hover {
    background-color: var(--colorNeutralBackground1Hover);
  }

  &:is(:hover:active, :active:focus-visible) {
    background-color: var(--colorNeutralBackground1Pressed);
  }

  &[data-appearance='primary'] {
    color: var(--colorNeutralForegroundOnBrand);
    background-color: var(--colorBrandBackground);
  }
}
```

Run `yarn nx run react-modern-components-preview:lint` after each CSS batch.
Stylelint validates known variables, logical properties, literal colors,
selector complexity, specificity ordering, and standard CSS correctness. Run
the stories `storybook` target when introducing a new CSS syntax pattern to
confirm the consuming webpack pipeline accepts it.

## Tests and Conformance

Add an adjacent test using the package wrapper:

```tsx
isConformant({
  Component: ComponentName,
  displayName: 'ComponentName',
  requiredProps: { children: 'Accessible name when needed' },
});
```

The modern wrapper intentionally disables Griffel/static-class conformance and
adds a custom axe test. Do not re-enable Griffel-only tests for CSS Modules.

Tests must cover:

- default rendering and visual `data-*` defaults
- each nontrivial visual state mapping
- accessible required props for axe fixtures
- stable class names and consumer class preservation when risk warrants it
- component-specific regressions inherited from stable v9
- default motion, a custom motion render function, and `null` disabling when the
  component exposes motion slots

Prefer behavioral assertions over snapshots containing generated React IDs.
Snapshots are acceptable for stable, deterministic markup.

After the first component edit, run the focused test before broadening scope:

```bash
yarn nx run react-modern-components-preview:test --runTestsByPath src/components/ComponentName/ComponentName.test.tsx --runInBand
```

## Public API and Packaging

1. Export component, props, slots, state, renderer, hook, class names, and style
   function from the component barrel.
2. Add `library/src/component-name.ts` with explicit exports.
3. Add explicit exports to `library/src/index.ts`; never use `export *`.
4. Add the kebab-case subpath to `library/package.json` with matching ESM,
   CommonJS, `.d.ts`, and `.d.cts` paths.
5. Keep package dependencies alphabetized. Add a dependency only when the
   component introduces a real runtime import not already provided.
6. Ensure `library/project.json` continues copying `**/*.module.css` into both
   `lib` and `lib-commonjs`. Do not add a per-component asset entry.
7. Add the component to `bundle-size/AllComponents.fixture.js` from the modern
   package root. Never measure the headless component in its place.
8. Keep the package-local monosize CSS Module loader configuration intact.
9. Run the build to generate root and subpath API reports. Commit changed
   `library/etc/*.api.md` files.

## Stories

Port the complete matching stable v9 story and documentation folder. Use the
existing modern Button stories as the adaptation reference.

- Import the showcased component and its props from
  `@fluentui/react-modern-components-preview/component-name`.
- Keep supporting components such as `Menu`, `Tooltip`, `FluentProvider`,
  tokens, complex `makeStyles`, and icons from their stable packages.
- Replace `JSXElement` return types with `React.ReactNode`.
- Convert simple layout-only Griffel wrappers to typed inline style objects when
  practical. Keep complex token, pseudo-selector, or responsive styles in
  Griffel rather than weakening the example.
- Preserve stable markdown, best-practice docs, accessibility MDX, examples,
  story names, and export order.
- Port custom and disabled motion stories when modern exposes the corresponding
  motion slot. Adapt stable-only backdrop controls to the modern native-dialog
  contract instead of documenting unsupported props.
- Use `title: 'Components/ComponentName/ComponentName'` in `index.stories.tsx`.
- For cross-component types, import the modern type from its own modern subpath.
  For example, SplitButton stories use `MenuButtonProps` from `menu-button`.

Validate story completeness by comparing source and destination file lists, not
just the index exports.

## Validation

Run all relevant checks through Nx:

```bash
yarn nx run react-modern-components-preview:test --runInBand
yarn nx run react-modern-components-preview:type-check
yarn nx run react-modern-components-preview:lint
yarn nx run react-modern-components-preview:build
yarn nx run react-modern-components-preview:format:check
yarn nx run react-modern-components-preview-stories:type-check
yarn nx run react-modern-components-preview-stories:lint
yarn nx run react-modern-components-preview-stories:format:check
yarn nx run react-modern-components-preview:bundle-size --skipNxCache
```

The uncached bundle-size run is required. Confirm its output names
`bundle-size/AllComponents.fixture.js`; a cached Button-only result does not
validate new exports or emitted CSS.

Before finishing:

- verify emitted CSS exists beside JS in both module outputs
- verify all new subpaths generated API reports
- report tests, type-check, lint, build, stories, formatting, and bundle result
- do not create a beachball change file for the private preview package unless
  repository release policy changes or the user explicitly requests one
