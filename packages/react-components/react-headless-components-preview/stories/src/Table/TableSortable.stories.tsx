import * as React from 'react';
import {
  createTableColumn,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  useTableFeatures,
  useTableSort,
} from '@fluentui/react-headless-components-preview/table';

import styles from './table.module.css';

interface Item {
  file: string;
  author: string;
  updated: number;
}

const items: Item[] = [
  { file: 'Meeting notes', author: 'Max Mustermann', updated: 3 },
  { file: 'Thursday presentation', author: 'Erika Mustermann', updated: 1 },
  { file: 'Training recording', author: 'John Doe', updated: 2 },
];

const columns = [
  createTableColumn<Item>({
    columnId: 'file',
    compare: (a, b) => a.file.localeCompare(b.file),
  }),
  createTableColumn<Item>({
    columnId: 'author',
    compare: (a, b) => a.author.localeCompare(b.author),
  }),
  createTableColumn<Item>({
    columnId: 'updated',
    compare: (a, b) => a.updated - b.updated,
  }),
];

const headers = { file: 'File', author: 'Author', updated: 'Last updated (days ago)' } as const;

export const Sortable = (): React.ReactNode => {
  const {
    getRows,
    sort: { getSortDirection, toggleColumnSort, sort },
  } = useTableFeatures({ columns, items }, [
    useTableSort({ defaultSortState: { sortColumn: 'file', sortDirection: 'ascending' } }),
  ]);

  const rows = sort(getRows());

  return (
    <Table sortable aria-label="Sortable files" className={styles.table}>
      <TableHeader>
        <TableRow className={styles.headerRow}>
          {columns.map(column => (
            <TableHeaderCell
              key={column.columnId}
              className={styles.headerCell}
              button={{ className: styles.sortButton }}
              sortDirection={getSortDirection(column.columnId)}
              onClick={e => toggleColumnSort(e, column.columnId)}
            >
              {headers[column.columnId as keyof typeof headers]}
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(({ item }) => (
          <TableRow className={styles.row} key={item.file}>
            <TableCell className={styles.cell}>{item.file}</TableCell>
            <TableCell className={styles.cell}>{item.author}</TableCell>
            <TableCell className={styles.cell}>{item.updated}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

Sortable.parameters = {
  docs: {
    description: {
      story:
        'Sorting is handled by `useTableFeatures` and `useTableSort`. The sorted header cell exposes `data-sort-direction` and `aria-sort`.',
    },
  },
};
