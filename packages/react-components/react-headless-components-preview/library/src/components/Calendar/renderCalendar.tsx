/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import { CalendarProvider } from './calendarContext';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CalendarState, CalendarContextValues, CalendarSlots } from './Calendar.types';

/**
 * Render the final JSX of Calendar.
 */
export const renderCalendar = (state: CalendarState, contextValues: CalendarContextValues): JSXElement => {
  assertSlots<CalendarSlots>(state);

  return (
    <CalendarProvider value={contextValues.calendar}>
      <state.root>
        <state.liveRegion />
        {state.isDayPickerVisible && state.dayPicker && <state.dayPicker />}
        {state.isDayPickerVisible && state.isMonthPickerVisible && <state.divider />}
        {state.isMonthPickerVisible && (
          <state.monthPickerWrapper>{state.monthPicker && <state.monthPicker />}</state.monthPickerWrapper>
        )}
        {state.goToTodayButton && <state.goToTodayButton />}
      </state.root>
    </CalendarProvider>
  );
};
