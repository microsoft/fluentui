import * as React from 'react';
import {
  DatePicker,
  IDatePickerStrings,
  defaultDatePickerStrings,
  addMonths,
  addYears,
  IDatePickerStyles,
} from '@fluentui/react';
import { useConst } from '@fluentui/react-hooks';

const datePickerStyles: Partial<IDatePickerStyles> = { root: { maxWidth: 300, marginTop: 15 } };

export const DatePickerBoundedExample: React.FunctionComponent = () => {
  const today = useConst(new Date(Date.now()));
  const minDate = useConst(addMonths(today, -1));
  const maxDate = useConst(addYears(today, 1));

  const strings: IDatePickerStrings = useConst(() => ({
    ...defaultDatePickerStrings,
    // eslint-disable-next-line @fluentui/max-len
    isOutOfBoundsErrorMessage: `Date must be between ${minDate.toLocaleDateString()} and ${maxDate.toLocaleDateString()}`,
  }));

  return (
    <div>
      <div>
        When date boundaries are set (via <code>minDate</code> and <code>maxDate</code> props) the DatePicker will not
        allow out-of-bounds dates to be picked or entered. In this example, the allowed dates are{' '}
        {minDate.toLocaleDateString()} to {maxDate.toLocaleDateString()}.
      </div>
      <DatePicker
        styles={datePickerStyles}
        // DatePicker uses English strings by default. For localized apps, you must override this prop.
        strings={strings}
        placeholder="Select a date..."
        ariaLabel="Select a date"
        minDate={minDate}
        maxDate={maxDate}
        allowTextInput
      />
    </div>
  );
};
