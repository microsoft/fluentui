/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CalendarYearGridRowSlots, CalendarYearGridRowState } from './CalendarYearGridRow.types';

/**
 * Render the final JSX of CalendarYearGridRow.
 */
export const renderCalendarYearGridRow_unstable = (state: CalendarYearGridRowState): JSXElement => {
  assertSlots<CalendarYearGridRowSlots>(state);

  return state.motion ? (
    <state.motion>
      <state.root />
    </state.motion>
  ) : (
    <state.root />
  );
};
