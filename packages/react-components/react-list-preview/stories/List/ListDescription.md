The List is a component for rendering set of vertically stacked items.

There are 2 basic use cases for List, based on the elements it contains:

### Non-interactive list

A simple list with non-interactive elements inside of it. Imagine a list of ingredients for a dish, a list of requirements for a project or list of your favorite animals.

### Interactive lists

An interactive list is a List where each of its items has at least one actionable element. Imagine a list of emails (clicking will open in), a list of contacts(clicking will open a conversation) or a list of installed apps (clicking will open it's details.)

The interactive lists can then be further divided into 2 different categories:

#### List items with a single action

If the list item supports a single action, the preferred way of handling this is either adding a children that can be focused and has its own event handlers, or use `ListItemButton` component.

In this case you don't want to make the actual list items focusable and you don't provide any accessibility attributes to it. The actionable component or `ListItemButton` is what you should be targeting.

Making the List Item focusable or accessible by screen readers adds one unnecessary focusable element in the hierarchy that doesn't do anything.

#### List items with multiple actions

If the list needs to support more than single click action, your best bet is to define the buttons inside of the ListItem manually.

You also want to make the list item focusable by adding `tabIndex={0}` property on the List itself.

This makes sure the list is navigable with up and down arrows and user can enter the group (ListItem) to select the action they want to take with the list.
