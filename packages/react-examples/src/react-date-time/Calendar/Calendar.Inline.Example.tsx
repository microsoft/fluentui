import * as React from 'react';
import { Calendar } from '@fluentui/react-date-time';

export const CalendarInlineExample: React.FunctionComponent = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  return (
    <div style={{ height: '360px' }}>
      <div>Selected date: {selectedDate?.toLocaleString() || 'Not set'}</div>
      <Calendar showGoToToday onSelectDate={setSelectedDate} value={selectedDate} />
    </div>
  );
};
