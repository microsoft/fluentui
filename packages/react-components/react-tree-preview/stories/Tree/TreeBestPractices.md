<details>
<summary>
 Best Practices
</summary>

### Do

- **Do use the `Tree` component to create a nested tree structure:** When your data naturally follows a hierarchical parent-child relationship, the `Tree` component provides a clean and intuitive way to represent this structure. **If a more complex interaction with a `Tree` is required, use `FlatTree` component instead:** In scenarios where you need to efficiently manipulate or handle large amounts of hierarchical data, the `FlatTree` component can offer performance benefits.

- **Use custom styles if the tree needs to support more than 10 levels of nesting:** Depending on your design and data requirements, you may need to adjust the styling of the tree elements to accommodate deeper nesting levels. See [inline styling tree item level](#inline-styling-tree-item-level) for more information.

- **Use the `aria-label` attribute on the root of the `Tree` component to provide an accessible name for the tree:** This attribute helps screen readers to understand the purpose of the tree, making it more accessible and inclusive.

- **If you provide additional buttons or functionality within tree items actions, make them accessible with a context menu:**

  - Ensure that any additional actions or features in tree items are accessible for both mouse and keyboard users by implementing a context menu.
  - Include an `aria-description` or `aria-describedby` on tree items with actions/context menu to offer more descriptive information about the interactions, e.g., "has actions."
  - The added functionality should not disrupt keyboard navigation within the tree.

- **Use `aria-selected=true` once a treeitem is selected in custom behaviors** Some tree utilization might use the selection feature for navigation purposes, in this case, the `aria-selected` attribute should be set to `true` once the treeitem is the current active item to indicate that it is selected for the navigation.

</details>
