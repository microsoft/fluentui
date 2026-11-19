import type { TableColumnSizingState } from './types';

// Kept apart from `useTableColumnSizing` (which renders the styled `TableResizeHandle`), so table state defaults and
// the contexts using them don't depend on styles: the `css-modules` entry then shares them with the root entry.
export const defaultColumnSizingState: TableColumnSizingState = {
  getColumnWidths: () => [],
  getOnMouseDown: () => () => null,
  setColumnWidth: () => null,
  getTableProps: () => ({}),
  getTableHeaderCellProps: () => ({ style: {}, columnId: '' }),
  getTableCellProps: () => ({ style: {}, columnId: '' }),
  enableKeyboardMode: () => () => null,
};
