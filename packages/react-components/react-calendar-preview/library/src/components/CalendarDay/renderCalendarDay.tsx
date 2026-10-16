/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import { CalendarDayProvider } from '../../contexts/calendarDayContext';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CalendarDayBaseState, CalendarDayContextValues, CalendarDaySlots } from './CalendarDay.types';

/**
 * Render the final JSX of CalendarDay.
 */
export const renderCalendarDay_unstable = (
  state: CalendarDayBaseState,
  contextValues: CalendarDayContextValues,
): JSXElement => {
  assertSlots<CalendarDaySlots>(state);

  return (
    <CalendarDayProvider value={contextValues.calendarDay}>
      <state.root>
        <state.header>
          <state.heading />
          <state.navigation>
            <state.previousMonthButton />
            <state.nextMonthButton />
            {state.closeButton && <state.closeButton />}
          </state.navigation>
        </state.header>
        <state.grid>
          <state.body />
        </state.grid>
      </state.root>
    </CalendarDayProvider>
  );
};
