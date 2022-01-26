import * as React from 'react';
import { DatePicker, mergeStyleSets, defaultDatePickerStrings } from '@fluentui/react';

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
        placeholder="Select a date..."
        ariaLabel="Select a date"
        className={styles.control}
        // DatePicker uses English strings by default. For localized apps, you must override this prop.
        strings={defaultDatePickerStrings}
      />
      <DatePicker
        isRequired
        placeholder="Date required with no label..."
        ariaLabel="Select a date"
        className={styles.control}
        strings={defaultDatePickerStrings}
      />
    </div>
  );
};
