An `InfoLabel` is a `Label` with an information button (`InfoButton`) next to it that opens a popover containing additional details about the labeled item.

Use the `info` prop to provide the content shown in the popover. To customize the underlying button or popover, use the `infoButton` slot.

Control the popover with `infoButton.popover.open`, or use `defaultOpen` to initialize an uncontrolled button. The wrapper's `aria-owns` follows the actual open state, including when a controlled parent rejects an open or close request. Changing `open` in the parent does not call `onOpenChange`. Removing the information button or changing its React key starts a new uncontrolled lifetime; `defaultOpen` is read again for that new button.
