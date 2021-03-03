# Tooltip Spec

Tooltips provide additional information about an element when hovering or focusing on the element.

## Prior Art

- OpenUI Tooltip resarch: https://open-ui.org/components/tooltip.research
- GitHub Epic issue: [Tooltip Convergence #16735](https://github.com/microsoft/fluentui/issues/16735)

### Tooltips in v8/Fabric

v8 tooltips use a `TooltipHost` wrapped around the target element to provide tooltip functionality. This creates a `div` around the element that listens for mouse and focus events.

The `Tooltip` component renders as a `Callout`, and supports all `Callout` props.

```jsx
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
- It's not possible to have a tooltip within a tooltip
- There's no coordination between tooltips on a page. For example, moving the mouse between two elements with tooltips should cause the second tooltip to appear immediately without fading in/out.

### Tooltips in v0/Northstar

v0 tooltips use a `trigger` property to render the tooltip's target component. However, unlike v8 it does not create a wrapper `div` around the target component, but instead adds listeners to the target component's props.

```jsx
<Tooltip content="Example tooltip" trigger={<Button content="A button" />} />
```

# Sample Code

There are a few ways to add a tooltip to a component.

## A component with a `tooltip` slot

Components can choose to expose a pseudo-slot `tooltip`, by inheriting props from the `WithTooltipSlot` interface and using the `useTooltipSlot` hook.

While this looks and acts like a normal slot to users, the `Tooltip` is not actually rendered by the component, but rather passed to the `TooltipManager` to render. The `useTooltipSlot` hook is lightweight (small bundle size impact); it does not have a direct dependency on the `Tooltip` or `TooltipManager` classes.

For example, to add the `tooltip` slot to Button:

```typescript
// Button.types.ts:
export interface ButtonProps extends WithTooltipSlot /*...*/ {
  // ...
}

// useButton.ts:
export const useButton = (/*...*/) => {
  const state = mergeProps(/*...*/);

  // ...
  useTooltipSlot(state);
  // ...

  return state;
};
```

Example usage:

```jsx
<Button tooltip="Example tooltip" />
<Button tooltip={<>Custom <b>Tooltip</b> content!</>} />
<Button tooltip={{ children: 'Placed Tooltip', placement: 'right' }} />
<Button tooltip={{ as: MyTooltip, children: 'You can even implement your own tooltip' }} />
```

## On any element using a ref

To attach a tooltip to a component that doesn't have a `tooltip` slot, use the `useTooltipRef` hook. It takes the same shorthand props that the `tooltip` slot does. This is slightly less ergonomic than the tooltip slot, and requires using a ref, but works with any element.

```jsx
<div ref={useTooltipRef('Example tooltip', { id: 'exampleTooltipId' })} aria-describedby="exampleTooltipId">
  A div with a tooltip
</div>

<ThirdPartyComponent ref={useTooltipRef(<>Tooltips <u>everywhere</u>!</>)} />
```

# Variants

- The tooltip can have a `subtle` style variant with a different background and text color.
- The tooltip can optionally render an arrow pointing to the target element (on by default).

# API

The Tooltip API is split among several components and hooks, in two packages. Having two packages allows the lightweight `react-tooltip-provider` package to be referenced by any component, while the bulk of the code for tooltips lives in the larger `react-tooltip` package.

- **@fluentui/react-tooltip-provider**
  - `TooltipProps`
  - `TooltipManagerApi`
  - `TooltipProvider`
  - `useTooltipSlot`
  - `useTooltipRef`
- **@fluentui/react-tooltip**
  - `Tooltip`
  - `TooltipManager`

## @fluentui/react-tooltip-provider

The `react-tooltip-provider` is a lightweight package that allows any component to hook into tooltip functionality.

### TooltipProps

The `TooltipProps` interface is defined in `react-tooltip-provider` so that components can specify the details of the tooltip without taking a dependency on the larger `react-tooltip` package.

```typescript
export interface TooltipProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * How to position the tooltip relative to the target element. This is a "best effort" placement,
   * but the tooltip may be flipped to the other side if there is not enough room.
   *
   * @defaultvalue bottom
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
  targetElement?: HTMLElement | null;
}

export type TooltipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'left'
  | 'left-start'
  | 'left-end';
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
  showTooltip: (triggerElement: HTMLElement, tooltip: ShorthandProps<TooltipProps>) => void;

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

### TooltipProvider

`TooltipProvider` is responsible for lazy-loading `TooltipManager`. It creates a React context that provides a ref to the `TooltipManager` once it is loaded. This context will also be built into `FluentContext`.

```typescript
export interface TooltipProviderProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  // TooltipProvider has no additional props
}

export const tooltipProviderShorthandProps = [] as const;

export type TooltipProviderState = ComponentState<TooltipProviderProps, typeof tooltipProviderShorthandProps[number]>;
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

/**
 * Implement tooltip functionality on a component with a tooltip slot.
 */
export function useTooltipSlot(state: React.HTMLAttributes<HTMLElement> & WithTooltipSlot);
```

### useTooltipRef

The `useTooltipRef` hook creates a ref function that adds native event listeners to any element.

```typescript
/**
 * Create a ref that, when attached to an element, shows the tooltip on hover or focus.
 *
 * @param tooltip - The tooltip to display on hover or focus. Can be a string, JSX element tree, or TooltipProps.
 */
export function useTooltipRef(tooltip: ShorthandProps<TooltipProps>);
```

## @fluentui/react-tooltip

The `react-tooltip` package contains the bulk of the implementation of tooltips, including rendering, styling, positioning, lifetime management, etc. This will be a larger package, but can be lazy-loaded and doesn't need to be included in an app's bundle directly.

### Tooltip

`Tooltip` renders the tooltip content itself, and the arrow that points to the target element.

The `TooltipProps` interface is defined in the `react-tooltip-provider` package.

The `TooltipState` type has a slot for the arrow. This arrow slot can't be set by a prop, but is used internally for rendering and positioning.

```typescript
import { TooltipProps } from '@fluentui/react-tooltip-provider';

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

### TooltipManager

`TooltipManager` handles showing and hiding tooltips, including positioning and tracking the visible tooltip. There is only one instance at the root of the app.

Note that the `TooltipManager` has a slot for the visible tooltip on its State, but it's not a public prop. Instead, the tooltip is shown/hidden using the `TooltipManagerApi` imperative interface, which is defined in the `react-tooltip-provider` package below.

```typescript
import { TooltipManagerApi } from '@fluentui/react-tooltip-provider';

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
  <Button tooltip="Hello world" /> {/* for example... */}
</TooltipProvider>
```

## Internal

`TooltipProvider`:

```tsx
<internal__TooltipProviderContext.Provider value={{ current: undefined }}>
  <slots.root {...slotProps.root} />
  <React.Suspense fallback={null}>
    <TooltipManager />
  </React.Suspense>
</internal__TooltipProviderContext.Provider>
```

`TooltipManager`:

```tsx
<slots.root {...slotProps.root}>
  {state.children}
  <slots.tooltip {...slotProps.tooltip} />
</slots.root>
```

`Tooltip`:

```tsx
<slots.root {...slotProps.root}>
  <slots.arrow {...slotProps.arrow} />
  {state.children}
</slots.root>
```

## **DOM** - how the component will be rendered as HTML elements

```tsx
<div {/* TooltipProvider */}>
  <button aria-describedby="tooltip42" /> {/* for example... */}

  <div {/* TooltipManager */}>
    <div id="tooltip42" {/* Tooltip */}>
      <div {/* Arrow */} />
      Hello world
    </div>
  </div>
</div>
```

# Migration

## Migration from v8

The converged API does not support many of the custom features of the v8 tooltip. We may need to revisit and add additional features to the converged Tooltip if needed.

- `Tooltip`
  - `calloutProps` => Not supported. The arrow's visibility can be controlled using `noArrow`.
  - `componentRef` => Not supported. The tooltip can't be manually invoked.
  - `content="..."` => Either a component's `tooltip="..."` prop or the Tooltip's `children` prop.
  - `delay` => `showDelay`
  - `directionalHint` => `placement`
    - `DirectionalHint.topLeftEdge` => `placement="top-start"`
    - `DirectionalHint.topCenter` => `placement="top"`
    - `DirectionalHint.topRightEdge` => `placement="top-end"`
    - `DirectionalHint.topAutoEdge` => Not supported
    - `DirectionalHint.bottomLeftEdge` => `placement="bottom-start"`
    - `DirectionalHint.bottomCenter` => `placement="bottom"`
    - `DirectionalHint.bottomRightEdge` => `placement="bottom-end"`
    - `DirectionalHint.bottomAutoEdge` => Not supported
    - `DirectionalHint.leftTopEdge` => `placement="left-start"`
    - `DirectionalHint.leftCenter` => `placement="left"`
    - `DirectionalHint.leftBottomEdge` => `placement="left-end"`
    - `DirectionalHint.rightTopEdge` => `placement="right-start"`
    - `DirectionalHint.rightCenter` => `placement="right"`
    - `DirectionalHint.rightBottomEdge` => `placement="right-end"`
  - `directionalHintForRTL` => Automatic based on whether the target element is RTL
  - `maxWidth` => `style={{ maxWidth: ... }}`
  - `onRenderContent` => Set `children` to a custom render function
- `TooltipHost`
  - `calloutProps` => Not supported
  - `closeDelay` => `hideDelay` on the Tooltip
  - `hostClassName` => N/A, not needed because there is no TooltipHost
  - `onTooltipToggle` => Not supported
  - `overflowMode` => `onlyIfTruncated`
    - `TooltipOverflowMode.self` => `onlyIfTruncated="true"`
    - `TooltipOverflowMode.parent` => Set `targetElement` to the parent element, and `onlyIfTruncated` to true

## Migration from v0

- `Tooltip`
  - `content="..."` => Either a component's `tooltip="..."` prop or the Tooltip's `children` prop.
  - `defaultOpen` => Not supported
  - `flipBoundary` => Not supported
  - `mountNode` => ???
  - `mouseLeaveDelay` => `hideDelay`
  - `offset` => Not supported
  - `onOpenChange` => Not supported
  - `open` => Not supported
  - `overflowBoundary` => Not supported
  - `pointing` => `!noArrow`
  - `popperRef` => Not supported
  - `position` => `placement`
  - `positionFixed` => Not supported
  - `target` => `targetElement`
  - `trigger` => The component that has the `tooltip="..."` prop set, or the element that has the ref from `useTooltipRef` attached.

# Behaviors

A note about the terminology used for the elements that the tooltip is attached to:

- The _trigger_ is the element that causes the tooltip to open.
- The _target_ is the element that the tooltip is anchored to (and the arrow points to).

Almost always, these will both be the same element, but it is possible to specify them separately, so the tooltip can show up adjacent to a different element than the one that triggered it.

- Visibility

  - There is only ever one tooltip visible at once.
  - The tooltip shows 250ms after the trigger element receieves either mouse/pointer hover or keyboard focus.
    - _Exception_: if another tooltip is currently visible, the new tooltip will immediately replace the old one without any delay.
    - _Exception_: if `onlyIfTruncated` is true, then the tooltip will only show if the target element's content is overflowing.
  - The tooltip hides 250ms after losing mouse/pointer hover or keyboard focus (or immediately if another tooltip is shown).
  - The tooltip hides immediately when the user presses Esc.

- Placement

  - The tooltip is placed relative to its target element, based on the `placement` property.

- Focus

  - Content within the tooltip is not focusable, and can't be interacted with directly by keyboard or mouse.

- Screen readers
  - The tooltip is connected to the trigger element using `aria-describedby`, which should result in the screen reader reading the tooltip when shown.

# Accessibility

- ARIA design pattern: [Tooltip Widget](https://www.w3.org/TR/wai-aria-practices-1.2/#tooltip)
- The Tooltip root element will have `role="tooltip"`
- The trigger element (with the `tooltip="..."` prop) will have `aria-describedby` set to the tooltip element's ID. The ID will be generated automatically if not supplied.
- The Tooltip itself can never receive focus.
