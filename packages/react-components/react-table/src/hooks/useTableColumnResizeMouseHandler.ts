import * as React from 'react';
import { TableColumnId, ColumnResizeState } from './types';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import {
  NativeTouchOrMouseEvent,
  ReactTouchOrMouseEvent,
  getEventClientCoords,
  isMouseEvent,
  isTouchEvent,
} from '@fluentui/react-utilities';

export function useTableColumnResizeMouseHandler(columnResizeState: ColumnResizeState) {
  const mouseX = React.useRef(0);
  const currentWidth = React.useRef(0);
  const colId = React.useRef<TableColumnId | undefined>(undefined);

  const { targetDocument } = useFluent();
  const globalWin = targetDocument?.defaultView;

  const recalculatePosition = React.useCallback(
    (e: NativeTouchOrMouseEvent) => {
      const { clientX } = getEventClientCoords(e);
      const dx = clientX - mouseX.current;

      // Update the local width for the column and set it
      currentWidth.current += dx;
      colId.current && columnResizeState.setColumnWidth(e, { columnId: colId.current, width: currentWidth.current });
      mouseX.current = clientX;
    },
    [columnResizeState],
  );

  const onDrag = React.useCallback(
    (e: NativeTouchOrMouseEvent) => {
      // Using requestAnimationFrame here drastically improves resizing experience on slower CPUs
      if (typeof globalWin?.requestAnimationFrame === 'function') {
        requestAnimationFrame(() => recalculatePosition(e));
      } else {
        recalculatePosition(e);
      }
    },
    [globalWin?.requestAnimationFrame, recalculatePosition],
  );

  const onDragEnd = React.useCallback(
    (event: NativeTouchOrMouseEvent) => {
      if (isMouseEvent(event)) {
        targetDocument?.removeEventListener('mouseup', onDragEnd);
        targetDocument?.removeEventListener('mousemove', onDrag);
      }
      if (isTouchEvent(event)) {
        targetDocument?.removeEventListener('touchend', onDragEnd);
        targetDocument?.removeEventListener('touchmove', onDrag);
      }
    },
    [onDrag, targetDocument],
  );

  const getOnMouseDown = (columnId: TableColumnId) => (event: ReactTouchOrMouseEvent) => {
    // Keep the width locally so that we decouple the calculation of the next with from rendering.
    // This makes the whole experience much faster and more precise
    currentWidth.current = columnResizeState.getColumnWidth(columnId);
    mouseX.current = getEventClientCoords(event).clientX;
    colId.current = columnId;

    if (isMouseEvent(event)) {
      // ignore other buttons than primary mouse button
      if (event.target !== event.currentTarget || event.button !== 0) {
        return;
      }
      targetDocument?.addEventListener('mouseup', onDragEnd);
      targetDocument?.addEventListener('mousemove', onDrag);
    }

    if (isTouchEvent(event)) {
      targetDocument?.addEventListener('touchend', onDragEnd);
      targetDocument?.addEventListener('touchmove', onDrag);
    }
  };

  return {
    getOnMouseDown: (columnId: TableColumnId) => getOnMouseDown(columnId),
  };
}
