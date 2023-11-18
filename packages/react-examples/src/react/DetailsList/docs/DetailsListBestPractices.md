### Layout

- List items are composed of selection, icon, and name columns at minimum. You can include other columns, such as date modified, or any other metadata field associated with the collection.
- Avoid using file type icon overlays to denote status of a file as it can make the entire icon unclear.
- If there are multiple lines of text in a column, consider the variable row height variant.
- Give columns ample default width to display information.

### Content

- Use sentence-style capitalization for column headers—only capitalize the first word. For more info, see [Capitalization](https://docs.microsoft.com/style-guide/capitalization) in the Microsoft Writing Style Guide.

### Accessibility

In addition to creating column headers, DetailsList also allows the manual definition of row headers. In the example below, the Name column has been specified as a row header using `isRowHeader: true`. When creating a DetailsList where one column is clearly the primary label for the row, it's best to use `isRowHeader` on that column to create a better screen reader experience navigating the table. For selectable DetailsLists, specifying a row header also gives the checkboxes a better accessible label.

### Keyboard / Hotkeys

DetailsList supports different selection modes with keyboard behavior differing based on the current selection mode.

#### All selection modes

- **Up/down arrow key**: change the current selection. When presssing up or down arrow any current selection is de-selected and the focused item is selected.
- **Ctrl + up/down arrow key**: maintain the current selection and move the focus up or down. The focused item is not selected.
- **Left/right arrow key**: select column when focused on the header.
- **Space**: select the currently focused item, de-selecting any other selected items.
- **Escape**: de-select all selected items.
- **Tab**: focus the header. Pressing tab from the header focuses the first selected item or, if no items are selected, the last focused item, or the first item in the list if no item has previously been selected or focused. Pressing tab again focuses the next element in the tab order after DetailsList.
- **Shift + tab**: focus the last selected item in the list or, if no items are selected, the last focused item, or the first item in the list if no item has previously been focused. Pressing shift + tab again focuses the header. From the header, shift + tab focuses the previous element in the tab order before DetailsList.

#### Selection mode: multiple

- **Ctrl + space**: toggle selection of the currently focused item, maintaining any other selected items.
- **Ctrl + a**: select all items.

#### Selection mode: multiple, isSelectedOnFocus = false

`isSelectedOnFocus` is a prop that, when set to false, alters DetailList's selection behavior.

- **Up/down arrow key**: change the current focus. When pressing up or down the current selection is not changed.
- **Space**: toggle selection of the currently focused item, maintaining any other selected items.

#### Selection mode: single

- **Up/down arrow key**: change the current selection. When presssing up or down arrow any current selection is de-selected and the focused item is selected.
- **Ctrl + up/down arrow key**: maintain the current selection and move the focus up or down. The focused item is not selected.

#### Selection mode: none

- **Tab/shift + tab**: works the same as other selection modes except that it does not select items, only focuses them.
- **Up/down arrow key**: change the current focus.

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
