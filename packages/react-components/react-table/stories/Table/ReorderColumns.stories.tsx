import {
  Avatar,
  Checkbox,
  Input,
  Label,
  PresenceBadgeStatus,
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableColumnDefinition,
  TableHeader,
  TableHeaderCell,
  TableRow,
  createTableColumn,
  useTableColumnReordering_unstable,
  useTableFeatures,
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
import * as React from 'react';

const columnsDef: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 1,
    renderHeaderCell: () => <>File</>,
    renderCell: item => (
      <TableCellLayout truncate media={item.file.icon}>
        {item.file.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn<Item>({
    columnId: 'author',
    renderHeaderCell: () => <>Author</>,
    renderCell: item => (
      <TableCellLayout
        truncate
        media={<Avatar name={item.author.label} badge={{ status: item.author.status as PresenceBadgeStatus }} />}
      >
        {item.author.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
    renderHeaderCell: () => <>Last updated</>,
    renderCell: item => <TableCellLayout truncate>{item.lastUpdated.label}</TableCellLayout>,
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
    renderHeaderCell: () => <>Last update</>,
    renderCell: item => (
      <TableCellLayout truncate media={item.lastUpdate.icon}>
        {item.lastUpdate.label}
      </TableCellLayout>
    ),
  }),
];

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

export const ReorderColumns = () => {
  const [dndPreview, setDndPreview] = React.useState(true);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { getRows, tableRef, columns, columnReordering_unstable } = useTableFeatures(
    {
      columns: columnsDef,
      items,
    },
    [
      useTableColumnReordering_unstable({
        preview: dndPreview,
        onColumnOrderChange: cols => {
          console.log(cols);
        },
      }),
    ],
  );

  const rows = getRows();

  return (
    <>
      <Checkbox label="Preview dragging" checked={dndPreview} onChange={(_, data) => setDndPreview(!!data.checked)} />

      <Table sortable aria-label="Table with sort" ref={tableRef}>
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <TableHeaderCell
                key={column.columnId}
                {...columnReordering_unstable.getTableHeaderCellProps(column.columnId)}
              >
                {column.renderHeaderCell()}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(({ item }) => (
            <TableRow key={item.file.label}>
              {columns.map(column => (
                <TableCell key={column.columnId}>{column.renderCell(item)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
ReorderColumns.storyName = 'Reordering Columns (preview)';
ReorderColumns.parameters = {
  docs: {
    description: {
      story: ['This is column reordering. It is a preview feature and is not yet available for production use.'],
    },
  },
};
