import * as React from 'react';
import { TableColumnId, ColumnResizeState } from './types';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import {
  NativeTouchOrMouseEvent,
  ReactTouchOrMouseEvent,
  getEventClientCoords,
  isMouseEvent,
  isTouchEvent,
  useAnimationFrame,
} from '@fluentui/react-utilities';

export function useTableColumnResizeMouseHandler(columnResizeState: ColumnResizeState) {
  const mouseX = React.useRef(0);
  const currentWidth = React.useRef(0);
  const colId = React.useRef<TableColumnId | undefined>(undefined);
  const [dragging, setDragging] = React.useState<boolean>(false);

  const { targetDocument } = useFluent();

  const { getColumnWidth, setColumnWidth } = columnResizeState;

  const recalculatePosition = React.useCallback(
    (e: NativeTouchOrMouseEvent) => {
      const { clientX } = getEventClientCoords(e);
      const dx = clientX - mouseX.current;

      // Update the local width for the column and set it
      currentWidth.current += dx;
      colId.current && setColumnWidth(e, { columnId: colId.current, width: currentWidth.current });
      mouseX.current = clientX;
    },
    [setColumnWidth],
  );

  const [requestRecalcFrame] = useAnimationFrame();

  const onDrag = React.useCallback(
    (e: NativeTouchOrMouseEvent) => {
      // Using requestAnimationFrame here drastically improves resizing experience on slower CPUs
      requestRecalcFrame(() => recalculatePosition(e));
    },
    [requestRecalcFrame, recalculatePosition],
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
      setDragging(false);
    },
    [onDrag, targetDocument],
  );

  const getOnMouseDown = React.useCallback(
    (columnId: TableColumnId) => (event: ReactTouchOrMouseEvent) => {
      // Keep the width locally so that we decouple the calculation of the next with from rendering.
      // This makes the whole experience much faster and more precise
      currentWidth.current = getColumnWidth(columnId);
      mouseX.current = getEventClientCoords(event).clientX;
      colId.current = columnId;

      if (isMouseEvent(event)) {
        // ignore other buttons than primary mouse button
        if (event.target !== event.currentTarget || event.button !== 0) {
          return;
        }
        targetDocument?.addEventListener('mouseup', onDragEnd);
        targetDocument?.addEventListener('mousemove', onDrag);
        setDragging(true);
      }

      if (isTouchEvent(event)) {
        targetDocument?.addEventListener('touchend', onDragEnd);
        targetDocument?.addEventListener('touchmove', onDrag);
        setDragging(true);
      }
    },
    [getColumnWidth, onDrag, onDragEnd, targetDocument],
  );

  return {
    getOnMouseDown,
    dragging,
  };
}
