A tree presents a hierarchical list of items whose branches can be expanded and collapsed, optionally with selection.

`Tree` owns the semantics of the hierarchy: the root renders the `tree` role, keeps the open and checked items, and manages keyboard navigation with a roving tab index — <kbd>ArrowUp</kbd>/<kbd>ArrowDown</kbd> move between visible items, <kbd>ArrowRight</kbd>/<kbd>ArrowLeft</kbd> open, enter, leave and close branches, <kbd>Home</kbd>/<kbd>End</kbd> jump to the first and last item, and typing a character moves to the next matching item. A `Tree` rendered inside a branch `TreeItem` becomes its `group` subtree and is not rendered while the branch is closed. `TreeItem` must always be rendered inside a `Tree`, and its content is usually laid out with a `TreeItemLayout`.

When `selectionMode` is set, the `selector` slot of `TreeItemLayout` renders a native `input[type="checkbox"]` (`multiselect`) or `input[type="radio"]` (`single`) labelled by the main content, and items can be toggled with <kbd>Space</kbd>. Checked items are controlled through `checkedItems` and `onCheckedChange`. Open items can be uncontrolled with `defaultOpenItems` or controlled with `openItems` and `onOpenChange`.

`TreeItemLayout` renders no default expand icon: pass one through the `expandIcon` slot of branch items. Its `actions` are shown while the item is hovered or focused and form a toolbar focus group. With `navigationMode="treegrid"`, <kbd>ArrowRight</kbd> moves focus into the actions and <kbd>ArrowLeft</kbd> back to the item.

Label the root tree with `aria-label` or `aria-labelledby`.

Set `disabled` on `TreeItem` to disable activation, selection and expansion
for it and its descendants. An inherited disabled state cannot be overridden with `disabled={false}` or
`aria-disabled={false}`. The `disabled` prop and ancestor item state control the emitted `aria-disabled`
attribute; supplying `aria-disabled` alone does not disable an item.
Disabled items remain in the roving tab order and arrow-key navigation so users can discover them and
explore already-open branches, but cannot open or close branches or toggle their native selectors.
Controlled open and checked state can still be updated by the consumer.
`TreeItemLayout` derives its disabled state from its item and disables the native selector.
Custom interactive children, such as action buttons or links, remain the consumer's responsibility:
disable those controls separately when appropriate.
There is no tree-level disabled API; to disable an entire tree, disable each top-level `TreeItem`.

The components expose the following state attributes for styling:

| Element                      | Attribute              | Values                                                |
| ---------------------------- | ---------------------- | ----------------------------------------------------- |
| Root tree                    | `data-navigation-mode` | `tree` or `treegrid`                                  |
| Root tree                    | `data-selection-mode`  | `single` or `multiselect`, absent without selection   |
| `TreeItem`                   | `data-item-type`       | `leaf` or `branch`                                    |
| `TreeItem`                   | `data-open`            | present while a branch is open                        |
| `TreeItem`                   | `data-checked`         | present when checked, `mixed` when partially checked  |
| `TreeItem`, `TreeItemLayout` | `data-disabled`        | present when the resolved inherited state is disabled |
| `TreeItemLayout`             | `data-selection-mode`  | `single` or `multiselect`, absent without selection   |

Nesting depth is exposed by the native `aria-level` attribute of each `TreeItem`.
