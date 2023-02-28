import * as React from 'react';
import { TimePicker, ITimeRange } from '@fluentui/react/lib/TimePicker';
import { Text } from '@fluentui/react/lib/Text';
import { IStackTokens, Stack, IStackStyles } from '@fluentui/react/lib/Stack';
import { IComboBoxStyles } from '@fluentui/react/lib/ComboBox';

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

  const [controlledTimeString, setControlledTimeString] = React.useState<string>('');

  const onControlledExampleChange = React.useCallback((newTime: Date) => {
    setTime(newTime);
  }, []);

  React.useEffect(() => {
    setControlledTimeString(time.toString());
  }, [time]);

  return (
    <>
      <Stack tokens={stackTokens} styles={stackStyles}>
        <TimePicker
          styles={timePickerStyles}
          showSeconds
          allowFreeform
          increments={15}
          autoComplete="on"
          label={'Controlled TimePicker with non default options'}
          useComboBoxAsMenuWidth
          dateAnchor={dateAnchor}
          value={time}
          onChange={onControlledExampleChange}
        />
        <Text>{`Controlled example selected time: ${
          controlledTimeString ? controlledTimeString : '<no time selected>'
        }`}</Text>
      </Stack>
    </>
  );
};
