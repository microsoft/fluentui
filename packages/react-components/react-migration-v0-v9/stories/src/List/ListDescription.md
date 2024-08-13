For easy migration, we have created a List v0 Shim component, which is a new implementation of List, which respects new paradigms introduced in v9 but keeps the API and experience as close to [List v0](https://fluentsite.z22.web.core.windows.net/components/list) as possible.

This will help you migrate from v0 to the new v9 with ease.

## Composition, also known as "Children API"

In Fluent UI React v9 we prefer to use composition over configuration where possible. List is no exception. The v0 list also supports composition API under a name of "Children API".

## Children API component mapping

Migrating from a v9 Children API to v9 composition API is quite straighforward. You can replace the components like this:

- Use shim `List` instead of v0 `List`
- Use shimn `ListItem` instead of v0 `ListItem`

For props please refer to [Property mapping](#v0-shim-property-mapping) section.

## Shorthand API

For Shorthand API things are a bit more complicated, as your code needs to be updated to use composition.

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
        <ListItem key={item.key} value={item.key} header={item.header}>
          {item.content}
        </ListItem>;
      })}
    </List>
  );
};
```

## v0 Shim Property mapping

## List

### Notable changes

The selection approach has changed, as we moved from selecting by an index to selecting by a key. This is a more robust approach which doesn't rely on static position of static items in the list.

The `horizontal` prop has been replaced with a more generic `layout`.

The `items` prop has been removed in favor of composition of `<ListItem />` components.

The `styles` and `variables` prop have been removed in favor of `className`.

### Full property mapping table

| v0 List                 | v9 List                                                                                                 |
| ----------------------- | ------------------------------------------------------------------------------------------------------- |
| `accessibility`         | built in, customize with `useArrowNavigationGroup` from `tabster`                                       |
| `as`                    | `as`                                                                                                    |
| `className`             | `className`                                                                                             |
| `debug`                 | N/A                                                                                                     |
| `defaultSelectedIndex`  | `defaultSelectedItems`                                                                                  |
| `design`                | N/A                                                                                                     |
| `horizontal`            | use `layout` with a value `horizontal`                                                                  |
| `items`                 | N/A - use `ListItem` components as Children                                                             |
| `navigable`             | `navigable`                                                                                             |
| `onSelectedIndexChange` | `onSelectionChange`                                                                                     |
| `ref`                   | `ref`                                                                                                   |
| `selectable`            | `selectable`                                                                                            |
| `selectedIndex`         | `selectedItems`                                                                                         |
| `styles`                | use slots in combination with `className`                                                               |
| `truncateContent`       | `truncateContent`                                                                                       |
| `truncateHeader`        | `truncateHeader`                                                                                        |
| `variables`             | N/A - use slots in combination with `className`                                                         |
| `wrap`                  | N/A                                                                                                     |
| N/A                     | `selectionMode` - "single" or "multiselect". Determines the selection mode when `selectable` is `true`. |

## ListItem

### Notable Changes

The `accessibility` prop has been removed in favor of tabster attributes. Use that if necessary.

The `design`, `styles` and `important` have been removed in favor of styling using `className`.

The `index` property has been replaced with a `value` for purposes of selection.

The `selected` prop has been removed, it is determined from the selection state present on the `List` parent.

### Full property mapping table

| v0 ListItem       | v9 ListItem                                         |
| ----------------- | --------------------------------------------------- |
| `accessibility`   | N/A                                                 |
| `as`              | `as`                                                |
| `className`       | `className`                                         |
| `content`         | N/A - pass content as a child                       |
| `contentMedia`    | `contentMedia`                                      |
| `debug`           | N/A                                                 |
| `design`          | N/A                                                 |
| `endMedia`        | `endMedia`                                          |
| `header`          | `header`                                            |
| `headerMedia`     | `headerMedia`                                       |
| `important`       | N/A                                                 |
| `index`           | N/A - use `value` instead                           |
| `media`           | `media`                                             |
| `navigable`       | `navigable`                                         |
| `onClick`         | `onClick`                                           |
| `ref`             | `ref`                                               |
| `selectable`      | `selectable`                                        |
| `selected`        | N/A - selection state is passed to `List`           |
| `styles`          | N/A - use `className` for any slot                  |
| `truncateContent` | `truncateContent`                                   |
| `truncateHeader`  | `truncateHeader`                                    |
| N/A               | `contentWrapper` - slot for content, wraps children |

## Other

Other components like `ListItemContent`, `ListItemContentMedia`, `ListItemEndMedia`, `ListItemHeader`,`ListItemHeaderMedia` and `ListItemMedia` are _not_ currently present in v0 `List` Shim implementation.
