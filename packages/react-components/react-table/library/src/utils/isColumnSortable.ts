import { TableColumnDefinition } from '../hooks/types';

export function isColumnSortable(column: TableColumnDefinition<unknown>): boolean {
  return column.compare.length > 0;
}
