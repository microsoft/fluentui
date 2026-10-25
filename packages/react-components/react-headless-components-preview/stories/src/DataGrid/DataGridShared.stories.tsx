import * as React from 'react';
import {
  createTableColumn,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
} from '@fluentui/react-headless-components-preview/data-grid';
import type { DataGridProps } from '@fluentui/react-headless-components-preview/data-grid';

import styles from './data-grid.module.css';

export interface Item {
  file: string;
  author: string;
  updated: number;
}

export const items: Item[] = [
  { file: 'Meeting notes', author: 'Max Mustermann', updated: 3 },
  { file: 'Thursday presentation', author: 'Erika Mustermann', updated: 1 },
  { file: 'Training recording', author: 'John Doe', updated: 2 },
  { file: 'Budget', author: 'Jane Roe', updated: 5 },
];

export const columns = [
  createTableColumn<Item>({
    columnId: 'file',
    compare: (a, b) => a.file.localeCompare(b.file),
    renderHeaderCell: () => 'File',
    renderCell: item => item.file,
  }),
  createTableColumn<Item>({
    columnId: 'author',
    compare: (a, b) => a.author.localeCompare(b.author),
    renderHeaderCell: () => 'Author',
    renderCell: item => item.author,
  }),
  createTableColumn<Item>({
    columnId: 'updated',
    compare: (a, b) => a.updated - b.updated,
    renderHeaderCell: () => 'Updated (days ago)',
    renderCell: item => item.updated,
  }),
];

/**
 * Grid used by the stories. The selection indicators are native inputs, so they are given an accessible name.
 */
export const StoryGrid = (props: Partial<DataGridProps>): React.ReactElement => {
  const selectable = !!props.selectionMode;
  const single = props.selectionMode === 'single';

  return (
    <DataGrid items={items} columns={columns} aria-label="Files" className={styles.grid} {...props}>
      <DataGridHeader>
        <DataGridRow
          className={`${styles.row} ${styles.headerRow}`}
          selectionCell={
            selectable
              ? {
                  className: styles.selectionCell,
                  checkboxIndicator: { 'aria-label': 'Select all rows' },
                  // a single selection grid has no select all
                  radioIndicator: undefined,
                }
              : undefined
          }
        >
          {({ renderHeaderCell }) => (
            <DataGridHeaderCell className={styles.headerCell} button={{ className: styles.sortButton }}>
              {renderHeaderCell()}
            </DataGridHeaderCell>
          )}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<Item>>
        {({ item, rowId }) => (
          <DataGridRow<Item>
            key={rowId}
            className={styles.row}
            selectionCell={
              selectable
                ? {
                    className: styles.selectionCell,
                    ...(single
                      ? { radioIndicator: { 'aria-label': `Select ${item.file}` } }
                      : { checkboxIndicator: { 'aria-label': `Select ${item.file}` } }),
                  }
                : undefined
            }
          >
            {({ renderCell }) => <DataGridCell className={styles.cell}>{renderCell(item)}</DataGridCell>}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
};
