# Components/Tree

A hierarchical list structure component for displaying data in a collapsible and expandable way.

Use this component when you need to present your users with a clear visual structure of content or data, allowing them to efficiently interact and navigate through the information. If the information is less hierarchical or node-based, consider using a list or table instead.

## Best practices

### Do

- **Do use the `Tree` component to create a nested tree structure:** When your data naturally follows a hierarchical parent-child relationship, the `Tree` component provides a clean and intuitive way to represent this structure. **If a more complex interaction with a `Tree` is required, use `FlatTree` component instead:** In scenarios where you need to efficiently manipulate or handle large amounts of hierarchical data, the `FlatTree` component can offer performance benefits.

- **Use custom styles if the tree needs to support more than 10 levels of nesting:** Depending on your design and data requirements, you may need to adjust the styling of the tree elements to accommodate deeper nesting levels. See [inline styling tree item level](#inline-styling-tree-item-level) for more information.

- **Use the `aria-label` attribute on the root of the `Tree` component to provide an accessible name for the tree:** This attribute helps screen readers to understand the purpose of the tree, making it more accessible and inclusive.

- **Ensure continuity of keyboard navigation when manipulating tree items:** When adding or removing items, take necessary measures to prevent unexpected focus loss. The user's active focus should remain logical and intuitive throughout interactions.

- **If you provide additional functionality within tree items `actions` slot, make them accessible with a context menu:**

- **Make `actions` or additional functionality in tree items accessible with a context menu:**

  - ⚠️ `actions` slot do not adhere to keyboard navigation standards! Use `aria-description` or `aria-describedby` on tree items to indicate this interaction, you should explain your user how to interact with `actions` slot.
  - the `actions` slot will have `role="toolbar"` and are accessible with horizontal keyboard navigation using [\`useArrowNavigationGroup\`](https://react.fluentui.dev/?path=/docs/utilities-focus-management-usearrownavigationgroup--default) by default.

- **Use `aria-selected=true` once a treeitem is selected in custom behaviors** Some tree utilization might use the selection feature for navigation purposes, in this case, the `aria-selected` attribute should be set to `true` once the treeitem is the current active item to indicate that it is selected for the navigation.

## Accessibility

Here are some accessibility edge cases scenarios we identified and users should keep in mind while using the `Tree` components.

NVDA

1. [Single select tree - narration of grouping #15290](https://github.com/nvaccess/nvda/issues/15290)
2. [Single select tree - narration aria-selected makes verbosity with redundant "selected" #15289](https://github.com/nvaccess/nvda/issues/15289)

VoiceOver/Chromium

1. [Issue 1273540: Tree as table in Mac > VoiceOver narrates " 0 items enclosed " when user navigates to expaded treeitem](https://bugs.chromium.org/p/chromium/issues/detail?id=1273540)
2. [Issue 1273544: Tree as table in Mac > VoiceOver doesn't narrate aria-labelledby element on treeitem](https://bugs.chromium.org/p/chromium/issues/detail?id=1273544)

VoiceOver

1. [Bug 8223307](https://office.visualstudio.com/APEX/_workitems/edit/8223307): VoiceOver doesn't narrate level of tree
2. [Bug 8223375](https://office.visualstudio.com/APEX/_workitems/edit/8223375): VoiceOver doesn't list tree/table in the rotor
   iOS
3. [Bug 8232232](https://office.visualstudio.com/APEX/_workitems/edit/8232232): iOS : VoiceOver - Select tree with checkboxes - no narration of ticket/unticked state

JAWS

1. [Treeview - JAWS doesn't narrate position for each tree item #338](https://github.com/FreedomScientific/standards-support/issues/338)
2. [JAWS doesn't narrated "toolbar" keyword in navigable treeitem with actions buttons #747
   ](https://github.com/FreedomScientific/standards-support/issues/747)

Narrator

1. [Bug 45975192](https://microsoft.visualstudio.com/OS/_workitems/edit/45975192): Single select tree - narration aria-selected makes verbosity with redundant "selected"
2. [Bug 46020629](https://microsoft.visualstudio.com/OS/_workitems/edit/46020629): Select tree with checkboxes - no narration of checked state
3. [Bug 46020726](https://microsoft.visualstudio.com/OS/_workitems/edit/46020726): Select tree with checkboxes - no able to toggle check state with space in scan mode

## Props

| Name               | Type                                                                       | Required                                                                      | Default   | Description                                                                                                                                                                                                                                                                            |
| ------------------ | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `collapseMotion`   | `PresenceMotionSlotProps                                                   | null`                                                                         | No        |                                                                                                                                                                                                                                                                                        |                                                                                                                                                                                                                                                                                              |
| `as`               | `"div"`                                                                    | No                                                                            |           |                                                                                                                                                                                                                                                                                        |
| `navigationMode`   | `"tree" "treegrid"`                                                        | No                                                                            | 'tree'    | Indicates how navigation between a treeitem and its actions work - 'tree' (default): The default navigation, pressing right arrow key navigates inward the first inner children of a branch treeitem - 'treegrid': Pressing right arrow key navigate towards the actions of a treeitem |
| `appearance`       | `"subtle" "transparent" "subtle-alpha"`                                    | No                                                                            | 'subtle'  | A tree item can have various appearances: - 'subtle' (default): The default tree item styles. - 'subtle-alpha': Minimizes emphasis on hovered or focused states. - 'transparent': Removes background color.                                                                            |
| `size`             | `"small" "medium"`                                                         | No                                                                            | 'medium'  | Size of the tree item.                                                                                                                                                                                                                                                                 |
| `openItems`        | `Iterable<TreeItemValue>`                                                  | No                                                                            |           | This refers to a list of ids of opened tree items. Controls the state of the open tree items. These property is ignored for subtrees.                                                                                                                                                  |
| `defaultOpenItems` | `Iterable<TreeItemValue>`                                                  | No                                                                            |           | This refers to a list of ids of default opened items. This property is ignored for subtrees.                                                                                                                                                                                           |
| `onOpenChange`     | `((event: KeyboardEvent<HTMLElement>                                       | MouseEvent<HTMLElement, MouseEvent>, data: TreeOpenChangeData) => void)`      | No        |                                                                                                                                                                                                                                                                                        | Callback fired when the component changes value from open state. These property is ignored for subtrees. @param event - a React's Synthetic event @param data - A data object with relevant information, such as open value and type of interaction that created the event.                  |
| `onNavigation`     | `((event: KeyboardEvent<HTMLElement>                                       | MouseEvent<HTMLElement, MouseEvent>, data: TreeNavigationDataParam) => void)` | No        |                                                                                                                                                                                                                                                                                        | Callback fired when navigation happens inside the component. These property is ignored for subtrees. FIXME: This method is not ideal, as navigation should be handled internally by tabster. @param event - a React's Synthetic event @param data - A data object with relevant information, |
| `selectionMode`    | `"multiselect" "single"`                                                   | No                                                                            | undefined | This refers to the selection mode of the tree. - undefined: No selection can be done. - 'single': Only one tree item can be selected, radio buttons are rendered. - 'multiselect': Multiple tree items can be selected, checkboxes are rendered.                                       |
| `checkedItems`     | `Iterable<TreeItemValue                                                    | [TreeItemValue, TreeSelectionValue]>`                                         | No        |                                                                                                                                                                                                                                                                                        | This refers to a list of ids of checked tree items, or a list of tuples of ids and checked state. Controls the state of the checked tree items. These property is ignored for subtrees.                                                                                                      |
| `onCheckedChange`  | `((event: ChangeEvent<HTMLElement>, data: TreeCheckedChangeData) => void)` | No                                                                            |           | Callback fired when the component changes value from checked state. These property is ignored for subtrees. @param event - a React's Synthetic event @param data - A data object with relevant information, such as checked value and type of interaction that created the event.      |
| `ref`              | `Ref<HTMLDivElement>`                                                      | No                                                                            |           |                                                                                                                                                                                                                                                                                        |

## Subcomponents

### Tree

The `Tree` component renders nested items in a hierarchical structure.
Use it with `TreeItem` component and layouts components `TreeItemLayout` or `TreeItemPersonaLayout`.

#### Props

| Name               | Type                                                                       | Required                                                                      | Default   | Description                                                                                                                                                                                                                                                                            |
| ------------------ | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `collapseMotion`   | `PresenceMotionSlotProps                                                   | null`                                                                         | No        |                                                                                                                                                                                                                                                                                        |                                                                                                                                                                                                                                                                                              |
| `as`               | `"div"`                                                                    | No                                                                            |           |                                                                                                                                                                                                                                                                                        |
| `navigationMode`   | `"tree" "treegrid"`                                                        | No                                                                            | 'tree'    | Indicates how navigation between a treeitem and its actions work - 'tree' (default): The default navigation, pressing right arrow key navigates inward the first inner children of a branch treeitem - 'treegrid': Pressing right arrow key navigate towards the actions of a treeitem |
| `appearance`       | `"subtle" "transparent" "subtle-alpha"`                                    | No                                                                            | 'subtle'  | A tree item can have various appearances: - 'subtle' (default): The default tree item styles. - 'subtle-alpha': Minimizes emphasis on hovered or focused states. - 'transparent': Removes background color.                                                                            |
| `size`             | `"small" "medium"`                                                         | No                                                                            | 'medium'  | Size of the tree item.                                                                                                                                                                                                                                                                 |
| `openItems`        | `Iterable<TreeItemValue>`                                                  | No                                                                            |           | This refers to a list of ids of opened tree items. Controls the state of the open tree items. These property is ignored for subtrees.                                                                                                                                                  |
| `defaultOpenItems` | `Iterable<TreeItemValue>`                                                  | No                                                                            |           | This refers to a list of ids of default opened items. This property is ignored for subtrees.                                                                                                                                                                                           |
| `onOpenChange`     | `((event: KeyboardEvent<HTMLElement>                                       | MouseEvent<HTMLElement, MouseEvent>, data: TreeOpenChangeData) => void)`      | No        |                                                                                                                                                                                                                                                                                        | Callback fired when the component changes value from open state. These property is ignored for subtrees. @param event - a React's Synthetic event @param data - A data object with relevant information, such as open value and type of interaction that created the event.                  |
| `onNavigation`     | `((event: KeyboardEvent<HTMLElement>                                       | MouseEvent<HTMLElement, MouseEvent>, data: TreeNavigationDataParam) => void)` | No        |                                                                                                                                                                                                                                                                                        | Callback fired when navigation happens inside the component. These property is ignored for subtrees. FIXME: This method is not ideal, as navigation should be handled internally by tabster. @param event - a React's Synthetic event @param data - A data object with relevant information, |
| `selectionMode`    | `"multiselect" "single"`                                                   | No                                                                            | undefined | This refers to the selection mode of the tree. - undefined: No selection can be done. - 'single': Only one tree item can be selected, radio buttons are rendered. - 'multiselect': Multiple tree items can be selected, checkboxes are rendered.                                       |
| `checkedItems`     | `Iterable<TreeItemValue                                                    | [TreeItemValue, TreeSelectionValue]>`                                         | No        |                                                                                                                                                                                                                                                                                        | This refers to a list of ids of checked tree items, or a list of tuples of ids and checked state. Controls the state of the checked tree items. These property is ignored for subtrees.                                                                                                      |
| `onCheckedChange`  | `((event: ChangeEvent<HTMLElement>, data: TreeCheckedChangeData) => void)` | No                                                                            |           | Callback fired when the component changes value from checked state. These property is ignored for subtrees. @param event - a React's Synthetic event @param data - A data object with relevant information, such as checked value and type of interaction that created the event.      |
| `ref`              | `Ref<HTMLDivElement>`                                                      | No                                                                            |           |                                                                                                                                                                                                                                                                                        |

### TreeItem

The `FlatTreeItem` component represents a single item in a flat tree.

#### Props

| Name           | Type                             | Required                                                                     | Default | Description                                                                                                                                                                                                                                                            |
| -------------- | -------------------------------- | ---------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `as`           | `"div"`                          | No                                                                           |         |                                                                                                                                                                                                                                                                        |
| `value`        | `string                          | number`                                                                      | No      |                                                                                                                                                                                                                                                                        | A tree item should have a well defined value, in case one is not provided by the user by this prop one will be inferred internally. |
| `open`         | `boolean`                        | No                                                                           |         | Whether the tree item is in an open state This overrides the open value provided by the root tree, and ensure control of the visibility of the tree item per tree item. NOTE: controlling the open state of a tree item will not affect the open state of its children |
| `onOpenChange` | `((e: KeyboardEvent<HTMLElement> | MouseEvent<HTMLElement, MouseEvent>, data: TreeItemOpenChangeData) => void)` | No      |                                                                                                                                                                                                                                                                        |                                                                                                                                     |
| `parentValue`  | `TreeItemValue`                  | No                                                                           |         | This property is inferred through context on a nested tree, and required for a flat tree.                                                                                                                                                                              |
| `ref`          | `Ref<HTMLDivElement>`            | No                                                                           |         |                                                                                                                                                                                                                                                                        |

### TreeItemLayout

The `TreeItemLayout` component is used as a child of `TreeItem` to define the content and layout of a tree item.
It provides a consistent visual structure for tree items in a `Tree` component.
This component should only be used as a direct child of `TreeItem`.

#### Props

| Name         | Type                                                                                                                                                  | Required   | Default | Description                      |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------- | ---- | ---------- | --- | --- | --- |
| `aside`      | `WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }>             | null`      | No      |                                  | Aside content is normally used to render a badge or other non-actionable content                                                                                                                                                                                                                                                                                                                                                                                          |
| `main`       | `NonNullable<WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }> | null>`     | No      |                                  | Content. Children of the root slot are automatically rendered here                                                                                                                                                                                                                                                                                                                                                                                                        |
| `expandIcon` | `WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }>             | null`      | No      |                                  | Expand icon slot, by default renders a chevron icon to indicate opening and closing                                                                                                                                                                                                                                                                                                                                                                                       |
| `iconBefore` | `WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }>             | null`      | No      |                                  | Icon slot that renders right before main content                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `iconAfter`  | `WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }>             | null`      | No      |                                  | Icon slot that renders right after main content                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `actions`    | `WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; } & { ...; }>  | null`      | No      |                                  | Actionable elements are normally buttons, menus, or other focusable elements. Those elements are only visibly available if the given tree item is currently active. `actions` and `aside` slots are positioned on the exact same spot, so they won't be visible at the same time. `aside` slot is visible by default meanwhile `actions` slot are only visible when the tree item is active. `actions` slot supports a `visible` prop to force visibility of the actions. |
| `selector`   | `(Omit<ComponentProps<Partial<CheckboxSlots>, "input">, "defaultChecked"                                                                              | "onChange" | "size"  | "checked"> & { checked?: boolean | ... 1 more ...; ... 5 more ...; size?: "medium"                                                                                                                                                                                                                                                                                                                                                                                                                           | ... 1 more ...; } & RefAttributes<...>) | (Omit<...> & ... 1 more ... & RefAttributes<...>) | null | undefined` | No  |     |     |
| `as`         | `"div"`                                                                                                                                               | No         |         |                                  |
| `ref`        | `Ref<HTMLDivElement>`                                                                                                                                 | No         |         |                                  |

### TreeItemPersonaLayout

The `TreeItemPersonaLayout` component is used as a child of `TreeItem` to display a `TreeItem` with a media (typically an avatar) and a description.
It provides a more visually appealing representation of a `TreeItem` and is typically used to display a list of people or topics.
This component should only be used as a direct child of `TreeItem`.

#### Props

| Name          | Type                                                                                                                                                  | Required   | Default | Description                      |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------- | ---- | ---------- | --- | --- | --- |
| `aside`       | `WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }>             | null`      | No      |                                  | Aside content is normally used to render a badge or other non-actionable content                                                                                                                                                                                                                                                                                                                                                                                          |
| `main`        | `NonNullable<WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }> | null>`     | No      |                                  | Content. Children of the root slot are automatically rendered here                                                                                                                                                                                                                                                                                                                                                                                                        |
| `expandIcon`  | `WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }>             | null`      | No      |                                  | Expand icon slot, by default renders a chevron icon to indicate opening and closing                                                                                                                                                                                                                                                                                                                                                                                       |
| `media`       | `NonNullable<WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }> | null>`     | No      |                                  | Avatar to display.                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `description` | `WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }>             | null`      | No      |                                  | Secondary text that describes or complements the content                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `actions`     | `WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; } & { ...; }>  | null`      | No      |                                  | Actionable elements are normally buttons, menus, or other focusable elements. Those elements are only visibly available if the given tree item is currently active. `actions` and `aside` slots are positioned on the exact same spot, so they won't be visible at the same time. `aside` slot is visible by default meanwhile `actions` slot are only visible when the tree item is active. `actions` slot supports a `visible` prop to force visibility of the actions. |
| `selector`    | `(Omit<ComponentProps<Partial<CheckboxSlots>, "input">, "defaultChecked"                                                                              | "onChange" | "size"  | "checked"> & { checked?: boolean | ... 1 more ...; ... 5 more ...; size?: "medium"                                                                                                                                                                                                                                                                                                                                                                                                                           | ... 1 more ...; } & RefAttributes<...>) | (Omit<...> & ... 1 more ... & RefAttributes<...>) | null | undefined` | No  |     |     |
| `as`          | `"div"`                                                                                                                                               | No         |         |                                  |
| `ref`         | `Ref<HTMLDivElement>`                                                                                                                                 | No         |         |                                  |

### FlatTree

The `FlatTree` component is a variation of the `Tree` component that deals with a flattened data structure.

It should be used on cases where more complex interactions with a Tree is required.
On simple scenarios it is advised to simply use a nested structure instead.

#### Props

| Name              | Type                                                                       | Required                                                                          | Default   | Description                                                                                                                                                                                                                                                                            |
| ----------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `collapseMotion`  | `PresenceMotionSlotProps                                                   | null`                                                                             | No        |                                                                                                                                                                                                                                                                                        |                                                                                                                                                                                                                                                                                              |
| `as`              | `"div"`                                                                    | No                                                                                |           |                                                                                                                                                                                                                                                                                        |
| `navigationMode`  | `"tree" "treegrid"`                                                        | No                                                                                | 'tree'    | Indicates how navigation between a treeitem and its actions work - 'tree' (default): The default navigation, pressing right arrow key navigates inward the first inner children of a branch treeitem - 'treegrid': Pressing right arrow key navigate towards the actions of a treeitem |
| `appearance`      | `"subtle" "transparent" "subtle-alpha"`                                    | No                                                                                | 'subtle'  | A tree item can have various appearances: - 'subtle' (default): The default tree item styles. - 'subtle-alpha': Minimizes emphasis on hovered or focused states. - 'transparent': Removes background color.                                                                            |
| `size`            | `"small" "medium"`                                                         | No                                                                                | 'medium'  | Size of the tree item.                                                                                                                                                                                                                                                                 |
| `openItems`       | `Iterable<TreeItemValue>`                                                  | No                                                                                |           | This refers to a list of ids of opened tree items. Controls the state of the open tree items. These property is ignored for subtrees.                                                                                                                                                  |
| `onOpenChange`    | `((event: KeyboardEvent<HTMLElement>                                       | MouseEvent<HTMLElement, MouseEvent>, data: TreeOpenChangeData) => void)`          | No        |                                                                                                                                                                                                                                                                                        | Callback fired when the component changes value from open state. These property is ignored for subtrees. @param event - a React's Synthetic event @param data - A data object with relevant information, such as open value and type of interaction that created the event.                  |
| `onNavigation`    | `((event: KeyboardEvent<HTMLElement>                                       | MouseEvent<HTMLElement, MouseEvent>, data: TreeNavigationData_unstable) => void)` | No        |                                                                                                                                                                                                                                                                                        | Callback fired when navigation happens inside the component. These property is ignored for subtrees. FIXME: This method is not ideal, as navigation should be handled internally by tabster. @param event - a React's Synthetic event @param data - A data object with relevant information, |
| `selectionMode`   | `"multiselect" "single"`                                                   | No                                                                                | undefined | This refers to the selection mode of the tree. - undefined: No selection can be done. - 'single': Only one tree item can be selected, radio buttons are rendered. - 'multiselect': Multiple tree items can be selected, checkboxes are rendered.                                       |
| `checkedItems`    | `Iterable<TreeItemValue                                                    | [TreeItemValue, TreeSelectionValue]>`                                             | No        |                                                                                                                                                                                                                                                                                        | This refers to a list of ids of checked tree items, or a list of tuples of ids and checked state. Controls the state of the checked tree items. These property is ignored for subtrees.                                                                                                      |
| `onCheckedChange` | `((event: ChangeEvent<HTMLElement>, data: TreeCheckedChangeData) => void)` | No                                                                                |           | Callback fired when the component changes value from checked state. These property is ignored for subtrees. @param event - a React's Synthetic event @param data - A data object with relevant information, such as checked value and type of interaction that created the event.      |
| `ref`             | `Ref<HTMLDivElement>`                                                      | No                                                                                |           |                                                                                                                                                                                                                                                                                        |

### FlatTreeItem

The `FlatTreeItem` component represents a single item in a flat tree.

#### Props

| Name           | Type                             | Required                                                                     | Default | Description                                                                                                                                                                                                                                                            |
| -------------- | -------------------------------- | ---------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `as`           | `"div"`                          | No                                                                           |         |                                                                                                                                                                                                                                                                        |
| `value`        | `string                          | number`                                                                      | No      |                                                                                                                                                                                                                                                                        | A tree item should have a well defined value, in case one is not provided by the user by this prop one will be inferred internally. |
| `open`         | `boolean`                        | No                                                                           |         | Whether the tree item is in an open state This overrides the open value provided by the root tree, and ensure control of the visibility of the tree item per tree item. NOTE: controlling the open state of a tree item will not affect the open state of its children |
| `onOpenChange` | `((e: KeyboardEvent<HTMLElement> | MouseEvent<HTMLElement, MouseEvent>, data: TreeItemOpenChangeData) => void)` | No      |                                                                                                                                                                                                                                                                        |                                                                                                                                     |
| `parentValue`  | `TreeItemValue`                  | No                                                                           |         | This property is inferred through context on a nested tree, and required for a flat tree.                                                                                                                                                                              |
| `ref`          | `Ref<HTMLDivElement>`            | No                                                                           |         |                                                                                                                                                                                                                                                                        |

## Examples

### Actions

In addition to `aside` slot, both tree item layouts support `actions` slot that can be used for tasks such as edit, rename, or triggering a menu.
`actions` and `aside` slots are positioned on the exact same spot, so they won't be visible at the same time. `aside` slot is visible by default meanwhile `actions` slot are only visible when the tree item is active (by hovering or by navigating to it). `actions` slot supports a `visible` prop to force visibility of the actions.

The `actions` slot has a `role="toolbar"` and ensures proper horizontal navigation with the keyboard by using [`useArrowNavigationGroup`](https://react.fluentui.dev/?path=/docs/utilities-focus-management-usearrownavigationgroup--default).

> ⚠️ Although `actions` are easy to navigate, they're not an expected pattern according to [WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/).providing a context menu with the same functionalities as the actions is recommended to ensure your tree item is accessible.

In the example below, we compose on top of `TreeItem` component to include both a context menu and actions that provide the same amount of functionalities. We also provide an `aria-description` to the tree item to indicate that it has actions. This is a new behavior that the user might not be aware of, so you might need to explain somewhere else in the UI what does having actions refers to.

> ⚠️ Don't forget to add a proper description to `TreeItem` to ensure screen readers have enough information to understand the context

> ⚠️ Actions are still experimental and user experience might change in the future.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Tree, TreeItem, TreeItemLayout, TreeItemProps } from '@fluentui/react-components';
import { Edit20Regular, MoreHorizontal20Regular } from '@fluentui/react-icons';
import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  useRestoreFocusTarget,
} from '@fluentui/react-components';

type CustomTreeItemProps = TreeItemProps & { children?: React.ReactNode };

const CustomTreeItem = ({ children, ...props }: CustomTreeItemProps) => {
  const focusTargetAttribute = useRestoreFocusTarget();
  const [layoutChildren, subtree] = React.Children.toArray(children);

  // same items to be used between contextmenu and actions
  const commonMenuItems = (
    <>
      <MenuItem>New </MenuItem>
      <MenuItem>New Window</MenuItem>
      <MenuItem disabled>Open File</MenuItem>
      <MenuItem>Open Folder</MenuItem>
    </>
  );

  return (
    <Menu positioning="below-end" openOnContext>
      <MenuTrigger disableButtonEnhancement>
        <TreeItem aria-description="has actions" {...focusTargetAttribute} {...props}>
          <TreeItemLayout
            actions={
              <>
                <Button aria-label="Edit" appearance="subtle" icon={<Edit20Regular />} />
                <Menu>
                  <MenuTrigger disableButtonEnhancement>
                    <Button aria-label="More options" appearance="subtle" icon={<MoreHorizontal20Regular />} />
                  </MenuTrigger>
                  <MenuPopover>
                    <MenuList>{commonMenuItems}</MenuList>
                  </MenuPopover>
                </Menu>
              </>
            }
          >
            {layoutChildren}
          </TreeItemLayout>
          {subtree}
        </TreeItem>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem>Edit</MenuItem>
          {commonMenuItems}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

export const Actions = (): JSXElement => {
  return (
    <Tree aria-label="Actions">
      <CustomTreeItem itemType="branch">
        item 1
        <Tree>
          <CustomTreeItem itemType="branch">
            item 1-1
            <Tree>
              <CustomTreeItem itemType="leaf">item 1-1-1</CustomTreeItem>
              <CustomTreeItem itemType="leaf">item 1-1-2</CustomTreeItem>
              <CustomTreeItem itemType="leaf">item 1-1-3</CustomTreeItem>
            </Tree>
          </CustomTreeItem>
          <CustomTreeItem itemType="leaf">item 1-2</CustomTreeItem>
          <CustomTreeItem itemType="leaf">item 1-3</CustomTreeItem>
        </Tree>
      </CustomTreeItem>
      <CustomTreeItem itemType="branch">
        item 2
        <Tree>
          <CustomTreeItem itemType="branch">
            item 2-1
            <Tree>
              <CustomTreeItem itemType="leaf">item 2-1-1</CustomTreeItem>
            </Tree>
          </CustomTreeItem>

          <CustomTreeItem itemType="branch">
            item 3
            <Tree>
              <CustomTreeItem itemType="leaf">item 3-1</CustomTreeItem>
              <CustomTreeItem itemType="leaf">item 3-2</CustomTreeItem>
              <CustomTreeItem itemType="leaf">item 3-3</CustomTreeItem>
            </Tree>
          </CustomTreeItem>
        </Tree>
      </CustomTreeItem>
    </Tree>
  );
};
```

### Appearance

A tree can have the following `appearance` variants:

- `subtle`: the default appearance.
- `subtle-alpha`: minimizes emphasis on hovered or focused states.
- `transparent`: no background color.

Both `TreeItemLayout` and `TreeItemPersonaLayout` will respond to the appearance variants.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Avatar, Tree, TreeItem, TreeItemLayout, TreeItemPersonaLayout } from '@fluentui/react-components';

export const Appearance = (): JSXElement => {
  return (
    <>
      <Tree aria-label="Default Appearance">
        <TreeItem itemType="branch">
          <TreeItemLayout>Default appearance</TreeItemLayout>
          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 1</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 2</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
      <Tree aria-label="Subtle Alpha Appearance" appearance="subtle-alpha">
        <TreeItem itemType="branch">
          <TreeItemLayout>Subtle-alpha appearance</TreeItemLayout>
          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 1</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 2</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
      <Tree aria-label="Transparent Appearance" appearance="transparent">
        <TreeItem itemType="branch">
          <TreeItemLayout>Transparent appearance</TreeItemLayout>
          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 1</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 2</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
      <hr />
      <Tree aria-label="Default Appearance">
        <TreeItem itemType="branch">
          <TreeItemPersonaLayout
            media={<Avatar name="Default" aria-label="Default appearance avatar placeholder" color="colorful" />}
          >
            Default appearance
          </TreeItemPersonaLayout>
          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemPersonaLayout media={<Avatar aria-label="Avatar placeholder" color="colorful" />}>
                level 2, item 1
              </TreeItemPersonaLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemPersonaLayout media={<Avatar aria-label="Avatar placeholder" color="colorful" />}>
                level 2, item 2
              </TreeItemPersonaLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
      <Tree aria-label="Subtle Alpha Appearance" appearance="subtle-alpha">
        <TreeItem itemType="branch">
          <TreeItemPersonaLayout
            media={
              <Avatar aria-label="Subtle-alpha appearance avatar placeholder" name="Subtle Alpha" color="colorful" />
            }
          >
            Subtle-alpha appearance
          </TreeItemPersonaLayout>
          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemPersonaLayout media={<Avatar aria-label="Avatar placeholder" color="colorful" />}>
                level 2, item 1
              </TreeItemPersonaLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemPersonaLayout media={<Avatar aria-label="Avatar placeholder" color="colorful" />}>
                level 2, item 2
              </TreeItemPersonaLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
      <Tree aria-label="Transparent Appearance" appearance="transparent">
        <TreeItem itemType="branch">
          <TreeItemPersonaLayout
            media={
              <Avatar aria-label="Transparent appearance avatar placeholder" name="Transparent" color="colorful" />
            }
          >
            Transparent appearance
          </TreeItemPersonaLayout>
          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemPersonaLayout media={<Avatar aria-label="Avatar placeholder" color="colorful" />}>
                level 2, item 1
              </TreeItemPersonaLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemPersonaLayout media={<Avatar aria-label="Avatar placeholder" color="colorful" />}>
                level 2, item 2
              </TreeItemPersonaLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
    </>
  );
};
```

### Aside

Both tree item layouts supports `aside` content that is displayed on the right side of a tree item. It can be used to display additional information, such as a badge with notification count or an icon indicating importance.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-components';
import { CounterBadge } from '@fluentui/react-components';
import { FluentIconsProps, Important16Regular } from '@fluentui/react-icons';

const iconStyleProps: FluentIconsProps = {
  primaryFill: 'red',
};

const AsideContent = ({ isImportant, messageCount }: { isImportant?: boolean; messageCount?: number }) => (
  <>
    {isImportant && <Important16Regular {...iconStyleProps} />}
    {messageCount && messageCount > 0 && <CounterBadge count={messageCount} color="danger" size="small" />}
  </>
);

export const Aside = (): JSXElement => (
  <Tree aria-label="Aside">
    <TreeItem itemType="branch" aria-description="Important, 3 message">
      <TreeItemLayout aside={<AsideContent isImportant={true} messageCount={3} />}>level 1, item 1</TreeItemLayout>
      <Tree>
        <TreeItem itemType="leaf" aria-description="Important">
          <TreeItemLayout aside={<AsideContent isImportant={true} />}>level 2, item 1</TreeItemLayout>
        </TreeItem>
        <TreeItem itemType="leaf" aria-description="2 messages">
          <TreeItemLayout aside={<AsideContent messageCount={2} />}>level 2, item 2</TreeItemLayout>
        </TreeItem>
      </Tree>
    </TreeItem>
    <TreeItem itemType="branch" aria-description="Important, 1 message">
      <TreeItemLayout
        aside={
          <>
            <AsideContent isImportant={true} messageCount={1} />
          </>
        }
      >
        level 1, item 2
      </TreeItemLayout>

      <Tree>
        <TreeItem itemType="branch" aria-description="1 message">
          <TreeItemLayout aside={<AsideContent messageCount={1} />}>level 2, item 1</TreeItemLayout>

          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemLayout aside={<AsideContent />}>level 3, item 1</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
    </TreeItem>
  </Tree>
);
```

### Customizing Interaction

By default, every expandable TreeItem responds to clicks on both content and the expand/collapse icon. To handle these separately, listen for the `onOpenChange` event in the `Tree` component. You can check the event type to determine whether the content or the icon was clicked, allowing you to override the default behavior.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Tree,
  TreeItem,
  TreeItemLayout,
  TreeItemValue,
  TreeOpenChangeData,
  TreeOpenChangeEvent,
} from '@fluentui/react-components';

export const CustomizingInteraction = (): JSXElement => {
  const [openItems, setOpenItems] = React.useState<Iterable<TreeItemValue>>([]);
  const onOpenChange = (_e: TreeOpenChangeEvent, data: TreeOpenChangeData) => {
    if (data.type === 'Click' || data.type === 'Enter') {
      alert('click on item');
      return;
    }
    setOpenItems(data.openItems);
  };
  return (
    <Tree aria-label="Customizing Interaction" openItems={openItems} onOpenChange={onOpenChange}>
      <TreeItem itemType="branch" value="default-subtree-1">
        <TreeItemLayout>level 1, item 1</TreeItemLayout>
        <Tree>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 2</TreeItemLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem itemType="branch" value="default-subtree-2">
        <TreeItemLayout>level 1, item 2</TreeItemLayout>
        <Tree>
          <TreeItem itemType="branch" value="default-subtree-2-1">
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
            <Tree>
              <TreeItem itemType="leaf">
                <TreeItemLayout>level 3, item 1</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>
      </TreeItem>
    </Tree>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-components';

export const Default = (): JSXElement => {
  return (
    <Tree aria-label="Default">
      <TreeItem itemType="branch">
        <TreeItemLayout>level 1, item 1</TreeItemLayout>
        <Tree>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 2</TreeItemLayout>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 3</TreeItemLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem itemType="branch">
        <TreeItemLayout>level 1, item 2</TreeItemLayout>
        <Tree>
          <TreeItem itemType="branch">
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
            <Tree>
              <TreeItem itemType="leaf">
                <TreeItemLayout>level 3, item 1</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem itemType="leaf">
        <TreeItemLayout>level 1, item 3</TreeItemLayout>
      </TreeItem>
    </Tree>
  );
};
```

### Default Open

Use the `defaultOpenItems` prop in the `Tree` component to set the default open or closed state for expandable tree item components. It takes an [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol) (like an array or a set) of open IDs, opening only the `TreeItem` components with those IDs on initial render, while all others are closed.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-components';

export const DefaultOpen = (): JSXElement => (
  <Tree aria-label="Default Open" defaultOpenItems={['default-subtree-1', 'default-subtree-2', 'default-subtree-2-1']}>
    <TreeItem itemType="branch" value="default-subtree-1">
      <TreeItemLayout>level 1, item 1</TreeItemLayout>
      <Tree>
        <TreeItem itemType="leaf">
          <TreeItemLayout>level 2, item 1</TreeItemLayout>
        </TreeItem>
        <TreeItem itemType="leaf">
          <TreeItemLayout>level 2, item 2</TreeItemLayout>
        </TreeItem>
        <TreeItem itemType="leaf">
          <TreeItemLayout>level 2, item 3</TreeItemLayout>
        </TreeItem>
      </Tree>
    </TreeItem>
    <TreeItem itemType="branch" value="default-subtree-2">
      <TreeItemLayout>level 1, item 2</TreeItemLayout>
      <Tree>
        <TreeItem itemType="branch" value="default-subtree-2-1">
          <TreeItemLayout>level 2, item 1</TreeItemLayout>
          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 3, item 1</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 3, item 2</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 3, item 3</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
    </TreeItem>
  </Tree>
);
```

### Drag And Drop

The tree component **does not** offer built-in drag-and-drop functionality. Yet, it's been designed with adaptability in mind, allowing for easy integration with third-party libraries to fulfill this need.

In this example, the tree component is integrated with `@dnd-kit` to enable drag-and-drop behavior within the tree. A few key steps are involved to achieve this:

**DndContext** and **SortableContext** from `@dnd-kit` set up the necessary environment for drag-and-drop throughout the tree. Following that, **SortableTreeItem** is a component that wraps `TreeItem`, leveraging the **useSortable** hook to add drag-and-drop capabilities. Lastly, the **handleDragEnd** function ensures items are rearranged correctly after dragging.

By adopting this approach, users can easily drag and drop tree items, rearranging them as desired. The `dnd-kit` also supports virtualization. For an in-depth look and further customization options, check the [dnd-kit's documentation](https://dndkit.com/).

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  FlatTree,
  FlatTreeItem,
  TreeItemLayout,
  useHeadlessFlatTree_unstable,
  HeadlessFlatTreeItemProps,
  FlatTreeItemProps,
} from '@fluentui/react-components';

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type FlatItem = HeadlessFlatTreeItemProps & { layout: string };

const flatTreeItems: FlatItem[] = [
  { value: '1', layout: 'Parent item' },
  { value: '1-1', parentValue: '1', layout: 'Sortable item 1' },
  { value: '1-2', parentValue: '1', layout: 'Sortable item 2' },
  { value: '1-3', parentValue: '1', layout: 'Sortable item 3' },
  { value: '1-4', parentValue: '1', layout: 'Sortable item 4' },
  { value: '1-5', parentValue: '1', layout: 'Sortable item 5' },
  { value: '1-6', parentValue: '1', layout: 'Sortable item 6' },
  { value: '1-7', parentValue: '1', layout: 'Sortable item 7' },
  { value: '1-8', parentValue: '1', layout: 'Sortable item 8' },
];

const sortItems = (array: FlatItem[], from: number, to: number) => {
  const newArray = array.slice();
  const startIndex = from < 0 ? array.length + from : from;
  const item = newArray.splice(startIndex, 1)[0];
  const endIndex = to < 0 ? array.length + to : to;
  newArray.splice(endIndex, 0, item);
  return newArray;
};

const SortableTreeItem = ({ children, value, ...rest }: FlatTreeItemProps) => {
  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    id: value as UniqueIdentifier,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <FlatTreeItem ref={setNodeRef} value={value} style={style} {...attributes} {...listeners} {...rest}>
      {children}
    </FlatTreeItem>
  );
};

export const DragAndDrop = (): JSXElement => {
  const [items, setItems] = React.useState(flatTreeItems);
  const virtualTree = useHeadlessFlatTree_unstable(items, {
    defaultOpenItems: ['1'],
  });

  const handleDragEnd = React.useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setItems(prevItems => {
        const oldIndex = prevItems.findIndex(item => item.value === active.id);
        const newIndex = prevItems.findIndex(item => item.value === over?.id);
        return sortItems(prevItems, oldIndex, newIndex);
      });
    }
  }, []);

  const sortableItems = items.filter(item => item.parentValue).map(item => item.value);
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={sortableItems} strategy={verticalListSortingStrategy}>
        <FlatTree aria-label="Drag And Drop" {...virtualTree.getTreeProps()}>
          {Array.from(virtualTree.items(), item => {
            const { layout, ...itemProps } = item.getTreeItemProps();
            return item.itemType === 'leaf' ? (
              <SortableTreeItem key={item.value} {...itemProps}>
                <TreeItemLayout>{layout}</TreeItemLayout>
              </SortableTreeItem>
            ) : (
              <FlatTreeItem {...itemProps} key={item.value}>
                <TreeItemLayout>{layout}</TreeItemLayout>
              </FlatTreeItem>
            );
          })}
        </FlatTree>
      </SortableContext>
    </DndContext>
  );
};
```

### Expand Icon

Both tree item layouts can have a custom expand/collapse icon.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Tree,
  TreeItem,
  TreeItemLayout,
  TreeItemValue,
  TreeOpenChangeData,
  TreeOpenChangeEvent,
} from '@fluentui/react-components';
import { AddSquare16Regular, SubtractSquare16Regular } from '@fluentui/react-icons';

export const ExpandIcon = (): JSXElement => {
  const [openItems, setOpenItems] = React.useState<TreeItemValue[]>([]);
  const handleOpenChange = (event: TreeOpenChangeEvent, data: TreeOpenChangeData) => {
    setOpenItems(curr => (data.open ? [...curr, data.value] : curr.filter(value => value !== data.value)));
  };
  return (
    <Tree aria-label="Expand Icon" openItems={openItems} onOpenChange={handleOpenChange}>
      <TreeItem itemType="branch" value="tree-item-2">
        <TreeItemLayout
          expandIcon={openItems.includes('tree-item-2') ? <SubtractSquare16Regular /> : <AddSquare16Regular />}
        >
          level 1, item 1
        </TreeItemLayout>
        <Tree>
          <TreeItem itemType="branch" value="tree-item-3">
            <TreeItemLayout
              expandIcon={openItems.includes('tree-item-3') ? <SubtractSquare16Regular /> : <AddSquare16Regular />}
            >
              level 2, item 1
            </TreeItemLayout>
            <Tree>
              <TreeItem itemType="leaf">
                <TreeItemLayout>level 3, item 1</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem itemType="branch" value="tree-item-1">
        <TreeItemLayout
          expandIcon={openItems.includes('tree-item-1') ? <SubtractSquare16Regular /> : <AddSquare16Regular />}
        >
          level 1, item 2
        </TreeItemLayout>
        <Tree>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 2</TreeItemLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
    </Tree>
  );
};
```

### Flat Tree

The `FlatTree` component is a simplified version of `Tree`. It enables a more efficient and flexible way to manage tree structures by representing them in a flattened format. Unlike nested trees, flat trees simplify many common tasks such as searching or adding/removing items, and they are essential for supporting features like virtualization.

To ensure a `FlatTree` works accordingly a few more properties should be provided for each `TreeItem`:

- [`aria-posinset`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-posinset): the position of the treeitem in the current level of the tree.
- [`aria-setsize`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-setsize): the number of siblings in a level of the tree.
- [`aria-level`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-level): the current level of the treeitem.
- `parentValue`: the `value` property of the parent item of the current item.

> `FlatTreeItem` component is available to ensure those properties are properly provided (it's equivalent to `TreeItem` but with those properties listed above as required).

Another limitation of the `FlatTree` is that it becomes the user's responsibility to ensure proper open items are visible,
Since in a flat structure there's no proper way to assume if an item is visible or not by context.

> Take a look at the [`useHeadlessFlatTree`](#use-headless-flat-tree) hook to delegate the responsibility of filtering visible items and also to ensure proper properties are added to each `TreeItem`.

> If you need to utilize a nested tree with `FlatTree`, simply convert it to the flat format using the `flattenTree` helper.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  FlatTree,
  FlatTreeItem,
  TreeItemLayout,
  TreeItemValue,
  TreeOpenChangeData,
  TreeOpenChangeEvent,
} from '@fluentui/react-components';

export const FlatTreeStory = (): JSXElement => {
  const [openItems, setOpenItems] = React.useState<Set<TreeItemValue>>(() => new Set());
  const handleOpenChange = (event: TreeOpenChangeEvent, data: TreeOpenChangeData) => {
    setOpenItems(data.openItems);
  };
  return (
    <FlatTree openItems={openItems} onOpenChange={handleOpenChange} aria-label="Flat Tree">
      <FlatTreeItem value="1" aria-level={1} aria-setsize={2} aria-posinset={1} itemType="branch">
        <TreeItemLayout>Item 1, level 1</TreeItemLayout>
      </FlatTreeItem>
      {openItems.has('1') && (
        <>
          <FlatTreeItem parentValue="1" value="1-1" aria-level={2} aria-setsize={2} aria-posinset={1} itemType="leaf">
            <TreeItemLayout>Item 1, level 2</TreeItemLayout>
          </FlatTreeItem>
          <FlatTreeItem parentValue="1" value="1-2" aria-level={2} aria-setsize={2} aria-posinset={2} itemType="leaf">
            <TreeItemLayout>Item 1, level 2</TreeItemLayout>
          </FlatTreeItem>
        </>
      )}
      <FlatTreeItem value="2" aria-level={1} aria-setsize={2} aria-posinset={1} itemType="branch">
        <TreeItemLayout>Item 1, level 1</TreeItemLayout>
      </FlatTreeItem>
      {openItems.has('2') && (
        <>
          <FlatTreeItem parentValue="2" value="2-1" aria-level={2} aria-setsize={3} aria-posinset={1} itemType="leaf">
            <TreeItemLayout>Item 1, level 2</TreeItemLayout>
          </FlatTreeItem>
          <FlatTreeItem parentValue="2" value="2-2" aria-level={2} aria-setsize={3} aria-posinset={2} itemType="leaf">
            <TreeItemLayout>Item 2, level 2</TreeItemLayout>
          </FlatTreeItem>
          <FlatTreeItem parentValue="2" value="2-3" aria-level={2} aria-setsize={3} aria-posinset={3} itemType="leaf">
            <TreeItemLayout>Item 3, level 2</TreeItemLayout>
          </FlatTreeItem>
        </>
      )}
    </FlatTree>
  );
};
```

### Icon Before And After

`TreeItemLayout` component allows you to add icons before or after the content.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-components';
import { Image20Regular, LockClosed20Regular, Person20Regular, Warning20Regular } from '@fluentui/react-icons';

export const IconBeforeAndAfter = (): JSXElement => {
  return (
    <Tree aria-label="Icon Before & After">
      <TreeItem itemType="branch">
        <TreeItemLayout iconBefore={<Image20Regular />} iconAfter={<LockClosed20Regular />}>
          level 1, item 1
        </TreeItemLayout>
        <Tree>
          <TreeItem itemType="leaf">
            <TreeItemLayout iconBefore={<Person20Regular />}>icon before</TreeItemLayout>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemLayout iconBefore={<Person20Regular />}>icon before</TreeItemLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem itemType="branch">
        <TreeItemLayout iconBefore={<Image20Regular />} iconAfter={<LockClosed20Regular />}>
          level 1, item 2
        </TreeItemLayout>
        <Tree>
          <TreeItem itemType="leaf">
            <TreeItemLayout iconAfter={<Warning20Regular />}>icon after</TreeItemLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
    </Tree>
  );
};
```

### Infinite Scrolling

This example takes the previous lazy loading concept a step further by adding infinite scrolling. As the user navigates through the tree, additional items are loaded incrementally, enhancing the responsiveness and scalability of the tree.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  FlatTree,
  FlatTreeItem,
  TreeItemLayout,
  HeadlessFlatTreeItemProps,
  useHeadlessFlatTree_unstable,
  TreeItemValue,
} from '@fluentui/react-components';
import { makeStyles, Spinner } from '@fluentui/react-components';

const ITEMS_PER_PAGE = 10;
const MAX_PAGES = 4;

const pinnedItems = [
  { value: 'pinned', name: 'Pinned', id: 'pinned' },
  { value: 'pinned-item-1', parentValue: 'pinned', name: 'Pinned item 1' },
  { value: 'pinned-item-2', parentValue: 'pinned', name: 'Pinned item 2' },
  { value: 'pinned-item-3', parentValue: 'pinned', name: 'Pinned item 3' },
];

interface FetchResult {
  results: { name: string }[];
}

type CustomItem = HeadlessFlatTreeItemProps & {
  name: string | React.ReactNode;
};

const useStyles = makeStyles({
  container: {
    height: '400px',
    paddingBottom: '10px',
    overflow: 'auto',
  },
  screenReadersOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    margin: '-1',
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    whiteSpace: 'nowrap',
  },
});

export const InfiniteScrolling = (): JSXElement => {
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);

  const [ariaMessage, setAriaMessage] = React.useState('');
  const itemToFocusRef = React.useRef<HTMLDivElement>(null);
  const [itemToFocusValue, setItemToFocusValue] = React.useState<TreeItemValue>();

  const peopleItems = useQuery<CustomItem[]>([
    { value: 'people', name: 'People' },
    ...Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
      value: `person-${index + 1}`,
      parentValue: 'people',
      name: `Person ${index + 1}`,
    })),
  ]);

  const items = React.useMemo<CustomItem[]>(
    () => [
      ...pinnedItems,
      ...peopleItems.value,
      ...(isLoading
        ? [
            {
              value: 'loading-people',
              parentValue: 'people',
              name: <Spinner aria-label="Loading more people" size="tiny" />,
            },
          ]
        : []),
    ],

    [isLoading, peopleItems],
  );

  const styles = useStyles();

  const flatTree = useHeadlessFlatTree_unstable(items, {
    defaultOpenItems: ['pinned', 'people'],
  });

  const fetchMoreItems = async () => {
    setIsLoading(true);
    setAriaMessage(`loading more people...`);

    const json = await mockFetchPeople(page);
    const fetchedItems = json.results.map<CustomItem>(person => ({
      value: `person-${person.name}`,
      parentValue: 'people',
      name: person.name,
    }));
    const firstNewItemValue = fetchedItems[0].value;

    await peopleItems.query(() => [...peopleItems.value, ...fetchedItems]);

    setIsLoading(false);
    setPage(prev => prev + 1);
    setAriaMessage(`${fetchedItems.length} new people loaded`);
    setItemToFocusValue(firstNewItemValue);
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    const hasReachedEnd = scrollHeight - scrollTop === clientHeight;

    if (!isLoading && hasReachedEnd && page < MAX_PAGES) {
      fetchMoreItems();
    }
  };

  React.useEffect(() => {
    if (itemToFocusRef.current) {
      itemToFocusRef.current.focus();
      setItemToFocusValue(undefined);
    }
  }, [itemToFocusValue]);

  return (
    <>
      <FlatTree
        {...flatTree.getTreeProps()}
        aria-label="Infinite Scrolling"
        onScroll={handleScroll}
        className={styles.container}
      >
        {Array.from(flatTree.items(), flatTreeItem => {
          const { name, value, ...treeItemProps } = flatTreeItem.getTreeItemProps();
          return (
            <FlatTreeItem
              {...treeItemProps}
              key={value}
              value={value}
              ref={value === itemToFocusValue ? itemToFocusRef : undefined}
            >
              <TreeItemLayout>{name}</TreeItemLayout>
            </FlatTreeItem>
          );
        })}
      </FlatTree>

      <AriaLive content={ariaMessage} />
    </>
  );
};

const AriaLive = ({ content }: { content: string | undefined }) => {
  const styles = useStyles();
  return (
    <div aria-live="polite" aria-atomic="true" className={styles.screenReadersOnly}>
      {content}
    </div>
  );
};

/**
 * This function is just for the sake of the example,
 * a library for fetching data (like react-query) might be a better option
 */
function useQuery<Value>(initialValue: Value) {
  const [queryResult, setQueryResult] = React.useState({
    value: initialValue,
    isLoading: false,
    isLoaded: false,
  });
  const query = (fn: () => Promise<Value> | Value) => {
    setQueryResult(curr => ({ ...curr, isLoading: true }));
    Promise.resolve(fn()).then(nextValue => {
      setQueryResult({ value: nextValue, isLoaded: true, isLoading: false });
    });
  };
  return { ...queryResult, query } as const;
}

function mockFetchPeople(page: number): Promise<FetchResult> {
  return new Promise(resolve => {
    setTimeout(() => {
      const startIndex = page * ITEMS_PER_PAGE + 1;
      const results = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
        name: `Person ${startIndex + index}`,
      }));

      resolve({ results });
    }, 1000);
  });
}
```

### Inline Styling Tree Item Level

The tree component supports nested styling up to 10 levels, limited by performance considerations. For more than 10 levels of nesting, use dynamic styling instead. Below is an example of how to apply custom inline styles to create dynamic tree item levels, overriding the default static styles.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Tree,
  TreeItem,
  TreeItemLayout,
  treeItemLevelToken,
  useSubtreeContext_unstable,
} from '@fluentui/react-components';

export const InlineStylingTreeItemLevel = (): JSXElement => {
  const { level } = useSubtreeContext_unstable();
  return level === 0 ? (
    <Tree aria-label="Inline Styling Tree Item Level">
      <InlineStylingTreeItemLevel />
    </Tree>
  ) : (
    <TreeItem value={level} itemType="branch" style={{ [treeItemLevelToken]: level }}>
      <TreeItemLayout>{`level ${level}, item 1`}</TreeItemLayout>
      <Tree>
        <InlineStylingTreeItemLevel />
      </Tree>
    </TreeItem>
  );
};
```

### Layouts

Tree items support two layout components: `TreeItemLayout` and `TreeItemPersonaLayout`. Both of these layouts come with specific sets of properties, making them suitable for different use cases.

Please refer to the table at the top of this page for a detailed comparison of the properties available for both `TreeItemLayout` and `TreeItemPersonaLayout`. Notably, some properties like `iconBefore`, `iconAfter`, `media`, and `description` are unique to one layout or the other, enabling more specialized customization depending on your needs.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Tree, TreeItem, TreeItemLayout, TreeItemPersonaLayout } from '@fluentui/react-components';
import { Avatar } from '@fluentui/react-components';

export const Layouts = (): JSXElement => {
  return (
    <>
      <Tree aria-label="Default Layout">
        <TreeItem itemType="branch">
          <TreeItemLayout>Tree using TreeItemLayout</TreeItemLayout>
          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 1</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 2</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 3</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>

      <Tree aria-label="Persona Layout">
        <TreeItem itemType="branch">
          <TreeItemPersonaLayout media={<Avatar image={{ alt: 'avatar' }} />}>
            Tree using TreeItemPersonaLayout
          </TreeItemPersonaLayout>
          <Tree>
            <TreeItem itemType="leaf">
              <TreeItemPersonaLayout media={<Avatar image={{ alt: 'avatar' }} />} description="with description">
                level 2, item 1
              </TreeItemPersonaLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemPersonaLayout
                media={<Avatar image={{ alt: 'avatar' }} shape="square" />}
                description="square shape media"
              >
                level 2, item 2
              </TreeItemPersonaLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemPersonaLayout description="without media">level 2, item 3</TreeItemPersonaLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
    </>
  );
};
```

### Lazy Loading

This example shows lazy loading in a flat tree, where data is loaded on-demand to optimize rendering time and performance. Items are dynamically loaded when necessary.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  FlatTree,
  FlatTreeItem,
  TreeItemLayout,
  TreeItemValue,
  Spinner,
  makeStyles,
  TreeItemOpenChangeData,
  TreeItemOpenChangeEvent,
} from '@fluentui/react-components';

interface Entity {
  name: string;
  value: string;
}

type SubtreeProps = {
  value: TreeItemValue;
  onDataLoading?(): void;
  onDataLoaded?(): void;
};

const useStyles = makeStyles({
  screenReadersOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    margin: '-1',
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    whiteSpace: 'nowrap',
  },
});

export const LazyLoading = (): JSXElement => {
  const [ariaMessage, setAriaMessage] = React.useState('');
  const styles = useStyles();
  return (
    <>
      <FlatTree aria-label="Lazy Loading">
        <Subtree
          value="People"
          onDataLoaded={React.useCallback(() => setAriaMessage(`people items loaded`), [])}
          onDataLoading={React.useCallback(() => setAriaMessage(`loading people items...`), [])}
        />

        <Subtree
          value="Planet"
          onDataLoaded={React.useCallback(() => setAriaMessage(`planet items loaded`), [])}
          onDataLoading={React.useCallback(() => setAriaMessage(`loading planet items...`), [])}
        />

        <Subtree
          value="Starship"
          onDataLoaded={React.useCallback(() => setAriaMessage(`starship items loaded`), [])}
          onDataLoading={React.useCallback(() => setAriaMessage(`loading starship items...`), [])}
        />
      </FlatTree>
      <div aria-live="polite" aria-atomic="true" className={styles.screenReadersOnly}>
        {ariaMessage}
      </div>
    </>
  );
};

const Subtree: React.FC<SubtreeProps> = ({ onDataLoaded, onDataLoading, value }) => {
  const [open, setOpen] = React.useState(false);
  // useQuery here is just a helper to simulate async data fetching
  // you can use any other async data fetching library like react-query, swr, etc.
  const { query, value: items, state } = useQuery<Entity[]>([]);

  // we need to focus the first item when the subtree is opened
  const firstItemRef = React.useRef<HTMLDivElement>(null);

  const handleOpenChange = React.useCallback(
    (e: TreeItemOpenChangeEvent, data: TreeItemOpenChangeData) => {
      setOpen(data.open);
    },
    [setOpen],
  );

  React.useEffect(() => {
    if (open && state === 'idle') {
      onDataLoading?.();
      query(async () => {
        // mockFetch is just a helper to simulate an API endpoint.
        // you probably will be using some custom API endpoint here.
        const json = await mockFetch(value.toString());
        return json.results.map<Entity>(entity => ({
          value: `${value}/${entity.name}`,
          name: entity.name,
        }));
      });
    }
  }, [open, onDataLoading, query, state, value]);

  React.useEffect(() => {
    if (open && state === 'loaded') {
      onDataLoaded?.();
      firstItemRef.current?.focus();
    }
  }, [open, state, onDataLoaded]);

  return (
    <>
      <FlatTreeItem
        value={value}
        aria-level={1}
        aria-setsize={3}
        aria-posinset={1}
        itemType="branch"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <TreeItemLayout expandIcon={state === 'loading' ? <Spinner size="tiny" /> : undefined}>
          {value.toString()}
        </TreeItemLayout>
      </FlatTreeItem>
      {open &&
        items.map((item, index) => (
          <FlatTreeItem
            key={item.value}
            ref={index === 0 ? firstItemRef : null}
            parentValue={value}
            value={item.value}
            aria-level={2}
            aria-setsize={items.length}
            aria-posinset={index + 1}
            itemType="leaf"
          >
            <TreeItemLayout>{item.name}</TreeItemLayout>
          </FlatTreeItem>
        ))}
    </>
  );
};
```

### Manipulation

With a flat tree structure, you can easily manipulate the tree and control its state. In the example below, you can add or remove tree items by working with the `parentValue` property, which ensures the correct parent-child relationships within the tree

> ⚠️ When manipulating tree items, ensure that continuity of keyboard navigation is preserved and prevent unexpected focus loss. This example demonstrates a method for maintaining user focus throughout interactions.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  FlatTree,
  FlatTreeItem,
  TreeItemLayout,
  HeadlessFlatTreeItemProps,
  useHeadlessFlatTree_unstable,
  TreeItemValue,
  FlatTreeItemProps,
} from '@fluentui/react-components';
import { Delete20Regular } from '@fluentui/react-icons';
import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  useRestoreFocusTarget,
} from '@fluentui/react-components';

type ItemProps = HeadlessFlatTreeItemProps & { content: string };

const subtrees: ItemProps[][] = [
  [
    { value: '1', content: 'Level 1, item 1' },
    { value: '1-1', parentValue: '1', content: 'Item 1-1' },
    { value: '1-2', parentValue: '1', content: 'Item 1-2' },
  ],

  [
    { value: '2', content: 'Level 1, item 2' },
    { value: '2-1', parentValue: '2', content: 'Item 2-1' },
  ],
];

type CustomTreeItemProps = FlatTreeItemProps & {
  onRemoveItem?: (value: string) => void;
};

const CustomTreeItem = React.forwardRef(
  ({ onRemoveItem, ...props }: CustomTreeItemProps, ref: React.Ref<HTMLDivElement> | undefined) => {
    const focusTargetAttribute = useRestoreFocusTarget();
    const level = props['aria-level'];
    const value = props.value as string;
    const isItemRemovable = level !== 1 && !value.endsWith('-btn');

    const handleRemoveItem = React.useCallback(() => {
      onRemoveItem?.(value);
    }, [value, onRemoveItem]);

    return (
      <Menu positioning="below-end" openOnContext>
        <MenuTrigger disableButtonEnhancement>
          <FlatTreeItem aria-description="has actions" {...focusTargetAttribute} {...props} ref={ref}>
            <TreeItemLayout
              actions={
                isItemRemovable ? (
                  <Button
                    aria-label="Remove item"
                    appearance="subtle"
                    onClick={handleRemoveItem}
                    icon={<Delete20Regular />}
                  />
                ) : undefined
              }
            >
              {props.children}
            </TreeItemLayout>
          </FlatTreeItem>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem onClick={handleRemoveItem}>Remove item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    );
  },
);

export const Manipulation = (): JSXElement => {
  const [trees, setTrees] = React.useState(subtrees);
  const itemToFocusRef = React.useRef<HTMLDivElement>(null);
  const [itemToFocusValue, setItemToFocusValue] = React.useState<TreeItemValue>();

  const handleClick = (value: string) => {
    // casting here to string as no number values are used in this example
    if (value.endsWith('-btn')) {
      const subtreeIndex = Number(value[0]) - 1;
      addFlatTreeItem(subtreeIndex);
    }
  };

  const addFlatTreeItem = (subtreeIndex: number) =>
    setTrees(currentTrees => {
      const lastItem = currentTrees[subtreeIndex][currentTrees[subtreeIndex].length - 1];
      const newItemValue = `${subtreeIndex + 1}-${Number(lastItem.value.toString().slice(2)) + 1}`;
      setItemToFocusValue(newItemValue);
      const nextSubTree: ItemProps[] = [
        ...currentTrees[subtreeIndex],
        {
          value: newItemValue,
          parentValue: currentTrees[subtreeIndex][0].value,
          content: `New item ${newItemValue}`,
        },
      ];

      return [...currentTrees.slice(0, subtreeIndex), nextSubTree, ...currentTrees.slice(subtreeIndex + 1)];
    });

  const removeFlatTreeItem = React.useCallback(
    (value: string) =>
      setTrees(currentTrees => {
        const subtreeIndex = Number(value[0]) - 1;
        const currentSubTree = trees[subtreeIndex];
        const itemIndex = currentSubTree.findIndex(item => item.value === value);
        const nextSubTree = trees[subtreeIndex].filter((_item, index) => index !== itemIndex);

        const nextItemValue = currentSubTree[itemIndex + 1]?.value;
        const prevItemValue = currentSubTree[itemIndex - 1]?.value;
        setItemToFocusValue(nextItemValue || prevItemValue);

        return [...currentTrees.slice(0, subtreeIndex), nextSubTree, ...currentTrees.slice(subtreeIndex + 1)];
      }),
    [trees],
  );

  const flatTree = useHeadlessFlatTree_unstable(
    React.useMemo(
      () => [
        ...trees[0],
        {
          value: '1-btn',
          parentValue: '1',
          content: 'Add new item',
        },
        ...trees[1],
        {
          value: '2-btn',
          parentValue: '2',
          content: 'Add new item',
        },
      ],

      [trees],
    ),
    { defaultOpenItems: ['1', '2'] },
  );

  React.useEffect(() => {
    if (itemToFocusRef.current) {
      itemToFocusRef.current.focus();
      setItemToFocusValue(undefined);
    }
  }, [itemToFocusValue]);

  return (
    <FlatTree {...flatTree.getTreeProps()} aria-label="Manipulation">
      {Array.from(flatTree.items(), item => {
        const { content, ...treeItemProps } = item.getTreeItemProps();
        return (
          <CustomTreeItem
            {...treeItemProps}
            key={item.value}
            onClick={() => handleClick(item.value as string)}
            onRemoveItem={removeFlatTreeItem}
            ref={item.value === itemToFocusValue ? itemToFocusRef : undefined}
          >
            {content}
          </CustomTreeItem>
        );
      })}
    </FlatTree>
  );
};
```

### Navigation Mode Tree Grid

If `navigationMode` is set to `treegrid`, the navigation pattern changes to allow navigation between tree items and their actions.

1. If the treeitem is a branch and it's not expanded, pressing right arrow key will expand the treeitem.
2. If the treeitem is a branch and it's expanded, pressing right arrow key will navigate towards the actions of the treeitem.
3. If focused in the actions, pressing left arrow key will navigate back to the treeitem.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Tree, TreeItem, TreeItemLayout, TreeItemProps } from '@fluentui/react-components';
import { Edit20Regular, MoreHorizontal20Regular } from '@fluentui/react-icons';
import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  useRestoreFocusTarget,
} from '@fluentui/react-components';

type CustomTreeItemProps = TreeItemProps & { children?: React.ReactNode };

const CustomTreeItem = ({ children, ...props }: CustomTreeItemProps) => {
  const focusTargetAttribute = useRestoreFocusTarget();
  const [layoutChildren, subtree] = React.Children.toArray(children);

  // same items to be used between contextmenu and actions
  const commonMenuItems = (
    <>
      <MenuItem>New </MenuItem>
      <MenuItem>New Window</MenuItem>
      <MenuItem disabled>Open File</MenuItem>
      <MenuItem>Open Folder</MenuItem>
    </>
  );

  return (
    <Menu positioning="below-end" openOnContext>
      <MenuTrigger disableButtonEnhancement>
        <TreeItem aria-description="has actions" {...focusTargetAttribute} {...props}>
          <TreeItemLayout
            actions={
              <>
                <Button aria-label="Edit" appearance="subtle" icon={<Edit20Regular />} />
                <Menu>
                  <MenuTrigger disableButtonEnhancement>
                    <Button aria-label="More options" appearance="subtle" icon={<MoreHorizontal20Regular />} />
                  </MenuTrigger>
                  <MenuPopover>
                    <MenuList>{commonMenuItems}</MenuList>
                  </MenuPopover>
                </Menu>
              </>
            }
          >
            {layoutChildren}
          </TreeItemLayout>
          {subtree}
        </TreeItem>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem>Edit</MenuItem>
          {commonMenuItems}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

export const NavigationModeTreeGrid = (): JSXElement => {
  return (
    <Tree navigationMode="treegrid" aria-label="Actions">
      <CustomTreeItem itemType="branch">
        item 1
        <Tree>
          <CustomTreeItem itemType="branch">
            item 1-1
            <Tree>
              <CustomTreeItem itemType="leaf">item 1-1-1</CustomTreeItem>
              <CustomTreeItem itemType="leaf">item 1-1-2</CustomTreeItem>
              <CustomTreeItem itemType="leaf">item 1-1-3</CustomTreeItem>
            </Tree>
          </CustomTreeItem>
          <CustomTreeItem itemType="leaf">item 1-2</CustomTreeItem>
          <CustomTreeItem itemType="leaf">item 1-3</CustomTreeItem>
        </Tree>
      </CustomTreeItem>
      <CustomTreeItem itemType="branch">
        item 2
        <Tree>
          <CustomTreeItem itemType="branch">
            item 2-1
            <Tree>
              <CustomTreeItem itemType="leaf">item 2-1-1</CustomTreeItem>
            </Tree>
          </CustomTreeItem>

          <CustomTreeItem itemType="branch">
            item 3
            <Tree>
              <CustomTreeItem itemType="leaf">item 3-1</CustomTreeItem>
              <CustomTreeItem itemType="leaf">item 3-2</CustomTreeItem>
              <CustomTreeItem itemType="leaf">item 3-3</CustomTreeItem>
            </Tree>
          </CustomTreeItem>
        </Tree>
      </CustomTreeItem>
    </Tree>
  );
};
```

### Open Item Controlled

You can also control the open/closed state of a single `TreeItem` component directly. This will override the internal value of `openItems` in favor of the `open` property.

> Note: It's not recommended to use both `openItems` and `open` at the same time, as this can lead to unexpected behavior! Stick to one or the other.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Tree,
  TreeItem,
  TreeItemLayout,
  TreeItemOpenChangeData,
  TreeItemOpenChangeEvent,
} from '@fluentui/react-components';

export const OpenItemControlled = (): JSXElement => {
  const [open, setOpen] = React.useState(true);
  const handleOpenChange = (event: TreeItemOpenChangeEvent, data: TreeItemOpenChangeData) => {
    setOpen(data.open);
  };
  return (
    <Tree aria-label="Open Item Controlled">
      <TreeItem open={open} onOpenChange={handleOpenChange} itemType="branch" value="tree-item-1">
        <TreeItemLayout>level 1, item 1</TreeItemLayout>
        <Tree>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 2</TreeItemLayout>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 3</TreeItemLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem itemType="branch" value="tree-item-2">
        <TreeItemLayout>level 1, item 2</TreeItemLayout>
        <Tree>
          <TreeItem itemType="branch" value="tree-item-3">
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
            <Tree>
              <TreeItem itemType="leaf">
                <TreeItemLayout>level 3, item 1</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>
      </TreeItem>
    </Tree>
  );
};
```

### Open Items Controlled

You can also control the open/closed state of `TreeItem` components with the Tree component's `openItems` prop and `onOpenChange` callback. `openItems` takes an [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol) (like an array or a set) of open IDs, and `onOpenChange` updates it as items are opened or closed.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Tree,
  TreeItemValue,
  TreeItem,
  TreeItemLayout,
  TreeOpenChangeData,
  TreeOpenChangeEvent,
} from '@fluentui/react-components';

export const OpenItemsControlled = (): JSXElement => {
  const [openItems, setOpenItems] = React.useState<Iterable<TreeItemValue>>([]);
  const handleOpenChange = (event: TreeOpenChangeEvent, data: TreeOpenChangeData) => {
    setOpenItems(data.openItems);
  };
  return (
    <Tree aria-label="Open Items Controlled" openItems={openItems} onOpenChange={handleOpenChange}>
      <TreeItem itemType="branch" value="tree-item-1">
        <TreeItemLayout>level 1, item 1</TreeItemLayout>
        <Tree>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 2</TreeItemLayout>
          </TreeItem>
          <TreeItem itemType="leaf">
            <TreeItemLayout>level 2, item 3</TreeItemLayout>
          </TreeItem>
        </Tree>
      </TreeItem>
      <TreeItem itemType="branch" value="tree-item-2">
        <TreeItemLayout>level 1, item 2</TreeItemLayout>
        <Tree>
          <TreeItem itemType="branch" value="tree-item-3">
            <TreeItemLayout>level 2, item 1</TreeItemLayout>
            <Tree>
              <TreeItem itemType="leaf">
                <TreeItemLayout>level 3, item 1</TreeItemLayout>
              </TreeItem>
            </Tree>
          </TreeItem>
        </Tree>
      </TreeItem>
    </Tree>
  );
};
```

### Selection

The tree component offers selectable functionality in both single and multi-selection modes. You can enable this feature by passing the `selectionMode` prop with either `single` or `multiselect` value.

- `Tree`: In nested tree, you are responsible for controlling the selection state, as it would be difficult to manage the state in an uncontrolled manner without knowing the items upfront.
- `FlatTree`: In flat tree, you can take advantage of an uncontrolled state for easier management, as the items are known upfront. It is also possible to use a controlled state if you need to manage the selection state externally.

The selection process works similarly to how open/close state works. Use the `defaultCheckedItems` prop for default selections and the `checkedItems` prop and `onCheckedChange` callback to control the selected items.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  FlatTree,
  FlatTreeItem,
  TreeItemLayout,
  HeadlessFlatTreeItemProps,
  useHeadlessFlatTree_unstable,
} from '@fluentui/react-components';

const SELECTION_MODE = 'multiselect'; // change to "single" for single selection

type CustomItem = HeadlessFlatTreeItemProps & { content: string };

const items: CustomItem[] = [
  { value: '1', content: 'Level 1, item 1' },
  { value: '1-1', parentValue: '1', content: 'Level 2, item 1' },
  { value: '1-2', parentValue: '1', content: 'Level 2, item 2' },
  { value: '2', content: 'Level 1, item 2' },
  { value: '2-1', parentValue: '2', content: 'Level 2, item 1' },
  { value: '2-1-1', parentValue: '2-1', content: 'Level 3, item 1' },
  { value: '2-2', parentValue: '2', content: 'Level 2, item 2' },
  { value: '2-2-1', parentValue: '2-2', content: 'Level 3, item 1' },
  { value: '2-2-2', parentValue: '2-2', content: 'Level 3, item 2' },
  { value: '3', content: 'Level 1, item 3' },
];

export const Selection = (): JSXElement => {
  const flatTree = useHeadlessFlatTree_unstable(items, {
    defaultOpenItems: ['1', '2', '2-1', '2-2'],
    defaultCheckedItems: ['1-2'],
    selectionMode: SELECTION_MODE,
  });

  return (
    <FlatTree {...flatTree.getTreeProps()} aria-label="Selection">
      {Array.from(flatTree.items(), flatTreeItem => {
        const { content, ...treeItemProps } = flatTreeItem.getTreeItemProps();
        return (
          <FlatTreeItem {...treeItemProps} key={flatTreeItem.value}>
            <TreeItemLayout>{content}</TreeItemLayout>
          </FlatTreeItem>
        );
      })}
    </FlatTree>
  );
};
```

### Size

A tree can be displayed in a `small` or `medium` (default) size.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-components';

export const Size = (): JSXElement => {
  return (
    <>
      <Tree size="small" aria-label="Small Size Tree">
        <TreeItem itemType="branch">
          <TreeItemLayout>Small size tree</TreeItemLayout>
          <Tree>
            <TreeItem itemType="branch">
              <TreeItemLayout>level 2, item 1</TreeItemLayout>
              <Tree>
                <TreeItem itemType="leaf">
                  <TreeItemLayout>level 3, item 1</TreeItemLayout>
                </TreeItem>
              </Tree>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 2</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 3</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
      <Tree aria-label="Default Size Tree">
        <TreeItem itemType="branch">
          <TreeItemLayout>Medium size tree</TreeItemLayout>
          <Tree>
            <TreeItem itemType="branch">
              <TreeItemLayout>level 2, item 1</TreeItemLayout>
              <Tree>
                <TreeItem itemType="leaf">
                  <TreeItemLayout>level 3, item 1</TreeItemLayout>
                </TreeItem>
              </Tree>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 2</TreeItemLayout>
            </TreeItem>
            <TreeItem itemType="leaf">
              <TreeItemLayout>level 2, item 3</TreeItemLayout>
            </TreeItem>
          </Tree>
        </TreeItem>
      </Tree>
    </>
  );
};
```

### Use Headless Flat Tree

The `useHeadlessFlatTree` hook provides all the properties and all the methods required to ensure a proper functioning of a flat tree. It's arguments are:

1. a list of items to be mapped into `TreeItem`
2. an object with options that allows to control open and checked state
   - `openItems`, `defaultOpenItems` and `onOpenChange` (controlling open state)
   - `checkedItems`, `defaultCheckedItems` and `onCheckedChange` (controlling checked state)

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  FlatTree,
  TreeItem,
  // flattenTree_unstable,
  // TreeItemProps,
  TreeItemLayout,
  useHeadlessFlatTree_unstable,
  HeadlessFlatTreeItemProps,
} from '@fluentui/react-components';
import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  useRestoreFocusTarget,
} from '@fluentui/react-components';
import { Edit20Regular, MoreHorizontal20Regular } from '@fluentui/react-icons';

type FlatItem = HeadlessFlatTreeItemProps & { content: string };

const flatTreeItems: FlatItem[] = [
  { value: '1', content: 'Level 1, item 1' },
  { value: '1-1', parentValue: '1', content: 'Level 2, item 1' },
  { value: '1-2', parentValue: '1', content: 'Level 2, item 2' },
  { value: '1-3', parentValue: '1', content: 'Level 2, item 3' },
  { value: '2', content: 'Level 1, item 2' },
  { value: '2-1', parentValue: '2', content: 'Level 2, item 1' },
  { value: '2-1-1', parentValue: '2-1', content: 'Level 3, item 1' },
  { value: '2-1-1-1', parentValue: '2-1-1', content: 'Level 4, item 1' },
];

// // EXAMPLE OF NESTED TREE ITEMS BEING FLATTEN BY `flattenTree`:
// type Item = TreeItemProps & { content: React.ReactNode };

// const nestedTreeItems = [
//   {
//     value: '1',
//     content: <>level 1, item 1</>,
//     subtree: [
//       {
//         value: '1-1',
//         content: <>level 2, item 1</>,
//       },
//       {
//         value: '1-2',
//         content: <>level 2, item 2</>,
//       },
//       {
//         value: '1-3',
//         content: <>level 2, item 3</>,
//       },
//     ],
//   },
//   {
//     value: '2',
//     content: <>level 1, item 2</>,
//     subtree: [
//       {
//         value: '2-1',
//         content: <>level 2, item 1</>,
//         subtree: [
//           {
//             value: '2-1-1',
//             content: <>level 3, item 1</>,
//             subtree: [
//               {
//                 value: '2-1-1-1',
//                 content: <>level 4, item 1</>,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];

// const flatTreeItems = flattenTree_unstable<Item>(nestedTreeItems);

const ActionsExample = () => (
  <>
    <Button aria-label="Edit" appearance="subtle" icon={<Edit20Regular />} />
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button aria-label="More options" appearance="subtle" icon={<MoreHorizontal20Regular />} />
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>New</MenuItem>
          <MenuItem>New Window</MenuItem>
          <MenuItem disabled>Open File</MenuItem>
          <MenuItem>Open Folder</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  </>
);

export const UseHeadlessFlatTree = (): JSXElement => {
  const flatTree = useHeadlessFlatTree_unstable(flatTreeItems);
  const focusTargetAttribute = useRestoreFocusTarget();

  return (
    <FlatTree {...flatTree.getTreeProps()} aria-label="Flat Tree">
      {Array.from(flatTree.items(), flatTreeItem => {
        const { content, ...treeItemProps } = flatTreeItem.getTreeItemProps();
        return (
          <Menu key={flatTreeItem.value} positioning="below-end" openOnContext>
            <MenuTrigger disableButtonEnhancement>
              <TreeItem aria-description="has actions" {...focusTargetAttribute} {...treeItemProps}>
                <TreeItemLayout actions={<ActionsExample />}>{content}</TreeItemLayout>
              </TreeItem>
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItem>Edit</MenuItem>
                <MenuItem>New</MenuItem>
                <MenuItem>New Window</MenuItem>
                <MenuItem disabled>Open File</MenuItem>
                <MenuItem>Open Folder</MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
        );
      })}
    </FlatTree>
  );
};
```

### Virtualization

A tree **does not** support virtualization by default. To enable it, you'll need to adopt a custom third-party virtualization library.

By utilizing virtualization, the tree only renders the nodes that are currently visible on the screen. This significantly reduces the number of DOM nodes, leading to quicker interaction times for large trees.

In this example of a flat tree with `react-window` for virtualization, two main adjustments are necessary:

1. `Tree` component must be recomposed using composition API to use `FixedSizeList` to wrap root content.
2. Navigation will break as some nodes will not be available on the DOM (since they'll be virtualized), to fix this we'll need to provide a custom navigation handler that will scroll to the correct node before calling the default handler.

```tsx
/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  FlatTreeProps,
  FlatTreeItem,
  TreeItemLayout,
  TreeProvider,
  FlatTreeSlots,
  TreeNavigationData_unstable,
  TreeNavigationEvent_unstable,
  useFlatTree_unstable,
  HeadlessFlatTreeItemProps,
  useFlatTreeStyles_unstable,
  useFlatTreeContextValues_unstable,
  HeadlessFlatTreeItem,
  useHeadlessFlatTree_unstable,
} from '@fluentui/react-components';
import { FixedSizeList, FixedSizeListProps, ListChildComponentProps } from 'react-window';
import { ForwardRefComponent, assertSlots } from '@fluentui/react-components';

type ItemProps = HeadlessFlatTreeItemProps & { content: string };

const defaultItems: ItemProps[] = [
  {
    value: 'flatTreeItem_lvl-1_item-1',
    content: `Level 1, item 1`,
  },
  ...Array.from({ length: 300 }, (_, i) => ({
    value: `flatTreeItem_lvl-1_item-1--child:${i}`,
    parentValue: 'flatTreeItem_lvl-1_item-1',
    content: `Item ${i + 1}`,
  })),
  {
    value: 'flatTreeItem_lvl-1_item-2',
    content: `Level 1, item 2`,
  },
  ...Array.from({ length: 300 }, (_, index) => ({
    value: `flatTreeItem_lvl-1_item-2--child:${index}`,
    parentValue: 'flatTreeItem_lvl-1_item-2',
    content: `Item ${index + 1}`,
  })),
];

type FixedSizeTreeProps = Omit<FlatTreeProps, 'children'> & {
  listProps: FixedSizeListProps & { ref?: React.Ref<FixedSizeList> };
};

/**
 * FixedSizeTree is a recomposition of Tree component that uses react-window FixedSizeList to render items.
 */
const FixedSizeTree = React.forwardRef<HTMLElement, FixedSizeTreeProps>((props, ref) => {
  const state = useFlatTree_unstable(props, ref);
  useFlatTreeStyles_unstable(state);
  const contextValues = useFlatTreeContextValues_unstable(state);
  assertSlots<FlatTreeSlots>(state);
  const handleOuterRef = React.useCallback((instance: HTMLElement | null) => {
    if (instance) {
      // This element stays between the tree and treeitem
      // Due to accessibility issues this element should have role="none"
      instance.setAttribute('role', 'none');
    }
  }, []);
  return (
    <TreeProvider value={contextValues.tree}>
      <state.root>
        <FixedSizeList outerRef={handleOuterRef} {...props.listProps} />
      </state.root>
    </TreeProvider>
  );
}) as ForwardRefComponent<FixedSizeTreeProps>;

interface FixedSizeTreeItemProps extends ListChildComponentProps {
  data: HeadlessFlatTreeItem<ItemProps>[];
}

const FixedSizeTreeItem = (props: FixedSizeTreeItemProps) => {
  const flatTreeItem = props.data[props.index];
  const { content, ...treeItemProps } = flatTreeItem.getTreeItemProps();
  return (
    <FlatTreeItem {...treeItemProps} style={props.style}>
      <TreeItemLayout>{content}</TreeItemLayout>
    </FlatTreeItem>
  );
};

export const Virtualization = (): JSXElement => {
  const headlessTree = useHeadlessFlatTree_unstable(defaultItems);
  const listRef = React.useRef<FixedSizeList>(null);
  const items = React.useMemo(() => Array.from(headlessTree.items()), [headlessTree]);

  /**
   * Since navigation is not possible due to the fact that not all items are rendered,
   * we need to scroll to the next item and then invoke navigation.
   */
  const handleNavigation = (event: TreeNavigationEvent_unstable, data: TreeNavigationData_unstable) => {
    const nextItem = headlessTree.getNextNavigableItem(items, data);
    if (!nextItem) {
      return;
    }
    // if the next item is not rendered, scroll to it and try to navigate again
    if (!headlessTree.getElementFromItem(nextItem)) {
      event.preventDefault(); // preventing default disables internal navigation.
      listRef.current?.scrollToItem(nextItem.index);
      // waiting for the next animation frame to allow the list to be scrolled
      return requestAnimationFrame(() => headlessTree.navigate(data));
    }
  };

  return (
    <FixedSizeTree
      {...headlessTree.getTreeProps()}
      listProps={{
        ref: listRef,
        height: 300,
        itemCount: items.length,
        itemData: items,
        itemSize: 32,
        width: 300,
        children: FixedSizeTreeItem,
      }}
      onNavigation={handleNavigation}
      aria-label="Virtualization"
    />
  );
};
```
