An `InfoLabel` is a `Label` with an information button (`InfoButton`) next to it that opens a popover containing additional details about the labeled item.

Use the `info` prop to provide the content shown in the popover. To customize the underlying button or popover, use the `infoButton` slot.

When focus leaves both the information button and its surface, `infoButton.popover.onOpenChange` receives a close request with `type: 'blur'` and `open: false`. In controlled mode, update `infoButton.popover.open` in this callback to accept the request. Moving focus between the button and its surface, or within the surface, does not request dismissal.
