`autoSize` constrains the surface to the space available around its anchor, so a surface with more content than the viewport can hold scrolls instead of being clipped.

The constraint is derived from the anchor and the viewport — never from the surface's own size. That is what lets the browser still flip to the roomier side: the surface is never pre-shrunk onto the side it was asked for.

Use `true` (or `'always'`) for both axes, `'height'` for the block axis, `'width'` for the inline axis.

Give the surface `box-sizing: border-box`. `max-block-size` constrains the content box, and the UA stylesheet for `[popover]` adds a border and padding on top of it.
