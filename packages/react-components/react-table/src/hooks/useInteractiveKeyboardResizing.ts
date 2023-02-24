import { useEventCallback } from '@fluentui/react-utilities';
import * as React from 'react';
import { useKeyboardNavigationContext } from '../contexts/keyboardNavigationContext';
import { ColumnResizeState, TableColumnId } from './types';

export function useInteractiveKeyboardResizing(columnResizeState: ColumnResizeState) {
  const DECREASE_WIDTH = 'ArrowLeft';
  const INCREASE_WIDTH = 'ArrowRight';
  const SPACEBAR = ' ';
  const ENTER = 'Enter';
  const ESC = 'Escape';

  const STEP = 20;
  const PRECISION_MODIFIER = 'Shift';
  const PRECISION_FACTOR = 1 / 4;

  const { setNavigationGroupParams, defaultNavigationGroupParams } = useKeyboardNavigationContext();
  const columnId = React.useRef<TableColumnId>();

  const columnResizeStateRef = React.useRef<ColumnResizeState>(columnResizeState);
  React.useEffect(() => {
    columnResizeStateRef.current = columnResizeState;
  }, [columnResizeState]);

  const keyboardHandler = useEventCallback((event: KeyboardEvent) => {
    if (!columnId.current) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const colId = columnId.current;

    if (!colId) {
      return;
    }

    const width = columnResizeStateRef.current.getColumnWidth(colId);
    const precisionModifier = event.getModifierState(PRECISION_MODIFIER);

    switch (event.key) {
      case DECREASE_WIDTH:
        columnResizeStateRef.current.setColumnWidth(event, {
          columnId: colId,
          width: width - (precisionModifier ? STEP * PRECISION_FACTOR : STEP),
        });
        return;

      case INCREASE_WIDTH:
        columnResizeStateRef.current.setColumnWidth(event, {
          columnId: colId,
          width: width + (precisionModifier ? STEP * PRECISION_FACTOR : STEP),
        });
        return;

      case SPACEBAR:
      case ENTER:
      case ESC:
        if (columnId.current) {
          disableInteractiveMode();
        }
        break;
    }
  });

  const enableInteractiveMode = React.useCallback(
    (colId: TableColumnId) => {
      columnId.current = colId;

      window.addEventListener('keydown', keyboardHandler);

      setNavigationGroupParams({
        ...defaultNavigationGroupParams,
        ignoreDefaultKeydown: {
          ArrowLeft: true,
          ArrowRight: true,
        },
      });
    },
    [defaultNavigationGroupParams, keyboardHandler, setNavigationGroupParams],
  );

  const disableInteractiveMode = React.useCallback(() => {
    columnId.current = undefined;
    window.removeEventListener('keydown', keyboardHandler);
    setNavigationGroupParams(defaultNavigationGroupParams);
  }, [defaultNavigationGroupParams, keyboardHandler, setNavigationGroupParams]);

  const toggleInteractiveMode = (colId: TableColumnId) => {
    if (!columnId.current) {
      enableInteractiveMode(colId);
    } else if (colId && columnId.current !== colId) {
      disableInteractiveMode();
      enableInteractiveMode(colId);
    } else {
      disableInteractiveMode();
    }
  };

  return {
    toggleInteractiveMode,
  };
}
