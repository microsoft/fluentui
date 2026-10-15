import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, makeStyles } from '@fluentui/react-components';
import type { DatePickerProps } from '@fluentui/react-datepicker-compat';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import type { TimePickerProps } from '@fluentui/react-timepicker-preview';
import { TimePicker } from '@fluentui/react-timepicker-preview';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    columnGap: '20px',
    gridTemplateColumns: 'repeat(2, 1fr)',
    maxWidth: '600px',
    marginBottom: '10px',
  },
});

export const TimePickerWithDatePicker = (): JSXElement => {
  const styles = useStyles();

  const [selectedDate, setSelectedDate] = React.useState<Date | null | undefined>(null);

  const [selectedTime, setSelectedTime] = React.useState<Date | null>(null);

  const onSelectDate: DatePickerProps['onSelectDate'] = date => {
    setSelectedDate(date);
    if (date && selectedTime) {
      setSelectedTime(
        new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          selectedTime.getHours(),
          selectedTime.getMinutes(),
        ),
      );
    }
  };

  const onTimeChange: TimePickerProps['onChange'] = (_ev, data) => {
    setSelectedTime(data.value);
  };

  return (
    <div>
      <div className={styles.root}>
        <Field label="Select a date">
          <DatePicker placeholder="Select a date..." value={selectedDate} onSelectDate={onSelectDate} />
        </Field>
        <Field label="Select a time">
          <TimePicker
            placeholder="Select a time..."
            freeform
            dateAnchor={selectedDate ?? undefined}
            value={selectedTime}
            onChange={onTimeChange}
          />
        </Field>
      </div>

      {selectedDate && (
        <div>Selected date time: {selectedTime ? selectedTime.toString() : selectedDate.toString()}</div>
      )}
    </div>
  );
};
