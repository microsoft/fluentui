import { TableColumnDefinition } from '../hooks/types';

export function isColumnSortable(column: TableColumnDefinition<unknown>) {
  return column.compare.length > 0;
}
