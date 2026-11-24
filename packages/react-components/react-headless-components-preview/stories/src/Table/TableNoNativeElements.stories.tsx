import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '@fluentui/react-headless-components-preview/table';

import styles from './table.module.css';

const items = [
  { file: 'Meeting notes', author: 'Max Mustermann', updated: '7h ago' },
  { file: 'Thursday presentation', author: 'Erika Mustermann', updated: 'Yesterday at 1:45 PM' },
  { file: 'Training recording', author: 'John Doe', updated: 'Yesterday at 1:45 PM' },
];

export const NoNativeElements = (): React.ReactNode => (
  <Table noNativeElements aria-label="Recent files" className={styles.table}>
    <TableHeader>
      <TableRow className={styles.headerRow}>
        <TableHeaderCell className={styles.headerCell}>File</TableHeaderCell>
        <TableHeaderCell className={styles.headerCell}>Author</TableHeaderCell>
        <TableHeaderCell className={styles.headerCell}>Last updated</TableHeaderCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {items.map(item => (
        <TableRow className={styles.row} key={item.file}>
          <TableCell className={styles.cell}>{item.file}</TableCell>
          <TableCell className={styles.cell}>{item.author}</TableCell>
          <TableCell className={styles.cell}>{item.updated}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

NoNativeElements.parameters = {
  docs: {
    description: {
      story:
        'With `noNativeElements`, the parts render as `div`s with the `table`, `rowgroup`, `row`, `columnheader` and `cell` roles.',
    },
  },
};
