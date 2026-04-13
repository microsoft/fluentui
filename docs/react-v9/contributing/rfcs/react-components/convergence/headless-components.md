# RFC: Headless Components

## Contributors

- @dmytrokirpa

## Summary

We already have base hooks, render functions, and context value hooks.
This RFC proposes the next abstraction layer: fully featured unstyled primitives for all
convergence components so consumers do not need to wire `useButton` + `renderButton`
for every usage, and so internal component state is exposed as stable `data-*` attributes
for CSS targeting without direct hook access.

Introduce `@fluentui/react-headless-components`: unstyled components built from
`use${ComponentName}` + `render${ComponentName}`, with stable state
`data-*` attributes emitted by headless state hooks.

Goal: give teams a supported, low-boilerplate path to Fluent behavior/accessibility with custom
visual design.

Headless components include:

- behavior and ARIA from base hooks
- existing slot API
- forward refs
- stable state `data-*` attributes on slots

Headless components exclude:

- Griffel styles and tokens wiring
- visual design props (`appearance`, `size`, `shape`)
- built-in motion/animation

Use headless when teams need Fluent behavior with non-Fluent visuals.
Use styled components when teams want Fluent visuals with branding tweaks.

## Problem Statement

Headless hooks solve logic reuse but leave two gaps:

1. Wiring gap: consumers repeat hook + render plumbing for each component.
2. State visibility gap at the component abstraction: when consumers use a full component
   (`<Button />`) they do not get direct state access like they do in hooks, so they cannot
   reliably style based on internal state.

This RFC closes both:

- #1 via pre-wired headless components for all convergence components, removing repetitive
  hook + render wiring from app code
- #2 via stable `data-*` attributes emitted by state hooks, keeping full-component DX
  while preserving state-driven styling

## Decision Drivers

- reduce repeated hook + render wiring for common component usage
- provide a stable, documented state-to-attribute contract for CSS targeting
- preserve accessibility behavior parity with styled components

## Proposal

### Package

Ship headless components from `@fluentui/react-headless-components`.

```tsx
import { Button, Checkbox } from '@fluentui/react-headless-components';
```

All convergence components are in scope. Simple components (Button, Checkbox, RadioButton,
Toggle, Badge) ship first; compound/composite components (Menu, Dialog, Combobox, Select)
follow in subsequent phases.

Headless hooks remain exported from `@fluentui/react-headless-components`.

### Composition Model

Each headless component is hook + render only (and option context if it's a composite component).

```tsx
import { useButton, renderButton } from '@fluentui/react-headless-components';

export const Button = React.forwardRef((props, ref) => {
  const state = useButton(props, ref);
  return renderButton(state);
});
```

This abstraction preserves the existing base architecture but removes repetitive wiring from app
code. Note: headless components wrap existing hooks — they introduce no new behavior or
reimplemented logic.

Compound components wire sub-components and their shared context the same way styled variants
do; the difference is that Griffel styles are omitted. Sub-components are exported from the
package root alongside the parent (e.g. `Menu`, `MenuTrigger`, `MenuPopover`, `MenuList`,
`MenuItem`).

### State To `data-*` Mapping (Primary Contract)

Headless state hooks map internal state to stable `data-*` attributes. Components then render
those attributes on slots so styling remains possible without direct hook state access.

Example (simplified):

```tsx
const state = useButton(props, ref);

// stringifyDataAttribute: returns undefined (omits the attribute) for falsy presence
// attributes, or the string value ("true"/"false"/enum) for boolean/tri-state attributes.
Object.assign(state.root, {
  'data-disabled': stringifyDataAttribute(state.disabled),
  'data-disabled-focusable': stringifyDataAttribute(state.disabledFocusable),
  'data-icon-only': stringifyDataAttribute(state.iconOnly),
});

return state;
```

Consumer styling:

```css
.myButton[data-disabled] {
  opacity: 0.5;
}

.myButton[data-icon-only] {
  padding-inline: 0.5rem;
}
```

or with TailwindCSS:

```tsx
<Button className="data-[disabled]:opacity-50 data-[icon-only]:px-2" />
```

These attributes are authored in state hooks in `@fluentui/react-headless-components` and are
treated as the stable styling surface for headless primitives.

Core attributes:

| Attribute                 | Values                             |
| ------------------------- | ---------------------------------- |
| `data-disabled`           | presence                           |
| `data-disabled-focusable` | presence                           |
| `data-focusable`          | presence                           |
| `data-checked`            | `"true"` \| `"false"` \| `"mixed"` |
| `data-selected`           | presence                           |
| `data-expanded`           | `"true"` \| `"false"`              |
| `data-open`               | `"true"` \| `"false"`              |
| `data-orientation`        | `"horizontal"` \| `"vertical"`     |
| `data-icon-position`      | `"before"` \| `"after"`            |
| `data-icon-only`          | presence                           |
| `data-label-position`     | `"before"` \| `"after"`            |

Attribute emission rules:

- presence attributes are emitted only when the state is true; otherwise omitted
- boolean-valued attributes are always emitted as `"true"` or `"false"`
- tri-state attributes (for example `data-checked`) use the declared enum values
- attributes are emitted on the root slot unless a documented component exception exists

Rules:

- these attributes represent base state only
- no design-state attributes (no appearance/size/shape)
- removal/rename is breaking (major)
- adding a new attribute is non-breaking for CSS selectors; it may affect snapshot tests, which is acceptable
- data attributes must be documented on the components documentation page (Storybook docsite)
- base state attributes are reserved; if consumers provide the same `data-*` attribute, the base-hook value wins —
  this prevents state misrepresentation (a disabled button must not appear enabled regardless of consumer props)
- precedence must be deterministic: apply reserved base-state attributes after consumer root props are resolved
- `data-*` attributes are emitted as plain DOM attributes and are SSR-safe; no hydration concerns

## Non-Goals

- introducing new component behavior
- defining a design system or default theme
- replacing styled components
- changing slot structure

## Accessibility

Headless components must match styled-component accessibility behavior.

Validation bar:

- ARIA semantics via base hooks (unit-tested)
- keyboard navigation for interactive/compound components
- focus management for overlays and composites
- automated a11y checks in component tests

## Testing Strategy

Tests live with `react-headless-components` and cover:

- data attribute correctness across state combinations
- slot API parity with styled variants
- compound-component context/ref behavior
- accessibility and keyboard interaction

## Alternatives Considered

### State classes

```tsx
<Button disabled disabledFocusable>
  Button
</Button>

// Renders:
//  <button class="fui-Button--disabled fui-Button--disabledFocusable">Button</button>
```

Rejected: creates naming coupling between behavior state and styling implementation details,
encourages internal class contracts, and diverges from a simple selector-based public contract.

### Render props / callback className API

```tsx
<Button className={state => `fui-Button ${state.disabled ? 'fui-Button--disabled' : ''}`}>Save</Button>
```

Rejected: introduces a different composition API from existing Fluent components, increases
verbosity, and makes migration between headless and styled variants harder.

### Style callback prop

```tsx
<Button styles={state => ({ root: { opacity: state.disabled ? 0.5 : 1 } })} />
```

Rejected: recreates a runtime styling API surface, increases API complexity, and does not align
with the goal of exposing state through standard DOM selectors.

## Decision

Proposed direction: proceed with `@fluentui/react-headless-components` and `data-*` attributes as the stable
state-styling contract.
