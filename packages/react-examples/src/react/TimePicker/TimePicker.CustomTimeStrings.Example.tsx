import * as React from 'react';
import { TimePicker } from '@fluentui/react/lib/TimePicker';
import { Text } from '@fluentui/react/lib/Text';
import { timePickerStyles, TimePickerExampleWrapper } from './TimePicker.Example.Wrapper';

export const TimePickerCustomTimeStringsExample: React.FC = () => {
  const [customTimeString, setCustomTimeString] = React.useState<string>('');
  const dateAnchor = new Date('February 27, 2023 08:00:00');
  const onFormatDate = React.useCallback((date: Date) => `Custom prefix + ${date.toLocaleTimeString()}`, []);
  const onValidateUserInput = React.useCallback((userInput: string) => {
    if (!userInput.includes('Custom prefix +')) {
      return 'Your input is missing "Custom prefix +"';
    }
    return '';
  }, []);

  const onChange = React.useCallback((_, time: Date) => {
    console.log('Selected time: ', time);
    setCustomTimeString(time.toString());
  }, []);

  return (
    <TimePickerExampleWrapper>
      <TimePicker
        styles={timePickerStyles}
        // eslint-disable-next-line react/jsx-no-bind
        onFormatDate={onFormatDate}
        onValidateUserInput={onValidateUserInput}
        onChange={onChange}
        useHour12
        allowFreeform={false}
        dateAnchor={dateAnchor}
        autoComplete="on"
        label="TimePicker with custom time strings"
      />
      <Text>{`⚓ Date anchor: ${dateAnchor.toString()}`}</Text>
      <Text>{`⌚ Selected time: ${customTimeString ? customTimeString : '<no time selected>'}`}</Text>
    </TimePickerExampleWrapper>
  );
};
