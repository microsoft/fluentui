import { TableColumnDefinition } from '../hooks/types';

export function isColumnSortable(column: TableColumnDefinition<unknown, unknown>) {
  return column.compare.length > 0;
}
