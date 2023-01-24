import * as React from 'react';
import { ITimeRange, TimePicker } from '@fluentui/react/lib/TimePicker';
import { IStackTokens, Stack, IStackStyles } from '@fluentui/react/lib/Stack';
import { IComboBoxStyles } from '@fluentui/react/lib/ComboBox';
import { DatePicker } from '@fluentui/react/lib/DatePicker';
import { Label } from '@fluentui/react/lib/Label';
import { Text } from '@fluentui/react/lib/Text';

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
const onTimeChange = (date: Date) => console.log('SELECTED DATE: ', date);

export const TimePickerBasicExample: React.FC = () => {
  const [datePickerDate, setDatePickerDate] = React.useState<Date>();
  const [currentTime, setCurrentTime] = React.useState<Date>();
  const [currentTimeString, setCurrentTimeString] = React.useState<string>('');

  const onSelectDate = React.useCallback((selectedDate: Date) => {
    setDatePickerDate(selectedDate);
  }, []);

  const timeRange: ITimeRange = {
    start: 8,
    end: 14,
  };

  return (
    <>
      <Stack tokens={stackTokens} styles={stackStyles}>
        <TimePicker
          styles={timePickerStyles}
          useHour12
          allowFreeform
          autoComplete="on"
          label={'TimePicker basic example'}
          onTimeChange={onTimeChange}
          currentDate={new Date('November 25, 2021 09:15:00')}
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
          onTimeChange={onTimeChange}
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
      <div style={{ paddingTop: '20px', maxWidth: '50%' }}>
        <Label>{'DatePicker and TimePicker combination'}</Label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '3px' }}>
          <DatePicker
            placeholder="Select a date..."
            value={datePickerDate}
            onSelectDate={onSelectDate}
            minDate={new Date()}
          />
          <TimePicker
            currentDate={datePickerDate}
            useComboBoxAsMenuWidth
            onTimeChange={(time: Date) => {
              setCurrentTime(time);
            }}
          />
        </div>
        <Text>{`Current selected time: ${currentTime ? currentTime.toString() : ''}`}</Text>
      </div>
    </>
  );
};
