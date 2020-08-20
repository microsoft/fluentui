import * as React from 'react';
import { Calendar, DayOfWeek, defaultDayPickerStrings, DateRangeType } from '@uifabric/date-time';
import { mergeStyleSets } from '@uifabric/styling';

const styles = mergeStyleSets({
  wrapper: { height: 360 },
  button: { margin: '17px 10px 0 0' },
  dropdown: { width: 230 },
});

export const CalendarInlineDragSelectExample = () => {
  const [selectedDates, setSelectedDates] = React.useState<Date[]>([new Date()]);
  const [daysToSelectInDayView, setDaysToSelectInDayView] = React.useState<number>(1);

  const onSelectDate = React.useCallback((date: Date, dates: Date[]) => {
    setSelectedDates(dates);
    setDaysToSelectInDayView(dates.length);
  }, []);

  let dateRangeString: string | null = null;
  if (selectedDates) {
    const rangeStart = selectedDates[0];
    const rangeEnd = selectedDates[selectedDates.length - 1];
    dateRangeString = rangeStart.toLocaleDateString() + '-' + rangeEnd.toLocaleDateString();
  }

  return (
    <div className={styles.wrapper}>
      <div>
        Selected dates:
        <span> {!dateRangeString ? 'Not set' : dateRangeString}</span>
      </div>
      <Calendar
        dateRangeType={DateRangeType.Day}
        showGoToToday={true}
        onSelectDate={onSelectDate}
        value={selectedDates[0]}
        firstDayOfWeek={DayOfWeek.Sunday}
        strings={defaultDayPickerStrings}
        calendarDayProps={{ enableClickAndDragToSelect: true, daysToSelectInDayView }}
      />
    </div>
  );
};
