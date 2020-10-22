import * as React from 'react';
import { DatePicker, IDatePickerStrings, defaultDatePickerStrings } from '@fluentui/react/lib/DatePicker';
import { addMonths, addYears } from '@fluentui/date-time-utilities';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';

const today: Date = new Date(Date.now());
const minDate: Date = addMonths(today, -1);
const maxDate: Date = addYears(today, 1);

const DayPickerStrings: IDatePickerStrings = {
  ...defaultDatePickerStrings,
  isRequiredErrorMessage: 'Field is required.',
  invalidInputErrorMessage: 'Invalid date format.',
  isOutOfBoundsErrorMessage: `Date must be between ${minDate.toLocaleDateString()}-${maxDate.toLocaleDateString()}`,
};

const controlClass = mergeStyleSets({
  control: {
    margin: '0 0 15px 0',
    maxWidth: '300px',
  },
});

export const DatePickerBoundedExample: React.FC = () => (
  <div>
    <DatePicker
      className={controlClass.control}
      strings={DayPickerStrings}
      placeholder="Select a date..."
      ariaLabel="Select a date"
      minDate={minDate}
      maxDate={maxDate}
      allowTextInput={true}
      value={today}
    />
    <DatePicker
      className={controlClass.control}
      strings={DayPickerStrings}
      placeholder="Select a date..."
      ariaLabel="Select a date"
      disabled={true}
    />
    <DatePicker
      className={controlClass.control}
      label="Disabled (with label)"
      strings={DayPickerStrings}
      placeholder="Select a date..."
      ariaLabel="Select a date"
      disabled={true}
      value={today}
    />
    <DatePicker
      className={controlClass.control}
      strings={DayPickerStrings}
      placeholder="Select a date..."
      ariaLabel="Select a date"
      minDate={minDate}
      maxDate={maxDate}
      allowTextInput={true}
    />
  </div>
);
