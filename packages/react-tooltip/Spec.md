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

To attach a tooltip to an element, wrap it with a `TooltipTrigger`. There is a `tooltip` shorthand slot for the content of the tooltip itself. It doesn't create any DOM nodes of its own (it does _not_ wrap the element with a `<div>` for example). Instead, it attaches listeners to the child by cloning the JSX object and adding `onPointerDown`, etc. events.

TooltipTrigger only supports a single child element, which can be either:

- A native element or component that supports DOM attributes (the child can't be a string, for example).
- A render function that takes the extra props to be added to the trigger element.

```tsx
<TooltipTrigger tooltip="Example Tooltip">
  <a href="http://example.com">
    A link with a tooltip
  </a>
</TooltipTrigger>

<TooltipTrigger tooltip="Label for an icon button" type="label">
  <button href="http://example.com">
    <SomeIcon />
  </button>
</TooltipTrigger>

<TooltipTrigger tooltip={{<>This supports <b>third party</b> components</>}}>
  <ThirdPartyComponent />
</TooltipTrigger>

<TooltipTrigger tooltip="The child can be a render function" placement="before" align="top" subtle showDelay={200}>
  {triggerProps => (
    <>
      <div>
        <button {...triggerProps}>The trigger element</button>
      </div>
    </>
  )}
</TooltipTrigger>

<TooltipTrigger tooltip="It can target an element other than its trigger" targetRef={targetRef}>
  <button>
    Custom target:{' '}
    <div ref={targetRef} style={{ display: 'inline-block', width: '8px', height: '8px', background: 'red' }} />
  </button>
</TooltipTrigger>
```

# Variants

- The tooltip can have a `subtle` style variant with a different background and text color.
- The tooltip can have render without an arrow pointing to the target element by using `noArrow`.

# API

The Tooltip API is split among several components and hooks, in two packages. Having two packages allows the lightweight `react-tooltip-trigger` package to be referenced by any component, while the bulk of the code for tooltip positioning and management lives in the larger `react-tooltip` package.

- [**@fluentui/react-tooltip-trigger**](#fluentuireact-tooltip-trigger)
  - [`TooltipProps`](#tooltipprops)
  - [`TooltipImperativeHandle`](#tooltipimperativehandle)
  - [`TooltipManager`](#tooltipmanager)
  - [`useTooltipContext`](#usetooltipcontext)
  - [`TooltipTrigger`](#tooltiptrigger)
- [**@fluentui/react-tooltip**](#fluentuireact-tooltip)
  - [`Tooltip`](#tooltip)
  - [`TooltipProvider`](#tooltipprovider)

_A note about the terminology used for the elements that the tooltip is attached to:_

- _The **trigger** is the element that causes the tooltip to open._
- _The **target** is the element that the tooltip is anchored to (and the arrow points to)._
- _Almost always, these will both be the same element, but it is possible to specify them separately, so the tooltip can show up adjacent to a different element than the one that triggered it._

## @fluentui/react-tooltip-trigger

`react-tooltip-trigger` is a lightweight package that allows any component to add a tooltip without taking a dependency on the full `react-tooltip` package. It provides the basic functionality to render the tooltip; but it will only work if the `TooltipProvider` context is present.

### TooltipProps

The `TooltipProps` interface is defined in `react-tooltip-trigger` so that components can specify the details of the tooltip without needing the full `react-tooltip` package.

```ts
export interface TooltipProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * How to position the tooltip relative to the target element. This is a "best effort" placement,
   * but the tooltip may be flipped to the other side if there is not enough room.
   *
   * @defaultvalue above
   */
  position?: 'above' | 'below' | 'before' | 'after';

  /**
   * How to align the tooltip along the edge of the target element.
   *
   * @defaultvalue center
   */
  align?: 'top' | 'bottom' | 'start' | 'end' | 'center';

  /**
   * Color variant with a subtle look
   */
  subtle?: boolean;

  /**
   * Do not render an arrow pointing to the target element
   */
  noArrow?: boolean;

  /**
   * Distance between the tooltip and the target element, in pixels
   *
   * @defaultvalue 4
   */
  offset?: number;

  /**
   * The arrow that points to the target element. This will be rendered by default unless `noArrow` is specified.
   */
  arrow?: ShorthandProps<React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>;

  /**
   * Imperative handle to show and hide the tooltip
   */
  componentRef?: React.Ref<TooltipImperativeHandle>;
}
```

### TooltipImperativeHandle

The `TooltipImperativeHandle` is the imperative API used by `TooltipManager` to show and hide the tooltip.

```ts
export interface TooltipImperativeHandle {
  /**
   * Show the tooltip, pointing to the target element
   */
  show: (target: HTMLElement) => void;

  /**
   * Hide the tooltip
   */
  hide: () => void;

  /**
   * Get the root element of the tooltip
   */
  getRoot: () => HTMLElement;
}
```

### TooltipManager

The `TooltipManager` is responsible for managing the visibiltiy of the tooltips, including ensuring that only one tooltip is visible at once, and handling the delay to show or hide a tooltip.

This imperative interface is implemented by `TooltipProvider`, and used by `TooltipTrigger` to show and hide its tooltip based on events on the trigger element.

```ts
/**
 * The tooltip manager is responsible for managing the visibiltiy of the tooltips,
 * including ensuring that only one tooltip is visible at once, and handling the
 * delay to show or hide a tooltip.
 *
 * This imperative interface is used by TooltipTrigger to show and hide its tooltip
 * based on events on the trigger element.
 *
 * {@docCategory TooltipProvider}
 */
export interface TooltipManager {
  showTooltip: (args: ShowTooltipArgs, reason: TooltipTriggerReason) => void;
  hideTooltip: (trigger: HTMLElement, reason: TooltipTriggerReason) => void;

  hideAll: () => void;

  onPointerEnterTooltip: (tooltipRoot: HTMLElement) => void;
  onPointerLeaveTooltip: (tooltipRoot: HTMLElement) => void;
}

/**
 * The arguments to TooltipManager.showTooltip
 *
 * {@docCategory TooltipProvider}
 */
export type ShowTooltipArgs = {
  tooltip: TooltipImperativeHandle;
  trigger: HTMLElement;
  target: HTMLElement;
  showDelay: number;
  hideDelay: number;
  onlyIfTruncated?: boolean;
};

/**
 * The source of the event that caused the tooltip to be shown or hidden
 *
 * {@docCategory TooltipProvider}
 */
export type TooltipTriggerReason = 'focus' | 'pointer';
```

### useTooltipContext

The tooltip hooks get the actual implementation of the TooltipManagerApi and Tooltip renderer via React context. By default this is `undefined`, and requires a `TooltipProvider` to provide the actual implementations.

```ts
export type TooltipContext = {
  Tooltip: React.FC<TooltipProps & React.RefAttributes<HTMLElement>>;
  manager: TooltipManager | undefined;
  portalRoot: HTMLElement;
};

export const internal__TooltipContext = React.createContext<TooltipContext>({
  // These default values are replaced by TooltipProvider
  Tooltip: () => null,
  manager: undefined,
  portalRoot: document.body,
});

export const useTooltipContext = () => React.useContext(internal__TooltipContext);
```

### TooltipTrigger

`TooltipTrigger` allows tooltips to be added to any focusable component that doesn't have its own `tooltip` prop. It supports a single JSX child, and works by cloning the JSX element in order to add the same `onPointerDown`, etc. listeners that are added by `useTooltipSlot`.

```ts
/**
 * {@docCategory TooltipTrigger}
 */
export interface TooltipTriggerProps
  extends Pick<TooltipProps, 'position' | 'align' | 'subtle' | 'noArrow' | 'offset'> {
  /**
   * The child of TooltipTrigger is the element that triggers the tooltip. It will
   * have additional properties added, including events and aria properties.
   * Alternatively, children can be a render function that takes the props and adds
   * them to the appropriate elements.
   */
  children:
    | React.ReactElement<React.HTMLAttributes<HTMLElement>>
    | ((props: TooltipTriggerChildProps) => React.ReactNode);

  /**
   * The content of the tooltip.
   */
  tooltip: ShorthandProps<TooltipProps>;

  /**
   * Determines whether the tooltip is being used as the trigger's label or description.
   * This determines whether to set aria-describedby or aria-labelledby on the trigger element.
   *
   * @defaultvalue description
   */
  type?: 'description' | 'label';

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
   * A ref to an element that the tooltip should be anchored to.
   *
   * If not specified, the tooltip will point to the same element that triggered it, which is the common use case.
   */
  targetRef?: React.RefObject<HTMLElement>;
}

/**
 * The props that are added to the child of the TooltipTrigger
 */
export type TooltipTriggerChildProps = Pick<
  React.HTMLAttributes<HTMLElement>,
  'onPointerEnter' | 'onPointerLeave' | 'onFocus' | 'onBlur' | 'aria-describedby' | 'aria-labelledby'
>;

/**
 * Names of the shorthand properties in TooltipTriggerProps
 * {@docCategory TooltipTrigger}
 */
export type TooltipTriggerShorthandProps = typeof tooltipTriggerShorthandProps[number];

/**
 * Names of TooltipTriggerProps that have a default value in useTooltipTrigger
 * {@docCategory TooltipTrigger}
 */
export type TooltipTriggerDefaultedProps = 'showDelay' | 'hideDelay';

/**
 * {@docCategory TooltipTrigger}
 */
export type TooltipTriggerState = RequiredProps<
  ResolvedShorthandProps<
    TooltipTriggerProps & {
      manager: TooltipManager | undefined;
      portalRoot: HTMLElement;
      tooltipRef: React.MutableRefObject<TooltipImperativeHandle | null>;
    },
    TooltipTriggerShorthandProps
  >,
  TooltipTriggerDefaultedProps
```

## @fluentui/react-tooltip

The `react-tooltip` package contains the bulk of the implementation of tooltips, including rendering, styling, positioning, lifetime management, etc.

### Tooltip

`Tooltip` renders the tooltip content itself, and the arrow that points to the target element. The tooltip renders in a React portal to avoid clipping.

The `TooltipProps` interface is defined in the `react-tooltip-trigger` package.

```ts
import { TooltipProps } from '@fluentui/react-tooltip-trigger';

export { TooltipProps };

/**
 * Names of the shorthand properties in TooltipProps
 * {@docCategory Tooltip}
 */
export type TooltipShorthandProps = 'arrow';

/**
 * Names of TooltipProps that have a default value in useTooltip
 * {@docCategory Tooltip}
 */
export type TooltipDefaultedProps = 'position' | 'align' | 'offset';

/**
 * {@docCategory Tooltip}
 */
export type TooltipState = ComponentState<
  React.Ref<HTMLElement>,
  TooltipProps & {
    visible: boolean;
  },
  TooltipShorthandProps,
  TooltipDefaultedProps
>;
```

### TooltipProvider

`TooltipProvider` is responsible for providing the actual implementation of `TooltipManager` and `Tooltip`. It uses a React context to that contains those when it is included in the tree. This context will also be included into `FluentContext`.

```ts
export interface TooltipProviderProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  // TooltipProvider has no additional props
}

export type TooltipProviderState = ComponentState<
  React.RefObject<HTMLElement>,
  TooltipProviderProps & {
    manager: TooltipManager;
    portalRoot: HTMLElement;
  }
>;
```

# Structure

## Public

```tsx
<TooltipProvider>
  <TooltipTrigger tooltip="Example tooltip">
    <a href="http://example.com">...</a>
  </TooltipTrigger>
  <TooltipTrigger tooltip="Button with a tooltip for a label" type="label">
    <button>...</button>
  </TooltipTrigger>
</TooltipProvider>
```

## DOM

In this example, the mouse is hovering over the first tooltip in the example above

```tsx
<body>
  <div {/* TooltipProvider */}>
    <a href="http://example.com" aria-describedby="tooltip-1" onPointerEnter={...} onPointerLeave={...} onFocus={...} onBlur={...}>...</a>
    <button aria-labelledby="tooltip-2" onPointerEnter={...} onPointerLeave={...} onFocus={...} onBlur={...}>...</button>

    <div {/* Tooltip portal */}>
      <div role="tooltip" id="tooltip-1" {/* Tooltip */}>
        <div {/* Arrow */} />
        Example tooltip
      </div>
      <div role="tooltip" id="tooltip-2" class="... (display: none) ..." {/* Tooltip */}>
        <div {/* Arrow */} />
        Button with a tooltip for a label
      </div>
    </div>
  </div>
</body>
```

## Internal

`TooltipProvider`:

```tsx
<internal__TooltipContext.Provider
  value={{
    manager: state.manager,
    portalRoot: state.portalRoot,
    Tooltip,
  }}
>
  {children}
  <slots.root {...rootProps} />
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

Transparently renders children, without any wrapper element. Also renders the `Tooltip` itself in a portal provided by the `TooltipProvider`

```tsx
<>
  {state.children}
  {ReactDOM.createPortal(<slots.tooltip {...slotProps.tooltip} />, state.portalRoot)}
</>
```

# Migration

See MIGRATION.md.

# Behaviors

- Visibility

  - There is only ever one tooltip visible at once.
  - The tooltip shows 250ms (by default) after the trigger element receives either mouse/pointer hover or keyboard focus, with the following exceptions:
    - If another tooltip is currently visible, the new tooltip will immediately replace the old one without any delay.
    - If `onlyIfTruncated` is true, then the tooltip will only show if the target element's content is overflowing.
  - The tooltip hides 250ms (by default) after the trigger element loses focus, with the following exceptions:
    - The tooltip will not hide if the pointer is hovering on the tooltip itself
    - If the tooltip was triggered by getting focus, then moving the mouse out of the element won't hide it (it'll hide when the element loses focus, or another tooltip is triggered).
  - The tooltip hides immediately when the user presses Esc.

- Placement

  - The tooltip is placed relative to its target element, based on the `position` and `align` properties.
  - The placement is handled by the react-positioning package, which uses PopperJS.

- Focus

  - Content within the tooltip is not focusable, and can't be interacted with directly by keyboard or mouse.

- Screen readers

  - The tooltip is connected to the trigger element using `aria-describedby`, which should result in the screen reader reading the tooltip when shown.

# Accessibility

- ARIA design pattern: [Tooltip Widget](https://www.w3.org/TR/wai-aria-practices-1.2/#tooltip)
- The Tooltip root element will have `role="tooltip"`
- Every tooltip will always be rendered in the DOM; though they will be hidden (including `aria-hidden="true"`) except for the one currently being shown, if any.
- The trigger element (child of the `TooltipTrigger`) will have `aria-describedby` or `aria-labelledby` set to the tooltip element's ID. The ID will be generated automatically if not supplied.
- The Tooltip itself can never receive focus.
- The Tooltip should never contain focusable elements.
