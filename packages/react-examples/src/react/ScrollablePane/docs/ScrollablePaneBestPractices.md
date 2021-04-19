### Layout

- Use the sticky component on block-level elements.
- Sticky components should ideally be section headers and/or footers.
- Use `position: absolute`. Ensure that the parent element has an explicit `height` and `position: relative`, or has space already allocated for the scrollable pane.
- Ensure that the total height of `Sticky` components does not exceed the height of the `ScrollablePane`.

### Accessibility

- If the scrollable region will not contain any focusable children, set `scrollContainerFocus` to true to enable keyboard scrolling.
- If you set `scrollContainerFocus` to true, setting `scrollContainerAriaLabel` to something short but meaningful helps screen reader users who tab to the now-focusable container.
