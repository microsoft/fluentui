/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CalendarDayGridHeaderCellSlots, CalendarDayGridHeaderCellState } from './CalendarDayGridHeaderCell.types';

/**
 * Renders the weekday cell without the styled layer's label motion.
 */
export const renderCalendarDayGridHeaderCell = (state: CalendarDayGridHeaderCellState): JSXElement => {
  assertSlots<CalendarDayGridHeaderCellSlots>(state);
  return <state.root />;
};
