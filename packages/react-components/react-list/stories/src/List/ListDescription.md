The List is a component for rendering set of vertically stacked items (other layouts are being discussed). These items can be focusable, selectable, have one primary action and one or more secondary actions.

There are 2 basic use cases for List, based on the elements it contains:

(TL;DR at the end)

## Non-interactive list

A simple list with non-interactive elements inside of it. Imagine a list of ingredients for a dish or a list of requirements for a project.

Generally these items would not be focusable, since they don't provide any actions.

## Interactive lists

An interactive list is a List where each of its items has at least one action attached to it. Imagine a list of emails (clicking will open in), a list of contacts (clicking will open a conversation) or a list of installed apps (clicking will open it's details.)

To make the list interactive and navigable, the `navigationMode` should can be passed. Proper accessibility roles and keyboard navigation is used based on the navigation mode `items` or `composite`. More on this later.

### Adding an action

To add an action on the List Item, use `onAction` callback, which will be called when user clicks the list item,
presses `Enter` or `Space` (when selection is not enabled).

Using the `onAction` callback instead of `onClick` has multiple advantages, namely:

- you get the support of `Enter` and `Space` key for free
- when selection is enabled, only `Enter` triggers the action, and `Space` toggles selection

### Selection

Selection is a common feature for single and multi action list items. It's behavior is consistent across both use scenarios. Selection can be enabled by passing `selectionMode` property to the `List`.

**Selection can be toggled by clicking the checkbox or pressing `Space` on selected list item.**

When selection is enabled, the **selection is also the primary action** of the list item, which can be **triggered by mouse click or Enter**.

This behavior for Enter and click can be overriden by passing a custom `onAction` where `event.preventDefault()` is called and custom primary action can be triggered.
In this case, `Space` will still be used to toggle selection, but `Enter` and `click` will trigger the custom action.

**The `navigationMode` in case the selection is enabled defaults to `items`. If there are focusable elements inside each list item, make sure to change this to `composite` to get proper accessibility and keyboard navigation.**

The interactive lists can then be further divided into 2 different categories. The selection behavior is common for both of these.

### List items with a single action

A list item with single action is a list item which doesn't contain any focusable child elements. It can be selectable.

To ensure proper keyboard navigation and accessibility roles, pass the `navigationMode="items"` prop to the `List` This way the items will be made focusable and user will be able to navigate with up and down arrows.

### List items with multiple actions

If the list needs to support more than single click action, you can render additional focusable elements inside of the List Item.

To tell the List component that it should enable navigation inside of the items, pass the `navigationMode="composite"` property to it.

This makes sure the list is navigable with up and down arrows and user can enter the group (`ListItem`) to select the action they want to take with the list. It also switches the default roles to `grid` and `row`.

**When multiple actions are present on the list item, the list item roles should be `grid`, and `row` (this is automatic when `navigationMode="composite"` is passed). You also need to make sure each direct child of the `ListItem` component has a role `gridcell` to adhere to the a11y roles used.** You will get a warning in the console during development if this requirement is not fulfilled.

When List has multiple actions inside of the list item, the user can press **left and right arrow keys** to navigate inside of the list item. Pressing **up and down** arrow keys will move focus to the previous/next immediate list item.

**To summarize the navigation patterns:**

In the most complex scenario, user will be navigating a **selectable** list with a **custom primary action** and multiple **secondary actions**.

- When a list item is focused:
  - `Space` toggles the selection
  - `Enter` triggers the primary action
  - `Up/Down arrows` arrows move to previous/next list item
  - `Right arrow` enters the first focusable element **inside** the current list item
  - `Tab` goes to the next focusable item after the List
- When one of the element inside of the list item is focused:
  - `Up/Down arrows` moves focus to the previous/next list item
  - `Left/Rigth arrows` navigate among the secondary options in the list item. If the leftmost item is focused already and left arrow key is pressed, the parent list item is focused.
  - `Esc` focuses the parent list item

## TL;DR

- Use `navigationMode` prop to enable focusability of items and keyboard navigation
- Keyboard navigation and proper accessibility roles are inferred from the `navigationMode` prop:
  - `undefined` - no focusable items, no keyboard navigation, roles are `listitem` and `list`.
  - `items` - items are focusable, up and down arrow keys navigate between them. Default role is `list` and `listitem`, when selection is enabled, it is `listbox` and `option`.
  - `composite` - use when there are other focusable elements inside of the list items. This enables up/down arrow keys to move between items and right/left arrow keys to focus on the items inside.
    - composite navigation switches to role `grid` and `row`. **It is important for each direct child of `ListItem` in this case to have `gridcell` role, otherwise the screen readers get confused.**
- use `onAction` instead of `onClick` callback to register `click` mouse event and `Enter` / `Space` keyboard events
- Selection can be enabled with `selectionMode` property. When selectionMode is enabled, the List automatically behaves as if it was passed `navigationMode="single` and this doesn't have to be passed. Do not forget to set this to `composite`, if there are focusable elements inside.
- When Selection is enabled:
  - `Spacebar` and checkbox `click` always toggle selection
  - `Enter` and list item `click` toggle selection unless this behavior has been prevented in the `onAction` callback
