import * as React from 'react';
import { addMonths, addYears, addDays, Calendar, defaultCalendarStrings } from '@fluentui/react';
import { useConst } from '@fluentui/react-hooks';

export const CalendarInlineDateBoundariesExample: React.FunctionComponent = () => {
  const today = useConst(new Date());
  const minDate = useConst(addMonths(today, -1));
  const maxDate = useConst(addYears(today, 1));
  const restrictedDates = useConst([addDays(today, -2), addDays(today, -8), addDays(today, 2), addDays(today, 8)]);

  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onSelectDate = React.useCallback((date: Date, dateRangeArray: Date[]): void => {
    setSelectedDate(date);
  }, []);

  return (
    <div style={{ height: 'auto' }}>
      <div>Selected date: {selectedDate?.toLocaleString() || 'Not set'}</div>
      <div>
        Date boundary: {minDate.toLocaleDateString()}-{maxDate.toLocaleDateString()}
      </div>
      <div>Disabled dates: {restrictedDates.map(d => d.toLocaleDateString()).join(', ')}</div>
      <Calendar
        highlightSelectedMonth
        showGoToToday={false}
        minDate={minDate}
        maxDate={maxDate}
        restrictedDates={restrictedDates}
        onSelectDate={onSelectDate}
        value={selectedDate}
        // Calendar uses English strings by default. For localized apps, you must override this prop.
        strings={defaultCalendarStrings}
      />
    </div>
  );
};
