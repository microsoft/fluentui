An `InfoLabel` is a `Label` with an information button (`InfoButton`) next to it that opens a popover containing additional details about the labeled item.

Use the `info` prop to provide the content shown in the popover. To customize the underlying button or popover, use the `infoButton` slot.

The default information surface is a `<div popover>` with `role="note"`, not menu or dialog semantics. Its button exposes `aria-expanded` and references the open surface with `aria-details`; it does not announce a menu (`aria-haspopup="false"`). InfoLabel does not generate `aria-owns`: inline content already has its DOM relationship, and `aria-details` also works when a custom renderer portals the surface.

Control the popover with `infoButton.popover.open`, or use `defaultOpen` to initialize an uncontrolled button. Changing `open` in the parent or mounting a replacement button does not call `onOpenChange`. Consumer-supplied ARIA attributes are preserved; consumers that customize popup roles are responsible for matching their trigger semantics.

Explicitly setting `infoButton.popover.trapFocus` opts into a native dialog surface with matching `aria-haspopup="dialog"` instead of the default note.
