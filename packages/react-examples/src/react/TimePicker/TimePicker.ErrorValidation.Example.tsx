import * as React from 'react';
import {
  TimePicker,
  TimePickerErrorData,
  ITimeRange,
  Text,
  IStackTokens,
  Stack,
  IStackStyles,
  IComboBoxStyles,
  PrimaryButton,
  Label,
} from '@fluentui/react';

const stackStyles: Partial<IStackStyles> = { root: { width: 500 } };
const stackTokens: IStackTokens = { childrenGap: 20 };

const timePickerStyles: Partial<IComboBoxStyles> = {
  optionsContainerWrapper: {
    height: '500px',
  },
  root: {
    width: '500px',
  },
};

const timeRange: ITimeRange = {
  start: 8,
  end: 17,
};

export const TimePickerErrorValidationExample: React.FC = () => {
  const dateAnchor = new Date('February 27, 2023 08:00:00');
  const [time, setTime] = React.useState<Date>(new Date('January 1, 2023 08:00:00'));
  const [disableButton, setDisableButton] = React.useState<boolean>(false);

  const onControlledExampleChange = React.useCallback((_, newTime: Date) => {
    setTime(newTime);
  }, []);

  const onValidationError = React.useCallback((_, timePickerErrorData: TimePickerErrorData) => {
    if (timePickerErrorData.errorMessage !== undefined) {
      console.log('Validation error message received: ', timePickerErrorData.errorMessage);
      setDisableButton(timePickerErrorData.errorMessage.length > 0);
    }
  }, []);

  return (
    <Stack tokens={stackTokens} styles={stackStyles}>
      <TimePicker
        styles={timePickerStyles}
        allowFreeform
        useHour12
        increments={15}
        autoComplete="on"
        label="Controlled TimePicker with onValidationError Handling"
        dateAnchor={dateAnchor}
        value={time}
        onChange={onControlledExampleChange}
        onValidationError={onValidationError}
        timeRange={timeRange}
      />
      <Text>{`⚓ Date anchor: ${dateAnchor.toString()}`}</Text>
      <Text>{`⌚ Selected time: ${time ? time.toString() : '<no time selected>'}`}</Text>

      <Label>
        To trigger the TimePicker validation error and disable the button, enter a time outside the range of 8AM and 5PM
        or an invalid-formatted date.
      </Label>
      <PrimaryButton text={'Sample submit button'} disabled={disableButton} />
    </Stack>
  );
};
