import * as React from 'react';
import { TimePicker } from '@fluentui/react/lib/TimePicker';
import { IStackTokens, Stack, IStackStyles } from '@fluentui/react/lib/Stack';
import { IComboBoxStyles } from '@fluentui/react/lib/ComboBox';
import { Text } from '@fluentui/react/lib/Text';

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
  const onFormatDate = React.useCallback((date: Date) => `Custom prefix + ${date.toLocaleTimeString()}`, []);
  const onValidateUserInput = React.useCallback((userInput: string) => {
    if (!userInput.includes('Custom prefix +')) {
      return 'Your input is missing "Custom prefix +"';
    }
    return '';
  }, []);

  const onChange = React.useCallback((time: Date) => {
    console.log('Selected time: ', time);
    setCustomTimeString(time.toString());
  }, []);

  return (
    <>
      <Stack tokens={stackTokens} styles={stackStyles}>
        <TimePicker
          styles={timePickerStyles}
          // eslint-disable-next-line react/jsx-no-bind
          onFormatDate={onFormatDate}
          onValidateUserInput={onValidateUserInput}
          onChange={onChange}
          useHour12
          allowFreeform
          autoComplete="on"
          label={'TimePicker with custom time strings'}
        />
        <Text>{`Custom time strings example selected time: ${
          customTimeString ? customTimeString : '<no time selected>'
        }`}</Text>
      </Stack>
    </>
  );
};
