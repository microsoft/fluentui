import * as React from 'react';
import { TimePicker } from '@fluentui/react-timepicker-compat-preview';
import { IComboBox } from '@fluentui/react';

const timePickerStyles = {
  optionsContainerWrapper: {
    height: '500px',
  },
  root: {
    width: '500px',
  },
};

export const Default = () => {
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

  const timeRange = {
    start: 8,
    end: 14,
  };

  return (
    <>
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
      <span>{`⚓ Date anchor: ${basicDateAnchor.toString()}`}</span>
      <span>{`⌚ Selected time: ${basicExampleTimeString ? basicExampleTimeString : '<no time selected>'}`}</span>

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
      <span>{`⚓ Date anchor: ${nonDefaultOptionsDateAnchor.toString()}`}</span>
      <span>{`⌚ Selected time: ${
        nonDefaultOptionsExampleTimeString ? nonDefaultOptionsExampleTimeString : '<no time selected>'
      }`}</span>
    </>
  );
};
