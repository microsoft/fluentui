import * as React from 'react';
import {
  renderTimePicker,
  useTimePicker,
  useTimePickerContextValues,
} from '@fluentui/react-headless-components-preview/time-picker';
import type { TimePickerProps } from '@fluentui/react-headless-components-preview/time-picker';
import { ClockRegular } from '@fluentui/react-icons';
import styles from './timepicker.module.css';

/**
 * A TimePicker composed from its hooks, with a polite status message for the number of suggested times.
 */
const TimePickerWithResultCount = React.forwardRef<HTMLInputElement, TimePickerProps>((props, ref) => {
  const state = useTimePicker(props, ref);
  const contextValues = useTimePickerContextValues(state);
  const { open, optionCount } = state;

  // Wait until typing pauses, so the count is not announced on every keystroke.
  const [message, setMessage] = React.useState('');
  React.useEffect(() => {
    if (!open) {
      setMessage('');
      return;
    }
    const timeout = setTimeout(() => {
      setMessage(optionCount === 0 ? 'No suggested times' : `${optionCount} suggested times`);
    }, 500);
    return () => clearTimeout(timeout);
  }, [open, optionCount]);

  return (
    <>
      {renderTimePicker(state, contextValues)}
      <span role="status" className={styles.liveRegion}>
        {message}
      </span>
    </>
  );
});

export const ResultCount = (): React.ReactNode => (
  <div className={styles.demo}>
    <label className={styles.label} htmlFor="timepicker-result-count">
      Pickup time
    </label>
    <TimePickerWithResultCount
      id="timepicker-result-count"
      root={{ className: styles.root }}
      input={{ className: styles.input }}
      listbox={{ className: styles.listbox }}
      startHour={8}
      endHour={20}
      increment={15}
      placeholder="Type or pick a time"
      expandIcon={{ className: styles.expandIcon, children: <ClockRegular /> }}
    />
  </div>
);

ResultCount.parameters = {
  docs: {
    description: {
      story:
        'Typing filters the suggested times. The state exposes `optionCount`, so a TimePicker composed from ' +
        '`useTimePicker`, `useTimePickerContextValues` and `renderTimePicker` can announce the number of matches ' +
        'through a polite `role="status"` region once typing pauses.',
    },
  },
};
