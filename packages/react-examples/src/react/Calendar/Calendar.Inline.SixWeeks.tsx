import * as React from 'react';
import { Calendar } from '@fluentui/react';

export const CalendarInlineSixWeeksExample: React.FunctionComponent = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onSelectDate = React.useCallback((date: Date, dateRangeArray: Date[]): void => {
    setSelectedDate(date);
  }, []);

  return (
    <div style={{ height: '360px' }}>
      <div>Selected date: {selectedDate?.toLocaleString() || 'Not set'}</div>

      <Calendar showSixWeeksByDefault showGoToToday onSelectDate={onSelectDate} value={selectedDate} />
    </div>
  );
};
