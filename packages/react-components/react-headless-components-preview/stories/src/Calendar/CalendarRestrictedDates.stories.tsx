import * as React from 'react';
import { ChevronDownRegular, ChevronUpRegular } from '@fluentui/react-icons';
import { Calendar } from '@fluentui/react-headless-components-preview/calendar';
import type { CalendarProps } from '@fluentui/react-headless-components-preview/calendar';
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

export const RestrictedDates = (): React.ReactNode => {
  const today = new Date(2025, 9, 14);
  const [allFocusable, setAllFocusable] = React.useState(false);
  const [value, setValue] = React.useState<Date | null>(null);

  return (
    <div className={styles.story}>
      <label className={styles.control}>
        <input type="checkbox" checked={allFocusable} onChange={event => setAllFocusable(event.target.checked)} />
        Allow focus on unavailable dates
      </label>
      <p>Choose a date from October 6 to 24. October 15 and 16 are unavailable.</p>
      <Calendar
        {...calendarAppearance}
        today={today}
        value={value}
        defaultDisplayedDate={today}
        minDate={new Date(2025, 9, 6)}
        maxDate={new Date(2025, 9, 24)}
        restrictedDates={[new Date(2025, 9, 15), new Date(2025, 9, 16)]}
        allFocusable={allFocusable}
        monthPicker={null}
        onSelectDate={(_event, data) => setValue(data.date)}
      />
      <p className={styles.selectedDate}>
        {value
          ? `Selected: ${value.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`
          : 'No date selected'}
      </p>
    </div>
  );
};

RestrictedDates.parameters = {
  docs: {
    description: {
      story:
        'Combine minDate, maxDate and restrictedDates. allFocusable lets unavailable dates receive focus, but never allows selecting them.',
    },
  },
};
