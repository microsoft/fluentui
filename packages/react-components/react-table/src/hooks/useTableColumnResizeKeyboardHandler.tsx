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
          setInteractiveMode(true);
          setNavigationGroupParams({
            ...defaultNavigationGroupParams,
            ignoreDefaultKeydown: {
              ArrowLeft: true,
              ArrowRight: true,
            },
          });
        } else {
          setInteractiveMode(false);
          setNavigationGroupParams(defaultNavigationGroupParams);
        }
        break;

      case ESC:
        if (interactiveMode) {
          setInteractiveMode(false);
          setNavigationGroupParams(defaultNavigationGroupParams);
        }
        break;
    }
  };

  const onBlur = (columnId: TableColumnId) => (event: React.FocusEvent) => {
    setNavigationGroupParams(defaultNavigationGroupParams);
  };

  return {
    getOnKeyDown: (columnId: TableColumnId) => keyboardHandler(columnId),
    getOnBlur: (columnId: TableColumnId) => onBlur(columnId),
  };
}
