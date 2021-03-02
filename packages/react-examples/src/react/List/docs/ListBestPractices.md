### Layout

- List items are composed of selection, icon, and name columns at minimum. You can include other columns, such as date modified, or any other metadata field associated with the collection.
- Avoid using file type icon overlays to denote status of a file as it can make the entire icon unclear.
- If there are multiple lines of text in a column, consider the variable row height variant.
- Give columns ample default width to display information.

### Content

- Use sentence-style capitalization—only capitalize the first word. For more info, see [Capitalization](https://docs.microsoft.com/style-guide/capitalization) in the Microsoft Writing Style Guide.

### FAQ

#### My scrollable content isn't updating on scroll, what should I do?

Add the data-is-scrollable="true" attribute to your scrollable element containing the List.

By default, the List will use the <body> element as the scrollable element. If you contain List within a scrollable <div> using overflow: auto or scroll, List needs to listen for scroll events on that element instead. On initialization, List will traverse up the DOM looking for the first element with the data-is-scrollable attribute to know which element to listen to for knowing when to re-evaulate the visible window.

#### My list isn't re-rendering when I mutate its items, what should I do?

To determine if List should re-render its contents, the component performs a referential equality check on the items array in its shouldComponentUpdate method. This is done to minimize the performance overhead associating with re-rendering the virtualized list pages, as recommended by the React documentation.
As a result of this implementation, List will not determine it should re-render if values within the array are mutated. To avoid this problem, we recommend re-creating the items array using a method such as Array.prototype.concat or ES6 spread syntax shown below:

```
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

Since the items array has been re-created, the list will conclude that its contents have changed and it should re-render the new values.

#### How do I limit rendering to improve performance?

Performance is important, and DOM content is expensive. Therefore, limit what you render. The list component applies this principle by using UI virtualization. Unlike a simple for loop that renders all items in a set, a list only renders a subset of items, and as you scroll around, the subset of rendered content is shifted. This gives a much better experience for large sets, especially when the per-item components are complex/render-intensive/network-intensive.

A list breaks down the set of items passed in into pages. Only pages within a "materialized window" are actually rendered. As that window changes due to scroll events, pages that fall outside that window are removed, and their layout space is remembered and pushed into spacer elements. This gives the user the experience of browsing massive amounts of content but only using a small number of actual elements. This gives the browser much less layout to resolve, and gives React DOM diffing much less content to worry about.

Note: If onRenderCell is not provided in IListProps, the list will attempt to render the name property for each object in the items array.
