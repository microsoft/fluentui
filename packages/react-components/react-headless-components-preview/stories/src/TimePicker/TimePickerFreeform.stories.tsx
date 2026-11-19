import * as React from 'react';
import { TimePicker } from '@fluentui/react-headless-components-preview/time-picker';
import type { TimePickerProps, TimePickerOnChangeData } from '@fluentui/react-headless-components-preview/time-picker';
import { ClockRegular } from '@fluentui/react-icons';
import styles from './timepicker.module.css';

const errorMessages: Record<NonNullable<TimePickerOnChangeData['errorType']>, string> = {
  'invalid-input': 'Enter a time in the HH:MM format, for example 14:30 or 1430.',
  'out-of-bounds': 'Pick a time between 10:00 and 20:00.',
  'required-input': 'A time is required.',
};

export const Freeform = (): React.ReactNode => {
  const [error, setError] = React.useState<string | undefined>();

  const onChange: TimePickerProps['onChange'] = (_ev, data) => {
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
        hourCycle="h23"
        startHour={10}
        endHour={20}
        placeholder="Type or pick a time"
        onChange={onChange}
        expandIcon={{ className: styles.expandIcon, children: <ClockRegular /> }}
      />
      <span id="timepicker-freeform-message" className={error ? styles.error : styles.hint} role="status">
        {error ?? 'Press Enter or move focus away to confirm a typed time. Escape restores the last time.'}
      </span>
    </div>
  );
};

Freeform.parameters = {
  docs: {
    description: {
      story:
        'TimePicker accepts typed times by default (`freeform`). A typed time is committed when it changes and the ' +
        'user presses Enter or focus leaves the TimePicker; compact input such as `1430` works in every hour cycle. ' +
        'A time that cannot be parsed or is out of range is not committed: the value is kept, the text stays for ' +
        'correction, and `onChange` reports an `errorType`. Pass `freeform={false}` to accept only the listed times.',
    },
  },
};
