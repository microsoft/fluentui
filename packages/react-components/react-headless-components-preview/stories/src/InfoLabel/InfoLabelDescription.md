An `InfoLabel` is a `Label` with an information button (`InfoButton`) next to it that opens a popover containing additional details about the labeled item.

Use the `info` prop to provide the content shown in the popover. To customize the underlying button or popover, use the `infoButton` slot.

Control the popover with `infoButton.popover.open`, or use `defaultOpen` to initialize an uncontrolled button. The wrapper's `aria-owns` follows the mounted InfoButton's effective open state, including when a parent rejects a trigger-generated request. Changing `open` in the parent or mounting a replacement button does not call `onOpenChange`.

Removing the information button or changing its React reconciliation boundary starts a new uncontrolled button lifetime; `defaultOpen` is read again for the new button. This includes `root` and `infoButton` slot keys, keys chosen by custom render functions, and default/custom renderer transitions. Ownership is reconciled during layout before the browser paints, rather than inferred from the slot's shorthand key. Initial server-rendered ownership is projected from the supplied `open` or `defaultOpen` value.
