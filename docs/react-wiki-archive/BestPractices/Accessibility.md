This document describes our policies and methods for supporting accessibility.

## Colors

Default color choices should conform to contrast requirements as laid out in [WCAG 2.0](https://www.w3.org/TR/WCAG20/) level AA recommendations as laid out in section 1.4.3.

## High Contrast

We best support high contrast in Microsoft Edge and Internet Explorer 11. Mozilla Firefox is also supported to the extent possible barring technical constraints. Read on for more details.

The recommended approach is to use the semantically correct elements to match your scenario. For example, use a `<button>` element for a Button and not a `<div>`. Sometimes, you'll have to use a similar, but not exactly right, element. For example, when making a custom checkbox, you can wrap it in a `<button>` element. This will cause it to pick up the correct colors in all three supported browsers.

As a backup approach, high contrast-specific colors can be manually applied in CSS under the `-ms-high-constrast` media query. This approach should ONLY be used in complex scenarios which can't be represented by standard elements, since it only works in Microsoft Edge and Internet Explorer.

In this case, colors should be chosen only from the [system colors](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#System_Colors) palette, and only applied under the `-ms-high-constrast` media query. System colors should only be used under the media query (rather than unconditionally) because the actual corresponding colors are unlikely to match design specifications when high contrast is off.

Note that background images can disappear in high contrast mode. Any icons or images that are required for functionality must not be background images.

In high contrast mode, color should not be the only means of conveying feedback. A transparent border or outline will appear in high contrast mode, a useful way of denoting focus without affecting non-high contrast visual design.

## Screen Reader

Follow recommended guidelines using [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) to insure the best support for screen readers. Where necessary, add in extra text only visible to the screen reader for descriptions and directions, by positioning it off screen.

Our primary support scenario is Microsoft Edge with Windows Narrator.

## Keyboard and Focus

@todo
