import * as React from 'react';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

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

  isRequiredErrorMessage: 'Field is required.',

  invalidInputErrorMessage: 'Invalid date format.',
};

const controlClass = mergeStyleSets({
  control: {
    margin: '0 0 15px 0',
    maxWidth: '300px',
  },
});

const firstDayOfWeek = DayOfWeek.Sunday;
export const DatePickerRequiredExample: React.FC = () => (
  <div className="docs-DatePickerExample">
    <p>Validation will happen when Date Picker loses focus.</p>
    <DatePicker
      className={controlClass.control}
      label="Date required (with label)"
      isRequired={true}
      firstDayOfWeek={firstDayOfWeek}
      strings={DayPickerStrings}
      placeholder="Select a date..."
      ariaLabel="Select a date"
    />
    <DatePicker
      className={controlClass.control}
      isRequired={true}
      firstDayOfWeek={firstDayOfWeek}
      strings={DayPickerStrings}
      placeholder="Date required with no label..."
      ariaLabel="Select a date"
    />
  </div>
);
