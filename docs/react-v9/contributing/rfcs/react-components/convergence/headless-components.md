# RFC: Headless Components

## Contributors

- @dmytrokirpa

## Summary

Introduce `@fluentui/react-headless`: unstyled components built from
`use${ComponentName}Base_unstable` + `render${ComponentName}_unstable`.

Goal: give teams a supported, low-boilerplate path to Fluent behavior/accessibility with custom
visual design.

Headless components include:

- behavior and ARIA from base hooks
- existing slot API
- forward refs
- stable state `data-*` attributes on root slots

Headless components exclude:

- Griffel styles and tokens wiring
- visual design props (`appearance`, `size`, `shape`)
- built-in motion/animation

Use headless when teams need Fluent behavior with non-Fluent visuals.
Use styled components when teams want Fluent visuals with branding tweaks.

## Problem Statement

Base hooks solve logic reuse but leave two gaps:

1. Wiring gap: consumers repeat hook + render plumbing for each component.
2. Styling contract gap: there is no stable CSS-targeting contract for component state.

This RFC closes both via pre-wired headless components and stable state attributes.

## Proposal

### Package

Ship headless components from `@fluentui/react-headless`.

```tsx
import { Button, Checkbox } from '@fluentui/react-headless';
```

Base hooks remain available from owning packages.

### Composition Model

Each headless component is hook + render only.

```tsx
import { useButtonBase_unstable, renderButton_unstable } from '@fluentui/react-button';

export const Button = React.forwardRef((props, ref) => {
  const state = useButtonBase_unstable(props, ref);
  return renderButton_unstable(state);
});
```

### State Styling Contract (`data-*`)

State attributes are authored in base hooks and emitted by both headless and styled variants.

Core attributes:

| Attribute             | Values                             |
| --------------------- | ---------------------------------- |
| `data-disabled`       | presence                           |
| `data-focusable`      | presence                           |
| `data-checked`        | `"true"` \| `"false"` \| `"mixed"` |
| `data-selected`       | presence                           |
| `data-expanded`       | `"true"` \| `"false"`              |
| `data-open`           | `"true"` \| `"false"`              |
| `data-orientation`    | `"horizontal"` \| `"vertical"`     |
| `data-icon-position`  | `"before"` \| `"after"`            |
| `data-icon-only`      | presence                           |
| `data-label-position` | `"before"` \| `"after"`            |

Rules:

- these attributes represent base state only
- no design-state attributes (no appearance/size/shape)
- removal/rename is breaking (major)
- new attributes must be reviewed and documented in a shared schema file
- collisions with consumer-provided attributes are owned by base-hook defaults

### Compound Components

Compound components are provided as headless wrappers over existing base-context patterns.

```tsx
<Menu>
  <MenuTrigger>
    <Button>Open</Button>
  </MenuTrigger>
  <MenuPopover>
    <MenuList>
      <MenuItem>Cut</MenuItem>
    </MenuList>
  </MenuPopover>
</Menu>
```

Provider misuse (for example `MenuPopover` outside `Menu`) throws clear development errors.

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

## Versioning and Compatibility

- `@fluentui/react-headless` depends on the source component packages it re-exports from.
- API drift is blocked by CI validation.
- breaking base-hook changes require coordinated major handling in headless exports.

## Migration

- migration path is headless -> styled if teams converge on Fluent visuals later
- import-only switch is the primary path where slot structure/props are compatible
- styled -> headless is not a guaranteed no-refactor path

## Testing Strategy

Tests live with `react-headless` and cover:

- data attribute correctness across state combinations
- slot API parity with styled variants
- compound-component context/ref behavior
- accessibility and keyboard interaction

## Rollout

- Phase 1: Button, Checkbox, Switch, Radio
- Phase 2: Menu, Dialog, Popover
- Phase 3: remaining interactive v9 components
- each phase exits only after parity tests and accessibility checks are green

## Alternatives Considered

### State classes

Rejected: creates naming-coupling with styled layer and is less ergonomic than `data-*` selectors.

### Render props / callback className API

Rejected: splits API from styled components and adds migration friction.

## Decision

Proceed with `@fluentui/react-headless` and data attributes as the stable state-styling contract.
