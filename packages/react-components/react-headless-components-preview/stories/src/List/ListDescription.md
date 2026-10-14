A list presents a collection of related items, optionally with selection.

`List` owns the semantics of the collection — it resolves the `list`, `listbox`, or `grid` role, coordinates selection, and passes that state to its children. `ListItem` must always be rendered inside a `List`.

When `selectionMode` is set, each item renders a native `input[type="checkbox"]` in its `checkmark` slot, exposes `aria-selected`, and can be toggled by clicking the item, clicking the checkmark, or pressing <kbd>Space</kbd>. Items with an `onAction` handler also respond to <kbd>Enter</kbd>.

Provide an accessible name for the list with `aria-label` or `aria-labelledby` whenever the surrounding content does not already label it.

Arrow-key navigation uses the web-platform `focusgroup` attribute rather than Tabster. In browsers without native support, load the focusgroup polyfill described in the browser support overview.
