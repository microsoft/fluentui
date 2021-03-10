# Tooltip Spec

Tooltips provide additional information about an element when hovering or focusing on the element.

## Prior Art

- OpenUI Tooltip resarch: https://open-ui.org/components/tooltip.research
- GitHub Epic issue: [Tooltip Convergence #16735](https://github.com/microsoft/fluentui/issues/16735)

### Tooltips in v8/Fabric

v8 tooltips use a `TooltipHost` wrapped around the target element to provide tooltip functionality. This creates a `div` around the element that listens for mouse and focus events.

The `Tooltip` component renders as a `Callout`, and supports all `Callout` props.

```tsx
<TooltipHost
  content="This is the tooltip content"
  // This id is used on the tooltip itself, not the host
  // (so an element with this id only exists when the tooltip is shown)
  id={tooltipId}
  calloutProps={calloutProps}
  styles={hostStyles}
>
  <DefaultButton aria-describedby={tooltipId}>Hover over me</DefaultButton>
</TooltipHost>
```

#### Drawbacks

There are a few drawbacks with this approach to adding tooltips, which are outlined in [☂ Tooltip: open issues to resolve in converged approach #15102](https://github.com/microsoft/fluentui/issues/15102), and summarized below:

- The wrapper `div` created by `TooltipHost` can cause layout issues for the component. It also doesn't always result in proper positioning for the tooltip.
- The API is overly complex.
- There's no coordination between tooltips on a page. For example, moving the mouse between two elements with tooltips should cause the second tooltip to appear immediately without fading in/out.

### Tooltips in v0/Northstar

v0 tooltips use a `trigger` property to render the tooltip's target component. However, unlike v8 it does not create a wrapper `div` around the target component, but instead adds listeners to the target component's props.

```tsx
<Tooltip content="Example tooltip" trigger={<Button content="A button" />} />
```

# Sample Code

There are a few ways to add a tooltip to a component.

## A component with a `tooltip` slot

Components can choose to expose a `tooltip` slot, by inheriting props from the `WithTooltipSlot` interface and using the `useTooltipSlot` hook.

The tooltip is only rendered if a `TooltipProvider` is present to provide the the actual `Tooltip` component. This allows components to support optional tooltips without requiring them to have a direct dependence on the `react-tooltip` package.

For example, to add the `tooltip` slot to Button:

```typescript
// Button.types.ts:
export interface ButtonProps extends WithTooltipSlot /*, ...*/ {
  // ...
}

export const buttonShorthandProps = [/*... other slots, */ 'tooltip'] as const;

// useButton.ts:
export const useButton = (/*...*/) => {
  const state = mergeProps(/*...*/);

  // The component can choose whether the tooltip corresponds to a label or description
  useTooltipSlot(state, { ariaProp: state.iconOnly ? 'aria-labelledby' : 'aria-describedby' });

  // ... other button state management code ...

  return state;
};

// renderButton.tsx:
export const renderButton = (state: ButtonState) => {
  const { slots, slotProps } = getSlots(state, buttonShorthandProps);
  return (
    <slots.root {...slotProps.root}>
      {/* ... other slots ...*/}
      <slots.tooltip {...slotProps.tooltip} />
    </slots.root>
  );
};
```

Example usage:

```tsx
<Button tooltip="Example tooltip" />
<Button tooltip={<>Custom <b>Tooltip</b> content!</>} />
<Button tooltip={{ children: 'Placed Tooltip', placement: 'right' }} />
```

## On any element using TooltipTrigger

To attach a tooltip to a component that doesn't have a `tooltip` slot, wrap it with the `TooltipTrigger` element. It has its own `tooltip` slot, similar to the one that gets added by `useTooltipSlot`. It doesn't create any DOM nodes of its own (it does _not_ wrap the element with a `<div>` for example). Instead, it attaches listeners to the child by cloning the JSX object and adding `onPointerDown`, etc. events. This is slightly less ergonomic than the tooltip slot, but works with any component that has pointer and focus events.

```tsx
<TooltipTrigger tooltip="Example Tooltip">
  <a href="http://example.com">
    A link with a tooltip
  </a>
</TooltipTrigger>

<TooltipTrigger tooltip="Label for an icon button" ariaProp="aria-labelledby">
  <button href="http://example.com">
    <SomeIcon />
  </button>
</TooltipTrigger>

<TooltipTrigger tooltip={{<>This supports <b>third party</b> components</>}}>
  <ThirdPartyComponent />
</TooltipTrigger>
```

# Variants

- The tooltip can have a `subtle` style variant with a different background and text color.
- The tooltip can optionally render an arrow pointing to the target element (on by default).

# API

The Tooltip API is split among several components and hooks, in two packages. Having two packages allows the lightweight `react-tooltip-hook` package to be referenced by any component, while the bulk of the code for tooltip positioning and management lives in the larger `react-tooltip` package.

- [**@fluentui/react-tooltip-hook**](#fluentuireact-tooltip-hook)
  - [`TooltipProps`](#tooltipprops)
  - [`TooltipManagerApi`](#tooltipmanagerapi)
  - [`useTooltipContext`](#usetooltipcontext)
  - [`useTooltipSlot`](#usetooltipslot)
  - [`TooltipTrigger`](#tooltiptrigger)
- [**@fluentui/react-tooltip**](#fluentuireact-tooltip)
  - [`Tooltip`](#tooltip)
  - [`TooltipProvider`](#tooltipprovider)
  - [`TooltipManager`](#tooltipmanager)

_A note about the terminology used for the elements that the tooltip is attached to:_

- _The **trigger** is the element that causes the tooltip to open._
- _The **target** is the element that the tooltip is anchored to (and the arrow points to)._
- _Almost always, these will both be the same element, but it is possible to specify them separately, so the tooltip can show up adjacent to a different element than the one that triggered it._

## @fluentui/react-tooltip-hook

`react-tooltip-hook` is a lightweight package that allows any component to implement a `tooltip` property without taking a dependency on the full `react-tooltip` package. It provides the basic functionality to render the tooltip if the `TooltipProvider` context is present.

### TooltipProps

The `TooltipProps` interface is defined in `react-tooltip-hook` so that components can specify the details of the tooltip without needing the full `react-tooltip` package.

```typescript
export interface TooltipProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * How to position the tooltip relative to the target element. This is a "best effort" placement,
   * but the tooltip may be flipped to the other side if there is not enough room.
   *
   * @defaultvalue top
   */
  placement?: TooltipPlacement;

  /**
   * Color variant with a subtle look
   */
  subtle?: boolean;

  /**
   * Do not render an arrow pointing to the target element
   */
  noArrow?: boolean;

  /**
   * Delay before the tooltip is shown, in milliseconds
   *
   * @defaultvalue 250
   */
  showDelay?: number;

  /**
   * Delay before the tooltip is hidden, in milliseconds
   *
   * @defaultvalue 250
   */
  hideDelay?: number;

  /**
   * Only show the tooltip if the target element's children are truncated (overflowing).
   */
  onlyIfTruncated?: boolean;

  /**
   * The element that this Tooltip points to.
   *
   * Normally this will be set by the TooltipManager when a tooltip is shown by hovering or focusing an element.
   * The target can be specified if the tooltip needs to point to a different element than the one that triggered it.
   */
  target?: HTMLElement | null;

  /**
   * Internal use. This should only be set by the TooltipManager when the tooltip is shown.
   */
  visible?: boolean;
}

/**
 * Defines where the tooltip is placed in relation to the target element.
 *
 * The first half of the name defines which side of the element:
 * * above - top of the target
 * * below - bottom of the target
 * * before - left of the target (right in RTL)
 * * after - right of the target (left in RTL)
 *
 * The second half defines the alignment of the tooltip on that side:
 * * (none) - centered
 * * start - aligned to the left edge (right in RTL)
 * * end - aligned to the right edge (left in RTL)
 * * top - aligned to the top edge
 * * bottom - aligned to the bottom edge
 */
export type TooltipPlacement =
  | 'above'
  | 'above-start'
  | 'above-end'
  | 'below'
  | 'below-start'
  | 'below-end'
  | 'before'
  | 'before-top'
  | 'before-bottom'
  | 'after'
  | 'after-top'
  | 'after-bottom';
```

### TooltipManagerApi

The `TooltipManagerApi` allows components to show and hide tooltips based on mouse and focus events.

```typescript
/**
 * Interface to be implemented by the TooltipManager
 */
export interface TooltipManagerApi {
  /**
   * Called by a component with a tooltip, either from onPointerEnter or onFocus.
   */
  showTooltip: (
    triggerElement: HTMLElement,
    tooltipElement: HTMLElement,
    tooltipProps: ShorthandProps<TooltipProps>,
  ) => void;

  /**
   * Called by a component with a tooltip, either from onPointerLeave or onBlur.
   */
  hideTooltip: (triggerElement: HTMLElement) => void;

  /**
   * Hides any visible tooltip.
   */
  hideAll: () => void;
}
```

### useTooltipContext

The tooltip hooks get the actual implementation of the TooltipManagerApi and Tooltip renderer via React context. By default this is `undefined`, and requires a `TooltipProvider` to provide the actual implementations.

```typescript
export type TooltipContext = {
  TooltipManager: TooltipManagerApi;
  Tooltip: React.FC<TooltipProps & React.RefAttributes<HTMLElement>>;
  tooltipPortalDestination: HTMLElement;
};

export const internal__TooltipContext = React.createContext<TooltipContext | undefined>(undefined);

export const useTooltipContext = () => React.useContext(internal__TooltipContext);
```

### useTooltipSlot

The `useTooltipSlot` hook adds React event listeners for pointer and focus events to the component's state. It passes the tooltip props to the `TooltipManager`.

```typescript
/**
 * Mixin to add the tooltip slot to a component's Props.
 *
 * Note: The tooltip slot should _not_ be listed in the component's slot props for rendering.
 * Although this has the same API as a slot, the tooltip will not be rendered directly by the component.
 */
export interface WithTooltipSlot {
  /**
   * The tooltip content to display on hover or focus. Can be a string, JSX element tree, or TooltipProps.
   */
  tooltip?: ShorthandProps<TooltipProps>;
}

export type TooltipSlotOptions = {
  /**
   * The aria property that will be set to the tooltip's ID.
   *
   * @defaultvalue aria-describedby
   */
  ariaProp?: 'aria-describedby' | 'aria-labelledby';
};

/**
 * Implement tooltip functionality on a component with a tooltip slot.
 */
export function useTooltipSlot(
  state: React.HTMLAttributes<HTMLElement> & WithTooltipSlot,
  options?: TooltipSlotOptions,
);
```

### TooltipTrigger

`TooltipTrigger` allows tooltips to be added to any focusable component that doesn't have its own `tooltip` prop. It supports a single JSX child, and works by cloning the JSX element in order to add the same `onPointerDown`, etc. listeners that are added by `useTooltipSlot`.

```typescript
export interface TooltipTriggerProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * The tooltip content to display on hover or focus. Can be a string, JSX element tree, or TooltipProps.
   */
  tooltip?: ShorthandProps<TooltipProps>;

  /**
   * The aria property that will be set to the tooltip's ID.
   *
   * @defaultvalue aria-describedby
   */
  ariaProp?: 'aria-describedby' | 'aria-labelledby';
}

export const tooltipTriggerShorthandProps = ['tooltip'] as const;
```

## @fluentui/react-tooltip

The `react-tooltip` package contains the bulk of the implementation of tooltips, including rendering, styling, positioning, lifetime management, etc.

### Tooltip

`Tooltip` renders the tooltip content itself, and the arrow that points to the target element. The tooltip renders in a React portal to avoid clipping.

The `TooltipProps` interface is defined in the `react-tooltip-hook` package.

The `TooltipState` type has a slot for the arrow. This arrow slot can't be set by a prop, but is used internally for rendering and positioning.

```typescript
import { TooltipProps } from '@fluentui/react-tooltip-hook';

export { TooltipProps };

export const tooltipShorthandProps = [] as const;
export const tooltipSlotProps = [...tooltipShorthandProps, 'arrow'] as const;

export type TooltipState = ComponentState<
  TooltipProps & {
    /**
     * The arrow that points to the target element.
     */
    arrow?: ObjectShorthandProps<React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>;
  },
  /* ShorthandProps: */ typeof tooltipShorthandProps[number],
  /* DefaultedProps: */ 'arrow' | 'placement'
>;
```

### TooltipProvider

`TooltipProvider` is responsible for providing the actual implementation of `TooltipManagerApi` and `Tooltip`. It uses a React context to that contains those when it is included in the tree. This context will also be built into `FluentContext`.

```typescript
export interface TooltipProviderProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  // TooltipProvider has no additional props
}

export const tooltipProviderShorthandProps = [] as const;

export type TooltipProviderState = ComponentState<TooltipProviderProps, typeof tooltipProviderShorthandProps[number]>;
```

### TooltipManager

`TooltipManager` handles showing and hiding tooltips, including positioning and tracking the visible tooltip. There is only one instance at the root of the app.

Note that the `TooltipManager` has a slot for the visible tooltip on its State, but it's not a public prop. Instead, the tooltip is shown/hidden using the `TooltipManagerApi` imperative interface, which is defined in the `react-tooltip-hook` package.

> **Review:** TooltipProvider and TooltipManager could probably be merged into a single component

```typescript
import { TooltipManagerApi } from '@fluentui/react-tooltip-hook';

export interface TooltipManagerProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Ref to the imperative interface to show and hide tooltips.
   */
  componentRef?: React.Ref<TooltipManagerApi>;
}

export const tooltipManagerShorthandProps = ['tooltip'] as const;

export type TooltipManagerState = ComponentState<
  TooltipManagerProps & {
    /**
     * The Tooltip being rendered, if any.
     */
    tooltip?: ShorthandProps<TooltipProps>;
  }
>;
```

# Structure

## Public

```tsx
<TooltipProvider>
  <Button tooltip="Example tooltip" />
  <TooltipTrigger tooltip="Element wrapped with TooltipTrigger">
    <a href="http://example.com" />
  </TooltipTrigger>
</TooltipProvider>
```

## DOM

In this example, the mouse is hovering over the first tooltip in the example above

```tsx
<body>
  <div {/* TooltipProvider */}>
    <button aria-describedby="tooltip-1" onPointerEnter={...} onPointerLeave={...} onFocus={...} onBlur={...} />
    <a href="http://example.com" aria-describedby="tooltip-2" onPointerEnter={...} onPointerLeave={...} onFocus={...} onBlur={...} />
  </div>

  <div {/* Tooltip portal */}>
    <div role="tooltip" id="tooltip-1" {/* Tooltip */}>
      <div {/* Arrow */} />
      Example tooltip
    </div>
    <div role="tooltip" id="tooltip-2" hidden="true" aria-hidden="true" {/* Tooltip */}>
      <div {/* Arrow */} />
      Element wrapped with TooltipTrigger
    </div>
  </div>
</body>
```

## Internal

`TooltipProvider`:

```tsx
<internal__TooltipContext.Provider value={tooltipContext}>
  <slots.root {...slotProps.root} />
</internal__TooltipContext.Provider>
```

`Tooltip`:

```tsx
<slots.root {...slotProps.root}>
  <slots.arrow {...slotProps.arrow} />
  {state.children}
</slots.root>
```

`TooltipTrigger`:

Transparently renders children, without any wrapper element:

```tsx
<>{state.children}</>
```

# Migration

See MIGRATION.md.

# Behaviors

- Visibility

  - There is only ever one tooltip visible at once.
  - The tooltip shows 250ms (by default) after the trigger element receives either mouse/pointer hover or keyboard focus.
    - _Exception_: if another tooltip is currently visible, the new tooltip will immediately replace the old one without any delay.
    - _Exception_: if `onlyIfTruncated` is true, then the tooltip will only show if the target element's content is overflowing.
  - The tooltip hides 250ms (by default) after both the trigger element AND tooltip itself lose mouse/pointer hover or keyboard focus (or immediately if another tooltip is shown).
  - The tooltip hides immediately when the user presses Esc.

- Placement

  - The tooltip is placed relative to its target element, based on the `placement` property.
  - The placement will likely be handled by the PopperJS open source package. The discussion about using Popper is in [RFC: Integrate Popper into Fluent #17209](https://github.com/microsoft/fluentui/pull/17209)

- Focus

  - Content within the tooltip is not focusable, and can't be interacted with directly by keyboard or mouse.

- Screen readers
  - The tooltip is connected to the trigger element using `aria-describedby`, which should result in the screen reader reading the tooltip when shown.

# Accessibility

- ARIA design pattern: [Tooltip Widget](https://www.w3.org/TR/wai-aria-practices-1.2/#tooltip)
- The Tooltip root element will have `role="tooltip"`
- Every tooltip will always be rendered in the DOM; though they will be hidden (including `aria-hidden="true"`) except for the one currently being shown, if any.
- The trigger element (with the `tooltip="..."` prop) will have `aria-describedby` or `aria-labelledby` set to the tooltip element's ID. The ID will be generated automatically if not supplied.
- The Tooltip itself can never receive focus.
- The Tooltip should never contain focusable elements.
