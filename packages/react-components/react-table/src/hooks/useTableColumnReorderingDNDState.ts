import * as React from 'react';
import { TableColumnDefinition, TableColumnId } from './types';

export function useTableColumnReorderingDNDState<TItem>(
  columns: TableColumnDefinition<TItem>[],
  onColumnOrderChange?: (columns: TableColumnDefinition<TItem>[]) => void,
  preview: boolean = true,
) {
  const [localColumns, setLocalColumns] = React.useState(columns);
  const [draggingColumnId, setDraggingColumnId] = React.useState<TableColumnId | undefined>(undefined);

  React.useEffect(() => {
    if (!draggingColumnId && onColumnOrderChange) {
      onColumnOrderChange(localColumns);
    }
  }, [draggingColumnId, localColumns, onColumnOrderChange]);

  const getNewColumnOrder = React.useCallback(
    (columnId: TableColumnId) => {
      // No reordering is happening
      if (columnId === draggingColumnId) {
        return;
      }

      const draggedColumnIndex = localColumns.findIndex(c => c.columnId === draggingColumnId);
      const droppedAtColumnIndex = localColumns.findIndex(c => c.columnId === columnId);

      if (draggedColumnIndex !== -1 && droppedAtColumnIndex !== -1) {
        // We remove the dragged column from the array
        const columnsWithoutDragged = [...localColumns];
        columnsWithoutDragged.splice(draggedColumnIndex, 1);

        // We insert the dragged column at the index of the column we dropped on
        const newColumns = [
          ...columnsWithoutDragged.slice(0, droppedAtColumnIndex),
          localColumns[draggedColumnIndex],
          ...columnsWithoutDragged.slice(droppedAtColumnIndex),
        ];

        setLocalColumns(newColumns);
      }
    },
    [draggingColumnId, localColumns],
  );

  return {
    columns: localColumns,
    onDragStart: (columnId: TableColumnId) => (e: React.DragEvent) => {
      setDraggingColumnId(columnId);
      e.dataTransfer.effectAllowed = 'move';
    },
    onDrop: (columnId: TableColumnId) => (e: React.DragEvent) => {
      setDraggingColumnId(undefined);
      getNewColumnOrder(columnId);
    },
    onDragEnter: (columnId: TableColumnId) => (e: React.DragEvent) => {
      preview ? getNewColumnOrder(columnId) : () => undefined;
    },
    onDragOver: (columnId: TableColumnId) => (e: React.DragEvent) => {
      e.preventDefault();
    },
  };
}
