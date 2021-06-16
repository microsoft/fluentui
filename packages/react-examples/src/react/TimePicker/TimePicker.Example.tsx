import * as React from 'react';
import { ITimeRange, TimePicker } from '@fluentui/react/lib/TimePicker';

export const TimePickerBasicExample: React.FC = () => {
  const timeRange: ITimeRange = {
    start: 2,
    end: 20,
  };
  return (
    <TimePicker
      styles={{
        optionsContainerWrapper: {
          height: '500px',
        },
        root: {
          width: '50%',
        },
      }}
      useHour12
      showSeconds
      allowFreeform
      autoComplete="on"
      label={'TimePicker basic example'}
      useComboBoxAsMenuWidth
      timeRange={timeRange}
    />
  );
};
