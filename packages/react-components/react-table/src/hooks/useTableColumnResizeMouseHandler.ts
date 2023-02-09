import * as React from 'react';
import { TableColumnId, ColumnResizeState } from './types';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

type TouchOrMouseEvent = MouseEvent | TouchEvent;
type ReactTouchOrMouseEvent = React.MouseEvent | React.TouchEvent;

function isTouchEvent(event: TouchOrMouseEvent | ReactTouchOrMouseEvent): event is TouchEvent {
  return 'touches' in event;
}

function isMouseEvent(event: TouchOrMouseEvent | ReactTouchOrMouseEvent): event is MouseEvent {
  return 'clientX' in event;
}

function getEventClientX(event: TouchOrMouseEvent | ReactTouchOrMouseEvent): number {
  if (isMouseEvent(event)) {
    return event.clientX;
  } else if (isTouchEvent(event)) {
    return event.touches[0].clientX;
  } else {
    throw new Error('Unable to get clientX. Unknown event type.');
  }
}

export function useTableColumnResizeMouseHandler(columnResizeState: ColumnResizeState) {
  const mouseX = React.useRef(0);
  const currentWidth = React.useRef(0);
  const colId = React.useRef<TableColumnId | undefined>(undefined);

  const { targetDocument } = useFluent();
  const globalWin = targetDocument?.defaultView;

  const recalculatePosition = React.useCallback(
    (e: TouchOrMouseEvent) => {
      const dx = getEventClientX(e) - mouseX.current;

      // Update the local width for the column and set it
      currentWidth.current += dx;
      colId.current && columnResizeState.setColumnWidth(e, { columnId: colId.current, width: currentWidth.current });
      mouseX.current = getEventClientX(e);
    },
    [columnResizeState],
  );

  const onDrag = React.useCallback(
    (e: TouchOrMouseEvent) => {
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
    (event: TouchOrMouseEvent) => {
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
    mouseX.current = getEventClientX(event);
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
