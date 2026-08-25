import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Calendar } from '@fluentui/react-calendar-preview';
import type { CalendarProps } from '@fluentui/react-calendar-preview';
import { Dropdown, Field, makeStyles, Option } from '@fluentui/react-components';
import type { SelectionEvents, OptionOnSelectData } from '@fluentui/react-components';

const useStyles = makeStyles({
  wrapper: { height: '360px' },
  dropdown: { width: '230px' },
});

const dayOptions = ['1', '2', '3', '4', '5', '6'];

export const CalendarMultidayDayView = (): JSXElement => {
  const styles = useStyles();
  const [selectedDateRange, setSelectedDateRange] = React.useState<Date[]>();
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [daysToSelectInDayView, setDaysToSelectInDayView] = React.useState(4);

  const onSelectDate: NonNullable<CalendarProps['onSelectDate']> = React.useCallback((_event, data) => {
    setSelectedDate(data.date);
    setSelectedDateRange(data.selectedDateRangeArray);
  }, []);

  const onOptionSelect = React.useCallback((_: SelectionEvents, data: OptionOnSelectData) => {
    setDaysToSelectInDayView(Number(data.optionText));
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
        onSelectDate={onSelectDate}
        value={selectedDate}
        dayPicker={{ daysToSelectInDayView }}
      />
      <Field label="Choose days to select">
        <Dropdown className={styles.dropdown} onOptionSelect={onOptionSelect}>
          {dayOptions.map(option => (
            <Option key={option} text={option} value={option}>
              {option}
            </Option>
          ))}
        </Dropdown>
      </Field>
      <h3>Selection with negative date range</h3>
      <Calendar
        highlightSelectedMonth
        onSelectDate={onSelectDate}
        value={selectedDate}
        dayPicker={{ daysToSelectInDayView: -daysToSelectInDayView }}
      />
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
