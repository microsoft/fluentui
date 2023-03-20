<!-- <details>
<summary>
 Best Practices
</summary>

### Do

- Tree consist of `Tree`, `TreeItem`
  The Tree component should contain one or more TreeItem components as children.
  Each TreeItem component should contain a label or title, which is displayed in the Tree. This can be passed as a prop or rendered inside a TreeItemLayout or TreeItemPersonaLayout.
  If a TreeItem component has child nodes, it should contain a nested Tree component.
  Use an aria-label attribute on the Tree component to provide an accessible name for the Tree.
  Provide keyboard navigation support for the Tree, including arrow keys to navigate between nodes, Enter to expand or collapse a node, and spacebar to select a node.
  Consider providing options to customize the appearance of each TreeItem, such as through TreeItemLayout or TreeItemPersonaLayout.

- Define a clear hierarchy: The nodes in a `Tree` should be organized in a clear hierarchy, with parent nodes at higher levels and child nodes at lower levels. This helps users understand the relationships between nodes and navigate the Tree more easily.

Allow expansion and collapse of nodes: A Tree component should allow users to expand and collapse nodes as needed, so they can focus on specific parts of the hierarchy and avoid getting overwhelmed by too much information.

Provide visual cues for expanded and collapsed nodes: When a node is expanded, it should be visually distinct from when it's collapsed. For example, an expanded node could show an open icon or arrow, while a collapsed node could show a closed icon or arrow.

Use a consistent design for Tree and TreeItem: The Tree and TreeItem components should have a consistent design across all levels of the hierarchy, so users can easily recognize them as part of the same structure.

Add labels to nodes: Each node in a Tree should have a label that describes its content or purpose, so users can quickly identify what it represents.

Make the Tree accessible: Ensure that the Tree component is accessible to all users, including those who use assistive technologies like screen readers. This can be done by adding proper aria-labels, aria-expanded, and aria-selected attributes to Tree and TreeItem.

Provide alternative layouts: Provide multiple layout options for the Tree, such as TreeItemLayout or TreeItemPersonaLayout, to suit the consumer's preferences.

Flatten the Tree as an alternative: Provide an alternative way to represent the Tree structure by flattening it into a list of items. This can be useful for certain use cases where a linear list is more suitable than a hierarchical structure.

### Don't -->
