import * as React from 'react';
import { Calendar, DayOfWeek, DateRangeType, defaultDayPickerStrings } from '@uifabric/date-time';

export const CalendarInlineOverlaidMonthExample: React.FunctionComponent = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onSelectDate = React.useCallback((date: Date, dateRangeArray: Date[]): void => {
    setSelectedDate(date);
  }, []);

  return (
    <div style={{ height: '360px' }}>
      <div>Selected date: {selectedDate?.toLocaleString() || 'Not set'}</div>

      <Calendar
        showMonthPickerAsOverlay
        highlightCurrentMonth={false}
        highlightSelectedMonth
        dateRangeType={DateRangeType.Day}
        showGoToToday={false}
        onSelectDate={onSelectDate}
        value={selectedDate}
        firstDayOfWeek={DayOfWeek.Sunday}
        strings={defaultDayPickerStrings}
      />
    </div>
  );
};
