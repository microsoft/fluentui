import * as React from 'react';
import { Calendar } from '@fluentui/react-calendar-compat';
import { Dropdown, Field, makeStyles, Option } from '@fluentui/react-components';

const useStyles = makeStyles({
  wrapper: { height: '360px' },
  dropdown: { width: '230px' },
});

const dayOptions = ['1', '2', '3', '4', '5', '6'];

export const CalendarMultidayDayView = () => {
  const styles = useStyles();
  const [selectedDateRange, setSelectedDateRange] = React.useState<Date[]>();
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [daysToSelectInDayView, setDaysToSelectInDayView] = React.useState(4);

  const onSelectDate = React.useCallback((date: Date, selectedDateRangeArray?: Date[] | undefined): void => {
    setSelectedDate(date);
    setSelectedDateRange(selectedDateRangeArray);
  }, []);

  const onOptionSelect = React.useCallback((_, data) => {
    setDaysToSelectInDayView(data.optionText);
  }, []);

  let dateRangeString = 'Not set';
  if (selectedDateRange) {
    const rangeStart = selectedDateRange[0];
    const rangeEnd = selectedDateRange[selectedDateRange.length - 1];
    dateRangeString = rangeStart.toDateString() + '-' + rangeEnd.toDateString();
  }

  return (
    <div className={styles.wrapper}>
      <p>
        This calendar uses <code>dateRangeType = Day</code> and <code>daysToSelectInView = 4</code>.
      </p>
      <div>Selected date: {selectedDate?.toDateString() || 'Not set'}</div>
      <div>Selected range: {dateRangeString}</div>
      <Calendar
        highlightSelectedMonth
        showGoToToday
        onSelectDate={onSelectDate}
        value={selectedDate}
        calendarDayProps={{ daysToSelectInDayView }}
      />
      <Field label="Choose days to select">
        <Dropdown className={styles.dropdown} onOptionSelect={onOptionSelect}>
          {dayOptions.map(option => (
            <Option key={option} text={option} value={option} />
          ))}
        </Dropdown>
      </Field>
    </div>
  );
};

CalendarMultidayDayView.parameters = {
  docs: {
    description: {
      story:
        'A Calendar Compat allows you to pass a number of days that will be highlighted from the selected date' +
        ' and forward.',
    },
  },
};
