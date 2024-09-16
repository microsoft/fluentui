import * as React from 'react';
import { Field, FieldProps, makeStyles } from '@fluentui/react-components';
import { TimePicker, TimePickerErrorType, TimePickerProps } from '@fluentui/react-timepicker-compat';
import story from './TimePickerFreeformWithErrorHandling.md';

const useStyles = makeStyles({
  control: {
    maxWidth: '300px',
  },
});

const getErrorMessage = (error?: TimePickerErrorType): FieldProps['validationMessage'] => {
  switch (error) {
    case 'invalid-input':
      return 'Invalid time format. Please use the 24-hour format HH:MM.';
    case 'out-of-bounds':
      return 'Time out of the 10:00 to 19:59 range.';
    case 'required-input':
      return 'Time is required.';
    default:
      return '';
  }
};

export const FreeformWithErrorHandling = () => {
  const styles = useStyles();

  const [errorType, setErrorType] = React.useState<TimePickerErrorType>();
  const handleTimeChange: TimePickerProps['onTimeChange'] = (_ev, data) => {
    setErrorType(data.errorType);
  };

  return (
    <Field
      required
      label={
        `Type a time outside of 10:00 to 19:59,` +
        ` type an invalid time, or leave the input empty and close the TimePicker.`
      }
      validationMessage={getErrorMessage(errorType)}
    >
      <TimePicker className={styles.control} freeform startHour={10} endHour={20} onTimeChange={handleTimeChange} />
    </Field>
  );
};

FreeformWithErrorHandling.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
