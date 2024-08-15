import * as React from 'react';
import { addDays } from '@fluentui/react-calendar-compat';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import { Button, Field, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '15px',
  },
  control: {
    maxWidth: '300px',
  },
  button: {
    marginRight: '10px',
  },
});

export const Controlled = () => {
  const styles = useStyles();

  const [selectedDate, setSelectedDate] = React.useState<Date | null | undefined>(null);

  const goPrevious = React.useCallback(() => {
    setSelectedDate(prevSelectedDate => (prevSelectedDate ? addDays(prevSelectedDate, -1) : null));
  }, []);

  const goNext = React.useCallback(() => {
    setSelectedDate(prevSelectedDate => (prevSelectedDate ? addDays(prevSelectedDate, 1) : null));
  }, []);

  return (
    <div className={styles.root}>
      <Field label="Select a date">
        <DatePicker
          value={selectedDate}
          onSelectDate={setSelectedDate}
          placeholder="Select a date..."
          className={styles.control}
        />
      </Field>
      <div>
        <Button className={styles.button} onClick={goPrevious}>
          Previous
        </Button>
        <Button className={styles.button} onClick={goNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

Controlled.parameters = {
  docs: {
    description: {
      story:
        'A DatePicker can be controlled by manually keeping track of the state and updating it. When controlled,' +
        ' the value prop should use null instead of undefined to clear the value of the DatePicker.',
    },
  },
};
