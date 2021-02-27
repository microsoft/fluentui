# @fluentui/react-tooltip Spec

## Background

Tooltips provide additional information about an element when hovering or focusing on the element.

## Prior Art

- OpenUI [Tooltip resarch](https://open-ui.org/components/tooltip.research)
- Tooltip Convergence Epic Issue [#16735](https://github.com/microsoft/fluentui/issues/16735)

### Tooltips in Fabric (v8)

TODO

### Tooltips in Northstar (v0)

TODO

## Sample Code

There are a few ways to add a tooltip to a component.

### A component with a `tooltip` slot

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

  useTooltipSlot(state);
  // ...
};
```

Example usage:

```jsx
<Button tooltip="Example tooltip" />
<Button tooltip={<>Custom <b>Tooltip</b> content!</>} />
<Button tooltip={{ children: 'Placed Tooltip', placement: 'right' }} />
<Button tooltip={{ as: MyTooltip, children: 'You can even implement your own tooltip' }} />
```

### On any element using a ref

To attach a tooltip to a component that doesn't have a `tooltip` slot, use the `useTooltipRef` hook. It takes the same shorthand props that the `tooltip` slot does. This is slightly less ergonomic than the tooltip slot, and requires using a ref, but works with any element.

```jsx
<div ref={useTooltipRef('Example tooltip')}>A div with a tooltip</div>

<ThirdPartyComponent ref={useTooltipRef(<>Tooltips <u>everywhere</u>!</>)} />
```

### Render a Tooltip directly (no positioning or layering):

```jsx
<Tooltip>Tooltip text</Tooltip>
```

## Variants

- The tooltip can have a `subtle` style variant with a different background and text color.

## API

The Tooltip API is split among several components and hooks, in two packages:

- **@fluentui/react-tooltip-provider**
  - `TooltipSlotProps`
  - `TooltipManagerApi`
  - `TooltipProvider`
  - `useTooltipSlot`
  - `useTooltipRef`
- **@fluentui/react-tooltip**
  - `Tooltip`
  - `TooltipManager`

### @fluentui/react-tooltip-provider

The `react-tooltip-provider` is a lightweight package that allows any component to hook into tooltip functionality.

#### TooltipSlotProps

The `TooltipSlotProps` interface defines the props available via the `tooltip` slot or the `useTooltipRef` hook. This is defined in the `react-tooltip-provider` package so that components incorporating tooltips don't need to take a dependency on the `react-tooltip` package.

```typescript
export interface TooltipSlotProps extends ComponentProps {
  /**
   * How to position the tooltip relative to the target element. This is a "best effort" placement,
   * but the tooltip may be flipped to the other side if there is not enough room.
   *
   * @defaultvalue bottom
   */
  placement?: TooltipPlacement;

  /**
   * Subtle color variant
   */
  subtle?: boolean;
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

#### TooltipManagerApi

The `TooltipManagerApi` is used internally to communicate between the hooks and the lazy-loaded `TooltipManager`.

```typescript
/**
 * Imperative interface to show and hide tooltips.
 */
export interface TooltipManagerApi {
  show: (target: HTMLElement, tooltip: ShorthandProps<TooltipSlotProps>) => void;
  hide: (target: HTMLElement) => void;
}
```

#### TooltipProvider

`TooltipProvider` is responsible for lazy-loading `TooltipManager`. It creates a React context that provides a ref to the `TooltipManager` once it is loaded. This context will also be built into `FluentContext`.

```typescript
export interface TooltipProviderProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  // TooltipProvider has no additional props
}

export interface TooltipProviderState extends TooltipProviderProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;
}
```

#### useTooltipSlot

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
   * The tooltip to display on hover or focus. Can be a string, JSX element tree, or TooltipSlotProps.
   */
  tooltip?: ShorthandProps<TooltipSlotProps>;
}

/**
 * Implement tooltip functionality on a component with a tooltip slot.
 */
export function useTooltipSlot<State extends React.HTMLAttributes<HTMLElement> & WithTooltipSlot>(state: State);
```

#### useTooltipRef

The `useTooltipRef` hook creates a ref function that adds native event listeners to any element.

```typescript
/**
 * Create a ref that, when attached to an element, shows the tooltip on hover or focus.
 *
 * @param tooltip The tooltip to display on hover or focus. Can be a string, JSX element tree, or TooltipSlotProps.
 */
export function useTooltipRef(tooltip: ShorthandProps<TooltipSlotProps>);
```

### @fluentui/react-tooltip

The `react-tooltip` package contains the bulk of the implementation of tooltips, including rendering, styling, positioning, etc. This will be a larger package, but can be lazy-loaded and doesn't need to be included in an app's bundle directly.

#### Tooltip

`Tooltip` renders the tooltip itself when it is visible.

Most of the tooltip's props are defined in the `TooltipComponentProps` interface, which is defined in the `react-tooltip-provider` package below.

```typescript
import { TooltipSlotProps } from '@fluentui/react-tooltip-provider';

/**
 * Props for the Tooltip component.
 *
 * Note: Most props are defined in the TooltipSlotProps interface.
 */
export interface TooltipProps extends TooltipSlotProps, React.HTMLAttributes<HTMLElement> {
  /**
   * The element that this Tooltip should point to.
   */
  targetRef?: React.RefObject<HTMLElement | null>;

  /**
   * The arrow that points to the target element.
   */
  arrow?: ShorthandProps<React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>;
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

#### TooltipManager

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

export interface TooltipManagerState extends TooltipManagerProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;

  /**
   * The Tooltip being rendered, if any.
   */
  tooltip?: ObjectShorthandProps<TooltipProps>;
}
```

## Structure

- _**Public**_
- _**Internal**_
- _**DOM** - how the component will be rendered as HTML elements_

## Migration

_Describe what will need to be done to upgrade from the existing implementations:_

- _Migration from v8_
- _Migration from v0_

## Behaviors

_Explain how the component will behave in use, including:_

- _Component States_
- _Interaction_
  - _Keyboard_
  - _Cursor_
  - _Touch_
  - _Screen readers_

## Accessibility

Base accessibility information is included in the design document. After the spec is filled and review, outcomes from it need to be communicated to design and incorporated in the design document.

- Decide whether to use **native element** or folow **ARIA** and provide reasons
- Identify the **[ARIA](https://www.w3.org/TR/wai-aria-practices-1.2/) pattern** and, if the component is listed there, follow its specification as possible.
- Identify accessibility **variants**, the `role` ([ARIA roles](https://www.w3.org/TR/wai-aria-1.1/#role_definitions)) of the component, its `slots` and `aria-*` props.
- Describe the **keyboard navigation**: Tab Oder and Arrow Key Navigation. Describe any other keyboard **shortcuts** used
- Specify texts for **state change announcements** - [ARIA live regions
  ](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) (number of available items in dropdown, error messages, confirmations, ...)
- Identify UI parts that appear on **hover or focus** and specify keyboard and screen reader interaction with them
- List cases when **focus** needs to be **trapped** in sections of the UI (for dialogs and popups or for hierarchical navigation)
- List cases when **focus** needs to be **moved programatically** (if parts of the UI are appearing/disappearing or other cases)

```

```
