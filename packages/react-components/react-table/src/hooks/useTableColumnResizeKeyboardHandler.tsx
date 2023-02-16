import * as React from 'react';
import { TableColumnId, ColumnResizeState } from './types';
import { useKeyboardNavigationContext } from '../contexts/keyboardNavigationContext';

export function useTableColumnResizeKeyboardHandler(columnResizeState: ColumnResizeState) {
  const DECREASE_WIDTH = 'ArrowLeft';
  const INCREASE_WIDTH = 'ArrowRight';
  const SPACEBAR = ' ';
  const ENTER = 'Enter';
  const ESC = 'Escape';

  const STEP = 20;
  const PRECISION_MODIFIER = 'Shift';
  const PRECISION_FACTOR = 1 / 4;

  const { setNavigationGroupParams, defaultNavigationGroupParams } = useKeyboardNavigationContext();
  const [interactiveMode, setInteractiveMode] = React.useState(false);

  const enableInteractiveMode = React.useCallback(() => {
    setInteractiveMode(true);
    setNavigationGroupParams({
      ...defaultNavigationGroupParams,
      ignoreDefaultKeydown: {
        ArrowLeft: true,
        ArrowRight: true,
      },
    });
  }, [defaultNavigationGroupParams, setNavigationGroupParams]);

  const disableInteractiveMode = React.useCallback(() => {
    setInteractiveMode(false);
    setNavigationGroupParams(defaultNavigationGroupParams);
  }, [defaultNavigationGroupParams, setNavigationGroupParams]);

  /**
   * Handles keyboard events. Doesn't cover entering interactive mode with the VoiceOver, see clickHandler
   */
  const keyboardHandler = (columnId: TableColumnId) => (event: React.KeyboardEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const width = columnResizeState.getColumnWidth(columnId);
    const precisionModifier = event.getModifierState(PRECISION_MODIFIER);

    switch (event.key) {
      case DECREASE_WIDTH:
        columnResizeState.setColumnWidth(event.nativeEvent, {
          columnId,
          width: width - (precisionModifier ? STEP * PRECISION_FACTOR : STEP),
        });
        return;

      case INCREASE_WIDTH:
        columnResizeState.setColumnWidth(event.nativeEvent, {
          columnId,
          width: width + (precisionModifier ? STEP * PRECISION_FACTOR : STEP),
        });
        return;

      case SPACEBAR:
      case ENTER:
        if (!interactiveMode) {
          enableInteractiveMode();
        } else {
          disableInteractiveMode();
        }
        break;

      case ESC:
        if (interactiveMode) {
          disableInteractiveMode();
        }
        break;
    }
  };

  /**
   * Handles click event (for VoiceOver).
   */
  const clickHandler = (columnId: TableColumnId) => {
    return (event: React.MouseEvent) => {
      if (!interactiveMode) {
        enableInteractiveMode();
      } else {
        disableInteractiveMode();
      }
    };
  };

  const onBlur = (event: React.FocusEvent) => {
    disableInteractiveMode();
  };

  return {
    getOnKeyDown: (columnId: TableColumnId) => keyboardHandler(columnId),
    getOnClick: (columnId: TableColumnId) => clickHandler(columnId),
    getOnBlur: () => onBlur,
  };
}
