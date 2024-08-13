### Layout

The library recommends chart width based on a 12-column layout of the page and suggests using 1 of 4 standardized heights. Product teams must take into account the complexity of the data to decide what size of chart should be used.

Any interactive node must have a label at the bottom showing the number of children, even if the node is a leaf. This helps in distinguishing between nodes that have further information and ones which do not need to be interacted with. Interactive leaf nodes will have “0 nodes” as their label.

### Content

- **Parent Node** These are the starting or root node of the tree. This can be an actual node or text labels representing the start of the hierarchy.
- **Branches** Branches are used to connect parent and child nodes. They help the user navigate through the hierarchical flow.
- **Child nodes** Child nodes have parent nodes that supersede them in the hierarchy. We distinguish them in our system as also having further child nodes that branch out.
- **Leaf nodes** Leaf nodes are terminal nodes that have no child connections.

Each node can contain a heading label followed by a text label or a metric value as demonstrated in the example below.

### Accessibility

- The chart can be navigated using tab and arrow keys. On hovering over the node, the node and its parent information is read using a screen reader.
- Use `treeTraversal` to specify the tree traversal order as `preorder` or `levelOrder`. This is used to specify the navigation order of the tree while using keyboard.

### Customizing the chart

Tree chart has the following variants.

#### Two layer chart

It displays two levels of the tree. Can be used if the space available on the screen is limited.

The long and compact composition below are applicable for terminal nodes only.

#### Three layer Long composition

Consists of three levels of nodes, with nodes stacked one after the other. Specify `composition` as long to enable this variant.

#### Three layer Compact composition

Consists of three levels of nodes, with nodes side by side and then stacked one after the other.
Specify `composition` as compact to specify this variant.

#### Three layer Automatic composition

When there is space constraint, nodes having more than 2 children are displayed as compact and nodes with less than 2 children are shown in long format.
