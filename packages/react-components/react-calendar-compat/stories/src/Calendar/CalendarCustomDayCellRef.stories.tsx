import * as React from 'react';
import { Calendar } from '@fluentui/react-calendar-compat';
import type { CalendarDayProps } from '@fluentui/react-calendar-compat';

export const CalendarCustomDayCellRef = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onSelectDate = React.useCallback((date: Date, _): void => {
    setSelectedDate(date);
  }, []);

  const customDayCellRef: CalendarDayProps['customDayCellRef'] = React.useCallback((element, date, classNames) => {
    if (element) {
      element.title = 'custom title from customDayCellRef: ' + date.toString();
      if (date.getDay() === 0 || date.getDay() === 6) {
        // We need to split the className since we use makeStyles and griffel provides a string of space
        // separated classnames
        classNames.dayOutsideBounds && element.classList.add(...classNames.dayOutsideBounds.split(' '));
        (element.children[0] as HTMLButtonElement).disabled = true;
      }
    }
  }, []);

  return (
    <>
      <div>Selected date: {selectedDate?.toDateString() || 'Not set'}</div>
      <Calendar
        highlightSelectedMonth
        showGoToToday
        calendarDayProps={{ customDayCellRef }}
        onSelectDate={onSelectDate}
        value={selectedDate}
      />
    </>
  );
};

CalendarCustomDayCellRef.parameters = {
  docs: {
    description: {
      story: 'A Calendar Compat can be modified to allow selecting a non contiguous (7 day) week.',
    },
  },
};
