This hook enables keyboard navigation using the arrow keys (up/down/left/right), among a collection of
focusable elements. This hook is powered using the [Mover API in tabster](http://tabster.io/docs/mover/).
In addition to the arrow keys, Home and End keys will navigate to the first and last focusable element in the collection
respectively.

> NOTE: Elements with `tabindex="-1"` are considered unfocusable by tabster and will be skipped.
