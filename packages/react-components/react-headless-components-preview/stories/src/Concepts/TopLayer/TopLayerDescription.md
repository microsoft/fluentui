`useTopLayer` puts an element into the browser **top layer** with the native Popover API (`popover="auto" | "hint" | "manual"`) or a modal `<dialog>` (`showModal()`). It does not position anything: compose it with `usePositioning` to anchor the element to its trigger.

Unlike a portal, the element is never moved. It inherits CSS custom properties, `dir` and React/DOM event bubbling from where it is rendered, and still escapes `overflow`, `transform` and `z-index` stacking of its ancestors.

React owns `open`. Escape and light dismiss are reported through `onClose`, opens by a `popovertarget` invoker through `onOpen`. Closes caused by `open` becoming false are not reported.

`role` decides where focus goes on open: the first item of a `menu`, the selected option of a `listbox` (unless a combobox keeps focus), `[autofocus]` or the first focusable element of a `dialog`. Tab wraps inside modal dialogs. The browser restores focus on close; the hook only steps in when focus is stuck inside the element or lost to `<body>`, and never after a light dismiss. While an element animates out it is `inert` and `aria-hidden`.

`getTopLayerTriggerProps` returns the trigger's `aria-haspopup`, `aria-expanded` and `aria-controls` (or `aria-describedby` for tooltips).

These are recipes. For a ready-made popover or dialog, use `Popover` or `Dialog`.
