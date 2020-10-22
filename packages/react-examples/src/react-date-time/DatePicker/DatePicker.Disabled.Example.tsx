import * as React from 'react';
import { DatePicker } from '@fluentui/react-date-time';
import { mergeStyles } from '@fluentui/react/lib/Styling';

const rootClass = mergeStyles({ maxWidth: 300, selectors: { '> *': { marginBottom: 15 } } });

export const DatePickerDisabledExample: React.FunctionComponent = () => {
  return (
    <div className={rootClass}>
      <DatePicker disabled placeholder="Select a date..." ariaLabel="Select a date" />

      <DatePicker disabled label="Disabled (with label)" placeholder="Select a date..." ariaLabel="Select a date" />
    </div>
  );
};
