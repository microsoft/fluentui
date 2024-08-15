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
