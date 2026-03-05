# Available Base Hooks & Render Functions

## Table of Contents

- [Available Base Hooks \& Render Functions](#available-base-hooks--render-functions)
  - [Table of Contents](#table-of-contents)
  - [Button — `@fluentui/react-button`](#button--fluentuireact-button)
  - [ToggleButton — `@fluentui/react-button`](#togglebutton--fluentuireact-button)
  - [TabList + Tab — `@fluentui/react-tabs`](#tablist--tab--fluentuireact-tabs)
    - [TabList](#tablist)
    - [Tab](#tab)
  - [Divider — `@fluentui/react-divider`](#divider--fluentuireact-divider)
  - [Accordion + AccordionPanel — `@fluentui/react-accordion`](#accordion--accordionpanel--fluentuireact-accordion)
    - [Accordion](#accordion)
    - [AccordionPanel](#accordionpanel)
  - [Toolbar family — `@fluentui/react-toolbar`](#toolbar-family--fluentuireact-toolbar)
  - [Popover + PopoverSurface — `@fluentui/react-popover`](#popover--popoversurface--fluentuireact-popover)
  - [Persona — `@fluentui/react-persona`](#persona--fluentuireact-persona)
  - [Card — `@fluentui/react-card`](#card--fluentuireact-card)

---

## Button — `@fluentui/react-button`

```typescript
import { useButtonBase_unstable, renderButton_unstable } from '@fluentui/react-button';
import type { ButtonBaseProps, ButtonBaseState, ButtonState } from '@fluentui/react-button';
```

**Props (`ButtonBaseProps`):** `disabled?`, `disabledFocusable?`, `iconPosition?: 'before' | 'after'`, `icon?`, plus all HTML button/anchor props via `as` prop.

**State (`ButtonBaseState`):** `disabled`, `disabledFocusable`, `iconPosition`, `iconOnly`, `root` (slot), `icon` (slot), `components`.

**Notes:**

- `renderButton_unstable(state as ButtonState)` — cast required
- Handles `aria-disabled` for `disabledFocusable` case automatically
- `iconOnly` is computed from `icon.children` + absence of `children`

---

## ToggleButton — `@fluentui/react-button`

```typescript
import { useToggleButtonBase_unstable, renderToggleButton_unstable } from '@fluentui/react-button';
import type { ToggleButtonBaseProps, ToggleButtonState } from '@fluentui/react-button';
```

**Additional props:** `checked?`, `defaultChecked?` — controlled/uncontrolled toggle state.

**Additional state:** `checked: boolean`.

---

## TabList + Tab — `@fluentui/react-tabs`

### TabList

```typescript
import {
  useTabListBase_unstable,
  useTabListContextValues_unstable,
  useTabListA11yBehavior_unstable,
  renderTabList_unstable,
} from '@fluentui/react-tabs';
import type { TabListBaseProps, TabListBaseState, TabListState } from '@fluentui/react-tabs';
```

**Props (`TabListBaseProps`):** `disabled?`, `vertical?`, `selectTabOnFocus?`, `selectedValue?`, `defaultSelectedValue?`, `onTabSelect?`.

**State (`TabListBaseState`):** `disabled`, `vertical`, `selectTabOnFocus`, `selectedValue`, `onSelect`, `onRegister`, `onUnregister`, `getRegisteredTabs`, `root` (slot), `components`.

**Context injection required:** Before calling `useTabListContextValues_unstable`, assign design props that child Tab components expect via context:

```typescript
Object.assign(state, {
  appearance: 'filled', // consumed by child Tab via context
  size: 'medium', // consumed by child Tab via context
  reserveSelectedTabSpace: true, // consumed by child Tab via context
});
const contextValues = useTabListContextValues_unstable(state as TabListState);
```

**Keyboard navigation:** `useTabListA11yBehavior_unstable({ vertical })` returns Tabster DOM attributes for arrow key navigation. Apply to `state.root`.

### Tab

```typescript
import { useTabBase_unstable, renderTab_unstable } from '@fluentui/react-tabs';
import type { TabBaseProps, TabBaseState, TabState } from '@fluentui/react-tabs';
```

**Props (`TabBaseProps`):** `value` (required, serializable), `disabled?`, `icon?`, `contentReservedSpace?`.

**State:** `selected` (boolean, from TabList context), `value`, `disabled`, `root` (slot), `icon` (slot), `content` (slot).

**Accessing context in custom Tab:**

```typescript
import { useTabListContext_unstable } from '@fluentui/react-tabs';

const appearance = useTabListContext_unstable(ctx => ctx.appearance as CustomAppearance);
```

---

## Divider — `@fluentui/react-divider`

```typescript
import { useDividerBase_unstable, renderDivider_unstable } from '@fluentui/react-divider';
import type { DividerBaseProps, DividerBaseState, DividerState } from '@fluentui/react-divider';
```

**Props:** `vertical?`, `inset?`, `alignContent?: 'start' | 'center' | 'end'`, `children?`.

**Notes:** `alignContent` affects ARIA role (`separator` vs. `presentation`) — kept in base.

---

## Accordion + AccordionPanel — `@fluentui/react-accordion`

### Accordion

```typescript
import {
  useAccordionBase_unstable,
  useAccordionContextValues_unstable,
  renderAccordion_unstable,
} from '@fluentui/react-accordion';
import type { AccordionBaseProps, AccordionState } from '@fluentui/react-accordion';
```

**Props:** `multiple?`, `collapsible?`, `openItems?`, `defaultOpenItems?`, `onToggle?`.

**Context injection:** Similar to TabList — assign design props before calling `useAccordionContextValues_unstable`.

### AccordionPanel

```typescript
import { useAccordionPanelBase_unstable, renderAccordionPanel_unstable } from '@fluentui/react-accordion';
import type { AccordionPanelBaseProps, AccordionPanelState } from '@fluentui/react-accordion';
```

---

## Toolbar family — `@fluentui/react-toolbar`

```typescript
import {
  useToolbarBase_unstable,
  useToolbarButtonBase_unstable,
  useToolbarToggleButtonBase_unstable,
  useToolbarRadioButtonBase_unstable,
  useToolbarDividerBase_unstable,
  useToolbarGroupBase_unstable,
  renderToolbar_unstable,
  renderToolbarButton_unstable,
  // etc.
} from '@fluentui/react-toolbar';
```

**Notes:**

- `useToolbarBase_unstable` manages context for child toolbar items
- `useToolbarButtonBase_unstable` extends `useButtonBase_unstable` with toolbar context awareness
- All toolbar item hooks read toolbar context (disabled state propagation)

---

## Popover + PopoverSurface — `@fluentui/react-popover`

```typescript
import {
  usePopoverBase_unstable,
  usePopoverSurfaceBase_unstable,
  renderPopover_unstable,
  renderPopoverSurface_unstable,
} from '@fluentui/react-popover';
import type { PopoverBaseProps, PopoverSurfaceBaseProps } from '@fluentui/react-popover';
```

**Notes:**

- `usePopoverBase_unstable` is a headless hook (no DOM element, manages open/close state)
- `usePopoverSurfaceBase_unstable` renders the surface with positioning
- Popover uses React portals — may require additional inline styles for positioning (accessibility exception)

---

## Persona — `@fluentui/react-persona`

```typescript
import { usePersonaBase_unstable, renderPersona_unstable } from '@fluentui/react-persona';
import type { PersonaBaseProps, PersonaBaseState, PersonaState } from '@fluentui/react-persona';
```

**Props:** `name?`, `avatar?`, `presence?`, `primaryText?`, `secondaryText?`, `tertiaryText?`, `quaternaryText?`.

**Notes:** Persona is a layout component — all text/avatar slots available, no design props in base.

---

## Card — `@fluentui/react-card`

```typescript
import { useCardBase_unstable, renderCard_unstable } from '@fluentui/react-card';
import type { CardBaseProps, CardBaseState, CardState } from '@fluentui/react-card';
```

**Props (`CardBaseProps`):** `focusMode?: 'off' | 'no-tab' | 'tab-exit' | 'tab-only'`, `selected?`, `defaultSelected?`, `onSelectionChange?`, `disabled?`, plus all HTML div props.

**State (`CardBaseState`):** `interactive`, `selectable`, `selected`, `selectFocused`, `disabled`, `root` (slot), `floatingAction` (slot), `checkbox` (slot), `components`.

**Excluded design props:** `appearance`, `orientation`, `size` — assign these directly to state before rendering.

**Notes:**

- Card manages an internal checkbox slot for selectable cards and an ARIA reference link between the checkbox and card label
- `renderCard_unstable(state as CardState)` — cast required
- Child components (`CardHeader`, `CardFooter`, `CardPreview`) do not yet have base hooks; use them as-is from `@fluentui/react-card`
- For selectable cards, `onSelectionChange` fires on mouse click, keyboard activation, and checkbox change events
