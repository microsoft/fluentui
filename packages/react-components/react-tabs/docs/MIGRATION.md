# Tab and TabList Migration

### Migration from v8

1. Replace occurrences of `<Pivot>` with `<TabList>`
2. Replace occurrences of `<PivotItem>` with `<Tab>`
3. Replace `<PivotItem>` content with handling onTabSelected to show/hide associated content.
4. Move PivotItem.headerText to be the content of Tab
5. Subscribe to onTabSelected to show/hide content when a tab is selected.

### Migration from v0

1. Replace use of `<Menu>` with `<TabList>`
2. Replace items data with Tab instances, writing a `map` function as needed.
