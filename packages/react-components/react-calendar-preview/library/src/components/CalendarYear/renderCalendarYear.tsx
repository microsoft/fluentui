/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import { CalendarYearProvider } from '../../contexts/calendarYearContext';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CalendarYearBaseState, CalendarYearContextValues, CalendarYearSlots } from './CalendarYear.types';

/**
 * Render the final JSX of CalendarYear.
 */
export const renderCalendarYear_unstable = (
  state: CalendarYearBaseState,
  contextValues: CalendarYearContextValues,
): JSXElement => {
  assertSlots<CalendarYearSlots>(state);

  return (
    <CalendarYearProvider value={contextValues.calendarYear}>
      <state.root>
        <state.header>
          <state.heading />
          <state.navigation>
            <state.previousRangeButton />
            <state.nextRangeButton />
          </state.navigation>
        </state.header>
        <state.grid />
      </state.root>
    </CalendarYearProvider>
  );
};
