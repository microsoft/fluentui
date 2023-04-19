import * as React from 'react';
import {
  TimePicker,
  ITimeRange,
  Text,
  IStackTokens,
  Stack,
  IStackStyles,
  IComboBoxStyles,
  IComboBox,
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

export const TimePickerBasicExample: React.FC = () => {
  const [basicExampleTimeString, setBasicExampleTimeString] = React.useState<string>('');
  const [nonDefaultOptionsExampleTimeString, setNonDefaultOptionsExampleTimeString] = React.useState<string>('');
  const basicDateAnchor = new Date('November 25, 2021 09:00:00');
  const nonDefaultOptionsDateAnchor = new Date('February 27, 2023 08:00:00');

  const onBasicExampleChange = React.useCallback((_ev: React.FormEvent<IComboBox>, basicExampleTime: Date) => {
    setBasicExampleTimeString(basicExampleTime.toString());
  }, []);

  const onNonDefaultOptionsExampleChange = React.useCallback((_, nonDefaultOptionsExampleTime: Date) => {
    setNonDefaultOptionsExampleTimeString(nonDefaultOptionsExampleTime?.toString());
  }, []);

  const timeRange: ITimeRange = {
    start: 8,
    end: 14,
  };

  return (
    <Stack tokens={stackTokens} styles={stackStyles}>
      <TimePicker
        placeholder="Basic example placeholder"
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
    </Stack>
  );
};
