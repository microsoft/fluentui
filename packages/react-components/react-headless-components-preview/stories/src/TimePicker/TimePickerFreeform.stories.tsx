import * as React from 'react';
import { TimePicker } from '@fluentui/react-headless-components-preview/time-picker';
import type {
  TimePickerProps,
  TimePickerSelectedTimeChangeData,
} from '@fluentui/react-headless-components-preview/time-picker';
import { ClockRegular } from '@fluentui/react-icons';
import styles from './timepicker.module.css';

const errorMessages: Record<NonNullable<TimePickerSelectedTimeChangeData['errorType']>, string> = {
  'invalid-input': 'Enter a time in the HH:MM format.',
  'out-of-bounds': 'Pick a time between 10:00 and 20:00.',
  'required-input': 'A time is required.',
};

export const Freeform = (): React.ReactNode => {
  const [error, setError] = React.useState<string | undefined>();

  const onSelectedTimeChange: TimePickerProps['onSelectedTimeChange'] = (_ev, data) => {
    setError(data.errorType ? errorMessages[data.errorType] : undefined);
  };

  return (
    <div className={styles.demo}>
      <label className={styles.label} htmlFor="timepicker-freeform">
        Arrival time
      </label>
      <TimePicker
        id="timepicker-freeform"
        root={{ className: styles.root }}
        input={{ className: styles.input }}
        listbox={{ className: styles.listbox }}
        aria-invalid={!!error}
        aria-describedby="timepicker-freeform-message"
        freeform
        hourCycle="h23"
        startHour={10}
        endHour={20}
        placeholder="Type or pick a time"
        onSelectedTimeChange={onSelectedTimeChange}
        expandIcon={{ className: styles.expandIcon, children: <ClockRegular /> }}
      />
      <span id="timepicker-freeform-message" className={error ? styles.error : styles.hint}>
        {error ?? 'Press Enter or move focus away to confirm a typed time.'}
      </span>
    </div>
  );
};

Freeform.parameters = {
  docs: {
    description: {
      story:
        'With `freeform`, any typed time is committed when it changes and the user presses Enter or focus leaves the ' +
        'TimePicker. `onSelectedTimeChange` reports an `errorType` when the text cannot be parsed or is out of range.',
    },
  },
};
