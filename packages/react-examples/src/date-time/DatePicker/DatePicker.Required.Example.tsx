import * as React from 'react';
import { DatePicker, defaultDayPickerStrings } from '@uifabric/date-time';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';

const styles = mergeStyleSets({
  root: { selectors: { '> *': { marginBottom: 15 } } },
  control: { maxWidth: 300, marginBottom: 15 },
});

export const DatePickerRequiredExample: React.FunctionComponent = () => {
  return (
    <div className={styles.root}>
      <div>Validation will happen when the DatePicker loses focus.</div>
      <DatePicker
        isRequired
        label="Date required (with label)"
        strings={defaultDayPickerStrings}
        placeholder="Select a date..."
        ariaLabel="Select a date"
        className={styles.control}
      />
      <DatePicker
        isRequired
        strings={defaultDayPickerStrings}
        placeholder="Date required with no label..."
        ariaLabel="Select a date"
        className={styles.control}
      />
    </div>
  );
};
