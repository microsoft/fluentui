import * as React from 'react';
import { ArrowLeft, ArrowRight, Enter, Escape, Shift, Space } from '@fluentui/keyboard-keys';
import { useEventCallback } from '@fluentui/react-utilities';
import { ColumnResizeState, TableColumnId } from './types';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useFocusFinders } from '@fluentui/react-tabster';

const STEP = 20;
const PRECISION_MODIFIER = Shift;
const PRECISION_FACTOR = 1 / 4;

export function useKeyboardResizing(columnResizeState: ColumnResizeState) {
  const columnId = React.useRef<TableColumnId>();
  const elementRef = React.useRef<HTMLElement | null>(null);
  const { findFirstFocusable } = useFocusFinders();

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
        if (columnId.current) {
          disableInteractiveMode();
        }
        break;
    }
  });

  const enableInteractiveMode = React.useCallback(
    (colId: TableColumnId, element: HTMLElement | null) => {
      columnId.current = colId;
      elementRef.current = element;
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
    columnId.current = undefined;
    targetDocument?.defaultView?.removeEventListener('keydown', keyboardHandler);
    if (elementRef.current) {
      findFirstFocusable(elementRef.current)?.focus();
    }
  }, [findFirstFocusable, keyboardHandler, targetDocument?.defaultView]);

  const toggleInteractiveMode = (colId: TableColumnId, element: HTMLElement | null = null) => {
    if (!columnId.current) {
      enableInteractiveMode(colId, element);
    } else if (colId && columnId.current !== colId) {
      columnId.current = colId;
      elementRef.current = element;
    } else {
      disableInteractiveMode();
    }
  };

  return {
    toggleInteractiveMode,
  };
}
