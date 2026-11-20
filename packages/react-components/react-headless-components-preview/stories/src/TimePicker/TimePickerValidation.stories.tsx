import * as React from 'react';
import { Field } from '@fluentui/react-headless-components-preview/field';
import { TimePicker } from '@fluentui/react-headless-components-preview/time-picker';
import type { TimePickerErrorType, TimePickerProps } from '@fluentui/react-headless-components-preview/time-picker';
import { ClockRegular, ErrorCircleRegular } from '@fluentui/react-icons';
import styles from './timepicker.module.css';
import fieldStyles from '../Field/field.module.css';

const errorMessages: Record<TimePickerErrorType, string> = {
  'invalid-input': 'Enter a time like 9:30 AM.',
  'out-of-bounds': 'Pick a time between 9:00 AM and 5:00 PM.',
  'required-input': 'A start time is required.',
};

export const Validation = (): React.ReactNode => {
  const [value, setValue] = React.useState<Date | null>(null);
  const [errorType, setErrorType] = React.useState<TimePickerErrorType | undefined>();

  const onChange: TimePickerProps['onChange'] = (_ev, data) => {
    // A failed commit reports the unchanged value, so the value can be stored on every call.
    setValue(data.value);
    setErrorType(data.errorType);
  };

  return (
    <div className={styles.demo}>
      <Field
        label={{ children: 'Start time', className: fieldStyles.label }}
        required
        validationState={errorType ? 'error' : 'none'}
        validationMessage={
          errorType
            ? { children: errorMessages[errorType], className: `${fieldStyles.message} ${fieldStyles.messageError}` }
            : undefined
        }
        validationMessageIcon={{ children: <ErrorCircleRegular aria-hidden /> }}
        className={fieldStyles.field}
      >
        <TimePicker
          root={{ className: styles.root }}
          input={{ className: styles.input }}
          listbox={{ className: styles.listbox }}
          startHour={9}
          endHour={17}
          placeholder="Type or pick a time"
          value={value}
          onChange={onChange}
          expandIcon={{ className: styles.expandIcon, children: <ClockRegular /> }}
        />
      </Field>
      <span className={styles.hint}>Value: {value ? value.toLocaleTimeString() : 'none'}</span>
    </div>
  );
};

Validation.parameters = {
  docs: {
    description: {
      story:
        'Wrap the TimePicker in a `Field` and set its `validationState` from the `errorType` that `onChange` reports. ' +
        'Field sets `aria-invalid` on the input and links the message with `aria-describedby`. A failed commit ' +
        'keeps the value, so `setValue(data.value)` is safe on every call; Escape restores the last time and clears ' +
        'the error.',
    },
  },
};
