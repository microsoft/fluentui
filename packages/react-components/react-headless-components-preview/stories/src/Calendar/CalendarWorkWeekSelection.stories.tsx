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

export const WorkWeekSelection = (): React.ReactNode => {
  const [range, setRange] = React.useState<Date[]>([]);
  const today = new Date(2025, 9, 14);

  return (
    <div className={styles.story}>
      <Calendar
        {...calendarAppearance}
        today={today}
        defaultValue={null}
        defaultDisplayedDate={today}
        dateRangeType="workWeek"
        workWeekDays={['monday', 'tuesday', 'wednesday', 'thursday', 'friday']}
        firstDayOfWeek="monday"
        firstWeekOfYear="firstFourDayWeek"
        showWeekNumbers
        monthPicker={null}
        onSelectDate={(_event, data) => setRange(data.selectedDateRange)}
      />
      <p className={styles.selectedDate}>
        {range.length
          ? `Selected work days: ${range
              .map(date => date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }))
              .join('; ')}`
          : 'Select a work week'}
      </p>
    </div>
  );
};

WorkWeekSelection.parameters = {
  docs: {
    description: {
      story:
        'Select Monday through Friday as a range. Week numbers use the first-four-day-week convention; selectedDateRange contains the actual selected dates.',
    },
  },
};
