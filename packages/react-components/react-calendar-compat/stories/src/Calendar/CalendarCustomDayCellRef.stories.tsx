import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Calendar } from '@fluentui/react-calendar-compat';
import type { CalendarDayGridStyles } from '@fluentui/react-calendar-compat';

export const CalendarCustomDayCellRef = (): JSXElement => {
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onSelectDate = React.useCallback((date: Date): void => {
    setSelectedDate(date);
  }, []);

  const customDayCellRef = React.useCallback((element: HTMLElement, date: Date, classNames: CalendarDayGridStyles) => {
    if (element) {
      element.title = 'custom title from customDayCellRef: ' + date.toString();
      if (date.getDay() === 0 || date.getDay() === 6) {
        // `classNames.dayOutsideBounds` is a className string, which may hold more than one
        // space-separated class, so it is split before being passed to `classList.add`.
        classNames.dayOutsideBounds && element.classList.add(...classNames.dayOutsideBounds.split(' '));
        (element.children[0] as HTMLButtonElement).disabled = true;
      }
    }
  }, []);

  return (
    <>
      <div>Selected date: {selectedDate?.toDateString() || 'Not set'}</div>
      <Calendar
        highlightSelectedMonth
        showGoToToday
        calendarDayProps={{ customDayCellRef }}
        onSelectDate={onSelectDate}
        value={selectedDate}
      />
    </>
  );
};

CalendarCustomDayCellRef.parameters = {
  docs: {
    description: {
      story: 'A Calendar Compat can be modified to allow selecting a non contiguous (7 day) week.',
    },
  },
};
