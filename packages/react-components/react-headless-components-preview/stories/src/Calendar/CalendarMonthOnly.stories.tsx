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
