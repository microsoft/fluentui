/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CalendarYearGridCellSlots, CalendarYearGridCellState } from './CalendarYearGridCell.types';

/**
 * Render the final JSX of CalendarYearGridCell.
 */
export const renderCalendarYearGridCell_unstable = (state: CalendarYearGridCellState): JSXElement => {
  assertSlots<CalendarYearGridCellSlots>(state);

  return <state.root />;
};
