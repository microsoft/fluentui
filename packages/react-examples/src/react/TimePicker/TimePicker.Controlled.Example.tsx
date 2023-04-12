import * as React from 'react';
import { TimePicker } from '@fluentui/react/lib/TimePicker';
import { Text } from '@fluentui/react/lib/Text';
import { TimePickerExampleWrapper } from '@fluentui/react-examples/lib/react/TimePicker/TimePicker.Example.Wrapper';
import { timePickerStyles } from '@fluentui/react-examples/lib/react/TimePicker/TimePickerStyles';

export const TimePickerControlledExample: React.FC = () => {
  const dateAnchor = new Date('February 27, 2023 08:00:00');
  const [time, setTime] = React.useState<Date>(new Date('February 27, 2023 10:00:00'));

  const [controlledTimeString, setControlledTimeString] = React.useState<string>('');

  const onControlledExampleChange = React.useCallback((_, newTime: Date) => {
    setTime(newTime);
  }, []);

  React.useEffect(() => {
    setControlledTimeString(time.toString());
  }, [time]);

  return (
    <TimePickerExampleWrapper>
      <TimePicker
        styles={timePickerStyles}
        showSeconds
        allowFreeform
        increments={15}
        autoComplete="on"
        label="Controlled TimePicker with non default options"
        dateAnchor={dateAnchor}
        value={time}
        onChange={onControlledExampleChange}
      />
      <Text>{`⚓ Date anchor: ${dateAnchor.toString()}`}</Text>
      <Text>{`⌚ Selected time: ${controlledTimeString ? controlledTimeString : '<no time selected>'}`}</Text>
    </TimePickerExampleWrapper>
  );
};
