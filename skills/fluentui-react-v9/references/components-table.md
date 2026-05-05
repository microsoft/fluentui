# Components/Table

> 💡 This component is considered **low-level** and should be used when there is a need for more **customization** and
> support for **non-standard features**. Please check out the **DataGrid component**
> if you don't need lots of customization and rely on common features. There is less work involved and you will benefit
> from first class Microsoft design and accessibility support.

A Table displays sets of two-dimensional data. The primitive components can be fully customized to support different
feature sets. The library provides a default `useTableFeatures` hook that handles the business logic and state management of common
features. There is no obligation to use our hook with these components, we've created it for convenience.

The `useTableFeatures` hook was designed with feature composition in mind. This means that they are composed using
plugins hooks such as `useTableSort` and `useTableSelection` as a part of `useTableFeatures`. This means
that as the feature set expands, users will not need to pay the bundle size price for features that they do not intend
to use. Please consult the usage examples below for more details.

> ⚠️ Once there is any kind of keyboard navigation on the component it must follow the
> [aria role="grid" pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/examples/data-grids/)

## Best Practices

### Do

- Always enclude a `TableHeader` row.
- When the Table is preceded by a heading or other visible labelling text, use `aria-labelledby` to point to the heading's `id`.
- When the Table does not have any visible text label, use `aria-label` to give it an accessible name.
- Set a `min-width` style to ensure the Table displays properly at high zoom levels or small screens.

### Don't

- Use Table to display single-column content.
- Override the `role` attribute of Table controls.

## Props

| Name               | Type                             | Required | Default | Description                                                                                                                                |
| ------------------ | -------------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `as`               | `"div" "table"`                  | No       |         |                                                                                                                                            |
| `size`             | `"small" "medium" "extra-small"` | No       | medium  | Affects the sizes of all table subcomponents                                                                                               |
| `noNativeElements` | `boolean`                        | No       | false   | Render all table elements as divs instead of semantic table elements Using divs no longer uses `display: table` layout but `display: flex` |
| `sortable`         | `boolean`                        | No       | false   | Whether the table is sortable                                                                                                              |
| `ref`              | `Ref<HTMLDivElement>`            | No       |         |                                                                                                                                            |

## Subcomponents

### TableHeader

TableHeader component

#### Props

| Name  | Type                  | Required | Default | Description |
| ----- | --------------------- | -------- | ------- | ----------- |
| `as`  | `"div" "thead"`       | No       |         |             |
| `ref` | `Ref<HTMLDivElement>` | No       |         |             |

### TableHeaderCell

TableHeaderCell component

#### Props

| Name            | Type                                                                                                                                         | Required | Default   | Description                    |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------- | ------------------------------ | ------------------------------------------------------------------------------------- |
| `aside`         | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No        |                                | aside content for anything that should be after main content of the table header cell |
| `button`        | `NonNullable<WithSlotShorthandValue<ARIAButtonSlotProps>                                                                                     | null>`   | No        |                                | Button handles correct narration and interactions for sorting;                        |
| `sortIcon`      | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No        |                                |                                                                                       |
| `as`            | `"div" "th"`                                                                                                                                 | No       |           |                                |
| `sortable`      | `boolean`                                                                                                                                    | No       | false     | Whether the column is sortable |
| `sortDirection` | `"ascending" "descending"`                                                                                                                   | No       | undefined |                                |
| `ref`           | `Ref<HTMLDivElement>`                                                                                                                        | No       |           |                                |

### TableBody

TableBody component

#### Props

| Name  | Type                  | Required | Default | Description |
| ----- | --------------------- | -------- | ------- | ----------- |
| `as`  | `"div" "tbody"`       | No       |         |             |
| `ref` | `Ref<HTMLDivElement>` | No       |         |             |

### TableRow

TableRow component

#### Props

| Name         | Type                       | Required | Default | Description                                                                                        |
| ------------ | -------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------- |
| `as`         | `"div" "tr"`               | No       |         |                                                                                                    |
| `appearance` | `"none" "neutral" "brand"` | No       | none    | A table row can have different variants. These appearances are intended to be used with selection. |
| `ref`        | `Ref<HTMLDivElement>`      | No       |         |                                                                                                    |

### TableCell

TableCell component

#### Props

| Name  | Type                  | Required | Default | Description |
| ----- | --------------------- | -------- | ------- | ----------- |
| `as`  | `"div" "td"`          | No       |         |             |
| `ref` | `Ref<HTMLDivElement>` | No       |         |             |

### TableSelectionCell

TableSelectionCell component

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

### TableCellLayout

TableCellLayout component

#### Props

| Name          | Type                                                                                                                                         | Required | Default   | Description                                                       |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `main`        | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No        |                                                                   | Main text for the table cell. Children of the root slot are automatically rendered here |
| `as`          | `"div"`                                                                                                                                      | No       |           |                                                                   |
| `media`       | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No        |                                                                   | Slot for an icon or other visual element                                                |
| `description` | `WithSlotShorthandValue<{ as?: "span"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "children"> & { ...; }> | null`    | No        |                                                                   | Secondary text that describes or complements the main text                              |
| `content`     | `WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }>    | null`    | No        |                                                                   | A layout wrapper for the main and description slots                                     |
| `appearance`  | `"primary"`                                                                                                                                  | No       | undefined | Renders design variants of the table cell                         |
| `truncate`    | `boolean`                                                                                                                                    | No       |           | Renders content with overflow: hidden and text-overflow: ellipsis |
| `ref`         | `Ref<HTMLDivElement>`                                                                                                                        | No       |           |                                                                   |

## Examples

### Cell Actions

`TableCellActions` is a container that is visible when the `TableRow`is hovered
or when the current focused element is within the row. It is commonly used to contain interactive actions
like buttons, but can be used for any generic content. Please ensure that the contents of cell actions
are accessible.

```tsx
import * as React from 'react';

import {
  FolderRegular,
  EditRegular,
  EditFilled,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
  MoreHorizontalRegular,
  MoreHorizontalFilled,
  bundleIcon,
} from '@fluentui/react-icons';
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellActions,
  TableCellLayout,
  PresenceBadgeStatus,
  Avatar,
  Button,
} from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';

const EditIcon = bundleIcon(EditFilled, EditRegular);
const MoreHorizontalIcon = bundleIcon(MoreHorizontalFilled, MoreHorizontalRegular);

const items = [
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

const columns = [
  { columnKey: 'file', label: 'File' },
  { columnKey: 'author', label: 'Author' },
  { columnKey: 'lastUpdated', label: 'Last updated' },
  { columnKey: 'lastUpdate', label: 'Last update' },
];

export const CellActions = (): JSXElement => {
  return (
    <Table aria-label="Table with cell actions" style={{ minWidth: '500px' }}>
      <TableHeader>
        <TableRow>
          {columns.map(column => (
            <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map(item => (
          <TableRow key={item.file.label}>
            <TableCell>
              <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
              <TableCellActions>
                <Button icon={<EditIcon />} appearance="subtle" aria-label="Edit" />
                <Button icon={<MoreHorizontalIcon />} appearance="subtle" aria-label="More actions" />
              </TableCellActions>
            </TableCell>
            <TableCell>
              <TableCellLayout
                media={
                  <Avatar
                    aria-label={item.author.label}
                    name={item.author.label}
                    badge={{
                      status: item.author.status as PresenceBadgeStatus,
                    }}
                  />
                }
              >
                {item.author.label}
              </TableCellLayout>
            </TableCell>
            <TableCell>{item.lastUpdated.label}</TableCell>
            <TableCell>
              <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
```

### Cell Navigation

The `Table` primitive components do not support keyboard navigation. This should be added by users.
Cell navigation can be achieved simply using the `useArrowNavigationGroup` utility provided by the Library.

> ⚠️ Once there is any kind of keyboard navigation on the component it must follow the
> [aria role="grid" pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/examples/data-grids/).

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
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  PresenceBadgeStatus,
  Avatar,
  Button,
  useArrowNavigationGroup,
} from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';

const items = [
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

const columns = [
  { columnKey: 'file', label: 'File' },
  { columnKey: 'author', label: 'Author' },
  { columnKey: 'lastUpdated', label: 'Last updated' },
  { columnKey: 'lastUpdate', label: 'Last update' },
];

export const CellNavigation = (): JSXElement => {
  const keyboardNavAttr = useArrowNavigationGroup({ axis: 'grid' });

  return (
    <Table
      {...keyboardNavAttr}
      role="grid"
      aria-label="Table with grid keyboard navigation"
      style={{ minWidth: '600px' }}
    >
      <TableHeader>
        <TableRow>
          {columns.map(column => (
            <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
          ))}
          <TableHeaderCell />
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map(item => (
          <TableRow key={item.file.label}>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout
                media={
                  <Avatar
                    aria-label={item.author.label}
                    name={item.author.label}
                    badge={{
                      status: item.author.status as PresenceBadgeStatus,
                    }}
                  />
                }
              >
                {item.author.label}
              </TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              {item.lastUpdated.label}
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
            </TableCell>
            <TableCell role="gridcell">
              <TableCellLayout>
                <Button icon={<EditRegular />}>Edit</Button>
              </TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
```

### Composite Navigation

Different keyboard navigation strategies are supported through the `focusMode` prop.
Composite navigation combines row focus and cell focus. By default the user navigates the table
by row. When the user presses the right arrow key, focus mode switches to cells of the current row.

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
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  useTableCompositeNavigation,
} from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';

const items = [
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

const columns = [
  { columnKey: 'file', label: 'File' },
  { columnKey: 'author', label: 'Author' },
  { columnKey: 'lastUpdated', label: 'Last updated' },
  { columnKey: 'lastUpdate', label: 'Last update' },
];

export const CompositeNavigation = (): JSXElement => {
  const { tableRowTabsterAttribute, tableTabsterAttribute, onTableKeyDown } = useTableCompositeNavigation();

  return (
    <Table
      role="grid"
      aria-label="Table with grid keyboard navigation"
      noNativeElements
      onKeyDown={onTableKeyDown}
      style={{ minWidth: '500px' }}
      {...tableTabsterAttribute}
    >
      <TableHeader>
        <TableRow>
          {columns.map(column => (
            <TableHeaderCell tabIndex={0} key={column.columnKey}>
              {column.label}
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map(item => (
          <TableRow tabIndex={0} key={item.file.label} {...tableRowTabsterAttribute}>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout
                media={
                  <Avatar
                    aria-label={item.author.label}
                    name={item.author.label}
                    badge={{
                      status: item.author.status as PresenceBadgeStatus,
                    }}
                  />
                }
              >
                {item.author.label}
              </TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              {item.lastUpdated.label}
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
```

### Data Grid

The `DataGrid` component is a composition of the `useTableFeatures` hook and primitive `Table` components
along with some convenience features such as accessible markup and event handlers.
Any feature of the `DataGrid` is achievable with the primitive components and hook

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
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableSelectionCell,
  TableCellLayout,
  useTableFeatures,
  TableColumnDefinition,
  useTableSelection,
  useTableSort,
  createTableColumn,
  TableColumnId,
  PresenceBadgeStatus,
  Avatar,
  useArrowNavigationGroup,
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
    lastUpdated: { label: '7h ago', timestamp: 3 },
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
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 1 },
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
  }),
  createTableColumn<Item>({
    columnId: 'author',
    compare: (a, b) => {
      return a.author.label.localeCompare(b.author.label);
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
    compare: (a, b) => {
      return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
    compare: (a, b) => {
      return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
    },
  }),
];

export const DataGrid = (): JSXElement => {
  const {
    getRows,
    selection: { allRowsSelected, someRowsSelected, toggleAllRows, toggleRow, isRowSelected },
    sort: { getSortDirection, toggleColumnSort, sort },
  } = useTableFeatures(
    {
      columns,
      items,
    },
    [
      useTableSelection({
        selectionMode: 'multiselect',
        defaultSelectedItems: new Set([0, 1]),
      }),
      useTableSort({
        defaultSortState: { sortColumn: 'file', sortDirection: 'ascending' },
      }),
    ],
  );

  const rows = sort(
    getRows(row => {
      const selected = isRowSelected(row.rowId);
      return {
        ...row,
        onClick: (e: React.MouseEvent) => toggleRow(e, row.rowId),
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === ' ') {
            e.preventDefault();
            toggleRow(e, row.rowId);
          }
        },
        selected,
        appearance: selected ? ('brand' as const) : ('none' as const),
      };
    }),
  );

  const headerSortProps = (columnId: TableColumnId) => ({
    onClick: (e: React.MouseEvent) => {
      toggleColumnSort(e, columnId);
    },
    sortDirection: getSortDirection(columnId),
  });

  const keyboardNavAttr = useArrowNavigationGroup({ axis: 'grid' });

  return (
    <Table
      {...keyboardNavAttr}
      role="grid"
      sortable
      aria-label="DataGrid implementation with Table primitives"
      style={{ minWidth: '550px' }}
    >
      <TableHeader>
        <TableRow>
          <TableSelectionCell
            checked={allRowsSelected ? true : someRowsSelected ? 'mixed' : false}
            aria-checked={allRowsSelected ? true : someRowsSelected ? 'mixed' : false}
            role="checkbox"
            onClick={toggleAllRows}
            checkboxIndicator={{ 'aria-label': 'Select all rows ' }}
          />

          <TableHeaderCell {...headerSortProps('file')}>File</TableHeaderCell>
          <TableHeaderCell {...headerSortProps('author')}>Author</TableHeaderCell>
          <TableHeaderCell {...headerSortProps('lastUpdated')}>Last updated</TableHeaderCell>
          <TableHeaderCell {...headerSortProps('lastUpdate')}>Last update</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(({ item, selected, onClick, onKeyDown, appearance }) => (
          <TableRow
            key={item.file.label}
            onClick={onClick}
            onKeyDown={onKeyDown}
            aria-selected={selected}
            appearance={appearance}
          >
            <TableSelectionCell
              role="gridcell"
              aria-selected={selected}
              checked={selected}
              checkboxIndicator={{ 'aria-label': 'Select row' }}
            />

            <TableCell tabIndex={0} role="gridcell" aria-selected={selected}>
              <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout
                media={
                  <Avatar
                    aria-label={item.author.label}
                    name={item.author.label}
                    badge={{ status: item.author.status }}
                  />
                }
              >
                {item.author.label}
              </TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              {item.lastUpdated.label}
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
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
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  PresenceBadgeStatus,
  Avatar,
} from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';

const items = [
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

const columns = [
  { columnKey: 'file', label: 'File' },
  { columnKey: 'author', label: 'Author' },
  { columnKey: 'lastUpdated', label: 'Last updated' },
  { columnKey: 'lastUpdate', label: 'Last update' },
];

export const Default = (): JSXElement => {
  return (
    <Table arial-label="Default table" style={{ minWidth: '510px' }}>
      <TableHeader>
        <TableRow>
          {columns.map(column => (
            <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map(item => (
          <TableRow key={item.file.label}>
            <TableCell>
              <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout
                media={
                  <Avatar
                    aria-label={item.author.label}
                    name={item.author.label}
                    badge={{
                      status: item.author.status as PresenceBadgeStatus,
                    }}
                  />
                }
              >
                {item.author.label}
              </TableCellLayout>
            </TableCell>
            <TableCell>{item.lastUpdated.label}</TableCell>
            <TableCell>
              <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
```

### Focusable Elements In Cells

When the keyboard navigation is implemented on a Table, there needs to be special handling for cells
that contain multiple focusable elements. In these cases, the `TableCell` should be focusable and the
following keyboard pattern should apply:

- Enter keypress should move focus inside the cell
- Focus should be trapped while it is in a cell
- Escape keypress hould focus back on the cell

This can be done using the `useFocusableGroup` hook with the tab behaviour set to `limited-trap-focus`.
The props returned from the hook should be spread to the `TableCell`.

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
  DeleteRegular,
} from '@fluentui/react-icons';
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  PresenceBadgeStatus,
  Avatar,
  Button,
  useArrowNavigationGroup,
  useFocusableGroup,
} from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';

const items = [
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

const columns = [
  { columnKey: 'file', label: 'File' },
  { columnKey: 'author', label: 'Author' },
  { columnKey: 'lastUpdated', label: 'Last updated' },
  { columnKey: 'lastUpdate', label: 'Last update' },
  { columnKey: 'actions', label: 'Actions' },
];

export const FocusableElementsInCells = (): JSXElement => {
  const keyboardNavAttr = useArrowNavigationGroup({ axis: 'grid' });
  const focusableGroupAttr = useFocusableGroup({
    tabBehavior: 'limited-trap-focus',
  });

  return (
    <Table
      {...keyboardNavAttr}
      role="grid"
      aria-label="Table with grid keyboard navigation"
      style={{ minWidth: '620px' }}
    >
      <TableHeader>
        <TableRow>
          {columns.map(column => (
            <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map(item => (
          <TableRow key={item.file.label}>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout
                media={
                  <Avatar
                    aria-label={item.author.label}
                    name={item.author.label}
                    badge={{
                      status: item.author.status as PresenceBadgeStatus,
                    }}
                  />
                }
              >
                {item.author.label}
              </TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              {item.lastUpdated.label}
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
            </TableCell>
            <TableCell role="gridcell" tabIndex={0} {...focusableGroupAttr}>
              <TableCellLayout>
                <Button icon={<EditRegular />} aria-label="Edit" />
                <Button icon={<DeleteRegular />} aria-label="Delete" />
              </TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
```

### Memoization

There is no single correct way to memoize components. It is important to note that memoization is not free
and should only be used to optimize scenarios that can be identified as performance bottlenecks. This
example demonstrates a reasonable memoization strategy to memoize entire table. When a row's selection
changes, only the affected row is re-rendered.

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
  useArrowNavigationGroup,
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableSelectionCell,
  TableCellLayout,
  useTableFeatures,
  TableColumnDefinition,
  useTableSelection,
  useTableSort,
  createTableColumn,
  TableColumnId,
  TableRowId,
  TableRowProps,
  TableSelectionState,
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
    lastUpdated: { label: '7h ago', timestamp: 3 },
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
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 1 },
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
  }),
  createTableColumn<Item>({
    columnId: 'author',
    compare: (a, b) => {
      return a.author.label.localeCompare(b.author.label);
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
    compare: (a, b) => {
      return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
    compare: (a, b) => {
      return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
    },
  }),
];

export const Memoization = (): JSXElement => {
  const {
    getRows,
    selection: { allRowsSelected, someRowsSelected, toggleAllRows, toggleRow, isRowSelected },
    sort: { getSortDirection, toggleColumnSort, sort },
  } = useTableFeatures(
    {
      columns,
      items,
    },
    [
      useTableSelection({
        selectionMode: 'multiselect',
        defaultSelectedItems: new Set([0, 1]),
      }),
      useTableSort({
        defaultSortState: { sortColumn: 'file', sortDirection: 'ascending' },
      }),
    ],
  );

  const rows = sort(
    getRows(row => {
      const selected = isRowSelected(row.rowId);
      return {
        ...row,
        selected,
        appearance: selected ? ('brand' as const) : ('none' as const),
      };
    }),
  );

  const headerSortProps = (columnId: TableColumnId) => ({
    onClick: (e: React.MouseEvent) => {
      toggleColumnSort(e, columnId);
    },
    sortDirection: getSortDirection(columnId),
  });

  const keyboardNavAttr = useArrowNavigationGroup({ axis: 'grid' });

  return (
    <Table
      {...keyboardNavAttr}
      role="grid"
      sortable
      aria-label="DataGrid implementation with Table primitives"
      style={{ minWidth: '550px' }}
    >
      <TableHeader>
        <TableRow>
          <TableSelectionCell
            checked={allRowsSelected ? true : someRowsSelected ? 'mixed' : false}
            aria-checked={allRowsSelected ? true : someRowsSelected ? 'mixed' : false}
            role="checkbox"
            onClick={toggleAllRows}
            checkboxIndicator={{ 'aria-label': 'Select all rows ' }}
          />

          <TableHeaderCell {...headerSortProps('file')}>File</TableHeaderCell>
          <TableHeaderCell {...headerSortProps('author')}>Author</TableHeaderCell>
          <TableHeaderCell {...headerSortProps('lastUpdated')}>Last updated</TableHeaderCell>
          <TableHeaderCell {...headerSortProps('lastUpdate')}>Last update</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(({ item, selected, appearance, rowId }) => (
          <TableSelectableRowMemoized
            key={rowId}
            rowId={rowId}
            toggleRow={toggleRow}
            item={item}
            selected={selected}
            appearance={appearance}
          />
        ))}
      </TableBody>
    </Table>
  );
};

type TableSelectableRowProps = {
  toggleRow: TableSelectionState['toggleRow'];
  item: Item;
  selected: boolean;
  appearance: TableRowProps['appearance'];
  rowId: TableRowId;
};

const TableSelectableRow: React.FC<TableSelectableRowProps> = props => {
  const { item, selected, appearance, rowId, toggleRow } = props;
  const onClick = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => toggleRow(e, rowId), [toggleRow, rowId]);
  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === ' ') {
        e.preventDefault();
        toggleRow(e, rowId);
      }
    },
    [toggleRow, rowId],
  );

  return (
    <TableRow
      key={item.file.label}
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-selected={selected}
      appearance={appearance}
    >
      <TableSelectionCell
        role="gridcell"
        aria-selected={selected}
        checked={selected}
        checkboxIndicator={{ 'aria-label': 'Select row' }}
      />

      <TableCell tabIndex={0} role="gridcell" aria-selected={selected}>
        <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
      </TableCell>
      <TableCell tabIndex={0} role="gridcell">
        <TableCellLayout
          media={
            <Avatar aria-label={item.author.label} name={item.author.label} badge={{ status: item.author.status }} />
          }
        >
          {item.author.label}
        </TableCellLayout>
      </TableCell>
      <TableCell tabIndex={0} role="gridcell">
        {item.lastUpdated.label}
      </TableCell>
      <TableCell tabIndex={0} role="gridcell">
        <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
      </TableCell>
    </TableRow>
  );
};

const TableSelectableRowMemoized = React.memo(TableSelectableRow);
```

### Multiple Select

Selection can be achieved easily by combining the `TableSelectionCell` component along with
other primitive components. `useTableFeatures` can handle state management for selection,
although its use is not
necessary if users already have their own state management.

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
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableSelectionCell,
  TableCellLayout,
  useTableFeatures,
  TableColumnDefinition,
  useTableSelection,
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
    lastUpdated: { label: '7h ago', timestamp: 3 },
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
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 1 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
      icon: <PeopleRegular />,
    },
  },
];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
  }),
  createTableColumn<Item>({
    columnId: 'author',
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
  }),
];

export const MultipleSelect = (): JSXElement => {
  const {
    getRows,
    selection: { allRowsSelected, someRowsSelected, toggleAllRows, toggleRow, isRowSelected },
  } = useTableFeatures(
    {
      columns,
      items,
    },
    [
      useTableSelection({
        selectionMode: 'multiselect',
        defaultSelectedItems: new Set([0, 1]),
      }),
    ],
  );

  const rows = getRows(row => {
    const selected = isRowSelected(row.rowId);
    return {
      ...row,
      onClick: (e: React.MouseEvent) => toggleRow(e, row.rowId),
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === ' ') {
          e.preventDefault();
          toggleRow(e, row.rowId);
        }
      },
      selected,
      appearance: selected ? ('brand' as const) : ('none' as const),
    };
  });

  const toggleAllKeydown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === ' ') {
        toggleAllRows(e);
        e.preventDefault();
      }
    },
    [toggleAllRows],
  );

  return (
    <Table aria-label="Table with multiselect" style={{ minWidth: '550px' }}>
      <TableHeader>
        <TableRow>
          <TableSelectionCell
            checked={allRowsSelected ? true : someRowsSelected ? 'mixed' : false}
            onClick={toggleAllRows}
            onKeyDown={toggleAllKeydown}
            checkboxIndicator={{ 'aria-label': 'Select all rows ' }}
          />

          <TableHeaderCell>File</TableHeaderCell>
          <TableHeaderCell>Author</TableHeaderCell>
          <TableHeaderCell>Last updated</TableHeaderCell>
          <TableHeaderCell>Last update</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(({ item, selected, onClick, onKeyDown, appearance }) => (
          <TableRow
            key={item.file.label}
            onClick={onClick}
            onKeyDown={onKeyDown}
            aria-selected={selected}
            appearance={appearance}
          >
            <TableSelectionCell checked={selected} checkboxIndicator={{ 'aria-label': 'Select row' }} />
            <TableCell>
              <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout media={<Avatar aria-label={item.author.label} badge={{ status: item.author.status }} />}>
                {item.author.label}
              </TableCellLayout>
            </TableCell>
            <TableCell>{item.lastUpdated.label}</TableCell>
            <TableCell>
              <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
```

### Multiple Select Controlled

By default our hook is uncontrolled. However, it is possible to control selection features with external
user state.

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
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableSelectionCell,
  TableCellLayout,
  useTableFeatures,
  TableColumnDefinition,
  TableRowId,
  useTableSelection,
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
    lastUpdated: { label: '7h ago', timestamp: 3 },
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
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 1 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
      icon: <PeopleRegular />,
    },
  },
];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
  }),
  createTableColumn<Item>({
    columnId: 'author',
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
  }),
];

export const MultipleSelectControlled = (): JSXElement => {
  const [selectedRows, setSelectedRows] = React.useState(() => new Set<TableRowId>([0, 1]));

  const {
    getRows,
    selection: { allRowsSelected, someRowsSelected, toggleAllRows, toggleRow, isRowSelected },
  } = useTableFeatures(
    {
      columns,
      items,
    },
    [
      useTableSelection({
        selectionMode: 'multiselect',
        selectedItems: selectedRows,
        onSelectionChange: (e, data) => setSelectedRows(data.selectedItems),
      }),
    ],
  );

  const rows = getRows(row => {
    const selected = isRowSelected(row.rowId);
    return {
      ...row,
      onClick: (e: React.MouseEvent) => toggleRow(e, row.rowId),
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === ' ') {
          e.preventDefault();
          toggleRow(e, row.rowId);
        }
      },
      selected,
      appearance: selected ? ('brand' as const) : ('none' as const),
    };
  });

  const toggleAllKeydown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === ' ') {
        toggleAllRows(e);
        e.preventDefault();
      }
    },
    [toggleAllRows],
  );

  return (
    <Table aria-label="Table with controlled multiselect" style={{ minWidth: '550px' }}>
      <TableHeader>
        <TableRow>
          <TableSelectionCell
            checked={allRowsSelected ? true : someRowsSelected ? 'mixed' : false}
            onClick={toggleAllRows}
            onKeyDown={toggleAllKeydown}
            checkboxIndicator={{ 'aria-label': 'Select all rows ' }}
          />

          <TableHeaderCell>File</TableHeaderCell>
          <TableHeaderCell>Author</TableHeaderCell>
          <TableHeaderCell>Last updated</TableHeaderCell>
          <TableHeaderCell>Last update</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(({ item, selected, onClick, onKeyDown, appearance }) => (
          <TableRow
            key={item.file.label}
            onClick={onClick}
            onKeyDown={onKeyDown}
            aria-selected={selected}
            appearance={appearance}
          >
            <TableSelectionCell checked={selected} checkboxIndicator={{ 'aria-label': 'Select row' }} />
            <TableCell>
              <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout
                media={
                  <Avatar
                    aria-label={item.author.label}
                    name={item.author.label}
                    badge={{ status: item.author.status }}
                  />
                }
              >
                {item.author.label}
              </TableCellLayout>
            </TableCell>
            <TableCell>{item.lastUpdated.label}</TableCell>
            <TableCell>
              <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
```

### Non Native Elements

By default `Table` components will render native semantic `<table>` HTML elements.
Native semantic elements provide the best accessibility support and it is recommended to user them.
However, for certain use cases (i.e. Virtualization) the native semantic elements are not advisable
due to strict browser layouting. Using the `noNativeElements` prop will ensure that all components are
rendered as divs while ensuring a layout experience similar to semantic table elements.

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
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
} from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';

const items = [
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

const columns = [
  { columnKey: 'file', label: 'File' },
  { columnKey: 'author', label: 'Author' },
  { columnKey: 'lastUpdated', label: 'Last updated' },
  { columnKey: 'lastUpdate', label: 'Last update' },
];

export const NonNativeElements = (): JSXElement => {
  return (
    <Table noNativeElements aria-label="Table without semantic HTML elements" style={{ minWidth: '500px' }}>
      <TableHeader>
        <TableRow>
          {columns.map(column => (
            <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map(item => (
          <TableRow key={item.file.label}>
            <TableCell>
              <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout
                media={
                  <Avatar
                    aria-label={item.author.label}
                    name={item.author.label}
                    badge={{
                      status: item.author.status as PresenceBadgeStatus,
                    }}
                  />
                }
              >
                {item.author.label}
              </TableCellLayout>
            </TableCell>
            <TableCell>{item.lastUpdated.label}</TableCell>
            <TableCell>
              <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
```

### Primary Cell

A primary cell creates emphasis by increasing icon size and font weight for the main text.
Generally the primary cell should be used in the first column of a table, but there is no obligation
to do so and can be used in any column by the user.

```tsx
import * as React from 'react';

import {
  FolderRegular,
  EditRegular,
  EditFilled,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
  MoreHorizontalRegular,
  MoreHorizontalFilled,
  bundleIcon,
} from '@fluentui/react-icons';
import {
  PresenceBadgeStatus,
  Avatar,
  Button,
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellActions,
  TableCellLayout,
} from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';

const EditIcon = bundleIcon(EditFilled, EditRegular);
const MoreHorizontalIcon = bundleIcon(MoreHorizontalFilled, MoreHorizontalRegular);

const items = [
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

const columns = [
  { columnKey: 'file', label: 'File' },
  { columnKey: 'author', label: 'Author' },
  { columnKey: 'lastUpdated', label: 'Last updated' },
  { columnKey: 'lastUpdate', label: 'Last update' },
];

export const PrimaryCell = (): JSXElement => {
  return (
    <Table aria-label="Table with primary cell layout" style={{ minWidth: '500px' }}>
      <TableHeader>
        <TableRow>
          {columns.map(column => (
            <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map(item => (
          <TableRow key={item.file.label}>
            <TableCell>
              <TableCellLayout media={item.file.icon} description="My Organization" appearance="primary">
                {item.file.label}
              </TableCellLayout>
              <TableCellActions>
                <Button icon={<EditIcon />} appearance="subtle" aria-label="Edit" />
                <Button icon={<MoreHorizontalIcon />} appearance="subtle" aria-label="More actions" />
              </TableCellActions>
            </TableCell>

            <TableCell>
              <TableCellLayout
                media={
                  <Avatar
                    aria-label={item.author.label}
                    name={item.author.label}
                    badge={{
                      status: item.author.status as PresenceBadgeStatus,
                    }}
                  />
                }
              >
                {item.author.label}
              </TableCellLayout>
            </TableCell>
            <TableCell>{item.lastUpdated.label}</TableCell>
            <TableCell>
              <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
```

### Resizable Columns - controlled (preview)

This example demonstrates how `columnSizingOptions` can be used in combination with
`onColumnResize` callback to control the width of each column from the parent component.

The table itself still makes sure the columns are laid out in such a way that they fit in the container.

To make features like column resizing work with keyboard navigation, the `Menu` component is used to provide
a context menu for the header cells, which allows the user to access advanced Table features.

This example also demonstrates how columns can be removed or added.

```tsx
import type { JSXElement } from '@fluentui/react-components';
import {
  TableColumnDefinition,
  TableColumnId,
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableRow,
  createTableColumn,
  useId,
  useTableColumnSizing_unstable,
  useTableFeatures,
  useTableSort,
  TableColumnSizingOptions,
  PresenceBadgeStatus,
  Avatar,
  Button,
  Input,
  Label,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from '@fluentui/react-components';
import {
  DismissRegular,
  DocumentRegular,
  EditRegular,
  FolderRegular,
  OpenRegular,
  VideoRegular,
  DocumentPdfRegular,
  PeopleRegular,
} from '@fluentui/react-icons';
import * as React from 'react';

const columnNames: { [key: TableColumnId]: string } = {
  file: 'File',
  author: 'Author',
  lastUpdated: 'Last updated',
  lastUpdate: 'Last update',
};

const columnsDef: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
    renderHeaderCell: () => <>{columnNames.file}</>,
    renderCell: (item: Item) => (
      <TableCellLayout truncate media={item.file.icon}>
        {item.file.label}
      </TableCellLayout>
    ),

    compare: (a, b) => {
      return a.file.label.localeCompare(b.file.label);
    },
  }),
  createTableColumn<Item>({
    columnId: 'author',
    renderHeaderCell: () => <>{columnNames.author}</>,
    renderCell: (item: Item) => (
      <TableCellLayout
        truncate
        media={<Avatar name={item.author.label} badge={{ status: item.author.status as PresenceBadgeStatus }} />}
      >
        {item.author.label}
      </TableCellLayout>
    ),

    compare: (a, b) => {
      return a.author.label.localeCompare(b.author.label);
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
    renderHeaderCell: () => <>{columnNames.lastUpdated}</>,
    renderCell: (item: Item) => <TableCellLayout truncate>{item.lastUpdated.label}</TableCellLayout>,
    compare: (a, b) => {
      return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
    renderHeaderCell: () => <>{columnNames.lastUpdate}</>,
    renderCell: (item: Item) => (
      <TableCellLayout truncate media={item.lastUpdate.icon}>
        {item.lastUpdate.label}
      </TableCellLayout>
    ),

    compare: (a, b) => {
      return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
    },
  }),
];

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
    lastUpdated: { label: '7h ago', timestamp: 3 },
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
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 1 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
      icon: <PeopleRegular />,
    },
  },
];

export const ResizableColumnsControlled = (): JSXElement => {
  const [columns, setColumns] = React.useState<TableColumnDefinition<Item>[]>(columnsDef);
  const [columnSizingOptions, setColumnSizingOptions] = React.useState<TableColumnSizingOptions>({
    file: {
      idealWidth: 300,
      minWidth: 190,
    },
    author: {
      minWidth: 170,
      defaultWidth: 250,
    },
    lastUpdated: {
      minWidth: 120,
    },
    lastUpdate: {
      minWidth: 220,
    },
  });

  const removeColumn = (index: number) => {
    setColumns([...columns.slice(0, index), ...columns.slice(index + 1)]);
  };

  const addColumn = () => {
    const currentColumnIds = columns.map(({ columnId }) => columnId);
    const missingColumnIndex = columnsDef.findIndex(({ columnId }) => !currentColumnIds.includes(columnId));
    if (missingColumnIndex !== -1) {
      const missingColumn = columnsDef[missingColumnIndex];
      setColumns(state => [...state.slice(0, missingColumnIndex), missingColumn, ...state.slice(missingColumnIndex)]);
    }
  };

  const onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newWidth = parseInt(e.target.value, 10);
    if (Number.isNaN(newWidth)) {
      newWidth = 0;
    }
    setColumnSizingOptions(state => ({
      ...state,
      file: {
        ...state.file,
        idealWidth: newWidth,
      },
    }));
  };

  const onMinWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newMinWidth = parseInt(e.target.value, 10);
    if (Number.isNaN(newMinWidth)) {
      newMinWidth = 0;
    }
    setColumnSizingOptions(state => ({
      ...state,
      file: {
        ...state.file,
        minWidth: newMinWidth,
      },
    }));
  };

  const onColumnResize = React.useCallback(
    (
      _: KeyboardEvent | TouchEvent | MouseEvent | undefined,
      { columnId, width }: { columnId: TableColumnId; width: number },
    ) => {
      setColumnSizingOptions(state => ({
        ...state,
        [columnId]: {
          ...state[columnId],
          idealWidth: width,
        },
      }));
    },
    [],
  );

  const {
    getRows,
    sort: { getSortDirection, toggleColumnSort, sort },
    columnSizing_unstable: columnSizing,
    tableRef,
  } = useTableFeatures(
    {
      columns,
      items,
    },
    [
      useTableColumnSizing_unstable({ columnSizingOptions, onColumnResize }),
      useTableSort({
        defaultSortState: { sortColumn: 'file', sortDirection: 'ascending' },
      }),
    ],
  );

  const headerSortProps = (columnId: TableColumnId) => ({
    onClick: (e: React.MouseEvent) => {
      toggleColumnSort(e, columnId);
    },
    sortDirection: getSortDirection(columnId),
  });

  const rows = sort(getRows());

  const inputId = useId('first-column');

  return (
    <>
      <p>
        <Label htmlFor={`${inputId}-width`}>First column width: </Label>
        <Input
          type="number"
          id={`${inputId}-width`}
          onChange={onWidthChange}
          value={columnSizingOptions.file.idealWidth ? columnSizingOptions.file.idealWidth.toString() : ''}
        />
      </p>
      <p>
        <Label htmlFor={`${inputId}-minwidth`}>First column minWidth: </Label>
        <Input
          type="number"
          id={`${inputId}-minwidth`}
          onChange={onMinWidthChange}
          value={columnSizingOptions.file.minWidth ? columnSizingOptions.file.minWidth?.toString() : ''}
        />
      </p>
      <p>
        <Button onClick={addColumn} disabled={columns.length === columnsDef.length}>
          Add removed column
        </Button>
      </p>
      <div style={{ overflowX: 'auto' }}>
        <Table sortable aria-label="Table with sort" ref={tableRef} {...columnSizing.getTableProps()}>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <Menu openOnContext key={column.columnId}>
                  <MenuTrigger>
                    <TableHeaderCell
                      key={column.columnId}
                      {...columnSizing.getTableHeaderCellProps(column.columnId)}
                      {...headerSortProps(column.columnId)}
                    >
                      {column.renderHeaderCell()}
                      <Button
                        appearance="transparent"
                        aria-label={`Remove ${columnNames[column.columnId]} column`}
                        size="small"
                        icon={<DismissRegular />}
                        style={{ position: 'absolute', right: 0 }}
                        onClick={() => removeColumn(index)}
                      />
                    </TableHeaderCell>
                  </MenuTrigger>
                  <MenuPopover>
                    <MenuList>
                      <MenuItem onClick={columnSizing.enableKeyboardMode(column.columnId)}>
                        Keyboard Column Resizing
                      </MenuItem>
                    </MenuList>
                  </MenuPopover>
                </Menu>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map(({ item }) => (
              <TableRow key={item.file.label}>
                {columns.map(column => (
                  <TableCell key={column.columnId} {...columnSizing.getTableCellProps(column.columnId)}>
                    {column.renderCell(item)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
```

### Resizable Columns - Disabled container auto-fit

By default, the column sizing feature will automatically fit the columns to the content.
This behavior can be disabled by setting the`autoFitColumns` option to`false`.

Make sure to also enable `noNativeElements` option to prevent displaying the table elements as
native elements, as the native elements won't overflow the parent table.

```tsx
import * as React from 'react';

import type { JSXElement } from '@fluentui/react-components';
import {
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableColumnDefinition,
  TableHeader,
  TableHeaderCell,
  TableRow,
  createTableColumn,
  useTableColumnSizing_unstable,
  useTableFeatures,
  PresenceBadgeStatus,
  Avatar,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from '@fluentui/react-components';
import {
  DocumentPdfRegular,
  DocumentRegular,
  EditRegular,
  FolderRegular,
  OpenRegular,
  PeopleRegular,
  VideoRegular,
} from '@fluentui/react-icons';

const columnsDef: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
    renderHeaderCell: () => <>File</>,
  }),
  createTableColumn<Item>({
    columnId: 'author',
    renderHeaderCell: () => <>Author</>,
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
    renderHeaderCell: () => <>Last updated</>,
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
    renderHeaderCell: () => <>Last update</>,
  }),
];

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
    lastUpdated: { label: '7h ago', timestamp: 3 },
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
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 1 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
      icon: <PeopleRegular />,
    },
  },
];

const columnSizingOptions = {
  file: {
    idealWidth: 300,
    minWidth: 150,
  },
  author: {
    minWidth: 110,
    defaultWidth: 250,
  },
  lastUpdate: {
    minWidth: 150,
  },
};

export const ResizableColumnsDisableAutoFit = (): JSXElement => {
  const [columns] = React.useState<TableColumnDefinition<Item>[]>(columnsDef);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { getRows, columnSizing_unstable, tableRef } = useTableFeatures(
    {
      columns,
      items,
    },
    [
      useTableColumnSizing_unstable({
        columnSizingOptions,
        autoFitColumns: false,
      }),
    ],
  );
  const rows = getRows();

  return (
    <div style={{ overflowX: 'auto' }}>
      <Table ref={tableRef} {...columnSizing_unstable.getTableProps()} noNativeElements={true}>
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <Menu openOnContext key={column.columnId}>
                <MenuTrigger>
                  <TableHeaderCell
                    key={column.columnId}
                    {...columnSizing_unstable.getTableHeaderCellProps(column.columnId)}
                  >
                    {column.renderHeaderCell()}
                  </TableHeaderCell>
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    <MenuItem onClick={columnSizing_unstable.enableKeyboardMode(column.columnId)}>
                      Keyboard Column Resizing
                    </MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(({ item }) => (
            <TableRow key={item.file.label}>
              <TableCell {...columnSizing_unstable.getTableCellProps('file')}>
                <TableCellLayout truncate media={item.file.icon}>
                  {item.file.label}
                </TableCellLayout>
              </TableCell>
              <TableCell {...columnSizing_unstable.getTableCellProps('author')}>
                <TableCellLayout
                  truncate
                  media={
                    <Avatar
                      name={item.author.label}
                      badge={{
                        status: item.author.status as PresenceBadgeStatus,
                      }}
                    />
                  }
                >
                  {item.author.label}
                </TableCellLayout>
              </TableCell>
              <TableCell {...columnSizing_unstable.getTableCellProps('lastUpdated')}>
                <TableCellLayout truncate>{item.lastUpdated.label}</TableCellLayout>
              </TableCell>
              <TableCell {...columnSizing_unstable.getTableCellProps('lastUpdate')}>
                <TableCellLayout truncate media={item.lastUpdate.icon}>
                  {item.lastUpdate.label}
                </TableCellLayout>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
```

### Resizable Columns (preview)

The Table component contains logic to support column resizing. To enable resizing,
use the `useTableFeatures` hook in combination with the `useTableColumnSizing_unstable` plugin.
The resulting `columnSizing_unstable` object contains methods needed to make resizing work.

In this example we are choosing an uncontrolled approach, which still allows us to set column
width in an imperative matter (try changing the input value).

Options can be passed to the plugin to define minimum, default and optimal
(in a controlled scenario) width of the column.

To make features like column resizing work with keyboard navigation, the `Menu` component is used to provide
a context menu for the header cells, which allows the user to access advanced Table features.

To learn about how to control widths from the parent, please see the example below.

```tsx
import * as React from 'react';

import type { JSXElement } from '@fluentui/react-components';
import {
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableColumnDefinition,
  TableColumnSizingOptions,
  TableHeader,
  TableHeaderCell,
  TableRow,
  createTableColumn,
  useTableColumnSizing_unstable,
  useTableFeatures,
  PresenceBadgeStatus,
  Avatar,
  Input,
  useId,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from '@fluentui/react-components';
import {
  DocumentPdfRegular,
  DocumentRegular,
  EditRegular,
  FolderRegular,
  OpenRegular,
  PeopleRegular,
  VideoRegular,
} from '@fluentui/react-icons';

const columnsDef: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
    renderHeaderCell: () => <>File</>,
  }),
  createTableColumn<Item>({
    columnId: 'author',
    renderHeaderCell: () => <>Author</>,
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
    renderHeaderCell: () => <>Last updated</>,
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
    renderHeaderCell: () => <>Last update</>,
  }),
];

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
    lastUpdated: { label: '7h ago', timestamp: 3 },
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
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 1 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
      icon: <PeopleRegular />,
    },
  },
];

export const ResizableColumnsUncontrolled = (): JSXElement => {
  const [columns] = React.useState<TableColumnDefinition<Item>[]>(columnsDef);
  const [columnSizingOptions] = React.useState<TableColumnSizingOptions>({
    file: {
      idealWidth: 300,
      minWidth: 150,
    },
    author: {
      minWidth: 110,
      defaultWidth: 250,
    },
    lastUpdate: {
      minWidth: 150,
    },
  });

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { getRows, columnSizing_unstable, tableRef } = useTableFeatures(
    {
      columns,
      items,
    },
    [useTableColumnSizing_unstable({ columnSizingOptions })],
  );

  const [inputValue, setInputValue] = React.useState('300');

  const onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    const numeric = parseInt(e.target.value, 10);
    if (!Number.isNaN(numeric)) {
      columnSizing_unstable.setColumnWidth('file', numeric);
    }
  };
  const rows = getRows();

  const inputId = useId('column-width');

  return (
    <>
      <p>
        <label htmlFor={inputId}>First column width: </label>
        <Input type="number" id={inputId} onChange={onWidthChange} value={inputValue ? inputValue.toString() : ''} />
      </p>
      <div style={{ overflowX: 'auto' }}>
        <Table sortable aria-label="Table with sort" ref={tableRef} {...columnSizing_unstable.getTableProps()}>
          <TableHeader>
            <TableRow>
              {columns.map(column => (
                <Menu openOnContext key={column.columnId}>
                  <MenuTrigger>
                    <TableHeaderCell
                      key={column.columnId}
                      {...columnSizing_unstable.getTableHeaderCellProps(column.columnId)}
                    >
                      {column.renderHeaderCell()}
                    </TableHeaderCell>
                  </MenuTrigger>
                  <MenuPopover>
                    <MenuList>
                      <MenuItem onClick={columnSizing_unstable.enableKeyboardMode(column.columnId)}>
                        Keyboard Column Resizing
                      </MenuItem>
                    </MenuList>
                  </MenuPopover>
                </Menu>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map(({ item }) => (
              <TableRow key={item.file.label}>
                <TableCell {...columnSizing_unstable.getTableCellProps('file')}>
                  <TableCellLayout truncate media={item.file.icon}>
                    {item.file.label}
                  </TableCellLayout>
                </TableCell>
                <TableCell {...columnSizing_unstable.getTableCellProps('author')}>
                  <TableCellLayout
                    truncate
                    media={
                      <Avatar
                        name={item.author.label}
                        badge={{
                          status: item.author.status as PresenceBadgeStatus,
                        }}
                      />
                    }
                  >
                    {item.author.label}
                  </TableCellLayout>
                </TableCell>
                <TableCell {...columnSizing_unstable.getTableCellProps('lastUpdated')}>
                  <TableCellLayout truncate>{item.lastUpdated.label}</TableCellLayout>
                </TableCell>
                <TableCell {...columnSizing_unstable.getTableCellProps('lastUpdate')}>
                  <TableCellLayout truncate media={item.lastUpdate.icon}>
                    {item.lastUpdate.label}
                  </TableCellLayout>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
```

### Selection With Cell Actions

When using cell actions with row selection, some event handling logic is necessary so that
invoking the cell actions does not invoke the row (therefore invoking selection).
How this is done will depend on each use case, so this event handling is not handled by any of
the library components. This examples handles such events by using `preventDefault` and `defaultPrevented`
properties.

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
  EditFilled,
  MoreHorizontalFilled,
  MoreHorizontalRegular,
  bundleIcon,
} from '@fluentui/react-icons';
import {
  PresenceBadgeStatus,
  Avatar,
  Button,
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableSelectionCell,
  TableCellLayout,
  useTableFeatures,
  TableColumnDefinition,
  useTableSelection,
  createTableColumn,
  TableCellActions,
} from '@fluentui/react-components';

const EditIcon = bundleIcon(EditFilled, EditRegular);
const MoreHorizontalIcon = bundleIcon(MoreHorizontalFilled, MoreHorizontalRegular);

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
    lastUpdated: { label: '7h ago', timestamp: 3 },
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
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 1 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
      icon: <PeopleRegular />,
    },
  },
];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
  }),
  createTableColumn<Item>({
    columnId: 'author',
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
  }),
];

export const SelectionWithCellActions = (): JSXElement => {
  const {
    getRows,
    selection: { allRowsSelected, someRowsSelected, toggleAllRows, toggleRow, isRowSelected },
  } = useTableFeatures(
    {
      columns,
      items,
    },
    [
      useTableSelection({
        selectionMode: 'multiselect',
        defaultSelectedItems: new Set([0, 1]),
      }),
    ],
  );

  const rows = getRows(row => {
    const selected = isRowSelected(row.rowId);
    return {
      ...row,
      onClick: (e: React.MouseEvent) => !e.defaultPrevented && toggleRow(e, row.rowId),
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === ' ' && !e.defaultPrevented) {
          e.preventDefault();
          toggleRow(e, row.rowId);
        }
      },
      selected,
      appearance: selected ? ('brand' as const) : ('none' as const),
    };
  });

  const toggleAllKeydown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === ' ') {
        toggleAllRows(e);
        e.preventDefault();
      }
    },
    [toggleAllRows],
  );

  const onClickCellActions = (e: React.MouseEvent<HTMLDivElement>) => e.preventDefault();
  const onKeyDownCellActions = (e: React.KeyboardEvent<HTMLDivElement>) => e.key === ' ' && e.preventDefault();

  return (
    <Table aria-label="Table with multiselect" style={{ minWidth: '550px' }}>
      <TableHeader>
        <TableRow>
          <TableSelectionCell
            checked={allRowsSelected ? true : someRowsSelected ? 'mixed' : false}
            onClick={toggleAllRows}
            onKeyDown={toggleAllKeydown}
            checkboxIndicator={{ 'aria-label': 'Select all rows ' }}
          />

          <TableHeaderCell>File</TableHeaderCell>
          <TableHeaderCell>Author</TableHeaderCell>
          <TableHeaderCell>Last updated</TableHeaderCell>
          <TableHeaderCell>Last update</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(({ item, selected, onClick, onKeyDown, appearance }) => (
          <TableRow
            key={item.file.label}
            onClick={onClick}
            onKeyDown={onKeyDown}
            aria-selected={selected}
            appearance={appearance}
          >
            <TableSelectionCell checked={selected} checkboxIndicator={{ 'aria-label': 'Select row' }} />
            <TableCell>
              <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
              <TableCellActions onClick={onClickCellActions} onKeyDown={onKeyDownCellActions}>
                <Button icon={<EditIcon />} appearance="subtle" aria-label="Edit" />
                <Button icon={<MoreHorizontalIcon />} appearance="subtle" aria-label="More actions" />
              </TableCellActions>
            </TableCell>
            <TableCell>
              <TableCellLayout media={<Avatar aria-label={item.author.label} badge={{ status: item.author.status }} />}>
                {item.author.label}
              </TableCellLayout>
            </TableCell>
            <TableCell>{item.lastUpdated.label}</TableCell>
            <TableCell>
              <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
```

### Single Select

The single selection scenario is similar to the multiple selection scenario. The `TableSelectionCell`
Can render both checkbox and radio style components which are Fluent
[Checkbox](?path=/docs/components-checkbox--default) and [Radio](?path=/docs/components-radio--default)
components. While the design recommendation is to use checkbox for multiselect and radio for single select.
There is no obligation to do so.

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
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableSelectionCell,
  useTableFeatures,
  TableColumnDefinition,
  useTableSelection,
  TableCellLayout,
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
    lastUpdated: { label: '7h ago', timestamp: 3 },
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
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 1 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
      icon: <PeopleRegular />,
    },
  },
];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
  }),
  createTableColumn<Item>({
    columnId: 'author',
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
  }),
];

export const SingleSelect = (): JSXElement => {
  const {
    getRows,
    selection: { toggleRow, isRowSelected },
  } = useTableFeatures(
    {
      columns,
      items,
    },
    [
      useTableSelection({
        selectionMode: 'single',
        defaultSelectedItems: new Set([1]),
      }),
    ],
  );

  const rows = getRows(row => {
    const selected = isRowSelected(row.rowId);
    return {
      ...row,
      onClick: (e: React.MouseEvent) => toggleRow(e, row.rowId),
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === ' ') {
          e.preventDefault();
          toggleRow(e, row.rowId);
        }
      },
      selected,
      appearance: selected ? ('brand' as const) : ('none' as const),
    };
  });

  return (
    <Table aria-label="Table with single selection" style={{ minWidth: '550px' }}>
      <TableHeader>
        <TableRow>
          <TableSelectionCell type="radio" invisible />
          <TableHeaderCell>File</TableHeaderCell>
          <TableHeaderCell>Author</TableHeaderCell>
          <TableHeaderCell>Last updated</TableHeaderCell>
          <TableHeaderCell>Last update</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(({ item, selected, onClick, onKeyDown, appearance }) => (
          <TableRow
            key={item.file.label}
            onClick={onClick}
            onKeyDown={onKeyDown}
            aria-selected={selected}
            appearance={appearance}
          >
            <TableSelectionCell checked={selected} type="radio" radioIndicator={{ 'aria-label': 'Select row' }} />
            <TableCell>
              <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout media={<Avatar aria-label={item.author.label} badge={{ status: item.author.status }} />}>
                {item.author.label}
              </TableCellLayout>
            </TableCell>
            <TableCell>{item.lastUpdated.label}</TableCell>
            <TableCell>
              <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
```

### Single Select Controlled

By default the `useTableFeatures` hook is uncontrolled.
However, it is possible to control selection features with external
user state.

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
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableSelectionCell,
  useTableFeatures,
  TableColumnDefinition,
  TableRowId,
  useTableSelection,
  TableCellLayout,
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
    lastUpdated: { label: '7h ago', timestamp: 3 },
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
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 1 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
      icon: <PeopleRegular />,
    },
  },
];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
  }),
  createTableColumn<Item>({
    columnId: 'author',
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
  }),
];

export const SingleSelectControlled = (): JSXElement => {
  const [selectedRows, setSelectedRows] = React.useState(() => new Set<TableRowId>([1]));
  const {
    getRows,
    selection: { toggleRow, isRowSelected },
  } = useTableFeatures(
    {
      columns,
      items,
    },
    [
      useTableSelection({
        selectionMode: 'single',
        selectedItems: selectedRows,
        onSelectionChange: (e, data) => setSelectedRows(data.selectedItems),
      }),
    ],
  );

  const rows = getRows(row => {
    const selected = isRowSelected(row.rowId);
    return {
      ...row,
      onClick: (e: React.MouseEvent) => toggleRow(e, row.rowId),
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === ' ') {
          e.preventDefault();
          toggleRow(e, row.rowId);
        }
      },
      selected,
      appearance: selected ? ('brand' as const) : ('none' as const),
    };
  });

  return (
    <Table aria-label="Table with controlled single selection" style={{ minWidth: '550px' }}>
      <TableHeader>
        <TableRow>
          <TableSelectionCell type="radio" invisible />
          <TableHeaderCell>File</TableHeaderCell>
          <TableHeaderCell>Author</TableHeaderCell>
          <TableHeaderCell>Last updated</TableHeaderCell>
          <TableHeaderCell>Last update</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(({ item, selected, onClick, onKeyDown, appearance }) => (
          <TableRow
            key={item.file.label}
            onClick={onClick}
            onKeyDown={onKeyDown}
            aria-selected={selected}
            appearance={appearance}
          >
            <TableSelectionCell checked={selected} type="radio" radioIndicator={{ 'aria-label': 'Select row' }} />
            <TableCell>
              <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout
                media={
                  <Avatar
                    aria-label={item.author.label}
                    name={item.author.label}
                    badge={{ status: item.author.status }}
                  />
                }
              >
                {item.author.label}
              </TableCellLayout>
            </TableCell>
            <TableCell>{item.lastUpdated.label}</TableCell>
            <TableCell>
              <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
```

### Size Extra Small

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
  Avatar,
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
} from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';

const items = [
  {
    file: { label: 'Meeting notes', icon: <DocumentRegular /> },
    author: { label: 'Max Mustermann', status: 'available' as const },
    lastUpdated: { label: '7h ago', timestamp: 1 },
    lastUpdate: {
      label: 'You edited this',
      icon: <EditRegular />,
    },
  },
  {
    file: { label: 'Thursday presentation', icon: <FolderRegular /> },
    author: { label: 'Erika Mustermann', status: 'busy' as const },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Training recording', icon: <VideoRegular /> },
    author: { label: 'John Doe', status: 'away' as const },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Purchase order', icon: <DocumentPdfRegular /> },
    author: { label: 'Jane Doe', status: 'offline' as const },
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 3 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
      icon: <PeopleRegular />,
    },
  },
];

const columns = [
  { columnKey: 'file', label: 'File' },
  { columnKey: 'author', label: 'Author' },
  { columnKey: 'lastUpdated', label: 'Last updated' },
  { columnKey: 'lastUpdate', label: 'Last update' },
];

export const SizeExtraSmall = (): JSXElement => {
  return (
    <Table size="extra-small" aria-label="Table with extra-small size" style={{ minWidth: '400px' }}>
      <TableHeader>
        <TableRow>
          {columns.map(column => (
            <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map(item => (
          <TableRow key={item.file.label}>
            <TableCell>
              <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout
                media={
                  <Avatar
                    aria-label={item.author.label}
                    name={item.author.label}
                    badge={{ status: item.author.status }}
                  />
                }
              >
                {item.author.label}
              </TableCellLayout>
            </TableCell>
            <TableCell>{item.lastUpdated.label}</TableCell>
            <TableCell>
              <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
```

### Size Small

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
  Avatar,
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
} from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';

const items = [
  {
    file: { label: 'Meeting notes', icon: <DocumentRegular /> },
    author: { label: 'Max Mustermann', status: 'available' as const },
    lastUpdated: { label: '7h ago', timestamp: 1 },
    lastUpdate: {
      label: 'You edited this',
      icon: <EditRegular />,
    },
  },
  {
    file: { label: 'Thursday presentation', icon: <FolderRegular /> },
    author: { label: 'Erika Mustermann', status: 'busy' as const },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Training recording', icon: <VideoRegular /> },
    author: { label: 'John Doe', status: 'away' as const },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Purchase order', icon: <DocumentPdfRegular /> },
    author: { label: 'Jane Doe', status: 'offline' as const },
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 3 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
      icon: <PeopleRegular />,
    },
  },
];

const columns = [
  { columnKey: 'file', label: 'File' },
  { columnKey: 'author', label: 'Author' },
  { columnKey: 'lastUpdated', label: 'Last updated' },
  { columnKey: 'lastUpdate', label: 'Last update' },
];

export const SizeSmall = (): JSXElement => {
  return (
    <Table size="small" aria-label="Table with small size" style={{ minWidth: '475px' }}>
      <TableHeader>
        <TableRow>
          {columns.map(column => (
            <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map(item => (
          <TableRow key={item.file.label}>
            <TableCell>
              <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout
                media={
                  <Avatar
                    aria-label={item.author.label}
                    name={item.author.label}
                    badge={{ status: item.author.status }}
                  />
                }
              >
                {item.author.label}
              </TableCellLayout>
            </TableCell>
            <TableCell>{item.lastUpdated.label}</TableCell>
            <TableCell>
              <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
```

### Sort

Using the `sortable` prop will configure all header cells to be buttons and add extra styles.
The `TableHeaderCell` component accepts a `sortDirection` prop that will indicate whether the
header is sorted. Handling the sort of data and column state is handled by `useTableFeatures`.

> Due to screen reader support, the sort status might not be announced once a sortable column header
> is invoked. [This is a known issue.](https://github.com/nvaccess/nvda/issues/10890)
> However the implementation still follows the
> [pattern recommended by the WAI](https://www.w3.org/WAI/ARIA/apg/example-index/table/sortable-table.html)

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
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  useTableFeatures,
  TableColumnDefinition,
  TableColumnId,
  useTableSort,
  TableCellLayout,
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
    lastUpdated: { label: '7h ago', timestamp: 3 },
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
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 1 },
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
  }),
  createTableColumn<Item>({
    columnId: 'author',
    compare: (a, b) => {
      return a.author.label.localeCompare(b.author.label);
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
    compare: (a, b) => {
      return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
    compare: (a, b) => {
      return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
    },
  }),
];

export const Sort = (): JSXElement => {
  const {
    getRows,
    sort: { getSortDirection, toggleColumnSort, sort },
  } = useTableFeatures(
    {
      columns,
      items,
    },
    [
      useTableSort({
        defaultSortState: { sortColumn: 'file', sortDirection: 'ascending' },
      }),
    ],
  );

  const headerSortProps = (columnId: TableColumnId) => ({
    onClick: (e: React.MouseEvent) => {
      toggleColumnSort(e, columnId);
    },
    sortDirection: getSortDirection(columnId),
  });

  const rows = sort(getRows());

  return (
    <Table sortable aria-label="Table with sort" style={{ minWidth: '500px' }}>
      <TableHeader>
        <TableRow>
          <TableHeaderCell {...headerSortProps('file')}>File</TableHeaderCell>
          <TableHeaderCell {...headerSortProps('author')}>Author</TableHeaderCell>
          <TableHeaderCell {...headerSortProps('lastUpdated')}>Last updated</TableHeaderCell>
          <TableHeaderCell {...headerSortProps('lastUpdate')}>Last update</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(({ item }) => (
          <TableRow key={item.file.label}>
            <TableCell>
              <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout
                media={
                  <Avatar
                    aria-label={item.author.label}
                    name={item.author.label}
                    badge={{
                      status: item.author.status as PresenceBadgeStatus,
                    }}
                  />
                }
              >
                {item.author.label}
              </TableCellLayout>
            </TableCell>
            <TableCell>{item.lastUpdated.label}</TableCell>
            <TableCell>
              <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
```

### Sort Controlled

By default our hook is uncontrolled. However, it is possible to control sort features
with external user state.

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
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  useTableFeatures,
  TableColumnDefinition,
  TableColumnId,
  useTableSort,
  TableCellLayout,
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
    lastUpdated: { label: '7h ago', timestamp: 3 },
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
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 1 },
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
  }),
  createTableColumn<Item>({
    columnId: 'author',
    compare: (a, b) => {
      return a.author.label.localeCompare(b.author.label);
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
    compare: (a, b) => {
      return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
    compare: (a, b) => {
      return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
    },
  }),
];

export const SortControlled = (): JSXElement => {
  const [sortState, setSortState] = React.useState<{
    sortDirection: 'ascending' | 'descending';
    sortColumn: TableColumnId | undefined;
  }>({
    sortDirection: 'ascending' as const,
    sortColumn: 'file',
  });

  const {
    getRows,
    sort: { getSortDirection, toggleColumnSort, sort },
  } = useTableFeatures(
    {
      columns,
      items,
    },
    [
      useTableSort({
        sortState,
        onSortChange: (e, nextSortState) => setSortState(nextSortState),
      }),
    ],
  );

  const headerSortProps = (columnId: TableColumnId) => ({
    onClick: (e: React.MouseEvent) => toggleColumnSort(e, columnId),
    sortDirection: getSortDirection(columnId),
  });

  const rows = sort(getRows());

  return (
    <Table sortable aria-label="Table with controlled sort" style={{ minWidth: '500px' }}>
      <TableHeader>
        <TableRow>
          <TableHeaderCell {...headerSortProps('file')}>File</TableHeaderCell>
          <TableHeaderCell {...headerSortProps('author')}>Author</TableHeaderCell>
          <TableHeaderCell {...headerSortProps('lastUpdated')}>Last updated</TableHeaderCell>
          <TableHeaderCell {...headerSortProps('lastUpdate')}>Last update</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(({ item }) => (
          <TableRow key={item.file.label}>
            <TableCell>
              <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout
                media={
                  <Avatar
                    aria-label={item.author.label}
                    name={item.author.label}
                    badge={{
                      status: item.author.status as PresenceBadgeStatus,
                    }}
                  />
                }
              >
                {item.author.label}
              </TableCellLayout>
            </TableCell>
            <TableCell>{item.lastUpdated.label}</TableCell>
            <TableCell>
              <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
```

### Subtle Selection

By setting the `subtle` prop on the `TableSelectionCell` component, the selection indicator will only
appear when:

- the `TableRow` component is hovered.
- The current focused element is within the `TableRow`
- The `TableSelectionCell` is checked

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
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableSelectionCell,
  TableCellLayout,
  useTableFeatures,
  TableColumnDefinition,
  useTableSelection,
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
    lastUpdated: { label: '7h ago', timestamp: 3 },
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
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 1 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
      icon: <PeopleRegular />,
    },
  },
];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
  }),
  createTableColumn<Item>({
    columnId: 'author',
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
  }),
];

export const SubtleSelection = (): JSXElement => {
  const {
    getRows,
    selection: { allRowsSelected, someRowsSelected, toggleAllRows, toggleRow, isRowSelected },
  } = useTableFeatures(
    {
      columns,
      items,
    },
    [
      useTableSelection({
        selectionMode: 'multiselect',
        defaultSelectedItems: new Set([0, 1]),
      }),
    ],
  );

  const rows = getRows(row => {
    const selected = isRowSelected(row.rowId);
    return {
      ...row,
      onClick: (e: React.MouseEvent) => toggleRow(e, row.rowId),
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === ' ') {
          e.preventDefault();
          toggleRow(e, row.rowId);
        }
      },
      selected,
      appearance: selected ? ('brand' as const) : ('none' as const),
    };
  });

  const toggleAllKeydown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === ' ') {
        toggleAllRows(e);
        e.preventDefault();
      }
    },
    [toggleAllRows],
  );

  return (
    <Table aria-label="Table with subtle selection" style={{ minWidth: '550px' }}>
      <TableHeader>
        <TableRow>
          <TableSelectionCell
            checked={allRowsSelected ? true : someRowsSelected ? 'mixed' : false}
            onClick={toggleAllRows}
            onKeyDown={toggleAllKeydown}
            checkboxIndicator={{ 'aria-label': 'Select all rows ' }}
          />

          <TableHeaderCell>File</TableHeaderCell>
          <TableHeaderCell>Author</TableHeaderCell>
          <TableHeaderCell>Last updated</TableHeaderCell>
          <TableHeaderCell>Last update</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(({ item, selected, onClick, onKeyDown, appearance }) => (
          <TableRow
            key={item.file.label}
            onClick={onClick}
            onKeyDown={onKeyDown}
            aria-selected={selected}
            appearance={appearance}
          >
            <TableSelectionCell subtle checked={selected} checkboxIndicator={{ 'aria-label': 'Select row' }} />
            <TableCell>
              <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout
                media={
                  <Avatar
                    aria-label={item.author.label}
                    name={item.author.label}
                    badge={{ status: item.author.status }}
                  />
                }
              >
                {item.author.label}
              </TableCellLayout>
            </TableCell>
            <TableCell>{item.lastUpdated.label}</TableCell>
            <TableCell>
              <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
```

### Virtualization

> Semantic `<table>` elements have are subject to strict layouting by the browser and are not suited
> to virtualization in general. Use the `noNativeElements` prop to use a flexbox based layout that will
> make virtualization a lot easier.

The `Table` primitive components are unopinionated with respect to virtualization. They should be compatible
with any virtualization library. Hoisting business logic to a state management
hook like `useTableFeatures`
means that features can persist between the mounting/unmounting that happens during virtualization.
The below example uses the [react-window](https://www.npmjs.com/package/react-window) library.

```tsx
import * as React from 'react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';

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
  useApplyScrollbarWidth,
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  TableSelectionCell,
  createTableColumn,
  useTableFeatures,
  useTableSelection,
  TableRowData as RowStateBase,
} from '@fluentui/react-components';

type Item = {
  file: {
    label: string;
    icon: JSXElement;
  };
  author: {
    label: string;
    status: PresenceBadgeStatus;
  };
  lastUpdated: {
    label: string;
    timestamp: number;
  };
  lastUpdate: {
    label: string;
    icon: JSXElement;
  };
};

interface TableRowData extends RowStateBase<Item> {
  onClick: (e: React.MouseEvent) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  selected: boolean;
  appearance: 'brand' | 'none';
}

interface ReactWindowRenderFnProps extends ListChildComponentProps {
  data: TableRowData[];
}

const baseItems: Item[] = [
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

const items = new Array(1500).fill(0).map((_, i) => baseItems[i % baseItems.length]);

const columns = [
  createTableColumn<Item>({
    columnId: 'file',
  }),
  createTableColumn<Item>({
    columnId: 'author',
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
  }),
];

const RenderRow = ({ index, style, data }: ReactWindowRenderFnProps) => {
  const { item, selected, appearance, onClick, onKeyDown } = data[index];
  return (
    <TableRow
      aria-rowindex={index + 2}
      style={style}
      key={item.file.label}
      onKeyDown={onKeyDown}
      onClick={onClick}
      appearance={appearance}
    >
      <TableSelectionCell checked={selected} checkboxIndicator={{ 'aria-label': 'Select row' }} />
      <TableCell>
        <TableCellLayout media={item.file.icon}>
          <strong>[{index}] </strong>
          {item.file.label}
        </TableCellLayout>
      </TableCell>
      <TableCell>
        <TableCellLayout
          media={
            <Avatar
              aria-label={item.author.label}
              name={item.author.label}
              badge={{ status: item.author.status as PresenceBadgeStatus }}
            />
          }
        >
          {item.author.label}
        </TableCellLayout>
      </TableCell>
      <TableCell>{item.lastUpdated.label}</TableCell>
      <TableCell>
        <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
      </TableCell>
    </TableRow>
  );
};

export const Virtualization = (): JSXElement => {
  const appliedScrollbarWidthRef = useApplyScrollbarWidth();

  const {
    getRows,
    selection: { allRowsSelected, someRowsSelected, toggleAllRows, toggleRow, isRowSelected },
  } = useTableFeatures(
    {
      columns,
      items,
    },
    [
      useTableSelection({
        selectionMode: 'multiselect',
        defaultSelectedItems: new Set([0, 1]),
      }),
    ],
  );

  const rows: TableRowData[] = getRows(row => {
    const selected = isRowSelected(row.rowId);
    return {
      ...row,
      onClick: (e: React.MouseEvent) => toggleRow(e, row.rowId),
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === ' ') {
          e.preventDefault();
          toggleRow(e, row.rowId);
        }
      },
      selected,
      appearance: selected ? ('brand' as const) : ('none' as const),
    };
  });

  const toggleAllKeydown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === ' ') {
        toggleAllRows(e);
        e.preventDefault();
      }
    },
    [toggleAllRows],
  );

  return (
    <Table noNativeElements aria-label="Table with selection" aria-rowcount={rows.length} style={{ minWidth: '650px' }}>
      <TableHeader>
        <TableRow aria-rowindex={1}>
          <TableSelectionCell
            checked={allRowsSelected ? true : someRowsSelected ? 'mixed' : false}
            onClick={toggleAllRows}
            onKeyDown={toggleAllKeydown}
            checkboxIndicator={{ 'aria-label': 'Select all rows' }}
          />

          <TableHeaderCell>File</TableHeaderCell>
          <TableHeaderCell>Author</TableHeaderCell>
          <TableHeaderCell>Last updated</TableHeaderCell>
          <TableHeaderCell>Last update</TableHeaderCell>
          {/** Scrollbar alignment for the header */}
          <div role="presentation" ref={appliedScrollbarWidthRef} />
        </TableRow>
      </TableHeader>
      <TableBody>
        <List height={400} itemCount={items.length} itemSize={45} width="100%" itemData={rows}>
          {RenderRow}
        </List>
      </TableBody>
    </Table>
  );
};
```
