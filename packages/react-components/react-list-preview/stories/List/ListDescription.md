The List is a component for rendering set of vertically stacked items (other layouts are being discussed). These items can be focusable, selectable, have one primary action and one or more secondary actions.

There are 2 basic use cases for List, based on the elements it contains:

## Non-interactive list

A simple list with non-interactive elements inside of it. Imagine a list of ingredients for a dish or a list of requirements for a project.

Generally these items would not be focusable, since they don't provide any actions.

## Interactive lists

An interactive list is a List where each of its items has at least one action attached to it. Imagine a list of emails (clicking will open in), a list of contacts (clicking will open a conversation) or a list of installed apps (clicking will open it's details.)

### Selection

Selection is a common feature for single and multi action list items. It's behavior is consistent across both use scenarios.

**Selection can be toggled by clicking the checkbox or pressing `Space` on selected list item.**

When selection is enabled, the **selection is also the primary action** of the list item, which can be **triggered by mouse click**.

This behavior can be overriden by passing a custom `onClick` where `event.preventDefault()` is called and custom primary action can be triggered.
In this case, `Space` key can still be used to toggle selection, but `Enter` and `click` will trigger the custom action.

The interactive lists can then be further divided into 2 different categories. The selection behavior is common for both of these.

### List items with a single action

A list item with single action is a list item which doesn't contain any focusable child elements. It can be selectable.

When list item has a custom action on it and it isn't clear from the context, it's possible enhance the list item with other accessibility props like `aria-roledescription={translated("button")}` to explicitly communicate screen reader users that they are focused on an actionable element.

### List items with multiple actions

If the list needs to support more than single click action, you can render additional focusable elements inside of the List Item.

You also want to make the list item focusable by adding `tabIndex={0}` property on the List itself.

This makes sure the list is navigable with up and down arrows and user can enter the group (ListItem) to select the action they want to take with the list.

When List has multiple actions inside of the list item, the user can press **left and right arrow keys** to navigate inside of the list item. Pressing **up and down** arrow keys will select the previous/next list item immediately.

**To summarize the navigation patterns:**

In the most complex scenario, user will be navigating a **selectable** list with a **custom primary action** and multiple **secondary actions**.

- When a list item is focused:
  - `Space` toggles the selection
  - `Enter` triggers the primary action
  - `Up/Down arrows` arrows move to previous/next list item
  - `Right arrow` enters the first focusable element **inside** the current list item
  - `Tab` goes to the next focusable item after the List
- When one of the element inside of the list item is focused:
  - `Up/Down arrows` select the previous/next list item
  - `Left/Rigth arrows` navigate among the secondary options in the list item. If the leftmost item is focused already and left arrow key is pressed, the parent list item is focused.
  - `Esc` focuses the parent list item
