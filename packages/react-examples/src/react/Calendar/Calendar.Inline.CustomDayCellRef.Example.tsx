import * as React from 'react';
import { Calendar, ICalendarDayProps, defaultCalendarStrings } from '@fluentui/react';

const calendarDayProps: Partial<ICalendarDayProps> = {
  customDayCellRef: (element, date, classNames) => {
    if (element) {
      element.title = 'custom title from customDayCellRef: ' + date.toString();
      if (date.getDay() === 0 || date.getDay() === 6) {
        classNames.dayOutsideBounds && element.classList.add(classNames.dayOutsideBounds);
        (element.children[0] as HTMLButtonElement).disabled = true;
      }
    }
  },
};

export const CalendarInlineCustomDayCellRefExample: React.FunctionComponent = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onSelectDate = React.useCallback((date: Date, dateRangeArray: Date[]): void => {
    setSelectedDate(date);
  }, []);

  return (
    <div style={{ height: 'auto' }}>
      <div>Selected date: {selectedDate?.toLocaleString() || 'Not set'}</div>
      <Calendar
        highlightSelectedMonth
        showGoToToday
        calendarDayProps={calendarDayProps}
        onSelectDate={onSelectDate}
        value={selectedDate}
        // Calendar uses English strings by default. For localized apps, you must override this prop.
        strings={defaultCalendarStrings}
      />
    </div>
  );
};
