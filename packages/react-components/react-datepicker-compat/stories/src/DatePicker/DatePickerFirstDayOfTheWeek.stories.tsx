import * as React from 'react';
import { DayOfWeek } from '@fluentui/react-calendar-compat';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import { Dropdown, Field, makeStyles, Option, useId } from '@fluentui/react-components';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const useStyles = makeStyles({
  root: {
    display: 'inline-flex',
    flexDirection: 'column',
    rowGap: '15px',
  },
  firstDaySelector: {
    display: 'inline-flex',
    flexDirection: 'column',
    rowGap: '5px',
  },
});

export const FirstDayOfTheWeek = () => {
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
      <Field label="Start date">
        <DatePicker firstDayOfWeek={firstDayOfWeek} placeholder="Select a date..." />
      </Field>
      <div className={styles.firstDaySelector}>
        <label id={dropdownId}>Select the first day of the week</label>
        <Dropdown aria-labelledby={dropdownId} onOptionSelect={onOptionSelect} value={days[firstDayOfWeek]}>
          {days.map((day, index) => (
            <Option key={index}>{day}</Option>
          ))}
        </Dropdown>
      </div>
    </div>
  );
};

FirstDayOfTheWeek.parameters = {
  docs: {
    description: {
      story: 'A DatePicker allows you to set the first day of the week.',
    },
  },
};
