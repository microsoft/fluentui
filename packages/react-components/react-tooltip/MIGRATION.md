# Tooltip Migration

## STATUS: WIP 🚧

This Migration guide is a work in progress and is not yet ready for use.

## Migration from v8

TooltipHost is replaced by Tooltip itself, as the wrapper around the element that should receive a tooltip.

- `Tooltip`
  - `calloutProps`
    - `isBeakVisible` => `withArrow`
    - `beakWidth` => Not supported.
    - `gapSpace` => Not supported.
    - `doNotLayer` => Not supported. Tooltips are always layered by rendering in a Portal.
    - `setInitialFocus` => Not supported. Tooltips can't be focused, by design.
  - `componentRef` => Not supported. Tooltips can be controlled declaratively with props like `visible`, instead of using an imperative API like `componentRef`.
  - `delay` => `showDelay`
  - `directionalHint` => `positioning`
    - `topLeftEdge` => `positioning="above-start"`
    - `topCenter` => `positioning="above"`
    - `topRightEdge` => `positioning="above-end"`
    - `topAutoEdge` => Not supported
    - `bottomLeftEdge` => `positioning="below-start"`
    - `bottomCenter` => `positioning="below"`
    - `bottomRightEdge` => `positioning="below-end"`
    - `bottomAutoEdge` => Not supported
    - `leftTopEdge` => `positioning="before-top"`
    - `leftCenter` => `positioning="before"`
    - `leftBottomEdge` => `positioning="before-bottom"`
    - `rightTopEdge` => `positioning="after-top"`
    - `rightCenter` => `positioning="after"`
    - `rightBottomEdge` => `positioning="after-bottom"`
  - `directionalHintForRTL` => Automatic based on whether the element is in an RTL context according to `FluentProvider`.
  - `maxWidth` => Supported only through CSS styling of the `content` slot.
  - `onRenderContent` => Set the `content` slot to a custom render function.
- `TooltipHost` => The tooltip itself is the "host".
  - `closeDelay` => `hideDelay`
  - `hostClassName` => Not needed because there is no element rendered inline by Tooltip
  - `onTooltipToggle` => `onVisibleChange`
  - `overflowMode` => Not supported. If this behavior is needed, the tooltip's visibility can be controlled using the `visible` prop and `onVisibleChange` event.

## Migration from v0

The v9 Tooltip swaps the meaning of children between content and trigger. In v0, Tooltip's children is the tooltip content, and its trigger is a prop. In v9, that is swapped: Tooltip's children is the trigger, and its content is a prop.

- `Tooltip`
  - children => `content`
  - `trigger` => children
  - `defaultOpen` => Not supported. The tooltip's visibility can be controlled using the `visible` prop and `onVisibleChange` event.
  - `mountNode` => Not supported
  - `open` => `visible`
  - `onOpenChange` => `onVisibleChange`
  - `pointing` => `withArrow`
  - `mouseEnterDelay` => `showDelay`
  - `mouseLeaveDelay` => `hideDelay`
  - `subtle={true}` = `appearance="normal"` (default)
  - `subtle={false}` => `appearance="inverted"`
  - Positioning props are now attributes of the `positioning` prop:
    - `flipBoundary` => `positioning.flipBoundary`
    - `offset` => `positioning.offset`
    - `overflowBoundary` => `positioning.overflowBoundary`
    - `popperRef` => `positioning.popperRef`
    - `position` => `positioning.position`
    - `align` => `positioning.align`
    - `positionFixed` => `positioning.positionFixed`
    - `target` => `positioning.target`
