import * as React from 'react';
import { Calendar, DayOfWeek, defaultDayPickerStrings, DateRangeType } from '@uifabric/date-time';
import { addDays } from '@fluentui/date-time-utilities';

import * as styles from './Calendar.Example.scss';

export const CalendarInlineMarkedDaysExample = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  const onSelectDate = React.useCallback(
    (date: Date) => {
      setSelectedDate(date);
    },
    [selectedDate],
  );

  const getMarkedDays = React.useCallback((startingDate: Date, endingDate): Date[] => {
    return [addDays(startingDate, 3), addDays(startingDate, 4)];
  }, []);

  return (
    <div className={styles.wrapper}>
      <div>
        Selected date(s): <span>{!selectedDate ? 'Not set' : selectedDate.toLocaleString()}</span>
      </div>
      <Calendar
        dateRangeType={DateRangeType.Day}
        showGoToToday={true}
        onSelectDate={onSelectDate}
        value={selectedDate}
        firstDayOfWeek={DayOfWeek.Sunday}
        strings={defaultDayPickerStrings}
        calendarDayProps={{ getMarkedDays }}
      />
    </div>
  );
};
