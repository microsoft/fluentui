import * as React from 'react';
import { Calendar, DayOfWeek, defaultDayPickerStrings, DateRangeType } from '@uifabric/date-time';

import * as styles from './Calendar.Example.scss';

export const CalendarInlineMarkedDaysExample = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  const onSelectDate = React.useCallback(
    (date: Date) => {
      setSelectedDate(date);
    },
    [selectedDate],
  );

  const shouldMarkDay = React.useCallback((date: Date) => {
    return date.getDay() === 1 || date.getDay() === 4;
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
        calendarDayProps={{ shouldMarkDay }}
      />
    </div>
  );
};
