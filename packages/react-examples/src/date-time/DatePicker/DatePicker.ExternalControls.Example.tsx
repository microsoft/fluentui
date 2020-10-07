import * as React from 'react';
import { DatePicker, defaultDayPickerStrings } from '@uifabric/date-time';
import './DatePicker.Examples.scss';
import { addDays } from '@fluentui/date-time-utilities';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { mergeStyleSets } from '@uifabric/styling';

const styles = mergeStyleSets({
  button: { margin: '17px 10px 0 0' },
});

export const DatePickerExternalControlsExample = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());

  const onSelectDate = React.useCallback((date: Date | null | undefined) => {
    setSelectedDate(date || undefined);
  }, []);

  const goPrevious = React.useCallback(() => {
    if (selectedDate) {
      const newSelectedDate = addDays(selectedDate, -1);
      setSelectedDate(newSelectedDate);
    }
  }, [selectedDate]);

  const goNext = React.useCallback(() => {
    if (selectedDate) {
      const newSelectedDate = addDays(selectedDate, 1);
      setSelectedDate(newSelectedDate);
    }
  }, [selectedDate]);

  return (
    <div className="docs-DatePickerExample">
      <DatePicker
        value={selectedDate}
        onSelectDate={onSelectDate}
        strings={defaultDayPickerStrings}
        placeholder="Select a date..."
        ariaLabel="Select a date"
      />
      <div>
        <DefaultButton className={styles.button} onClick={goPrevious} text="Previous" />
        <DefaultButton className={styles.button} onClick={goNext} text="Next" />
      </div>
    </div>
  );
};
