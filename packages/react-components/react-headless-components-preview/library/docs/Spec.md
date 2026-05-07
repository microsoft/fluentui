# @fluentui/react-headless-components Spec

## Background

`@fluentui/react-headless-components` is an **advanced, opt-in** package that exposes the headless layer of Fluent UI v9 components: pure component logic, accessibility patterns, and semantic slot structure — without any styling opinions.

It is intended for teams building custom design systems that significantly diverge from Fluent 2. For most teams, the default styled components in `@fluentui/react-components` remain the recommended path.

**What this package provides:**

- Unstyled primitive components (headless components)
- Component behavior, structure, and ARIA patterns
- Keyboard handling
- Semantic slot structure
- Building blocks for advanced composition: `use{Component}` and `render{Component}`
- Optional context-value hooks for compound components (for example, `useAccordionContextValues`)

**What this package does NOT provide:**

- Design props (`appearance`, `size`, `shape`, etc.)
- Style logic (Griffel, design tokens)
- Motion logic (animations, transitions)
- Default slot implementations (icons, components)

> **Important:** Base hooks provide ARIA attributes and semantic structure, but not visual accessibility (e.g., focus indicators, sufficient contrast). Consumers are responsible for implementing these in their custom styles.

## Prior Art

- [RFC: Component Base State Hooks](../../../../../../docs/react-v9/contributing/rfcs/react-components/convergence/base-state-hooks.md)
- Fluent UI v9 `_unstable` hook convention used throughout `@fluentui/react-*` packages

## Sample Code

Building a fully custom button using base hooks:

```tsx
import * as React from 'react';
import { useButton, renderButton } from '@fluentui/react-headless-components';
import type { ButtonProps, ButtonState } from '@fluentui/react-headless-components';

type CustomButtonProps = ButtonProps & {
  variant?: 'primary' | 'secondary' | 'tertiary';
  tone?: 'neutral' | 'success' | 'warning' | 'danger';
};

export const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ variant = 'primary', tone = 'neutral', ...props }, ref) => {
    const state = useButton(props, ref);

    state.root.className = ['custom-btn', `custom-btn--${variant}`, `custom-btn--${tone}`, state.root.className]
      .filter(Boolean)
      .join(' ');

    if (state.icon) {
      state.icon.className = ['custom-btn__icon', state.icon.className].filter(Boolean).join(' ');
    }

    return renderButton(state as ButtonState);
  },
);
```

## API

### Naming Conventions

| Artifact   | Pattern                  | Example        |
| ---------- | ------------------------ | -------------- |
| Primitive  | `${ComponentName}`       | `Button`       |
| Hook       | `use${ComponentName}`    | `useButton`    |
| Props type | `${ComponentName}Props`  | `ButtonProps`  |
| State type | `${ComponentName}State`  | `ButtonState`  |
| Render fn  | `render${ComponentName}` | `renderButton` |

Public exports in this package use stable names and wrap internal `_unstable` base hooks from individual component packages.

### Type Hierarchy

```tsx
// Package types are the headless/base component contracts
type ButtonProps = ComponentProps<ButtonSlots> & {
  disabled?: boolean;
  disabledFocusable?: boolean;
  iconPosition?: 'before' | 'after';
};

type ButtonState = ComponentState<ButtonSlots> & {
  disabled: boolean;
  disabledFocusable: boolean;
  iconPosition: 'before' | 'after';
  iconOnly: boolean;
};
```

### Exported Components

Each exported component is available as an unstyled primitive component, with its low-level building blocks for advanced composition.

#### Accordion family

- `Accordion`, `AccordionItem`, `AccordionHeader`, `AccordionPanel` (unstyled primitives)
- `useAccordion`, `useAccordionItem`, `useAccordionHeader`, `useAccordionPanel`
- `renderAccordion`, `renderAccordionItem`, `renderAccordionHeader`, `renderAccordionPanel`
- Context hooks for advanced composition: `useAccordionContext`, `useAccordionContextValues`

#### Button

- `Button` (unstyled primitive)
- `useButton`
- `renderButton`

#### Divider

- `Divider` (unstyled primitive)
- `useDivider`
- `renderDivider`

## Structure

### Composition Layers

```text
use{Component}Base_unstable   (internal base state hook — logic + accessibility)
        ↓
use{Component}                (public stable hook in this package)
  ↓
render{Component}             (public render function in this package)
  ↓
{Component}                   (unstyled primitive component in this package)
```

This package exposes headless primitives and their building blocks. Styled components in `@fluentui/react-components` continue to compose on top of the same base logic.

### Public API

Every exported component exposes:

- an unstyled primitive component (`Button`)
- a stable hook (`useButton`)
- a render function (`renderButton`)
- optional context-value hooks for compound patterns (`useAccordionContextValues`)

### Internal

Each component's base logic lives in its individual package (for example, `@fluentui/react-button`). This package re-exports stable wrappers and primitives on top of that base logic.

## Migration

This package is a new addition; there is no migration from v8 or v0. For teams currently using full Fluent UI components that want to adopt base hooks, the path is:

1. Replace `useButton_unstable(props, ref)` with `useButton(props, ref)` from this package
2. Remove design props (`appearance`, `size`, `shape`) from your props type and use `ButtonProps` from this package
3. Apply your own class names or styles to the returned state slots before passing to the render function

## Behaviors

Headless hooks encapsulate interactive behavior inherited by the styled component layer:

### Component States

- **Disabled**: ARIA `disabled` and `aria-disabled` attributes set; keyboard events suppressed where appropriate
- **DisabledFocusable**: Element remains focusable while being semantically disabled (`aria-disabled="true"`)
- **Expanded / collapsed**: Accordion primitives manage disclosure state and relationships via ARIA

### Interaction

#### Keyboard

Keyboard behavior is component-specific and follows WAI-ARIA authoring practices. Each hook applies the same keyboard handling as the corresponding styled component.

#### Cursor

No cursor styles are applied by base hooks. Consumers are responsible for setting appropriate cursor styles.

#### Touch

Touch events are handled via the same event handlers applied to root slots.

#### Screen readers

- ARIA roles, states, and properties are applied by the hooks

## Accessibility

Headless hooks and primitives provide the semantic foundation for accessibility, but consumers must ensure their custom styles maintain:

- **Visible focus indicators** — base hooks do not apply focus ring styles
- **Sufficient color contrast** — base hooks do not apply colors or tokens
- **Appropriate visual feedback** for all interactive states (hover, active, disabled)

### ARIA Patterns Applied

Each component follows its corresponding WAI-ARIA authoring practice:

| Component | ARIA pattern          |
| --------- | --------------------- |
| Accordion | Accordion pattern     |
| Button    | Button / Link pattern |
| Divider   | Separator pattern     |

> Keyboard navigation, focus management, and state announcements are delegated to the individual component packages and are identical to their styled counterparts.
