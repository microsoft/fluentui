import * as React from 'react';
import { TimeRange, TimePicker } from '@fluentui/react/lib/TimePicker';

export const TimePickerBasicExample: React.FC = () => {
  const timeRange: TimeRange = {
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
      showDurationIndicator
      useComboBoxAsMenuWidth
      timeRange={timeRange}
    />
  );
};
