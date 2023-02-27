import * as React from 'react';
import { TimePicker } from '@fluentui/react/lib/TimePicker';
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

const onFormatDate = (date: Date) => `Custom prefix + ${date.toLocaleTimeString()}`;

export const TimePickerCustomTimeStringsExample: React.FC = () => {
  return (
    <>
      <Stack tokens={stackTokens} styles={stackStyles}>
        <TimePicker
          styles={timePickerStyles}
          // eslint-disable-next-line react/jsx-no-bind
          onFormatDate={onFormatDate}
          useHour12
          allowFreeform
          autoComplete="on"
          label={'TimePicker with custom time strings'}
        />
      </Stack>
    </>
  );
};
