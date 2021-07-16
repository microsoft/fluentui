import * as React from 'react';
import { ITimeRange, TimePicker } from '@fluentui/react/lib/TimePicker';
import { IStackTokens, Stack, IStackStyles, IComboBoxStyles } from '@fluentui/react';

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
  const timeRange: ITimeRange = {
    start: 8,
    end: 14,
  };
  const onFormatDate = (date: Date) => `Custom prefix + ${date.toLocaleTimeString()}`;

  return (
    <Stack tokens={stackTokens} styles={stackStyles}>
      <TimePicker
        styles={timePickerStyles}
        useHour12
        allowFreeform
        autoComplete="on"
        label={'TimePicker basic example'}
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
