import * as React from 'react';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { DatePicker, DayOfWeek, IDatePickerStrings, mergeStyleSets } from 'office-ui-fabric-react';

const DayPickerStrings: IDatePickerStrings = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],

  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

  goToToday: 'Go to today',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',
  closeButtonAriaLabel: 'Close date picker',
};

const controlClass = mergeStyleSets({
  control: {
    margin: '0 0 15px 0',
    maxWidth: '300px',
  },
});

export const DatePickerBasicExample: React.FC = () => {
  const [firstDayOfWeek, setFirstDayOfWeek] = React.useState(DayOfWeek.Sunday);

  const onDropdownChange = (event: React.FormEvent<HTMLDivElement>, option: IDropdownOption) => {
    setFirstDayOfWeek((DayOfWeek as any)[option.key]);
  };

  return (
    <div>
      <DatePicker
        className={controlClass.control}
        firstDayOfWeek={firstDayOfWeek}
        strings={DayPickerStrings}
        placeholder="Select a date..."
        ariaLabel="Select a date"
      />
      <Dropdown
        className={controlClass.control}
        label="Select the first day of the week"
        options={[
          {
            text: 'Sunday',
            key: DayOfWeek[DayOfWeek.Sunday],
          },
          {
            text: 'Monday',
            key: DayOfWeek[DayOfWeek.Monday],
          },
          {
            text: 'Tuesday',
            key: DayOfWeek[DayOfWeek.Tuesday],
          },
          {
            text: 'Wednesday',
            key: DayOfWeek[DayOfWeek.Wednesday],
          },
          {
            text: 'Thursday',
            key: DayOfWeek[DayOfWeek.Thursday],
          },
          {
            text: 'Friday',
            key: DayOfWeek[DayOfWeek.Friday],
          },
          {
            text: 'Saturday',
            key: DayOfWeek[DayOfWeek.Saturday],
          },
        ]}
        selectedKey={DayOfWeek[firstDayOfWeek!]}
        onChange={onDropdownChange}
      />
    </div>
  );
};
