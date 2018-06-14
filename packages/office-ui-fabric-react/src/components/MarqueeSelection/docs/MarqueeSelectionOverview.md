The MarqueeSelection component provides a service which allows the user to drag a rectangle to be drawn around
items to select them. This works in conjunction with a selection object, which can be used to generically store selection state, separate from a component that consumes the state.

MarqueeSelection also works in conjunction with the AutoScroll utility to automatically scroll the container when we drag a rectangle within the vicinity of the edges.

When a selection rectangle is dragged, we look for elements with the **data-selection-index** attribute populated. We get these elements' boundingClientRects and compare them with the root's rect to determine selection state. We update the selection state appropriately.

In virtualization cases where items that were once selected are dematerialized, we will keep the item in its
previous state until we know definitively if it's on/off. (In other words, this works with List.)
