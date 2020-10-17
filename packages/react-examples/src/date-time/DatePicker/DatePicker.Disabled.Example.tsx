import * as React from 'react';
import { DatePicker, defaultDayPickerStrings } from '@uifabric/date-time';
import { mergeStyles } from '@fluentui/react/lib/Styling';

const rootClass = mergeStyles({ maxWidth: 300, selectors: { '> *': { marginBottom: 15 } } });

export const DatePickerDisabledExample: React.FunctionComponent = () => {
  return (
    <div className={rootClass}>
      <DatePicker strings={defaultDayPickerStrings} placeholder="Select a date..." ariaLabel="Select a date" disabled />

      <DatePicker
        label="Disabled (with label)"
        strings={defaultDayPickerStrings}
        placeholder="Select a date..."
        ariaLabel="Select a date"
        disabled
      />
    </div>
  );
};
