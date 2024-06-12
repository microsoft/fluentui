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

Label tooltip for an icon-only button:

```tsx
<Tooltip content="Copy" relationship="label">
  <Button icon={<CopyRegular />} />
</Tooltip>
```

Description tooltip for a link:

```tsx
<Tooltip content="This is an example" relationship="description">
  <a href="http://example.com">A link</a>
</Tooltip>
```

Tooltip with custom JSX content:

```tsx
<Tooltip content={<b>The content can be JSX</b>} relationship="label">
  <Button />
</Tooltip>
```

Custom component as a trigger:

```tsx
<Tooltip content="Supports any component that accepts HTML attributes" relationship="label">
  <FancyButton />
</Tooltip>
```

Render function for the trigger:

```tsx
<Tooltip content="The child can be a render function" relationship="description">
  {triggerProps => (
    <>
      <div>
        <button {...triggerProps}>The trigger element</button>
      </div>
    </>
  )}
</Tooltip>
```

```tsx
<Tooltip
  content="It can target an element other than its trigger"
  relationship="description"
  positioning={{ target: targetElement }}
>
  <button>
    Custom target: <div ref={setTargetElement} />
  </button>
</Tooltip>
```

# Variants

- The tooltip supports higher contrast colors with `appearance="inverted"`.
- The tooltip supports rendering an arrow pointing to the target element, using `withArrow`.

# API

To attach a tooltip to an element, wrap it with a `Tooltip`. There is a `content` slot for the text of the tooltip itself.

Unlike most components, Tooltip doesn't have a root slot and doesn't allow native DOM props on the Tooltip itself. This is because it doesn't render any nodes inline around its trigger (it does _not_ wrap the element with a `<div>` for example). Instead, it attaches listeners to the child by cloning the JSX object and adding `onPointerEnter`, etc. listeners.

Tooltip only supports a single child element, which can be either:

- A native element or component that supports DOM attributes (the child can't be a string, for example).
- A render function that takes the extra props to be added to the trigger element.
- It is allowed to have a tooltip without a child (trigger) element, in which case it _must_ have a target set via the `positioning` prop, and its visibility must be controlled with the `visible` prop.

_A note about the terminology used for the elements that the tooltip is attached to:_

- _The **trigger** is the element that causes the tooltip to open._
- _The **target** is the element that the tooltip is anchored to (and the arrow points to)._
- _Almost always, these will both be the same element, but it is possible to specify them separately, so the tooltip can show up adjacent to a different element than the one that triggered it._

## Types

### `Tooltip`

From [Tooltip.types.tsx](https://github.com/microsoft/fluentui/blob/master/packages/react-tooltip/src/components/Tooltip/Tooltip.types.tsx) in `@fluentui/react-tooltip`:

```ts
/**
 * Slot properties for Tooltip
 */
export type TooltipSlots = {
  /**
   * The text or JSX content of the tooltip.
   */
  content: NonNullable<Slot<'div'>>;
};

/**
 * Properties for Tooltip
 */
export type TooltipProps = ComponentProps<TooltipSlots> & {
  /**
   * (Required) Specifies whether this tooltip is acting as the description or label of its trigger element.
   *
   * * `label` - The tooltip sets the trigger's aria-label or aria-labelledby attribute. This is useful for buttons
   *    displaying only an icon, for example.
   * * `description` - The tooltip sets the trigger's aria-description or aria-describedby attribute.
   * * `inaccessible` - No aria attributes are set on the trigger. This makes the tooltip's content inaccessible to
   *   screen readers, and should only be used if the tooltip's text is available by some other means.
   */
  relationship: 'label' | 'description' | 'inaccessible';

  /**
   * The tooltip can have a single JSX child, or a render function that accepts TooltipTriggerProps.
   *
   * If no child is provided, the tooltip's target must be set with the `positioning` prop, and its
   * visibility must be controlled with the `visible` prop.
   */
  children?:
    | (React.ReactElement & { ref?: React.Ref<unknown> })
    | ((props: TooltipTriggerProps) => React.ReactElement | null)
    | null;

  /**
   * The tooltip's visual appearance.
   * * `normal` - Uses the theme's background and text colors.
   * * `inverted` - Higher contrast variant that uses the theme's inverted colors.
   *
   * @defaultvalue normal
   */
  appearance?: 'normal' | 'inverted';

  /**
   * Render an arrow pointing to the target element
   *
   * @defaultvalue false
   */
  withArrow?: boolean;

  /**
   * Configure the positioning of the tooltip
   *
   * @defaultvalue above
   */
  positioning?: PositioningShorthand;

  /**
   * Control the tooltip's visibility programatically.
   *
   * This can be used in conjunction with onVisibleChange to modify the tooltip's show and hide behavior.
   *
   * If not provided, the visibility will be controlled by the tooltip itself, based on hover and focus events on the
   * trigger (child) element.
   */
  visible?: boolean;

  /**
   * Notification when the visibility of the tooltip is changing
   */
  onVisibleChange?: (
    event: React.PointerEvent<HTMLElement> | React.FocusEvent<HTMLElement> | undefined,
    data: OnVisibleChangeData,
  ) => void;

  /**
   * Delay before the tooltip is shown, in milliseconds.
   *
   * @defaultvalue 250
   */
  showDelay?: number;

  /**
   * Delay before the tooltip is hidden, in milliseconds.
   *
   * @defaultvalue 250
   */
  hideDelay?: number;
};

/**
 * The properties that are added to the trigger of the Tooltip
 */
export type TooltipTriggerProps = {
  ref?: React.Ref<never>;
} & Pick<
  React.HTMLAttributes<HTMLElement>,
  'onPointerEnter' | 'onPointerLeave' | 'onFocus' | 'onBlur' | 'aria-describedby' | 'aria-labelledby' | 'aria-label'
>;

/**
 * Data for the Tooltip's onVisibleChange event.
 */
export type OnVisibleChangeData = {
  visible: boolean;
};
```

### `TooltipContext`

The context is included at the app root on `FluentProvider` and is used by `Tooltip` to ensure that only one is visible at once.

From [TooltipContext.ts](https://github.com/microsoft/fluentui/blob/master/packages/react-shared-contexts/src/TooltipContext/TooltipContext.ts) in `@fluentui/react-shared-contexts`:

```ts
/**
 * The context provided by TooltipProvider
 */
export type TooltipContextType = {
  /**
   * When a tooltip is shown, it sets itself as the visibleTooltip.
   * The next tooltip to become visible can use it to hide the previous tooltip immediately.
   */
  visibleTooltip?: {
    hide: () => void;
  };
};

/**
 * Context shared by all of the tooltips in the app
 */
export const TooltipContext = React.createContext<TooltipContextType>({});
```

# Structure

## Tooltip as a label

### JSX tree

```tsx
<Tooltip content="Example" relationship="label">
  <button>
    <svg>...</svg>
  </button>
</Tooltip>
```

### DOM

Tooltip with `relationship="label"` is not rendered when it is not visible. Its content is used as the `aria-label` of the control. The Tooltip will be rendered once it is visible; see the next example for what the DOM structure looks like in that case.

```html
<body>
  <!-- App root -->
  <div>
    <button aria-label="Example" onPointerEnter="{...}" onPointerLeave="{...}" onFocus="{...}" onBlur="{...}">
      <svg>...</svg>
    </button>
  </div>
</body>
```

## Tooltip as a description

### JSX tree

```tsx
<Tooltip content="Example description of the button" relationship="description" withArrow>
  <button>The Button</button>
</Tooltip>
```

### DOM

Tooltip with `relationship="description"` is always rendered because it's used as the `aria-describedby` of the control, which always has to point to a valid DOM element even if it's not visible.

```html
<body>
  <!-- App root -->
  <div>
    <button aria-describedby="tooltip-2" onPointerEnter="{...}" onPointerLeave="{...}" onFocus="{...}" onBlur="{...}">
      The Button
    </button>
  </div>

  <!-- Portal for Tooltip -->
  <div>
    <div role="tooltip" id="tooltip-2" class="{tooltip}">
      <div class="{arrow}"></div>
      Example description of the button
    </div>
  </div>
</body>
```

# Migration

See [MIGRATION.md](./MIGRATION.md).

# Behaviors

## Visibility

- The tooltip shows:
  - After `showDelay` (250ms default) from when the mouse/pointer enters the trigger.
  - After `showDelay` (250ms default) from when the trigger gets keyboard focus.
  - _Immediately_ (ignoring `showDelay`) if it is triggered while another tooltip is currently visible.
- The tooltip hides:
  - After `hideDelay` (250ms default) from when the mouse/pointer leaves BOTH the trigger AND the tooltip itself.
  - _Immediately_ when the trigger loses keyboard focus.
  - _Immediately_ when the ESC key is pressed.
  - _Immediately_ when another tooltip is shown.

There is only ever one tooltip visible at once (coordinated using `TooltipContext`). If another tooltip is triggered while there's one currently visible, the previous one hides and the new one shows immediately, without delay.

### Placement

The tooltip is placed relative to its target element based on the `positioning` prop. The placement is handled by the `@fluentui/react-positioning` package, which uses PopperJS.

### Focus

Content within the tooltip is not focusable, and can't be interacted with directly by keyboard or mouse.

# Accessibility

- ARIA design pattern: https://www.w3.org/TR/wai-aria-practices-1.2/#tooltip.
- The Tooltip content element has `role="tooltip"`.
- If Tooltip has `relationship="label"` with simple string content:
  - The content is set as the trigger's `aria-label`.
  - The tooltip is only rendered while it is visible.
- If Tooltip has `relationship="label"` with JSX content, OR `relationship="description"` (string or JSX):
  - The tooltip's ID is set as the trigger's `aria-labelledby` or `aria-describedby` (an ID is generated if not provided).
  - The tooltip is always rendered, even while hidden.
  - While hidden, the tooltip itself is styled with `display: none`.
- The Tooltip itself can never receive focus.
- The Tooltip should never contain focusable elements.
- The trigger for the Tooltip should be focusable.
