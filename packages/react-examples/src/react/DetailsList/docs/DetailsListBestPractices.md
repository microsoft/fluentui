### Layout

- List items are composed of selection, icon, and name columns at minimum. You can include other columns, such as date modified, or any other metadata field associated with the collection.
- Avoid using file type icon overlays to denote status of a file as it can make the entire icon unclear.
- If there are multiple lines of text in a column, consider the variable row height variant.
- Give columns ample default width to display information.

### Content

- Use sentence-style capitalization for column headers—only capitalize the first word. For more info, see [Capitalization] in the Microsoft Writing Style Guide.

[capitalization]: https://docs.microsoft.com/style-guide/capitalization

### FAQ

#### My scrollable content isn't updating on scroll. What should I do?

Add the `data-is-scrollable="true"` attribute to your scrollable element containing the DetailsList.

By default, the List used within DetailsList will use the `body` element as the scrollable element. If you contain the List within a scrollable `div` using `overflow: auto` or `scroll`, the List needs to listen for scroll events on that element instead. On initialization, the List will traverse up the DOM looking for the first element with the `data-is-scrollable` attribute to know which element to listen to for knowing when to re-evaulate the visible window.

#### My List is not re-rendering when I mutate its items. What should I do?

To determine if the List within DetailsList should re-render its contents, the component performs a referential equality check within its `shouldComponentUpdate` method. This is done to minimize the performance overhead associated with re-rendering the virtualized List pages, as recommended by the [React documentation](https://reactjs.org/docs/optimizing-performance.html#the-power-of-not-mutating-data).

As a result of this implementation, the inner List will not determine it should re-render if the array values are mutated.
To avoid this problem, we recommend re-creating the items array backing the DetailsList by using a method such as `Array.prototype.concat` or ES6 spread syntax shown below:

```tsx
public appendItems(): void {
  const { items } = this.state;

  this.setState({
    items: [...items, ...['Foo', 'Bar']]
  })
}

public render(): JSX.Element {
  const { items } = this.state;

  return <DetailsList items={items} />;
}
```

By re-creating the items array without mutating the values, the inner List will correctly determine its contents have changed and it should then re-render with the new values.
