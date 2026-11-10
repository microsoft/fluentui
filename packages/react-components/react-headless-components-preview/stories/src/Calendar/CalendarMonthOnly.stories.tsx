import * as React from 'react';
import { Calendar } from '@fluentui/react-headless-components-preview/calendar';
import { calendarAppearance } from './calendarAppearance';
import styles from './calendar.module.css';

export const MonthOnly = (): React.ReactNode => {
  const [value, setValue] = React.useState<Date | null>(null);
  const today = new Date(2025, 9, 14);

  return (
    <div className={styles.story}>
      <Calendar
        {...calendarAppearance}
        today={today}
        value={value}
        defaultDisplayedDate={today}
        dayPicker={null}
        dateRangeType="month"
        onSelectDate={(_event, data) => setValue(data.date)}
      />
      <p className={styles.selectedDate}>
        {value
          ? `Selected month: ${value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
          : 'Select a month'}
      </p>
    </div>
  );
};

MonthOnly.parameters = {
  docs: {
    description: {
      story:
        'Set dayPicker to null for month selection. The year heading still opens the year picker, and the selected month is exposed through aria-selected and data-selected.',
    },
  },
};
