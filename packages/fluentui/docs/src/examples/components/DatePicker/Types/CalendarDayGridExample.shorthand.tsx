import * as React from 'react';
import { CalendarDayGrid } from '@fluentui/react-northstar';
import { DateRangeType, DayOfWeek, DayPickerStrings } from '@uifabric/utilities';

const CalendarDayGridExample = () => (
  <CalendarDayGrid
    firstDayOfWeek={DayOfWeek.Sunday}
    dateRangeType={DateRangeType.Day}
    today={new Date()}
    selectedDate={new Date()}
    navigatedDate={new Date()}
    strings={DayPickerStrings}
    workWeekDays={[DayOfWeek.Monday, DayOfWeek.Tuesday, DayOfWeek.Wednesday, DayOfWeek.Thursday, DayOfWeek.Friday]}
  />
);

export default CalendarDayGridExample;
