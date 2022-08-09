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
import { PresenceBadgeStatus, Avatar } from '@fluentui/react-components';
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
  RowSelectionState,
} from '@tanstack/react-table';
import { TableBody, TableCell, TableRow, Table, TableHeader, TableHeaderCell, TableSelectionCell } from '../..';

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

const columnHelper = createColumnHelper<Item>();
const columns2 = [
  columnHelper.display({
    id: 'select',
    // header: props => console.log(props),
    header: ({ table }) => (
      <TableSelectionCell
        checked={table.getIsAllRowsSelected() ? true : table.getIsSomeRowsSelected() ? 'mixed' : false}
        onClick={() => table.toggleAllPageRowsSelected()}
      />
    ),
    cell: ({ row }) => <TableSelectionCell checked={row.getIsSelected()} />,
  }),
  columnHelper.accessor(row => row.file, {
    id: 'file',
    cell: info => <TableCell media={info.getValue().icon}>{info.getValue().label}</TableCell>,
    header: ({ header }) => {
      return <TableHeaderCell key={header.id}>File</TableHeaderCell>;
    },
  }),
  columnHelper.accessor(row => row.author, {
    id: 'author',
    cell: info => (
      <TableCell media={<Avatar badge={{ status: info.getValue().status }} />}>{info.getValue().label}</TableCell>
    ),
    header: ({ header }) => {
      return <TableHeaderCell key={header.id}>Author</TableHeaderCell>;
    },
  }),
  columnHelper.accessor(row => row.lastUpdated, {
    id: 'lastUpdated',
    cell: info => <TableCell>{info.getValue().label}</TableCell>,
    header: ({ header }) => {
      return <TableHeaderCell key={header.id}>Last updated</TableHeaderCell>;
    },
  }),
  columnHelper.accessor(row => row.lastUpdate, {
    id: 'lastUpdate',
    cell: info => <TableCell media={info.getValue().icon}>{info.getValue().label}</TableCell>,
    header: ({ header }) => {
      return <TableHeaderCell key={header.id}>Last update</TableHeaderCell>;
    },
  }),
];

export const MultipleSelect = () => {
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const table = useReactTable({
    columns: columns2,
    data: items,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {table
            .getHeaderGroups()[0]
            .headers.map(header => flexRender(header.column.columnDef.header, header.getContext()))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map(row => (
          <TableRow onClick={() => row.toggleSelected()}>
            {row.getVisibleCells().map(cell => flexRender(cell.column.columnDef.cell, cell.getContext()))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
