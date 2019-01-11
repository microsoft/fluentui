List provides a base component for rendering large sets of items. It is agnostic of layout, the tile component used, and selection management. These concerns can be layered separately.

**Performance is important, and DOM content is expensive. Therefore limit what you render.** Unlike a simple for loop that renders all items in a set, a List uses ui virtualization. It only renders a subset of items, and as you scroll around, the subset of rendered content is shifted to what you're looking at. This gives a much better experience for large sets, especially when the per-item components are complex/render intensive/network intensive.

Lists break down the set of items passed in into pages. Only pages within a "materialized window" are actually rendered. As that window changes due to scroll events, pages that fall outside that window are removed, and their layout space is remembered and pushed into spacer elements. This gives the user the experience of browsing massive amounts of content but only using a small number of actual elements. This gives the browser much less layout to resolve, and gives React DOM diffing much less content to worry about.

Note: although `onRenderCell` is an optional member of `IListProps`, if you do not provide the method, the `List` will still attempt to render the `name` property for each object within the provided `items` array.

## My scrollable content isn't updating on scroll! What should I do?

Add the `data-is-scrollable="true"` attribute to your scrollable element containing the List.

By default, List will use the `BODY` element as the scrollable element. If you contain the List within a scrollable `DIV` using `overflow: auto` or `scroll`, the List needs to listen for scroll events on that element instead. On initialization, the List will traverse up the DOM looking for the first element with the `data-is-scrollable` attribute to know when element to listen to for knowing when to re-evaulate the visible window.
