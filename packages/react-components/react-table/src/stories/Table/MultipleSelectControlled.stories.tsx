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
import { PresenceBadgeStatus, Avatar, useArrowNavigationGroup } from '@fluentui/react-components';
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableSelectionCell,
  TableCellLayout,
} from '../..';
import { useTable, ColumnDefinition, RowId, useSelection } from '../../hooks';

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

const columns: ColumnDefinition<Item>[] = [
  {
    columnId: 'file',
  },
  {
    columnId: 'author',
  },
  {
    columnId: 'lastUpdated',
  },
  {
    columnId: 'lastUpdate',
  },
];

export const MultipleSelectControlled = () => {
  const [selectedRows, setSelectedRows] = React.useState(
    () => new Set<RowId>([0, 1]),
  );

  const {
    getRows,
    selection: { allRowsSelected, someRowsSelected, toggleAllRows, toggleRow, isRowSelected },
  } = useTable(
    {
      columns,
      items,
    },
    [
      useSelection({
        selectionMode: 'multiselect',
        selectedItems: selectedRows,
        onSelectionChange: setSelectedRows,
      }),
    ],
  );

  const rows = getRows(row => ({
    ...row,
    onClick: () => toggleRow(row.rowId),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        toggleRow(row.rowId);
      }
    },
    selected: isRowSelected(row.rowId),
  }));

  const keyboardNavAttr = useArrowNavigationGroup({ axis: 'grid' });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableSelectionCell
            checked={allRowsSelected ? true : someRowsSelected ? 'mixed' : false}
            onClick={toggleAllRows}
          />
          <TableHeaderCell>File</TableHeaderCell>
          <TableHeaderCell>Author</TableHeaderCell>
          <TableHeaderCell>Last updated</TableHeaderCell>
          <TableHeaderCell>Last update</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody {...keyboardNavAttr}>
        {rows.map(({ item, selected, onClick, onKeyDown }) => (
          <TableRow
            key={item.file.label}
            onClick={onClick}
            onKeyDown={onKeyDown}
            aria-selected={selected}
            appearance={selected ? 'neutral' : 'none'}
          >
            <TableSelectionCell tabIndex={0} checkboxIndicator={{ tabIndex: -1 }} checked={selected} />
            <TableCell>
              <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout media={<Avatar badge={{ status: item.author.status }} />}>
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
