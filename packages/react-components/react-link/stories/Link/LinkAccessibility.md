## Accessibility

A Link can be rendered with or without an underline, controlled by the `inline` prop. This has notable [accessibility implications](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), since Link relies on either an underline or contextual clues to differentiate itself from static text. It is the responsibility of the authoring team to choose the underline or no-underline variant based on their use case.

Links _must_ use underlines to be accessible except for the following use cases:

- The link exists in a visually discrete area with only other links (e.g. a navigation region, a drop-down nav menu, a footer nav section, etc.)
- The link exists in a visually discrete area with only other interactive elements (e.g. a toolbar, the footer of a dialog that contains only other buttons and links, etc.)
- All links have an icon to indicate that they are links (such as a caret, or the open-in-new-window icon)
- There is some other part of the surrounding visual context that makes it clear the link is an interactive control

Note: links do not need to be visually differentiated from buttons and other interactive controls to meet accessibility requirements.
