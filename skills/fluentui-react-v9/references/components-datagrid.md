# Components/DataGrid

> 💡 This component is a higher level extension of the `Table` primitive components and the `useTableFeatures` hook.
> `DataGrid` is a feature-rich component that uses `useTableFeatures` internally,
> so there should always be full feature parity with what can be
> achieved with primitives. This component is **opinionated** and this is intentional. If the desired scenario can
> be achieved easily and does not vary too much from documented examples, it can be very convenient. If the desired
> scenario varies a lot from the documented examples please use the `Table` components with `useTableFeatures` (or
> another state management solution of choice).

> ⚠️ Feature requests will be accepted, but the team will prioritize overall API scalability and extensibility over
> uncommon features and scenarios.

## Best Practices

### Do

- Always enclude a `DataGridHeader` row.
- When the DataGrid is preceded by a heading or other visible labelling text, use `aria-labelledby` to point to the heading's `id`.
- When the DataGrid does not have any visible text label, use `aria-label` to give it an accessible name.
- Set a `min-width` style to ensure the DataGrid displays properly at high zoom levels or small screens.

### Don't

- Use DataGrid to display single-column content.
- Override the `role` attribute of DataGrid controls.

## Props

| Name                      | Type                                                                   | Required                                                       | Default                                                                  | Description                                                                                                                                                                                                                           |
| ------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ---------------------------------------------- |
| `as`                      | `"div" "table"`                                                        | No                                                             |                                                                          |                                                                                                                                                                                                                                       |
| `size`                    | `"small" "medium" "extra-small"`                                       | No                                                             | medium                                                                   | Affects the sizes of all table subcomponents                                                                                                                                                                                          |
| `noNativeElements`        | `boolean`                                                              | No                                                             | false                                                                    | Render all table elements as divs instead of semantic table elements Using divs no longer uses `display: table` layout but `display: flex`                                                                                            |
| `sortable`                | `boolean`                                                              | No                                                             | false                                                                    | Whether the table is sortable                                                                                                                                                                                                         |
| `items`                   | `any[]`                                                                | Yes                                                            |                                                                          |                                                                                                                                                                                                                                       |
| `columns`                 | `TableColumnDefinition<any>[]`                                         | Yes                                                            |                                                                          | Table columns                                                                                                                                                                                                                         |
| `getRowId`                | `((item: any) => TableRowId)`                                          | No                                                             |                                                                          |                                                                                                                                                                                                                                       |
| `focusMode`               | `"none" "cell" "row_unstable" "composite"`                             | No                                                             | cell                                                                     | How focus navigation will work in the datagrid                                                                                                                                                                                        |
| `subtleSelection`         | `boolean`                                                              | No                                                             | false                                                                    | Enables subtle selection style                                                                                                                                                                                                        |
| `selectionAppearance`     | `"none" "neutral" "brand"`                                             | No                                                             | brand                                                                    | Row appearance when selected                                                                                                                                                                                                          |
| `resizableColumns`        | `boolean`                                                              | No                                                             |                                                                          | Enables column resizing                                                                                                                                                                                                               |
| `sortState`               | `SortState`                                                            | No                                                             |                                                                          | Used to control sorting                                                                                                                                                                                                               |
| `defaultSortState`        | `SortState`                                                            | No                                                             |                                                                          | Used in uncontrolled mode to set initial sort column and direction on mount                                                                                                                                                           |
| `defaultSelectedItems`    | `Iterable<SelectionItemId>`                                            | No                                                             |                                                                          | Used in uncontrolled mode to set initial selected items on mount                                                                                                                                                                      |
| `selectedItems`           | `Iterable<SelectionItemId>`                                            | No                                                             |                                                                          | Used to control selected items                                                                                                                                                                                                        |
| `onSortChange`            | `((e: MouseEvent<Element, MouseEvent>, sortState: SortState) => void)` | No                                                             |                                                                          |                                                                                                                                                                                                                                       |
| `onSelectionChange`       | `((e: MouseEvent<Element, MouseEvent>                                  | KeyboardEvent<Element>, data: OnSelectionChangeData) => void)` | No                                                                       |                                                                                                                                                                                                                                       |     |
| `selectionMode`           | `"multiselect" "single"`                                               | No                                                             | false                                                                    | Enables row selection and sets the selection mode                                                                                                                                                                                     |
| `columnSizingOptions`     | `TableColumnSizingOptions`                                             | No                                                             |                                                                          | Options for column resizing, specific for each column                                                                                                                                                                                 |
| `onColumnResize`          | `((e: MouseEvent                                                       | KeyboardEvent                                                  | TouchEvent, data: { columnId: TableColumnId; width: number; }) => void)` | No                                                                                                                                                                                                                                    |     | A callback triggered when a column is resized. |
| `containerWidthOffset`    | `number`                                                               | No                                                             |                                                                          | For column resizing. Allows for a container size to be adjusted by a number of pixels, to make sure the columns don't overflow the table. By default, this value is calculated internally based on other props, but can be overriden. |
| `resizableColumnsOptions` | `{ autoFitColumns?: boolean; }`                                        | No                                                             |                                                                          | Custom options for column resizing.                                                                                                                                                                                                   |
| `ref`                     | `Ref<HTMLDivElement>`                                                  | No                                                             |                                                                          |                                                                                                                                                                                                                                       |

## Subcomponents

### DataGridHeader

DataGridHeader component

#### Props

| Name  | Type                  | Required | Default | Description |
| ----- | --------------------- | -------- | ------- | ----------- |
| `as`  | `"div" "thead"`       | No       |         |             |
| `ref` | `Ref<HTMLDivElement>` | No       |         |             |

### DataGridHeaderCell

DataGridHeaderCell component

#### Props

| Name            | Type                                                                                                                                         | Required | Default   | Description                                                                                                                                                                                                                                                                                                      |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `aside`         | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No        |                                                                                                                                                                                                                                                                                                                  | aside content for anything that should be after main content of the table header cell |
| `button`        | `NonNullable<WithSlotShorthandValue<ARIAButtonSlotProps>                                                                                     | null>`   | No        |                                                                                                                                                                                                                                                                                                                  | Button handles correct narration and interactions for sorting;                        |
| `as`            | `"div" "th"`                                                                                                                                 | No       |           |                                                                                                                                                                                                                                                                                                                  |
| `sortIcon`      | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No        |                                                                                                                                                                                                                                                                                                                  |                                                                                       |
| `sortDirection` | `"ascending" "descending"`                                                                                                                   | No       | undefined |                                                                                                                                                                                                                                                                                                                  |
| `focusMode`     | `"none" "cell" "group"`                                                                                                                      | No       | cell      | Used when there are nested focusble elements inside a focusable cell - `group`: Enter keypress moves focus inside the cell, focus is trapped inside the cell until Escape keypress - `cell`: The cell is focusable - if there are focusable elements in the cell use `group` - `none`: The cell is not focusable |
| `ref`           | `Ref<HTMLDivElement>`                                                                                                                        | No       |           |                                                                                                                                                                                                                                                                                                                  |

### DataGridBody

DataGridBody component

#### Props

| Name  | Type                  | Required | Default | Description |
| ----- | --------------------- | -------- | ------- | ----------- |
| `as`  | `"div" "tbody"`       | No       |         |             |
| `ref` | `Ref<HTMLDivElement>` | No       |         |             |

### DataGridRow

DataGridRow component

#### Props

| Name            | Type                                                                             | Required | Default | Description                                                                                        |
| --------------- | -------------------------------------------------------------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `as`            | `"div" "tr"`                                                                     | No       |         |                                                                                                    |
| `appearance`    | `"none" "neutral" "brand"`                                                       | No       | none    | A table row can have different variants. These appearances are intended to be used with selection. |
| `selectionCell` | `WithSlotShorthandValue<TableSelectionCellProps & RefAttributes<HTMLDivElement>> | null`    | No      |                                                                                                    | When selection is enabled on the @see DataGrid , all rows will render the selection cell. |
| `ref`           | `Ref<HTMLDivElement>`                                                            | No       |         |                                                                                                    |

### DataGridCell

DataGridCell component

#### Props

| Name        | Type                    | Required | Default | Description                                                                                                                                                                                                                                                                                                      |
| ----------- | ----------------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`        | `"div" "td"`            | No       |         |                                                                                                                                                                                                                                                                                                                  |
| `focusMode` | `"none" "cell" "group"` | No       | cell    | Used when there are nested focusble elements inside a focusable cell - `group`: Enter keypress moves focus inside the cell, focus is trapped inside the cell until Escape keypress - `cell`: The cell is focusable - if there are focusable elements in the cell use `group` - `none`: The cell is not focusable |
| `ref`       | `Ref<HTMLDivElement>`   | No       |         |                                                                                                                                                                                                                                                                                                                  |

### DataGridSelectionCell

DataGridSelectionCell component

#### Props

| Name                | Type                                                                     | Required                                            | Default                     | Description                                                                     |
| ------------------- | ------------------------------------------------------------------------ | --------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------- | --------------------------------------- | ---------- | ---------- | --- | ---------------------------------------------- | ------------------------------------------------- |
| `checkboxIndicator` | `(Omit<ComponentProps<Partial<CheckboxSlots>, "input">, "defaultChecked" | "onChange"                                          | "size"                      | "checked"> & { checked?: boolean                                                | ... 1 more ...; ... 5 more ...; size?: "medium" | ... 1 more ...; } & RefAttributes<...>) | null       | undefined` | No  |                                                | Selection indicator if selection type is checkbox |
| `radioIndicator`    | `(Omit<ComponentProps<Partial<RadioSlots>, "input">, "onChange"          | "size"> & { value?: string; labelPosition?: "after" | "below"; disabled?: boolean | undefined; onChange?: ((ev: ChangeEvent<...>, data: RadioOnChangeData) => void) | undefined; } & RefAttributes<...>)              | null                                    | undefined` | No         |     | Selection indicator if selection type is radio |
| `as`                | `"div" "td"`                                                             | No                                                  |                             |                                                                                 |
| `type`              | `"checkbox" "radio"`                                                     | No                                                  | checkbox                    | A table can have two kinds of selection modes.                                  |
| `checked`           | `boolean                                                                 | "mixed"`                                            | No                          | false                                                                           |                                                 |
| `subtle`            | `boolean`                                                                | No                                                  | false                       | Only visible when checked or the parent row is hovered/focused                  |
| `invisible`         | `boolean`                                                                | No                                                  | false                       | Hides the selection cell visually but takes up the same space                   |
| `ref`               | `Ref<HTMLDivElement>`                                                    | No                                                  |                             |                                                                                 |

## Examples

### Composite Navigation

```tsx
import * as React from 'react';
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
} from '@fluentui/react-icons';
import {
  PresenceBadgeStatus,
  Avatar,
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
} from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';

type FileCell = {
  label: string;
  icon: JSXElement;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type LastUpdateCell = {
  label: string;
  icon: JSXElement;
};

type AuthorCell = {
  label: string;
  status: PresenceBadgeStatus;
};

type Item = {
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
  lastUpdate: LastUpdateCell;
};

const items: Item[] = [
  {
    file: { label: 'Meeting notes', icon: <DocumentRegular /> },
    author: { label: 'Max Mustermann', status: 'available' },
    lastUpdated: { label: '7h ago', timestamp: 1 },
    lastUpdate: {
      label: 'You edited this',
      icon: <EditRegular />,
    },
  },
  {
    file: { label: 'Thursday presentation', icon: <FolderRegular /> },
    author: { label: 'Erika Mustermann', status: 'busy' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Training recording', icon: <VideoRegular /> },
    author: { label: 'John Doe', status: 'away' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Purchase order', icon: <DocumentPdfRegular /> },
    author: { label: 'Jane Doe', status: 'offline' },
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 3 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
      icon: <PeopleRegular />,
    },
  },
];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
    renderHeaderCell: () => {
      return 'File';
    },
    renderCell: item => {
      return <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>;
    },
  }),
  createTableColumn<Item>({
    columnId: 'author',
    renderHeaderCell: () => {
      return 'Author';
    },
    renderCell: item => {
      return (
        <TableCellLayout
          media={
            <Avatar aria-label={item.author.label} name={item.author.label} badge={{ status: item.author.status }} />
          }
        >
          {item.author.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
    renderHeaderCell: () => {
      return 'Last updated';
    },

    renderCell: item => {
      return item.lastUpdated.label;
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
    renderHeaderCell: () => {
      return 'Last update';
    },
    renderCell: item => {
      return <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>;
    },
  }),
];

export const CompositeNavigation = (): JSXElement => {
  return (
    <DataGrid
      selectionMode="multiselect"
      items={items}
      columns={columns}
      focusMode="composite"
      style={{ minWidth: '550px' }}
    >
      <DataGridHeader>
        <DataGridRow
          selectionCell={{
            checkboxIndicator: { 'aria-label': 'Select all rows' },
          }}
        >
          {({ renderHeaderCell }) => <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<Item>>
        {({ item, rowId }) => (
          <DataGridRow<Item>
            key={rowId}
            selectionCell={{
              checkboxIndicator: { 'aria-label': 'Select row' },
            }}
          >
            {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
};
```

### Custom Row Id

By default row Ids are the index of the item in the collection. In order to use a row Id based on the data
use the `getRowId` prop.

```tsx
import * as React from 'react';
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
} from '@fluentui/react-icons';
import {
  PresenceBadgeStatus,
  Avatar,
  Checkbox,
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  TableColumnDefinition,
  TableRowData,
  createTableColumn,
  TableRowId,
  DataGridProps,
} from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';

type FileCell = {
  label: string;
  icon: JSXElement;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type LastUpdateCell = {
  label: string;
  icon: JSXElement;
};

type AuthorCell = {
  label: string;
  status: PresenceBadgeStatus;
};

type Item = {
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
  lastUpdate: LastUpdateCell;
};

const items: Item[] = [
  {
    file: { label: 'Meeting notes', icon: <DocumentRegular /> },
    author: { label: 'Max Mustermann', status: 'available' },
    lastUpdated: { label: '7h ago', timestamp: 1 },
    lastUpdate: {
      label: 'You edited this',
      icon: <EditRegular />,
    },
  },
  {
    file: { label: 'Thursday presentation', icon: <FolderRegular /> },
    author: { label: 'Erika Mustermann', status: 'busy' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Training recording', icon: <VideoRegular /> },
    author: { label: 'John Doe', status: 'away' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Purchase order', icon: <DocumentPdfRegular /> },
    author: { label: 'Jane Doe', status: 'offline' },
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 3 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
      icon: <PeopleRegular />,
    },
  },
];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
    compare: (a, b) => {
      return a.file.label.localeCompare(b.file.label);
    },
    renderHeaderCell: () => {
      return 'File';
    },
    renderCell: item => {
      return <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>;
    },
  }),
  createTableColumn<Item>({
    columnId: 'author',
    compare: (a, b) => {
      return a.author.label.localeCompare(b.author.label);
    },
    renderHeaderCell: () => {
      return 'Author';
    },
    renderCell: item => {
      return (
        <TableCellLayout
          media={
            <Avatar aria-label={item.author.label} name={item.author.label} badge={{ status: item.author.status }} />
          }
        >
          {item.author.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
    compare: (a, b) => {
      return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
    },
    renderHeaderCell: () => {
      return 'Last updated';
    },

    renderCell: item => {
      return item.lastUpdated.label;
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
    compare: (a, b) => {
      return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
    },
    renderHeaderCell: () => {
      return 'Last update';
    },
    renderCell: item => {
      return <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>;
    },
  }),
];

export const CustomRowId = (): JSXElement => {
  const [selectedRows, setSelectedRows] = React.useState(new Set<TableRowId>(['Thursday presentation']));
  const onSelectionChange: DataGridProps['onSelectionChange'] = (e, data) => {
    setSelectedRows(data.selectedItems);
  };

  return (
    <>
      <ul>
        {items.map(item => (
          <li key={item.file.label}>
            <Checkbox label={item.file.label} checked={selectedRows.has(item.file.label)} />
          </li>
        ))}
      </ul>

      <DataGrid
        items={items}
        columns={columns}
        selectionMode="multiselect"
        selectedItems={selectedRows}
        onSelectionChange={onSelectionChange}
        getRowId={item => item.file.label}
        style={{ minWidth: '550px' }}
      >
        <DataGridHeader>
          <DataGridRow
            selectionCell={{
              checkboxIndicator: { 'aria-label': 'Select all rows' },
            }}
          >
            {({ renderHeaderCell }: TableColumnDefinition<Item>) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody>
          {({ item, rowId }: TableRowData<Item>) => (
            <DataGridRow
              key={rowId}
              selectionCell={{
                checkboxIndicator: { 'aria-label': 'Select row' },
              }}
            >
              {({ renderCell }: TableColumnDefinition<Item>) => <DataGridCell>{renderCell(item)}</DataGridCell>}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </>
  );
};
```

### Default

```tsx
import * as React from 'react';

import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
} from '@fluentui/react-icons';
import {
  PresenceBadgeStatus,
  Avatar,
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
} from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';

type FileCell = {
  label: string;
  icon: JSXElement;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type LastUpdateCell = {
  label: string;
  icon: JSXElement;
};

type AuthorCell = {
  label: string;
  status: PresenceBadgeStatus;
};

type Item = {
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
  lastUpdate: LastUpdateCell;
};

const items: Item[] = [
  {
    file: { label: 'Meeting notes', icon: <DocumentRegular /> },
    author: { label: 'Max Mustermann', status: 'available' },
    lastUpdated: { label: '7h ago', timestamp: 1 },
    lastUpdate: {
      label: 'You edited this',
      icon: <EditRegular />,
    },
  },
  {
    file: { label: 'Thursday presentation', icon: <FolderRegular /> },
    author: { label: 'Erika Mustermann', status: 'busy' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Training recording', icon: <VideoRegular /> },
    author: { label: 'John Doe', status: 'away' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Purchase order', icon: <DocumentPdfRegular /> },
    author: { label: 'Jane Doe', status: 'offline' },
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 3 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
      icon: <PeopleRegular />,
    },
  },
];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
    compare: (a, b) => {
      return a.file.label.localeCompare(b.file.label);
    },
    renderHeaderCell: () => {
      return 'File';
    },
    renderCell: item => {
      return <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>;
    },
  }),
  createTableColumn<Item>({
    columnId: 'author',
    compare: (a, b) => {
      return a.author.label.localeCompare(b.author.label);
    },
    renderHeaderCell: () => {
      return 'Author';
    },
    renderCell: item => {
      return (
        <TableCellLayout
          media={
            <Avatar aria-label={item.author.label} name={item.author.label} badge={{ status: item.author.status }} />
          }
        >
          {item.author.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
    compare: (a, b) => {
      return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
    },
    renderHeaderCell: () => {
      return 'Last updated';
    },

    renderCell: item => {
      return item.lastUpdated.label;
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
    compare: (a, b) => {
      return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
    },
    renderHeaderCell: () => {
      return 'Last update';
    },
    renderCell: item => {
      return <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>;
    },
  }),
];

export const Default = (): JSXElement => {
  return (
    <DataGrid
      items={items}
      columns={columns}
      sortable
      selectionMode="multiselect"
      getRowId={item => item.file.label}
      focusMode="composite"
      style={{ minWidth: '550px' }}
    >
      <DataGridHeader>
        <DataGridRow
          selectionCell={{
            checkboxIndicator: { 'aria-label': 'Select all rows' },
          }}
        >
          {({ renderHeaderCell }) => <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<Item>>
        {({ item, rowId }) => (
          <DataGridRow<Item>
            key={rowId}
            selectionCell={{
              checkboxIndicator: { 'aria-label': 'Select row' },
            }}
          >
            {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
};
```

### Focusable Elements In Cells

When cells contain focusable elements, set the `focusMode` prop on the `DataGridCell` or `DataGridHeaderCell` components.

Use `group` when there are multiple focusable elements in cell,
`group` will enable the following behaviour:

- Enter will move focus into the cell
- Focus is trapped in the cell
- Escape will move focus back to the cell

Use `none` when there is one single focusable element in cell,
`none` will make the cell non-focusable.

Do not add nested focusable elements to a sortable `DataGridHeaderCell`, since they will be rendered within the sort button.

```tsx
import * as React from 'react';

import {
  FolderRegular,
  EditRegular,
  MoreHorizontalRegular,
  OpenRegular,
  DocumentRegular,
  DocumentPdfRegular,
  VideoRegular,
  DeleteRegular,
} from '@fluentui/react-icons';
import {
  PresenceBadgeStatus,
  Avatar,
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
  Button,
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover,
  TableColumnId,
  DataGridCellFocusMode,
} from '@fluentui/react-components';

import type { JSXElement } from '@fluentui/react-components';

type FileCell = {
  label: string;
  icon: JSXElement;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type AuthorCell = {
  label: string;
  status: PresenceBadgeStatus;
};

type Item = {
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
};

const items: Item[] = [
  {
    file: { label: 'Meeting notes', icon: <DocumentRegular /> },
    author: { label: 'Max Mustermann', status: 'available' },
    lastUpdated: { label: '7h ago', timestamp: 1 },
  },
  {
    file: { label: 'Thursday presentation', icon: <FolderRegular /> },
    author: { label: 'Erika Mustermann', status: 'busy' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
  },
  {
    file: { label: 'Training recording', icon: <VideoRegular /> },
    author: { label: 'John Doe', status: 'away' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
  },
  {
    file: { label: 'Purchase order', icon: <DocumentPdfRegular /> },
    author: { label: 'Jane Doe', status: 'offline' },
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 3 },
  },
];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
    compare: (a, b) => {
      return a.file.label.localeCompare(b.file.label);
    },
    renderHeaderCell: () => {
      return 'File';
    },
    renderCell: item => {
      return <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>;
    },
  }),
  createTableColumn<Item>({
    columnId: 'author',
    renderHeaderCell: () => {
      return (
        <>
          Author
          <Button appearance="transparent" aria-label="Edit" icon={<EditRegular />} />
          <Menu positioning={{ autoSize: true }}>
            <MenuTrigger disableButtonEnhancement>
              <Button appearance="transparent" icon={<MoreHorizontalRegular />} aria-label="More options" />
            </MenuTrigger>

            <MenuPopover>
              <MenuList>
                <MenuItem>Delete column</MenuItem>
                <MenuItem>Create new author</MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
        </>
      );
    },
    renderCell: item => {
      return (
        <TableCellLayout
          media={
            <Avatar aria-label={item.author.label} name={item.author.label} badge={{ status: item.author.status }} />
          }
        >
          {item.author.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: 'singleAction',
    renderHeaderCell: () => {
      return 'Single action';
    },
    renderCell: () => {
      return <Button icon={<OpenRegular />}>Open</Button>;
    },
  }),
  createTableColumn<Item>({
    columnId: 'actions',
    renderHeaderCell: () => {
      return 'Actions';
    },
    renderCell: () => {
      return (
        <>
          <Button aria-label="Edit" icon={<EditRegular />} />
          <Button aria-label="Delete" icon={<DeleteRegular />} />
        </>
      );
    },
  }),
];

const getCellFocusMode = (columnId: TableColumnId): DataGridCellFocusMode => {
  switch (columnId) {
    case 'singleAction':
      return 'none';
    case 'actions':
      return 'group';
    default:
      return 'cell';
  }
};

export const FocusableElementsInCells = (): JSXElement => {
  return (
    <DataGrid
      items={items}
      columns={columns}
      sortable
      selectionMode="multiselect"
      getRowId={item => item.file.label}
      onSelectionChange={(e, data) => console.log(data)}
      style={{ minWidth: '550px' }}
    >
      <DataGridHeader>
        <DataGridRow
          selectionCell={{
            checkboxIndicator: { 'aria-label': 'Select all rows' },
          }}
        >
          {({ columnId, renderHeaderCell }) => (
            <DataGridHeaderCell focusMode={columnId === 'author' ? 'group' : undefined}>
              {renderHeaderCell()}
            </DataGridHeaderCell>
          )}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<Item>>
        {({ item, rowId }) => (
          <DataGridRow<Item>
            key={rowId}
            selectionCell={{
              checkboxIndicator: { 'aria-label': 'Select row' },
            }}
          >
            {({ renderCell, columnId }) => (
              <DataGridCell focusMode={getCellFocusMode(columnId)}>{renderCell(item)}</DataGridCell>
            )}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
};
```

### Multiple Select

In order to enable this feature the `selectionMode` prop needs to be set. The API surface is directly
equivalent to the usage of `useTableFeatures`.

```tsx
import * as React from 'react';

import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
} from '@fluentui/react-icons';
import {
  PresenceBadgeStatus,
  Avatar,
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
} from '@fluentui/react-components';

import type { JSXElement } from '@fluentui/react-components';

type FileCell = {
  label: string;
  icon: JSXElement;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type LastUpdateCell = {
  label: string;
  icon: JSXElement;
};

type AuthorCell = {
  label: string;
  status: PresenceBadgeStatus;
};

type Item = {
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
  lastUpdate: LastUpdateCell;
};

const items: Item[] = [
  {
    file: { label: 'Meeting notes', icon: <DocumentRegular /> },
    author: { label: 'Max Mustermann', status: 'available' },
    lastUpdated: { label: '7h ago', timestamp: 1 },
    lastUpdate: {
      label: 'You edited this',
      icon: <EditRegular />,
    },
  },
  {
    file: { label: 'Thursday presentation', icon: <FolderRegular /> },
    author: { label: 'Erika Mustermann', status: 'busy' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Training recording', icon: <VideoRegular /> },
    author: { label: 'John Doe', status: 'away' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Purchase order', icon: <DocumentPdfRegular /> },
    author: { label: 'Jane Doe', status: 'offline' },
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 3 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
      icon: <PeopleRegular />,
    },
  },
];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
    compare: (a, b) => {
      return a.file.label.localeCompare(b.file.label);
    },
    renderHeaderCell: () => {
      return 'File';
    },
    renderCell: item => {
      return <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>;
    },
  }),
  createTableColumn<Item>({
    columnId: 'author',
    compare: (a, b) => {
      return a.author.label.localeCompare(b.author.label);
    },
    renderHeaderCell: () => {
      return 'Author';
    },
    renderCell: item => {
      return (
        <TableCellLayout
          media={
            <Avatar aria-label={item.author.label} name={item.author.label} badge={{ status: item.author.status }} />
          }
        >
          {item.author.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
    compare: (a, b) => {
      return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
    },
    renderHeaderCell: () => {
      return 'Last updated';
    },

    renderCell: item => {
      return item.lastUpdated.label;
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
    compare: (a, b) => {
      return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
    },
    renderHeaderCell: () => {
      return 'Last update';
    },
    renderCell: item => {
      return <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>;
    },
  }),
];

export const MultipleSelect = (): JSXElement => {
  const defaultSelectedItems = React.useMemo(() => new Set([1]), []);

  return (
    <DataGrid
      items={items}
      columns={columns}
      selectionMode="multiselect"
      defaultSelectedItems={defaultSelectedItems}
      style={{ minWidth: '550px' }}
    >
      <DataGridHeader>
        <DataGridRow
          selectionCell={{
            checkboxIndicator: { 'aria-label': 'Select all rows' },
          }}
        >
          {({ renderHeaderCell }) => <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<Item>>
        {({ item, rowId }) => (
          <DataGridRow<Item>
            key={rowId}
            selectionCell={{
              checkboxIndicator: { 'aria-label': 'Select row' },
            }}
          >
            {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
};
```

### Multiple Select Controlled

To enable selection, the `selectionMode` prop needs to be set. The API surface is directly
equivalent to the usage of `useTableFeatures`.

```tsx
import * as React from 'react';

import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
} from '@fluentui/react-icons';
import {
  PresenceBadgeStatus,
  Avatar,
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
  TableRowId,
  DataGridProps,
} from '@fluentui/react-components';

import type { JSXElement } from '@fluentui/react-components';

type FileCell = {
  label: string;
  icon: JSXElement;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type LastUpdateCell = {
  label: string;
  icon: JSXElement;
};

type AuthorCell = {
  label: string;
  status: PresenceBadgeStatus;
};

type Item = {
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
  lastUpdate: LastUpdateCell;
};

const items: Item[] = [
  {
    file: { label: 'Meeting notes', icon: <DocumentRegular /> },
    author: { label: 'Max Mustermann', status: 'available' },
    lastUpdated: { label: '7h ago', timestamp: 1 },
    lastUpdate: {
      label: 'You edited this',
      icon: <EditRegular />,
    },
  },
  {
    file: { label: 'Thursday presentation', icon: <FolderRegular /> },
    author: { label: 'Erika Mustermann', status: 'busy' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Training recording', icon: <VideoRegular /> },
    author: { label: 'John Doe', status: 'away' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Purchase order', icon: <DocumentPdfRegular /> },
    author: { label: 'Jane Doe', status: 'offline' },
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 3 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
      icon: <PeopleRegular />,
    },
  },
];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
    compare: (a, b) => {
      return a.file.label.localeCompare(b.file.label);
    },
    renderHeaderCell: () => {
      return 'File';
    },
    renderCell: item => {
      return <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>;
    },
  }),
  createTableColumn<Item>({
    columnId: 'author',
    compare: (a, b) => {
      return a.author.label.localeCompare(b.author.label);
    },
    renderHeaderCell: () => {
      return 'Author';
    },
    renderCell: item => {
      return (
        <TableCellLayout
          media={
            <Avatar aria-label={item.author.label} name={item.author.label} badge={{ status: item.author.status }} />
          }
        >
          {item.author.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
    compare: (a, b) => {
      return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
    },
    renderHeaderCell: () => {
      return 'Last updated';
    },

    renderCell: item => {
      return item.lastUpdated.label;
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
    compare: (a, b) => {
      return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
    },
    renderHeaderCell: () => {
      return 'Last update';
    },
    renderCell: item => {
      return <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>;
    },
  }),
];

export const MultipleSelectControlled = (): JSXElement => {
  const [selectedRows, setSelectedRows] = React.useState(new Set<TableRowId>([1]));
  const onSelectionChange: DataGridProps['onSelectionChange'] = (e, data) => {
    setSelectedRows(data.selectedItems);
  };

  return (
    <DataGrid
      items={items}
      columns={columns}
      selectionMode="multiselect"
      selectedItems={selectedRows}
      onSelectionChange={onSelectionChange}
      style={{ minWidth: '550px' }}
    >
      <DataGridHeader>
        <DataGridRow
          selectionCell={{
            checkboxIndicator: { 'aria-label': 'Select all rows' },
          }}
        >
          {({ renderHeaderCell }) => <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<Item>>
        {({ item, rowId }) => (
          <DataGridRow<Item>
            key={rowId}
            selectionCell={{
              checkboxIndicator: { 'aria-label': 'Select row' },
            }}
          >
            {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
};
```

### Resizable Columns (preview)

Columns can be made resizable by passing a prop `resizableColumns`. The resizing configuration for each
column (like `minWidth` and `defaultWidth`), can be further customized by passing down a
`columnSizingOptions` prop.

The control over the state of resizing can be achieved with the combination of `onColumnResize` callback
and setting the `idealWidth` for a column in `columnSizingOptions`.

For accessibility, the `DataGrid` component supports keyboard navigation and screen reader navigation
To make features like column resizing work with keyboard navigation, the `Menu` component is used to provide
a context menu for the header cells, which allows the user to access other DataGrid features.

Once an option is selected, the arrows keys can be used to interact with the `DataGrid` (e.g. resize columns).
`ESC`, `ENTER`, or `SPACE` can be used to return to the original navigation mode.

```tsx
import * as React from 'react';

import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
} from '@fluentui/react-icons';
import {
  PresenceBadgeStatus,
  Avatar,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
  Menu,
  MenuList,
  MenuPopover,
  MenuTrigger,
  MenuItem,
} from '@fluentui/react-components';

import type { JSXElement } from '@fluentui/react-components';

type FileCell = {
  label: string;
  icon: JSXElement;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type LastUpdateCell = {
  label: string;
  icon: JSXElement;
};

type AuthorCell = {
  label: string;
  status: PresenceBadgeStatus;
};

type Item = {
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
  lastUpdate: LastUpdateCell;
};

const items: Item[] = [
  {
    file: { label: 'Meeting notes', icon: <DocumentRegular /> },
    author: { label: 'Max Mustermann', status: 'available' },
    lastUpdated: { label: '7h ago', timestamp: 1 },
    lastUpdate: {
      label: 'You edited this',
      icon: <EditRegular />,
    },
  },
  {
    file: { label: 'Thursday presentation', icon: <FolderRegular /> },
    author: { label: 'Erika Mustermann', status: 'busy' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Training recording', icon: <VideoRegular /> },
    author: { label: 'John Doe', status: 'away' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Purchase order', icon: <DocumentPdfRegular /> },
    author: { label: 'Jane Doe', status: 'offline' },
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 3 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
      icon: <PeopleRegular />,
    },
  },
];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
    compare: (a, b) => {
      return a.file.label.localeCompare(b.file.label);
    },
    renderHeaderCell: () => {
      return 'File';
    },
    renderCell: item => {
      return (
        <TableCellLayout truncate media={item.file.icon}>
          {item.file.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: 'author',
    compare: (a, b) => {
      return a.author.label.localeCompare(b.author.label);
    },
    renderHeaderCell: () => {
      return 'Author';
    },
    renderCell: item => {
      return (
        <TableCellLayout
          truncate
          media={
            <Avatar aria-label={item.author.label} name={item.author.label} badge={{ status: item.author.status }} />
          }
        >
          {item.author.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
    compare: (a, b) => {
      return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
    },
    renderHeaderCell: () => {
      return 'Last updated';
    },

    renderCell: item => {
      return <TableCellLayout truncate>{item.lastUpdated.label}</TableCellLayout>;
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
    compare: (a, b) => {
      return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
    },
    renderHeaderCell: () => {
      return 'Last update';
    },
    renderCell: item => {
      return (
        <TableCellLayout truncate media={item.lastUpdate.icon}>
          {item.lastUpdate.label}
        </TableCellLayout>
      );
    },
  }),
];

const columnSizingOptions = {
  file: {
    minWidth: 80,
    defaultWidth: 120,
  },
  author: {
    defaultWidth: 180,
    minWidth: 120,
    idealWidth: 180,
  },
};

export const ResizableColumns = (): JSXElement => {
  const refMap = React.useRef<Record<string, HTMLElement | null>>({});

  return (
    <div style={{ overflowX: 'auto' }}>
      <DataGrid
        items={items}
        columns={columns}
        sortable
        getRowId={item => item.file.label}
        selectionMode="multiselect"
        resizableColumns
        columnSizingOptions={columnSizingOptions}
      >
        <DataGridHeader>
          <DataGridRow
            selectionCell={{
              checkboxIndicator: { 'aria-label': 'Select all rows' },
            }}
          >
            {({ renderHeaderCell, columnId }, dataGrid) =>
              dataGrid.resizableColumns ? (
                <Menu openOnContext>
                  <MenuTrigger>
                    <DataGridHeaderCell
                      ref={el => {
                        refMap.current[columnId] = el;
                      }}
                    >
                      {renderHeaderCell()}
                    </DataGridHeaderCell>
                  </MenuTrigger>
                  <MenuPopover>
                    <MenuList>
                      <MenuItem onClick={dataGrid.columnSizing_unstable.enableKeyboardMode(columnId)}>
                        Keyboard Column Resizing
                      </MenuItem>
                    </MenuList>
                  </MenuPopover>
                </Menu>
              ) : (
                <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
              )
            }
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<Item>>
          {({ item, rowId }) => (
            <DataGridRow<Item>
              key={rowId}
              selectionCell={{
                checkboxIndicator: { 'aria-label': 'Select row' },
              }}
            >
              {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </div>
  );
};
```

### Resizable Columns - Disabled container auto-fit

In the previous example, the columns are automatically fitted to the container. This means that the columns are
squeezed when the container is narrowed, until the
minimum width is reached, and the last column is extended past its optimal width to fill the available
space. This also effectively prevents the user from making the columns wider than the total width of the
container, as the columns are automatically resized to fit the container.

This behavior can be disabled by passing `resizableColumnsOptions` prop to Datagrid,
with the `{autoFitColumns: false}` option.

With this option, the columns can be made wider than the container, and the container will overflow.
Also, the automatic resizing of adjacent columns will be disabled, as the column are now allowed to be wider
that the container. This also enables the resize handle on the last column.

```tsx
import * as React from 'react';

import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
} from '@fluentui/react-icons';
import {
  PresenceBadgeStatus,
  Avatar,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
  Menu,
  MenuList,
  MenuPopover,
  MenuTrigger,
  MenuItem,
} from '@fluentui/react-components';

import type { JSXElement } from '@fluentui/react-components';

type FileCell = {
  label: string;
  icon: JSXElement;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type LastUpdateCell = {
  label: string;
  icon: JSXElement;
};

type AuthorCell = {
  label: string;
  status: PresenceBadgeStatus;
};

type Item = {
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
  lastUpdate: LastUpdateCell;
};

const items: Item[] = [
  {
    file: { label: 'Meeting notes', icon: <DocumentRegular /> },
    author: { label: 'Max Mustermann', status: 'available' },
    lastUpdated: { label: '7h ago', timestamp: 1 },
    lastUpdate: {
      label: 'You edited this',
      icon: <EditRegular />,
    },
  },
  {
    file: { label: 'Thursday presentation', icon: <FolderRegular /> },
    author: { label: 'Erika Mustermann', status: 'busy' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Training recording', icon: <VideoRegular /> },
    author: { label: 'John Doe', status: 'away' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Purchase order', icon: <DocumentPdfRegular /> },
    author: { label: 'Jane Doe', status: 'offline' },
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 3 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
      icon: <PeopleRegular />,
    },
  },
];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
    compare: (a, b) => {
      return a.file.label.localeCompare(b.file.label);
    },
    renderHeaderCell: () => {
      return 'File';
    },
    renderCell: item => {
      return (
        <TableCellLayout truncate media={item.file.icon}>
          {item.file.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: 'author',
    compare: (a, b) => {
      return a.author.label.localeCompare(b.author.label);
    },
    renderHeaderCell: () => {
      return 'Author';
    },
    renderCell: item => {
      return (
        <TableCellLayout
          truncate
          media={
            <Avatar aria-label={item.author.label} name={item.author.label} badge={{ status: item.author.status }} />
          }
        >
          {item.author.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
    compare: (a, b) => {
      return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
    },
    renderHeaderCell: () => {
      return 'Last updated';
    },

    renderCell: item => {
      return <TableCellLayout truncate>{item.lastUpdated.label}</TableCellLayout>;
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
    compare: (a, b) => {
      return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
    },
    renderHeaderCell: () => {
      return 'Last update';
    },
    renderCell: item => {
      return (
        <TableCellLayout truncate media={item.lastUpdate.icon}>
          {item.lastUpdate.label}
        </TableCellLayout>
      );
    },
  }),
];

const columnSizingOptions = {
  file: {
    minWidth: 80,
    defaultWidth: 180,
  },
  author: {
    defaultWidth: 180,
    minWidth: 120,
    idealWidth: 180,
  },
};

export const ResizableColumnsDisableAutoFit = (): JSXElement => {
  const refMap = React.useRef<Record<string, HTMLElement | null>>({});

  return (
    <div style={{ overflowX: 'auto' }}>
      <DataGrid
        items={items}
        columns={columns}
        sortable
        getRowId={item => item.file.label}
        selectionMode="multiselect"
        resizableColumns
        columnSizingOptions={columnSizingOptions}
        resizableColumnsOptions={{
          autoFitColumns: false,
        }}
      >
        <DataGridHeader>
          <DataGridRow
            selectionCell={{
              checkboxIndicator: { 'aria-label': 'Select all rows' },
            }}
          >
            {({ renderHeaderCell, columnId }, dataGrid) =>
              dataGrid.resizableColumns ? (
                <Menu openOnContext>
                  <MenuTrigger>
                    <DataGridHeaderCell
                      ref={el => {
                        refMap.current[columnId] = el;
                      }}
                    >
                      {renderHeaderCell()}
                    </DataGridHeaderCell>
                  </MenuTrigger>
                  <MenuPopover>
                    <MenuList>
                      <MenuItem onClick={dataGrid.columnSizing_unstable.enableKeyboardMode(columnId)}>
                        Keyboard Column Resizing
                      </MenuItem>
                    </MenuList>
                  </MenuPopover>
                </Menu>
              ) : (
                <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
              )
            }
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<Item>>
          {({ item, rowId }) => (
            <DataGridRow<Item>
              key={rowId}
              selectionCell={{
                checkboxIndicator: { 'aria-label': 'Select row' },
              }}
            >
              {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </div>
  );
};
```

### Selection Appearance

The `selectionAppearance` prop will vary the appearance of selected rows. The default appearance is a brand
background color. However a neutral (grey) background is also available.

```tsx
import * as React from 'react';

import type { JSXElement } from '@fluentui/react-components';
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
} from '@fluentui/react-icons';
import {
  PresenceBadgeStatus,
  Avatar,
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
} from '@fluentui/react-components';

type FileCell = {
  label: string;
  icon: JSXElement;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type LastUpdateCell = {
  label: string;
  icon: JSXElement;
};

type AuthorCell = {
  label: string;
  status: PresenceBadgeStatus;
};

type Item = {
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
  lastUpdate: LastUpdateCell;
};

const items: Item[] = [
  {
    file: { label: 'Meeting notes', icon: <DocumentRegular /> },
    author: { label: 'Max Mustermann', status: 'available' },
    lastUpdated: { label: '7h ago', timestamp: 1 },
    lastUpdate: {
      label: 'You edited this',
      icon: <EditRegular />,
    },
  },
  {
    file: { label: 'Thursday presentation', icon: <FolderRegular /> },
    author: { label: 'Erika Mustermann', status: 'busy' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Training recording', icon: <VideoRegular /> },
    author: { label: 'John Doe', status: 'away' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Purchase order', icon: <DocumentPdfRegular /> },
    author: { label: 'Jane Doe', status: 'offline' },
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 3 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
      icon: <PeopleRegular />,
    },
  },
];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
    compare: (a, b) => {
      return a.file.label.localeCompare(b.file.label);
    },
    renderHeaderCell: () => {
      return 'File';
    },
    renderCell: item => {
      return <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>;
    },
  }),
  createTableColumn<Item>({
    columnId: 'author',
    compare: (a, b) => {
      return a.author.label.localeCompare(b.author.label);
    },
    renderHeaderCell: () => {
      return 'Author';
    },
    renderCell: item => {
      return (
        <TableCellLayout
          media={
            <Avatar aria-label={item.author.label} name={item.author.label} badge={{ status: item.author.status }} />
          }
        >
          {item.author.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
    compare: (a, b) => {
      return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
    },
    renderHeaderCell: () => {
      return 'Last updated';
    },

    renderCell: item => {
      return item.lastUpdated.label;
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
    compare: (a, b) => {
      return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
    },
    renderHeaderCell: () => {
      return 'Last update';
    },
    renderCell: item => {
      return <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>;
    },
  }),
];

export const SelectionAppearance = (): JSXElement => {
  const defaultSelectedItems = React.useMemo(() => new Set([1]), []);

  return (
    <DataGrid
      items={items}
      columns={columns}
      selectionMode="multiselect"
      selectionAppearance="neutral"
      defaultSelectedItems={defaultSelectedItems}
      style={{ minWidth: '550px' }}
    >
      <DataGridHeader>
        <DataGridRow
          selectionCell={{
            checkboxIndicator: { 'aria-label': 'Select all rows' },
          }}
        >
          {({ renderHeaderCell }) => <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<Item>>
        {({ item, rowId }) => (
          <DataGridRow<Item>
            key={rowId}
            selectionCell={{
              checkboxIndicator: { 'aria-label': 'Select row' },
            }}
          >
            {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
};
```

### Single Select

To enable selection, the `selectionMode` prop needs to be set. The API surface is directly
equivalent to the usage of `useTableFeatures`.

```tsx
import * as React from 'react';

import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
} from '@fluentui/react-icons';
import {
  PresenceBadgeStatus,
  Avatar,
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
} from '@fluentui/react-components';

import type { JSXElement } from '@fluentui/react-components';

type FileCell = {
  label: string;
  icon: JSXElement;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type LastUpdateCell = {
  label: string;
  icon: JSXElement;
};

type AuthorCell = {
  label: string;
  status: PresenceBadgeStatus;
};

type Item = {
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
  lastUpdate: LastUpdateCell;
};

const items: Item[] = [
  {
    file: { label: 'Meeting notes', icon: <DocumentRegular /> },
    author: { label: 'Max Mustermann', status: 'available' },
    lastUpdated: { label: '7h ago', timestamp: 1 },
    lastUpdate: {
      label: 'You edited this',
      icon: <EditRegular />,
    },
  },
  {
    file: { label: 'Thursday presentation', icon: <FolderRegular /> },
    author: { label: 'Erika Mustermann', status: 'busy' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Training recording', icon: <VideoRegular /> },
    author: { label: 'John Doe', status: 'away' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Purchase order', icon: <DocumentPdfRegular /> },
    author: { label: 'Jane Doe', status: 'offline' },
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 3 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
      icon: <PeopleRegular />,
    },
  },
];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
    compare: (a, b) => {
      return a.file.label.localeCompare(b.file.label);
    },
    renderHeaderCell: () => {
      return 'File';
    },
    renderCell: item => {
      return <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>;
    },
  }),
  createTableColumn<Item>({
    columnId: 'author',
    compare: (a, b) => {
      return a.author.label.localeCompare(b.author.label);
    },
    renderHeaderCell: () => {
      return 'Author';
    },
    renderCell: item => {
      return (
        <TableCellLayout
          media={
            <Avatar aria-label={item.author.label} name={item.author.label} badge={{ status: item.author.status }} />
          }
        >
          {item.author.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
    compare: (a, b) => {
      return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
    },
    renderHeaderCell: () => {
      return 'Last updated';
    },

    renderCell: item => {
      return item.lastUpdated.label;
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
    compare: (a, b) => {
      return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
    },
    renderHeaderCell: () => {
      return 'Last update';
    },
    renderCell: item => {
      return <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>;
    },
  }),
];

export const SingleSelect = (): JSXElement => {
  const defaultSelectedItems = React.useMemo(() => new Set([1]), []);

  return (
    <DataGrid
      items={items}
      columns={columns}
      selectionMode="single"
      defaultSelectedItems={defaultSelectedItems}
      style={{ minWidth: '550px' }}
    >
      <DataGridHeader>
        <DataGridRow>
          {({ renderHeaderCell }) => <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<Item>>
        {({ item, rowId }) => (
          <DataGridRow<Item> key={rowId} selectionCell={{ radioIndicator: { 'aria-label': 'Select row' } }}>
            {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
};
```

### Single Select Controlled

To enable selection, the `selectionMode` prop needs to be set. The API surface is directly
equivalent to the usage of `useTableFeatures`.

```tsx
import * as React from 'react';

import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
} from '@fluentui/react-icons';
import {
  PresenceBadgeStatus,
  Avatar,
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
  TableRowId,
  DataGridProps,
} from '@fluentui/react-components';

import type { JSXElement } from '@fluentui/react-components';

type FileCell = {
  label: string;
  icon: JSXElement;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type LastUpdateCell = {
  label: string;
  icon: JSXElement;
};

type AuthorCell = {
  label: string;
  status: PresenceBadgeStatus;
};

type Item = {
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
  lastUpdate: LastUpdateCell;
};

const items: Item[] = [
  {
    file: { label: 'Meeting notes', icon: <DocumentRegular /> },
    author: { label: 'Max Mustermann', status: 'available' },
    lastUpdated: { label: '7h ago', timestamp: 1 },
    lastUpdate: {
      label: 'You edited this',
      icon: <EditRegular />,
    },
  },
  {
    file: { label: 'Thursday presentation', icon: <FolderRegular /> },
    author: { label: 'Erika Mustermann', status: 'busy' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Training recording', icon: <VideoRegular /> },
    author: { label: 'John Doe', status: 'away' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Purchase order', icon: <DocumentPdfRegular /> },
    author: { label: 'Jane Doe', status: 'offline' },
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 3 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
      icon: <PeopleRegular />,
    },
  },
];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
    compare: (a, b) => {
      return a.file.label.localeCompare(b.file.label);
    },
    renderHeaderCell: () => {
      return 'File';
    },
    renderCell: item => {
      return <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>;
    },
  }),
  createTableColumn<Item>({
    columnId: 'author',
    compare: (a, b) => {
      return a.author.label.localeCompare(b.author.label);
    },
    renderHeaderCell: () => {
      return 'Author';
    },
    renderCell: item => {
      return (
        <TableCellLayout
          media={
            <Avatar aria-label={item.author.label} name={item.author.label} badge={{ status: item.author.status }} />
          }
        >
          {item.author.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
    compare: (a, b) => {
      return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
    },
    renderHeaderCell: () => {
      return 'Last updated';
    },

    renderCell: item => {
      return item.lastUpdated.label;
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
    compare: (a, b) => {
      return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
    },
    renderHeaderCell: () => {
      return 'Last update';
    },
    renderCell: item => {
      return <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>;
    },
  }),
];

export const SingleSelectControlled = (): JSXElement => {
  const [selectedRows, setSelectedRows] = React.useState(new Set<TableRowId>([1]));
  const onSelectionChange: DataGridProps['onSelectionChange'] = (e, data) => {
    setSelectedRows(data.selectedItems);
  };

  return (
    <DataGrid
      items={items}
      columns={columns}
      selectionMode="single"
      selectedItems={selectedRows}
      onSelectionChange={onSelectionChange}
      style={{ minWidth: '550px' }}
    >
      <DataGridHeader>
        <DataGridRow>
          {({ renderHeaderCell }) => <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<Item>>
        {({ item, rowId }) => (
          <DataGridRow<Item> key={rowId} selectionCell={{ radioIndicator: { 'aria-label': 'Select row' } }}>
            {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
};
```

### Sort

To enable sorting, the `sortable` prop needs to be set.

> ⚠️ Column definitions without a `compare` function will not be sortable.

> Due to screen reader support, the sort status might not be announced once a sortable column header
> is invoked. [This is a known issue.](https://github.com/nvaccess/nvda/issues/10890)
> However the implementation still follows the
> [pattern recommended by the WAI](https://www.w3.org/WAI/ARIA/apg/example-index/table/sortable-table.html)

```tsx
import * as React from 'react';

import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
} from '@fluentui/react-icons';
import {
  PresenceBadgeStatus,
  Avatar,
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridProps,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
} from '@fluentui/react-components';

import type { JSXElement } from '@fluentui/react-components';

type FileCell = {
  label: string;
  icon: JSXElement;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type LastUpdateCell = {
  label: string;
  icon: JSXElement;
};

type AuthorCell = {
  label: string;
  status: PresenceBadgeStatus;
};

type Item = {
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
  lastUpdate: LastUpdateCell;
};

const items: Item[] = [
  {
    file: { label: 'Meeting notes', icon: <DocumentRegular /> },
    author: { label: 'Max Mustermann', status: 'available' },
    lastUpdated: { label: '7h ago', timestamp: 1 },
    lastUpdate: {
      label: 'You edited this',
      icon: <EditRegular />,
    },
  },
  {
    file: { label: 'Thursday presentation', icon: <FolderRegular /> },
    author: { label: 'Erika Mustermann', status: 'busy' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Training recording', icon: <VideoRegular /> },
    author: { label: 'John Doe', status: 'away' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Purchase order', icon: <DocumentPdfRegular /> },
    author: { label: 'Jane Doe', status: 'offline' },
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 3 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
      icon: <PeopleRegular />,
    },
  },
];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
    compare: (a, b) => {
      return a.file.label.localeCompare(b.file.label);
    },
    renderHeaderCell: () => {
      return 'File';
    },
    renderCell: item => {
      return <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>;
    },
  }),
  createTableColumn<Item>({
    columnId: 'author',
    compare: (a, b) => {
      return a.author.label.localeCompare(b.author.label);
    },
    renderHeaderCell: () => {
      return 'Author';
    },
    renderCell: item => {
      return (
        <TableCellLayout
          media={
            <Avatar aria-label={item.author.label} name={item.author.label} badge={{ status: item.author.status }} />
          }
        >
          {item.author.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
    compare: (a, b) => {
      return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
    },
    renderHeaderCell: () => {
      return 'Last updated';
    },

    renderCell: item => {
      return item.lastUpdated.label;
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
    renderHeaderCell: () => {
      return 'Not sortable';
    },
    renderCell: item => {
      return <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>;
    },
  }),
];

export const Sort = (): JSXElement => {
  const defaultSortState = React.useMemo<Parameters<NonNullable<DataGridProps['onSortChange']>>[1]>(
    () => ({ sortColumn: 'file', sortDirection: 'ascending' }),
    [],
  );

  return (
    <DataGrid
      items={items}
      columns={columns}
      sortable
      defaultSortState={defaultSortState}
      style={{ minWidth: '500px' }}
    >
      <DataGridHeader>
        <DataGridRow>
          {({ renderHeaderCell }) => <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<Item>>
        {({ item, rowId }) => (
          <DataGridRow<Item> key={rowId}>
            {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
};
```

### Sort Controlled

To enable sorting, the `sortable` prop needs to be set. The API surface is directly
equivalent to the usage of `useTableFeatures`.

```tsx
import * as React from 'react';

import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
} from '@fluentui/react-icons';
import {
  PresenceBadgeStatus,
  Avatar,
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
  DataGridProps,
} from '@fluentui/react-components';

import type { JSXElement } from '@fluentui/react-components';

type FileCell = {
  label: string;
  icon: JSXElement;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type LastUpdateCell = {
  label: string;
  icon: JSXElement;
};

type AuthorCell = {
  label: string;
  status: PresenceBadgeStatus;
};

type Item = {
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
  lastUpdate: LastUpdateCell;
};

const items: Item[] = [
  {
    file: { label: 'Meeting notes', icon: <DocumentRegular /> },
    author: { label: 'Max Mustermann', status: 'available' },
    lastUpdated: { label: '7h ago', timestamp: 1 },
    lastUpdate: {
      label: 'You edited this',
      icon: <EditRegular />,
    },
  },
  {
    file: { label: 'Thursday presentation', icon: <FolderRegular /> },
    author: { label: 'Erika Mustermann', status: 'busy' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Training recording', icon: <VideoRegular /> },
    author: { label: 'John Doe', status: 'away' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Purchase order', icon: <DocumentPdfRegular /> },
    author: { label: 'Jane Doe', status: 'offline' },
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 3 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
      icon: <PeopleRegular />,
    },
  },
];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
    compare: (a, b) => {
      return a.file.label.localeCompare(b.file.label);
    },
    renderHeaderCell: () => {
      return 'File';
    },
    renderCell: item => {
      return <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>;
    },
  }),
  createTableColumn<Item>({
    columnId: 'author',
    compare: (a, b) => {
      return a.author.label.localeCompare(b.author.label);
    },
    renderHeaderCell: () => {
      return 'Author';
    },
    renderCell: item => {
      return (
        <TableCellLayout
          media={
            <Avatar aria-label={item.author.label} name={item.author.label} badge={{ status: item.author.status }} />
          }
        >
          {item.author.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
    compare: (a, b) => {
      return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
    },
    renderHeaderCell: () => {
      return 'Last updated';
    },

    renderCell: item => {
      return item.lastUpdated.label;
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
    compare: (a, b) => {
      return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
    },
    renderHeaderCell: () => {
      return 'Last update';
    },
    renderCell: item => {
      return <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>;
    },
  }),
];

export const SortControlled = (): JSXElement => {
  const [sortState, setSortState] = React.useState<Parameters<NonNullable<DataGridProps['onSortChange']>>[1]>({
    sortColumn: 'file',
    sortDirection: 'ascending',
  });
  const onSortChange: DataGridProps['onSortChange'] = (e, nextSortState) => {
    setSortState(nextSortState);
  };

  return (
    <DataGrid
      items={items}
      columns={columns}
      sortable
      sortState={sortState}
      onSortChange={onSortChange}
      style={{ minWidth: '500px' }}
    >
      <DataGridHeader>
        <DataGridRow>
          {({ renderHeaderCell }) => <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<Item>>
        {({ item, rowId }) => (
          <DataGridRow<Item> key={rowId}>
            {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
};
```

### Subtle Selection

To enable subtle selection mode, the `subtleSelection` should be set.
The selection indicator slot will only
appear when:

- the `DataGridRow` component is hovered.
- The current focused element is within the `DataGridRow`
- The `DataGridSelectionCell` is checked

```tsx
import * as React from 'react';

import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
} from '@fluentui/react-icons';
import {
  PresenceBadgeStatus,
  Avatar,
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
} from '@fluentui/react-components';

import type { JSXElement } from '@fluentui/react-components';

type FileCell = {
  label: string;
  icon: JSXElement;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type LastUpdateCell = {
  label: string;
  icon: JSXElement;
};

type AuthorCell = {
  label: string;
  status: PresenceBadgeStatus;
};

type Item = {
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
  lastUpdate: LastUpdateCell;
};

const items: Item[] = [
  {
    file: { label: 'Meeting notes', icon: <DocumentRegular /> },
    author: { label: 'Max Mustermann', status: 'available' },
    lastUpdated: { label: '7h ago', timestamp: 1 },
    lastUpdate: {
      label: 'You edited this',
      icon: <EditRegular />,
    },
  },
  {
    file: { label: 'Thursday presentation', icon: <FolderRegular /> },
    author: { label: 'Erika Mustermann', status: 'busy' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Training recording', icon: <VideoRegular /> },
    author: { label: 'John Doe', status: 'away' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Purchase order', icon: <DocumentPdfRegular /> },
    author: { label: 'Jane Doe', status: 'offline' },
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 3 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
      icon: <PeopleRegular />,
    },
  },
];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
    compare: (a, b) => {
      return a.file.label.localeCompare(b.file.label);
    },
    renderHeaderCell: () => {
      return 'File';
    },
    renderCell: item => {
      return <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>;
    },
  }),
  createTableColumn<Item>({
    columnId: 'author',
    compare: (a, b) => {
      return a.author.label.localeCompare(b.author.label);
    },
    renderHeaderCell: () => {
      return 'Author';
    },
    renderCell: item => {
      return (
        <TableCellLayout
          media={
            <Avatar aria-label={item.author.label} name={item.author.label} badge={{ status: item.author.status }} />
          }
        >
          {item.author.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
    compare: (a, b) => {
      return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
    },
    renderHeaderCell: () => {
      return 'Last updated';
    },

    renderCell: item => {
      return item.lastUpdated.label;
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
    compare: (a, b) => {
      return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
    },
    renderHeaderCell: () => {
      return 'Last update';
    },
    renderCell: item => {
      return <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>;
    },
  }),
];

export const SubtleSelection = (): JSXElement => {
  const defaultSelectedItems = React.useMemo(() => new Set([1]), []);

  return (
    <DataGrid
      items={items}
      columns={columns}
      selectionMode="multiselect"
      subtleSelection
      defaultSelectedItems={defaultSelectedItems}
      style={{ minWidth: '550px' }}
    >
      <DataGridHeader>
        <DataGridRow
          selectionCell={{
            checkboxIndicator: { 'aria-label': 'Select all rows' },
          }}
        >
          {({ renderHeaderCell }) => <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<Item>>
        {({ item, rowId }) => (
          <DataGridRow<Item>
            key={rowId}
            selectionCell={{
              checkboxIndicator: { 'aria-label': 'Select row' },
            }}
          >
            {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
};
```

### Virtualization

Virtualizating the DataGrid component involves recomposing components to use a virtualized container.
This is already done in the extension package `@fluentui-contrib/react-data-grid-react-window` which provides
extended DataGrid components that are powered
by [react-window](https://react-window.vercel.app/#/examples/list/fixed-size).

The example below shows how to use this extension package to virtualize the DataGrid component.

Here some useful links for the package:

- [Storybook documentation](https://microsoft.github.io/fluentui-contrib/react-data-grid-react-window/?path=/story/datagrid--virtualized-data-grid)
- [NPM page](https://www.npmjs.com/package/@fluentui-contrib/react-data-grid-react-window)
- [README](https://github.com/microsoft/fluentui-contrib/blob/main/packages/react-data-grid-react-window/README.md)

> ⚠️ Make sure to memoize the row render function to avoid excessive unmouting/mounting of components.
> react-window will [create components based on this renderer](https://react-window.vercel.app/#/api/FixedSizeList)

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
export const Virtualization = (): JSXElement => {
  return (
    <iframe
      style={{ width: '100%', height: 500, border: 'none' }}
      src="https://microsoft.github.io/fluentui-contrib/react-data-grid-react-window/iframe.html?id=packages-react-data-grid-react-window--virtualized-data-grid&viewMode=story"
    />
  );
};
```
