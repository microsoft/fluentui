import * as React from 'react';
import { DatePicker, mergeStyles, defaultDatePickerStrings, DateRangeType } from '@fluentui/react';

const rootClass = mergeStyles({ maxWidth: 300, selectors: { '> *': { marginBottom: 15 } } });

export const DatePickerInlineContiguousWorkWeekDaysExample: React.FunctionComponent = () => {
  const [selectedDateRange, setSelectedDateRange] = React.useState<Date[]>();
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onSelectDate = React.useCallback((date: Date, dateRangeArray: Date[]): void => {
    setSelectedDate(date);
    setSelectedDateRange(dateRangeArray);
  }, []);

  let dateRangeString = 'Not set';
  if (selectedDateRange) {
    const rangeStart = selectedDateRange[0];
    const rangeEnd = selectedDateRange[selectedDateRange.length - 1];
    dateRangeString = rangeStart.toLocaleDateString() + '-' + rangeEnd.toLocaleDateString();
  }

  return (
    <div className={rootClass}>
      <div>Selected date: {selectedDate?.toLocaleString() || 'Not set'}</div>
      <div>Selected range: {dateRangeString}</div>
      <DatePicker
        dateRangeType={DateRangeType.WorkWeek}
        placeholder="Select a date..."
        ariaLabel="Select a date"
        onSelectDate={onSelectDate}
        // DatePicker uses English strings by default. For localized apps, you must override this prop.
        strings={defaultDatePickerStrings}
      />
    </div>
  );
};
