# DetailsList / DataGrid Migration

## Architecture Change

v8 `DetailsList` and v9 `DataGrid` share the same `items` + `columns` concept, but the column definitions
and rendering are completely restructured.

Key shifts:

- Columns are defined with `createTableColumn()` factory, which takes typed render functions instead of string `fieldName` + `onRenderColumn` callbacks
- The grid body uses a **render-props pattern** — `DataGridBody` / `DataGridRow` children are functions, not arrays
- Selection uses a `Set` of item keys, not a `Selection` class
- Sorting is declarative (`sortable` prop + `sortState`) instead of per-column `isSorted` flags
- `getRowId` prop specifies which field to use as the row key

## Before / After Example

### Before

```tsx
import { DetailsList, IColumn, SelectionMode, Selection } from '@fluentui/react';

interface Item {
  id: string;
  name: string;
  age: number;
}

const columns: IColumn[] = [
  {
    key: 'name',
    name: 'Name',
    fieldName: 'name',
    minWidth: 100,
    maxWidth: 200,
    isSortable: true,
    onRender: (item: Item) => <strong>{item.name}</strong>,
  },
  {
    key: 'age',
    name: 'Age',
    fieldName: 'age',
    minWidth: 50,
    maxWidth: 100,
  },
];

const selection = new Selection();

<DetailsList
  items={items}
  columns={columns}
  selectionMode={SelectionMode.single}
  selection={selection}
  onItemInvoked={handleItemInvoked}
/>;
```

### After

```tsx
import {
  DataGrid,
  DataGridHeader,
  DataGridRow,
  DataGridHeaderCell,
  DataGridBody,
  DataGridCell,
  TableColumnDefinition,
  TableCellLayout,
  createTableColumn,
} from '@fluentui/react-components';

interface Item {
  id: string;
  name: string;
  age: number;
}

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'name',
    compare: (a, b) => a.name.localeCompare(b.name),
    renderHeaderCell: () => 'Name',
    renderCell: item => (
      <TableCellLayout>
        <strong>{item.name}</strong>
      </TableCellLayout>
    ),
  }),
  createTableColumn<Item>({
    columnId: 'age',
    compare: (a, b) => a.age - b.age,
    renderHeaderCell: () => 'Age',
    renderCell: item => <TableCellLayout>{item.age}</TableCellLayout>,
  }),
];

<DataGrid
  items={items}
  columns={columns}
  getRowId={item => item.id}
  selectionMode="single"
  onSelectionChange={(_, data) => console.log([...data.selectedItems])}
  sortable
>
  <DataGridHeader>
    <DataGridRow>{({ renderHeaderCell }) => <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>}</DataGridRow>
  </DataGridHeader>
  <DataGridBody<Item>>
    {({ item, rowId }) => (
      <DataGridRow<Item> key={rowId} onClick={() => handleItemInvoked(item)}>
        {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
      </DataGridRow>
    )}
  </DataGridBody>
</DataGrid>;
```

## Sorting

```tsx
// v9 — controlled sort state
const [sortState, setSortState] = React.useState<{ sortColumn?: string; sortDirection?: 'ascending' | 'descending' }>(
  {},
);

<DataGrid
  items={items}
  columns={columns}
  sortable
  sortState={sortState}
  onSortChange={(_, nextSort) => setSortState(nextSort)}
>
  ...
</DataGrid>;
```

With sort, `compare` on each `createTableColumn` handles the ordering. `DataGridHeaderCell` renders a sort indicator automatically when `sortable` is set.

## Multi-select

```tsx
// v9 — controlled multi-select with a Set of row IDs
const [selectedRows, setSelectedRows] = React.useState(new Set<string>());

<DataGrid
  items={items}
  columns={columns}
  getRowId={item => item.id}
  selectionMode="multiselect"
  selectedItems={selectedRows}
  onSelectionChange={(_, data) => setSelectedRows(new Set(data.selectedItems as string[]))}
>
  ...
</DataGrid>;
```

## Column Resizing

```tsx
// v9 — column resizing (no v8 equivalent built-in)
import { DataGridProps } from '@fluentui/react-components';

const columnSizingOptions: DataGridProps['columnSizingOptions'] = {
  name: { minWidth: 100, defaultWidth: 200 },
  age: { minWidth: 50, defaultWidth: 100 },
};

<DataGrid items={items} columns={columns} resizableColumns columnSizingOptions={columnSizingOptions}>
  ...
</DataGrid>;
```

## IColumn → TableColumnDefinition

| v8 `IColumn`           | v9 `createTableColumn` option      | Notes                                       |
| ---------------------- | ---------------------------------- | ------------------------------------------- |
| `key`                  | `columnId`                         |                                             |
| `name`                 | `renderHeaderCell`                 | Return a string or JSX                      |
| `fieldName`            | `renderCell`                       | Access `item.fieldName` inside `renderCell` |
| `onRender`             | `renderCell`                       |                                             |
| `onRenderHeader`       | `renderHeaderCell`                 |                                             |
| `isSortable` + sort cb | `compare` + `sortable` prop        | `compare` is a typed comparator             |
| `isSorted`             | `sortState.sortColumn`             | Set via `sortState` prop on `DataGrid`      |
| `isSortedDescending`   | `sortState.sortDirection`          |                                             |
| `minWidth`             | `columnSizingOptions[id].minWidth` |                                             |
| `maxWidth`             | `columnSizingOptions[id].maxWidth` |                                             |
| `isResizable`          | `resizableColumns` on `DataGrid`   |                                             |

## IDetailsListProps → DataGridProps

| v8                    | v9                                    | Notes                                     |
| --------------------- | ------------------------------------- | ----------------------------------------- |
| `items`               | `items`                               |                                           |
| `columns`             | `columns`                             | Different shape — use `createTableColumn` |
| `selectionMode`       | `selectionMode`                       | `"single"` \| `"multiselect"` (string)    |
| `selection`           | `selectedItems` + `onSelectionChange` | `Set` of row IDs, not `Selection` class   |
| `getKey`              | `getRowId`                            |                                           |
| `onItemInvoked`       | `onClick` on `<DataGridRow>`          |                                           |
| `onActiveItemChanged` | `onClick` on `<DataGridRow>`          |                                           |
| `onRenderRow`         | Children function of `<DataGridBody>` |                                           |
| `onRenderItemColumn`  | `renderCell` in `createTableColumn`   |                                           |
| `checkboxVisibility`  | `selectionAppearance`                 | `"checkbox"` \| `"brand"` \| `"none"`     |
| `groups`              | —                                     | Use `Tree` for grouped/hierarchical data  |
| `compact`             | `size="small"`                        |                                           |
| `styles`              | `className` + `makeStyles`            |                                           |
| `theme`               | `FluentProvider`                      |                                           |

## Selection class → Set

```tsx
// v8 — Selection class
import { Selection } from '@fluentui/react';

const selection = new Selection({
  onSelectionChanged: () => {
    const selected = selection.getSelection() as Item[];
    console.log(selected);
  },
});

<DetailsList selection={selection} selectionMode={SelectionMode.multiple} />;
```

```tsx
// v9 — Set of row IDs
const [selectedItems, setSelectedItems] = React.useState(new Set<string>());

<DataGrid
  selectionMode="multiselect"
  selectedItems={selectedItems}
  onSelectionChange={(_, data) => setSelectedItems(new Set(data.selectedItems as string[]))}
  getRowId={item => item.id}
>
  ...
</DataGrid>;
```
