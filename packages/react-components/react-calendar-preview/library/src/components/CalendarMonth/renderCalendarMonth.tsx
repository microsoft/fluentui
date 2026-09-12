/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import { CalendarMonthProvider } from '../../contexts/calendarMonthContext';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CalendarMonthBaseState, CalendarMonthContextValues, CalendarMonthSlots } from './CalendarMonth.types';

/**
 * Render the final JSX of CalendarMonth.
 */
export const renderCalendarMonth_unstable = (
  state: CalendarMonthBaseState,
  contextValues: CalendarMonthContextValues,
): JSXElement => {
  assertSlots<CalendarMonthSlots>(state);

  if (state.isYearPickerVisible) {
    return <state.yearPicker />;
  }

  return (
    <CalendarMonthProvider value={contextValues.calendarMonth}>
      <state.root>
        <state.header>
          <state.heading />
          <state.navigation>
            <state.previousYearButton />
            <state.nextYearButton />
          </state.navigation>
        </state.header>
        <state.grid />
      </state.root>
    </CalendarMonthProvider>
  );
};
