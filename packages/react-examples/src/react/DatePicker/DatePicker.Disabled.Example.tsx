import * as React from 'react';
import { DatePicker, mergeStyles, defaultDatePickerStrings } from '@fluentui/react';

const rootClass = mergeStyles({ maxWidth: 300, selectors: { '> *': { marginBottom: 15 } } });

export const DatePickerDisabledExample: React.FunctionComponent = () => {
  return (
    <div className={rootClass}>
      <DatePicker
        disabled
        placeholder="Select a date..."
        ariaLabel="Select a date"
        // DatePicker uses English strings by default. For localized apps, you must override this prop.
        strings={defaultDatePickerStrings}
      />

      <DatePicker
        disabled
        label="Disabled (with label)"
        placeholder="Select a date..."
        ariaLabel="Select a date"
        strings={defaultDatePickerStrings}
      />
    </div>
  );
};
