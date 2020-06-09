import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
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

  isRequiredErrorMessage: 'Start date is required.',

  invalidInputErrorMessage: 'Invalid date format.',
};

const controlClass = mergeStyleSets({
  control: {
    margin: '0 0 15px 0',
    maxWidth: '300px',
  },
});

const firstDayOfWeek = DayOfWeek.Sunday;
const desc = 'This field is required. One of the support input formats is year dash month dash day.';

export const DatePickerInputExample: React.FC = () => {
  const [value, setValue] = React.useState<Date | null | undefined>(null);

  const onSelectDate = (date: Date | null | undefined): void => {
    setValue(date);
  };

  const onClick = (): void => {
    setValue(null);
  };

  return (
    <div>
      <p>
        Text input allowed by default when use keyboard navigation. Mouse click the TextField will popup DatePicker,
        click the TextField again will dismiss the DatePicker and allow text input.
      </p>
      <DatePicker
        className={controlClass.control}
        label="Start date"
        isRequired={false}
        allowTextInput={true}
        ariaLabel={desc}
        firstDayOfWeek={firstDayOfWeek}
        strings={DayPickerStrings}
        value={value!}
        onSelectDate={onSelectDate}
      />
      <DefaultButton onClick={onClick} text="Clear" />
    </div>
  );
};
