import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, makeStyles } from '@fluentui/react-components';
import type { TimePickerProps } from '@fluentui/react-timepicker-preview';
import { TimePicker } from '@fluentui/react-timepicker-preview';
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
  const [defaultValue] = React.useState(() => new Date('November 25, 2023 12:30:00'));
  return (
    <Field label="Select a time (default selection)">
      <TimePicker startHour={8} endHour={20} defaultValue={defaultValue} />
    </Field>
  );
};

const ControlledSelection = () => {
  const [value, setValue] = React.useState<Date | null>(() => new Date('November 25, 2023 12:30:00'));

  const onChange: TimePickerProps['onChange'] = (_ev, data) => {
    setValue(data.value);
  };

  return (
    <Field label="Select a time (controlled selection)">
      <TimePicker startHour={8} endHour={20} value={value} onChange={onChange} />
    </Field>
  );
};

export const Controlled = (): JSXElement => {
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
