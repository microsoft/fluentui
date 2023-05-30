import * as React from 'react';
import { ArrowLeft, ArrowRight, Enter, Escape, Shift, Space } from '@fluentui/keyboard-keys';
import { useEventCallback } from '@fluentui/react-utilities';
import { ColumnResizeState, EnableKeyboardModeOnChangeCallback, TableColumnId } from './types';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

const STEP = 20;
const PRECISION_MODIFIER = Shift;
const PRECISION_FACTOR = 1 / 4;

export function useKeyboardResizing(columnResizeState: ColumnResizeState) {
  const [columnId, setColumnId] = React.useState<TableColumnId>();
  const onChangeRef = React.useRef<EnableKeyboardModeOnChangeCallback>();
  const addListenerTimeout = React.useRef<number>();

  const columnResizeStateRef = React.useRef<ColumnResizeState>(columnResizeState);
  React.useEffect(() => {
    columnResizeStateRef.current = columnResizeState;
  }, [columnResizeState]);

  const { targetDocument } = useFluent();

  const keyboardHandler = useEventCallback((event: KeyboardEvent) => {
    if (!columnId) {
      return;
    }

    const width = columnResizeStateRef.current.getColumnWidth(columnId);
    const precisionModifier = event.getModifierState(PRECISION_MODIFIER);

    const stopEvent = () => {
      event.preventDefault();
      event.stopPropagation();
    };

    switch (event.key) {
      case ArrowLeft:
        stopEvent();
        columnResizeStateRef.current.setColumnWidth(event, {
          columnId,
          width: width - (precisionModifier ? STEP * PRECISION_FACTOR : STEP),
        });
        return;

      case ArrowRight:
        stopEvent();
        columnResizeStateRef.current.setColumnWidth(event, {
          columnId,
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

  // On component unmout, cancel any timer for adding a listener (if it exists) and remove the listener
  React.useEffect(
    () => () => {
      targetDocument?.defaultView?.clearTimeout(addListenerTimeout.current);
      targetDocument?.defaultView?.removeEventListener('keydown', keyboardHandler);
    },
    [keyboardHandler, targetDocument?.defaultView],
  );

  const enableInteractiveMode = React.useCallback(
    (colId: TableColumnId) => {
      setColumnId(colId);
      onChangeRef.current?.(colId, true);
      // Create the listener in the next tick, because the event that triggered this is still propagating
      // when Enter was pressed and would be caught in the keyboardHandler, disabling the keyboard mode immediately.
      // No idea why this is happening, but this is a working workaround.
      // Tracked here: https://github.com/microsoft/fluentui/issues/27177
      addListenerTimeout.current = targetDocument?.defaultView?.setTimeout(() => {
        targetDocument?.defaultView?.addEventListener('keydown', keyboardHandler);
      }, 0);
    },
    [keyboardHandler, targetDocument?.defaultView],
  );

  const disableInteractiveMode = React.useCallback(() => {
    if (columnId) {
      onChangeRef.current?.(columnId, false);
    }
    setColumnId(undefined);
    targetDocument?.defaultView?.removeEventListener('keydown', keyboardHandler);
  }, [columnId, keyboardHandler, targetDocument?.defaultView]);

  const toggleInteractiveMode = (colId: TableColumnId, onChange?: EnableKeyboardModeOnChangeCallback) => {
    onChangeRef.current = onChange;
    if (!columnId) {
      enableInteractiveMode(colId);
    } else if (colId && columnId !== colId) {
      setColumnId(colId);
      onChange?.(columnId, true);
    } else {
      disableInteractiveMode();
    }
  };

  return {
    toggleInteractiveMode,
    columnId,
  };
}
