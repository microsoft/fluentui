List provides a base component for rendering large sets of items. It is agnostic of layout, the tile component used, and selection management. These concerns can be layered separately.

**Performance is important, and DOM content is expensive. Therefore limit what you render.** Unlike a simple for loop that renders all items in a set, a List uses ui virtualization. It only renders a subset of items, and as you scroll around, the subset of rendered content is shifted to what you're looking at. This gives a much better experience for large sets, especially when the per-item components are complex/render intensive/network intensive.

Lists break down the set of items passed in into pages. Only pages within a "materialized window" are actually rendered. As that window changes due to scroll events, pages that fall outside that window are removed, and their layout space is remembered and pushed into spacer elements. This gives the user the experience of browsing massive amounts of content but only using a small number of actual elements. This gives the browser much less layout to resolve, and gives React DOM diffing much less content to worry about.

Note: although `onRenderCell` is an optional member of `IListProps`, if you do not provide the method, the `List` will still attempt to render the `name` property for each object within the provided `items` array.

## My scrollable content isn't updating on scroll! What should I do?

Add the `data-is-scrollable="true"` attribute to your scrollable element containing the List.

By default, List will use the `BODY` element as the scrollable element. If you contain the List within a scrollable `DIV` using `overflow: auto` or `scroll`, the List needs to listen for scroll events on that element instead. On initialization, the List will traverse up the DOM looking for the first element with the `data-is-scrollable` attribute to know when element to listen to for knowing when to re-evaulate the visible window.

## My List is not re-rendering when I mutate its items! What should I do?

To determine if the List should re-render its contents, the component performs a referential equality check within its `shouldComponentUpdate` method.
This is done to minimize the performance overhead associating with re-rendering the virtualized List pages, as recommended by the [React documentation](https://reactjs.org/docs/optimizing-performance.html#the-power-of-not-mutating-data).

As a result of this implementation, the List will not determine it should re-render if the array values are mutated.
To avoid this problem, we recommend re-creating the items array backing the List by using a method such as `Array.prototype.concat` or ES6 spread syntax shown below:

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

By re-creating the items array without mutating the values, the List will correctly determine its contents have changed and that it should re-render the new values.
