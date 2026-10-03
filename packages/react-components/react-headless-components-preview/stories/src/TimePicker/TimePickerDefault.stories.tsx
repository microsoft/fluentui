import * as React from 'react';
import { TimePicker } from '@fluentui/react-headless-components-preview/time-picker';
import { ClockRegular, DismissRegular } from '@fluentui/react-icons';
import styles from './timepicker.module.css';

export const Default = (): React.ReactNode => {
  return (
    <div className={styles.demo}>
      <label className={styles.label} htmlFor="timepicker-default">
        Meeting time
      </label>
      <TimePicker
        id="timepicker-default"
        root={{ className: styles.root }}
        input={{ className: styles.input }}
        listbox={{ className: styles.listbox }}
        placeholder="Select a time"
        clearable
        startHour={8}
        endHour={18}
        increment={15}
        expandIcon={{ className: styles.expandIcon, children: <ClockRegular /> }}
        clearIcon={{ className: styles.clearIcon, children: <DismissRegular /> }}
      />
    </div>
  );
};
