import * as React from 'react';
import { Calendar, DayOfWeek, defaultDayPickerStrings, DateRangeType } from '@uifabric/date-time';
import { addDays } from '@fluentui/date-time-utilities';
import { mergeStyleSets } from '@uifabric/styling';

const styles = mergeStyleSets({
  wrapper: { height: 360 },
  button: { margin: '17px 10px 0 0' },
  dropdown: { width: 230 },
});
export const CalendarInlineMarkedDaysExample = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  return (
    <div className={styles.wrapper}>
      <div>
        Selected date(s): <span>{!selectedDate ? 'Not set' : selectedDate.toLocaleString()}</span>
      </div>
      <Calendar
        dateRangeType={DateRangeType.Day}
        showGoToToday={true}
        onSelectDate={setSelectedDate}
        value={selectedDate}
        firstDayOfWeek={DayOfWeek.Sunday}
        strings={defaultDayPickerStrings}
        calendarDayProps={{ getMarkedDays }}
      />
    </div>
  );
};
function getMarkedDays(startingDate: Date, endingDate: Date): Date[] {
  return [addDays(startingDate, 3), addDays(startingDate, 4)];
}
