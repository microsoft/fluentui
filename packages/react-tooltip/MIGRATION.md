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
  - `directionalHint` => `position` and `align`
    - `DirectionalHint.topLeftEdge` => `position="above" align="start"`
    - `DirectionalHint.topCenter` => `position="above"`
    - `DirectionalHint.topRightEdge` => `position="above" align="end"`
    - `DirectionalHint.topAutoEdge` => Not supported
    - `DirectionalHint.bottomLeftEdge` => `position="below" align="start"`
    - `DirectionalHint.bottomCenter` => `position="below"`
    - `DirectionalHint.bottomRightEdge` => `position="below" align="end"`
    - `DirectionalHint.bottomAutoEdge` => Not supported
    - `DirectionalHint.leftTopEdge` => `position="before" align="top"`
    - `DirectionalHint.leftCenter` => `position="before"`
    - `DirectionalHint.leftBottomEdge` => `position="before" align="bottom"`
    - `DirectionalHint.rightTopEdge` => `position="after" align="top"`
    - `DirectionalHint.rightCenter` => `position="after"`
    - `DirectionalHint.rightBottomEdge` => `position="after" align="bottom"`
  - `directionalHintForRTL` => Automatic based on whether the element is in an RTL context
  - `maxWidth` => Add styling to the tooltip slot of the TooltipTrigger: `tooltip={{ style:{ maxWidth: ... } children: 'Tooltip Content'}}`
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
  - `position` => `position`
  - `align` => `align`
  - `positionFixed` => Not supported
  - `target` => `targetRef`
  - `trigger` => The child of the `TooltipTrigger`.
