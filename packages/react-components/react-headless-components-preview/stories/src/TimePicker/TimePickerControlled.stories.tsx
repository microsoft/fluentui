import * as React from 'react';
import { TimePicker } from '@fluentui/react-headless-components-preview/time-picker';
import type { TimePickerProps } from '@fluentui/react-headless-components-preview/time-picker';
import { ClockRegular } from '@fluentui/react-icons';
import styles from './timepicker.module.css';

export const Controlled = (): React.ReactNode => {
  const [anchor] = React.useState(() => new Date(2023, 1, 1));
  const [value, setValue] = React.useState<Date | null>(null);

  const onChange: TimePickerProps['onChange'] = (_ev, data) => {
    setValue(data.value);
  };

  return (
    <div className={styles.demo}>
      <label className={styles.label} htmlFor="timepicker-controlled">
        Reminder
      </label>
      <TimePicker
        id="timepicker-controlled"
        root={{ className: styles.root }}
        input={{ className: styles.input }}
        listbox={{ className: styles.listbox }}
        dateAnchor={anchor}
        hourCycle="h23"
        value={value}
        onChange={onChange}
        expandIcon={{ className: styles.expandIcon, children: <ClockRegular /> }}
      />
      <span className={styles.hint}>
        Selected time: {value ? value.toLocaleTimeString([], { hourCycle: 'h23' }) : 'none'}
      </span>
    </div>
  );
};

Controlled.parameters = {
  docs: {
    description: {
      story: 'Use `value` and `onChange` to control the selected time. The input text is derived from `value`.',
    },
  },
};
