### Layout

- Use the sticky component on block-level elements.
- Sticky components should ideally be section headers and/or footers.
- Use `position: absolute`. Ensure that the parent element has an explicit `height` and `position: relative`, or has space already allocated for the scrollable pane.
- Ensure that the total height of `Sticky` components does not exceed the height of the `ScrollablePane`.

### Accessibility

This component renders a duplicate copy of the sticky content on scroll, which creates hidden tab stops if the sticky container has focusable items. Using this component with highly interactive controls is not recommended. The DetailsList example shows how to create a fixed header and footer on a DetailsList without using `ScrollablePane` as an alternative with better accessibility.

To ensure `ScrollablePane` can be scrolled with the keyboard, do the following:

- If the scrollable region will not contain any focusable children, set `scrollContainerFocus` to true to enable keyboard scrolling.
- If you set `scrollContainerFocus` to true, setting `scrollContainerAriaLabel` to something short but meaningful helps screen reader users who tab to the now-focusable container.
