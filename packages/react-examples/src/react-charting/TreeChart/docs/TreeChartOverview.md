<div>
  <p>Tree chart component involves two types of layers of tree. </p>
  <h4>Two layer chart</h4>
  <p>
    Consists of two levels of tree, and can be navigated using tab and arrow keys, if we hover over the node,
    it reads node and its parent information using a screen reader.
  </p>
  <h4>Three layer Long composition</h4>
  <p>
    Consists of three levels of nodes, with nodes stacked one after the other. Specify{' '}
    <code>composition</code> as long to specify the long composition.
  </p>
  <h4>Three layer Compact composition</h4>
  <p>Consists of three levels of nodes, with nodes side by side and then stacked one after the other.</p>
  <p>The long and compact composition are present for only terminal nodes of a tree</p>
  Specify <code>composition</code> as compact to specify the long composition.
  <h4>Three layer Automatic composition</h4>
  <p>
    When there's constraint on the space, for nodes having more than 2 children it is implemented as compact
    and long for nodes with less than 2 children.
  </p>
  <p>
    Use <code>treeTraversal</code> to specify the tree traversal order as preOrder or levelOrder
  </p>
</div>
