# List migration

## Migration from v8

### Composition over configuration

Compared to its v8 counterpart, the v9 `List` uses composition over configuration when it comes to rendering items, same as other components in Fluent UI React v9. This means that instead of passing an array of items to the `List` component, it's up to you to render `ListItem` components with appropriate content.

Take this example in v8:

```js
const items = [{ name: 'John' }, { name: 'Alice' }];

const MyList = () => {
  return <List items={items} />;
};
```

becomes this in v9:

```js
const items = [{ name: 'John' }, { name: 'Alice' }];

const MyList = () => {
  return (
    <List>
      {items.map(item => {
        <ListItem key={item}>{item}</ListItem>;
      })}
    </List>
  );
};
```

### Virtualization approach

Virtualization is **not part** of `List` in Fluent UI React v9. We don't want to force any particular solution for virtualization, but we provide [examples](https://react.fluentui.dev/?path=/story/preview-components-list--virtualized-list-with-actionable-items) how to use `List` with a popular library `react-window` to get the desired effect.

This makes the API of `List` much simpler.

### v8 Property mapping

Most of the v8 props are for it's virtualization functionality. Since the v9 `List` takes a different approach, most of the props cannot be directly migrated.

| v8 List                   | v9 List                          |
| ------------------------- | -------------------------------- |
| `className`               | `className`                      |
| `componentRef`            | `componentRef`                   |
| `getItemCountForPage`     | N/A                              |
| `getKey`                  | N/A as you control the ListItems |
| `getPageHeight`           | N/A                              |
| `getPageSpecification`    | N/A                              |
| `getPageStyle`            | N/A                              |
| `ignoreScrollingState`    | N/A                              |
| `items`                   | render `<ListItem>` instead      |
| `onPageAdded`             | N/A                              |
| `onPagesUpdated`          | N/A                              |
| `onRenderCell`            | N/A                              |
| `onRenderCellConditional` | N/A                              |
| `onRenderPage`            | N/A                              |
| `onRenderRoot`            | N/A                              |
| `onRenderSurface`         | N/A                              |
| `onShouldVirtualize`      | N/A                              |
| `renderCount`             | N/A                              |
| `renderEarly`             | N/A                              |
| `renderedWindowsAhead`    | N/A                              |
| `renderedWindowsBehind`   | N/A                              |
| `role`                    | `role`                           |
| `startIndex`              | N/A                              |
| `usePageCache`            | N/A                              |
| `version`                 | N/A                              |
| -                         | `defaultSelectedItems`           |
| -                         | `onSelectionChange`              |
| -                         | `selectionMode`                  |

## Migration from v0

### Composition, also known as "Children API"

In Fluent UI React v9 we prefer to use composition over configuration where possible. List is no exception. the v0 list also supports composition API under a name of "Children API".

#### Children API component mapping

Migrating from a v9 Children API to v9 composition API is quite straighforward. You can replace the components like this:

- Use v9 `List` instead of v0 `List`
- Use v9 `ListItem` instead of v0 `List.Item`

For props please refer to [Property mapping](#v0-property-mapping) section.

#### Shorthand API

For Shorthand API things are a bit more complicated, as your code needs to me updated to use composition.

Take this example in v0:

```js
const items = [
  {
    key: 'robert',
    header: 'Robert Tolbert',
    content: 'Program the sensor to the SAS alarm through the haptic SQL card!',
  },
  {
    key: 'celeste',
    header: 'Celeste Burton',
    content: 'Use the online FTP application to input the multi-byte application!',
  },
];

const MyList = () => {
  return <List items={items} />;
};
```

becomes this in v9:

```js
const items = [
  {
    key: 'robert',
    header: 'Robert Tolbert',
    content: 'Program the sensor to the SAS alarm through the haptic SQL card!',
  },
  {
    key: 'celeste',
    header: 'Celeste Burton',
    content: 'Use the online FTP application to input the multi-byte application!',
  },
];

const MyList = () => {
  return (
    <List>
      {items.map(item => {
        <ListItem key={item.key}>
          <h2>{item.header}</h2>
          <p>{item.content}></p>
        </ListItem>;
      })}
    </List>
  );
};
```

### v0 Property mapping

Compared to its v0 counterpart, the v9 List implementation is much more generic and it **doesn't have any opinion** on how it's content should look like. This means that you will **not** find layout specific props like `header`, `headerMedia`, `content` or layout specific components. This allows for much more flexible use of the component.

We recommend using a component like `Persona` where possible, or creating a custom layout component where necessary.

#### List

| v0 List                 | v9 List                                                                                                                                                    |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accessibility`         | built in, customize with `useArrowNavigationGroup` from `tabster`                                                                                          |
| `as`                    | `as`                                                                                                                                                       |
| `className`             | `className`                                                                                                                                                |
| `debug`                 | N/A                                                                                                                                                        |
| `defaultSelectedIndex`  | `defaultSelectedItems`                                                                                                                                     |
| `design`                | N/A                                                                                                                                                        |
| `horizontal`            | N/A - will be added in the future                                                                                                                          |
| `items`                 | N/A - use `ListItem` components as Children                                                                                                                |
| `navigable`             | `navigable`                                                                                                                                                |
| `onSelectedIndexChange` | `onSelectionChange`                                                                                                                                        |
| `ref`                   | `ref`                                                                                                                                                      |
| `selectable`            | use `selectionMode` of value `single` or `multiselect`                                                                                                     |
| `selectedIndex`         | only in controlled mode, use `selection` state; see [example](https://react.fluentui.dev/?path=/story/preview-components-list--list-selection-controlled). |
| `styles`                | use slots in combination with `className`                                                                                                                  |
| `truncateContent`       | N/A - the `List` is not concerned about it's content                                                                                                       |
| `truncateHeader`        | N/A - the `List` is not concerned about it's content                                                                                                       |
| `variables`             | N/A - use slots in combination with `className`                                                                                                            |
| `wrap`                  | N/A - the `List` is not concerned about it's content                                                                                                       |

#### ListItem

| v0 ListItem       | v9 ListItem                                                                           |
| ----------------- | ------------------------------------------------------------------------------------- |
| `accessibility`   | N/A                                                                                   |
| `as`              | `as`                                                                                  |
| `className`       | `className`                                                                           |
| `content`         | N/A - use children                                                                    |
| `contentMedia`    | N/A - use children                                                                    |
| `debug`           | N/A                                                                                   |
| `design`          | N/A                                                                                   |
| `endMedia`        | N/A - use children                                                                    |
| `header`          | N/A - use children                                                                    |
| `headerMedia`     | N/A - use children                                                                    |
| `important`       | N/A                                                                                   |
| `index`           | N/A                                                                                   |
| `media`           | N/A - use children                                                                    |
| `navigable`       | N/A - use `tabIndex={0}` or `navigable` on the `List`                                 |
| `onClick`         | `onAction`                                                                            |
| `ref`             | ref                                                                                   |
| `selectable`      | N/A - use `List` props like `selectionMode`, `selectedItems` and `onSelectionChange`  |
| `selected`        | N/A - use `selectedItems` (or tracked internally when `defaultSelectedItems` is used) |
| `styles`          | N/A - use `className` for any slot                                                    |
| `truncateContent` | N/A - the `List` is not concerned about it's content                                  |
| `truncateHeader`  | N/A - the `List` is not concerned about it's content                                  |

#### Other

Other components like `ListItemContent`, `ListItemContentMedia`, `ListItemEndMedia`, `ListItemHeader`,`ListItemHeaderMedia` and `ListItemMedia` are _not_ currently present in v9 `List` implementation for the reasons mentioned above.
