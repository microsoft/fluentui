import * as React from 'react';
import { Field, makeStyles } from '@fluentui/react-components';
import { DatePicker, DatePickerProps } from '@fluentui/react-datepicker-compat';
import { TimePicker, TimePickerProps, formatDateToTimeString } from '@fluentui/react-timepicker-compat';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    columnGap: '20px',
    gridTemplateColumns: 'repeat(2, 1fr)',
    maxWidth: '600px',
    marginBottom: '10px',
  },
});

export const TimePickerWithDatePicker = () => {
  const styles = useStyles();

  const [selectedDate, setSelectedDate] = React.useState<Date | null | undefined>(null);

  const [selectedTime, setSelectedTime] = React.useState<Date | null>(null);
  const [timePickerValue, setTimePickerValue] = React.useState<string>(
    selectedTime ? formatDateToTimeString(selectedTime) : '',
  );

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

  const onTimeChange: TimePickerProps['onTimeChange'] = (_ev, data) => {
    setSelectedTime(data.selectedTime);
    setTimePickerValue(data.selectedTimeText ?? '');
  };
  const onTimePickerInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setTimePickerValue(ev.target.value);
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
            selectedTime={selectedTime}
            onTimeChange={onTimeChange}
            value={timePickerValue}
            onInput={onTimePickerInput}
          />
        </Field>
      </div>

      {selectedDate && (
        <div>Selected date time: {selectedTime ? selectedTime.toString() : selectedDate.toString()}</div>
      )}
    </div>
  );
};
