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

const onFormatDate = (date: Date): string => {
  return date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear() % 100);
};

const desc = 'This field is required. One of the support input formats is year dash month dash day.';
const firstDayOfWeek = DayOfWeek.Sunday;

export const DatePickerFormatExample: React.FC = () => {
  const [value, setValue] = React.useState<Date | null | undefined>(null);

  const onSelectDate = (date: Date | null | undefined): void => {
    setValue(date);
  };

  const onClick = (): void => {
    setValue(null);
  };

  const onParseDateFromString = (val: string): Date => {
    const date = value || new Date();
    const values = (val || '').trim().split('/');
    const day = val.length > 0 ? Math.max(1, Math.min(31, parseInt(values[0], 10))) : date.getDate();
    const month = val.length > 1 ? Math.max(1, Math.min(12, parseInt(values[1], 10))) - 1 : date.getMonth();
    let year = val.length > 2 ? parseInt(values[2], 10) : date.getFullYear();
    if (year < 100) {
      year += date.getFullYear() - (date.getFullYear() % 100);
    }
    return new Date(year, month, day);
  };

  return (
    <div>
      <p>
        Applications can customize how dates are formatted and parsed. Formatted dates can be ambiguous, so the control
        will avoid parsing the formatted strings of dates selected using the UI when text input is allowed. In this
        example, we are formatting and parsing dates as dd/MM/yy.
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
        formatDate={onFormatDate}
        parseDateFromString={onParseDateFromString}
      />
      <DefaultButton onClick={onClick} text="Clear" />
      <div>{(value || '').toString()}</div>
    </div>
  );
};
