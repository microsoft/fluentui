import * as React from 'react';
import { ArrowLeft, ArrowRight, Enter, Escape, Shift, Space } from '@fluentui/keyboard-keys';
import { useEventCallback } from '@fluentui/react-utilities';
import { ColumnResizeState, TableColumnId } from './types';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

const STEP = 20;
const PRECISION_MODIFIER = Shift;
const PRECISION_FACTOR = 1 / 4;

export function useInteractiveKeyboardResizing(columnResizeState: ColumnResizeState) {
  const columnId = React.useRef<TableColumnId>();

  const columnResizeStateRef = React.useRef<ColumnResizeState>(columnResizeState);
  React.useEffect(() => {
    columnResizeStateRef.current = columnResizeState;
  }, [columnResizeState]);

  const { targetDocument } = useFluent();

  const keyboardHandler = useEventCallback((event: KeyboardEvent) => {
    if (!columnId.current) {
      return;
    }

    const colId = columnId.current;

    if (!colId) {
      return;
    }

    const width = columnResizeStateRef.current.getColumnWidth(colId);
    const precisionModifier = event.getModifierState(PRECISION_MODIFIER);

    const stopEvent = () => {
      event.preventDefault();
      event.stopPropagation();
    };

    switch (event.key) {
      case ArrowLeft:
        stopEvent();
        columnResizeStateRef.current.setColumnWidth(event, {
          columnId: colId,
          width: width - (precisionModifier ? STEP * PRECISION_FACTOR : STEP),
        });
        return;

      case ArrowRight:
        stopEvent();
        columnResizeStateRef.current.setColumnWidth(event, {
          columnId: colId,
          width: width + (precisionModifier ? STEP * PRECISION_FACTOR : STEP),
        });
        return;

      case Space:
      case Enter:
      case Escape:
        stopEvent();
        if (columnId.current) {
          disableInteractiveMode();
        }
        break;
    }
  });

  const enableInteractiveMode = React.useCallback(
    (colId: TableColumnId) => {
      columnId.current = colId;

      targetDocument?.defaultView?.addEventListener('keydown', keyboardHandler);
    },
    [keyboardHandler, targetDocument?.defaultView],
  );

  const disableInteractiveMode = React.useCallback(() => {
    columnId.current = undefined;
    targetDocument?.defaultView?.removeEventListener('keydown', keyboardHandler);
  }, [keyboardHandler, targetDocument?.defaultView]);

  const toggleInteractiveMode = (colId: TableColumnId) => {
    if (!columnId.current) {
      enableInteractiveMode(colId);
    } else if (colId && columnId.current !== colId) {
      columnId.current = colId;
    } else {
      disableInteractiveMode();
    }
  };

  return {
    toggleInteractiveMode,
  };
}
