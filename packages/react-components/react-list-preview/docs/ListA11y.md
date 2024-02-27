# Accessibility of Lists on the web: why we can't have nice things

Rev. 1 - Initial draft
Rev. 2 - Added examples links, made conclusions in italic, explained bahavior for Space and Enter on lists with a primary action, some wording changed

Accessibility in browsers is hard in general. When it comes to modern web applications with complex UIs, that statement is more true then ever.

And then there are Lists. For some reason, there is not a single aria role that would support proper position narration, selection narration, and complex widget elements with secondary actions.

That is why we need to make compromises, choosing the right tool (a11y role) for each scenario and maybe sometimes hack around a little.

In this document I will go through a different variations and designs of List -- seemingly a simple component, but a nightmare to make accessible properly.

We'll discuss the requirements from the design/functional POV, then proceed with defining accessibility requirement. Having these in mind, we can explore different List use cases and see which aria roles work and which don't, what should we pick and why, and what are the limitations and how we can work around them.

## Functional requirements for List

When I say List, I dont mean a simple `ul`/`li` list. A List component in the world of Fluent UI is a more complex component and supports these features:

- **A simple `ul`/`li`** - base scenario; a simple list with no interactivity at all.
- **Single action** - Each List Item can have one primary action, this action can be triggered by pressing **Enter** on the focused list item.
- **Selection** - each List can be set as selectable and List Items need to be toggleable, both single and multiselect are supported. This needs to be properly narrated by screen readers. The selection can be triggered by pressing **Spacebar**.
- **ListItems with "secondary" action** - each List Item is kind of a widget, in addition to a primary action, can have multiple interactive elements inside. User needs to understand that those options are there and intuitively know how to focus those.

## Accessibility requirements

For the List to be accessible, these requirements are mandatory to work on major screen reading software. I will be focusing on NVDA, Jaws (Windows) and Voice Over (Mac OS).

- **Position** - as user navigates, the current position in the list is announced
- **Actionable** - as user navigates, it should be obvious that the current item has an action that can be triggered (the action can be selection, but doesn't have to be). This should be implicit (role `button` implies there is an action) or explicit (the screen reader makes it known there is an action)
- **Selection** - as user changes the selection state on a List Item, it is announced

In the following section, I will go through the each funcional requirement and describe the problems into more detail.

## Analysis

### Single action lists

[example](https://fluentuipr.z22.web.core.windows.net/pull/29760/public-docsite-v9/storybook/iframe.html?viewMode=docs&id=preview-components-list--default#single-action)

List with a single action is a collection of items with common action, specific to each item. One example would be a list of people, where clicking on a person will open a popup with details.

For a List with a single action, there are generally 2 approaches we can take:

a) Put a **Button component inside** of the List Item and navigate directly between them, skipping the List Items

b) Make the **List Items focusable** and attach the action on them

#### Making the Buttons inside focusable

While this is a suggested approach for this case, lets see if it fits all of our a11y requirements:

- Position: ❌
  - While Voice Over on Mac Works (when using proper VO keys to navigate), screen readers on Windows fail to announce the position inside of the list in Focus mode (preferred mode for comples web Apps).
- Actionable: ✅
  - Since it is a button with aria role `button` we are focusing, it's implicitly communicated that the user can trigger action.
- Selection: N/A

#### Making the List Items Focusable

If we want to put the action directly on the list item, we should choose the proper aria role, which would fill all of our a11y requirement, i.e. **announce position in the list** and **implicitly or explicitly communicate there is action attached to the List Item**.

We have multiple aria roles we can explore and see if any of those fill all of our a11y needs:

##### List/ListItem

- Position: ✅
  - Focused items of role "listitem" are properly announced with their position
- Actionable: ✴️
  - The **action** on the list item is **not announced** in the Focus mode on Windows.
  - This should be implicitly communicated by context, if that isn't necessary, it can be worked around by using `aria-roledescription` or `aria-label` with proper explanation.
- Selection: N/A

_`listitem` role on it's own should be used if the fact that it has an action can be understood by the context it exists in. If this is not clear enough, `aria-label` or `aria-roledescription` can be used to further explain this._

##### Menu/Menuitem

- Position: ✅
  - Focused `menuitem` elements properly announce their position in the `menu`
- Actionable: ✅
  - Users implicitly expect an action on a `menuitem`
- Selection: N/A
- Other considerations:
  - While the `menu`/`menuitem` aria roles seem to check our a11y requirement boxes, there are other considerations that need to be taken in:
  - "Menu" is not semantically correct for our example use case. List is different from a Menu in a way that in a List, each List item is of the same "category" (list of people, emails, conversations, applications) and each list item action triggers the same action, while in a Menu the user expects each option to do something else.
  - Creates a communication barrier between the sighted user and user relying on a screen reader. If a sighted user instructs visually impaired user to go on "the list of people", they would only be able to find "a menu".

_While the `menuitem` role seems to work, its semantically different from a list enough, that it would add confusion and noise._

#### Outcome

Seems like for our "simple" use case of a single action in a list item, we don't have a perfect solution. Each of the three suggested variants have their cons. While some of the downsides of certain solutions are fundamental (confusion between listitem and menuitem), others can be worked around.

_My suggestion for this usecase would to **make the List Item focusable, use `list` and `listitem` roles and add a translated string of "button" as `aria-roledescription` when an action on the list Item is present**._

This way we make sure that the user knows they are in a List, the position is properly announced and a translated "button" role description is present, making it clear you can press "Enter" to trigger it.

**Examples of narration of the suggested solution:**
NVDA:

> John Doe button 2 of 13 level 1

JAWS:

> John Doe button 2 of 13

Voice Over (using VO navigation keys):

> John Doe, button, 2 of 13

Voice Over (using just arrow keys):

> John Doe, button

### Single action lists - selection

[Visit example](https://fluentuipr.z22.web.core.windows.net/pull/29760/public-docsite-v9/storybook/iframe.html?viewMode=docs&id=preview-components-list--default#single-action-selection)

List with a single action where the action is toggling the selection. One example would be a list of people to add to a call, where clicking on a row/person will add them to the selection. There is no other action that can be triggered on the list items.

The whole list item can be focused and the selection can be toggled with **spacebar**. Also, the whole item is clickable with a mouse and triggers the same action.

Counter-intuitively, this case is more straightforward to handle than the previous, since this is usually called a **Listbox** and there is an appropriate aria role for this.

#### Listbox/Option

- Position: ✅
  - The position in the list is properly narrated in all screen readers.
- Actionable: ✅
  - The `listbox`/`option` role combination implicitly communicates that user can toggle the selection on an item using spacebar
- Selection: ✅
  - The `listbox`/`option` role support `aria-selected` attribute which is properly narrated as it changes.

_This scenario is straightforward, there is an aria role which fits perfectly in our use case. It has one downside, the `option` role is [always presentational](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/option_role#all_descendants_are_presentational), which means that `listbox` with `option` cannot be used in a scenario where there are other actions inside of the list item, but more on that later._

### List with multiple actions - no primary action

[example](https://fluentuipr.z22.web.core.windows.net/pull/29760/public-docsite-v9/storybook/index.html?path=/docs/preview-components-list--default#multiple-actions-no-primary-no-selection)

When multiple actions are available in a list item, things become a bit more complicated, as some aria roles are not equipped to handle that at all (like `option` because of it's inherent property of [all descendants being presentational](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/option_role#all_descendants_are_presentational)).

For the following scenarios we can establish some basic keyboard navigation that should be supported regardless of any a11y role we add.

For simplicity, lets talk about a vertical list in LTR layout. Horizontal lists and lists in RTL layout should swap the arrow keys appropriately.

- **Down/Up arrows** move to the **next, previous list item**
- **Right arrow enters** the list item and **focuses** on the **first focusable** element
- Once **in the list item**, **Left** and **Right** arrow keys navigate between **focusable elements inside**, this is **not cyclic** and when **left arrow is pressed on leftmost** element, the **list item itself is selected**
- Once in the list item, **Up and Down** arrows **focus** the list item **above/below** (if it exists)

In general, we have 2 options for this scenario:

#### List / ListItem

- Position: ✅
  - as we established earlier, the `listitem` role is properly narrated together with its position
- Actionable: N/A
  - in this case, the list items themselves are not actionable
- Selection: N/A
  - in this case we don't have selection
- Other considerations:
  - Would the user expect to click right arrow key to get inside the list item?

_For this scenario, List/ListItem seems like a good choice, since we don't need support for selection or actionable rows (list items)._

#### Grid / Row / Gridcell

While using Grid role for a list may seem unintuitive and irrelevant, it will come up later when we talk about selection in a complex list like this.

I'm writing about it here for completion and to contrast it with the listitem role.

In grid, each list item is of role `row` and each actionable element inside should be in its own `cell` role element.

- Position: ❌
  - The position is not properly narrated, we get `row` but not `row x of y`
- Actionable: N/A
- Selection: N/A
- Other considerations: ⚠️
  - The nature of `grid`/`row`/`gridcell` roles forces the developers to actually stick to this strict HTML layout. A cell should be wrapping actionable element, but it should be a direct child of the `row`, preventing users from building more complex widgets with custom HTML structure.

### List with multiple actions - with selection

[example](https://fluentuipr.z22.web.core.windows.net/pull/29760/public-docsite-v9/storybook/index.html?path=/docs/preview-components-list--default#multiple-actions-primary-selection)

Things become a bit more complicated when selection is involved, as we need the proper a11y announcements when the selection state is changed. This is not supported for the `listitem` role, which we deemed perfect for complex list without selection. Even if `aria-selected` is added to a `listitem`, the screen readers just ignore that property (since it's not valid for `listitem` role).

When the list supports selection, the main action of the list item is **to toggle the selection** by default.

**Left mouse button** always triggers _onClick_, which toggles the selection, if enabled. A custom action can be triggered on click instead, by passing a custom `onClick` handler to the `ListItem` component and calling `preventDefault()` on the event. See how this works [here](https://fluentuipr.z22.web.core.windows.net/pull/29760/public-docsite-v9/storybook/index.html?path=/docs/preview-components-list--default#multiple-actions-different-primary).

**Spacebar** on the `ListItem` always toggles the selection.

**Enter** on the `ListItem` triggers the main action, which can be changed by passing the `onClick` handler, i.e. by default it triggers selection, but this behavior can be overriden (by changing the onClick handler).

Both keys behavior can be changed by passing the `onKeyDown` handler and preventing teh default by calling `preventDefault()` on the event. Please note that the uncontrolled selection can no longer be utilized in this case and you have to take control.

#### Listbox / option

Since [all descendats of option are presentational](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/option_role#all_descendants_are_presentational), this role is not viable for this case, since we need to allow the screen reader to go inside of the list item to focus on the secondary actions.

While this role technically works on Windows using the screen reader Focus mode, it actually **completely breaks Voice Over navigation on Mac OS** and therefore is unusable.

#### Grid / Row / Gridcell

- Position: ✴️
  - While we get announcement for `row` as "row", we don't get the row number `row x of y` in any of the screen readers tested. This is a big limitation of this role, could be a chromium bug.
  - This _can_ be worked around from the user world by passing the order as part of the `aria-label`. This is not without it's downsides though.
- Actionable: ✅
  - Since the rows can be selected, it is reasonable to expect that the users understand that they can trigger the action on the list item (row).
- Selection: ✅
  - Rows can be selected, and the selection is properly announced when it changes.
- Other considerations: ⚠️
  - As mentioned previously, when using this role, it is importand that the HTML structure is precisely `grid > row > gridcell > actionable element`. For some complex layouts, this may not be always easy / possible to do.

_While grid role puts some constrain on the DOM structure to work properly, it is the only accessibility role I found that supports `aria-selected` and allows complex widgets inside._

### List with multiple actions, without selection

[example](https://fluentuipr.z22.web.core.windows.net/pull/29760/public-docsite-v9/storybook/index.html?path=/docs/preview-components-list--default#multiple-actions-no-selection-with-primary)

When no selection is involved in the equation, we don't have to limit ourselves to using a11y roles that support `aria-selected`, which makes things a bit easier.

#### Grid / Row / Gridcell

- Position: ✴️
  - dtto, `row` is announced, but no order
- Actionable: ✴️
  - While actions can be attached to the whole row, this is not a common pattern and it could lead to discoverability issue. When explicitely communicated in `aria-roledescription` or in `aria-label`, this could be solved.
  - On the other hand, grid allows for better discoverability of secondary inside actions.
- Selection: N/A
- Other considerations: ⚠️
  - Again, the combination of these roles requires developers to strictly adhere to the required DOM layout.

#### List / Listitem

- Position: ✅
  - As established earlier, list has a great support for announcing list position
- Actionable: ✅
  - Action can be put directly on the List Item. Discoverability might be a small issue again, but a context, updated label or supporting aria attributes like `aria-roledescription` can easily solve that
  - **It might be difficult to communicate that there are secondary actions that the user can navigate to.**
- Selection: N/A

_Both `grid` and `list` could be used in this scenario, both have downsides. List gives us better position narration, but doesn't implicitely communicate that there actions that can be focused by moving right. Grid solves this issue, but it's row positions aren't properly narrated (this has been brought up with NVDA/Jaws teams)._
