### Layout

- Use the sticky component on block-level elements.
- Sticky components should ideally be section headers and/or footers.
- Use `position: absolute`. Ensure that the parent element has an explicit `height` and `position: relative`, or has space already allocated for the scrollable pane.
- Ensure that the total height of `Sticky` components does not exceed the height of the `ScrollablePane`.
