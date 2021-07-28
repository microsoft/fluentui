import * as React from 'react';
import { Calendar, Dropdown, IDropdownOption, mergeStyleSets, defaultCalendarStrings } from '@fluentui/react';

const styles = mergeStyleSets({
  wrapper: { height: 360 },
  dropdown: { width: 230 },
});

const dayOptions: IDropdownOption[] = [
  { key: '1', text: '1' },
  { key: '2', text: '2' },
  { key: '3', text: '3' },
  { key: '4', text: '4' },
  { key: '5', text: '5' },
  { key: '6', text: '6' },
];

export const CalendarInlineMultidayDayViewExample: React.FunctionComponent = () => {
  const [selectedDateRange, setSelectedDateRange] = React.useState<Date[]>();
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [daysToSelectInDayView, setDaysToSelectInDayView] = React.useState(4);

  const onSelectDate = React.useCallback((date: Date, dateRangeArray: Date[]): void => {
    setSelectedDate(date);
    setSelectedDateRange(dateRangeArray);
  }, []);

  const onDaysToSelectInDayViewDropdownChange = React.useCallback(
    (ev: React.FormEvent<HTMLElement>, option: IDropdownOption | undefined) => {
      if (option) {
        setDaysToSelectInDayView(Number(option.key));
      }
    },
    [],
  );

  let dateRangeString = 'Not set';
  if (selectedDateRange) {
    const rangeStart = selectedDateRange[0];
    const rangeEnd = selectedDateRange[selectedDateRange.length - 1];
    dateRangeString = rangeStart.toLocaleDateString() + '-' + rangeEnd.toLocaleDateString();
  }

  return (
    <div className={styles.wrapper}>
      <p>
        This calendar uses <code>dateRangeType = Day</code> and <code>daysToSelectInView = 4</code>.
      </p>
      <div>Selected date: {selectedDate?.toLocaleString() || 'Not set'}</div>
      <div>Selected range: {dateRangeString}</div>
      <Calendar
        highlightSelectedMonth
        showGoToToday
        onSelectDate={onSelectDate}
        value={selectedDate}
        calendarDayProps={{ daysToSelectInDayView }}
        // Calendar uses English strings by default. For localized apps, you must override this prop.
        strings={defaultCalendarStrings}
      />
      <Dropdown
        className={styles.dropdown}
        selectedKey={String(daysToSelectInDayView)}
        label="Choose days to select"
        options={dayOptions}
        onChange={onDaysToSelectInDayViewDropdownChange}
      />
    </div>
  );
};
