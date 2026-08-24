/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CalendarMonthGridRowSlots, CalendarMonthGridRowState } from './CalendarMonthGridRow.types';

/**
 * Render the final JSX of CalendarMonthGridRow.
 */
export const renderCalendarMonthGridRow_unstable = (state: CalendarMonthGridRowState): JSXElement => {
  assertSlots<CalendarMonthGridRowSlots>(state);

  return state.motion ? (
    <state.motion>
      <state.root />
    </state.motion>
  ) : (
    <state.root />
  );
};
