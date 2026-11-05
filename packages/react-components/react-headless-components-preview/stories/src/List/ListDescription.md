A list presents a collection of related items, optionally with selection.

`List` owns the semantics of the collection — it resolves the `list`, `listbox`, or `grid` role, coordinates selection, and passes that state to its children. `ListItem` must always be rendered inside a `List`.

When `selectionMode` is set, each item renders a native `input[type="checkbox"]` in its `checkmark` slot, exposes `aria-selected`, and can be toggled by clicking the item, clicking the checkmark, or pressing <kbd>Space</kbd>. Items with an `onAction` handler also respond to <kbd>Enter</kbd>.

Provide an accessible name for the list with `aria-label` or `aria-labelledby` whenever the surrounding content does not already label it.

With `navigationMode="items"`, item navigation uses the web-platform `focusgroup` attribute rather than Tabster. In browsers without native support, load the focusgroup polyfill described in the browser support overview. Composite navigation uses headless row/control handlers with a roving tab stop, since the current focusgroup polyfill does not support grid navigation. Without a navigation mode, the list does not add keyboard-navigation behavior.

With `navigationMode="composite"`, <kbd>Up</kbd> and <kbd>Down</kbd> move between rows. <kbd>Right</kbd> enters a row's controls, and <kbd>Left</kbd> moves between controls or returns to the row from the first control. <kbd>Escape</kbd> returns to the row. <kbd>Up</kbd> or <kbd>Down</kbd> from a secondary action moves to the preceding or following row. <kbd>Home</kbd> and <kbd>PageUp</kbd> move to the first row, while <kbd>End</kbd> and <kbd>PageDown</kbd> move to the last row; these keys work when the row itself has focus. Horizontal directions are reversed in right-to-left layouts, and editable controls retain their native arrow-key behavior.

For a selectable listbox, use `checkmark={null}` and style the selection through `data-selected` to avoid nesting interactive checkboxes inside options. In a composite grid, the native checkmark is wrapped in a grid cell. By default it is excluded from arrow-key navigation; select with <kbd>Space</kbd> on the row or click the checkmark. To include it among the row's keyboard-navigable controls, give it both an accessible name and a tab index, for example `checkmark={{ 'aria-label': 'Select Alex Wilber', tabIndex: 0 }}`.
