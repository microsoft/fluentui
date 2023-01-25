import * as React from 'react';
import { makeStyles, Button } from '@fluentui/react-components';
import { defaultDatePickerStrings, DatePicker } from '@fluentui/react-datepicker';
import type { IDatePicker } from '@fluentui/react-datepicker';

const useStyles = makeStyles({
  root: {
    '> *': {
      marginBottom: '15px',
    },
  },
  control: {
    maxWidth: '300px',
  },
});

export const TextInput = () => {
  const styles = useStyles();

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
        className={styles.control}
        componentRef={datePickerRef}
        label="Start date"
        allowTextInput
        ariaLabel="Select a date"
        value={value}
        onSelectDate={setValue as (date: Date | null | undefined) => void}
        // DatePicker uses English strings by default. For localized apps, you must override this prop.
        strings={defaultDatePickerStrings}
      />
      <Button onClick={onClick}>Clear</Button>
    </div>
  );
};
