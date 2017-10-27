# Accessibility

This document describes our policies and methods for supporting accessibility.

## Colors

Default color choices should conform to contrast requirements as laid out in [WCAG 2.0](https://www.w3.org/TR/WCAG20/) level AA recommendations as laid out in section 1.4.3.

## High Contrast

We best support high contrast in Internet Explorer 11 and Microsoft Edge. Mozilla FireFox is also supported to the extent possible barring technical constraints. Read on for more details.

The recommended approach here is to use the correct elements to match your scenario.
Sometimes, you'll have to use a similar, but not exactly right, element.
For example, when making a custom checkbox, you can wrap it in a `<button>` element.
This will cause it to pick up the correct colors in all three supported browsers.

As a backup approach, high contrast colors can be manually applied in CSS.
These colors should ONLY be from the [System Colors](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#System_Colors) palette.
The logic on when to apply these colors can vary, from using media queries (see below) or using code to detect when high contrast is on.

The last approach is to use media queries with `-ms-high-contrast` to scope styles to high contrast.
Since this only work in Internet Explorer and Microsoft Edge, it is not recommended as a general strategy.
We use this only where necessary, for complex scenarios such as multiselect.

Note that background images can disappear in high contrast mode. Any icons or images that are required for functionality must not be background images.

In high contrast mode, color should not be the only means of conveying feedback.
A transparent border or outline will appear in high contrast mode, a useful way of denoting focus without affecting non-high contrast visual design.

## Screen Reader

Follow recommended guidelines using [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) to insure the best support for screen readers.
Where necessary, add in extra text only visible to the screen reader for descriptions and directions, by positioning it off screen.

Our primary support scenario is Microsoft Edge with Windows Narrator.

## Keyboard and Focus

todo