import * as React from 'react';
import { ChevronDownRegular, ChevronUpRegular } from '@fluentui/react-icons';
import { Calendar } from '@fluentui/react-headless-components-preview/calendar';
import type { CalendarProps, CalendarView } from '@fluentui/react-headless-components-preview/calendar';
import styles from './calendar.module.css';

const calendarAppearance = {
  className: styles.calendar,
  liveRegion: { className: styles.liveRegion },
  divider: { className: styles.divider },
  goToTodayButton: { className: styles.todayButton },
  monthPickerWrapper: { className: styles.monthPicker },
  dayPicker: {
    header: { className: styles.header },
    heading: { className: styles.heading },
    navigation: { className: styles.navigation },
    previousMonthButton: { className: styles.navButton, children: React.createElement(ChevronUpRegular) },
    nextMonthButton: { className: styles.navButton, children: React.createElement(ChevronDownRegular) },
    grid: { className: styles.grid },
  },
  monthPicker: {
    header: { className: styles.header },
    heading: { className: styles.heading },
    navigation: { className: styles.navigation },
    previousYearButton: { className: styles.navButton, children: React.createElement(ChevronUpRegular) },
    nextYearButton: { className: styles.navButton, children: React.createElement(ChevronDownRegular) },
    grid: { className: styles.pickerGrid },
    yearPicker: {
      header: { className: styles.header },
      heading: { className: styles.heading },
      navigation: { className: styles.navigation },
      previousRangeButton: { className: styles.navButton, children: React.createElement(ChevronUpRegular) },
      nextRangeButton: { className: styles.navButton, children: React.createElement(ChevronDownRegular) },
      grid: { className: styles.pickerGrid },
    },
  },
} satisfies CalendarProps;

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
