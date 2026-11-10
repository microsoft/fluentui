import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { addDays } from '@fluentui/react-calendar-compat';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import { AriaLiveAnnouncer, Button, Field, makeStyles, useAnnounce } from '@fluentui/react-components';

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

export const Controlled = (): JSXElement => {
  const styles = useStyles();
  const { announce } = useAnnounce();

  const [selectedDate, setSelectedDate] = React.useState<Date | null | undefined>(null);

  const goPrevious = React.useCallback(() => {
    setSelectedDate(prevSelectedDate => {
      const newDate = prevSelectedDate ? addDays(prevSelectedDate, -1) : new Date();
      announce(newDate.toDateString());
      return newDate;
    });
  }, [announce]);

  const goNext = React.useCallback(() => {
    setSelectedDate(prevSelectedDate => {
      const newDate = prevSelectedDate ? addDays(prevSelectedDate, 1) : new Date();
      announce(newDate.toDateString());
      return newDate;
    });
  }, [announce]);

  return (
    <AriaLiveAnnouncer>
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
    </AriaLiveAnnouncer>
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
