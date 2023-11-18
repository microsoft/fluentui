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

export const TimePickerCustomTimeStringsExample: React.FC = () => {
  const [customTimeString, setCustomTimeString] = React.useState<string>('');
  const dateAnchor = new Date('February 27, 2023 08:00:00');
  const onFormatDate = React.useCallback((date: Date) => `Custom prefix + ${date.toLocaleTimeString()}`, []);
  const onValidateUserInput = React.useCallback((userInput: string) => {
    if (!userInput.includes('Custom prefix +')) {
      return 'Your input is missing "Custom prefix +"';
    }
    return '';
  }, []);

  const onChange = React.useCallback((_, time: Date) => {
    console.log('Selected time: ', time);
    setCustomTimeString(time.toString());
  }, []);

  return (
    <Stack tokens={stackTokens} styles={stackStyles}>
      <TimePicker
        placeholder="Custom time strings example placeholder"
        styles={timePickerStyles}
        onFormatDate={onFormatDate}
        onValidateUserInput={onValidateUserInput}
        onChange={onChange}
        useHour12
        allowFreeform={false}
        dateAnchor={dateAnchor}
        autoComplete="on"
        label="TimePicker with custom time strings"
      />
      <Text>{`⚓ Date anchor: ${dateAnchor.toString()}`}</Text>
      <Text>{`⌚ Selected time: ${customTimeString ? customTimeString : '<no time selected>'}`}</Text>
    </Stack>
  );
};
