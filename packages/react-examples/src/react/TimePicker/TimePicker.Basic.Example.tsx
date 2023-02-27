import * as React from 'react';
import { TimePicker, ITimeRange } from '@fluentui/react/lib/TimePicker';
import { Text } from '@fluentui/react/lib/Text';
import { IStackTokens, Stack, IStackStyles } from '@fluentui/react/lib/Stack';
import { IComboBoxStyles } from '@fluentui/react/lib/ComboBox';

const stackStyles: Partial<IStackStyles> = { root: { maxWidth: 300 } };
const stackTokens: IStackTokens = { childrenGap: 20 };

const timePickerStyles: Partial<IComboBoxStyles> = {
  optionsContainerWrapper: {
    height: '500px',
  },
  root: {
    width: '50%',
  },
};

export const TimePickerBasicExample: React.FC = () => {
  const [basicExampleTimeString, setBasicExampleTimeString] = React.useState<string>('');
  const [nonDefaultOptionsExampleTimeString, setNonDefaultOptionsExampleTimeString] = React.useState<string>('');

  const onBasicExampleChange = React.useCallback((time: Date) => {
    console.log('CLICKEDDD');
    setBasicExampleTimeString(time.toString());
  }, []);

  const onNonDefaultOptionsExampleChange = React.useCallback((time: Date) => {
    setNonDefaultOptionsExampleTimeString(time.toString());
  }, []);

  const timeRange: ITimeRange = {
    start: 8,
    end: 14,
  };

  return (
    <>
      <Stack tokens={stackTokens} styles={stackStyles}>
        <TimePicker
          styles={timePickerStyles}
          useHour12
          allowFreeform
          autoComplete="on"
          label={'TimePicker basic example'}
          onChange={onBasicExampleChange}
          dateAnchor={new Date('November 25, 2021 09:15:00')}
          useComboBoxAsMenuWidth
        />
        <Text>{`Basic example selected time: ${
          basicExampleTimeString ? basicExampleTimeString : '<no time selected>'
        }`}</Text>

        <TimePicker
          styles={timePickerStyles}
          showSeconds
          allowFreeform
          increments={15}
          autoComplete="on"
          label={'TimePicker with non default options'}
          useComboBoxAsMenuWidth
          timeRange={timeRange}
          onChange={onNonDefaultOptionsExampleChange}
        />
        <Text>{`Non default options example selected time: ${
          nonDefaultOptionsExampleTimeString ? nonDefaultOptionsExampleTimeString : '<no time selected>'
        }`}</Text>
      </Stack>
    </>
  );
};
