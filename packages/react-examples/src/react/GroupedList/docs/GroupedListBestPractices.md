## FAQ

### My list is not re-rendering when I mutate its items! What should I do?

To determine if the list within the grouped list should re-render its contents, the component performs a referential equality check within its `shouldComponentUpdate` method.
This is done to minimize the performance overhead associating with re-rendering the virtualized List pages, as recommended by the [React documentation](https://reactjs.org/docs/optimizing-performance.html#the-power-of-not-mutating-data).

As a result of this implementation, the inner list will not determine it should re-render if the array values are mutated.
To avoid this problem, we recommend re-creating the items array backing the grouped list by using a method such as `Array.prototype.concat` or ES6 spread syntax shown below:

```tsx
public appendItems(): void {
  const { items } = this.state;

  this.setState({
    items: [...items, ...['Foo', 'Bar']]
  })
}

public render(): JSX.Element {
  const { items } = this.state;

  return <GroupedList items={items} />;
}
```

By re-creating the items array without mutating the values, the inner List will correctly determine its contents have changed and then it should re-render with the new values.
