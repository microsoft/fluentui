# Tooltip Migration

## STATUS: WIP 🚧

This Migration guide is a work in progress and is not yet ready for use.

## Migration from v8

The converged API does not support many of the custom features of the v8 tooltip. We may need to revisit and add additional features to the converged Tooltip if needed.

- `Tooltip`
  - `calloutProps` => Not supported. The arrow's visibility can be controlled using `noArrow`.
  - `componentRef` => Not supported. The tooltip can't be manually invoked.
  - `content="..."` => Either a component's `tooltip="..."` prop or the Tooltip's `children` prop.
  - `delay` => `showDelay`
  - `directionalHint` => `placement`
    - `DirectionalHint.topLeftEdge` => `placement="above-start"`
    - `DirectionalHint.topCenter` => `placement="above"`
    - `DirectionalHint.topRightEdge` => `placement="above-end"`
    - `DirectionalHint.topAutoEdge` => Not supported
    - `DirectionalHint.bottomLeftEdge` => `placement="below-start"`
    - `DirectionalHint.bottomCenter` => `placement="below"`
    - `DirectionalHint.bottomRightEdge` => `placement="below-end"`
    - `DirectionalHint.bottomAutoEdge` => Not supported
    - `DirectionalHint.leftTopEdge` => `placement="before-top"`
    - `DirectionalHint.leftCenter` => `placement="before"`
    - `DirectionalHint.leftBottomEdge` => `placement="before-bottom"`
    - `DirectionalHint.rightTopEdge` => `placement="after-top"`
    - `DirectionalHint.rightCenter` => `placement="after"`
    - `DirectionalHint.rightBottomEdge` => `placement="after-bottom"`
  - `directionalHintForRTL` => Automatic based on whether the element is in an RTL context
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
  - `align` => `placement`
  - `positionFixed` => Not supported
  - `target` => `targetElement`
  - `trigger` => The component that has the `tooltip="..."` prop set, or the element that has the ref from `useTooltipRef` attached.
