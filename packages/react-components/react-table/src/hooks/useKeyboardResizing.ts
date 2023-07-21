import * as React from 'react';
import { ArrowLeft, ArrowRight, Enter, Escape, Shift, Space } from '@fluentui/keyboard-keys';
import { useEventCallback } from '@fluentui/react-utilities';
import { ColumnResizeState, EnableKeyboardModeOnChangeCallback, TableColumnId } from './types';
import { useFocusFinders, useTabsterAttributes } from '@fluentui/react-tabster';

const STEP = 20;
const PRECISION_MODIFIER = Shift;
const PRECISION_FACTOR = 1 / 4;

export function useKeyboardResizing(columnResizeState: ColumnResizeState) {
  const [columnId, setColumnId] = React.useState<TableColumnId>();
  const onChangeRef = React.useRef<EnableKeyboardModeOnChangeCallback>();
  const { findPrevFocusable } = useFocusFinders();

  const columnResizeStateRef = React.useRef<ColumnResizeState>(columnResizeState);
  React.useEffect(() => {
    columnResizeStateRef.current = columnResizeState;
  }, [columnResizeState]);

  const resizeHandleRefs = React.useMemo(() => new Map(), []);

  const keyboardHandler = useEventCallback((event: React.KeyboardEvent) => {
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
        columnResizeStateRef.current.setColumnWidth(event.nativeEvent, {
          columnId,
          width: width - (precisionModifier ? STEP * PRECISION_FACTOR : STEP),
        });
        return;

      case ArrowRight:
        stopEvent();
        columnResizeStateRef.current.setColumnWidth(event.nativeEvent, {
          columnId,
          width: width + (precisionModifier ? STEP * PRECISION_FACTOR : STEP),
        });
        return;

      case Space:
      case Enter:
      case Escape:
        stopEvent();
        // Just blur here, the onBlur handler will take care of the rest (disableInteractiveMode).
        resizeHandleRefs.get(columnId)?.current?.blur();
        break;
    }
  });

  const enableInteractiveMode = React.useCallback(
    (colId: TableColumnId) => {
      setColumnId(colId);
      onChangeRef.current?.(colId, true);
      // This needs to happen asynchronously, because we cannot focus an element with without tabIndex.
      // Only after we have called "setColumnId" the tabIndex will be set to 0 for this handle.
      // Meaning we have to wait until the DOM updates with the new tabIndex and then we can focus.
      setTimeout(() => {
        resizeHandleRefs.get(colId)?.current?.focus();
      }, 50);
    },
    [resizeHandleRefs],
  );

  const disableInteractiveMode = React.useCallback(() => {
    // Notify the onChange listener that we are disabling interactive mode.
    if (columnId) {
      onChangeRef.current?.(columnId, false);
    }
    // Find the previous focusable element (table header button) and focus it.
    const el = resizeHandleRefs.get(columnId)?.current;
    if (el) {
      findPrevFocusable(el)?.focus();
    }

    setColumnId(undefined);
  }, [columnId, findPrevFocusable, resizeHandleRefs]);

  const toggleInteractiveMode = (colId: TableColumnId, onChange?: EnableKeyboardModeOnChangeCallback) => {
    onChangeRef.current = onChange;
    if (!columnId) {
      enableInteractiveMode(colId);
    } else if (colId && columnId !== colId) {
      enableInteractiveMode(colId);
      setColumnId(colId);
    } else {
      disableInteractiveMode();
    }
  };

  const getKeyboardResizingRef = React.useCallback(
    (colId: TableColumnId) => {
      const ref = resizeHandleRefs.get(colId) || React.createRef<HTMLDivElement>();
      resizeHandleRefs.set(colId, ref);
      return ref;
    },
    [resizeHandleRefs],
  );

  // This makes sure the left and right arrow keys are ignored in tabster,
  // so that they can be used for resizing.
  const tabsterAttrs = useTabsterAttributes({
    focusable: {
      ignoreKeydown: {
        ArrowLeft: true,
        ArrowRight: true,
      },
    },
  });

  return {
    toggleInteractiveMode,
    columnId,
    getKeyboardResizingProps: (colId: TableColumnId, currentWidth: number) => ({
      onKeyDown: keyboardHandler,
      onBlur: disableInteractiveMode,
      ref: getKeyboardResizingRef(colId),
      role: 'separator',
      'aria-label': 'Resize column',
      'aria-valuetext': `${currentWidth} pixels`,
      'aria-hidden': colId === columnId ? false : true,
      tabIndex: colId === columnId ? 0 : undefined,
      ...tabsterAttrs,
    }),
  };
}
