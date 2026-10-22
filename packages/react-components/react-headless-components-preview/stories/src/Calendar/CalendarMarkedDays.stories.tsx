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

export const MarkedDays = (): React.ReactNode => (
  <div className={styles.story}>
    <p>October 8, 14 and 22 have appointments. Marking a date does not restrict selection.</p>
    <Calendar
      {...calendarAppearance}
      today={new Date(2025, 9, 14)}
      defaultValue={new Date(2025, 9, 14)}
      monthPicker={null}
      dayPicker={{
        ...calendarAppearance.dayPicker,
        getMarkedDays: () => [new Date(2025, 9, 8), new Date(2025, 9, 14), new Date(2025, 9, 22)],
        getCellProps: day => ({
          root: day.isMarked ? { title: 'Appointment' } : {},
        }),
      }}
    />
  </div>
);

MarkedDays.parameters = {
  docs: {
    description: {
      story:
        'Style data-marked and the marker element with consumer CSS. getCellProps returns structured element overrides without replacing Calendar keyboard or selection handlers.',
    },
  },
};
