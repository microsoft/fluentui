import * as React from 'react';
import { Calendar } from '@fluentui/react-headless-components-preview/calendar';
import type { CalendarProps } from '@fluentui/react-headless-components-preview/calendar';
import { calendarAppearance } from './calendarAppearance.stories';
import styles from './calendar.module.css';

export const Default = (): React.ReactNode => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const onSelectDate: NonNullable<CalendarProps['onSelectDate']> = React.useCallback((_event, data) => {
    setSelectedDate(data.date);
  }, []);

  return (
    <div>
      <Calendar {...calendarAppearance} value={selectedDate} onSelectDate={onSelectDate} />
      <div className={styles.selectedDate}>Selected: {selectedDate.toDateString()}</div>
    </div>
  );
};
