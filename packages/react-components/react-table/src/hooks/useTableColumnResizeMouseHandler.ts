import * as React from 'react';
import { TableColumnId, ColumnResizeState } from './types';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

export function useTableColumnResizeMouseHandler(columnResizeState: ColumnResizeState) {
  const mouseX = React.useRef(0);
  const currentWidth = React.useRef(0);
  const colId = React.useRef<TableColumnId | undefined>(undefined);

  const { targetDocument } = useFluent();
  const globalWin = targetDocument?.defaultView;

  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      const dx = e.clientX - mouseX.current;

      // Update the local width for the column and set it
      currentWidth.current += dx;
      colId.current && columnResizeState.setColumnWidth(e, { columnId: colId.current, width: currentWidth.current });
      mouseX.current = e.clientX;
    },
    [columnResizeState],
  );

  const onMouseMove = React.useCallback(
    (e: MouseEvent) => {
      // Using requestAnimationFrame here drastically improves resizing experience on slower CPUs
      if (typeof globalWin?.requestAnimationFrame === 'function') {
        requestAnimationFrame(() => handleMouseMove(e));
      } else {
        handleMouseMove(e);
      }
    },
    [globalWin?.requestAnimationFrame, handleMouseMove],
  );

  const onMouseUp = React.useCallback(
    (e: MouseEvent) => {
      targetDocument?.removeEventListener('mouseup', onMouseUp);
      targetDocument?.removeEventListener('mousemove', onMouseMove);
    },
    [onMouseMove, targetDocument],
  );

  const getOnMouseDown = (columnId: TableColumnId) => (mouseDownEvent: React.MouseEvent<HTMLElement>) => {
    // ignore other buttons than primary mouse button
    if (mouseDownEvent.target !== mouseDownEvent.currentTarget || mouseDownEvent.button !== 0) {
      return;
    }
    // Keep the width locally so that we decouple the calculation of the next with from rendering.
    // This makes the whole experience much faster and more precise
    currentWidth.current = columnResizeState.getColumnWidth(columnId);
    mouseX.current = mouseDownEvent.clientX;
    colId.current = columnId;

    targetDocument?.addEventListener('mouseup', onMouseUp);
    targetDocument?.addEventListener('mousemove', onMouseMove);
  };

  return {
    getOnMouseDown: (columnId: TableColumnId) => getOnMouseDown(columnId),
  };
}
