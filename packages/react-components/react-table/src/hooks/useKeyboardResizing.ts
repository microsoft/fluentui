import * as React from 'react';
import { ArrowLeft, ArrowRight, Enter, Escape, Shift, Space } from '@fluentui/keyboard-keys';
import { useEventCallback } from '@fluentui/react-utilities';
import { ColumnResizeState, EnableKeyboardModeOnChangeCallback, TableColumnId } from './types';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

const STEP = 20;
const PRECISION_MODIFIER = Shift;
const PRECISION_FACTOR = 1 / 4;

export function useKeyboardResizing(columnResizeState: ColumnResizeState) {
  const columnId = React.useRef<TableColumnId>();
  const onChangeRef = React.useRef<EnableKeyboardModeOnChangeCallback>();

  const columnResizeStateRef = React.useRef<ColumnResizeState>(columnResizeState);
  React.useEffect(() => {
    columnResizeStateRef.current = columnResizeState;
  }, [columnResizeState]);

  const { targetDocument } = useFluent();

  const keyboardHandler = useEventCallback((event: KeyboardEvent) => {
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
        disableInteractiveMode();
        break;
    }
  });

  const enableInteractiveMode = React.useCallback(
    (colId: TableColumnId) => {
      columnId.current = colId;
      onChangeRef.current?.(colId, true);
      // Create the listener in the next tick, because the event that triggered this is still propagating
      // when Enter was pressed and would be caught in the keyboardHandler, disabling the keyboard mode immediately.
      // No idea why this is happening, but this is a working workaround.
      setTimeout(() => {
        targetDocument?.defaultView?.addEventListener('keydown', keyboardHandler);
      }, 0);
    },
    [keyboardHandler, targetDocument?.defaultView],
  );

  const disableInteractiveMode = React.useCallback(() => {
    if (columnId.current) {
      onChangeRef.current?.(columnId.current, false);
    }
    columnId.current = undefined;
    targetDocument?.defaultView?.removeEventListener('keydown', keyboardHandler);
  }, [keyboardHandler, targetDocument?.defaultView]);

  const toggleInteractiveMode = (colId: TableColumnId, onChange?: EnableKeyboardModeOnChangeCallback) => {
    onChangeRef.current = onChange;
    if (!columnId.current) {
      enableInteractiveMode(colId);
    } else if (colId && columnId.current !== colId) {
      columnId.current = colId;
      onChange?.(columnId.current, true);
    } else {
      disableInteractiveMode();
    }
  };

  return {
    toggleInteractiveMode,
  };
}
