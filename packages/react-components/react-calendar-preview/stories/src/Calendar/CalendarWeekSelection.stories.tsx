import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { addDays, getDateRangeArray, Calendar } from '@fluentui/react-calendar-preview';
import type { CalendarProps } from '@fluentui/react-calendar-preview';
import { Button, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  wrapper: { height: '360px' },
});
const dateRangeType = 'week';
const firstDayOfWeek = 'sunday';

export const CalendarWeekSelection = (): JSXElement => {
  const styles = useStyles();
  const [selectedDateRange, setSelectedDateRange] = React.useState<Date[]>();
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onSelectDate: NonNullable<CalendarProps['onSelectDate']> = React.useCallback((_event, data) => {
    setSelectedDate(data.date);
    setSelectedDateRange(data.selectedDateRangeArray);
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

CalendarWeekSelection.parameters = {
  docs: {
    description: {
      story: 'A Calendar Compat allows you to set a selection range of weeks instead of selecting a single day.',
    },
  },
};
