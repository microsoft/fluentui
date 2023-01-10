import * as React from 'react';
import { ColumnId, ColumnResizeState } from './types';
import { useCallback, useRef } from 'react';

export default function useColumnResizeMouseHandler(
  columnResizeState: ColumnResizeState,
  globalWin: Window | null | undefined,
) {
  const mouseX = useRef(0);
  const currentWidth = useRef(0);
  const colId = useRef<ColumnId | undefined>(undefined);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const dx = e.clientX - mouseX.current;

      // Update the local width for the column and set it
      currentWidth.current += dx;
      colId.current && columnResizeState.setColumnWidth(colId.current, currentWidth.current);
      mouseX.current = e.clientX;
    },
    [columnResizeState],
  );

  const onMouseMove = useCallback(
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

  const onMouseUp = useCallback(
    (e: MouseEvent) => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    },
    [onMouseMove],
  );

  const getOnMouseDown = (columnId: ColumnId) => (mouseDownEvent: React.MouseEvent<HTMLElement>) => {
    // ignore other buttons than primary mouse button
    if (mouseDownEvent.target !== mouseDownEvent.currentTarget || mouseDownEvent.button !== 0) {
      return;
    }
    // Keep the width locally so that we decouple the calculation of the next with from rendering.
    // This makes the whole experience much faster and more precise
    currentWidth.current = columnResizeState.getColumnWidth(columnId);
    mouseX.current = mouseDownEvent.clientX;
    colId.current = columnId;

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
  };

  return {
    getOnMouseDown: (columnId: ColumnId) => getOnMouseDown(columnId),
  };
}
