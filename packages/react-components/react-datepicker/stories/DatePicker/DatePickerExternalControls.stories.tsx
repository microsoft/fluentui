import * as React from 'react';
import { makeStyles, Button } from '@fluentui/react-components';
import { addDays, defaultDatePickerStrings, DatePicker } from '@fluentui/react-datepicker';

const useStyles = makeStyles({
  root: {
    maxWidth: '300px',
    '> *': {
      marginBottom: '15px',
    },
  },
  button: {
    marginRight: '10px',
  },
});

export const ExternalControls = () => {
  const styles = useStyles();

  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());

  const goPrevious = React.useCallback(() => {
    setSelectedDate(prevSelectedDate => (prevSelectedDate ? addDays(prevSelectedDate, -1) : undefined));
  }, []);

  const goNext = React.useCallback(() => {
    setSelectedDate(prevSelectedDate => (prevSelectedDate ? addDays(prevSelectedDate, 1) : undefined));
  }, []);

  return (
    <div className={styles.root}>
      <DatePicker
        value={selectedDate}
        onSelectDate={setSelectedDate as (date: Date | null | undefined) => void}
        placeholder="Select a date..."
        ariaLabel="Select a date"
        // DatePicker uses English strings by default. For localized apps, you must override this prop.
        strings={defaultDatePickerStrings}
      />
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
