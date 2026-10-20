import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableCellActions,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '@fluentui/react-headless-components-preview/table';
import { DocumentRegular, EditRegular, FolderRegular } from '@fluentui/react-icons';

import styles from './table.module.css';

const items = [
  { file: 'Meeting notes', icon: <DocumentRegular />, author: 'Max Mustermann', updated: '7h ago' },
  {
    file: 'Thursday presentation',
    icon: <FolderRegular />,
    author: 'Erika Mustermann',
    updated: 'Yesterday at 1:45 PM',
  },
  { file: 'Training recording', icon: <DocumentRegular />, author: 'John Doe', updated: 'Yesterday at 1:45 PM' },
];

export const Default = (): React.ReactNode => (
  <Table aria-label="Recent files" className={styles.table}>
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
          <TableCell className={styles.cell}>
            <TableCellLayout
              className={styles.layout}
              media={{ className: styles.media, children: item.icon }}
              content={{ className: styles.content }}
            >
              {item.file}
            </TableCellLayout>
          </TableCell>
          <TableCell className={styles.cell}>{item.author}</TableCell>
          <TableCell className={styles.cell}>
            {item.updated}
            <TableCellActions className={styles.actions}>
              <button className={styles.actionButton} aria-label={`Edit ${item.file}`}>
                <EditRegular />
              </button>
            </TableCellActions>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
