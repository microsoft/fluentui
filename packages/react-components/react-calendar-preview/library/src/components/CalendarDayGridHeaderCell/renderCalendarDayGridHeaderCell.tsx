/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CalendarDayGridHeaderCellSlots, CalendarDayGridHeaderCellState } from './CalendarDayGridHeaderCell.types';

/**
 * Render the final JSX of CalendarDayGridHeaderCell.
 */
export const renderCalendarDayGridHeaderCell_unstable = (state: CalendarDayGridHeaderCellState): JSXElement => {
  assertSlots<CalendarDayGridHeaderCellSlots>(state);

  const { labelMotion: Motion } = state;

  const cell = <state.root />;

  return Motion ? <Motion>{cell}</Motion> : cell;
};
