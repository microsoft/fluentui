<details>
<summary>
 Best Practices
</summary>

### Do

- **Do use the `Tree` component to create a nested tree structure:** When your data naturally follows a hierarchical parent-child relationship, the `Tree` component provides a clean and intuitive way to represent this structure.

- **If more complex interactions with a `Tree` is required, use `FlatTree` component instead:** In scenarios where you need to efficiently manipulate or handle large amounts of hierarchical data, the `FlatTree` component can offer performance benefits.

- **Use custom styles if the tree needs to support more than 10 levels of nesting:** Depending on your design and data requirements, you may need to adjust the styling of the tree elements to accommodate deeper nesting levels.

- **Use the `aria-label` attribute on the root of the `Tree` component to provide an accessible name for the tree:** This attribute helps screen readers to understand the purpose of the tree, making it more accessible and inclusive.

- **If you provide additional buttons or functionality within tree items, make them accessible with a context menu:** Ensure that any additional actions or features in tree items are accessible for both mouse and keyboard users by implementing a context menu. The additional functionality should not disturb keyboard navigation within the tree.

</details>
