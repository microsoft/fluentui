import * as React from 'react';
import { WeeklyDayPicker, DayOfWeek, addDays, defaultWeeklyDayPickerStrings } from '@fluentui/react';
import { mergeStyleSets } from '@fluentui/style-utilities';

const styles = mergeStyleSets({
  wrapper: { height: 340 },
  button: { margin: '17px 10px 0 0' },
});

export const WeeklyDayPickerInlineMarkedDaysExample = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  return (
    <div className={styles.wrapper}>
      <div>
        Selected date(s): <span>{!selectedDate ? 'Not set' : selectedDate.toLocaleString()}</span>
      </div>
      <WeeklyDayPicker
        onSelectDate={setSelectedDate}
        firstDayOfWeek={DayOfWeek.Sunday}
        strings={defaultWeeklyDayPickerStrings}
        initialDate={selectedDate}
        getMarkedDays={getMarkedDays}
      />
    </div>
  );
};

function getMarkedDays(startingDate: Date, endingDate: Date): Date[] {
  return [addDays(startingDate, 3), addDays(startingDate, 4)];
}
