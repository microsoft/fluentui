import * as React from 'react';
import { TimePicker } from '@fluentui/react-headless-components-preview/time-picker';
import type { TimePickerProps } from '@fluentui/react-headless-components-preview/time-picker';
import { ClockRegular } from '@fluentui/react-icons';
import styles from './timepicker.module.css';

export const Controlled = (): React.ReactNode => {
  const [anchor] = React.useState(() => new Date(2023, 1, 1));
  const [selectedTime, setSelectedTime] = React.useState<Date | null>(null);

  const onSelectedTimeChange: TimePickerProps['onSelectedTimeChange'] = (_ev, data) => {
    setSelectedTime(data.selectedTime);
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
        selectedTime={selectedTime}
        onSelectedTimeChange={onSelectedTimeChange}
        expandIcon={{ className: styles.expandIcon, children: <ClockRegular /> }}
      />
      <span className={styles.hint}>
        Selected time: {selectedTime ? selectedTime.toLocaleTimeString([], { hourCycle: 'h23' }) : 'none'}
      </span>
    </div>
  );
};

Controlled.parameters = {
  docs: {
    description: {
      story: 'Use `selectedTime` and `onSelectedTimeChange` to control the selected time.',
    },
  },
};
