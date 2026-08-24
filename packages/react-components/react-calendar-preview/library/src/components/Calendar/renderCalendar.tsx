/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import { CalendarProvider } from '../../contexts/calendarContext';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CalendarBaseState, CalendarContextValues, CalendarSlots } from './Calendar.types';

/**
 * Render the final JSX of Calendar.
 */
export const renderCalendar_unstable = (state: CalendarBaseState, contextValues: CalendarContextValues): JSXElement => {
  assertSlots<CalendarSlots>(state);

  return (
    <CalendarProvider value={contextValues.calendar}>
      <state.root>
        <state.liveRegion />
        {state.isDayPickerVisible && <state.dayPicker />}
        {state.isDayPickerVisible && state.isMonthPickerVisible && <state.divider />}
        {state.isMonthPickerVisible ? (
          <state.monthPickerWrapper>
            <state.monthPicker />
            {state.goToTodayButton && <state.goToTodayButton />}
          </state.monthPickerWrapper>
        ) : (
          state.goToTodayButton && <state.goToTodayButton />
        )}
      </state.root>
    </CalendarProvider>
  );
};
