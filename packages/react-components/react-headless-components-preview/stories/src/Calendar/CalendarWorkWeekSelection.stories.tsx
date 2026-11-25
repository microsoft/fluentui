import * as React from 'react';
import { Calendar } from '@fluentui/react-headless-components-preview/calendar';
import { calendarAppearance } from './calendarAppearance';
import styles from './calendar.module.css';

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
