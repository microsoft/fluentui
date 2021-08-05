# Tooltip Migration

## STATUS: WIP 🚧

This Migration guide is a work in progress and is not yet ready for use.

## Migration from v8

The converged API does not support many of the custom features of the v8 tooltip. We may need to revisit and add additional features to the converged Tooltip if needed.

- `Tooltip`
  - `calloutProps` => Not supported. The arrow's visibility can be controlled using `noArrow`.
  - `componentRef` => `componentRef`
  - `delay` => `showDelay` on the TooltipTrigger
  - `directionalHint` => `position` and `align`
    - `topLeftEdge` => `position: 'above', align: 'start'`
    - `topCenter` => `position: 'above'`
    - `topRightEdge` => `position: 'above', align: 'end'`
    - `topAutoEdge` => Not supported
    - `bottomLeftEdge` => `position: 'below', align: 'start'`
    - `bottomCenter` => `position: 'below'`
    - `bottomRightEdge` => `position: 'below', align: 'end'`
    - `bottomAutoEdge` => Not supported
    - `leftTopEdge` => `position: 'before', align: 'top'`
    - `leftCenter` => `position: 'before'`
    - `leftBottomEdge` => `position: 'before', align: 'bottom'`
    - `rightTopEdge` => `position: 'after', align: 'top'`
    - `rightCenter` => `position: 'after'`
    - `rightBottomEdge` => `position: 'after', align: 'bottom'`
  - `directionalHintForRTL` => Automatic based on whether the element is in an RTL context
  - `maxWidth` => Add styling to the Tooltip: `tooltip={{ style: { maxWidth: ... }, children: 'Tooltip Content' }}`
  - `onRenderContent` => Set the Tooltip's `children` to a custom render function
- `TooltipHost` => `TooltipTrigger`
  - `calloutProps` => Not supported
  - `closeDelay` => `hideDelay`
  - `hostClassName` => Not needed because there is no element rendered by TooltipTrigger
  - `onTooltipToggle` => Not supported
  - `overflowMode` => `onlyIfTruncated`
    - `TooltipOverflowMode.self` => `onlyIfTruncated="true"`
    - `TooltipOverflowMode.parent` => `onlyIfTruncated="true"` and set `targetRef` to the parent element

## Migration from v0

- `Tooltip` => `TooltipTrigger`
  - `content="..."` => `tooltip="..."`
  - `defaultOpen` => Not supported
  - `flipBoundary` => Not supported
  - `mountNode` => Unknown
  - `mouseLeaveDelay` => `hideDelay`
  - `offset` => `offset`
  - `onOpenChange` => Not supported
  - `open` => Not supported
  - `overflowBoundary` => Not supported
  - `pointing={false}` => `noArrow={true}`
  - `popperRef` => Not supported
  - `position` => `position`
  - `align` => `align`
  - `positionFixed` => Not supported
  - `target` => `targetRef`
  - `trigger` => The child of the `TooltipTrigger`
