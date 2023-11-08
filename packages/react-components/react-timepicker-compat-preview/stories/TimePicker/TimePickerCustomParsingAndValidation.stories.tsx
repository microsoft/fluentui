import * as React from 'react';
import { Field, FieldProps, makeStyles } from '@fluentui/react-components';
import { TimePicker, TimePickerErrorType, TimePickerProps } from '@fluentui/react-timepicker-compat-preview';
import story from './TimePickerCustomParsingAndValidation.md';

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

export const CustomParsingAndValidation = () => {
  const styles = useStyles();

  const [anchor] = React.useState(new Date('November 25, 2023'));

  const [errorType, setErrorType] = React.useState<TimePickerErrorType>();

  const handleTimeSelect: TimePickerProps['onTimeChange'] = (_ev, data) => {
    setErrorType(data.errorType);

    if (
      !data.errorType &&
      data.selectedTime &&
      (data.selectedTime.getHours() < 10 || data.selectedTime.getHours() >= 20)
    ) {
      setErrorType('out-of-bounds');
    }
  };

  const parseTimeStringToDate: TimePickerProps['parseTimeStringToDate'] = (time: string | undefined) => {
    if (!time) {
      return { error: 'required-input', date: null };
    }
    const timeRegex = /^([01]?\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(time)) {
      return { error: 'invalid-input', date: null };
    }

    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date(anchor.getFullYear(), anchor.getMonth(), anchor.getDate(), hours, minutes);

    return { date };
  };

  return (
    <Field
      required
      label={
        `Type/Select a time outside of 10:00 to 19:59,` +
        ` type an invalid time, or leave the input empty and close the TimePicker.`
      }
      validationMessage={getErrorMessage(errorType)}
    >
      <TimePicker
        className={styles.control}
        freeform
        dateAnchor={anchor}
        onTimeChange={handleTimeSelect}
        parseTimeStringToDate={parseTimeStringToDate}
      />
    </Field>
  );
};

CustomParsingAndValidation.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
