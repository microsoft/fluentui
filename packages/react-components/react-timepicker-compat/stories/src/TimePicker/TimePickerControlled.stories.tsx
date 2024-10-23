import * as React from 'react';
import { Field, makeStyles } from '@fluentui/react-components';
import { TimePicker, TimePickerProps, formatDateToTimeString } from '@fluentui/react-timepicker-compat';
import story from './TimePickerControlled.md';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '20px',
    maxWidth: '300px',
  },
});

const DefaultSelection = () => {
  const [defaultSelectedTime] = React.useState(new Date('November 25, 2023 12:30:00'));
  return (
    <Field label="Select a time (default Selection)">
      <TimePicker
        startHour={8}
        endHour={20}
        defaultSelectedTime={defaultSelectedTime}
        defaultValue={formatDateToTimeString(defaultSelectedTime)}
      />
    </Field>
  );
};

const ControlledSelection = () => {
  const [selectedTime, setSelectedTime] = React.useState<Date | null>(new Date('November 25, 2023 12:30:00'));
  const [value, setValue] = React.useState<string>(selectedTime ? formatDateToTimeString(selectedTime) : '');

  const onTimeChange: TimePickerProps['onTimeChange'] = (_ev, data) => {
    setSelectedTime(data.selectedTime);
    setValue(data.selectedTimeText ?? '');
  };
  const onInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
  };

  return (
    <Field label="Select a time (controlled Selection)">
      <TimePicker
        startHour={8}
        endHour={20}
        selectedTime={selectedTime}
        onTimeChange={onTimeChange}
        value={value}
        onInput={onInput}
      />
    </Field>
  );
};

export const Controlled = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <DefaultSelection />
      <ControlledSelection />
    </div>
  );
};

Controlled.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
