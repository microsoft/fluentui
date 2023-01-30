import * as React from 'react';
import { DatePicker, mergeStyles, defaultDatePickerStrings } from '@fluentui/react';

const rootClass = mergeStyles({ minWidth: 170, selectors: { '> *': { marginBottom: 15 } } });

export const DatePickerBasicExample: React.FunctionComponent = () => {
  // const [firstDayOfWeek, setFirstDayOfWeek] = React.useState(DayOfWeek.Sunday);

  return (
    <div className={rootClass}>
      <DatePicker
        placeholder="Select a date..."
        ariaLabel="Select a date"
        // DatePicker uses English strings by default. For localized apps, you must override this prop.
        strings={defaultDatePickerStrings}
      />
    </div>
  );
};
