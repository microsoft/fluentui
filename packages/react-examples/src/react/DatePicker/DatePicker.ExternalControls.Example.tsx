import * as React from 'react';
import { DatePicker, addDays, mergeStyleSets, defaultDatePickerStrings } from '@fluentui/react';
import { DefaultButton } from '@fluentui/react/lib/Button';

const styles = mergeStyleSets({
  root: { maxWidth: 300, selectors: { '> *': { marginBottom: 15 } } },
  button: { marginRight: 10 },
});

export const DatePickerExternalControlsExample = () => {
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
        <DefaultButton className={styles.button} onClick={goPrevious} text="Previous" />
        <DefaultButton className={styles.button} onClick={goNext} text="Next" />
      </div>
    </div>
  );
};
