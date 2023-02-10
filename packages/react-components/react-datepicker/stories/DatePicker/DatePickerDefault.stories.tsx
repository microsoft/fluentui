import * as React from 'react';
import { makeStyles, useId } from '@fluentui/react-components';
import { Dropdown, Option } from '@fluentui/react-combobox';
import { defaultDatePickerStrings, DatePicker, DayOfWeek } from '@fluentui/react-datepicker';
import type { DatePickerProps } from '@fluentui/react-datepicker';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const useStyles = makeStyles({
  root: {
    maxWidth: '300px',
    '> *': {
      marginBottom: '15px',
    },
  },
});

export const Default = (props: Partial<DatePickerProps>) => {
  const dropdownId = useId('dropdown-default');
  const styles = useStyles();

  const [firstDayOfWeek, setFirstDayOfWeek] = React.useState(DayOfWeek.Sunday);

  const onOptionSelect = React.useCallback(
    (_, data: { optionValue: string | undefined; selectedOptions: string[] }) => {
      if (data.optionValue) {
        setFirstDayOfWeek(DayOfWeek[data.optionValue as keyof typeof DayOfWeek]);
      }
    },
    [],
  );

  return (
    <div className={styles.root}>
      <DatePicker
        firstDayOfWeek={firstDayOfWeek}
        placeholder="Select a date..."
        ariaLabel="Select a date"
        // DatePicker uses English strings by default. For localized apps, you must override this prop.
        strings={defaultDatePickerStrings}
        {...props}
      />
      <label id={dropdownId}>Select the first day of the week</label>
      <Dropdown aria-labelledby={dropdownId} onOptionSelect={onOptionSelect} value={days[firstDayOfWeek]}>
        {days.map((day, index) => (
          <Option key={index}>{day}</Option>
        ))}
      </Dropdown>
    </div>
  );
};
