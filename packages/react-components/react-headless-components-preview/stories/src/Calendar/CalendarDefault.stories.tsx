import * as React from 'react';
import { Calendar } from '@fluentui/react-headless-components-preview/calendar';
import { ChevronDownRegular, ChevronUpRegular } from '@fluentui/react-icons';
import type { CalendarProps } from '@fluentui/react-headless-components-preview/calendar';
import styles from './calendar.module.css';

export const Default = (): React.ReactNode => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const onSelectDate: NonNullable<CalendarProps['onSelectDate']> = React.useCallback((_event, data) => {
    setSelectedDate(data.date);
  }, []);

  return (
    <div>
      <Calendar
        className={styles.calendar}
        value={selectedDate}
        onSelectDate={onSelectDate}
        liveRegion={{ className: styles.liveRegion }}
        divider={{ className: styles.divider }}
        goToTodayButton={{ className: styles.todayButton }}
        monthPickerWrapper={{ className: styles.monthPicker }}
        dayPicker={{
          header: { className: styles.header },
          heading: { className: styles.heading },
          navigation: { className: styles.navigation },
          previousMonthButton: { className: styles.navButton, children: <ChevronUpRegular /> },
          nextMonthButton: { className: styles.navButton, children: <ChevronDownRegular /> },
          grid: { className: styles.grid },
        }}
        monthPicker={{
          header: { className: styles.header },
          heading: { className: styles.heading },
          navigation: { className: styles.navigation },
          previousYearButton: { className: styles.navButton, children: <ChevronUpRegular /> },
          nextYearButton: { className: styles.navButton, children: <ChevronDownRegular /> },
          grid: { className: styles.pickerGrid },
          yearPicker: {
            header: { className: styles.header },
            heading: { className: styles.heading },
            navigation: { className: styles.navigation },
            previousRangeButton: { className: styles.navButton, children: <ChevronUpRegular /> },
            nextRangeButton: { className: styles.navButton, children: <ChevronDownRegular /> },
            grid: { className: styles.pickerGrid },
          },
        }}
      />
      <div className={styles.selectedDate}>Selected: {selectedDate.toDateString()}</div>
    </div>
  );
};
