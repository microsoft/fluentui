import * as React from 'react';
import { Calendar, defaultCalendarStrings } from '@fluentui/react';

export const CalendarInlineExample: React.FunctionComponent = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  return (
    <div style={{ height: '360px' }}>
      <div>Selected date: {selectedDate?.toLocaleString() || 'Not set'}</div>
      <Calendar
        showGoToToday
        onSelectDate={setSelectedDate}
        value={selectedDate}
        // Calendar uses English strings by default. For localized apps, you must override this prop.
        strings={defaultCalendarStrings}
      />
    </div>
  );
};
