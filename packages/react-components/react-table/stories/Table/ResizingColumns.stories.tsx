import {
  ColumnDefinition,
  ColumnId,
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableRow,
  createColumn,
  useColumnSizing_unstable,
  useTableFeatures,
  useTableSort,
} from '@fluentui/react-components/unstable';
import {
  DocumentRegular,
  EditRegular,
  FolderRegular,
  OpenRegular,
  VideoRegular,
  DocumentPdfRegular,
  PeopleRegular,
} from '@fluentui/react-icons';
import * as React from 'react';
import { useState } from 'react';
import { PresenceBadgeStatus } from '../../../react-badge/src';
import { Avatar } from '@fluentui/react-components';
import { ColumnSizingOptions } from '../../src/hooks';

const columnsDef: ColumnDefinition<Item>[] = [
  createColumn<Item>({
    columnId: 'file',
    renderHeaderCell: () => <>File</>,
    compare: (a, b) => {
      return a.file.label.localeCompare(b.file.label);
    },
  }),
  createColumn<Item>({
    columnId: 'author',
    renderHeaderCell: () => <>Author</>,
    compare: (a, b) => {
      return a.author.label.localeCompare(b.author.label);
    },
  }),
  createColumn<Item>({
    columnId: 'lastUpdated',
    renderHeaderCell: () => <>Last updated</>,
    compare: (a, b) => {
      return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
    },
  }),
  createColumn<Item>({
    columnId: 'lastUpdate',
    renderHeaderCell: () => <>Last update</>,
    compare: (a, b) => {
      return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
    },
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

export const ResizingColumns = () => {
  const [columns] = useState<ColumnDefinition<Item>[]>(columnsDef);
  const [columnSizingOptions, setColumnSizingOptions] = useState<ColumnSizingOptions>({
    file: {
      idealWidth: 300,
      minWidth: 190,
    },
    author: {
      minWidth: 170,
      defaultWidth: 250,
    },
    lastUpdate: {
      minWidth: 220,
    },
  });

  const onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value, 10);
    if (Number.isNaN(newWidth)) {
      return;
    }
    setColumnSizingOptions({
      file: {
        minWidth: 187,
        idealWidth: newWidth,
      },
      author: {
        minWidth: 170,
      },
    });
  };

  const onMinWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinWIdth = parseInt(e.target.value, 10);
    if (Number.isNaN(newMinWIdth)) {
      return;
    }
    setColumnSizingOptions(state => ({
      ...state,
      file: {
        ...state.file,
        minWidth: newMinWIdth,
      },
    }));
  };

  const onColumnResize = React.useCallback((columnId: ColumnId, width: number) => {
    setColumnSizingOptions(state => ({
      ...state,
      [columnId]: {
        ...state[columnId],
        idealWidth: width,
      },
    }));
  }, []);

  const {
    getRows,
    sort: { getSortDirection, toggleColumnSort, sort },
    columnSizing,
    tableRef,
  } = useTableFeatures(
    {
      columns,
      items,
    },
    [
      useColumnSizing_unstable({ columnSizingOptions, onColumnResize }),
      useTableSort({ defaultSortState: { sortColumn: 'file', sortDirection: 'ascending' } }),
    ],
  );

  const headerSortProps = (columnId: ColumnId) => ({
    onClick: (e: React.MouseEvent) => {
      toggleColumnSort(e, columnId);
    },
    sortDirection: getSortDirection(columnId),
  });

  const rows = sort(getRows());

  return (
    <>
      <p>
        First column width: <input type="text" onChange={onWidthChange} value={columnSizingOptions.file.idealWidth} />
      </p>
      <p>
        First column minWidth:{' '}
        <input type="text" onChange={onMinWidthChange} value={columnSizingOptions.file.minWidth} />
      </p>
      <Table sortable aria-label="Table with sort" ref={tableRef} columnSizingState={columnSizing}>
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <TableHeaderCell
                key={column.columnId}
                {...columnSizing.getColumnProps(column.columnId)}
                {...headerSortProps(column.columnId)}
              >
                {column.renderHeaderCell()}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(({ item }) => (
            <TableRow key={item.file.label}>
              <TableCell {...columnSizing.getColumnProps('file')}>
                <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
              </TableCell>
              <TableCell {...columnSizing.getColumnProps('author')}>
                <TableCellLayout
                  media={
                    <Avatar name={item.author.label} badge={{ status: item.author.status as PresenceBadgeStatus }} />
                  }
                >
                  {item.author.label}
                </TableCellLayout>
              </TableCell>
              <TableCell {...columnSizing.getColumnProps('lastUpdated')}>{item.lastUpdated.label}</TableCell>
              <TableCell {...columnSizing.getColumnProps('lastUpdate')}>
                <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
