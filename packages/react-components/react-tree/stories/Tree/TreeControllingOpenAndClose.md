The `Tree` component provides a way to control the open/closed state of individual `TreeItem` components using the `openItems` and `onOpenChange` props.

The `openItems` prop takes an array of `TreeItem` IDs that are currently open, while the `onOpenChange` callback function is called whenever a `TreeItem` is opened or closed. You can then use the callback to update the `openItems` array and keep track of which `TreeItems` are open or closed.
