import * as React from 'react';
import { Calendar } from '@fluentui/react-date-time';

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
        highlightSelectedMonth
        showGoToToday={false}
        onSelectDate={onSelectDate}
        value={selectedDate}
      />
    </div>
  );
};
