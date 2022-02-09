import * as React from 'react';
import { ITimeRange, TimePicker } from '@fluentui/react/lib/TimePicker';
import { IStackTokens, Stack, IStackStyles, IComboBoxStyles, IComboBox } from '@fluentui/react';

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

const onFormatDate = (date: Date) => `Custom prefix + ${date.toLocaleTimeString()}`;
const onChange = (_: React.FormEvent<IComboBox>, date: Date) => console.log('SELECTED DATE: ', date);

export const TimePickerBasicExample: React.FC = () => {
  const timeRange: ITimeRange = {
    start: 8,
    end: 14,
  };

  return (
    <Stack tokens={stackTokens} styles={stackStyles}>
      <TimePicker
        styles={timePickerStyles}
        useHour12
        allowFreeform
        autoComplete="on"
        label={'TimePicker basic example'}
        onChange={onChange}
        defaultValue={new Date('November 25, 2021 09:15:00')}
        useComboBoxAsMenuWidth
      />
      <TimePicker
        styles={timePickerStyles}
        showSeconds
        allowFreeform
        increments={15}
        autoComplete="on"
        label={'TimePicker with non default options'}
        useComboBoxAsMenuWidth
        timeRange={timeRange}
        onChange={onChange}
      />
      <TimePicker
        styles={timePickerStyles}
        // eslint-disable-next-line react/jsx-no-bind
        onFormatDate={onFormatDate}
        useHour12
        allowFreeform
        autoComplete="on"
        label={'TimePicker with custom time string'}
      />
    </Stack>
  );
};
