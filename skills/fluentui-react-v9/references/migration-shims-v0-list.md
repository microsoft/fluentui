# Migration Shims/V0/List

To unlock the migration to V9, we have created the List v0 Shim component, which is a stepping stone implementation of List, that respects new paradigms introduced in v9 but keeps the API and experience as close to [List v0](https://fluentsite.z22.web.core.windows.net/components/list) as possible.

## Important, please read

> **⚠️ At this point the proper V9 implementation of the [List Component](https://react.fluentui.dev/?path=/docs/preview-components-list--default) is available in preview and should be used instead of this shim.**

> If you have used the Migration Shim List in the past and are here just for the docs reference, feel free to continue reading.

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

## Props

| Name                   | Type                                                                                             | Required           | Default  | Description                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------ | ------------------ | -------- | ------------------------------------------------------------------------------------------------- | --- |
| `as`                   | `"div" "ol" "ul"`                                                                                | No                 |          |                                                                                                   |
| `layout`               | `"grid" "horizontal" "vertical"`                                                                 | No                 | vertical | Defines the layout orientation.                                                                   |
| `navigable`            | `boolean`                                                                                        | No                 | false    | Defines if the list should be navigable. Set this to true when adding an `onClick` handler.       |
| `selectable`           | `boolean`                                                                                        | No                 | false    | Defines if the List items should be selectable.                                                   |
| `selectionMode`        | `"multiselect" "single"`                                                                         | No                 | single   | Defines selection mode for the List.                                                              |
| `selectedItems`        | `SelectionItemId[]`                                                                              | No                 |          | For controlled selection - defines selected items                                                 |
| `defaultSelectedItems` | `SelectionItemId[]`                                                                              | No                 |          | For uncontrolled selection - defines default selected items                                       |
| `onSelectionChange`    | `((event: SyntheticEvent<Element, Event>, data: { selectedItems: SelectionItemId[]; }) => void)` | No                 |          | Callback for selection change events, used for both controlled and uncontrolled (as notification) |
| `truncateHeader`       | `boolean`                                                                                        | No                 | false    | Truncates header                                                                                  |
| `truncateContent`      | `boolean`                                                                                        | No                 | false    | Truncates content                                                                                 |
| `ref`                  | `Ref<HTMLDivElement                                                                              | HTMLUListElement>` | No       |                                                                                                   |     |

## Examples

### Default List

```tsx
import * as React from 'react';
import { Button, Image } from '@fluentui/react-components';
import { List, ListItem } from '@fluentui/react-migration-v0-v9';
import type { JSXElement } from '@fluentui/react-components';

type Item = {
  key: string;
  media: string;
  header: string;
  headerMedia: string;
  content: string | JSXElement;
};

const items: Item[] = [
  {
    key: 'robert',
    media: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg',
    header: 'Robert Tolbert',
    headerMedia: '7:26:56 AM',
    content: (
      <>
        Program the sensor to the SAS alarm through the haptic SQL card!{' '}
        <Button onClick={() => alert('you clicked!')}>Click me</Button>
      </>
    ),
  },
  {
    key: 'celeste',
    media: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CelesteBurton.jpg',
    header: 'Celeste Burton',
    headerMedia: '11:30:17 PM',
    content: 'Use the online FTP application to input the multi-byte application!',
  },
  {
    key: 'cecil',
    media: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CecilFolk.jpg',
    header: 'Cecil Folk',
    headerMedia: '5:22:40 PM',
    content: 'The GB pixel is down, navigate the virtual interface!',
  },
];

export const Default = (): JSXElement => {
  return (
    <List truncateContent truncateHeader>
      {items.map(({ key, media, header, headerMedia, content }) => (
        <ListItem
          key={key}
          value={key}
          media={<Image src={media} alt="" shape="circular" width={32} />}
          header={header}
          headerMedia={headerMedia}
        >
          {content}
        </ListItem>
      ))}
    </List>
  );
};
```

### Navigable

This example shows how to add an action and make items navigable with keyboard.
The keyboard handlers for Enter and Space are added automatically.

```tsx
import { Image } from '@fluentui/react-components';
import { List, ListItem } from '@fluentui/react-migration-v0-v9';

import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

type Item = {
  key: string;
  media: string;
  header: string;
  headerMedia: string;
  content: string;
};

const items: Item[] = [
  {
    key: 'robert',
    media: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg',
    header: 'Robert Tolbert',
    headerMedia: '7:26:56 AM',
    content: 'Program the sensor to the SAS alarm through the haptic SQL card!',
  },
  {
    key: 'celeste',
    media: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CelesteBurton.jpg',
    header: 'Celeste Burton',
    headerMedia: '11:30:17 PM',
    content: 'Use the online FTP application to input the multi-byte application!',
  },
  {
    key: 'cecil',
    media: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CecilFolk.jpg',
    header: 'Cecil Folk',
    headerMedia: '5:22:40 PM',
    content: 'The GB pixel is down, navigate the virtual interface!',
  },
];

export const Navigable = (): JSXElement => {
  return (
    <List navigable truncateHeader truncateContent>
      {items.map(({ key, media, header, headerMedia, content }) => (
        <ListItem
          key={key}
          value={key}
          media={<Image src={media} alt="" shape="circular" width={32} />}
          header={header}
          headerMedia={headerMedia}
          onClick={() => alert(header)}
        >
          {content}
        </ListItem>
      ))}
    </List>
  );
};
```

### Selectable

This example is similar to the previous one, but shows how to use the `selectedItems` and `onSelectionChange`
props to control the selection state.

This is a basic example how selection can be controlled with a simple array of selected values in a state.

```tsx
import { Image } from '@fluentui/react-components';
import { List, ListItem, useListSelection } from '@fluentui/react-migration-v0-v9';

import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

type Item = {
  key: string;
  media: string;
  header: string;
  headerMedia: string;
  content: string;
};

const items: Item[] = [
  {
    key: 'robert',
    media: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg',
    header: 'Robert Tolbert',
    headerMedia: '7:26:56 AM',
    content: 'Program the sensor to the SAS alarm through the haptic SQL card!',
  },
  {
    key: 'celeste',
    media: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CelesteBurton.jpg',
    header: 'Celeste Burton',
    headerMedia: '11:30:17 PM',
    content: 'Use the online FTP application to input the multi-byte application!',
  },
  {
    key: 'cecil',
    media: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CecilFolk.jpg',
    header: 'Cecil Folk',
    headerMedia: '5:22:40 PM',
    content: 'The GB pixel is down, navigate the virtual interface!',
  },
];

export const Selectable = (): JSXElement => {
  const selection = useListSelection({ selectionMode: 'single' });

  return (
    <List
      truncateContent
      truncateHeader
      selectable
      defaultSelectedItems={[]}
      selectedItems={selection.selectedItems}
      onSelectionChange={(_, data) => selection.setSelectedItems(data.selectedItems)}
    >
      {items.map(({ key, media, header, headerMedia, content }) => (
        <ListItem
          key={key}
          value={key}
          media={<Image src={media} alt="" shape="circular" width={32} />}
          header={header}
          headerMedia={headerMedia}
        >
          {content}
        </ListItem>
      ))}
    </List>
  );
};
```
