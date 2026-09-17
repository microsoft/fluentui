/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CalendarMonthGridCellSlots, CalendarMonthGridCellState } from './CalendarMonthGridCell.types';

/**
 * Render the final JSX of CalendarMonthGridCell.
 */
export const renderCalendarMonthGridCell_unstable = (state: CalendarMonthGridCellState): JSXElement => {
  assertSlots<CalendarMonthGridCellSlots>(state);

  return <state.root />;
};
