import * as React from 'react';
import { DatePicker, IDatePicker, mergeStyleSets, defaultDatePickerStrings, DefaultButton } from '@fluentui/react';

const styles = mergeStyleSets({
  root: { selectors: { '> *': { marginBottom: 15 } } },
  control: { maxWidth: 300, marginBottom: 15 },
});

export const DatePickerInputExample: React.FunctionComponent = () => {
  const [value, setValue] = React.useState<Date | undefined>();
  const datePickerRef = React.useRef<IDatePicker>(null);

  const onClick = React.useCallback((): void => {
    setValue(undefined);
    datePickerRef.current?.focus();
  }, []);

  return (
    <div className={styles.root}>
      <div>
        Clicking the input field will open the DatePicker, and clicking the field again will dismiss the DatePicker and
        allow text input. When using keyboard navigation (tabbing into the field), text input is allowed by default, and
        pressing Enter will open the DatePicker.
      </div>
      <DatePicker
        componentRef={datePickerRef}
        label="Start date"
        allowTextInput
        ariaLabel="Select a date"
        value={value}
        onSelectDate={setValue as (date: Date | null | undefined) => void}
        className={styles.control}
        // DatePicker uses English strings by default. For localized apps, you must override this prop.
        strings={defaultDatePickerStrings}
      />
      <DefaultButton aria-label="Clear the date input" onClick={onClick} text="Clear" />
    </div>
  );
};
