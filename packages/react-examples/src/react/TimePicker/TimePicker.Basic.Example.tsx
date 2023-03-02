import * as React from 'react';
import { TimePicker, ITimeRange } from '@fluentui/react/lib/TimePicker';
import { Text } from '@fluentui/react/lib/Text';
import { timePickerStyles, TimePickerExampleWrapper } from './TimePicker.Example.Wrapper';

export const TimePickerBasicExample: React.FC = () => {
  const [basicExampleTimeString, setBasicExampleTimeString] = React.useState<string>('');
  const [nonDefaultOptionsExampleTimeString, setNonDefaultOptionsExampleTimeString] = React.useState<string>('');
  const basicDateAnchor = new Date('November 25, 2021 09:00:00');
  const nonDefaultOptionsDateAnchor = new Date('February 27, 2023 08:00:00');

  const onBasicExampleChange = React.useCallback((_, basicExampleTime: Date) => {
    setBasicExampleTimeString(basicExampleTime?.toString());
  }, []);

  const onNonDefaultOptionsExampleChange = React.useCallback((_, nonDefaultOptionsExampleTime: Date) => {
    setNonDefaultOptionsExampleTimeString(nonDefaultOptionsExampleTime?.toString());
  }, []);

  const timeRange: ITimeRange = {
    start: 8,
    end: 14,
  };

  return (
    <TimePickerExampleWrapper>
      <TimePicker
        styles={timePickerStyles}
        useHour12
        allowFreeform
        autoComplete="on"
        label="TimePicker basic example"
        onChange={onBasicExampleChange}
        dateAnchor={basicDateAnchor}
      />
      <Text>{`⚓ Date anchor: ${basicDateAnchor.toString()}`}</Text>
      <Text>{`⌚ Selected time: ${basicExampleTimeString ? basicExampleTimeString : '<no time selected>'}`}</Text>

      <TimePicker
        styles={timePickerStyles}
        showSeconds
        allowFreeform
        increments={15}
        autoComplete="on"
        label="TimePicker with non default options"
        placeholder="Non default options placeholder"
        timeRange={timeRange}
        dateAnchor={nonDefaultOptionsDateAnchor}
        onChange={onNonDefaultOptionsExampleChange}
      />
      <Text>{`⚓ Date anchor: ${nonDefaultOptionsDateAnchor.toString()}`}</Text>
      <Text>{`⌚ Selected time: ${
        nonDefaultOptionsExampleTimeString ? nonDefaultOptionsExampleTimeString : '<no time selected>'
      }`}</Text>
    </TimePickerExampleWrapper>
  );
};
