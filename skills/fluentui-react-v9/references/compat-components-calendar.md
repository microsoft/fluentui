# Compat Components/Calendar

The calendar control lets people select and view a single date or a range of dates in their calendar. It’s made up of 3 separate views: the month view, year view, and decade view.

## Best practices

### Layout

- Don’t break the control apart.
- Include up and down arrow buttons for navigating between time ranges and a chevron to make the calendar collapsible.

### Content

- Use the following format for dates: month, day, year, as in July 31, 2016. When space is limited, use numbers and slashes for dates if the code supports that format and automatically displays the appropriate date format for different locales. For example, 2/16/19.
- Don't use ordinal numbers (such as 1st, 12th, or 23rd) to indicate a date.
- The control provides English strings by default. For localized apps, you must override these using the strings prop.

## Props

| Name                       | Type                                                      | Required | Default                                    | Description                                                                                                                                                                                                     |
| -------------------------- | --------------------------------------------------------- | -------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `componentRef`             | `RefObject<ICalendar                                      | null>`   | No                                         |                                                                                                                                                                                                                 | Optional callback to access the ICalendar interface. Use this instead of ref for accessing the public methods and properties of the component. |
| `calendarDayProps`         | `Partial<CalendarDayProps>`                               | No       |                                            | Customized props for the calendar day                                                                                                                                                                           |
| `calendarMonthProps`       | `Partial<CalendarMonthProps>`                             | No       |                                            | Customized props for the calendar month                                                                                                                                                                         |
| `className`                | `string`                                                  | No       |                                            | Optional class name to add to the root element.                                                                                                                                                                 |
| `onSelectDate`             | `((date: Date, selectedDateRangeArray?: Date[]) => void)` | No       |                                            | Callback for when a date is selected @param date - The date the user selected @param selectedDateRangeArray - The resultant list of dates that are selected based on the date range type set for the component. |
| `onDismiss`                | `(() => void)`                                            | No       |                                            | Callback for when calendar is closed                                                                                                                                                                            |
| `id`                       | `string`                                                  | No       |                                            | ID for the calendar                                                                                                                                                                                             |
| `value`                    | `Date`                                                    | No       |                                            | Default value of the Calendar, if any                                                                                                                                                                           |
| `today`                    | `Date`                                                    | No       |                                            | Value of today. If unspecified, current time in client machine will be used.                                                                                                                                    |
| `dateRangeType`            | `0 1 2 3`                                                 | No       | DateRangeType.Day                          | The date range type indicating how many days should be selected as the user selects days                                                                                                                        |
| `firstDayOfWeek`           | `0 1 2 3 4 5 6`                                           | No       | DayOfWeek.Sunday                           | The first day of the week for your locale.                                                                                                                                                                      |
| `firstWeekOfYear`          | `0 1 2`                                                   | No       | FirstWeekOfYear.FirstDay                   | Defines when the first week of the year should start.                                                                                                                                                           |
| `isMonthPickerVisible`     | `boolean`                                                 | No       | true                                       | Whether the month picker is shown beside the day picker or hidden.                                                                                                                                              |
| `isDayPickerVisible`       | `boolean`                                                 | No       | true                                       | Whether the day picker is shown beside the month picker or hidden.                                                                                                                                              |
| `showMonthPickerAsOverlay` | `boolean`                                                 | No       | false                                      | Show month picker on top of date picker when visible.                                                                                                                                                           |
| `showGoToToday`            | `boolean`                                                 | No       |                                            | Whether the "Go to today" link should be shown or not                                                                                                                                                           |
| `showWeekNumbers`          | `boolean`                                                 | No       | false                                      | Whether the calendar should show the week number (weeks 1 to 53) before each week row                                                                                                                           |
| `strings`                  | `CalendarStrings`                                         | No       |                                            | Localized strings to use in the Calendar                                                                                                                                                                        |
| `dateTimeFormatter`        | `DateFormatting`                                          | No       |                                            | Apply additional formatting to dates, for example localized date formatting.                                                                                                                                    |
| `minDate`                  | `Date`                                                    | No       |                                            | If set the Calendar will not allow navigation to or selection of a date earlier than this value.                                                                                                                |
| `maxDate`                  | `Date`                                                    | No       |                                            | If set the Calendar will not allow navigation to or selection of a date later than this value.                                                                                                                  |
| `restrictedDates`          | `Date[]`                                                  | No       |                                            | If set the Calendar will not allow selection of dates in this array.                                                                                                                                            |
| `showSixWeeksByDefault`    | `boolean`                                                 | No       | false                                      | Whether the calendar should show 6 weeks by default.                                                                                                                                                            |
| `workWeekDays`             | `DayOfWeek[]`                                             | No       | [Monday,Tuesday,Wednesday,Thursday,Friday] | The days that are selectable when `dateRangeType` is `WorkWeek`. If `dateRangeType` is not `WorkWeek` this property does nothing.                                                                               |
| `highlightCurrentMonth`    | `boolean`                                                 | No       | false                                      | Whether the month picker should highlight the current month                                                                                                                                                     |
| `highlightSelectedMonth`   | `boolean`                                                 | No       | false                                      | Whether the month picker should highlight the selected month                                                                                                                                                    |
| `showCloseButton`          | `boolean`                                                 | No       | false                                      | Whether the close button should be shown or not                                                                                                                                                                 |
| `allFocusable`             | `boolean`                                                 | No       | false                                      | Allows all dates and buttons to be focused, including disabled ones                                                                                                                                             |

## Examples

### Calendar Contiguous Work Week Days

A Calendar Compat can be modified to allow selecting a contiguous (5 day) work week.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Calendar, DateRangeType, DayOfWeek } from '@fluentui/react-calendar-compat';

const workWeekDays = [DayOfWeek.Monday, DayOfWeek.Tuesday, DayOfWeek.Wednesday, DayOfWeek.Thursday, DayOfWeek.Friday];

export const CalendarContiguousWorkWeekDays = (): JSXElement => {
  const [selectedDateRange, setSelectedDateRange] = React.useState<Date[]>();
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onSelectDate = React.useCallback((date: Date, selectedDateRangeArray?: Date[] | undefined): void => {
    setSelectedDate(date);
    setSelectedDateRange(selectedDateRangeArray);
  }, []);

  let dateRangeString = 'Not set';
  if (selectedDateRange) {
    const rangeStart = selectedDateRange[0];
    const rangeEnd = selectedDateRange[selectedDateRange.length - 1];
    dateRangeString = rangeStart.toDateString() + '-' + rangeEnd.toDateString();
  }

  return (
    <>
      <div>Selected date: {selectedDate?.toDateString() || 'Not set'}</div>
      <div>Selected range: {dateRangeString}</div>
      <Calendar
        dateRangeType={DateRangeType.WorkWeek}
        highlightSelectedMonth
        showGoToToday
        workWeekDays={workWeekDays}
        onSelectDate={onSelectDate}
        value={selectedDate}
      />
    </>
  );
};
```

### Calendar Custom Day Cell Ref

A Calendar Compat can be modified to allow selecting a non contiguous (7 day) week.

```tsx
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
        // We need to split the className since we use makeStyles and griffel provides a string of space
        // separated classnames
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
```

### Calendar Date Boundaries

A Calendar Compat can be modified to set a minDate and maxDate in order to restrict the dates that can be selected.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { addMonths, addYears, addDays, Calendar } from '@fluentui/react-calendar-compat';

export const CalendarDateBoundaries = (): JSXElement => {
  const today = new Date();
  const minDate = addMonths(today, -1);
  const maxDate = addYears(today, 1);
  const restrictedDates = [addDays(today, -2), addDays(today, -8), addDays(today, 2), addDays(today, 8)];

  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onSelectDate = React.useCallback((date: Date): void => {
    setSelectedDate(date);
  }, []);

  return (
    <>
      <div>Selected date: {selectedDate?.toDateString() || 'Not set'}</div>
      <div>
        Date boundary: {minDate.toDateString()}-{maxDate.toDateString()}
      </div>
      <div>Disabled dates: {restrictedDates.map(d => d.toDateString()).join(', ')}</div>
      <Calendar
        highlightSelectedMonth
        showGoToToday={false}
        minDate={minDate}
        maxDate={maxDate}
        restrictedDates={restrictedDates}
        onSelectDate={onSelectDate}
        value={selectedDate}
      />
    </>
  );
};
```

### Calendar Marked Days

A Calendar Compat allows you to pass a callback that returns an array of number that should bemarked. This callback provides a starting date and an ending date.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Calendar, addDays } from '@fluentui/react-calendar-compat';
import type { CalendarDayProps } from '@fluentui/react-calendar-compat';

const calendarDayProps: Partial<CalendarDayProps> = {
  getMarkedDays: (startingDate, _) => [addDays(startingDate, 3), addDays(startingDate, 4)],
};

export const CalendarMarkedDays = (): JSXElement => {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  return (
    <>
      <div>Selected date: {selectedDate?.toDateString() || 'Not set'}</div>
      <Calendar
        showGoToToday
        onSelectDate={setSelectedDate}
        value={selectedDate}
        // Add the marked days
        calendarDayProps={calendarDayProps}
      />
    </>
  );
};
```

### Calendar Month Only

A Calendar Compat allows you to only show the month and year picker leaving the day picker hidden.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Calendar, DateRangeType } from '@fluentui/react-calendar-compat';

export const CalendarMonthOnly = (): JSXElement => {
  const [selectedDateRange, setSelectedDateRange] = React.useState<Date[]>();
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onSelectDate = React.useCallback((date: Date, selectedDateRangeArray?: Date[] | undefined): void => {
    setSelectedDate(date);
    setSelectedDateRange(selectedDateRangeArray);
  }, []);

  let dateRangeString = 'Not set';
  if (selectedDateRange) {
    const rangeStart = selectedDateRange[0];
    const rangeEnd = selectedDateRange[selectedDateRange.length - 1];
    dateRangeString = rangeStart.toDateString() + '-' + rangeEnd.toDateString();
  }

  return (
    <>
      <div>Selected date: {selectedDate?.toDateString() || 'Not set'}</div>
      <div>Selected range: {dateRangeString}</div>
      <Calendar
        dateRangeType={DateRangeType.Month}
        showGoToToday
        highlightSelectedMonth
        isDayPickerVisible={false}
        onSelectDate={onSelectDate}
        value={selectedDate}
      />
    </>
  );
};
```

### Calendar Month Selection

A Calendar Compat allows you to set a selection range of months instead of selecting a single day.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Calendar, DateRangeType, DayOfWeek, addDays, getDateRangeArray } from '@fluentui/react-calendar-compat';
import { Button, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  wrapper: { height: '360px' },
});
const dateRangeType = DateRangeType.Month;
const firstDayOfWeek = DayOfWeek.Sunday;

export const CalendarMonthSelection = (): JSXElement => {
  const styles = useStyles();
  const [selectedDateRange, setSelectedDateRange] = React.useState<Date[]>();
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onSelectDate = React.useCallback((date: Date, selectedDateRangeArray?: Date[] | undefined): void => {
    setSelectedDate(date);
    setSelectedDateRange(selectedDateRangeArray);
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
        showGoToToday
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
```

### Calendar Multiday Day View

A Calendar Compat allows you to pass a number of days that will be highlighted from the selected date and forward.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Calendar } from '@fluentui/react-calendar-compat';
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

  const onSelectDate = React.useCallback((date: Date, selectedDateRangeArray?: Date[] | undefined): void => {
    setSelectedDate(date);
    setSelectedDateRange(selectedDateRangeArray);
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
        showGoToToday
        onSelectDate={onSelectDate}
        value={selectedDate}
        calendarDayProps={{ daysToSelectInDayView }}
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
        showGoToToday
        onSelectDate={onSelectDate}
        value={selectedDate}
        calendarDayProps={{ daysToSelectInDayView: -daysToSelectInDayView }}
      />
    </div>
  );
};
```

### Calendar Non Contiguous Work Week Days

A Calendar Compat can be modified to allow selecting a non contiguous (7 day) week.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Calendar, DateRangeType, DayOfWeek } from '@fluentui/react-calendar-compat';

const workWeekDays = [DayOfWeek.Tuesday, DayOfWeek.Saturday, DayOfWeek.Wednesday, DayOfWeek.Friday];

export const CalendarNonContiguousWorkWeekDays = (): JSXElement => {
  const [selectedDateRange, setSelectedDateRange] = React.useState<Date[]>();
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onSelectDate = React.useCallback((date: Date, selectedDateRangeArray?: Date[] | undefined): void => {
    setSelectedDate(date);
    setSelectedDateRange(selectedDateRangeArray);
  }, []);

  let dateRangeString = 'Not set';
  if (selectedDateRange) {
    const rangeStart = selectedDateRange[0];
    const rangeEnd = selectedDateRange[selectedDateRange.length - 1];
    dateRangeString = rangeStart.toDateString() + '-' + rangeEnd.toDateString();
  }

  return (
    <>
      <div>Selected date: {selectedDate?.toDateString() || 'Not set'}</div>
      <div>Selected range: {dateRangeString}</div>

      <Calendar
        dateRangeType={DateRangeType.WorkWeek}
        workWeekDays={workWeekDays}
        firstDayOfWeek={DayOfWeek.Monday}
        highlightSelectedMonth
        showGoToToday
        onSelectDate={onSelectDate}
        value={selectedDate}
      />
    </>
  );
};
```

### Calendar Overlaid Month

A Calendar Compat allows you to render the month picker over the day picker. This is useful when there are width constraints and the month picker is needed.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Calendar } from '@fluentui/react-calendar-compat';

export const CalendarOverlaidMonth = (): JSXElement => {
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onSelectDate = React.useCallback((date: Date): void => {
    setSelectedDate(date);
  }, []);

  return (
    <>
      <div>Selected date: {selectedDate?.toDateString() || 'Not set'}</div>

      <Calendar
        showMonthPickerAsOverlay
        highlightSelectedMonth
        showGoToToday={false}
        onSelectDate={onSelectDate}
        value={selectedDate}
      />
    </>
  );
};
```

### Calendar Six Weeks

A Calendar Compat allows you to set a six week month.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Calendar } from '@fluentui/react-calendar-compat';

export const CalendarSixWeeks = (): JSXElement => {
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onSelectDate = React.useCallback((date: Date): void => {
    setSelectedDate(date);
  }, []);

  return (
    <>
      <div>Selected date: {selectedDate?.toDateString() || 'Not set'}</div>

      <Calendar showSixWeeksByDefault showGoToToday onSelectDate={onSelectDate} value={selectedDate} />
    </>
  );
};
```

### Calendar Week Numbers

A Calendar Compat allows you to show the week numbers next to the day grid for their respective week.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Calendar } from '@fluentui/react-calendar-compat';

export const CalendarWeekNumbers = (): JSXElement => {
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onSelectDate = React.useCallback((date: Date): void => {
    setSelectedDate(date);
  }, []);

  return (
    <>
      <div>Selected date: {selectedDate?.toDateString() || 'Not set'}</div>

      <Calendar showWeekNumbers showGoToToday onSelectDate={onSelectDate} value={selectedDate} />
    </>
  );
};
```

### Calendar Week Selection

A Calendar Compat allows you to set a selection range of weeks instead of selecting a single day.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { addDays, getDateRangeArray, Calendar, DateRangeType, DayOfWeek } from '@fluentui/react-calendar-compat';
import { Button, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  wrapper: { height: '360px' },
});
const dateRangeType = DateRangeType.Week;
const firstDayOfWeek = DayOfWeek.Sunday;

export const CalendarWeekSelection = (): JSXElement => {
  const styles = useStyles();
  const [selectedDateRange, setSelectedDateRange] = React.useState<Date[]>();
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onSelectDate = React.useCallback((date: Date, selectedDateRangeArray?: Date[] | undefined): void => {
    setSelectedDate(date);
    setSelectedDateRange(selectedDateRangeArray);
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
        showGoToToday
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
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Calendar } from '@fluentui/react-calendar-compat';
import type { CalendarProps } from '@fluentui/react-calendar-compat';

export const Default = (props: CalendarProps): JSXElement => <Calendar {...props} />;
```
