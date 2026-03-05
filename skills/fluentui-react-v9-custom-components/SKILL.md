---
name: fluentui-react-v9-custom-components
description: 'Guide for building custom React components using Fluent UI v9 base state hooks and render functions. Use when asked to: create a component based on FluentUI headless hooks, build a custom component using Fluent UI base state hooks, create a component with custom styling that reuses Fluent UI accessibility behavior, implement a component using render{Component}_unstable and use{Component}Base_unstable, or consume @fluentui/react-button/@fluentui/react-tabs/etc. without Fluent 2 visual design.'
---

# Building Custom Components with FluentUI v9 Base Hooks

Base state hooks + render functions let you reuse Fluent's ARIA behavior, keyboard handling, and slot structure with completely custom styling. Imports come from individual component packages (e.g. `@fluentui/react-button`), not from `@fluentui/react-components`.

> **Your responsibility:** custom styling, visible focus indicators, sufficient color contrast, and all visual accessibility. Base hooks provide ARIA structure but not visual a11y.

## The Pattern

```tsx
import * as React from 'react';
import { useButtonBase_unstable, renderButton_unstable } from '@fluentui/react-button';
import type { ButtonBaseProps, ButtonState } from '@fluentui/react-button';

type CustomButtonProps = ButtonBaseProps & {
  variant?: 'primary' | 'secondary' | 'tertiary';
  tone?: 'neutral' | 'success' | 'warning' | 'danger';
};

export const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ variant = 'primary', tone = 'neutral', ...props }, ref) => {
    // 1. Get state: ARIA, keyboard handling, slot structure
    const state = useButtonBase_unstable(props, ref);

    // 2. Mutate state: apply your classes/styles
    state.root.className = ['btn', `btn--${variant}`, `btn--${tone}`].filter(Boolean).join(' ');
    if (state.icon) {
      state.icon.className = 'btn__icon';
    }

    // 3. Render using Fluent's render function
    return renderButton_unstable(state as ButtonState);
  },
);
```

## Available Hooks

See `references/available-hooks.md` for the full inventory with import paths, prop/state types, and notes.

**Quick reference:**

| Component      | Hook                             | Render function                 | Package                     |
| -------------- | -------------------------------- | ------------------------------- | --------------------------- |
| Button         | `useButtonBase_unstable`         | `renderButton_unstable`         | `@fluentui/react-button`    |
| ToggleButton   | `useToggleButtonBase_unstable`   | `renderToggleButton_unstable`   | `@fluentui/react-button`    |
| TabList        | `useTabListBase_unstable`        | `renderTabList_unstable`        | `@fluentui/react-tabs`      |
| Tab            | `useTabBase_unstable`            | `renderTab_unstable`            | `@fluentui/react-tabs`      |
| Divider        | `useDividerBase_unstable`        | `renderDivider_unstable`        | `@fluentui/react-divider`   |
| Accordion      | `useAccordionBase_unstable`      | `renderAccordion_unstable`      | `@fluentui/react-accordion` |
| AccordionPanel | `useAccordionPanelBase_unstable` | `renderAccordionPanel_unstable` | `@fluentui/react-accordion` |
| Toolbar        | `useToolbarBase_unstable`        | `renderToolbar_unstable`        | `@fluentui/react-toolbar`   |
| ToolbarButton  | `useToolbarButtonBase_unstable`  | `renderToolbarButton_unstable`  | `@fluentui/react-toolbar`   |
| Popover        | `usePopoverBase_unstable`        | `renderPopover_unstable`        | `@fluentui/react-popover`   |
| Persona        | `usePersonaBase_unstable`        | `renderPersona_unstable`        | `@fluentui/react-persona`   |
| Card           | `useCardBase_unstable`           | `renderCard_unstable`           | `@fluentui/react-card`      |

## Compound Components (TabList, Accordion)

Compound components require context values passed to the render function. Use `use{Component}ContextValues_unstable` and inject any design props needed by child components before calling it:

```tsx
import {
  useTabListBase_unstable,
  useTabListContextValues_unstable,
  renderTabList_unstable,
  useTabListA11yBehavior_unstable,
} from '@fluentui/react-tabs';
import type { TabListBaseProps, TabListState } from '@fluentui/react-tabs';

type CustomTabListProps = TabListBaseProps & { appearance?: 'filled' | 'outline' };

export const CustomTabList = React.forwardRef<HTMLDivElement, CustomTabListProps>(
  ({ appearance = 'filled', ...props }, ref) => {
    const state = useTabListBase_unstable(props, ref);

    // Inject design props consumed by child Tab components via context
    Object.assign(state, { appearance, size: 'medium', reserveSelectedTabSpace: true });
    const contextValues = useTabListContextValues_unstable(state as TabListState);

    // Apply custom classes
    state.root.className = `tab-list tab-list--${appearance}`;

    // Keyboard navigation: choose one approach
    // Option A — Tabster (recommended for accessibility)
    const focusProps = useTabListA11yBehavior_unstable({ vertical: state.vertical });
    state.root = { ...state.root, ...focusProps };
    // Option B — focusgroup proposal
    // (state.root as any).focusgroup = `tablist ${state.vertical ? 'block' : 'inline'} no-memory wrap`;

    return renderTabList_unstable(state as TabListState, contextValues);
  },
);
```

## TypeScript tips

- Use `{Component}BaseProps` for the component's props type
- Cast state to `{Component}State` when passing to render: `renderButton_unstable(state as ButtonState)`
- Child components (e.g. `CustomTab`) read design values from context via `useTabListContext_unstable`
