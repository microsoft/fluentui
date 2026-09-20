## Accessibility

!! WARNING !!

The default colors of the checked state of a ToggleButton do not meet accessibility requirements for [not using color alone to indicate state](https://w3c.github.io/wcag/understanding/use-of-color.html).

In order to ensure a ToggleButton is accessible, use one of the following two strategies:

1. Include distinct icons for checked & unchecked states. This could be an empty space vs. check icon, or a filled vs. unfilled icon.
2. Use the boolean `isAccessible` prop to opt-in to an accessible, contrasting color change for the checked state.
