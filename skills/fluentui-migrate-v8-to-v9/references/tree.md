# GroupedList → Tree Migration

v8 `GroupedList` is a multipurpose component. The right v9 migration target depends on your usage:

| v8 usage                                   | v9 target             |
| ------------------------------------------ | --------------------- |
| Hierarchical data that expands / collapses | `Tree`                |
| Flat or nested list (no expand/collapse)   | `List`                |
| Tabular / grid data                        | `Table` or `DataGrid` |

## GroupedList → Tree (expand/collapse hierarchies)

### Architecture Shift

v8 `GroupedList` is data-driven (`items` array + `groups` array + `onRenderCell` callback). v9 `Tree` uses declarative JSX children with `<TreeItem>` / `<TreeItemLayout>`.

```tsx
// v8 — data-driven
import { GroupedList, IGroup } from '@fluentui/react';

const items = ['Apple', 'Banana', 'Cherry', 'Date'];
const groups: IGroup[] = [
  { key: 'g1', name: 'Fruits A-C', startIndex: 0, count: 3 },
  { key: 'g2', name: 'Fruits D-F', startIndex: 3, count: 1 },
];

<GroupedList items={items} groups={groups} onRenderCell={(depth, item) => <div>{item}</div>} />;

// v9 — declarative JSX
import { Tree, TreeItem, TreeItemLayout } from '@fluentui/react-components';

<Tree aria-label="Fruits">
  <TreeItem itemType="branch" value="g1">
    <TreeItemLayout>Fruits A-C</TreeItemLayout>
    <Tree>
      {['Apple', 'Banana', 'Cherry'].map(name => (
        <TreeItem key={name} itemType="leaf" value={name}>
          <TreeItemLayout>{name}</TreeItemLayout>
        </TreeItem>
      ))}
    </Tree>
  </TreeItem>
  <TreeItem itemType="branch" value="g2">
    <TreeItemLayout>Fruits D-F</TreeItemLayout>
    <Tree>
      <TreeItem itemType="leaf" value="Date">
        <TreeItemLayout>Date</TreeItemLayout>
      </TreeItem>
    </Tree>
  </TreeItem>
</Tree>;
```

## Key Tree Props

| Prop               | Notes                                                 |
| ------------------ | ----------------------------------------------------- |
| `aria-label`       | Required for accessibility                            |
| `openItems`        | Controlled set of expanded item values                |
| `defaultOpenItems` | Uncontrolled initial expanded items                   |
| `onOpenChange`     | `(_, data) => void` — `data.openItems` is the new set |
| `checkedItems`     | Controlled checked items (for selectable trees)       |
| `onCheckedChange`  | Selection callback                                    |
| `selectionMode`    | `"single"` \| `"multiselect"` \| `undefined`          |
| `appearance`       | `"subtle"` \| `"subtle-alpha"` \| `"transparent"`     |
| `size`             | `"small"` \| `"medium"` \| `"large"`                  |

## TreeItem Props

| Prop       | Notes                                 |
| ---------- | ------------------------------------- |
| `value`    | Unique identifier (required)          |
| `itemType` | `"branch"` (has children) \| `"leaf"` |

## Prop Mapping — GroupedList → Tree

| v8 `IGroupedListProps`           | v9 equivalent                                 |
| -------------------------------- | --------------------------------------------- |
| `items`                          | Data source for `<TreeItem>` children         |
| `groups`                         | `<TreeItem itemType="branch">` wrappers       |
| `onRenderCell`                   | `<TreeItemLayout>` content                    |
| `onRenderGroupHeader`            | `<TreeItemLayout>` of the branch `<TreeItem>` |
| `onRenderGroupFooter`            | Custom content after the nested `<Tree>`      |
| `selection`                      | `selectionMode` + `checkedItems` on `<Tree>`  |
| `groupProps.onToggleCollapseAll` | `onOpenChange` on `<Tree>`                    |
| `styles`                         | `className` + `makeStyles`                    |
| `theme`                          | Use `FluentProvider`                          |

## Flat List Alternative

If you don't need expand/collapse, use `List` from `@fluentui/react-components`:

```tsx
import { List, ListItem } from '@fluentui/react-components';

<List>
  {items.map(item => (
    <ListItem key={item.key}>{item.name}</ListItem>
  ))}
</List>;
```
