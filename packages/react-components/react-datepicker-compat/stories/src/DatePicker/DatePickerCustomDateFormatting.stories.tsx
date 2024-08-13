import * as React from 'react';
import { Button, Field, makeStyles } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-compat';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '15px',
  },
  control: {
    maxWidth: '300px',
  },
  clearButton: {
    marginBottom: '5px',
  },
});

const onFormatDate = (date?: Date): string => {
  return !date ? '' : date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear() % 100);
};

export const CustomDateFormatting = () => {
  const styles = useStyles();

  const [value, setValue] = React.useState<Date | null | undefined>(null);
  const datePickerRef = React.useRef<HTMLInputElement>(null);

  const onClick = React.useCallback((): void => {
    setValue(null);
    datePickerRef.current?.focus();
  }, []);

  const onParseDateFromString = React.useCallback(
    (newValue: string): Date => {
      const previousValue = value || new Date();
      const newValueParts = (newValue || '').trim().split('/');
      const day =
        newValueParts.length > 0 ? Math.max(1, Math.min(31, parseInt(newValueParts[0], 10))) : previousValue.getDate();
      const month =
        newValueParts.length > 1
          ? Math.max(1, Math.min(12, parseInt(newValueParts[1], 10))) - 1
          : previousValue.getMonth();
      let year = newValueParts.length > 2 ? parseInt(newValueParts[2], 10) : previousValue.getFullYear();
      if (year < 100) {
        year += previousValue.getFullYear() - (previousValue.getFullYear() % 100);
      }
      return new Date(year, month, day);
    },
    [value],
  );

  return (
    <div className={styles.root}>
      <Field label="Select a date. Input format is day slash month slash year.">
        <DatePicker
          ref={datePickerRef}
          allowTextInput
          value={value}
          onSelectDate={setValue as (date?: Date | null) => void}
          formatDate={onFormatDate}
          parseDateFromString={onParseDateFromString}
          placeholder="Select a date..."
          className={styles.control}
        />
      </Field>
      <div>
        <Button onClick={onClick} className={styles.clearButton}>
          Clear
        </Button>
        <div>Selected date: {(value || '').toString()}</div>
      </div>
    </div>
  );
};

CustomDateFormatting.parameters = {
  docs: {
    description: {
      story:
        'Applications can customize how dates are formatted and parsed. Formatted dates can be ambiguous, so the' +
        ' control will avoid parsing the formatted strings of dates selected using the UI when text input is allowed.' +
        ' In this example, we are formatting and parsing dates as dd/MM/yy.',
    },
  },
};
