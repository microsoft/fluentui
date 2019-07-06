List provides a base component for rendering large sets of items. It is agnostic of layout, the tile component used, and selection management. These concerns can be layered separately.

**Performance is important, and DOM content is expensive. Therefore, limit what you render.** List applies this principle by using UI virtualization. Unlike a simple `for` loop that renders all items in a set, a List only renders a subset of items, and as you scroll around, the subset of rendered content is shifted. This gives a much better experience for large sets, especially when the per-item components are complex/render-intensive/network-intensive.

List breaks down the set of items passed in into pages. Only pages within a "materialized window" are actually rendered. As that window changes due to scroll events, pages that fall outside that window are removed, and their layout space is remembered and pushed into spacer elements. This gives the user the experience of browsing massive amounts of content but only using a small number of actual elements. This gives the browser much less layout to resolve, and gives React DOM diffing much less content to worry about.

Note: if `onRenderCell` is not provided in `IListProps`, the List will attempt to render the `name` property for each object in the `items` array.

## My scrollable content isn't updating on scroll! What should I do?

Add the `data-is-scrollable="true"` attribute to your scrollable element containing the List.

By default, List will use the `<body>` element as the scrollable element. If you contain the List within a scrollable `<div>` using `overflow: auto` or `scroll`, the List needs to listen for scroll events on that element instead. On initialization, the List will traverse up the DOM looking for the first element with the `data-is-scrollable` attribute to know which element to listen to for knowing when to re-evaulate the visible window.

## My List is not re-rendering when I mutate its items! What should I do?

To determine if the List should re-render its contents, the component performs a referential equality check on the `items` array in its `shouldComponentUpdate` method. This is done to minimize the performance overhead associating with re-rendering the virtualized List pages, as recommended by the [React documentation](https://reactjs.org/docs/optimizing-performance.html#the-power-of-not-mutating-data).

As a result of this implementation, the List will not determine it should re-render if values _within_ the array are mutated. To avoid this problem, we recommend re-creating the `items` array using a method such as `Array.prototype.concat` or ES6 spread syntax shown below:

```tsx
public appendItems(): void {
  const { items } = this.state;

  this.setState({
    items: [...items, ...[{ name: 'Foo' }, { name: 'Bar' }]]
  })
}

public render(): JSX.Element {
  const { items } = this.state;

  return <List items={items} />;
}
```

Since the `items` array has been re-created, the List will conclude that its contents have changed and it should re-render the new values.
