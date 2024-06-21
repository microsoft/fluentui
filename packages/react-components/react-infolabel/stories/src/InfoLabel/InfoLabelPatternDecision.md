## InfoButton/InfoLabel pattern

### What is an InfoLabel?

An InfoLabel is composed of two components and a wrapper. The main component is a Label and the secondary component is an InfoButton.
We packaged both components to be able to achieve the correct accessibility out of the box. We automatically link the label to the
button from the InfoButton component and apply `aria-owns` to the wrapper when the InfoButton's Popover is open. In addition, InfoLabel
allows you to render only the InfoButton if that's desired. The reason why we don't export InfoButton separately is to avoid having
issues with `aria-owns`. The PopoverSurface must be linked to the wrapper of the InfoButton when open, not doing so results in a
violation.

### What is the InfoButton pattern?

The InfoButton pattern is a button that exposes additional information about a field or a concept. To trigger the Popover, the user may
activate the button by clicking on it and focusing on it and pressing enter or space. When the Popover is open, the focus is programmatically moved
to the PopoverSurface. To close the Popover, the user may click the button again, click outside the popover, press the escape key, or tab out of
the PopoverSurface.

#### Why is focus moved to the PopoverSurface?

The reason why we move focus to the PopoverSurface is to allow the user to navigate the Popover with the keyboard. This allows screen reader and keyboard
users to read the content and interact with it without having to use the mouse and not have unreachable content. We move the focus specifically to the
PopoverSurface and not the first focusable element because there might be a case where there's a paragraph of text and the first focusable element is at the
bottom of the Surface. In this case, a screen reader user might not know there's more content above and therefore miss it.

#### Can the InfoButton be opened on focus and not move focus to the PopoverSurface?

InfoButtons can not be opened on focus. The pattern where you have an icon and a tooltip that appears on focus is not the InfoButton pattern. The tooltip
pattern is meant to have short text and no interaction with the content. We believe that if the content is short or even a few words, it should be included
in the label or a secondary label. If the content is longer and/or has interaction, then it must be an InfoButton.

> If the tooltip + icon pattern is still needed, refer to the Icon example in tooltip on how to correctly achieve this pattern. Note that when using a
> tooltip, the content must be short and not have interaction.
