import * as React from 'react';
import { Calendar, DateRangeType, DayOfWeek, addDays, getDateRangeArray } from '@fluentui/react-calendar-compat';
import { Button, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  wrapper: { height: '360px' },
});
const dateRangeType = DateRangeType.Month;
const firstDayOfWeek = DayOfWeek.Sunday;

export const CalendarMonthSelection = () => {
  const styles = useStyles();
  const [selectedDateRange, setSelectedDateRange] = React.useState<Date[]>();
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onSelectDate = React.useCallback((date: Date, selectedDateRangeArray?: Date[] | undefined): void => {
    setSelectedDate(date);
    setSelectedDateRange(selectedDateRangeArray);
  }, []);

  const goPrevious = React.useCallback((): void => {
    setSelectedDate(prevSelectedDate => {
      prevSelectedDate = prevSelectedDate || new Date();
      const dateRangeArray = getDateRangeArray(prevSelectedDate, dateRangeType, firstDayOfWeek);

      const subtractFrom = new Date(dateRangeArray[0].getFullYear(), dateRangeArray[0].getMonth(), 1);
      const daysToSubtract = 1;

      return addDays(subtractFrom, -daysToSubtract);
    });
  }, []);

  const goNext = React.useCallback((): void => {
    setSelectedDate(prevSelectedDate => {
      prevSelectedDate = prevSelectedDate || new Date();
      const dateRangeArray = getDateRangeArray(prevSelectedDate, dateRangeType, firstDayOfWeek);
      return addDays(dateRangeArray.pop()!, 1);
    });
  }, []);

  let dateRangeString = 'Not set';
  if (selectedDateRange) {
    const rangeStart = selectedDateRange[0];
    const rangeEnd = selectedDateRange[selectedDateRange.length - 1];
    dateRangeString = rangeStart.toDateString() + '-' + rangeEnd.toDateString();
  }

  return (
    <div className={styles.wrapper}>
      <div>Selected date: {selectedDate?.toDateString() || 'Not set'}</div>
      <div>Selected range: {dateRangeString}</div>

      <Calendar
        dateRangeType={dateRangeType}
        highlightSelectedMonth
        showGoToToday
        onSelectDate={onSelectDate}
        value={selectedDate}
        firstDayOfWeek={firstDayOfWeek}
      />
      <div>
        <Button onClick={goPrevious}>Previous</Button>
        <Button onClick={goNext}>Next</Button>
      </div>
    </div>
  );
};

CalendarMonthSelection.parameters = {
  docs: {
    description: {
      story: 'A Calendar Compat allows you to set a selection range of months instead of selecting a single day.',
    },
  },
};
