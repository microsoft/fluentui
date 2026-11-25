import * as React from 'react';
import { Calendar } from '@fluentui/react-headless-components-preview/calendar';
import type { CalendarView } from '@fluentui/react-headless-components-preview/calendar';
import { calendarAppearance } from './calendarAppearance';
import styles from './calendar.module.css';

export const ControlledOverlay = (): React.ReactNode => {
  const [value, setValue] = React.useState<Date | null>(null);
  const [displayedDate, setDisplayedDate] = React.useState(new Date(2025, 9, 14));
  const [view, setView] = React.useState<CalendarView>('day');

  return (
    <div className={styles.story}>
      <div className={styles.controls} role="group" aria-label="Displayed month">
        <button
          type="button"
          className={styles.todayButton}
          onClick={() => setDisplayedDate(date => new Date(date.getFullYear(), date.getMonth() - 1, 1))}
        >
          Previous month
        </button>
        <button
          type="button"
          className={styles.todayButton}
          onClick={() => setDisplayedDate(date => new Date(date.getFullYear(), date.getMonth() + 1, 1))}
        >
          Next month
        </button>
      </div>
      <Calendar
        {...calendarAppearance}
        layout="overlay"
        today={new Date(2025, 9, 14)}
        value={value}
        displayedDate={displayedDate}
        view={view}
        onSelectDate={(_event, data) => setValue(data.date)}
        onDisplayedDateChange={(_event, data) => setDisplayedDate(data.displayedDate)}
        onViewChange={(_event, data) => setView(data.view)}
      />
      <p className={styles.selectedDate}>
        {value
          ? `Selected: ${value.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`
          : 'Browse without selecting a date'}
      </p>
    </div>
  );
};

ControlledOverlay.parameters = {
  docs: {
    description: {
      story:
        'Control value, displayedDate and view independently. The heading opens the month picker; external paging changes the displayed month without changing the selection.',
    },
  },
};
