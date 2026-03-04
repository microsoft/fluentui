# List Migration

v9 `List` + `ListItem` replaces v8 `List`. The v9 component adds first-class keyboard navigation, selection, and multi-action support.

## Key Differences

- v8 `List` used `items` array + `onRenderCell` callback; v9 uses declarative `<ListItem>` children
- v9 has explicit `navigationMode` and `selectionMode` props
- `onAction` replaces `onClick` on items for consistent keyboard + mouse handling

## Prop Mapping — List

| v8 `IListProps`        | v9 `ListProps`               | Notes                                    |
| ---------------------- | ---------------------------- | ---------------------------------------- |
| `items`                | `<ListItem>` children        |                                          |
| `onRenderCell`         | Render `<ListItem>` directly |                                          |
| `onShouldVirtualize`   | —                            | v9 does not have built-in virtualization |
| `renderedWindowsAhead` | —                            | Removed                                  |
| `styles`               | `className`                  | Use `makeStyles`                         |
| `theme`                | —                            | Use `FluentProvider`                     |

## New v9 Props

| Prop                   | Values / Notes                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| `navigationMode`       | `"items"` (single action, arrow navigation) \| `"composite"` (multiple actions, grid navigation) |
| `selectionMode`        | `"single"` \| `"multiselect"`                                                                    |
| `selectedItems`        | Controlled selected set (`Iterable<string>`)                                                     |
| `defaultSelectedItems` | Uncontrolled initial selection                                                                   |
| `onSelectionChange`    | `(_, data: { selectedItems: Set<string> }) => void`                                              |

## ListItem Props

| Prop        | Notes                                                                               |
| ----------- | ----------------------------------------------------------------------------------- |
| `value`     | Unique identifier for selection                                                     |
| `onAction`  | Called on click, Enter, or Space (when selection not active). Prefer over `onClick` |
| `checkmark` | Slot for the selection checkmark                                                    |

## Before / After

```tsx
// v8 — data-driven
import { List } from '@fluentui/react';
<List items={contacts} onRenderCell={item => <div onClick={() => openContact(item)}>{item?.name}</div>} />;

// v9 — declarative + keyboard-accessible
import { List, ListItem } from '@fluentui/react-components';
<List navigationMode="items">
  {contacts.map(contact => (
    <ListItem key={contact.id} value={contact.id} onAction={() => openContact(contact)}>
      {contact.name}
    </ListItem>
  ))}
</List>;
```

## Selectable List

```tsx
const [selected, setSelected] = React.useState(new Set<string>());

<List
  navigationMode="items"
  selectionMode="multiselect"
  selectedItems={selected}
  onSelectionChange={(_, data) => setSelected(data.selectedItems)}
>
  {items.map(item => (
    <ListItem key={item.id} value={item.id}>
      {item.name}
    </ListItem>
  ))}
</List>;
```

## Multi-Action Items

When each item has multiple interactive elements (e.g. a primary action + secondary buttons), use `navigationMode="composite"` and give each direct child a `role="gridcell"`:

```tsx
<List navigationMode="composite">
  {items.map(item => (
    <ListItem key={item.id} value={item.id} onAction={() => open(item)}>
      <div role="gridcell">{item.name}</div>
      <div role="gridcell">
        <Button onClick={() => archive(item)}>Archive</Button>
      </div>
    </ListItem>
  ))}
</List>
```
