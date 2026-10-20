An `InfoLabel` is a `Label` with an information button (`InfoButton`) next to it that opens a popover containing additional details about the labeled item.

Use the `info` prop to provide the content shown in the popover. To customize the underlying button or popover, use the `infoButton` slot.

Control the popover with `infoButton.popover.open`, or use `defaultOpen` to initialize an uncontrolled button. Controlled `open` values are authoritative for the wrapper's `aria-owns`, including when a parent rejects a trigger-generated open or close request. Changing `open` in the parent does not call `onOpenChange`. Removing the information button or changing the React key of the `root` or `infoButton` slot starts a new uncontrolled button lifetime; `defaultOpen` is read again for that new button. Slot keys control these lifetimes even when a custom slot render function does not forward the key to its returned element.
