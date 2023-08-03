A flat `Tree` by default **does not** support virtualization! As that would require the adoption of a custom virtualization library (or the implementation of an internal one). However, a flat `Tree` can be virtualized by using a custom 3rd-party virtualization library!

This technique involves creating a virtual version of the tree that only loads the visible nodes at any given time. By doing so, it reduces the number of DOM nodes that need to be rendered, which in turn improves time to interaction of large trees. This 3rd-party library renders only the items that are currently visible on the screen, which improves TTI metrics.

Takes this example of a flat `Tree` using `react-window` to ensure virtualization, a few steps are required to make this possible:

1. `Tree` component must be recomposed using composition API to use `FixedSizeList` to wrap root content.
2. Navigation will break as some nodes will not be available on the DOM (since they'll be virtualized), to fix this we'll need to provide a custom navigation handler that will scroll to the correct node before calling the default handler.
