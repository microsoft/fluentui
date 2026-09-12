Headless Fluent components that make use of positioning can all be configured in the same way. In this preview package, positioning currently applies to Combobox, Dropdown, Menu, Popover, TagPicker, and Tooltip.

Components that have slots which are positioned will always expose a `positioning` prop where the positioning of the slot can be configured.

Below you can try out the different positioning options in the playground. Further examples try to explain more clearly different configuration options for the `positioning` prop.

## Native first, compatible when needed

Positioning uses native CSS Anchor Positioning by default in browsers that support it. The browser handles layout, scrolling, resizing, and fallback placement without loading a JavaScript positioning engine.

The floating-ui implementation is loaded lazily when CSS Anchor Positioning is unavailable or when a configuration needs runtime measurement or custom collision handling. These options select the fallback automatically:

- `autoSize`
- callback `offset` values
- `flipBoundary`
- `overflowBoundary` and `overflowBoundaryPadding`
- `useTransform: true`
- `arrowPadding`
- `onPositioningEnd`
- `disableUpdateOnResize`
- `shiftToCoverTarget`
- virtual targets supplied through `target` or `positioningRef.setTarget()`

The public API is the same on both paths; no manual feature detection is required.
