import * as React from 'react';
import { Calendar } from '@fluentui/react-headless-components-preview/calendar';
import type { CalendarProps } from '@fluentui/react-headless-components-preview/calendar';
import { calendarAppearance } from './calendarAppearance';
import styles from './calendar.module.css';

export const Default = (): React.ReactNode => {
  const today = new Date(2025, 9, 14);
  const [selectedDate, setSelectedDate] = React.useState(today);
  const onSelectDate: NonNullable<CalendarProps['onSelectDate']> = React.useCallback((_event, data) => {
    setSelectedDate(data.date);
  }, []);

  return (
    <div className={styles.story}>
      <Calendar {...calendarAppearance} today={today} value={selectedDate} onSelectDate={onSelectDate} />
      <div className={styles.selectedDate}>Selected: {selectedDate.toDateString()}</div>
    </div>
  );
};
