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
  Button,
} from '@fluentui/react-components';
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

type FileCell = {
  label: string;
  icon: JSX.Element;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type LastUpdateCell = {
  label: string;
  icon: JSX.Element;
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

let data: Item[] = [
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

export const Default = () => {
  const [items, setItems] = React.useState<Item[]>(data);

  const {
    getRows,
    selection: { allRowsSelected, someRowsSelected, toggleAllRows, toggleRow, isRowSelected },
  } = useTableFeatures(
    {
      columns,
      items,
      getRowId: item => item.file.label,
    },
    [
      useTableSelection({
        selectionMode: 'multiselect',
        defaultSelectedItems: new Set([0, 1]),
      }),
    ],
  );

  let rows = getRows(row => {
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

  const onDelete = () => {
    data = data.filter((x, index) => index !== 0);
    setItems(data);
  };

  return (
    <>
      <Button onClick={onDelete}>deleted</Button>
      <Table aria-label="Table with multiselect">
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
                  media={<Avatar aria-label={item.author.label} badge={{ status: item.author.status }} />}
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
    </>
  );
};
