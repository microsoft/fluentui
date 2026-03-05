---
name: fluentui-react-v9-base-hooks
description: 'Guide for implementing base state hooks (use{Component}Base_unstable) in the Fluent UI v9 react-components codebase. Use when asked to implement a base state hook for a FluentUI component, extract headless logic from an existing use{Component}_unstable hook, add useXxxBase_unstable to a component package, or follow the base-state-hooks RFC at docs/react-v9/contributing/rfcs/react-components/convergence/base-state-hooks.md.'
---

# FluentUI v9 Base State Hooks — Implementation Guide

Base state hooks (`use{Component}Base_unstable`) extract pure component logic — ARIA, keyboard handling, slot structure — without styling, design props, or default slot implementations.

Full RFC: `docs/react-v9/contributing/rfcs/react-components/convergence/base-state-hooks.md`

## What to Include vs. Exclude

| Include                                               | Exclude                                      |
| ----------------------------------------------------- | -------------------------------------------- |
| ARIA attributes, keyboard handling                    | Design props (`appearance`, `size`, `shape`) |
| Slot structure, focus management                      | Griffel styles, design tokens                |
| Layout semantics affecting ARIA (e.g. `iconPosition`) | Motion/animation logic                       |
| Refs, controlled/uncontrolled state                   | Default slot implementations (icons, etc.)   |

Exception: apply minimum inline styles only when required for accessibility (e.g., visually-hidden elements, portal positioning). Document the rationale inline.

## Naming

- Hook: `use{Component}Base_unstable` — lives in same file as `use{Component}_unstable`
- Props type: `{Component}BaseProps`
- State type: `{Component}BaseState`
- Exported from the component package `index.ts`, NOT re-exported from `@fluentui/react-components`

## Types

Derive base types using `DistributiveOmit` (preferred) or explicit composition. See `references/type-patterns.md` for full examples.

```typescript
// Preferred: derive by omitting design props
type ButtonBaseProps = DistributiveOmit<ButtonProps, 'appearance' | 'size' | 'shape'>;
type ButtonBaseState = DistributiveOmit<ButtonState, 'appearance' | 'size' | 'shape'>;
```

## Implementation Workflow

### 1. Extract base logic

Move all non-design logic from `use{Component}_unstable` into `use{Component}Base_unstable` in the same file:

```typescript
// packages/react-components/react-button/library/src/components/Button/useButton.ts
export const useButtonBase_unstable = (
  props: ButtonBaseProps,
  ref?: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ButtonBaseState => {
  const { icon, iconPosition = 'before', ...buttonProps } = props;
  const iconShorthand = slot.optional(icon, { elementType: 'span' });

  return {
    disabled: props.disabled ?? false,
    disabledFocusable: props.disabledFocusable ?? false,
    iconPosition,
    iconOnly: Boolean(iconShorthand?.children && !props.children),
    components: { root: 'button', icon: 'span' },
    root: slot.always<ARIAButtonSlotProps<'a'>>(useARIAButtonProps(buttonProps.as, buttonProps), {
      elementType: 'button',
      defaultProps: {
        ref: ref as React.Ref<HTMLButtonElement & HTMLAnchorElement>,
        type: props.as !== 'a' ? 'button' : undefined,
      },
    }),
    icon: iconShorthand,
  };
};
```

### 2. Compose into styled hook

```typescript
export const useButton_unstable = (props: ButtonProps, ref): ButtonState => {
  const { appearance = 'secondary', size = 'medium', shape = 'rounded' } = props;
  return {
    ...useButtonBase_unstable(props, ref),
    appearance,
    size,
    shape,
  };
};
```

### 3. Export from package index

In `packages/react-components/{package}/library/src/index.ts`:

```typescript
export { useButtonBase_unstable } from './components/Button/useButton';
export type { ButtonBaseProps, ButtonBaseState } from './components/Button/Button.types';
```

## Testing

Write dedicated tests for the base hook that verify structure, ARIA attributes, and slot behavior independently of design state. See `references/testing.md` for the pattern.
