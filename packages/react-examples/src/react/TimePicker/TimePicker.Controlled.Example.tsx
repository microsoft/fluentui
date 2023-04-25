import * as React from 'react';
import { TimePicker, Text, IStackTokens, Stack, IStackStyles, IComboBoxStyles } from '@fluentui/react';

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

export const TimePickerControlledExample: React.FC = () => {
  const dateAnchor = new Date('February 27, 2023 08:00:00');
  const [time, setTime] = React.useState<Date>(new Date('February 27, 2023 10:00:00'));

  const onControlledExampleChange = React.useCallback((_, newTime: Date) => {
    setTime(newTime);
  }, []);

  return (
    <Stack tokens={stackTokens} styles={stackStyles}>
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
      <Text>{`⌚ Selected time: ${time ? time.toString() : '<no time selected>'}`}</Text>
    </Stack>
  );
};
